import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'modulos-e-imports',
  moduleId: 'python',
  title: 'Modulos e Imports',
  description: 'Aprenda a organizar seu codigo em modulos e usar bibliotecas externas.',
  order: 11,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Conforme seus programas crescem, fica dificil manter tudo em um unico arquivo. O Python resolve isso com **modulos** - arquivos .py que contem funcoes, classes e variaveis que podem ser reutilizados em outros arquivos.\n\nAlem dos seus proprios modulos, o Python vem com uma **biblioteca padrao** enorme, com modulos prontos para diversas tarefas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'import_basico.py',
        code: `# Importar um modulo inteiro
import math

print(math.pi)        # 3.141592653589793
print(math.sqrt(16))  # 4.0

# Importar funcoes especificas
from math import sqrt, pow

print(sqrt(25))       # 5.0
print(pow(2, 10))     # 1024.0

# Importar com apelido (alias)
import math as m

print(m.ceil(4.3))    # 5
print(m.floor(4.7))   # 4`,
        description: 'Tres formas de importar: import modulo, from modulo import algo, import modulo as apelido.',
      },
    },
    {
      type: 'text',
      content: 'Voce pode criar seus proprios modulos. Basta criar um arquivo .py e importa-lo de outro arquivo:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'meu_modulo.py',
        code: `# Arquivo: calculadora.py
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

PI = 3.14159

# -------------------------
# Arquivo: main.py
import calculadora

print(calculadora.somar(5, 3))       # 8
print(calculadora.PI)                 # 3.14159

from calculadora import multiplicar
print(multiplicar(4, 5))              # 20`,
        description: 'Crie um arquivo .py com funcoes e importe-o de outro arquivo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Modulos uteis da biblioteca padrao:**\n\n**random** - numeros aleatorios | **datetime** - datas e horas | **os** - interagir com o sistema | **json** - ler/escrever JSON | **math** - funcoes matematicas | **sys** - informacoes do sistema',
    },
    {
      type: 'text',
      content: 'Veja como usar tres dos modulos mais utilizados da biblioteca padrao:\n\n- **`random.randint(a, b)`** — Gera um numero inteiro aleatorio entre `a` e `b` (inclusivo)\n- **`random.choice(sequencia)`** — Escolhe um elemento aleatorio de uma lista ou string\n- **`datetime.now()`** — Retorna a data e hora atuais como um objeto `datetime`\n- **`.strftime(formato)`** — Formata um objeto `datetime` como string (ex: `"%d/%m/%Y"`)\n- **`os.getcwd()`** — Retorna o caminho do diretorio de trabalho atual\n- **`os.listdir(caminho)`** — Lista os arquivos e pastas em um diretorio',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'modulos_uteis.py',
        code: `# random - numeros aleatorios
import random

print(random.randint(1, 10))    # Numero entre 1 e 10
print(random.choice(["a", "b", "c"]))  # Escolhe um item

# datetime - datas
from datetime import datetime

agora = datetime.now()
print(agora.strftime("%d/%m/%Y %H:%M"))  # 03/03/2026 14:30

# os - sistema operacional
import os

print(os.getcwd())           # Diretorio atual
print(os.listdir("."))       # Lista arquivos do diretorio`,
        description: 'Exemplos praticos dos modulos mais usados do Python.',
      },
    },
    {
      type: 'text',
      content: 'Para instalar **bibliotecas externas** (feitas pela comunidade), use o **pip** no terminal:\n\n`pip install nome_da_biblioteca`\n\nExemplos populares: **requests** (HTTP), **flask** (web), **pandas** (dados), **pygame** (jogos).',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Cuidado com import \\***\n\nEvite usar `from modulo import *` pois importa TUDO e pode causar conflitos de nomes. Prefira importar apenas o que precisa.',
    },
  ],
  challenges: [
    {
      id: 'mod-c1',
      title: 'Explorar o Modulo Math',
      description: 'Use o modulo math para calcular: a raiz quadrada de 144, o valor de pi arredondado para 2 casas, e 2 elevado a 8.',
      language: 'python',
      starterCode: `import math

# Calcule a raiz quadrada de 144
raiz = # seu codigo aqui

# Arredonde pi para 2 casas decimais
pi_arredondado = # seu codigo aqui

# Calcule 2 elevado a 8 usando math.pow
potencia = # seu codigo aqui

print(f"Raiz de 144: {raiz}")
print(f"Pi arredondado: {pi_arredondado}")
print(f"2^8 = {potencia}")`,
      solution: `import math

# Calcule a raiz quadrada de 144
raiz = math.sqrt(144)

# Arredonde pi para 2 casas decimais
pi_arredondado = round(math.pi, 2)

# Calcule 2 elevado a 8 usando math.pow
potencia = int(math.pow(2, 8))

print(f"Raiz de 144: {raiz}")
print(f"Pi arredondado: {pi_arredondado}")
print(f"2^8 = {potencia}")`,
      hints: [
        'Use math.sqrt() para raiz quadrada',
        'math.pi contem o valor de pi. Use round() para arredondar',
        'math.pow(base, expoente) calcula potencia',
      ],
    },
    {
      id: 'mod-c2',
      title: 'Gerador de Senhas com Random',
      description: 'Crie um gerador de senhas aleatorias usando o modulo random. A senha deve ter 8 caracteres escolhidos de letras e numeros.',
      language: 'python',
      starterCode: `import random

caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"

# Gere uma senha de 8 caracteres aleatorios
senha = ""

# Use um laco e random.choice() para escolher caracteres

print(f"Senha gerada: {senha}")`,
      solution: `import random

caracteres = "abcdefghijklmnopqrstuvwxyz0123456789"

# Gere uma senha de 8 caracteres aleatorios
senha = ""

for i in range(8):
    senha += random.choice(caracteres)

print(f"Senha gerada: {senha}")`,
      hints: [
        'Use um for com range(8) para repetir 8 vezes',
        'random.choice(lista) escolhe um item aleatorio',
        'Concatene cada caractere escolhido na variavel senha',
      ],
    },
    {
      id: 'mod-c3',
      title: 'Criar seu Proprio Modulo',
      description: 'Crie um mini-modulo de utilidades com 3 funcoes: uma que verifica se um numero e par, uma que calcula a media de uma lista, e uma que inverte uma string. Depois teste todas.',
      language: 'python',
      starterCode: `# Imagine que este e o arquivo: utilidades.py

def eh_par(numero):
    # Retorne True se par, False se impar
    pass

def media(lista):
    # Retorne a media dos valores da lista
    pass

def inverter_string(texto):
    # Retorne a string invertida
    pass

# Testando as funcoes
print(eh_par(4))              # True
print(eh_par(7))              # False
print(media([10, 20, 30]))    # 20.0
print(inverter_string("Python"))  # nohtyP`,
      solution: `# Imagine que este e o arquivo: utilidades.py

def eh_par(numero):
    return numero % 2 == 0

def media(lista):
    return sum(lista) / len(lista)

def inverter_string(texto):
    return texto[::-1]

# Testando as funcoes
print(eh_par(4))              # True
print(eh_par(7))              # False
print(media([10, 20, 30]))    # 20.0
print(inverter_string("Python"))  # nohtyP`,
      hints: [
        'Para verificar se e par, use o operador % (modulo). Se numero % 2 == 0, e par',
        'Para media: some todos os valores com sum() e divida por len()',
        'Para inverter string, use fatiamento: texto[::-1]',
      ],
    },
  ],
};
