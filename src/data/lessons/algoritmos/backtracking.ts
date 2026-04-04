import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'backtracking',
  moduleId: 'algoritmos',
  title: 'Backtracking',
  description: 'Aprenda a resolver problemas explorando todas as possibilidades e recuando quando um caminho nao funciona.',
  order: 10,
  type: 'lesson',
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content: 'Imagine um labirinto: voce anda por um corredor, chega a um beco sem saida e **volta** para tentar outro caminho. Isso e **backtracking** — uma tecnica de busca que explora todas as possibilidades de forma sistematica, recuando quando percebe que um caminho nao leva a uma solucao.\n\nBacktracking e poderoso porque **poda** caminhos imposssiveis cedo, evitando trabalho desnecessario. E a base de algoritmos que resolvem quebra-cabecas, jogos e problemas de combinatoria.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Backtracking e uma forma especializada de recursao. A diferenca: quando um caminho falha, **desfazemos** a ultima escolha e tentamos outra. E como ter um lapiz com borracha — voce escreve, erra, apaga e tenta de novo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'template_backtracking.py',
        code: `# Template geral de backtracking
# Todo algoritmo de backtracking segue este esqueleto:

def backtrack(estado_atual, escolhas_disponiveis):
    # 1. CASO BASE: chegamos numa solucao valida?
    if solucao_completa(estado_atual):
        registrar_solucao(estado_atual)
        return

    # 2. ITERAR sobre cada escolha possivel
    for escolha in escolhas_disponiveis:

        # 3. VERIFICAR: esta escolha e valida agora?
        if e_valida(escolha, estado_atual):

            # 4. FAZER a escolha (modificar o estado)
            aplicar(escolha, estado_atual)

            # 5. RECURSAO: continuar a partir daqui
            backtrack(estado_atual, proximas_escolhas(escolha))

            # 6. DESFAZER a escolha (retroceder!)
            desfazer(escolha, estado_atual)

# O passo 6 e o coracao do backtracking:
# restauramos o estado como se a escolha nunca tivesse sido feita,
# assim o proximo loop itera com o estado limpo.`,
        description: 'Template universal: fazer uma escolha, recursao, desfazer a escolha. O passo de desfazer e o que define o backtracking.',
      },
    },
    {
      type: 'text',
      content: '**Problema das N-Rainhas**: coloque N rainhas num tabuleiro N×N de forma que nenhuma ataque outra. Duas rainhas se atacam se estiverem na mesma linha, coluna ou diagonal.\n\nComo pensar recursivamente: coloque uma rainha por linha, uma de cada vez. Em cada linha, tente cada coluna. Se a posicao for segura, coloque a rainha e va para a proxima linha. Se nenhuma coluna funcionar nessa linha, volte e mova a rainha da linha anterior.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'n_rainhas.py',
        code: `def resolver_n_rainhas(n):
    """Encontra todas as solucoes para o problema das N-Rainhas."""
    solucoes = []
    # 'rainhas' e uma lista onde rainhas[linha] = coluna da rainha nessa linha
    rainhas = []

    def e_seguro(linha, coluna):
        # Verifica se colocar uma rainha em (linha, coluna) e seguro
        for l in range(len(rainhas)):
            c = rainhas[l]
            # Mesma coluna?
            if c == coluna:
                return False
            # Mesma diagonal? (diferenca de linha == diferenca de coluna)
            if abs(l - linha) == abs(c - coluna):
                return False
        return True

    def backtrack(linha):
        # Caso base: colocamos rainhas em todas as N linhas
        if linha == n:
            solucoes.append(rainhas[:])  # copia da solucao atual
            return

        # Tentar cada coluna nesta linha
        for coluna in range(n):
            if e_seguro(linha, coluna):
                rainhas.append(coluna)      # 4. FAZER escolha
                backtrack(linha + 1)        # 5. RECURSAO
                rainhas.pop()               # 6. DESFAZER escolha

    backtrack(0)
    return solucoes

# Visualizar uma solucao como tabuleiro
def imprimir_tabuleiro(solucao, n):
    for linha in range(n):
        linha_str = ""
        for coluna in range(n):
            linha_str += "Q " if solucao[linha] == coluna else ". "
        print(linha_str)
    print()

solucoes = resolver_n_rainhas(4)
print(f"N=4: {len(solucoes)} solucoes encontradas")
imprimir_tabuleiro(solucoes[0], 4)
# . Q . .
# . . . Q
# Q . . .
# . . Q .

print(f"N=8: {len(resolver_n_rainhas(8))} solucoes encontradas")  # 92`,
        description: 'N-Rainhas classico: a lista rainhas[] e construida e destruida a cada tentativa. O pop() e o desfazer do backtracking.',
      },
    },
    {
      type: 'text',
      content: '**Permutacoes e combinacoes** sao outros usos classicos de backtracking. Para gerar todas as permutacoes de uma lista, escolhemos um elemento de cada vez e recursivamente permutamos o restante.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'permutacoes_combinacoes.py',
        code: `# PERMUTACOES: todas as ordens possiveis de N elementos
def permutacoes(elementos):
    resultado = []

    def backtrack(atual, restantes):
        if not restantes:
            resultado.append(atual[:])
            return
        for i in range(len(restantes)):
            atual.append(restantes[i])              # escolher
            backtrack(atual, restantes[:i] + restantes[i+1:])  # recursao
            atual.pop()                              # desfazer

    backtrack([], elementos)
    return resultado

print(permutacoes([1, 2, 3]))
# [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]] -> 6 = 3!

# COMBINACOES: subconjuntos de tamanho K (sem importar ordem)
def combinacoes(elementos, k):
    resultado = []

    def backtrack(inicio, atual):
        if len(atual) == k:
            resultado.append(atual[:])
            return
        # Poda: so olhamos para frente (inicio), evitando duplicatas
        for i in range(inicio, len(elementos)):
            atual.append(elementos[i])    # escolher
            backtrack(i + 1, atual)       # proximo elemento so pode vir depois
            atual.pop()                   # desfazer

    backtrack(0, [])
    return resultado

print(combinacoes([1, 2, 3, 4], 2))
# [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]] -> C(4,2) = 6`,
        description: 'Permutacoes e combinacoes via backtracking. Note que combinacoes usam "inicio" para nao revisitar elementos anteriores.',
      },
    },
    {
      type: 'text',
      content: '**Poda (Pruning)**: a grande otimizacao do backtracking. Em vez de explorar todos os caminhos, identificamos cedo que um ramo nunca levara a uma solucao e o ignoramos por completo.\n\nNo N-Rainhas, verificamos `e_seguro()` antes de continuar — isso e poda. Sem poda, o N-Rainhas precisaria explorar N^N combinacoes. Com poda, o espaco de busca cai dramaticamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'poda_exemplo.py',
        code: `# Exemplo de poda: soma de subconjunto
# Dado uma lista e um alvo, encontrar subconjuntos que somam exatamente alvo

def soma_subconjunto(nums, alvo):
    """Encontra todos os subconjuntos que somam 'alvo'."""
    nums.sort()  # Ordenar permite poda mais eficiente!
    resultado = []

    def backtrack(inicio, atual, soma_atual):
        # Caso base: encontramos uma solucao
        if soma_atual == alvo:
            resultado.append(atual[:])
            return

        for i in range(inicio, len(nums)):
            # PODA: se o menor elemento restante ja ultrapassa o alvo,
            # nenhuma combinacao futura pode funcionar (lista esta ordenada)
            if soma_atual + nums[i] > alvo:
                break  # <- PODA! Para o laco inteiro, nao so este elemento

            atual.append(nums[i])                        # escolher
            backtrack(i + 1, atual, soma_atual + nums[i]) # recursao
            atual.pop()                                  # desfazer

    backtrack(0, [], 0)
    return resultado

nums = [2, 3, 6, 7]
print(soma_subconjunto(nums, 7))   # [[7]]
print(soma_subconjunto(nums, 9))   # [[2, 7], [3, 6]]

# Sem poda: exploraria 2^4 = 16 combinacoes
# Com poda: muito menos — especialmente para listas grandes`,
        description: 'A poda com break para o laco inteiro quando soma ultrapassa o alvo. Isso pode eliminar grandes ramos da arvore de busca.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Dica de ouro: **ordene a entrada** antes de fazer backtracking sempre que possivel. Isso permite detectar que um ramo e impossivel mais cedo, tornando a poda muito mais eficaz. No problema da soma de subconjunto acima, sem a ordenacao o break nao funcionaria.',
    },
  ],
  challenges: [
    {
      id: 'backtracking-challenge-1',
      title: 'Resolver Sudoku com Backtracking',
      description:
        'Implemente um solucionador de Sudoku usando backtracking. O tabuleiro e uma grade 9x9 representada como lista de listas, onde 0 indica uma celula vazia. O algoritmo deve preencher os zeros respeitando as regras: cada linha, coluna e bloco 3x3 deve conter os digitos de 1 a 9 sem repeticao.',
      language: 'python',
      starterCode: `def resolver_sudoku(tabuleiro):
    """
    Resolve o Sudoku in-place usando backtracking.
    Retorna True se encontrou solucao, False caso contrario.
    tabuleiro: lista 9x9, onde 0 = celula vazia
    """

    def e_valido(linha, coluna, num):
        # Verifica se 'num' pode ser colocado em (linha, coluna)
        # Checar a linha
        # Checar a coluna
        # Checar o bloco 3x3
        pass

    def backtrack():
        # Encontrar a proxima celula vazia
        # Se nao houver, o tabuleiro esta completo!
        # Tentar cada numero de 1 a 9
        # Se valido: colocar, recursao, desfazer
        pass

    backtrack()
    return tabuleiro

# Teste (0 = vazio)
sudoku = [
    [5,3,0, 0,7,0, 0,0,0],
    [6,0,0, 1,9,5, 0,0,0],
    [0,9,8, 0,0,0, 0,6,0],

    [8,0,0, 0,6,0, 0,0,3],
    [4,0,0, 8,0,3, 0,0,1],
    [7,0,0, 0,2,0, 0,0,6],

    [0,6,0, 0,0,0, 2,8,0],
    [0,0,0, 4,1,9, 0,0,5],
    [0,0,0, 0,8,0, 0,7,9],
]
resolver_sudoku(sudoku)
print(sudoku[0])  # [5, 3, 4, 6, 7, 8, 9, 1, 2]
print(sudoku[4])  # [4, 2, 6, 8, 5, 3, 7, 9, 1]`,
      solution: `def resolver_sudoku(tabuleiro):
    def e_valido(linha, coluna, num):
        # Checar a linha
        if num in tabuleiro[linha]:
            return False
        # Checar a coluna
        for l in range(9):
            if tabuleiro[l][coluna] == num:
                return False
        # Checar o bloco 3x3
        bloco_l = (linha // 3) * 3
        bloco_c = (coluna // 3) * 3
        for l in range(bloco_l, bloco_l + 3):
            for c in range(bloco_c, bloco_c + 3):
                if tabuleiro[l][c] == num:
                    return False
        return True

    def backtrack():
        # Encontrar proxima celula vazia
        for l in range(9):
            for c in range(9):
                if tabuleiro[l][c] == 0:
                    for num in range(1, 10):
                        if e_valido(l, c, num):
                            tabuleiro[l][c] = num       # fazer escolha
                            if backtrack():             # recursao
                                return True
                            tabuleiro[l][c] = 0         # desfazer
                    return False  # nenhum numero funcionou: retroceder
        return True  # sem celulas vazias: solucao encontrada!

    backtrack()
    return tabuleiro

sudoku = [
    [5,3,0, 0,7,0, 0,0,0],
    [6,0,0, 1,9,5, 0,0,0],
    [0,9,8, 0,0,0, 0,6,0],
    [8,0,0, 0,6,0, 0,0,3],
    [4,0,0, 8,0,3, 0,0,1],
    [7,0,0, 0,2,0, 0,0,6],
    [0,6,0, 0,0,0, 2,8,0],
    [0,0,0, 4,1,9, 0,0,5],
    [0,0,0, 0,8,0, 0,7,9],
]
resolver_sudoku(sudoku)
print(sudoku[0])  # [5, 3, 4, 6, 7, 8, 9, 1, 2]
print(sudoku[4])  # [4, 2, 6, 8, 5, 3, 7, 9, 1]`,
      hints: [
        'Em e_valido, verifique: (1) se num esta na linha, (2) se esta na coluna, (3) se esta no bloco 3x3. O inicio do bloco e (linha//3)*3 e (coluna//3)*3.',
        'Em backtrack(), percorra o tabuleiro procurando a primeira celula com valor 0. Se nao encontrar nenhuma, retorne True — o sudoku esta resolvido!',
        'Para cada celula vazia, tente os numeros 1 a 9. Se e_valido retornar True, coloque o numero e chame backtrack() recursivamente. Se a recursao retornar False, volte o valor para 0 (desfazer) e tente o proximo numero.',
      ],
    },
  ],
};
