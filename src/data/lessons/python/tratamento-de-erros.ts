import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'tratamento-de-erros',
  moduleId: 'python',
  title: 'Tratamento de Erros',
  description: 'Aprenda a lidar com erros no seu codigo usando try/except e torne seus programas mais robustos.',
  order: 8,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'Erros acontecem! Um usuario pode digitar texto onde esperamos um numero, ou tentamos dividir por zero. Em vez de deixar o programa **quebrar**, podemos **tratar** esses erros de forma elegante usando **try/except**.\n\nO tratamento de erros e essencial para criar programas robustos e profissionais que nao travam inesperadamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'try_except_basico.py',
        code: `# Sem tratamento - o programa trava!
# numero = int("abc")  # ValueError!

# Com tratamento - o programa continua
try:
    numero = int(input("Digite um numero: "))
    print(f"Voce digitou: {numero}")
except ValueError:
    print("Erro: isso nao e um numero valido!")

print("O programa continua normalmente!")

# Tratando divisao por zero
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("Erro: nao e possivel dividir por zero!")`,
        description: 'O bloco try tenta executar o codigo. Se ocorrer um erro, o except captura e trata.',
      },
    },
    {
      type: 'text',
      content: 'Python possui tipos de erros especificos para cada situacao. Conhecer os mais comuns ajuda a escrever tratamentos precisos:\n\n- **`TypeError`** — Operacao aplicada a um tipo de dado incompativel (ex: somar `str` com `int`)\n- **`IndexError`** — Acesso a um indice inexistente em uma lista\n- **`KeyError`** — Acesso a uma chave inexistente em um dicionario\n\nVoce tambem pode capturar **varios tipos de erro** em um mesmo `except` usando parenteses: `except (TypeError, ValueError)`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'erros_comuns.py',
        code: `# TypeError - operacao com tipos incompativeis
try:
    resultado = "10" + 5
except TypeError:
    print("Erro: nao pode somar texto com numero!")

# IndexError - indice fora do alcance da lista
try:
    lista = [1, 2, 3]
    print(lista[10])
except IndexError:
    print("Erro: indice fora do alcance da lista!")

# KeyError - chave nao encontrada no dicionario
try:
    pessoa = {"nome": "Ana"}
    print(pessoa["idade"])
except KeyError:
    print("Erro: chave nao encontrada no dicionario!")

# Capturando multiplos tipos de erro
try:
    valor = int("abc")
except (ValueError, TypeError) as erro:
    print(f"Ocorreu um erro: {erro}")`,
        description: 'Python tem erros especificos para cada situacao. Voce pode capturar um ou varios tipos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Evite usar "except:" sem especificar o tipo de erro. Isso captura TODOS os erros, inclusive os inesperados, dificultando encontrar bugs no seu codigo. Sempre especifique o tipo de erro que espera.',
    },
    {
      type: 'text',
      content: '## else e finally\n\nO bloco `try/except` pode ser estendido com mais dois blocos opcionais:\n\n- **`else`** — Executa somente se **nao** houve nenhum erro no bloco `try`. Util para colocar o codigo que depende do sucesso da operacao\n- **`finally`** — Executa **sempre**, com ou sem erro. Ideal para tarefas de limpeza, como fechar arquivos ou conexoes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'else_finally.py',
        code: `# else - executa somente se NAO houve erro
# finally - executa SEMPRE, com ou sem erro

try:
    numero = int("42")
    resultado = 100 / numero
except ValueError:
    print("Erro: valor invalido!")
except ZeroDivisionError:
    print("Erro: divisao por zero!")
else:
    print(f"Sucesso! Resultado: {resultado:.2f}")
finally:
    print("Bloco finally: sempre executa!")

# Exemplo pratico com else e finally
print("\\n--- Calculadora Segura ---")
try:
    a = float(input("Primeiro numero: "))
    b = float(input("Segundo numero: "))
    resultado = a / b
except ValueError:
    print("Digite apenas numeros!")
except ZeroDivisionError:
    print("Impossivel dividir por zero!")
else:
    print(f"Resultado: {a} / {b} = {resultado:.2f}")
finally:
    print("Obrigado por usar a calculadora!")`,
        description: 'O else executa quando nao ha erro, e o finally executa sempre, ideal para limpeza.',
      },
    },
    {
      type: 'text',
      content: '## Lancando Excecoes com raise\n\nAlm de capturar erros, voce tambem pode **lancar** seus proprios erros usando **`raise`**. Isso e util para validar dados de entrada em funcoes e avisar quem chamou a funcao sobre um problema.\n\n- **`raise TipoDoErro("mensagem")`** — Lanca uma excecao com a mensagem informada\n- **`any(condicao for item in lista)`** — Retorna `True` se ao menos um item satisfizer a condicao',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'raise_excecao.py',
        code: `# Levantando excecoes com raise
def calcular_media(notas):
    if not notas:
        raise ValueError("A lista de notas nao pode estar vazia!")
    if any(n < 0 or n > 10 for n in notas):
        raise ValueError("Todas as notas devem estar entre 0 e 10!")
    return sum(notas) / len(notas)

# Usando a funcao com tratamento
try:
    media = calcular_media([8.0, 7.5, 9.0])
    print(f"Media: {media:.1f}")
except ValueError as erro:
    print(f"Erro: {erro}")

try:
    media = calcular_media([8.0, -1, 9.0])
    print(f"Media: {media:.1f}")
except ValueError as erro:
    print(f"Erro: {erro}")

try:
    media = calcular_media([])
    print(f"Media: {media:.1f}")
except ValueError as erro:
    print(f"Erro: {erro}")`,
        description: 'Use raise para lancar excecoes quando os dados de entrada sao invalidos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Uma boa pratica e validar os dados de entrada no inicio da funcao usando raise. Isso e chamado de "falhar rapido" (fail fast) e ajuda a encontrar problemas antes que eles causem bugs dificeis de rastrear.',
    },
  ],
  challenges: [
    {
      id: 'err-c1',
      title: 'Calculadora Segura',
      description: 'Crie uma calculadora que pede dois numeros e uma operacao (+, -, *, /). Trate os seguintes erros: entrada nao numerica (ValueError), divisao por zero (ZeroDivisionError), e operacao invalida. Imprima mensagens amigaveis para cada erro.',
      language: 'python',
      starterCode: `# Calculadora Segura
# Peca dois numeros e uma operacao ao usuario
# Trate os possiveis erros com try/except

# Dica: use try/except para cada possivel erro

num1 = input("Primeiro numero: ")
num2 = input("Segundo numero: ")
operacao = input("Operacao (+, -, *, /): ")

# Converta os numeros e faca o calculo com tratamento de erros
`,
      solution: `num1 = input("Primeiro numero: ")
num2 = input("Segundo numero: ")
operacao = input("Operacao (+, -, *, /): ")

try:
    a = float(num1)
    b = float(num2)

    if operacao == "+":
        resultado = a + b
    elif operacao == "-":
        resultado = a - b
    elif operacao == "*":
        resultado = a * b
    elif operacao == "/":
        resultado = a / b
    else:
        raise ValueError(f"Operacao '{operacao}' nao e valida!")

    print(f"Resultado: {a} {operacao} {b} = {resultado:.2f}")
except ValueError as erro:
    print(f"Erro de valor: {erro}")
except ZeroDivisionError:
    print("Erro: nao e possivel dividir por zero!")`,
      hints: [
        'Use float() para converter as entradas e trate ValueError caso nao sejam numeros',
        'Verifique se a operacao e valida e use raise ValueError se nao for',
        'Trate ZeroDivisionError separadamente para dar uma mensagem especifica',
      ],
    },
    {
      id: 'err-c2',
      title: 'Validador de Idade',
      description: 'Crie uma funcao validar_idade() que recebe uma string (entrada do usuario) e retorna a idade como inteiro. A funcao deve levantar ValueError se: nao for um numero, for menor que 0, ou for maior que 150. Depois, use a funcao com try/except para testar diversos valores.',
      language: 'python',
      starterCode: `def validar_idade(entrada):
    # Converta a entrada para inteiro
    # Verifique se esta entre 0 e 150
    # Levante ValueError com mensagem apropriada se invalido
    # Retorne a idade se valida
    pass

# Teste a funcao com diferentes valores
valores_teste = ["25", "abc", "-5", "200", "17"]

for valor in valores_teste:
    # Use try/except para testar cada valor
    pass
`,
      solution: `def validar_idade(entrada):
    try:
        idade = int(entrada)
    except ValueError:
        raise ValueError(f"'{entrada}' nao e um numero valido!")

    if idade < 0:
        raise ValueError(f"Idade nao pode ser negativa: {idade}")
    if idade > 150:
        raise ValueError(f"Idade invalida (maior que 150): {idade}")

    return idade

valores_teste = ["25", "abc", "-5", "200", "17"]

for valor in valores_teste:
    try:
        idade = validar_idade(valor)
        print(f"Idade valida: {idade}")
    except ValueError as erro:
        print(f"Erro: {erro}")`,
      hints: [
        'Use int() para converter e trate o ValueError dentro da funcao',
        'Use raise ValueError("mensagem") para lancar erros customizados',
        'No laco de teste, use try/except para capturar os erros de cada valor',
      ],
    },
    {
      id: 'err-c3',
      title: 'Busca Segura no Dicionario',
      description: 'Crie um dicionario de produtos com nome e preco. Depois, crie uma funcao buscar_produto() que recebe o dicionario e o nome do produto. A funcao deve tratar: KeyError se o produto nao existir, e TypeError se o nome nao for uma string. Use else para exibir o preco e finally para exibir uma mensagem de fim de busca.',
      language: 'python',
      starterCode: `# Crie um dicionario de produtos com pelo menos 4 itens
produtos = {}

def buscar_produto(catalogo, nome):
    # Use try/except/else/finally
    # Trate KeyError e TypeError
    pass

# Teste com: produto existente, produto inexistente, e tipo invalido (ex: 123)
`,
      solution: `produtos = {
    "notebook": 3500.00,
    "mouse": 89.90,
    "teclado": 159.90,
    "monitor": 1299.00
}

def buscar_produto(catalogo, nome):
    try:
        if not isinstance(nome, str):
            raise TypeError("O nome do produto deve ser uma string!")
        preco = catalogo[nome.lower()]
    except KeyError:
        print(f"Produto '{nome}' nao encontrado no catalogo!")
    except TypeError as erro:
        print(f"Erro de tipo: {erro}")
    else:
        print(f"Produto: {nome} - Preco: R$ {preco:.2f}")
    finally:
        print("--- Busca finalizada ---")

buscar_produto(produtos, "notebook")
buscar_produto(produtos, "tablet")
buscar_produto(produtos, 123)`,
      hints: [
        'Use isinstance(nome, str) para verificar se o tipo e correto',
        'Acesse catalogo[nome] dentro do try para capturar KeyError',
        'Use else para exibir o resultado quando nao houver erro',
      ],
    },
  ],
};
