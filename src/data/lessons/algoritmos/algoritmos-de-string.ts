import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'algoritmos-de-string',
  moduleId: 'algoritmos',
  title: 'Algoritmos de String',
  description: 'Domine tecnicas avancadas para busca, comparacao e transformacao de textos com eficiencia.',
  order: 11,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: 'Strings estao em todo lugar: editores de texto, bancos de dados, bioinformatica (DNA e uma string!), buscadores web. Algoritmos de string eficientes fazem a diferenca entre uma busca que trava e uma que responde em milissegundos.\n\nNesta licao vamos sair da busca ingênua O(n*m) e aprender tecnicas que chegam a O(n+m) — uma diferenca enorme para textos longos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'busca_ingenua.py',
        code: `# Busca ingenua: O(n * m)
# n = tamanho do texto, m = tamanho do padrao

def busca_ingenua(texto, padrao):
    """Retorna lista com todos os indices onde padrao ocorre em texto."""
    n = len(texto)
    m = len(padrao)
    ocorrencias = []

    for i in range(n - m + 1):
        # Tenta casar padrao a partir da posicao i
        j = 0
        while j < m and texto[i + j] == padrao[j]:
            j += 1

        if j == m:  # casou o padrao inteiro
            ocorrencias.append(i)

    return ocorrencias

# Exemplo: buscar "ab" em "ababcab"
#           posicao: 0123456
texto = "ababcab"
print(busca_ingenua(texto, "ab"))   # [0, 2, 5]

# No pior caso (ex: texto="aaaa...a", padrao="aaab"),
# comparamos quase todos os pares -> O(n*m)
# Para texto de 1MB e padrao de 100 chars: ~100 milhoes de comparacoes!`,
        description: 'Busca ingenua: simples mas lenta. Para cada posicao do texto, tenta casar o padrao inteiro. O(n*m) no pior caso.',
      },
    },
    {
      type: 'text',
      content: '**KMP (Knuth-Morris-Pratt)**: O grande insight e que quando um casamento falha, **ja sabemos informacao sobre o texto**. Nao precisamos voltar no texto — so no padrao. O KMP pre-processa o padrao para calcular uma "tabela de falhas" que diz: se o casamento falhar na posicao j, quanto posso avancaro sem perder possibilidades?\n\nResultado: busca em **O(n + m)** — nunca retrocedemos no texto!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'kmp.py',
        code: `def kmp(texto, padrao):
    """KMP: busca em O(n + m). Nunca retrocede no texto."""
    n = len(texto)
    m = len(padrao)
    if m == 0:
        return [0]

    # PASSO 1: construir tabela de falhas (lps = longest proper prefix suffix)
    # lps[j] = tamanho do maior prefixo de padrao[0..j] que tambem e sufixo
    lps = [0] * m
    comprimento = 0  # tamanho do prefixo atual
    i = 1
    while i < m:
        if padrao[i] == padrao[comprimento]:
            comprimento += 1
            lps[i] = comprimento
            i += 1
        elif comprimento != 0:
            # Nao casou: tenta prefixo menor (sem incrementar i!)
            comprimento = lps[comprimento - 1]
        else:
            lps[i] = 0
            i += 1

    # Exemplo: padrao "ABABC" -> lps = [0, 0, 1, 2, 0]
    # "AB" e prefixo que tambem aparece como sufixo em "ABAB"

    # PASSO 2: busca usando a tabela lps
    ocorrencias = []
    i = 0  # indice no texto
    j = 0  # indice no padrao
    while i < n:
        if texto[i] == padrao[j]:
            i += 1
            j += 1
        if j == m:
            ocorrencias.append(i - j)  # encontrou!
            j = lps[j - 1]             # continua sem voltar no texto
        elif i < n and texto[i] != padrao[j]:
            if j != 0:
                j = lps[j - 1]  # pula usando a tabela, nao zera
            else:
                i += 1          # s  o avanca no texto

    return ocorrencias

print(kmp("ababcababd", "abad"))  # []
print(kmp("ababcababd", "abab"))  # [0, 5]
print(kmp("aaaaab", "aaab"))     # [2] (ingenua: 12 comparacoes, KMP: 9)`,
        description: 'KMP em duas fases: (1) construir tabela lps de falhas O(m), (2) busca O(n). Total O(n+m), nunca retrocede no texto.',
      },
    },
    {
      type: 'text',
      content: '**Rabin-Karp** usa uma ideia diferente: **hashing**. Em vez de comparar caractere por caractere, calcula um hash do padrao e desliza uma janela pelo texto, comparando hashes. So quando os hashes batem fazemos a comparacao real.\n\nO truque e o **hash rolante**: atualizar o hash da janela em O(1) ao deslizar, sem recalcular tudo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'rabin_karp.py',
        code: `def rabin_karp(texto, padrao):
    """Rabin-Karp com hash rolante polinomial."""
    n = len(texto)
    m = len(padrao)
    if m > n:
        return []

    BASE = 256    # numero de caracteres possiveis
    MOD  = 10**9 + 7  # primo grande para evitar colisoes

    # Calcular BASE^(m-1) % MOD (fator para remover o char mais antigo)
    h = pow(BASE, m - 1, MOD)

    # Hash inicial do padrao e da primeira janela do texto
    hash_p = 0
    hash_t = 0
    for i in range(m):
        hash_p = (BASE * hash_p + ord(padrao[i])) % MOD
        hash_t = (BASE * hash_t + ord(texto[i]))  % MOD

    ocorrencias = []

    for i in range(n - m + 1):
        # Hashes batem: verificar de verdade (evitar falsos positivos)
        if hash_p == hash_t:
            if texto[i:i+m] == padrao:  # comparacao real: O(m) so quando necessario
                ocorrencias.append(i)

        # Atualizar hash rolante: remover char saindo, adicionar char entrando
        if i < n - m:
            hash_t = (BASE * (hash_t - ord(texto[i]) * h) + ord(texto[i + m])) % MOD
            hash_t = (hash_t + MOD) % MOD  # garantir positivo

    return ocorrencias

print(rabin_karp("ABCABABD", "AB"))   # [0, 4, 5... nao, so [0, 4]
print(rabin_karp("banana", "ana"))    # [1, 3]
# Rabin-Karp e especialmente util para buscar MULTIPLOS padroes ao mesmo tempo`,
        description: 'Rabin-Karp: o hash rolante atualiza em O(1). Casos medios O(n+m). Excelente para busca de multiplos padroes.',
      },
    },
    {
      type: 'text',
      content: '**LCS (Maior Subsequencia Comum)**: dadas duas strings, qual e a maior subsequencia que aparece em ambas? Uma subsequencia nao precisa ser contigua — so precisa manter a ordem.\n\nExemplo: LCS("ABCBDAB", "BDCAB") = "BCAB" (tamanho 4).\n\nUsamos programacao dinamica: `dp[i][j]` = tamanho da LCS dos primeiros `i` chars de s1 e `j` chars de s2.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'lcs.py',
        code: `def lcs(s1, s2):
    """Maior Subsequencia Comum via programacao dinamica. O(n*m)."""
    m = len(s1)
    n = len(s2)

    # dp[i][j] = tamanho da LCS de s1[:i] e s2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                # Chars iguais: extender a LCS anterior
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                # Chars diferentes: melhor das duas opcoes sem um deles
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Reconstruir a subsequencia (opcional)
    def reconstruir():
        resultado = []
        i, j = m, n
        while i > 0 and j > 0:
            if s1[i-1] == s2[j-1]:
                resultado.append(s1[i-1])
                i -= 1
                j -= 1
            elif dp[i-1][j] > dp[i][j-1]:
                i -= 1
            else:
                j -= 1
        return ''.join(reversed(resultado))

    return dp[m][n], reconstruir()

tamanho, subseq = lcs("ABCBDAB", "BDCAB")
print(f"Tamanho: {tamanho}, Subsequencia: {subseq}")
# Tamanho: 4, Subsequencia: BCAB (ou BDAB, ha mais de uma LCS)

print(lcs("AGGTAB", "GXTXAYB"))  # (4, 'GTAB')`,
        description: 'LCS com DP: dp[i][j] combina resultados anteriores. Reconstrucao caminha de tras para frente na tabela.',
      },
    },
    {
      type: 'text',
      content: '**Distancia de Levenshtein (Distancia de Edicao)**: quantas operacoes (inserir, deletar, substituir um caractere) sao necessarias para transformar uma string em outra?\n\nAplicacoes: corretores ortograficos, deteccao de plagio, comparacao de sequencias de DNA, "voce quis dizer...?" em buscadores.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'levenshtein.py',
        code: `def distancia_edicao(s1, s2):
    """
    Distancia de Levenshtein entre s1 e s2.
    Operacoes permitidas: inserir, deletar, substituir (cada uma custa 1).
    Complexidade: O(m * n) tempo e espaco.
    """
    m = len(s1)
    n = len(s2)

    # dp[i][j] = distancia entre s1[:i] e s2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Caso base: transformar string vazia em s2[:j] = j insercoes
    for j in range(n + 1):
        dp[0][j] = j
    # Caso base: transformar s1[:i] em string vazia = i delecoes
    for i in range(m + 1):
        dp[i][0] = i

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                # Caracteres iguais: sem custo extra
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # deletar de s1
                    dp[i][j-1],    # inserir em s1 (ou deletar de s2)
                    dp[i-1][j-1]   # substituir
                )

    return dp[m][n]

# Exemplos
print(distancia_edicao("kitten", "sitting"))  # 3
# kitten -> sitten (k->s), sitten -> sittin (e->i), sittin -> sitting (+g)

print(distancia_edicao("gato", "pato"))    # 1  (g->p)
print(distancia_edicao("abc", ""))         # 3  (deletar todos)
print(distancia_edicao("flaw", "lawn"))    # 2
print(distancia_edicao("", ""))            # 0

# Similaridade percentual: quanto mais proximo de 0, mais similares
def similaridade(s1, s2):
    dist = distancia_edicao(s1, s2)
    max_len = max(len(s1), len(s2))
    if max_len == 0:
        return 100.0
    return (1 - dist / max_len) * 100

print(f"{similaridade('python', 'pithon'):.1f}%")  # 83.3% similar`,
        description: 'Levenshtein com DP: tres operacoes possiveis — deletar, inserir ou substituir. Similaridade = 1 - distancia/max_len.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Para verificacao de plagio, compare a distancia de edicao normalizada (dividida pelo tamanho maximo). Textos com similaridade acima de 80% merecem atencao. Na pratica, sistemas reais usam combinacoes de LCS, n-gramas e hashing para escalabilidade.',
    },
  ],
  challenges: [
    {
      id: 'algoritmos-de-string-challenge-1',
      title: 'Verificador de Plagio com Distancia de Edicao',
      description:
        'Implemente um verificador de plagio simples. A funcao verificar_plagio recebe uma lista de textos e um limiar de similaridade (0.0 a 1.0). Ela deve retornar uma lista de tuplas (i, j, similaridade) para todos os pares de textos com similaridade acima do limiar. A similaridade e 1.0 - (distancia_edicao / max(len(t1), len(t2))). Para tornar a comparacao mais justa, normalize os textos convertendo para minusculas.',
      language: 'python',
      starterCode: `def distancia_edicao(s1, s2):
    # Implemente a distancia de Levenshtein aqui
    pass

def verificar_plagio(textos, limiar=0.7):
    """
    Compara todos os pares de textos e retorna os suspeitos.
    Retorna: lista de (indice_i, indice_j, similaridade)
    onde similaridade >= limiar.
    """
    # Normalize os textos (lowercase)
    # Compare todos os pares (i, j) com i < j
    # Calcule a similaridade: 1 - dist / max(len(t1), len(t2))
    # Se similaridade >= limiar, adicione a lista de suspeitos
    pass

# Testes
textos = [
    "o gato comeu o rato",
    "o gato comeu o rato ontem",
    "python e uma linguagem de programacao",
    "o gato comeu o rato hoje cedo",
    "java e uma linguagem de programacao orientada a objetos",
]

suspeitos = verificar_plagio(textos, limiar=0.7)
for i, j, sim in suspeitos:
    print(f"Textos {i} e {j}: {sim:.1%} similares")
# Deve mostrar pares suspeitos de plagio`,
      solution: `def distancia_edicao(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(m + 1):
        dp[i][0] = i
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]

def verificar_plagio(textos, limiar=0.7):
    normalizados = [t.lower() for t in textos]
    suspeitos = []
    n = len(normalizados)
    for i in range(n):
        for j in range(i + 1, n):
            t1, t2 = normalizados[i], normalizados[j]
            dist = distancia_edicao(t1, t2)
            max_len = max(len(t1), len(t2))
            if max_len == 0:
                sim = 1.0
            else:
                sim = 1 - dist / max_len
            if sim >= limiar:
                suspeitos.append((i, j, sim))
    return suspeitos

textos = [
    "o gato comeu o rato",
    "o gato comeu o rato ontem",
    "python e uma linguagem de programacao",
    "o gato comeu o rato hoje cedo",
    "java e uma linguagem de programacao orientada a objetos",
]

suspeitos = verificar_plagio(textos, limiar=0.7)
for i, j, sim in suspeitos:
    print(f"Textos {i} e {j}: {sim:.1%} similares")`,
      hints: [
        'Implemente distancia_edicao com a tabela dp: dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1] + (0 se chars iguais, 1 se diferentes)).',
        'Em verificar_plagio, use dois lacos aninhados com i em range(n) e j em range(i+1, n) para comparar todos os pares sem repetir.',
        'A similaridade e: 1 - distancia_edicao(t1, t2) / max(len(t1), len(t2)). Se ela for >= limiar, adicione a tupla (i, j, sim) ao resultado.',
      ],
    },
  ],
};
