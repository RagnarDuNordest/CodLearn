import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'funcoes',
  moduleId: 'python',
  title: 'Funcoes',
  description: 'Aprenda a criar blocos de codigo reutilizaveis — o segredo para programas organizados e profissionais.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'callout',
      calloutType: 'info',
      content: '**O que voce vai aprender:** Como criar funcoes — blocos de codigo que voce escreve uma vez e usa quantas vezes quiser. Funcoes sao o que transforma codigo bagunçado em codigo profissional.',
    },
    {
      type: 'text',
      content:
        '## O problema que funcoes resolvem\n\nImagine que voce precisa calcular o desconto de tres produtos diferentes:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# SEM funcao — codigo repetido (ruim!)
preco1 = 100.0
desconto1 = preco1 * 0.10
final1 = preco1 - desconto1
print(f"Produto 1: R\${final1:.2f}")

preco2 = 250.0
desconto2 = preco2 * 0.10
final2 = preco2 - desconto2
print(f"Produto 2: R\${final2:.2f}")

preco3 = 85.0
desconto3 = preco3 * 0.10
final3 = preco3 - desconto3
print(f"Produto 3: R\${final3:.2f}")

# Se o desconto mudar de 10% para 15%, preciso alterar em 3 lugares!
# Com 100 produtos, seria 100 alteracoes. Isso e um pesadelo.`,
        filename: 'sem_funcao.py',
        description: 'Codigo repetido e dificil de manter. Se precisar mudar a logica, tem que mudar em varios lugares.',
      },
    },
    {
      type: 'text',
      content:
        '## A solucao: escreva uma vez, use quantas vezes quiser\n\nUma funcao e como uma **receita com nome**: voce define os passos uma vez e sempre que precisar e so chamar pelo nome, passando os ingredientes:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# COM funcao — escreve uma vez, usa varias vezes
def calcular_preco_final(preco, desconto_pct):
    desconto = preco * desconto_pct
    final = preco - desconto
    return final

# Agora chame com qualquer preco
print(f"Produto 1: R\${calcular_preco_final(100.0, 0.10):.2f}")
print(f"Produto 2: R\${calcular_preco_final(250.0, 0.10):.2f}")
print(f"Produto 3: R\${calcular_preco_final(85.0, 0.10):.2f}")

# Se o desconto mudar para 15%, mudo em UM unico lugar:
# def calcular_preco_final(preco, desconto_pct=0.15):`,
        filename: 'com_funcao.py',
        description: 'Com funcao, a logica fica num unico lugar. Mudou a logica? Muda uma vez, funciona em todo lugar.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '**Principio DRY: "Dont Repeat Yourself" (Nao Se Repita).** Se voce esta copiando e colando o mesmo trecho de codigo, ha um sinal de que voce deveria criar uma funcao. Todo bom programador segue esse principio.',
    },
    {
      type: 'text',
      content:
        '## Anatomia de uma funcao\n\nVeja cada parte de uma funcao com calma:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# DEFININDO a funcao — isso e como criar a receita
#    |         |     parametros (ingredientes)
#    v         v         v
def saudacao(nome, turno):
    # Corpo da funcao — o que ela faz
    mensagem = f"Boa {turno}, {nome}!"
    return mensagem  # O que ela entrega de volta
#   ^
#   return e o resultado que a funcao "envia de volta"

# CHAMANDO a funcao — isso e como usar a receita
resultado = saudacao("Ana", "tarde")
print(resultado)           # Boa tarde, Ana!

# Voce pode chamar com valores diferentes
print(saudacao("Carlos", "manha"))  # Bom manha, Carlos!
print(saudacao("Maria", "noite"))   # Boa noite, Maria!`,
        filename: 'anatomia_funcao.py',
        description: 'def define a funcao, os parametros sao as entradas, return e a saida. Defina uma vez, chame varias.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Erro comum #1:** Esquecer o `return`. Se uma funcao nao tem `return`, ela retorna `None` (vazio). Se voce tentar usar o resultado em um calculo, vai dar erro.\n\n**Erro comum #2:** Definir a funcao e nunca chamar. Escrever `def funcao():` nao executa nada — voce precisa chamar com `funcao()` depois.',
    },
    {
      type: 'text',
      content:
        '## Funcoes com return: usando o resultado\n\nQuando uma funcao retorna um valor, voce pode:\n1. Guardar em uma variavel\n2. Usar diretamente em uma expressao\n3. Passar para outra funcao',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `def calcular_area_retangulo(base, altura):
    return base * altura

def calcular_area_circulo(raio):
    pi = 3.14159
    return pi * raio ** 2  # ** e potenciacao

# 1. Guardar em variavel
area_sala = calcular_area_retangulo(10, 5)
print(f"Area da sala: {area_sala} m2")

# 2. Usar diretamente numa expressao
preco_tapete = calcular_area_retangulo(6, 4) * 89.90
print(f"Custo do tapete: R\${preco_tapete:.2f}")

# 3. Passar para outra funcao
print(f"Area do circulo: {calcular_area_circulo(3):.2f} m2")`,
        filename: 'funcoes_return.py',
        description: 'O valor retornado por return pode ser usado em qualquer expressao Python.',
      },
    },
    {
      type: 'text',
      content:
        '## Parametros com valores padrao\n\nVoce pode definir valores padrao para parametros — assim o usuario da funcao pode omiti-los quando o valor padrao e o desejado:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `def calcular_desconto(preco, percentual=0.10):
    # Se nao passar percentual, usa 10% como padrao
    desconto = preco * percentual
    return preco - desconto

# Usando sem o segundo argumento — usa o padrao (10%)
print(f"R\${calcular_desconto(200):.2f}")     # R$180.00

# Usando com o segundo argumento — substitui o padrao
print(f"R\${calcular_desconto(200, 0.20):.2f}")  # R$160.00
print(f"R\${calcular_desconto(200, 0.05):.2f}")  # R$190.00

# Funcao com multiplos parametros, alguns com padrao
def criar_usuario(nome, email, admin=False, ativo=True):
    return {
        "nome": nome,
        "email": email,
        "admin": admin,
        "ativo": ativo
    }

usuario1 = criar_usuario("Ana", "ana@email.com")        # admin=False, ativo=True
usuario2 = criar_usuario("Carlos", "c@email.com", admin=True)  # admin=True`,
        filename: 'parametros_padrao.py',
        description: 'Valores padrao tornam funcoes flexiveis. Parametros com padrao ficam sempre depois dos sem padrao.',
      },
    },
    {
      type: 'text',
      content:
        '## Funcoes embutidas que voce vai usar muito\n\nO Python ja vem com varias funcoes prontas. Voce ja conhece algumas:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `notas = [8.5, 6.0, 9.0, 7.5, 5.5]

# Funcoes matematicas sobre listas
print(sum(notas))         # 36.5  — soma todos
print(len(notas))         # 5     — quantidade de itens
print(max(notas))         # 9.0   — o maior
print(min(notas))         # 5.5   — o menor

# Calculando media com funcoes embutidas
media = sum(notas) / len(notas)
print(f"Media: {media:.1f}")      # Media: 7.3

# Outras uteis
numeros = [3, 1, 4, 1, 5, 9, 2, 6]
print(sorted(numeros))    # [1, 1, 2, 3, 4, 5, 6, 9] — ordena
print(abs(-42))           # 42 — valor absoluto
print(round(3.7))         # 4  — arredonda`,
        filename: 'funcoes_embutidas.py',
        description: 'Funcoes embutidas poupam tempo. Voce nao precisa criar do zero o que o Python ja oferece.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Boas praticas para funcoes profissionais:**\n- Cada funcao deve fazer **uma coisa so** — se voce esta descrevendo a funcao com "e", ela provavelmente faz coisas demais\n- Nomes de funcoes devem ser **verbos**: `calcular_desconto()`, `validar_email()`, `enviar_mensagem()`\n- Mantenha funcoes **curtas** — se passar de 20 linhas, considere dividir em mais funcoes',
    },
  ],
  challenges: [
    {
      id: 'func-c1',
      title: 'Funcao de saudacao personalizada',
      description: 'Crie uma funcao chamada `saudacao` que receba um nome e retorne uma mensagem de boas-vindas.\n\nA funcao deve retornar a string:\n"Seja bem-vindo(a), [nome]! Bom estudo no CodLearn!"',
      language: 'python',
      starterCode: `# Defina a funcao saudacao aqui
def saudacao(nome):
    # Complete o corpo da funcao
    pass

# Teste chamando a funcao
print(saudacao("Maria"))
print(saudacao("Joao"))
`,
      solution: `def saudacao(nome):
    return f"Seja bem-vindo(a), {nome}! Bom estudo no CodLearn!"

print(saudacao("Maria"))
print(saudacao("Joao"))`,
      hints: [
        'Use f-string para montar a mensagem com o nome: f"... {nome} ..."',
        'Nao esqueca o return — sem ele a funcao retorna None.',
        'Chame a funcao passando um nome entre aspas: saudacao("Maria")',
      ],
      testCases: [
        {
          description: 'Saudacao para Maria',
          expectedOutput: 'Seja bem-vindo(a), Maria! Bom estudo no CodLearn!\nSeja bem-vindo(a), Joao! Bom estudo no CodLearn!',
        },
      ],
    },
    {
      id: 'func-c2',
      title: 'Calculadora de IMC',
      description: 'Crie uma funcao `calcular_imc` que receba peso (kg) e altura (m) e retorne o IMC.\n\nFormula: IMC = peso / (altura * altura)\n\nDepois crie uma funcao `classificar_imc` que receba o imc e retorne a classificacao:\n- Abaixo de 18.5: "Abaixo do peso"\n- De 18.5 a 24.9: "Peso normal"\n- De 25 a 29.9: "Sobrepeso"\n- 30 ou acima: "Obesidade"\n\nExiba: "IMC: 22.86 — Peso normal"',
      language: 'python',
      starterCode: `def calcular_imc(peso, altura):
    # Calcule e retorne o IMC
    pass

def classificar_imc(imc):
    # Retorne a classificacao com if/elif/else
    pass

# Teste com peso=80 e altura=1.87
imc = calcular_imc(80, 1.87)
classificacao = classificar_imc(imc)
print(f"IMC: {imc:.2f} — {classificacao}")
`,
      solution: `def calcular_imc(peso, altura):
    return peso / (altura * altura)

def classificar_imc(imc):
    if imc < 18.5:
        return "Abaixo do peso"
    elif imc < 25:
        return "Peso normal"
    elif imc < 30:
        return "Sobrepeso"
    else:
        return "Obesidade"

imc = calcular_imc(80, 1.87)
classificacao = classificar_imc(imc)
print(f"IMC: {imc:.2f} — {classificacao}")`,
      hints: [
        'IMC = peso / (altura ** 2) — use ** para potenciacao ou multiplique altura * altura',
        'A funcao calcular_imc retorna apenas o numero. A classificar_imc retorna o texto.',
        'Use {imc:.2f} para exibir com 2 casas decimais.',
      ],
      testCases: [
        {
          description: 'IMC para peso=80, altura=1.87',
          expectedOutput: 'IMC: 22.86 — Peso normal',
        },
      ],
    },
    {
      id: 'func-c3',
      title: 'Analisador de notas de turma',
      description: 'Crie uma funcao `analisar_turma` que receba uma lista de notas e retorne um dicionario com:\n- "media": a media da turma (com 1 casa decimal)\n- "maior": a maior nota\n- "menor": a menor nota\n- "aprovados": quantos alunos tem nota >= 7\n\nExiba cada informacao em uma linha separada.',
      language: 'python',
      starterCode: `def analisar_turma(notas):
    media = sum(notas) / len(notas)
    maior = max(notas)
    menor = min(notas)

    # Conte os aprovados usando um laco for
    aprovados = 0
    for nota in notas:
        pass  # Complete aqui

    return {
        "media": round(media, 1),
        "maior": maior,
        "menor": menor,
        "aprovados": aprovados
    }

notas_turma = [8.5, 6.0, 9.0, 7.5, 5.5, 8.0, 4.5, 7.0]
resultado = analisar_turma(notas_turma)

print(f"Media: {resultado['media']}")
print(f"Maior nota: {resultado['maior']}")
print(f"Menor nota: {resultado['menor']}")
print(f"Aprovados: {resultado['aprovados']}")
`,
      solution: `def analisar_turma(notas):
    media = sum(notas) / len(notas)
    maior = max(notas)
    menor = min(notas)

    aprovados = 0
    for nota in notas:
        if nota >= 7:
            aprovados += 1

    return {
        "media": round(media, 1),
        "maior": maior,
        "menor": menor,
        "aprovados": aprovados
    }

notas_turma = [8.5, 6.0, 9.0, 7.5, 5.5, 8.0, 4.5, 7.0]
resultado = analisar_turma(notas_turma)

print(f"Media: {resultado['media']}")
print(f"Maior nota: {resultado['maior']}")
print(f"Menor nota: {resultado['menor']}")
print(f"Aprovados: {resultado['aprovados']}")`,
      hints: [
        'No laco for, use if nota >= 7 para verificar aprovacao e aprovados += 1 para contar.',
        'sum(), max() e min() sao funcoes embutidas que recebem listas.',
        'Para acessar o resultado do dicionario: resultado["media"]',
      ],
      testCases: [
        {
          description: 'Analise da turma com 8 notas',
          expectedOutput: 'Media: 7.0\nMaior nota: 9.0\nMenor nota: 4.5\nAprovados: 5',
        },
      ],
    },
  ],
};
