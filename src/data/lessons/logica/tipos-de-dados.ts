import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'tipos-de-dados',
  moduleId: 'logica',
  title: 'Tipos de Dados',
  description:
    'Entenda os tipos fundamentais de dados que existem em qualquer linguagem de programacao: numeros inteiros, decimais, textos e valores logicos.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine que voce esta organizando uma mochila. Voce nao mistura o lanche com o caderno, nem o caderno com o celular — cada coisa tem seu lugar e seu tipo.\n\nNo computador e igual. Todo dado tem um **tipo**, e o computador precisa saber o tipo para saber como trabalhar com ele. Voce nao pode somar uma palavra com um numero, assim como nao pode comer o caderno.\n\n## Por que tipos de dados importam?\n\nOs tipos de dados definem:\n- **O que** pode ser armazenado (um numero? uma palavra? sim/nao?)\n- **Como** o computador guarda na memoria\n- **Quais operacoes** sao permitidas (voce soma numeros, mas nao palavras da mesma forma)\n- **Quanta memoria** e usada\n\nToda linguagem de programacao — Python, C, Java, JavaScript — tem os mesmos tipos fundamentais. Os nomes mudam, mas o conceito e identico.',
    },
    {
      type: 'text',
      content:
        '## Os 4 tipos fundamentais\n\nExistem 4 tipos de dados que aparecem em absolutamente todas as linguagens:\n\n### 1. Inteiro (int)\nNumeros **sem** parte decimal. Podem ser positivos, negativos ou zero.\n- Exemplos: `0`, `1`, `-5`, `1000`, `-999`\n- Uso: idade, quantidade de itens, placar de jogo, ano, numero de alunos\n\n### 2. Real / Decimal (float)\nNumeros **com** parte decimal. O nome "float" vem de "ponto flutuante".\n- Exemplos: `3.14`, `-0.5`, `100.0`, `1.999`\n- Uso: preco, temperatura, altura, nota, peso, coordenadas GPS\n\n### 3. Texto (string)\nUma sequencia de caracteres — letras, numeros, simbolos, espacos. Sempre entre aspas.\n- Exemplos: `"Ola"`, `"Maria"`, `"123"`, `"!@#"`, `""`\n- Uso: nome, endereco, mensagem, email, CPF (sim, CPF e texto!)\n\n### 4. Logico / Booleano (bool)\nSo tem dois valores possiveis: **verdadeiro** ou **falso**.\n- Exemplos: `True`, `False`\n- Uso: esta logado?, tem desconto?, aprovado?, ligado/desligado',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Os 4 tipos fundamentais em Python\n\n# 1. Inteiro (int)\nidade = 20\nanoPagamento = -3\nplacar = 0\nprint(type(idade))        # <class \'int\'>\n\n# 2. Decimal (float)\npreco = 49.90\ntemperatura = -2.5\nnota = 8.75\nprint(type(preco))        # <class \'float\'>\n\n# 3. Texto (string)\nnome = "Raphael"\ncpf = "123.456.789-00"   # CPF e texto, nao numero!\nmensagem = "Ola, mundo!"\nprint(type(nome))         # <class \'str\'>\n\n# 4. Logico (bool)\nestaLogado = True\ntemDesconto = False\naprovado = True\nprint(type(estaLogado))   # <class \'bool\'>\n\n# Mostrando tudo junto\nprint(f"Nome: {nome}, Idade: {idade}, Nota: {nota}, Aprovado: {aprovado}")',
        filename: 'tipos_fundamentais.py',
        description:
          'Em Python, use type() para ver o tipo de qualquer variavel. Note que CPF e armazenado como texto porque nao fazemos contas com ele e porque tem pontos e tracos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Armadilha classica: "123" NAO e o mesmo que 123! "123" e texto (string) e 123 e numero (int). Voce nao consegue fazer contas com "123". Se tentar somar "123" + "456" em Python, o resultado e "123456" (concatenacao de texto), nao 579!',
    },
    {
      type: 'text',
      content:
        '## Conversao entre tipos\n\nAs vezes voce precisa transformar um tipo em outro. Isso se chama **casting** ou **conversao de tipo**.\n\nCasos comuns:\n- Usuario digitou um numero, mas o programa recebeu como texto → converter para int ou float\n- Voce quer mostrar um numero dentro de uma frase → converter para string\n- Voce quer saber se um numero e diferente de zero (True/False) → converter para bool\n\n**Regras importantes:**\n- `int("42")` → funciona → `42`\n- `int("ola")` → **ERRO** — nao da para transformar texto aleatorio em numero\n- `int(3.9)` → `3` — o float e truncado (nao arredondado!)\n- `float("3.14")` → funciona → `3.14`\n- `str(100)` → `"100"` — sempre funciona\n- `bool(0)` → `False`, `bool(1)` → `True`, `bool("")` → `False`, `bool("oi")` → `True`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Conversao de tipos (casting)\n\n# String → int (muito comum ao ler dados do usuario)\nidadeTexto = "25"\nidadeNumero = int(idadeTexto)\nprint(idadeNumero + 5)    # 30 (agora da para fazer conta!)\n\n# String → float\nprecoTexto = "49.90"\nprecoNumero = float(precoTexto)\nprint(precoNumero * 2)    # 99.8\n\n# int → string (para montar mensagens)\npontos = 150\nmensagem = "Voce tem " + str(pontos) + " pontos!"\nprint(mensagem)            # Voce tem 150 pontos!\n\n# float → int (CUIDADO: trunca, nao arredonda!)\nnotaFloat = 7.9\nnotaInt = int(notaFloat)\nprint(notaInt)             # 7, nao 8!\n\n# Qualquer valor → bool\nprint(bool(0))     # False (zero e falso)\nprint(bool(5))     # True  (qualquer numero != 0 e verdadeiro)\nprint(bool(""))    # False (texto vazio e falso)\nprint(bool("oi"))  # True  (texto com conteudo e verdadeiro)',
        filename: 'conversao_tipos.py',
        description:
          'int() trunca o decimal (7.9 vira 7, nao 8). Para arredondar, use round(). Para verificar se a conversao vai funcionar antes de tentar, verifique se o texto contem apenas digitos com .isdigit().',
      },
    },
    {
      type: 'text',
      content:
        '## Tipos compostos: colecoes de dados\n\nAlem dos 4 tipos basicos, existem tipos que guardam **multiplos valores**:\n\n### Lista (list)\nUma sequencia **ordenada** e **mutavel** de valores. Como uma fila de elementos.\n```\nnotas = [7.5, 8.0, 9.5, 6.0]\nnomes = ["Ana", "Carlos", "Maria"]\n```\n\n### Tupla (tuple)\nIgual a lista, mas **imutavel** — nao pode ser modificada depois de criada.\n```\ncoordenadas = (-23.5, -46.6)\nrgb = (255, 128, 0)\n```\n\n### Dicionario (dict)\nGuarda pares de **chave: valor**. Como um cadastro ou ficha.\n```\naluno = {"nome": "Raphael", "idade": 20, "nota": 8.5}\n```\n\nVoce vai aprender cada um desses em profundidade nas proximas aulas. Por enquanto, o importante e saber que eles existem e sao muito usados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Tipos compostos — uma introducao\n\n# Lista: colecao ordenada, pode ter tipos mistos\nnotas = [7.5, 8.0, 9.5, 6.0]\nnomes = ["Ana", "Carlos", "Maria"]\nmisto = [1, "texto", True, 3.14]\n\nprint(notas)              # [7.5, 8.0, 9.5, 6.0]\nprint(nomes[0])           # Ana (acessa pelo indice, começa em 0)\nprint(len(notas))         # 4 (numero de elementos)\n\n# Tupla: imutavel (nao pode alterar)\ncoordenadas = (-23.5505, -46.6333)  # Sao Paulo\nprint(coordenadas[0])     # -23.5505\n\n# Dicionario: chave → valor\naluno = {\n    "nome": "Raphael",\n    "idade": 20,\n    "nota": 8.5,\n    "aprovado": True\n}\nprint(aluno["nome"])      # Raphael\nprint(aluno["aprovado"])  # True',
        filename: 'tipos_compostos.py',
        description:
          'Listas, tuplas e dicionarios sao estruturas de dados fundamentais. Indices de lista comecam em 0 (o primeiro elemento e [0], o segundo e [1], etc.).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Escolha o tipo certo para o dado certo! CPF, telefone e CEP sao textos (tem zeros a esquerda e caracteres especiais). Preco e float. Quantidade e int. Status (ativo/inativo) e bool. Essa escolha certa evita muitos bugs e deixa o codigo mais eficiente.',
    },
    {
      type: 'text',
      content:
        '## Tamanho dos tipos na memoria\n\nO computador guarda cada tipo de forma diferente na memoria. Isso importa quando voce trabalha com sistemas embarcados ou processa muitos dados.\n\n| Tipo | Tamanho tipico | Faixa de valores |\n|------|----------------|------------------|\n| bool | 1 bit (na teoria) | True ou False |\n| int | 4 ou 8 bytes | -2 bilhoes a +2 bilhoes |\n| float | 8 bytes | ate ~15 casas decimais |\n| string | 1+ bytes por caractere | qualquer texto |\n\nEm Python, voce nao precisa se preocupar muito com isso (Python gerencia automaticamente). Em C e Java, a escolha do tipo exato (`int`, `long`, `short`, `double`, `float`) faz diferenca de performance e memoria.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Resumo dos 4 pilares dos tipos de dados: (1) int para numeros sem casas decimais, (2) float para numeros com casas decimais, (3) str para qualquer texto entre aspas, (4) bool para True/False. Todos os outros tipos das linguagens sao variacoes ou combinacoes desses 4 fundamentais.',
    },
  ],
  challenges: [
    {
      id: 'td-c1',
      title: 'Identificar tipos corretos',
      description: 'Crie as variaveis com os tipos corretos: nome do aluno, sua idade, sua media (com decimal), se foi aprovado (True/False) e suas 3 notas em lista. Mostre cada valor e tipo com type().',
      language: 'python',
      starterCode: '# Crie variaveis com os tipos corretos para:\n# - nome de um aluno\n# - sua idade\n# - sua media (com casas decimais)\n# - se foi aprovado (sim ou nao)\n# - suas 3 notas em uma lista\n\n# Seu codigo:\n',
      solution: 'nome = "Ana"\nidade = 17\nmedia = 8.5\naprovado = True\nnotas = [7.5, 8.0, 10.0]\n\nprint(nome, type(nome))\nprint(idade, type(idade))\nprint(media, type(media))\nprint(aprovado, type(aprovado))\nprint(notas, type(notas))',
      hints: [
        'Nome e qualquer texto → string, use aspas: nome = "Ana"',
        'Idade e numero inteiro → int: idade = 17',
        'Media com decimal → float: media = 8.5',
        'Aprovado e sim/nao → bool: aprovado = True',
        'Lista de notas usa colchetes: notas = [7.5, 8.0, 10.0]',
      ],
    },
    {
      id: 'td-c2',
      title: 'Cadastro com conversao de tipos',
      description: 'Dados chegam como texto (como num input()). Converta nome_input, idade_input ("23"), altura_input ("1.78") e ativo_input ("1") para os tipos corretos. Mostre os tipos e calcule se pode criar conta (maior de 18 e ativo).',
      language: 'python',
      starterCode: 'nome_input = "Carlos"\nidade_input = "23"\naltura_input = "1.78"\nativo_input = "1"\n\nnome = nome_input\nidade = ???\naltura = ???\nativo = ???\n\nprint(f"Nome: {nome} ({type(nome).__name__})")\nprint(f"Idade: {idade} ({type(idade).__name__})")\nprint(f"Altura: {altura} ({type(altura).__name__})")\nprint(f"Ativo: {ativo} ({type(ativo).__name__})")\nprint(f"Pode criar conta: {idade >= 18 and ativo}")\n',
      solution: 'nome_input = "Carlos"\nidade_input = "23"\naltura_input = "1.78"\nativo_input = "1"\n\nnome = nome_input\nidade = int(idade_input)\naltura = float(altura_input)\nativo = bool(int(ativo_input))\n\nprint(f"Nome: {nome} ({type(nome).__name__})")\nprint(f"Idade: {idade} ({type(idade).__name__})")\nprint(f"Altura: {altura} ({type(altura).__name__})")\nprint(f"Ativo: {ativo} ({type(ativo).__name__})")\nprint(f"Pode criar conta: {idade >= 18 and ativo}")',
      hints: [
        'int(texto) converte texto para inteiro: int("23") → 23',
        'float(texto) converte para decimal: float("1.78") → 1.78',
        '"1" e texto! Converta para int primeiro, depois bool: bool(int("1"))',
        'type(x).__name__ mostra o nome do tipo sem o <class>',
      ],
    },
  ],
};
