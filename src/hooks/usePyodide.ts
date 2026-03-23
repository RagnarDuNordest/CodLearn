'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    set: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
  };
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
    _pyodideInstance?: PyodideInterface;
    _pyodideLoading?: Promise<PyodideInterface>;
  }
}

export interface RunResult {
  output: string;
  /** Friendly Portuguese error (shown to user) */
  error: string | null;
  /** Short friendly error (alias, same as error) */
  friendlyError?: string | null;
  /** Full raw traceback (shown in collapsible details) */
  rawError?: string | null;
}

/**
 * Extracts the final error line from a full Python traceback string.
 * e.g. "Traceback...\n  ...\nValueError: foo" → "ValueError: foo"
 */
function extractLastError(text: string): string {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines[0] === 'Traceback (most recent call last):') {
    // Walk backwards to find the actual error line (ErrorName: message)
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^\w[\w.]*Error:/.test(lines[i]) || /^\w[\w.]*Exception:/.test(lines[i])) {
        return lines[i];
      }
    }
    // Fallback: last non-empty line
    return lines[lines.length - 1] ?? text;
  }
  return text;
}

/**
 * Maps common Python error messages to friendly Portuguese messages.
 * Returns the friendly message when a pattern matches, or the original
 * cleaned error string when no pattern matches.
 */
function mapPythonError(cleaned: string): string {
  // First, strip full tracebacks so patterns match cleanly
  const err = extractLastError(cleaned);
  // NameError: name 'x' is not defined
  const nameErrorMatch = err.match(/NameError: name '(.+?)' is not defined/);
  if (nameErrorMatch) {
    return `❌ '${nameErrorMatch[1]}' não foi definido. Você declarou essa variável antes de usá-la?`;
  }

  // IndentationError (must be checked before generic SyntaxError)
  if (/IndentationError/.test(err)) {
    return '❌ Erro de indentação. Use 4 espaços consistentemente dentro do if/for/while/def.';
  }

  // SyntaxError
  if (/SyntaxError/.test(err)) {
    return '❌ Erro de sintaxe. Verifique parênteses, dois-pontos (:) e indentação.';
  }

  // TypeError: unsupported operand type
  if (/TypeError: unsupported operand type/.test(err)) {
    return '❌ Tipo incompatível. Você está tentando operar valores de tipos diferentes (ex: número + texto)?';
  }

  // TypeError: 'x' object is not callable
  const notCallableMatch = err.match(/TypeError: '(.+?)' object is not callable/);
  if (notCallableMatch) {
    return `❌ '${notCallableMatch[1]}' não é uma função. Verifique o nome ou se esqueceu de definir a função.`;
  }

  // ZeroDivisionError
  if (/ZeroDivisionError/.test(err)) {
    return '❌ Divisão por zero. Verifique se o divisor pode ser 0.';
  }

  // ValueError: could not convert string to float (float(input(...)) with no value)
  if (/ValueError: could not convert string to float/.test(err)) {
    return '⚠️ Não foi possível converter para número decimal. Forneça os valores de entrada antes de executar (campo "Entradas").';
  }

  // ValueError: invalid literal for int()
  if (/ValueError: invalid literal for int\(\)/.test(err)) {
    return '⚠️ Não foi possível converter para número inteiro. Forneça os valores de entrada antes de executar (campo "Entradas").';
  }

  // ValueError generic
  if (/ValueError/.test(err)) {
    return `❌ Valor inválido: ${err.replace('ValueError: ', '')}`;
  }

  // IndexError: list index out of range
  if (/IndexError: list index out of range/.test(err)) {
    return '❌ Índice fora do alcance. A lista tem menos elementos do que você está tentando acessar.';
  }

  // KeyError
  if (/KeyError/.test(err)) {
    return '❌ Chave não encontrada no dicionário. Verifique se a chave existe antes de acessá-la.';
  }

  // AttributeError: 'x' object has no attribute 'y'
  const attrErrorMatch = err.match(/AttributeError: '(.+?)' object has no attribute '(.+?)'/);
  if (attrErrorMatch) {
    return `❌ '${attrErrorMatch[1]}' não tem o atributo '${attrErrorMatch[2]}'. Verifique se o método existe para esse tipo.`;
  }

  // No pattern matched — return just the extracted (clean) last error line
  return err;
}

