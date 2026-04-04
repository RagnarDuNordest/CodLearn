import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'operadores-logicos',
  moduleId: 'logica',
  title: 'Operadores Logicos e Tabelas Verdade',
  description:
    'Domine os operadores AND, OR e NOT, entenda tabelas verdade, aprenda a Lei de De Morgan e crie condicoes compostas para seus programas.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Voce usa logica o tempo todo: \"Se tiver sol E for sabado, vou a praia\". Os operadores logicos permitem combinar condicoes para decisoes mais inteligentes!\n\n## Operadores logicos: a base das decisoes\n\nOs **operadores logicos** sao usados para combinar condicoes e criar expressoes mais complexas. Eles trabalham com valores **booleanos** (verdadeiro ou falso) e sao fundamentais para a logica de programacao.\n\nExistem tres operadores logicos principais:\n\n### AND (E)\nRetorna **verdadeiro** somente quando **ambas** as condicoes sao verdadeiras.\n- "Posso dirigir SE tenho idade >= 18 **E** tenho carteira de motorista"\n- As duas condicoes precisam ser verdadeiras para o resultado ser verdadeiro\n\n### OR (OU)\nRetorna **verdadeiro** quando **pelo menos uma** das condicoes e verdadeira.\n- "Tenho desconto SE sou estudante **OU** sou idoso"\n- Basta uma condicao ser verdadeira para o resultado ser verdadeiro\n\n### NOT (NAO)\n**Inverte** o valor logico. Verdadeiro vira falso, falso vira verdadeiro.\n- "Se **NAO** esta chovendo, posso ir ao parque"\n- Transforma True em False e False em True',
    },
    {
      type: 'text',
      content:
        '## Tabelas verdade\n\nAs tabelas verdade mostram todos os resultados possiveis de uma operacao logica. Elas sao a base para entender como os operadores funcionam.\n\n### Tabela AND (E)\n\n| A | B | A AND B |\n|---|---|---|\n| Verdadeiro | Verdadeiro | **Verdadeiro** |\n| Verdadeiro | Falso | Falso |\n| Falso | Verdadeiro | Falso |\n| Falso | Falso | Falso |\n\nSo e verdadeiro quando **os dois** sao verdadeiros.\n\n### Tabela OR (OU)\n\n| A | B | A OR B |\n|---|---|---|\n| Verdadeiro | Verdadeiro | **Verdadeiro** |\n| Verdadeiro | Falso | **Verdadeiro** |\n| Falso | Verdadeiro | **Verdadeiro** |\n| Falso | Falso | Falso |\n\nSo e falso quando **os dois** sao falsos.\n\n### Tabela NOT (NAO)\n\n| A | NOT A |\n|---|---|\n| Verdadeiro | Falso |\n| Falso | Verdadeiro |\n\nSimplesmente inverte o valor.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Operadores logicos em Python\n\n# AND: ambas as condicoes precisam ser True\nidade = 20\ntem_carteira = True\npode_dirigir = idade >= 18 and tem_carteira\nprint("Pode dirigir:", pode_dirigir)  # True\n\n# OR: pelo menos uma condicao precisa ser True\ne_estudante = False\ne_idoso = True\ntem_desconto = e_estudante or e_idoso\nprint("Tem desconto:", tem_desconto)  # True\n\n# NOT: inverte o valor\nesta_chovendo = False\npode_ir_ao_parque = not esta_chovendo\nprint("Pode ir ao parque:", pode_ir_ao_parque)  # True\n\n# Combinando operadores\ntemperatura = 25\nnao_esta_chovendo = not esta_chovendo\nclima_bom = temperatura > 20 and nao_esta_chovendo\nprint("Clima bom:", clima_bom)  # True',
        filename: 'operadores_logicos.py',
        description:
          'Em Python, usamos and, or e not como operadores logicos. Eles funcionam exatamente como descrito nas tabelas verdade acima.',
      },
    },
    {
      type: 'text',
      content:
        '## Lei de De Morgan\n\nA **Lei de De Morgan** e uma regra fundamental da logica que nos ajuda a simplificar expressoes. Ela tem duas formas:\n\n### Primeira lei:\n**NAO (A E B) = (NAO A) OU (NAO B)**\n\nNegar uma conjuncao (AND) e o mesmo que fazer a disjuncao (OR) das negacoes.\n\n**Exemplo pratico:** "Nao e verdade que esta quente E ensolarado" e o mesmo que dizer "Nao esta quente OU nao esta ensolarado".\n\n### Segunda lei:\n**NAO (A OU B) = (NAO A) E (NAO B)**\n\nNegar uma disjuncao (OR) e o mesmo que fazer a conjuncao (AND) das negacoes.\n\n**Exemplo pratico:** "Nao e verdade que sou estudante OU idoso" e o mesmo que dizer "Nao sou estudante E nao sou idoso".\n\n### Resumo visual:\n```\nnot (A and B)  =  (not A) or (not B)\nnot (A or B)   =  (not A) and (not B)\n```\n\nA Lei de De Morgan e muito util para simplificar condicoes complexas e tornar o codigo mais legivel.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Demonstrando a Lei de De Morgan\n\nA = True\nB = False\n\n# Primeira lei: not (A and B) == (not A) or (not B)\nresultado1 = not (A and B)\nresultado2 = (not A) or (not B)\nprint("not (A and B):", resultado1)       # True\nprint("(not A) or (not B):", resultado2)  # True\nprint("Sao iguais?", resultado1 == resultado2)  # True\n\nprint()\n\n# Segunda lei: not (A or B) == (not A) and (not B)\nresultado3 = not (A or B)\nresultado4 = (not A) and (not B)\nprint("not (A or B):", resultado3)         # False\nprint("(not A) and (not B):", resultado4)  # False\nprint("Sao iguais?", resultado3 == resultado4)  # True\n\nprint()\n\n# Exemplo pratico: simplificando condicoes\nidade = 25\ntem_ingresso = True\n\n# Versao original (mais complexa)\nif not (idade < 18 or not tem_ingresso):\n    print("Pode entrar no evento!")\n\n# Versao simplificada com De Morgan\n# not (idade < 18 or not tem_ingresso)\n# = (not idade < 18) and (not not tem_ingresso)\n# = (idade >= 18) and tem_ingresso\nif idade >= 18 and tem_ingresso:\n    print("Pode entrar no evento! (simplificado)")',
        filename: 'lei_de_morgan.py',
        description:
          'A Lei de De Morgan permite transformar expressoes complexas em equivalentes mais simples. Note como a versao simplificada e muito mais facil de ler e entender.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Cuidado com a precedencia dos operadores! Em Python, a ordem de avaliacao e: NOT (maior prioridade), depois AND, depois OR (menor prioridade). Use parenteses para deixar a intencao clara e evitar bugs. Exemplo: "a or b and c" avalia como "a or (b and c)", nao como "(a or b) and c".',
    },
    {
      type: 'callout',
      content:
        'Logica de programacao e a base de tudo! Se voce entender bem, aprender qualquer linguagem fica muito mais facil.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Operadores logicos em Python\n\nEm Python, os operadores logicos sao palavras em ingles:\n\n| Pseudocodigo | Python | Significado |\n|---|---|---|\n| E | `and` | Verdadeiro se AMBOS forem verdadeiros |\n| OU | `or` | Verdadeiro se PELO MENOS UM for verdadeiro |\n| NAO | `not` | Inverte o valor |\n\nVocê pode usar `True` e `False` diretamente como variaveis booleanas. Combine com `print()` para ver os resultados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'operadores_logicos.py',
        code: `# Booleanos em Python (True/False com letra maiuscula!)
A = True
B = False

# Operadores logicos
print("A and B:", A and B)   # True E False = False
print("A or B:", A or B)     # True OU False = True
print("not A:", not A)       # NAO True = False
print("not B:", not B)       # NAO False = True

# Expressoes mais complexas
print("not (A and B):", not (A and B))  # not(True E False) = not(False) = True
print("not (A or B):", not (A or B))    # not(True OU False) = not(True) = False

# Combinando com variaveis normais
idade = 25
tem_carteira = True
e_estudante = False
e_idoso = False

# De Morgan: not(A and B) == (not A) or (not B)
original = not (idade >= 18 and tem_carteira)
simplificada = idade < 18 or not tem_carteira  # equivalente!
print("Original:", original)
print("Simplificada:", simplificada)`,
        description: 'Em Python: and, or, not. Valores True/False com letra maiuscula. not(A and B) == (not A) or (not B).',
      },
    },
  ],
  challenges: [
    {
      id: 'ol-c1',
      title: 'Avaliador de expressoes logicas',
      description:
        'Crie um programa que defina os valores de A e B como booleanos e exiba o resultado de todas as combinacoes logicas: A and B, A or B, not A, not B, not (A and B), not (A or B). Teste com A = True e B = False.',
      language: 'python',
      starterCode: 'A = True\nB = False\n\n# Exiba o resultado de cada operacao logica:\n# 1. A and B\n# 2. A or B\n# 3. not A\n# 4. not B\n# 5. not (A and B)\n# 6. not (A or B)\n',
      solution: 'A = True\nB = False\n\nprint("A =", A)\nprint("B =", B)\nprint()\nprint("A and B:", A and B)\nprint("A or B:", A or B)\nprint("not A:", not A)\nprint("not B:", not B)\nprint("not (A and B):", not (A and B))\nprint("not (A or B):", not (A or B))',
      hints: [
        'Use print() para exibir cada expressao e seu resultado.',
        'Em Python, os operadores logicos sao escritos com palavras: and, or, not.',
        'Use parenteses para agrupar: not (A and B) e diferente de (not A) and B.',
      ],
    },
    {
      id: 'ol-c2',
      title: 'Aplicando De Morgan para simplificar',
      description:
        'O codigo abaixo tem condicoes complexas usando NOT com AND/OR. Simplifique cada condicao usando a Lei de De Morgan. Verifique que os resultados sao identicos antes e depois da simplificacao.',
      language: 'python',
      starterCode: 'idade = 25\ntem_carteira = True\ne_estudante = False\ne_idoso = False\n\n# Condicao 1 (complexa): not (idade >= 18 and tem_carteira)\n# Simplifique usando De Morgan:\noriginal1 = not (idade >= 18 and tem_carteira)\nsimplificada1 = False  # Substitua pela versao simplificada\nprint("Condicao 1 - Original:", original1)\nprint("Condicao 1 - Simplificada:", simplificada1)\n\n# Condicao 2 (complexa): not (e_estudante or e_idoso)\n# Simplifique usando De Morgan:\noriginal2 = not (e_estudante or e_idoso)\nsimplificada2 = False  # Substitua pela versao simplificada\nprint("Condicao 2 - Original:", original2)\nprint("Condicao 2 - Simplificada:", simplificada2)\n',
      solution: 'idade = 25\ntem_carteira = True\ne_estudante = False\ne_idoso = False\n\n# Condicao 1: not (A and B) = (not A) or (not B)\noriginal1 = not (idade >= 18 and tem_carteira)\nsimplificada1 = idade < 18 or not tem_carteira\nprint("Condicao 1 - Original:", original1)\nprint("Condicao 1 - Simplificada:", simplificada1)\n\n# Condicao 2: not (A or B) = (not A) and (not B)\noriginal2 = not (e_estudante or e_idoso)\nsimplificada2 = not e_estudante and not e_idoso\nprint("Condicao 2 - Original:", original2)\nprint("Condicao 2 - Simplificada:", simplificada2)',
      hints: [
        'Primeira lei de De Morgan: not (A and B) = (not A) or (not B).',
        'Segunda lei de De Morgan: not (A or B) = (not A) and (not B).',
        'Lembre: not (idade >= 18) e o mesmo que idade < 18.',
      ],
    },
    {
      id: 'ol-c3',
      title: 'Sistema de acesso com condicoes compostas',
      description:
        'Crie um sistema de acesso a um site com as seguintes regras: o usuario pode acessar SE (tem conta ativa E aceitou os termos) OU (e administrador). Use operadores logicos para implementar essa verificacao e exiba "Acesso permitido" ou "Acesso negado".',
      language: 'python',
      starterCode: '# Dados do usuario\nconta_ativa = True\naceitou_termos = False\ne_admin = False\n\n# Regra: pode acessar SE (conta_ativa E aceitou_termos) OU (e_admin)\n# Implemente a verificacao usando operadores logicos\n\n# Exiba "Acesso permitido" ou "Acesso negado"\n',
      solution: '# Dados do usuario\nconta_ativa = True\naceitou_termos = False\ne_admin = False\n\n# Regra: pode acessar SE (conta_ativa E aceitou_termos) OU (e_admin)\npode_acessar = (conta_ativa and aceitou_termos) or e_admin\n\nif pode_acessar:\n    print("Acesso permitido")\nelse:\n    print("Acesso negado")\n\n# Exibindo o motivo\nif e_admin:\n    print("Motivo: acesso de administrador")\nelif not conta_ativa:\n    print("Motivo: conta inativa")\nelif not aceitou_termos:\n    print("Motivo: termos nao aceitos")',
      hints: [
        'Use parenteses para agrupar: (conta_ativa and aceitou_termos) or e_admin.',
        'Armazene o resultado da expressao logica em uma variavel como pode_acessar.',
        'Use if/else para exibir a mensagem de acesso permitido ou negado.',
      ],
    },
  ],
};
