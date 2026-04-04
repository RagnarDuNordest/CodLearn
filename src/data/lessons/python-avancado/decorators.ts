import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'decorators',
  moduleId: 'python-avancado',
  title: 'Decorators',
  description: 'Entenda closures e funcoes de primeira classe para criar decorators poderosos que modificam comportamento de funcoes sem alterar seu codigo.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content: '## Funcoes sao Objetos de Primeira Classe\n\nEm Python, funcoes sao objetos como qualquer outro. Isso significa que voce pode:\n- Atribuir funcoes a variaveis\n- Passar funcoes como argumentos\n- Retornar funcoes de outras funcoes\n- Armazenar funcoes em listas e dicionarios\n\nEssa propriedade e a base de tudo o que os decorators fazem.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'funcoes_primeira_classe.py',
        code: `# Funcao e um objeto: pode ser atribuida a variavel
def saudar(nome):
    return f"Ola, {nome}!"

cumprimento = saudar  # sem parenteses: referencia ao objeto funcao
print(cumprimento("Alice"))  # Ola, Alice!

# Funcao como argumento
def aplicar(funcao, valor):
    return funcao(valor)

print(aplicar(str.upper, "python"))  # PYTHON
print(aplicar(len, [1, 2, 3]))       # 3

# Funcao retornando funcao
def criar_multiplicador(fator):
    def multiplicar(n):
        return n * fator
    return multiplicar  # retorna a funcao, nao o resultado!

dobrar = criar_multiplicador(2)
triplicar = criar_multiplicador(3)

print(dobrar(5))    # 10
print(triplicar(5)) # 15

# Funcoes em estruturas de dados
operacoes = {
    'somar': lambda a, b: a + b,
    'subtrair': lambda a, b: a - b,
    'multiplicar': lambda a, b: a * b,
}

print(operacoes['somar'](10, 3))      # 13
print(operacoes['multiplicar'](4, 5)) # 20`,
        description: 'Funcoes em Python sao cidadaos de primeira classe: objetos que podem ser passados e retornados.',
      },
    },
    {
      type: 'text',
      content: '## Closures: Funcoes que Lembram seu Contexto\n\nUma closure ocorre quando uma funcao interna "lembra" as variaveis do escopo externo onde foi criada, mesmo apos esse escopo ter encerrado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'closures.py',
        code: `# Closure basica: a funcao interna captura 'fator'
def criar_somador(incremento):
    def somar(n):
        return n + incremento  # 'incremento' e lembrado pela closure
    return somar

somar_10 = criar_somador(10)
somar_5 = criar_somador(5)

print(somar_10(3))  # 13
print(somar_5(3))   # 8

# Inspecionando a closure
print(somar_10.__closure__[0].cell_contents)  # 10

# Contador com estado usando closure
def criar_contador(inicio=0):
    contagem = [inicio]  # lista para ser mutavel na closure

    def incrementar(passo=1):
        contagem[0] += passo
        return contagem[0]

    def resetar():
        contagem[0] = inicio

    def obter():
        return contagem[0]

    return incrementar, resetar, obter

incrementar, resetar, obter = criar_contador(0)
print(incrementar())   # 1
print(incrementar())   # 2
print(incrementar(5))  # 7
print(obter())         # 7
resetar()
print(obter())         # 0`,
        description: 'Closures "fecham" sobre variaveis do escopo externo, criando estado persistente.',
      },
    },
    {
      type: 'text',
      content: '## Decorator Basico\n\nUm decorator e uma funcao que recebe outra funcao, adiciona comportamento e retorna uma nova funcao. A sintaxe `@nome_decorator` e apenas um atalho elegante.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'decorator_basico.py',
        code: `# Decorator: funcao que envolve outra funcao
def log_chamada(funcao):
    def wrapper(*args, **kwargs):
        print(f"[LOG] Chamando {funcao.__name__} com args={args}, kwargs={kwargs}")
        resultado = funcao(*args, **kwargs)
        print(f"[LOG] {funcao.__name__} retornou: {resultado}")
        return resultado
    return wrapper

# Forma manual (sem @)
def somar(a, b):
    return a + b

somar_com_log = log_chamada(somar)
somar_com_log(3, 5)
# [LOG] Chamando somar com args=(3, 5), kwargs={}
# [LOG] somar retornou: 8

# Forma elegante com @decorator (equivalente exato)
@log_chamada
def multiplicar(a, b):
    return a * b

multiplicar(4, 6)
# [LOG] Chamando multiplicar com args=(4, 6), kwargs={}
# [LOG] multiplicar retornou: 24

# @decorator e apenas acucar sintatico para:
# multiplicar = log_chamada(multiplicar)`,
        description: '@decorator e um atalho para funcao = decorator(funcao). O wrapper recebe e repassa todos os argumentos.',
      },
    },
    {
      type: 'text',
      content: '## functools.wraps: Preservando Metadados\n\nSem `functools.wraps`, o decorator "esconde" o nome e docstring da funcao original. Use sempre `@wraps` para preservar essas informacoes.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'functools_wraps.py',
        code: `from functools import wraps

# Sem wraps: metadados perdidos
def decorator_sem_wraps(funcao):
    def wrapper(*args, **kwargs):
        return funcao(*args, **kwargs)
    return wrapper

@decorator_sem_wraps
def minha_funcao():
    """Faz algo muito importante."""
    pass

print(minha_funcao.__name__)  # wrapper (ERRADO!)
print(minha_funcao.__doc__)   # None (ERRADO!)

# Com @wraps: metadados preservados
def decorator_correto(funcao):
    @wraps(funcao)  # copia nome, docstring, anotacoes
    def wrapper(*args, **kwargs):
        return funcao(*args, **kwargs)
    return wrapper

@decorator_correto
def outra_funcao():
    """Faz algo ainda mais importante."""
    pass

print(outra_funcao.__name__)  # outra_funcao (CORRETO!)
print(outra_funcao.__doc__)   # Faz algo ainda mais importante. (CORRETO!)`,
        description: 'Sempre use @wraps(funcao) dentro do seu decorator para preservar __name__, __doc__ e __annotations__.',
      },
    },
    {
      type: 'text',
      content: '## Decorators com Parametros\n\nPara criar decorators que aceitam argumentos, adicione mais uma camada: uma funcao que recebe os parametros e retorna o decorator real.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'decorator_com_parametros.py',
        code: `from functools import wraps

# Decorator com parametros: funcao -> decorator -> wrapper
def repetir(vezes):
    def decorator(funcao):
        @wraps(funcao)
        def wrapper(*args, **kwargs):
            resultado = None
            for _ in range(vezes):
                resultado = funcao(*args, **kwargs)
            return resultado
        return wrapper
    return decorator

@repetir(vezes=3)
def dizer_oi():
    print("Oi!")

dizer_oi()
# Oi!
# Oi!
# Oi!

# Decorator de validacao com parametro
def requer_tipo(tipo_esperado):
    def decorator(funcao):
        @wraps(funcao)
        def wrapper(valor, *args, **kwargs):
            if not isinstance(valor, tipo_esperado):
                raise TypeError(
                    f"{funcao.__name__} espera {tipo_esperado.__name__}, "
                    f"recebeu {type(valor).__name__}"
                )
            return funcao(valor, *args, **kwargs)
        return wrapper
    return decorator

@requer_tipo(int)
def calcular_fatorial(n):
    if n == 0:
        return 1
    return n * calcular_fatorial(n - 1)

print(calcular_fatorial(5))    # 120
# calcular_fatorial("5")       # TypeError!`,
        description: 'Decorator com parametros tem tres niveis: fabrica(params) -> decorator(func) -> wrapper(*args).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'A regra dos tres niveis: decorator simples tem 2 niveis (decorator + wrapper). Decorator com parametros tem 3 niveis (fabrica + decorator + wrapper). Nunca se confunda contando os "def" aninhados.',
    },
    {
      type: 'text',
      content: '## Decorators de Classe\n\nPython oferece decorators embutidos para metodos de classe: `@property`, `@staticmethod` e `@classmethod`. Cada um modifica como o metodo se comporta.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'decorators_classe.py',
        code: `class Circulo:
    def __init__(self, raio):
        self._raio = raio  # _raio: convencao de atributo "privado"

    @property
    def raio(self):
        """Getter: acessa como atributo, nao como metodo."""
        return self._raio

    @raio.setter
    def raio(self, valor):
        """Setter: valida antes de atribuir."""
        if valor <= 0:
            raise ValueError("Raio deve ser positivo")
        self._raio = valor

    @property
    def area(self):
        """Propriedade calculada: sem setter, e somente leitura."""
        import math
        return math.pi * self._raio ** 2

    @staticmethod
    def eh_valido(raio):
        """Nao acessa self nem cls. Funcao utilitaria no namespace da classe."""
        return raio > 0

    @classmethod
    def criar_unitario(cls):
        """Recebe cls (a classe), nao self. Fabrica de instancias."""
        return cls(raio=1)

c = Circulo(5)
print(c.raio)        # 5 (usa @property, sem parenteses)
print(f"{c.area:.2f}")  # 78.54

c.raio = 10          # usa @raio.setter
print(c.raio)        # 10

print(Circulo.eh_valido(3))    # True (sem instancia)
unitario = Circulo.criar_unitario()
print(unitario.raio)           # 1`,
        description: '@property cria getters/setters elegantes. @staticmethod e @classmethod controlam acesso a self/cls.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Decorators podem ser empilhados: @decorator_a aplicado antes de @decorator_b significa que decorator_b e aplicado primeiro (o mais proximo da funcao), depois decorator_a envolve o resultado.',
    },
  ],
  challenges: [
    {
      id: 'pyav-dec-c1',
      title: 'Decorator de Timing',
      description: 'Implemente um decorator chamado "medir_tempo" que mede e imprime o tempo de execucao de qualquer funcao. Use time.perf_counter() para precisao. O decorator deve imprimir: "[TEMPO] nome_funcao levou X.XXXXs". Use functools.wraps para preservar metadados.',
      language: 'python',
      starterCode: `import time
from functools import wraps

def medir_tempo(funcao):
    # Implemente o decorator aqui
    pass

@medir_tempo
def processar_dados(n):
    """Simula processamento pesado."""
    total = sum(i ** 2 for i in range(n))
    return total

@medir_tempo
def busca_lenta(lista, alvo):
    """Busca linear simples."""
    for item in lista:
        if item == alvo:
            return True
    return False

resultado = processar_dados(100_000)
print(f"Resultado: {resultado}")

encontrado = busca_lenta(list(range(50_000)), 49_999)
print(f"Encontrado: {encontrado}")
`,
      solution: `import time
from functools import wraps

def medir_tempo(funcao):
    @wraps(funcao)
    def wrapper(*args, **kwargs):
        inicio = time.perf_counter()
        resultado = funcao(*args, **kwargs)
        fim = time.perf_counter()
        print(f"[TEMPO] {funcao.__name__} levou {fim - inicio:.4f}s")
        return resultado
    return wrapper

@medir_tempo
def processar_dados(n):
    """Simula processamento pesado."""
    total = sum(i ** 2 for i in range(n))
    return total

@medir_tempo
def busca_lenta(lista, alvo):
    """Busca linear simples."""
    for item in lista:
        if item == alvo:
            return True
    return False

resultado = processar_dados(100_000)
print(f"Resultado: {resultado}")

encontrado = busca_lenta(list(range(50_000)), 49_999)
print(f"Encontrado: {encontrado}")`,
      hints: [
        'Use time.perf_counter() antes e depois de chamar a funcao',
        'Subtraia inicio de fim para obter a duracao em segundos',
        'Lembre de usar @wraps(funcao) para preservar metadados',
        'Retorne o resultado da funcao original para nao quebrar quem chama',
      ],
    },
    {
      id: 'pyav-dec-c2',
      title: 'Decorator de Retry',
      description: 'Implemente um decorator "retry(tentativas, espera)" que tenta executar a funcao ate N vezes quando ela lanca uma excecao. Deve esperar "espera" segundos entre as tentativas. Se todas falharem, relanca a ultima excecao. Imprima "[RETRY] Tentativa X/N falhou: erro" a cada falha.',
      language: 'python',
      starterCode: `import time
from functools import wraps

def retry(tentativas=3, espera=1.0):
    # Implemente o decorator factory aqui
    pass

# Simula uma funcao que falha nas primeiras chamadas
contador_chamadas = [0]

@retry(tentativas=4, espera=0.1)
def servico_instavel():
    contador_chamadas[0] += 1
    if contador_chamadas[0] < 3:
        raise ConnectionError(f"Timeout na tentativa {contador_chamadas[0]}")
    return "Sucesso!"

resultado = servico_instavel()
print(f"Resultado: {resultado}")
print(f"Total de chamadas: {contador_chamadas[0]}")
`,
      solution: `import time
from functools import wraps

def retry(tentativas=3, espera=1.0):
    def decorator(funcao):
        @wraps(funcao)
        def wrapper(*args, **kwargs):
            ultimo_erro = None
            for tentativa in range(1, tentativas + 1):
                try:
                    return funcao(*args, **kwargs)
                except Exception as e:
                    ultimo_erro = e
                    print(f"[RETRY] Tentativa {tentativa}/{tentativas} falhou: {e}")
                    if tentativa < tentativas:
                        time.sleep(espera)
            raise ultimo_erro
        return wrapper
    return decorator

contador_chamadas = [0]

@retry(tentativas=4, espera=0.1)
def servico_instavel():
    contador_chamadas[0] += 1
    if contador_chamadas[0] < 3:
        raise ConnectionError(f"Timeout na tentativa {contador_chamadas[0]}")
    return "Sucesso!"

resultado = servico_instavel()
print(f"Resultado: {resultado}")
print(f"Total de chamadas: {contador_chamadas[0]}")`,
      hints: [
        'Decorator com parametros precisa de tres niveis de funcao aninhada',
        'Use um loop for range(1, tentativas + 1) e try/except dentro',
        'Guarde a ultima excecao em uma variavel para relanca-la ao final',
        'Use time.sleep(espera) entre tentativas mas nao na ultima',
      ],
    },
    {
      id: 'pyav-dec-c3',
      title: 'Decorator de Cache (Memoization)',
      description: 'Implemente um decorator "cache" que armazena os resultados de chamadas anteriores. Se a funcao for chamada com os mesmos argumentos, retorna o resultado do cache sem executar novamente. Imprima "[CACHE] HIT" ou "[CACHE] MISS" em cada chamada. Implemente tambem "cache_info()" como atributo da funcao decorada para mostrar hits e misses.',
      language: 'python',
      starterCode: `from functools import wraps

def cache(funcao):
    # Implemente o decorator de cache aqui
    # Dica: use um dicionario para armazenar resultados
    # A chave deve ser (args, frozenset(kwargs.items()))
    pass

@cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

@cache
def fatorial(n):
    if n == 0:
        return 1
    return n * fatorial(n - 1)

print(fibonacci(10))  # 55
print(fibonacci(10))  # 55 (do cache)
print(fibonacci(8))   # 21 (do cache)

print(fatorial(5))    # 120
print(fatorial(5))    # 120 (do cache)

print(fibonacci.cache_info())
print(fatorial.cache_info())
`,
      solution: `from functools import wraps

def cache(funcao):
    armazenamento = {}
    hits = [0]
    misses = [0]

    @wraps(funcao)
    def wrapper(*args, **kwargs):
        chave = (args, frozenset(kwargs.items()))
        if chave in armazenamento:
            hits[0] += 1
            print(f"[CACHE] HIT para {funcao.__name__}{args}")
            return armazenamento[chave]
        misses[0] += 1
        print(f"[CACHE] MISS para {funcao.__name__}{args}")
        resultado = funcao(*args, **kwargs)
        armazenamento[chave] = resultado
        return resultado

    def cache_info():
        return {
            'hits': hits[0],
            'misses': misses[0],
            'tamanho': len(armazenamento)
        }

    wrapper.cache_info = cache_info
    return wrapper

@cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

@cache
def fatorial(n):
    if n == 0:
        return 1
    return n * fatorial(n - 1)

print(fibonacci(10))
print(fibonacci(10))
print(fibonacci(8))

print(fatorial(5))
print(fatorial(5))

print(fibonacci.cache_info())
print(fatorial.cache_info())`,
      hints: [
        'Use um dicionario como armazenamento: {(args, kwargs_frozen): resultado}',
        'frozenset(kwargs.items()) torna os kwargs hashable para usar como chave',
        'Verifique se a chave ja esta no dict antes de calcular',
        'Adicione cache_info como atributo do wrapper: wrapper.cache_info = funcao_info',
      ],
    },
  ],
};
