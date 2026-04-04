import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'condicionais',
  moduleId: 'python',
  title: 'Condicionais (if/elif/else)',
  description: 'Aprenda a fazer seu programa tomar decisoes usando condicionais.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Ate agora, nossos programas executam todas as linhas de cima para baixo, sem pular nenhuma. Mas e se quisermos que o programa tome **decisoes**?\n\nPor exemplo: "Se o aluno tirou nota maior que 7, esta aprovado. Senao, esta reprovado." E exatamente isso que os **condicionais** fazem!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'condicional.py',
        code: `nota = 8.5

if nota >= 7:
    print("Aprovado!")
else:
    print("Reprovado.")

# Saida: Aprovado!`,
        description: 'O bloco if verifica uma condicao e executa o codigo correspondente.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Em Python, a **indentacao** (os espacos no inicio da linha) e obrigatoria! E ela que define qual codigo pertence ao if e qual pertence ao else. Use 4 espacos ou 1 tab.',
    },
    {
      type: 'text',
      content: 'Quando voce tem mais de duas opcoes, use **elif** (abreviacao de "else if"):',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'elif_exemplo.py',
        code: `nota = 6.5

if nota >= 9:
    print("Conceito A")
elif nota >= 7:
    print("Conceito B")
elif nota >= 5:
    print("Conceito C")
else:
    print("Conceito D - Reprovado")

# Saida: Conceito C`,
        description: 'Use elif para verificar multiplas condicoes em sequencia.',
      },
    },
    {
      type: 'text',
      content: '## Combinando Condicoes com and, or e not\n\nVoce pode combinar multiplas condicoes usando os operadores logicos:\n\n- **`and`** — Verdadeiro somente se **ambas** as condicoes forem verdadeiras\n- **`or`** — Verdadeiro se **pelo menos uma** das condicoes for verdadeira\n- **`not`** — Inverte o valor da condicao (verdadeiro vira falso e vice-versa)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'condicoes_compostas.py',
        code: `idade = 20
tem_ingresso = True

if idade >= 18 and tem_ingresso:
    print("Pode entrar no show!")
elif idade >= 18 and not tem_ingresso:
    print("Compre seu ingresso na bilheteria.")
else:
    print("Menor de idade nao pode entrar.")`,
        description: 'Voce pode combinar condicoes usando and, or e not.',
      },
    },
    {
      type: 'text',
      content: '## Formatando numeros com f-strings\n\nVoce ja sabe usar f-strings para inserir variaveis em textos. Mas ha um truque extra: voce pode **formatar** como o numero aparece usando `:` dentro das chaves `{}`.\n\nA sintaxe e: `{variavel:.Nf}` onde N e o numero de casas decimais.\n\n- `{valor:.2f}` — exibe com **2 casas decimais** (ex: `19.90`)\n- `{valor:.0f}` — exibe **sem casas decimais**, arredondado (ex: `20`)\n- `{valor:.1f}` — exibe com **1 casa decimal** (ex: `19.9`)\n\nIsso e muito util para exibir valores monetarios e percentuais.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'formatacao_fstring.py',
        code: 'valor = 19.9999\npercentual = 0.15  # 15%\n\n# Sem formatacao - mostra muitas casas decimais\nprint(f"Valor: R${valor}")         # R$19.9999\nprint(f"Percentual: {percentual * 100}%")  # 15.0%\n\n# COM formatacao - muito mais legivel!\nprint(f"Valor: R${valor:.2f}")            # R$19.99  (2 casas)\nprint(f"Percentual: {percentual * 100:.0f}%")  # 15%    (sem decimais)\nprint(f"Valor: R${valor:.1f}")            # R$20.0   (1 casa)\n\n# Aplicando desconto e exibindo formatado\npreco = 350.0\ndesconto_pct = 0.10\nvalor_desconto = preco * desconto_pct\npreco_final = preco - valor_desconto\n\nprint(f"Desconto: {desconto_pct * 100:.0f}%")   # 10%\nprint(f"Desconto: R${valor_desconto:.2f}")        # R$35.00\nprint(f"Total: R${preco_final:.2f}")              # R$315.00',
        description: '{variavel:.2f} formata com 2 casas decimais. {variavel:.0f} arredonda sem casas decimais.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Regra de ouro para valores em Reais: sempre use {valor:.2f} para exibir R$ com 2 casas decimais. Isso torna a saida profissional: R$35.00 em vez de R$35.0 ou R$35.000000000001.',
    },
  ],
  challenges: [
    {
      id: 'cond-c1',
      title: 'Positivo, Negativo ou Zero',
      description: 'Dado um numero, verifique se ele e positivo, negativo ou zero e imprima a mensagem correspondente.',
      language: 'python',
      starterCode: `numero = -5

# Use if/elif/else para verificar se o numero e:
# - positivo (maior que 0)
# - negativo (menor que 0)
# - zero (igual a 0)
`,
      solution: `numero = -5

if numero > 0:
    print("O numero e positivo")
elif numero < 0:
    print("O numero e negativo")
else:
    print("O numero e zero")`,
      hints: [
        'Um numero positivo e maior que 0, negativo e menor que 0',
        'Use elif para a segunda condicao em vez de outro if',
        'O else cobre o caso restante (zero), sem precisar de condicao',
      ],
    },
    {
      id: 'cond-c2',
      title: 'Classificador de Faixa Etaria',
      description: 'Dada uma idade, classifique a pessoa em: "Crianca" (0-11), "Adolescente" (12-17), "Adulto" (18-59) ou "Idoso" (60+). Imprima a classificacao.',
      language: 'python',
      starterCode: `idade = 25

# Classifique a faixa etaria:
# 0 a 11: Crianca
# 12 a 17: Adolescente
# 18 a 59: Adulto
# 60 ou mais: Idoso
`,
      solution: `idade = 25

if idade <= 11:
    print("Crianca")
elif idade <= 17:
    print("Adolescente")
elif idade <= 59:
    print("Adulto")
else:
    print("Idoso")`,
      hints: [
        'Comece verificando da menor faixa para a maior',
        'Se a primeira condicao (idade <= 11) falhou, ja sabemos que idade >= 12',
        'O else final cobre todos os casos de 60 para cima',
      ],
    },
    {
      id: 'cond-c3',
      title: 'Calculadora de Desconto',
      description: 'Uma loja oferece descontos por valor de compra: acima de R$500 ganha 20%, entre R$200 e R$500 ganha 10%, abaixo de R$200 nao tem desconto. Calcule o valor final e imprima o desconto aplicado e o valor a pagar.',
      language: 'python',
      starterCode: `valor_compra = 350.0

# Determine o desconto:
# Acima de 500: 20%
# Entre 200 e 500 (inclusive): 10%
# Abaixo de 200: sem desconto

# Calcule o valor do desconto e o valor final
# Imprima o percentual de desconto e o valor final
`,
      solution: `valor_compra = 350.0

if valor_compra > 500:
    desconto = 0.20
elif valor_compra >= 200:
    desconto = 0.10
else:
    desconto = 0

valor_desconto = valor_compra * desconto
valor_final = valor_compra - valor_desconto

print(f"Desconto: {desconto * 100:.0f}%")
print(f"Valor do desconto: R\${valor_desconto:.2f}")
print(f"Valor final: R\${valor_final:.2f}")`,
      hints: [
        'Primeiro defina o percentual de desconto com if/elif/else',
        'Calcule o valor do desconto multiplicando o valor da compra pelo percentual',
        'Use :.2f no f-string para formatar valores monetarios com 2 casas decimais',
      ],
    },
  ],
};
