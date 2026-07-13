import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-e-tipos',
  moduleId: 'python',
  title: 'Variaveis e Tipos de Dados',
  description: 'Aprenda a guardar e manipular informacoes no seu programa usando variaveis.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'callout',
      calloutType: 'info',
      content: '**O que voce vai aprender:** Como guardar informacoes no programa (nomes, idades, precos, verdadeiro/falso) e como usar essas informacoes depois. Isso e a base de TUDO em programacao.',
    },
    {
      type: 'text',
      content:
        '## Por que precisamos de variaveis?\n\nImagine que voce esta criando um sistema de cadastro para uma academia. Voce precisa guardar:\n- O nome do aluno\n- A idade dele\n- O peso atual\n- Se ele pagou a mensalidade\n\nSem um lugar para guardar essas informacoes, seu programa esquece tudo assim que termina de executar. **Variaveis sao os "ficharios" do seu programa** — cada uma guarda uma informacao especifica com um nome para voce encontrar depois.',
    },
    {
      type: 'text',
      content:
        '## Analogia: A caixa com etiqueta\n\nPense em variaveis como **caixas com etiquetas** numa estante:\n\n- A **etiqueta** e o nome da variavel (ex: `nome_aluno`)\n- O **conteudo da caixa** e o valor guardado (ex: `"Joao"`)\n- Voce pode abrir a caixa, ver o conteudo, ou trocar o conteudo por outro\n\nQuando voce escreve `nome = "Maria"`, voce esta:\n1. Criando uma caixa\n2. Colocando a etiqueta "nome" nela\n3. Colocando "Maria" dentro',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Criando variaveis — cada linha cria uma "caixa" diferente
nome = "Carlos"          # Guarda um texto
idade = 22               # Guarda um numero inteiro
altura = 1.75            # Guarda um numero com decimal
esta_matriculado = True  # Guarda verdadeiro ou falso

# Usando as variaveis — so escrever o nome da caixa
print(nome)              # Carlos
print(idade)             # 22
print(altura)            # 1.75
print(esta_matriculado)  # True`,
        filename: 'variaveis_basico.py',
        description: 'Cada variavel guarda um tipo de informacao. O nome da variavel e como voce acessa ela depois.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Erro que todo iniciante comete:** Confundir texto com numero. `idade = 22` guarda o numero 22. `idade = "22"` guarda o TEXTO "22" — parece a mesma coisa mas sao tipos diferentes! Com texto voce nao pode fazer contas. Nunca coloque aspas em numeros que voce vai calcular.',
    },
    {
      type: 'text',
      content:
        '## Os 4 tipos basicos de dados\n\nPython tem quatro tipos fundamentais que voce vai usar em quase todo programa:\n\n**str (string)** — Qualquer texto. Sempre entre aspas.\n```python\nnome = "Ana"\ncidade = "Sao Paulo"\ncpf = "123.456.789-00"  # CPF e texto, nao numero!\n```\n\n**int (inteiro)** — Numeros sem casas decimais.\n```python\nidade = 25\npontuacao = -10\nquantidade = 0\n```\n\n**float** — Numeros com casas decimais. Use ponto, nao virgula.\n```python\npreco = 29.90\naltura = 1.73\ntemperatura = -3.5\n```\n\n**bool (booleano)** — So True (verdadeiro) ou False (falso). Com letra maiuscula!\n```python\nlogado = True\npagou = False\ne_maior_de_idade = True\n```',
    },
    {
      type: 'text',
      content:
        '## Como saber o tipo de uma variavel\n\nO Python tem uma funcao chamada `type()` que diz qual e o tipo de qualquer variavel. Isso e muito util quando voce nao tem certeza:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `preco = 49.90
quantidade = 3
produto = "Camiseta"
disponivel = True

# type() diz o tipo de cada variavel
print(type(preco))        # <class 'float'>
print(type(quantidade))   # <class 'int'>
print(type(produto))      # <class 'str'>
print(type(disponivel))   # <class 'bool'>

# Verificando o total
total = preco * quantidade
print(total)              # 149.7`,
        filename: 'tipos.py',
        description: 'type() e muito util para debugar — quando algo da errado, verifique se o tipo e o esperado.',
      },
    },
    {
      type: 'text',
      content:
        '## Mudando o tipo de uma variavel (conversao)\n\nAs vezes voce recebe um numero como texto (por exemplo, digitado pelo usuario) e precisa fazer contas com ele. Voce pode converter entre tipos:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Texto para numero inteiro
texto_numero = "42"
numero = int(texto_numero)      # Converte "42" (texto) para 42 (numero)
print(numero + 8)               # 50 — agora funciona!

# Numero para texto (quando voce quer montar uma frase)
idade = 25
mensagem = "Sua idade e " + str(idade) + " anos"
print(mensagem)                 # Sua idade e 25 anos

# Texto para numero decimal
preco_texto = "19.99"
preco = float(preco_texto)
print(preco * 2)                # 39.98

# ERRO COMUM: tentar somar texto com numero diretamente
# print("Minha idade: " + 25)  # Isso gera ERRO TypeError!
# CORRETO: converter o numero para texto primeiro
print("Minha idade: " + str(25))  # Minha idade: 25`,
        filename: 'conversao_tipos.py',
        description: 'int(), float() e str() convertem entre tipos. Isso e essencial para trabalhar com entradas do usuario.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Erro classico:** Tentar misturar texto com numero sem converter. `"Idade: " + 25` gera um erro `TypeError: can only concatenate str (not "int") to str`. Sempre converta o numero para texto com `str(25)` antes de juntar com outras strings.',
    },
    {
      type: 'text',
      content:
        '## f-strings: a forma moderna de montar frases\n\nExiste uma forma muito mais elegante de misturar variaveis com texto — as **f-strings**. Coloque um `f` antes das aspas e use `{}` para inserir qualquer variavel. Esta e a forma que profissionais usam:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `nome = "Juliana"
idade = 28
salario = 5800.50

# Jeito antigo (trabalhoso e feio)
print("Nome: " + nome + ", Idade: " + str(idade))

# f-string (moderno, limpo e legivel)
print(f"Nome: {nome}, Idade: {idade}")

# Voce pode ate fazer calculos dentro das chaves
print(f"Salario anual: R\${salario * 12:.2f}")

# Exemplo real: recibo de compra
produto = "Notebook"
preco = 3299.99
desconto = 0.10
preco_final = preco * (1 - desconto)

print(f"Produto: {produto}")
print(f"Preco original: R\${preco:.2f}")
print(f"Desconto: {desconto * 100:.0f}%")
print(f"Preco final: R\${preco_final:.2f}")`,
        filename: 'fstrings.py',
        description: 'f-strings sao a forma mais usada por profissionais para formatar textos com variaveis.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**:.2f dentro das chaves** formata numeros decimais. `{preco:.2f}` mostra sempre 2 casas decimais (ex: R$29.90). `{percentual:.0f}` mostra sem casas decimais (ex: 10%). Voce vai usar isso o tempo todo para valores em Reais e porcentagens.',
    },
    {
      type: 'text',
      content:
        '## Regras para nomear variaveis\n\nVoce tem liberdade para escolher nomes, mas siga estas convencoes que todos os programadores Python usam:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# CORRETO — boas praticas (snake_case: palavras separadas por _)
nome_completo = "Ana Lima"
idade_usuario = 30
saldo_conta = 1500.00
esta_ativo = True

# ERRADO — nao funciona (Python gera erro)
# 1nome = "erro"        # ERRO: nao pode comecar com numero
# nome completo = "x"  # ERRO: nao pode ter espaco
# nome-usuario = "x"   # ERRO: nao pode ter hifen

# FUNCIONA mas evite — dificulta leitura
x = "Ana Lima"          # Sem significado — o que e x?
n = 30                  # Muito curto — n de que?`,
        filename: 'nomes_variaveis.py',
        description: 'Nomes descritivos com snake_case. Codigo e lido mais vezes do que escrito — facilite a vida de quem vai ler.',
      },
    },
  ],
  challenges: [
    {
      id: 'var-c1',
      title: 'Cartao de visita digital',
      description:
        'Crie variaveis para guardar as informacoes de uma pessoa e exiba um cartao de visita formatado.\n\nCrie as variaveis:\n- nome (seu nome ou qualquer nome)\n- profissao (ex: "Engenheiro de Software")\n- cidade (ex: "Sao Paulo")\n- anos_experiencia (um numero inteiro)\n\nDepois use uma f-string para exibir:\n"[nome] | [profissao] | [cidade] | [anos_experiencia] anos de experiencia"',
      language: 'python',
      starterCode: `# Crie as variaveis (texto entre aspas, numero sem aspas)
nome = ""
profissao = ""
cidade = ""
anos_experiencia = 0

# Exiba o cartao usando f-string
print(f"")
`,
      solution: `nome = "Carlos Silva"
profissao = "Engenheiro de Software"
cidade = "Sao Paulo"
anos_experiencia = 3

print(f"{nome} | {profissao} | {cidade} | {anos_experiencia} anos de experiencia")`,
      hints: [
        'Texto fica entre aspas, numero inteiro fica sem aspas.',
        'A f-string comeca com f antes das aspas: f"texto {variavel} texto"',
        'Dentro das chaves {}, voce coloca o nome da variavel que quer mostrar.',
      ],
      testCases: [
        {
          description: 'Exibe as informacoes formatadas corretamente',
          expectedOutput: 'Carlos Silva | Engenheiro de Software | Sao Paulo | 3 anos de experiencia',
        },
      ],
    },
    {
      id: 'var-c2',
      title: 'Calculadora de preco com desconto',
      description:
        'Crie um programa que calcule o preco final de um produto com desconto.\n\nUse as variaveis ja criadas no codigo inicial e calcule:\n1. O valor do desconto (preco * percentual_desconto)\n2. O preco final (preco - valor_desconto)\n3. Exiba as tres linhas formatadas com 2 casas decimais',
      language: 'python',
      starterCode: `preco = 250.00
percentual_desconto = 0.15  # 15% = 0.15 em formato decimal

# Calcule o valor do desconto
valor_desconto = preco * percentual_desconto

# Calcule o preco final
preco_final = preco - valor_desconto

# Exiba usando f-strings com :.2f para mostrar 2 casas decimais
print(f"Preco original: R\${preco:.2f}")
# Adicione as outras duas linhas abaixo:
`,
      solution: `preco = 250.00
percentual_desconto = 0.15

valor_desconto = preco * percentual_desconto
preco_final = preco - valor_desconto

print(f"Preco original: R\${preco:.2f}")
print(f"Desconto (15%): R\${valor_desconto:.2f}")
print(f"Preco final: R\${preco_final:.2f}")`,
      hints: [
        'Para calcular 15% de 250, multiplique: 250 * 0.15 = 37.50',
        'O preco final e o preco original menos o desconto.',
        'Use {variavel:.2f} dentro da f-string para mostrar 2 casas decimais.',
      ],
      testCases: [
        {
          description: 'Calcula e exibe os valores corretos',
          expectedOutput: 'Preco original: R$250.00\nDesconto (15%): R$37.50\nPreco final: R$212.50',
        },
      ],
    },
    {
      id: 'var-c3',
      title: 'Convertendo texto para numero',
      description:
        'Voce recebeu a idade de um usuario como texto (como acontece quando o usuario digita algo). Converta para numero inteiro e calcule em quantos anos ele tera 100 anos.\n\nO resultado deve ser exibido no formato:\n"Voce tem 25 anos. Faltam 75 anos para voce ter 100!"',
      language: 'python',
      starterCode: `# Imagine que o usuario digitou isso — chegou como texto
idade_texto = "25"

# Converta para numero inteiro usando int()
idade = int(idade_texto)

# Calcule quantos anos faltam para ter 100
anos_para_100 = 100 - idade

# Exiba a mensagem com f-string
print(f"")
`,
      solution: `idade_texto = "25"
idade = int(idade_texto)
anos_para_100 = 100 - idade
print(f"Voce tem {idade} anos. Faltam {anos_para_100} anos para voce ter 100!")`,
      hints: [
        'Use int(idade_texto) para converter o texto "25" para o numero 25.',
        'Para calcular quanto falta: 100 - idade.',
        'Na f-string, use {idade} e {anos_para_100} para inserir as variaveis na mensagem.',
      ],
      testCases: [
        {
          description: 'Converte e calcula corretamente',
          expectedOutput: 'Voce tem 25 anos. Faltam 75 anos para voce ter 100!',
        },
      ],
    },
  ],
};
