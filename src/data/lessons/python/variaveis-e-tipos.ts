import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-e-tipos',
  moduleId: 'python',
  title: 'Variaveis e Tipos de Dados',
  description:
    'Aprenda o que sao variaveis, como armazenar dados e os principais tipos de dados em Python.',
  order: 0,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Imagine que voce tem varias **caixas organizadas na sua estante**. Cada caixa tem uma etiqueta com um nome e guarda algo dentro dela — pode ser um numero, uma palavra ou ate mesmo uma lista de coisas.\n\nEm Python, **variaveis** funcionam exatamente assim: sao "caixas" na memoria do computador que guardam valores para voce usar depois. Voce escolhe o nome da etiqueta e coloca o que quiser dentro!\n\nPara criar uma variavel em Python, basta escolher um nome e usar o sinal de `=` para guardar um valor nela. Vamos ver como funciona:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Criando variaveis de diferentes tipos\nnome = "Maria"          # str (texto)\nidade = 25              # int (numero inteiro)\naltura = 1.68           # float (numero decimal)\nestudante = True        # bool (verdadeiro ou falso)\n\nprint(nome)\nprint(idade)\nprint(altura)\nprint(estudante)',
        filename: 'variaveis.py',
        description: 'Criando variaveis dos quatro tipos principais em Python.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Python e espertinho: quando voce escreve idade = 25, ele ja entende que e um numero inteiro. Voce nao precisa avisar o tipo! Isso torna o Python muito mais simples de usar do que outras linguagens.',
    },
    {
      type: 'text',
      content:
        '## Os Principais Tipos de Dados\n\nPython possui quatro tipos de dados fundamentais que voce vai usar o tempo todo:\n\n- **`int`** — Numeros inteiros: `10`, `-3`, `0`, `1000`\n- **`float`** — Numeros decimais: `3.14`, `-0.5`, `100.0`\n- **`str`** — Textos (strings): `"Ola"`, `\'Python\'`, `"123"`\n- **`bool`** — Valores logicos: `True` ou `False`\n\nVoce pode verificar o tipo de qualquer variavel usando a funcao `type()`. Vamos testar:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Usando a funcao type() para descobrir o tipo\nnome = "Carlos"\nidade = 30\npi = 3.14159\nativo = False\n\nprint(type(nome))     # <class \'str\'>\nprint(type(idade))    # <class \'int\'>\nprint(type(pi))       # <class \'float\'>\nprint(type(ativo))    # <class \'bool\'>',
        filename: 'tipos.py',
        description: 'Usando type() para verificar o tipo de cada variavel.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Voce esta indo muito bem! Saber os tipos de dados e um dos primeiros passos mais importantes na programacao. Com o tempo, isso vai ficar natural para voce.',
    },
    {
      type: 'text',
      content:
        '## Conversao de Tipos e Regras de Nomes\n\nAs vezes, voce precisa converter um tipo de dado em outro. Por exemplo, transformar um texto em numero para fazer calculos. Use as funcoes `int()`, `float()`, `str()` e `bool()` para isso.\n\n**Regras para nomear variaveis:**\n- Devem comecar com uma letra ou `_` (underscore)\n- Podem conter letras, numeros e `_`\n- Nao podem ter espacos ou caracteres especiais\n- Sao **case-sensitive**: `Nome` e `nome` sao variaveis diferentes\n- Nao podem ser palavras reservadas como `if`, `for`, `True`, etc.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Conversao de tipos\nidade_texto = "25"\nidade_numero = int(idade_texto)  # str -> int\nprint(idade_numero + 5)          # 30\n\npreco = 19.99\npreco_texto = str(preco)         # float -> str\nprint("O preco e R$" + preco_texto)\n\n# Nomes validos e boas praticas\nnome_completo = "Ana Silva"    # snake_case (recomendado)\n_idade = 20                    # comeca com underscore\nnota1 = 8.5                    # letras e numeros\n\n# Nomes invalidos (causam erro):\n# 1nome = "erro"    # comeca com numero\n# meu-nome = "erro" # contem hifen',
        filename: 'conversao.py',
        description:
          'Exemplos de conversao de tipos e regras de nomenclatura.',
      },
    },
    {
      type: 'text',
      content:
        '## Formatando Textos com f-strings\n\nAgora vamos aprender uma ferramenta super util: as **f-strings**! Elas permitem colocar variaveis diretamente dentro de um texto, sem precisar ficar concatenando com `+`.\n\nPara usar, basta colocar um `f` antes das aspas e as variaveis dentro de chaves `{}`. Veja como e simples:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'nome = "Maria"\nidade = 25\naltura = 1.68\n\n# Sem f-string (mais trabalhoso)\nprint("Meu nome e " + nome + " e tenho " + str(idade) + " anos")\n\n# Com f-string (muito mais facil!)\nprint(f"Meu nome e {nome} e tenho {idade} anos")\nprint(f"{nome} tem {altura}m de altura")\n\n# Voce pode ate fazer calculos dentro das chaves!\nprint(f"Ano que vem terei {idade + 1} anos")\n\n# O f antes das aspas permite colocar variaveis dentro de chaves {}',
        filename: 'fstrings.py',
        description: 'f-strings permitem inserir variaveis e expressoes dentro de textos de forma simples.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'As f-strings sao a forma mais pratica de misturar texto com variaveis em Python. Sempre que voce quiser exibir uma mensagem com valores de variaveis, use f-strings! Voce vai usar isso o tempo todo daqui pra frente.',
    },
  ],
  challenges: [
    {
      id: 'vt-c1',
      title: 'Ficha de Cadastro',
      description: 'Crie variaveis para armazenar seu nome, idade, altura e se voce e estudante. Depois imprima todas usando f-string.',
      language: 'python',
      starterCode: '# Crie as variaveis abaixo:\n# nome (string), idade (int), altura (float), estudante (bool)\n\n\n# Imprima uma frase usando f-string com todas as variaveis\n',
      solution: 'nome = "Raphael"\nidade = 20\naltura = 1.75\nestudante = True\n\nprint(f"Nome: {nome}, Idade: {idade}, Altura: {altura}m, Estudante: {estudante}")',
      hints: [
        'Strings usam aspas: nome = "seu nome"',
        'Booleans em Python comecam com maiuscula: True ou False',
        'f-strings usam f"texto {variavel}" para inserir valores',
      ],
    },
    {
      id: 'vt-c2',
      title: 'Conversor de Tipos',
      description: 'Converta a string "42" para inteiro, some 8, e imprima o resultado e o tipo.',
      language: 'python',
      starterCode: 'texto = "42"\n\n# Converta texto para inteiro e some 8\n\n# Imprima o resultado e o tipo do resultado\n',
      solution: 'texto = "42"\n\nresultado = int(texto) + 8\n\nprint(f"Resultado: {resultado}")\nprint(f"Tipo: {type(resultado)}")',
      hints: [
        'Use int() para converter string em inteiro',
        'Use type() para verificar o tipo de uma variavel',
      ],
    },
  ],
};
