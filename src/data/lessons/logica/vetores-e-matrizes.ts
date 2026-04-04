import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'vetores-e-matrizes',
  moduleId: 'logica',
  title: 'Vetores e Matrizes',
  description:
    'Aprenda a trabalhar com vetores (arrays unidimensionais) e matrizes (arrays bidimensionais). Entenda como armazenar, acessar e percorrer colecoes de dados usando indices e lacos.',
  order: 8,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine uma fileira de armarios numerados na escola. Vetores funcionam assim! E matrizes sao como uma planilha: linhas e colunas organizando dados.\n\n## O que sao vetores?\n\nAte agora, cada variavel guardava apenas um valor. Mas e se precisarmos armazenar as notas de 50 alunos? Criar 50 variaveis separadas (nota1, nota2, nota3...) seria impraticavel.\n\nUm **vetor** (tambem chamado de array unidimensional) e uma estrutura que armazena varios valores do mesmo tipo em uma unica variavel. Cada valor ocupa uma posicao identificada por um **indice** (numero que comeca em 0).\n\n```\nIndice:    0      1      2      3      4\n         +------+------+------+------+------+\nnotas:   | 8.5  | 7.0  | 9.2  | 6.8  | 10.0 |\n         +------+------+------+------+------+\n```\n\nNo pseudocodigo, declaramos e acessamos vetores assim:\n\n```\n// Declaracao\nDECLARE notas[5] NUMERICO\n\n// Atribuicao\nnotas[0] <- 8.5\nnotas[1] <- 7.0\n\n// Leitura\nESCREVA notas[0]    // Exibe 8.5\n```\n\nO primeiro elemento esta no indice **0** e o ultimo no indice **tamanho - 1**. Isso e padrao na maioria das linguagens de programacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO PreencherEExibirVetor\n#   DECLARE notas[5] NUMERICO\n#   PARA i DE 0 ATE 4 FACA\n#     ESCREVA "Digite a nota ", i + 1, ": "\n#     LEIA notas[i]\n#   FIM PARA\n#   ESCREVA "Notas digitadas:"\n#   PARA i DE 0 ATE 4 FACA\n#     ESCREVA "Nota ", i + 1, ": ", notas[i]\n#   FIM PARA\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nnotas = []  # Cria um vetor vazio\n\n# Preencher o vetor\nfor i in range(5):\n    nota = float(input("Digite a nota " + str(i + 1) + ": "))\n    notas.append(nota)  # Adiciona ao final do vetor\n\n# Exibir o vetor\nprint("Notas digitadas:")\nfor i in range(len(notas)):\n    print("Nota " + str(i + 1) + ": " + str(notas[i]))',
        filename: 'vetor_basico.py',
        description:
          'Preenchendo e exibindo um vetor com laco FOR. Em Python, listas funcionam como vetores. Usamos append() para adicionar elementos e acessamos por indice com colchetes [].',
      },
    },
    {
      type: 'text',
      content:
        '## Operacoes comuns com vetores\n\nAs operacoes mais frequentes com vetores sao:\n\n- **Busca**: encontrar um elemento especifico (busca linear)\n- **Maior/Menor**: encontrar o maior ou menor valor\n- **Soma e Media**: somar todos os elementos e calcular a media\n- **Contagem**: contar quantos elementos atendem a um criterio\n\nTodas essas operacoes seguem o mesmo padrao: percorrer o vetor com um laco e processar cada elemento.\n\n## Matrizes (arrays bidimensionais)\n\nUma **matriz** e como uma tabela com linhas e colunas. Pense em uma planilha: cada celula e identificada pela combinacao da linha e coluna.\n\n```\n           Coluna 0  Coluna 1  Coluna 2\nLinha 0:  [  1,        2,        3  ]\nLinha 1:  [  4,        5,        6  ]\nLinha 2:  [  7,        8,        9  ]\n```\n\nNo pseudocodigo:\n```\nDECLARE matriz[3][3] NUMERICO\nmatriz[0][0] <- 1\nmatriz[1][2] <- 6\n```\n\nPara percorrer uma matriz, usamos dois lacos aninhados: um para as linhas e outro para as colunas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO BuscaMaiorMenor\n#   DECLARE valores[6] NUMERICO\n#   valores <- [15, 8, 23, 4, 42, 16]\n#   maior <- valores[0]\n#   menor <- valores[0]\n#   soma <- 0\n#   PARA i DE 0 ATE 5 FACA\n#     SE valores[i] > maior ENTAO\n#       maior <- valores[i]\n#     FIM SE\n#     SE valores[i] < menor ENTAO\n#       menor <- valores[i]\n#     FIM SE\n#     soma <- soma + valores[i]\n#   FIM PARA\n#   media <- soma / 6\n#   ESCREVA "Maior: ", maior\n#   ESCREVA "Menor: ", menor\n#   ESCREVA "Media: ", media\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nvalores = [15, 8, 23, 4, 42, 16]\n\nmaior = valores[0]\nmenor = valores[0]\nsoma = 0\n\nfor i in range(len(valores)):\n    if valores[i] > maior:\n        maior = valores[i]\n    if valores[i] < menor:\n        menor = valores[i]\n    soma = soma + valores[i]\n\nmedia = soma / len(valores)\n\nprint("Maior: " + str(maior))\nprint("Menor: " + str(menor))\nprint("Media: " + str(media))',
        filename: 'busca_maior_menor.py',
        description:
          'Encontrar o maior, menor e media de um vetor. A estrategia e inicializar maior e menor com o primeiro elemento e depois comparar com cada elemento do vetor.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO - MATRIZ:\n# ============================\n# ALGORITMO SomaMatriz\n#   DECLARE mat[3][3] NUMERICO\n#   // Preencher\n#   PARA i DE 0 ATE 2 FACA\n#     PARA j DE 0 ATE 2 FACA\n#       LEIA mat[i][j]\n#     FIM PARA\n#   FIM PARA\n#   // Exibir\n#   PARA i DE 0 ATE 2 FACA\n#     PARA j DE 0 ATE 2 FACA\n#       ESCREVA mat[i][j], " "\n#     FIM PARA\n#   FIM PARA\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\n# Criando uma matriz 3x3\nmatriz = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Exibir a matriz\nprint("Matriz:")\nfor i in range(3):\n    linha = ""\n    for j in range(3):\n        linha = linha + str(matriz[i][j]) + "\\t"\n    print(linha)\n\n# Somar todos os elementos\nsoma = 0\nfor i in range(3):\n    for j in range(3):\n        soma = soma + matriz[i][j]\n\nprint("Soma de todos os elementos: " + str(soma))',
        filename: 'matriz_basica.py',
        description:
          'Matriz 3x3 em Python usando lista de listas. Dois lacos aninhados percorrem linhas (i) e colunas (j). O primeiro laco exibe a matriz formatada, o segundo soma todos os elementos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Em Python, listas sao muito mais flexiveis que vetores tradicionais: podem ter tamanhos dinamicos e misturar tipos de dados. Porem, em logica de programacao, tratamos listas como vetores com tamanho fixo e tipo unico, pois a maioria das linguagens (C, Java) funciona assim.',
    },
    {
      type: 'callout',
      content:
        'Logica de programacao e a base de tudo! Se voce entender bem, aprender qualquer linguagem fica muito mais facil.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Vetores e matrizes em Python\n\nEm Python, vetores sao chamados de **listas**. Veja como trabalhar com elas:\n\n**Criar lista:** `numeros = [34, 12, 78, 5]`\n\n**Acessar elemento:** `numeros[0]` (primeiro), `numeros[-1]` (ultimo)\n\n**Tamanho:** `len(numeros)` retorna quantos elementos tem\n\n**Percorrer:** `for i in range(len(numeros)):` — usa indice i. Ou: `for num in numeros:` — acessa cada elemento diretamente\n\n**Acumulador:** comece com `soma = 0` e va somando: `soma = soma + numeros[i]`\n\n**Contadores:** comece com `acima = 0` e incremente: `acima = acima + 1` ou `acima += 1`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'vetores_python.py',
        code: `# Trabalhando com listas (vetores) em Python
numeros = [34, 12, 78, 5, 56, 23, 89, 45, 10, 67]

# Encontrar o maior e menor elemento
maior = numeros[0]   # Começa com o primeiro elemento
menor = numeros[0]
pos_maior = 0
pos_menor = 0

for i in range(len(numeros)):      # i vai de 0 ate 9
    if numeros[i] > maior:
        maior = numeros[i]
        pos_maior = i
    if numeros[i] < menor:
        menor = numeros[i]
        pos_menor = i

print("Maior:", maior, "na posicao", pos_maior)
print("Menor:", menor, "na posicao", pos_menor)

# Calcular media e contar
notas = [7.5, 8.0, 5.5, 9.0, 6.0, 7.0, 4.5, 8.5]
soma = 0
for i in range(len(notas)):
    soma = soma + notas[i]  # Acumula

media = soma / len(notas)   # Divide pelo total

acima = 0
abaixo = 0
for i in range(len(notas)):
    if notas[i] >= media:
        acima += 1   # acima = acima + 1
    else:
        abaixo += 1

print("Media:", round(media, 1))
print("Acima:", acima, "| Abaixo:", abaixo)`,
        description: 'Listas em Python: [], len() para tamanho, for i in range(len()): para percorrer com indice.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Dois jeitos de percorrer uma lista em Python:\n1. Com indice: `for i in range(len(lista)):` → use quando precisar do indice i\n2. Direto: `for item in lista:` → mais simples quando so precisa do valor\nNo exercicio, use o primeiro jeito (com range e len) para praticar o acesso por indice.',
    },
  ],
  challenges: [
    {
      id: 'vm-c1',
      title: 'Encontrar maior e menor valor',
      description:
        'Dado um vetor de numeros inteiros, encontre e exiba o maior e o menor valor. Exiba tambem em qual posicao (indice) cada um se encontra.',
      language: 'python',
      starterCode: '# Encontrar maior e menor valor em um vetor\nnumeros = [34, 12, 78, 5, 56, 23, 89, 45, 10, 67]\n\n# Inicialize as variaveis maior e menor com o primeiro elemento\n# Percorra o vetor comparando cada elemento\n# Guarde tambem a posicao (indice) do maior e do menor\n\n# Exiba o maior valor e sua posicao\n# Exiba o menor valor e sua posicao\n',
      solution: 'numeros = [34, 12, 78, 5, 56, 23, 89, 45, 10, 67]\n\nmaior = numeros[0]\nmenor = numeros[0]\npos_maior = 0\npos_menor = 0\n\nfor i in range(len(numeros)):\n    if numeros[i] > maior:\n        maior = numeros[i]\n        pos_maior = i\n    if numeros[i] < menor:\n        menor = numeros[i]\n        pos_menor = i\n\nprint("Maior valor: " + str(maior) + " (posicao " + str(pos_maior) + ")")\nprint("Menor valor: " + str(menor) + " (posicao " + str(pos_menor) + ")")',
      hints: [
        'Inicialize maior e menor com numeros[0] e pos_maior e pos_menor com 0.',
        'Dentro do laco, ao encontrar um valor maior, atualize tanto o valor quanto a posicao.',
        'Use duas verificacoes separadas (if, nao elif) para maior e menor, pois sao independentes.',
      ],
    },
    {
      id: 'vm-c2',
      title: 'Calcular media dos elementos',
      description:
        'Dado um vetor com as notas de alunos, calcule a media da turma. Depois, exiba quantos alunos ficaram acima da media e quantos ficaram abaixo.',
      language: 'python',
      starterCode: '# Media e classificacao de alunos\nnotas = [7.5, 8.0, 5.5, 9.0, 6.0, 7.0, 4.5, 8.5]\n\n# Calcule a soma de todas as notas\n# Calcule a media\n\n# Conte quantos alunos ficaram acima e abaixo da media\n\n# Exiba a media, quantidade acima e quantidade abaixo\n',
      solution: 'notas = [7.5, 8.0, 5.5, 9.0, 6.0, 7.0, 4.5, 8.5]\n\nsoma = 0\nfor i in range(len(notas)):\n    soma = soma + notas[i]\n\nmedia = soma / len(notas)\n\nacima = 0\nabaixo = 0\nfor i in range(len(notas)):\n    if notas[i] >= media:\n        acima = acima + 1\n    else:\n        abaixo = abaixo + 1\n\nprint("Media da turma: " + str(round(media, 1)))\nprint("Acima da media: " + str(acima) + " alunos")\nprint("Abaixo da media: " + str(abaixo) + " alunos")',
      hints: [
        'Primeiro percorra o vetor somando todas as notas. Depois divida pelo tamanho (len).',
        'Faca um segundo laco para contar quantos estao acima e abaixo da media.',
        'Use len(notas) para obter o tamanho do vetor sem precisar contar manualmente.',
      ],
    },
    {
      id: 'vm-c3',
      title: 'Busca linear em vetor',
      description:
        'Implemente uma busca linear: dado um vetor de nomes e um nome para buscar, percorra o vetor e informe se o nome foi encontrado e em qual posicao. Se nao for encontrado, exiba uma mensagem informando.',
      language: 'python',
      starterCode: '# Busca linear em vetor de nomes\nnomes = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda"]\nbusca = "Diana"\n\n# Percorra o vetor procurando o nome\n# Se encontrar, exiba a posicao e pare a busca\n# Se nao encontrar, exiba "Nome nao encontrado"\n',
      solution: 'nomes = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda"]\nbusca = "Diana"\n\nencontrado = False\nposicao = -1\n\nfor i in range(len(nomes)):\n    if nomes[i] == busca:\n        encontrado = True\n        posicao = i\n        break\n\nif encontrado:\n    print("Nome \\"" + busca + "\\" encontrado na posicao " + str(posicao))\nelse:\n    print("Nome \\"" + busca + "\\" nao encontrado")',
      hints: [
        'Use uma variavel booleana "encontrado" inicializada como False para saber se achou o nome.',
        'Dentro do laco, compare nomes[i] == busca. Se for igual, marque encontrado = True e guarde a posicao.',
        'Use break para parar o laco assim que encontrar, pois nao precisa continuar procurando.',
      ],
    },
  ],
};
