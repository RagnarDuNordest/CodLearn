import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'listas',
  moduleId: 'python',
  title: 'Listas',
  description: 'Aprenda a armazenar e manipular colecoes de dados usando listas.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Uma **lista** e uma colecao ordenada de valores. Pense nela como uma lista de compras: voce pode adicionar itens, remover itens e acessar qualquer item pela sua posicao.\n\nListas sao uma das estruturas mais importantes em Python!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'listas_basico.py',
        code: `# Criando listas
frutas = ["maca", "banana", "laranja"]
numeros = [1, 2, 3, 4, 5]
misturada = [1, "texto", True, 3.14]

# Acessando itens pelo indice (comeca em 0!)
print(frutas[0])   # maca
print(frutas[1])   # banana
print(frutas[-1])  # laranja (ultimo item)

# Tamanho da lista
print(len(frutas))  # 3`,
        description: 'Listas sao criadas com colchetes [] e os indices comecam em 0.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Em programacao, contamos a partir do 0! O primeiro item esta na posicao 0, o segundo na posicao 1, e assim por diante. Isso e chamado de "indexacao base zero".',
    },
    {
      type: 'text',
      content: '## Modificando Listas\n\nListas sao **mutaveis** — voce pode adicionar, remover e alterar elementos depois de cria-las. Os metodos mais usados sao:\n\n- **`append(item)`** — adiciona um item no final da lista\n- **`insert(posicao, item)`** — insere um item em uma posicao especifica\n- **`remove(valor)`** — remove a primeira ocorrencia de um valor\n- **`pop()`** — remove e retorna o ultimo item (ou um indice especifico)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'listas_metodos.py',
        code: `notas = [7.5, 8.0, 6.5]

# Adicionando itens
notas.append(9.0)        # Adiciona no final
notas.insert(0, 10.0)    # Adiciona na posicao 0

print(notas)  # [10.0, 7.5, 8.0, 6.5, 9.0]

# Removendo itens
notas.remove(6.5)         # Remove pelo valor
ultima = notas.pop()      # Remove e retorna o ultimo

# Iterando com for
for nota in notas:
    print(f"Nota: {nota}")`,
        description: 'Metodos como append, insert, remove e pop modificam a lista.',
      },
    },
    {
      type: 'text',
      content: '## Funcoes Uteis com Listas\n\nPython tem funcoes embutidas que facilitam muito o trabalho com listas:\n\n- **`sum(lista)`** — soma todos os numeros da lista\n- **`max(lista)`** — retorna o maior valor\n- **`min(lista)`** — retorna o menor valor\n- **`len(lista)`** — retorna a quantidade de itens\n\nAlém disso, voce pode **fatiar** uma lista usando `lista[inicio:fim]` para pegar apenas uma parte dela.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'lista_pratico.py',
        code: `# Exemplo pratico: calculando media de notas
notas = [8.0, 7.5, 9.0, 6.0, 8.5]

media = sum(notas) / len(notas)
maior_nota = max(notas)
menor_nota = min(notas)

print(f"Media: {media:.1f}")
print(f"Maior nota: {maior_nota}")
print(f"Menor nota: {menor_nota}")

# Fatiamento (slicing)
primeiras_tres = notas[0:3]
print(f"Primeiras 3: {primeiras_tres}")`,
        description: 'Funcoes como sum, max, min e fatiamento sao muito uteis com listas.',
      },
    },
  ],
  challenges: [
    {
      id: 'list-c1',
      title: 'Maior e Menor da Lista',
      description: 'Dada uma lista de numeros, encontre e imprima o maior valor, o menor valor e a diferenca entre eles. Nao use as funcoes max() e min() — use um laco for para encontrar os valores.',
      language: 'python',
      starterCode: `numeros = [45, 12, 78, 3, 56, 91, 23, 67]

# Encontre o maior e o menor valor SEM usar max() e min()
# Use um laco for para percorrer a lista

# Imprima o maior, o menor e a diferenca entre eles
`,
      solution: `numeros = [45, 12, 78, 3, 56, 91, 23, 67]

maior = numeros[0]
menor = numeros[0]

for num in numeros:
    if num > maior:
        maior = num
    if num < menor:
        menor = num

print(f"Maior: {maior}")
print(f"Menor: {menor}")
print(f"Diferenca: {maior - menor}")`,
      hints: [
        'Comece assumindo que o primeiro elemento e tanto o maior quanto o menor',
        'Percorra a lista com for e compare cada numero com o maior e menor atuais',
        'Se encontrar um numero maior, atualize a variavel maior. Mesmo para menor.',
      ],
    },
    {
      id: 'list-c2',
      title: 'Removedor de Duplicatas',
      description: 'Dada uma lista com valores repetidos, crie uma nova lista contendo apenas os valores unicos (sem duplicatas), mantendo a ordem original. Imprima a lista original e a lista sem duplicatas.',
      language: 'python',
      starterCode: `numeros = [3, 5, 3, 8, 5, 2, 8, 1, 3, 2]

# Crie uma nova lista vazia para os valores unicos
# Percorra a lista original
# Adicione o valor na nova lista apenas se ele ainda nao estiver la

# Imprima a lista original e a lista sem duplicatas
`,
      solution: `numeros = [3, 5, 3, 8, 5, 2, 8, 1, 3, 2]

unicos = []
for num in numeros:
    if num not in unicos:
        unicos.append(num)

print(f"Original: {numeros}")
print(f"Sem duplicatas: {unicos}")`,
      hints: [
        'Crie uma lista vazia: unicos = []',
        'Use "if valor not in lista" para verificar se o valor ja existe',
        'Use append() para adicionar o valor quando ele ainda nao estiver na lista',
      ],
    },
    {
      id: 'list-c3',
      title: 'Inverter Lista Manualmente',
      description: 'Dada uma lista, crie uma nova lista com os elementos na ordem inversa SEM usar o metodo reverse() ou fatiamento [::-1]. Use um laco for para construir a lista invertida. Depois, imprima ambas.',
      language: 'python',
      starterCode: `original = [10, 20, 30, 40, 50, 60]

# Crie uma nova lista invertida SEM usar reverse() ou [::-1]
# Dica: use insert(0, valor) ou percorra a lista de tras para frente

# Imprima a lista original e a invertida
`,
      solution: `original = [10, 20, 30, 40, 50, 60]

invertida = []
for item in original:
    invertida.insert(0, item)

print(f"Original: {original}")
print(f"Invertida: {invertida}")`,
      hints: [
        'Uma forma e usar insert(0, item) para sempre adicionar no inicio da nova lista',
        'Outra forma e percorrer a lista original de tras para frente com range(len(lista)-1, -1, -1)',
        'Cada item inserido na posicao 0 "empurra" os anteriores para a direita',
      ],
    },
  ],
};
