export interface CommunityTip {
  id: string;
  author: string;
  avatarEmoji: string;
  text: string;
  likes: number;
  tags: string[];
}

// Static community tips indexed by topic/tag
const tips: CommunityTip[] = [
  // Variables & types
  { id: 't1', author: 'Ana S.', avatarEmoji: '👩‍💻', text: 'Use nomes de variáveis descritivos! `total_vendas` é muito melhor que `x`.', likes: 42, tags: ['variaveis', 'boas-praticas'] },
  { id: 't2', author: 'Carlos M.', avatarEmoji: '🧑‍💻', text: 'Em Python, `type(variavel)` te diz o tipo de uma variável — super útil para debug!', likes: 38, tags: ['variaveis', 'debug', 'tipos'] },
  { id: 't3', author: 'Julia R.', avatarEmoji: '👩‍🎓', text: 'Cuidado com a diferença entre `=` (atribuição) e `==` (comparação). É um erro clássico de iniciante!', likes: 71, tags: ['variaveis', 'operadores', 'erros-comuns'] },

  // Loops
  { id: 't4', author: 'Pedro L.', avatarEmoji: '🧑‍🚀', text: '`enumerate(lista)` é mais Pythônico que usar um índice manual. Ex: `for i, item in enumerate(lista):`', likes: 55, tags: ['loops', 'python', 'boas-praticas'] },
  { id: 't5', author: 'Mariana F.', avatarEmoji: '👩‍🔬', text: 'Prefira `for item in lista` ao invés de `for i in range(len(lista))`. É mais legível!', likes: 63, tags: ['loops', 'listas', 'boas-praticas'] },
  { id: 't6', author: 'Rodrigo T.', avatarEmoji: '🧙‍♂️', text: '`break` sai do loop, `continue` pula para a próxima iteração. Aprendi isso na marra!', likes: 44, tags: ['loops', 'controle'] },

  // Functions
  { id: 't7', author: 'Beatriz C.', avatarEmoji: '🦊', text: 'Funções devem fazer UMA coisa só. Se a sua função faz muitas coisas, divida em funções menores.', likes: 88, tags: ['funcoes', 'boas-praticas'] },
  { id: 't8', author: 'Lucas A.', avatarEmoji: '🤖', text: 'Use docstrings para documentar suas funções: `"""Descrição da função."""` logo abaixo do `def`.', likes: 57, tags: ['funcoes', 'documentacao'] },
  { id: 't9', author: 'Sofia N.', avatarEmoji: '🧝‍♀️', text: 'Parâmetros com valor default são ótimos! Ex: `def saudar(nome, greeting="Olá"):`', likes: 49, tags: ['funcoes', 'parametros'] },

  // Lists
  { id: 't10', author: 'Miguel B.', avatarEmoji: '🐱', text: 'List comprehension é poderosa: `[x*2 for x in lista if x > 0]` em vez de 4 linhas de for.', likes: 76, tags: ['listas', 'python', 'boas-praticas'] },
  { id: 't11', author: 'Fernanda O.', avatarEmoji: '👩‍💻', text: '`lista[-1]` acessa o último elemento. `lista[-2]` o penúltimo. Muito útil!', likes: 65, tags: ['listas', 'indices'] },
  { id: 't12', author: 'Thiago M.', avatarEmoji: '🦸‍♂️', text: 'Para copiar uma lista sem referenciar a original: `nova = lista.copy()` ou `nova = lista[:]`', likes: 41, tags: ['listas', 'debug', 'erros-comuns'] },

  // Conditionals
  { id: 't13', author: 'Camila V.', avatarEmoji: '🌟', text: 'Evite `if x == True:` — simplifique para `if x:`. Python é elegante!', likes: 53, tags: ['condicionais', 'boas-praticas'] },
  { id: 't14', author: 'Bruno S.', avatarEmoji: '🧑‍🎤', text: 'O operador ternário: `resultado = "sim" if condicao else "não"`. Uma linha, mas use com moderação!', likes: 47, tags: ['condicionais', 'python'] },

  // Strings
  { id: 't15', author: 'Leticia H.', avatarEmoji: '👩‍🎨', text: 'f-strings são mais rápidas e legíveis que concatenação: `f"Olá, {nome}!"` em vez de `"Olá, " + nome + "!"`.', likes: 92, tags: ['strings', 'python', 'boas-praticas'] },
  { id: 't16', author: 'Daniel F.', avatarEmoji: '🧑‍🏫', text: '`"   texto   ".strip()` remove espaços das bordas. Essencial ao processar input do usuário!', likes: 38, tags: ['strings', 'input'] },

  // Debug
  { id: 't17', author: 'Renata G.', avatarEmoji: '🔍', text: 'Print é debugging! `print(f"DEBUG: {variavel}")` é seu melhor amigo quando algo não funciona.', likes: 84, tags: ['debug', 'boas-praticas'] },
  { id: 't18', author: 'Pablo J.', avatarEmoji: '🧑‍🔧', text: 'Leia a mensagem de erro com atenção! A última linha sempre diz o tipo e a mensagem do erro.', likes: 79, tags: ['debug', 'erros-comuns'] },

  // General
  { id: 't19', author: 'Isabela C.', avatarEmoji: '💎', text: 'Escreva código que um iniciante possa entender. Clareza > Esperteza.', likes: 95, tags: ['boas-praticas', 'geral'] },
  { id: 't20', author: 'Victor M.', avatarEmoji: '🚀', text: 'Pratique todo dia, mesmo que só por 20 minutos. Consistência bate intensidade!', likes: 102, tags: ['geral', 'motivacao'] },
  { id: 't21', author: 'Alice P.', avatarEmoji: '🦋', text: 'Quando travar num problema, explique ele em voz alta (para um patinho de borracha!). Funciona mesmo!', likes: 67, tags: ['debug', 'geral'] },
  { id: 't22', author: 'Eduardo L.', avatarEmoji: '🎯', text: 'Git commit cedo, commit frequente. Nunca perca trabalho por não ter feito backup.', likes: 58, tags: ['git', 'boas-praticas'] },
  { id: 't23', author: 'Patricia N.', avatarEmoji: '🌈', text: 'Dicionários em Python são implementados como hash tables — busca em O(1). Muito mais rápido que listas!', likes: 44, tags: ['dicionarios', 'performance'] },
  { id: 't24', author: 'Gabriel T.', avatarEmoji: '⚡', text: '`try/except` é para tratar erros esperados, não para esconder bugs. Use com responsabilidade!', likes: 71, tags: ['erros', 'boas-praticas'] },
  { id: 't25', author: 'Natalia R.', avatarEmoji: '🦅', text: 'Comentários devem explicar o "porquê", não o "o quê". O código já diz o que faz.', likes: 83, tags: ['comentarios', 'boas-praticas'] },
  { id: 't26', author: 'Rafael S.', avatarEmoji: '🌊', text: 'Use `range(len(lista))` só quando precisar do índice. Se só quer os itens, `for item in lista:`.', likes: 61, tags: ['loops', 'listas'] },
  { id: 't27', author: 'Cristina B.', avatarEmoji: '🦩', text: '`zip()` combina duas listas: `for nome, nota in zip(nomes, notas):`! Muito elegante.', likes: 55, tags: ['listas', 'python', 'avancado'] },
  { id: 't28', author: 'Henrique F.', avatarEmoji: '🎸', text: 'Indentação em Python NÃO é opcional — define os blocos de código. Use sempre 4 espaços.', likes: 77, tags: ['python', 'iniciante', 'erros-comuns'] },
  { id: 't29', author: 'Monica L.', avatarEmoji: '🌺', text: 'Guarda o link do docs do Python: `docs.python.org/3/`. É a fonte mais confiável!', likes: 46, tags: ['recursos', 'geral'] },
  { id: 't30', author: 'Augusto C.', avatarEmoji: '🦁', text: 'POO: pense em classes como "moldes" e objetos como "cópias" desses moldes com dados próprios.', likes: 69, tags: ['poo', 'classes', 'iniciante'] },
];

// Return 3 random tips that match any of the given tags, or generic tips if none match
export function getTipsForTags(tags: string[]): CommunityTip[] {
  const lowerTags = tags.map((t) => t.toLowerCase());

  let matching = tips.filter((tip) =>
    tip.tags.some((tag) => lowerTags.some((lt) => tag.includes(lt) || lt.includes(tag)))
  );

  // If not enough matches, pad with general tips
  const general = tips.filter((t) => t.tags.includes('geral') || t.tags.includes('boas-praticas'));
  const pool = matching.length >= 2 ? matching : [...matching, ...general];

  // Shuffle and take 3
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export function getAllTips(): CommunityTip[] {
  return tips;
}