export function usePyodide() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  useEffect(() => {
    // If already loaded globally, reuse it
    if (window._pyodideInstance) {
      pyodideRef.current = window._pyodideInstance;
      setIsReady(true);
      return;
    }

    // If loading is already in progress, wait for it
    if (window._pyodideLoading) {
      setIsLoading(true);
      window._pyodideLoading.then((pyodide) => {
        pyodideRef.current = pyodide;
        setIsReady(true);
        setIsLoading(false);
      }).catch((err) => {
        setError(String(err));
        setIsLoading(false);
      });
      return;
    }

    // Start loading Pyodide
    setIsLoading(true);

    const loadScript = (): Promise<PyodideInterface> => {
      return new Promise((resolve, reject) => {
        // Check if script is already in DOM
        if (document.querySelector('script[data-pyodide]')) {
          if (window.loadPyodide) {
            window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/' })
              .then(resolve)
              .catch(reject);
          } else {
            reject(new Error('loadPyodide not available'));
          }
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js';
        script.setAttribute('data-pyodide', 'true');
        script.onload = () => {
          if (window.loadPyodide) {
            window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/' })
              .then(resolve)
              .catch(reject);
          } else {
            reject(new Error('loadPyodide not found after script load'));
          }
        };
        script.onerror = () => reject(new Error('Failed to load Pyodide script'));
        document.head.appendChild(script);
      });
    };

    window._pyodideLoading = loadScript();

    window._pyodideLoading
      .then((pyodide) => {
        window._pyodideInstance = pyodide;
        pyodideRef.current = pyodide;
        setIsReady(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setIsLoading(false);
      });
  }, []);

  const runPython = useCallback(async (code: string, inputs: string[] = []): Promise<RunResult> => {
    if (!pyodideRef.current) {
      return { output: '', error: 'Pyodide não está carregado ainda.' };
    }

    const pyodide = pyodideRef.current;

    try {
      // Capture stdout
      const outputLines: string[] = [];
      let inputIndex = 0;

      // Inject mock input() and override sys.stdout
      const setupCode = `
import sys
import io

_captured_output = io.StringIO()
sys.stdout = _captured_output

_input_values = ${JSON.stringify(inputs)}
_input_index = 0

def input(prompt=""):
    global _input_index
    if prompt:
        print(prompt, end="")
    if _input_index < len(_input_values):
        val = _input_values[_input_index]
        _input_index += 1
        print(val)
        return val
    return ""

import builtins
builtins.input = input
`;

      await pyodide.runPythonAsync(setupCode);
      await pyodide.runPythonAsync(code);

      const output = await pyodide.runPythonAsync('_captured_output.getvalue()') as string;

      // Reset stdout
      await pyodide.runPythonAsync(`
sys.stdout = sys.__stdout__
import builtins
builtins.input = __builtins__.__dict__.get('input', input) if hasattr(__builtins__, '__dict__') else input
`);

      return { output: output || '', error: null };
    } catch (err) {
      // Try to reset stdout even on error
      try {
        await pyodide.runPythonAsync('import sys; sys.stdout = sys.__stdout__');
      } catch {
        // ignore
      }

      const errorMsg = String(err);
      // Clean up Pyodide error prefix for readability
      const idx = errorMsg.indexOf('PythonError: ');
      const cleaned = idx !== -1 ? errorMsg.slice(idx + 'PythonError: '.length).trim() : errorMsg;

      // Map common Python errors to friendly Portuguese messages
      const friendly = mapPythonError(cleaned);
      return {
        output: '',
        error: friendly,
        friendlyError: friendly,
        rawError: cleaned,
      };
    }
  }, []);

  return { isLoading, isReady, error, runPython };
}
