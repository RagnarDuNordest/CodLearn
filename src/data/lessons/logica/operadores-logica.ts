import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'operadores-logica',
  moduleId: 'logica',
  title: 'Operadores: Aritmeticos, Comparacao e Atribuicao',
  description:
    'Domine todos os operadores da programacao: faca calculos, compare valores, use atalhos de atribuicao e entenda a precedencia de operadores.',
  order: 4,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Se os tipos de dados sao os "substantivos" da programacao (as coisas que existem), os **operadores** sao os "verbos" — eles fazem algo acontecer com esses dados.\n\nExistem 4 grandes grupos de operadores:\n1. **Aritmeticos** — fazem calculos matematicos\n2. **De Comparacao** — comparam dois valores e retornam verdadeiro ou falso\n3. **De Atribuicao** — guardam (e atualizam) valores em variaveis\n4. **Logicos** — combinam condicoes (veremos na proxima aula)\n\nVamos comecar pelo grupo mais intuitivo.',
    },
    {
      type: 'text',
      content:
        '## 1. Operadores Aritmeticos\n\nSao os operadores matematicos que voce ja conhece — mais alguns extras:\n\n| Operador | Operacao | Exemplo | Resultado |\n|----------|----------|---------|-----------|\n| `+` | Adicao | `10 + 3` | `13` |\n| `-` | Subtracao | `10 - 3` | `7` |\n| `*` | Multiplicacao | `10 * 3` | `30` |\n| `/` | Divisao (sempre float) | `10 / 3` | `3.333...` |\n| `//` | Divisao inteira (descarta decimal) | `10 // 3` | `3` |\n| `%` | Modulo (resto da divisao) | `10 % 3` | `1` |\n| `**` | Exponenciacao (potencia) | `2 ** 8` | `256` |\n\n### O modulo (%) e muito util!\nEle retorna o **resto** da divisao. Usado para:\n- Verificar se numero e par: `n % 2 == 0` → par\n- Verificar multiplos: `n % 5 == 0` → multiplo de 5\n- Trabalhar com ciclos (hora 0-23, dia 0-6, etc.)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Operadores aritmeticos\na = 17\nb = 5\n\nprint(f"{a} + {b} = {a + b}")   # 22\nprint(f"{a} - {b} = {a - b}")   # 12\nprint(f"{a} * {b} = {a * b}")   # 85\nprint(f"{a} / {b} = {a / b}")   # 3.4  (sempre float)\nprint(f"{a} // {b} = {a // b}") # 3    (parte inteira)\nprint(f"{a} % {b} = {a % b}")   # 2    (resto: 17 = 3*5 + 2)\nprint(f"{a} ** {b} = {a ** b}") # 1419857  (17^5)\n\nprint()\n\n# Aplicacoes praticas do modulo\nnumero = 42\nprint(f"{numero} e par?", numero % 2 == 0)   # True\n\nhoras_totais = 50\nhoras = horas_totais % 24\ndias = horas_totais // 24\nprint(f"50 horas = {dias} dia(s) e {horas} hora(s)")  # 2 dias e 2 horas\n\n# Potenciacao: muito usado em matematica e criptografia\nprint(f"2^10 = {2**10}")   # 1024\nprint(f"3^3 = {3**3}")     # 27\nprint(f"raiz de 16 = {16**0.5}")  # 4.0 (x^0.5 = raiz quadrada)',
        filename: 'operadores_aritmeticos.py',
        description:
          'Note que / sempre retorna float em Python 3. Para divisao inteira (sem decimais), use //. O operador % (modulo) e a base de muitos algoritmos — aprenda a usa-lo bem!',
      },
    },
    {
      type: 'text',
      content:
        '## 2. Operadores de Comparacao\n\nComparacoes sempre retornam **True** ou **False** (um bool). Sao a base de qualquer condicional.\n\n| Operador | Significado | Exemplo | Resultado |\n|----------|-------------|---------|------------|\n| `==` | Igual a | `5 == 5` | `True` |\n| `!=` | Diferente de | `5 != 3` | `True` |\n| `>` | Maior que | `5 > 3` | `True` |\n| `<` | Menor que | `5 < 3` | `False` |\n| `>=` | Maior ou igual | `5 >= 5` | `True` |\n| `<=` | Menor ou igual | `4 <= 5` | `True` |\n\n### ERRO CLASSICO: = vs ==\n- `=` e **atribuicao**: `x = 5` (guarda o valor 5 na variavel x)\n- `==` e **comparacao**: `x == 5` (pergunta "x e igual a 5?")\n\nEsse e um dos erros mais comuns de quem esta aprendendo. Se voce usar `=` onde devia usar `==` dentro de um `if`, vai dar erro ou um comportamento inesperado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Operadores de comparacao — resultado sempre e True ou False\nidade = 20\nnota = 7.5\nsenha = "abc123"\n\nprint(idade == 20)    # True\nprint(idade == 18)    # False\nprint(idade != 18)    # True\nprint(nota >= 7.0)    # True  (aprovado!)\nprint(nota < 6.0)     # False\nprint(nota > 10.0)    # False\n\n# Comparar strings\nprint(senha == "abc123")   # True\nprint(senha == "ABC123")   # False (maiusculas importam!)\nprint(senha != "errado")   # True\n\n# Comparacoes em cadeia (unico do Python!)\nx = 15\nprint(10 < x < 20)   # True  (equivale a: x > 10 and x < 20)\nprint(1 <= x <= 10)  # False\n\n# Comparacoes geram bools que podem ser guardados\ne_maior_de_idade = idade >= 18\ne_aprovado = nota >= 6.0\nprint(f"Maior de idade: {e_maior_de_idade}")\nprint(f"Aprovado: {e_aprovado}")',
        filename: 'operadores_comparacao.py',
        description:
          'Python permite comparacoes encadeadas como 10 < x < 20, o que e muito mais legivel que escrever x > 10 and x < 20. Comparacao de strings e case-sensitive (diferencia maiusculas de minusculas).',
      },
    },
    {
      type: 'text',
      content:
        '## 3. Operadores de Atribuicao\n\nO operador `=` basico voce ja conhece. Mas existem **atalhos** muito usados que combinam uma operacao matematica com atribuicao:\n\n| Operador | Equivale a | Exemplo | Resultado |\n|----------|------------|---------|----------|\n| `=` | — | `x = 10` | x vale 10 |\n| `+=` | `x = x + n` | `x += 3` | x passa a valer 13 |\n| `-=` | `x = x - n` | `x -= 2` | x passa a valer 11 |\n| `*=` | `x = x * n` | `x *= 2` | x passa a valer 22 |\n| `/=` | `x = x / n` | `x /= 2` | x passa a valer 11.0 |\n| `//=` | `x = x // n` | `x //= 3` | x passa a valer 3 |\n| `%=` | `x = x % n` | `x %= 4` | x passa a valer 3 |\n| `**=` | `x = x ** n` | `x **= 2` | x passa a valer 9 |\n\nOs mais usados no dia a dia sao `+=`, `-=` e `*=`. Voce os vera o tempo todo em loops e contadores.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Operadores de atribuicao — atalhos praticos\n\n# Sem atalho (verboso)\npontos = 0\npontos = pontos + 10\npontos = pontos + 10\npontos = pontos + 5\nprint("Sem atalho:", pontos)  # 25\n\n# Com atalho (mais limpo e profissional)\npontos = 0\npontos += 10   # pontos = pontos + 10\npontos += 10\npontos += 5\nprint("Com atalho:", pontos)  # 25 (mesmo resultado!)\n\n# Outros atalhos em acao\nvalor = 100\nvalor -= 30    # desconto de 30%... espera, nao e assim\nprint("Apos desconto:", valor)   # 70\n\nvalor *= 1.1   # reajuste de 10%\nprint("Apos reajuste:", valor)   # 77.0\n\ncontador = 10\ncontador //= 3\nprint("Divisao inteira:", contador)  # 3\n\n# Muito comum em loops:\ntotal = 0\nfor numero in [5, 10, 15, 20]:\n    total += numero   # vai acumulando\nprint("Total:", total)   # 50',
        filename: 'operadores_atribuicao.py',
        description:
          'Os atalhos de atribuicao sao mais do que conveniencia — eles comunicam intencao. total += valor diz "adicione ao total", enquanto total = total + valor e mais mecanico. Use os atalhos!',
      },
    },
    {
      type: 'text',
      content:
        '## 4. Precedencia de Operadores\n\nQuando uma expressao tem varios operadores, qual e calculado primeiro?\n\n**Ordem (do maior para o menor):**\n1. `()` — Parenteses (voce controla a ordem)\n2. `**` — Exponenciacao\n3. `+x`, `-x` — Sinais unarios (numero positivo/negativo)\n4. `*`, `/`, `//`, `%` — Multiplicacao e divisao\n5. `+`, `-` — Adicao e subtracao\n6. `==`, `!=`, `<`, `>`, `<=`, `>=` — Comparacoes\n7. `not` — Negacao logica\n8. `and` — E logico\n9. `or` — Ou logico\n\n**Regra de ouro: na duvida, use parenteses!** Eles deixam o codigo mais claro e evitam erros.\n\n```python\n2 + 3 * 4    # 14 (nao 20!) — multiplicacao primeiro\n(2 + 3) * 4  # 20 — parenteses forcam a adicao primeiro\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Precedencia de operadores — cuidado com a ordem!\n\n# Multiplicacao antes de adicao\nresult1 = 2 + 3 * 4\nprint("2 + 3 * 4 =", result1)        # 14, nao 20!\n\nresult2 = (2 + 3) * 4\nprint("(2 + 3) * 4 =", result2)      # 20\n\n# Exponenciacao antes de multiplicacao\nresult3 = 2 * 3 ** 2\nprint("2 * 3 ** 2 =", result3)       # 18 (2 * 9)\n\nresult4 = (2 * 3) ** 2\nprint("(2 * 3) ** 2 =", result4)     # 36 (6^2)\n\n# Exemplo pratico: media de notas\nnota1, nota2, nota3 = 7, 8, 9\n\n# BUG! Divisao acontece antes da adicao\nmedia_errada = nota1 + nota2 + nota3 / 3\nprint("Media ERRADA:", media_errada)  # 18.0 (errado!)\n\n# CORRETO: parenteses garantem a soma primeiro\nmedia_certa = (nota1 + nota2 + nota3) / 3\nprint("Media CERTA:", media_certa)   # 8.0\n\n# Comparacoes apos calculos\nprint(2 + 3 == 5)       # True (calcula 2+3=5, depois compara com 5)\nprint(10 - 3 > 5 + 1)  # True (7 > 6)',
        filename: 'precedencia.py',
        description:
          'O erro de calcular media sem parenteses e classico em programacao. Sempre use parenteses quando houver mistura de operacoes. Seus colegas (e voce mesmo no futuro) vao agradecer pelo codigo mais legivel.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Resumo dos operadores mais usados: + - * / para calculos; == != < > <= >= para comparar; += -= *= para atualizar valores rapidamente. Se lembrar so disso, voce ja resolve 90% dos problemas. O modulo % e a divisao inteira // sao seus amigos secretos para problemas de logica!',
    },
  ],
  challenges: [
    {
      id: 'op-logica-c1',
      title: 'Calculadora de IMC',
      description: 'Calcule o IMC = peso / altura^2. Para peso=75 e altura=1.75, exiba o IMC com 2 casas decimais e se esta na faixa saudavel (18.5 <= imc < 25.0).',
      language: 'python',
      starterCode: 'peso = 75.0\naltura = 1.75\n\nimc = ???\n\nprint(f"IMC: {imc:.2f}")\ne_saudavel = ???\nprint(f"Faixa saudavel: {e_saudavel}")\n',
      solution: 'peso = 75.0\naltura = 1.75\n\nimc = peso / altura ** 2\n\nprint(f"IMC: {imc:.2f}")\ne_saudavel = 18.5 <= imc < 25.0\nprint(f"Faixa saudavel: {e_saudavel}")',
      hints: [
        'Altura ao quadrado: use ** para potenciacao: altura ** 2',
        'Divisao normal / e correta, pois IMC pode ter decimais',
        'Comparacao encadeada: 18.5 <= imc < 25.0',
        '{imc:.2f} formata com 2 casas decimais',
      ],
    },
    {
      id: 'op-logica-c2',
      title: 'Conversor de tempo',
      description: 'Dado total_segundos = 3725, calcule quantas horas, minutos e segundos ele representa usando // e %. Exiba: "3725 segundos = 1h 2m 5s".',
      language: 'python',
      starterCode: 'total_segundos = 3725\n\nhoras = ???\nminutos = ???\nsegundos = ???\n\nprint(f"{total_segundos} segundos = {horas}h {minutos}m {segundos}s")\n',
      solution: 'total_segundos = 3725\n\nhoras = total_segundos // 3600\nminutos = (total_segundos % 3600) // 60\nsegundos = total_segundos % 60\n\nprint(f"{total_segundos} segundos = {horas}h {minutos}m {segundos}s")',
      hints: [
        '1 hora = 3600 segundos. Quantas horas cabem? Use //',
        'Apos tirar as horas, os segundos restantes sao: total % 3600',
        'Desses restantes, quantos minutos cabem? Use // 60',
        'O que sobra apos tirar os minutos? Use % 60',
      ],
    },
    {
      id: 'op-logica-c3',
      title: 'Caixa registradora',
      description: 'Calcule o total somando 3 produtos com +=. Se total > 300, aplique 10% de desconto com *=. Com pagamento=500, calcule e mostre o troco.',
      language: 'python',
      starterCode: 'total = 0.0\npreco_camisa = 89.90\npreco_calca = 149.90\npreco_tenis = 259.90\n\n# Use += para adicionar cada produto ao total\n\n# Se total > 300, aplique desconto de 10% com *=\n\npagamento = 500.0\ntroco = pagamento - total\nprint(f"Total: R$ {total:.2f}")\nprint(f"Troco: R$ {troco:.2f}")\n',
      solution: 'total = 0.0\npreco_camisa = 89.90\npreco_calca = 149.90\npreco_tenis = 259.90\n\ntotal += preco_camisa\ntotal += preco_calca\ntotal += preco_tenis\n\nif total > 300:\n    total *= 0.9\n\npagamento = 500.0\ntroco = pagamento - total\nprint(f"Total: R$ {total:.2f}")\nprint(f"Troco: R$ {troco:.2f}")',
      hints: [
        'Use total += preco_camisa para adicionar cada item',
        'Para 10% de desconto: total *= 0.9 (multiplica por 90%)',
        'Verifique if total > 300 antes de aplicar o desconto',
        'Troco = pagamento - total',
      ],
    },
  ],
};