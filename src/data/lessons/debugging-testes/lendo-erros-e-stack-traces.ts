import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'lendo-erros-e-stack-traces',
  moduleId: 'debugging-testes',
  title: 'Lendo Erros e Stack Traces',
  description: 'Aprenda a interpretar mensagens de erro e stack traces para encontrar a causa raiz de um problema rapidamente',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Lendo Erros e Stack Traces\n\nUma mensagem de erro bem lida vale mais que horas de tentativa e erro. A maioria dos desenvolvedores iniciantes le apenas a ultima linha da mensagem — mas o stack trace inteiro conta a historia de como o erro aconteceu.\n\n### Anatomia de um erro Python\n\nUm erro em Python tem tres partes:\n\n1. **Stack trace** — a pilha de chamadas que levou ao erro (de baixo para cima, a origem real esta no final)\n2. **Tipo do erro** — a classe do erro (`TypeError`, `ValueError`, `KeyError`, etc.)\n3. **Mensagem** — descricao especifica do que deu errado\n\n### Erros mais comuns e o que significam\n\n| Erro | Significa | Causa tipica |\n|------|-----------|---------------|\n| `NameError` | Nome nao definido | Variavel sem valor, erro de digitacao |\n| `TypeError` | Tipo errado | Operacao incompativel (somar str + int) |\n| `IndexError` | Indice fora do range | Acessar lista[10] quando tem 3 elementos |\n| `KeyError` | Chave inexistente | Dicionario nao tem aquela chave |\n| `AttributeError` | Atributo nao existe | Metodo ou propriedade incorreto |\n| `ValueError` | Valor invalido | int("abc"), raiz de numero negativo |\n| `ZeroDivisionError` | Divisao por zero | Denominador calculado resultou em 0 |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Como ler um stack trace — leia de baixo para cima\n\n# Codigo que gera um erro:\ndef formatar_nome(usuario):\n    return usuario["nome"].upper()\n\ndef processar_usuarios(lista):\n    resultados = []\n    for u in lista:\n        resultados.append(formatar_nome(u))\n    return resultados\n\nusuarios = [\n    {"nome": "Ana"},\n    {"nome": "Bruno"},\n    {"email": "carlos@example.com"},  # sem "nome"!\n]\n\nprocessar_usuarios(usuarios)\n\n# Traceback (most recent call last):\n#   File "exemplo.py", line 16, in <module>\n#     processar_usuarios(usuarios)                  <- 1. ponto de entrada\n#   File "exemplo.py", line 9, in processar_usuarios\n#     resultados.append(formatar_nome(u))           <- 2. chamada intermediaria\n#   File "exemplo.py", line 3, in formatar_nome\n#     return usuario["nome"].upper()                <- 3. linha EXATA do erro\n# KeyError: \'nome\'                                  <- 4. tipo e causa\n\n# Leitura correta:\n# - O erro e KeyError: \'nome\' (chave "nome" nao existe)\n# - Aconteceu em formatar_nome, linha 3\n# - Foi chamado por processar_usuarios, linha 9\n# - Que foi chamado pelo modulo principal, linha 16\n# - Conclusao: um dos usuarios nao tem chave "nome"',
        filename: 'lendo_stack_trace.py',
        description:
          'Stack traces devem ser lidos de baixo para cima: a ultima entrada e onde o erro realmente ocorreu, as entradas acima mostram o caminho que levou ate la.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Quando ver um erro, copie a ultima linha (tipo + mensagem) e pesquise no Google ou StackOverflow. Erros comuns tem respostas canonicas que economizam horas de investigacao.',
    },
    {
      type: 'text',
      content:
        '## Erros em JavaScript\n\nNo JavaScript (e Node.js), a estrutura e similar mas com algumas diferencas:\n\n```\nTypeError: Cannot read properties of undefined (reading \'nome\')\n    at formatar_nome (app.js:3:20)      <- leia de cima para baixo\n    at processar_usuarios (app.js:9:18)\n    at Object.<anonymous> (app.js:16:1)\n```\n\nEm JS o stack trace vai de cima (onde ocorreu) para baixo (ponto de entrada) — o oposto do Python.\n\n### Erros em tempo de compilacao (TypeScript/Java/C)\n\nLinguagens compiladas mostram erros antes de executar:\n```\nerro.ts:5:10 - error TS2345:\nArgument of type \'string\' is not assignable to parameter of type \'number\'.\n\n  calcular(nome);  <- arquivo:linha:coluna + tipo + mensagem\n```\n\nEsses erros sao presentes, nao precisam de execucao para serem vistos — leia diretamente o arquivo e linha indicados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Tecnicas para lidar com erros desconhecidos\n\n# 1. Imprima o tipo do erro com type()\ndef inspecionar_dados(valor):\n    print(f"Tipo: {type(valor)}, Valor: {repr(valor)}")\n\ninspecionar_dados("42")      # Tipo: <class \'str\'>, Valor: \'42\'\ninspecionar_dados(42)        # Tipo: <class \'int\'>, Valor: 42\ninspecionar_dados(None)      # Tipo: <class \'NoneType\'>, Valor: None\n\n# 2. Use try/except para capturar e inspecionar o erro\ndef processar_seguro(dado):\n    try:\n        resultado = int(dado) * 2\n        return resultado\n    except ValueError as e:\n        print(f"Erro ao converter: {e}")\n        print(f"Dado recebido: {repr(dado)}")\n        return None\n    except TypeError as e:\n        print(f"Tipo invalido: {e}")\n        return None\n\nprocessar_seguro("10")    # 20\nprocessar_seguro("abc")   # Erro ao converter: invalid literal for int()...\nprocessar_seguro(None)    # Tipo invalido: int() argument must be...\n\n# 3. Use assert para verificar suposicoes\ndef dividir(a, b):\n    assert b != 0, f"Denominador nao pode ser zero! Recebeu: {b}"\n    return a / b\n\ndividir(10, 2)   # 5.0\ndividir(10, 0)   # AssertionError: Denominador nao pode ser zero! Recebeu: 0',
        filename: 'tecnicas_debug.py',
        description:
          'Tres tecnicas complementares: inspecionar tipos com type() e repr(), capturar erros com try/except para ver detalhes, e usar assert para verificar suposicoes criticas no codigo.',
      },
    },
  ],
  challenges: [
    {
      id: 'stack-trace-c1',
      title: 'Diagnostique o Erro',
      description:
        'O codigo abaixo vai gerar um erro quando executado. Antes de executar, leia o codigo e tente prever: qual sera o tipo do erro, em qual linha ele vai ocorrer e qual sera a mensagem? Depois corrija o problema.',
      language: 'python',
      starterCode:
        '# Leia o codigo e preveja o erro antes de executar\ndef buscar_nota(notas, aluno):\n    return notas[aluno]\n\ndef calcular_aprovacao(notas, aluno):\n    nota = buscar_nota(notas, aluno)\n    if nota >= 6:\n        return f"{aluno}: Aprovado ({nota})"\n    else:\n        return f"{aluno}: Reprovado ({nota})"\n\nnotas_turma = {\n    "Ana": 8.5,\n    "Bruno": 5.0,\n    "Carlos": 7.0\n}\n\n# Esta linha vai gerar um erro\nresultado = calcular_aprovacao(notas_turma, "Diana")\nprint(resultado)\n\n# Corrija o codigo para tratar o caso em que o aluno nao existe\n# Se o aluno nao esta no dicionario, retorne: "Diana: Aluno nao encontrado"\n',
      solution:
        '# O erro seria: KeyError: \'Diana\' em buscar_nota, linha 3\n# Pois "Diana" nao existe no dicionario notas_turma\n\ndef buscar_nota(notas, aluno):\n    if aluno not in notas:\n        return None  # Retorna None se aluno nao existe\n    return notas[aluno]\n\ndef calcular_aprovacao(notas, aluno):\n    nota = buscar_nota(notas, aluno)\n    if nota is None:\n        return f"{aluno}: Aluno nao encontrado"\n    if nota >= 6:\n        return f"{aluno}: Aprovado ({nota})"\n    else:\n        return f"{aluno}: Reprovado ({nota})"\n\nnotas_turma = {\n    "Ana": 8.5,\n    "Bruno": 5.0,\n    "Carlos": 7.0\n}\n\nprint(calcular_aprovacao(notas_turma, "Ana"))    # Ana: Aprovado (8.5)\nprint(calcular_aprovacao(notas_turma, "Bruno"))  # Bruno: Reprovado (5.0)\nprint(calcular_aprovacao(notas_turma, "Diana"))  # Diana: Aluno nao encontrado\n',
      hints: [
        'Trace o caminho: calcular_aprovacao chama buscar_nota, que acessa notas[aluno]. O que acontece quando aluno nao existe no dicionario?',
        'Um dicionario acesso com [] gera KeyError se a chave nao existe. Use .get() ou "in" para verificar antes.',
        'Para tratar o caso de aluno inexistente, retorne None de buscar_nota e verifique com "if nota is None" em calcular_aprovacao',
      ],
    },
  ],
};
