import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'operadores-java',
  moduleId: 'java',
  title: 'Operadores em Java',
  description:
    'Domine os operadores aritmeticos, de comparacao, logicos e de atribuicao da linguagem Java.',
  order: 2,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content:
        'Operadores sao como os botoes de uma calculadora: cada um faz uma operacao diferente com os numeros. Vamos conhecer os operadores do Java!\n\n## O que sao Operadores?\n\n**Operadores** sao simbolos especiais que realizam operacoes sobre valores e variaveis. Em Java, temos diversos tipos de operadores que permitem fazer calculos, comparar valores e combinar condicoes logicas.\n\nOs principais grupos sao:\n\n- **Aritmeticos** — para calculos matematicos (+, -, *, /, %)\n- **De atribuicao** — para atribuir valores (=, +=, -=, *=, /=)\n- **De comparacao** — para comparar valores (==, !=, >, <, >=, <=)\n- **Logicos** — para combinar condicoes (&&, ||, !)\n- **Incremento/Decremento** — para somar ou subtrair 1 (++, --)',
    },
    {
      type: 'text',
      content:
        '## Operadores Aritmeticos\n\nSao usados para realizar operacoes matematicas basicas:\n\n| Operador | Descricao | Exemplo | Resultado |\n|----------|-----------|---------|----------|\n| `+` | Adicao | `10 + 3` | `13` |\n| `-` | Subtracao | `10 - 3` | `7` |\n| `*` | Multiplicacao | `10 * 3` | `30` |\n| `/` | Divisao | `10 / 3` | `3` (inteira) |\n| `%` | Modulo (resto) | `10 % 3` | `1` |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Aritmeticos {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 3;\n\n        System.out.println("Soma: " + (a + b));\n        System.out.println("Subtracao: " + (a - b));\n        System.out.println("Multiplicacao: " + (a * b));\n        System.out.println("Divisao inteira: " + (a / b));\n        System.out.println("Resto: " + (a % b));\n\n        // Divisao decimal\n        double resultado = (double) a / b;\n        System.out.println("Divisao decimal: " + resultado);\n    }\n}',
        filename: 'Aritmeticos.java',
        description: 'Demonstracao dos operadores aritmeticos. Divisao entre inteiros resulta em inteiro!',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Cuidado com a **divisao entre inteiros**! Em Java, `10 / 3` resulta em `3` (nao 3.333). Para obter resultado decimal, pelo menos um dos operandos deve ser double: `(double) 10 / 3` ou `10.0 / 3`.',
    },
    {
      type: 'text',
      content:
        '## Incremento, Decremento e Atribuicao Composta\n\nOs operadores `++` e `--` somam ou subtraem 1 da variavel. Os operadores compostos combinam uma operacao com a atribuicao:\n\n| Operador | Equivalente | Exemplo |\n|----------|-------------|----------|\n| `++` | `x = x + 1` | `x++` ou `++x` |\n| `--` | `x = x - 1` | `x--` ou `--x` |\n| `+=` | `x = x + n` | `x += 5` |\n| `-=` | `x = x - n` | `x -= 3` |\n| `*=` | `x = x * n` | `x *= 2` |\n| `/=` | `x = x / n` | `x /= 4` |\n| `%=` | `x = x % n` | `x %= 3` |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class IncrementoAtribuicao {\n    public static void main(String[] args) {\n        int contador = 10;\n        contador++;\n        System.out.println("Apos ++: " + contador);\n        contador--;\n        System.out.println("Apos --: " + contador);\n\n        int x = 20;\n        x += 5;\n        System.out.println("Apos += 5: " + x);\n        x -= 10;\n        System.out.println("Apos -= 10: " + x);\n        x *= 3;\n        System.out.println("Apos *= 3: " + x);\n        x /= 9;\n        System.out.println("Apos /= 9: " + x);\n        x %= 3;\n        System.out.println("Apos %= 3: " + x);\n    }\n}',
        filename: 'IncrementoAtribuicao.java',
        description: 'Usando incremento, decremento e operadores de atribuicao compostos.',
      },
    },
    {
      type: 'text',
      content:
        '## Operadores de Comparacao (Relacionais)\n\nComparacoes retornam um valor **boolean** (true ou false) e sao fundamentais para tomar decisoes:\n\n| Operador | Descricao | Exemplo | Resultado |\n|----------|-----------|---------|----------|\n| `==` | Igual a | `5 == 5` | `true` |\n| `!=` | Diferente de | `5 != 3` | `true` |\n| `>` | Maior que | `5 > 3` | `true` |\n| `<` | Menor que | `5 < 3` | `false` |\n| `>=` | Maior ou igual | `5 >= 5` | `true` |\n| `<=` | Menor ou igual | `3 <= 5` | `true` |',
    },
    {
      type: 'text',
      content:
        '## Operadores Logicos\n\nOperadores logicos combinam expressoes booleanas:\n\n| Operador | Descricao | Exemplo |\n|----------|-----------|----------|\n| `&&` | E logico (AND) | `true && false` resulta em `false` |\n| `\\|\\|` | OU logico (OR) | `true \\|\\| false` resulta em `true` |\n| `!` | NAO logico (NOT) | `!true` resulta em `false` |\n\nO `&&` so retorna true se **ambas** as condicoes forem verdadeiras. O `||` retorna true se **pelo menos uma** for verdadeira. O `!` inverte o valor.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Logicos {\n    public static void main(String[] args) {\n        int idade = 20;\n        boolean temCarteira = true;\n        double saldo = 150.0;\n\n        // Operadores de comparacao\n        System.out.println("Maior de idade: " + (idade >= 18));\n        System.out.println("Saldo positivo: " + (saldo > 0));\n\n        // Operadores logicos\n        boolean podeDirigir = idade >= 18 && temCarteira;\n        System.out.println("Pode dirigir: " + podeDirigir);\n\n        boolean temDesconto = idade < 12 || idade >= 65;\n        System.out.println("Tem desconto: " + temDesconto);\n\n        boolean naoTemCarteira = !temCarteira;\n        System.out.println("Nao tem carteira: " + naoTemCarteira);\n    }\n}',
        filename: 'Logicos.java',
        description: 'Combinando operadores de comparacao e logicos em Java.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Para comparar **Strings** em Java, use o metodo `.equals()` ao inves de `==`. O `==` compara se sao o mesmo objeto na memoria, enquanto `.equals()` compara o conteudo. Exemplo: `"abc".equals(outraString)`.',
    },
    {
      type: 'callout',
      content:
        'Se voce ja aprendeu Python ou C, os conceitos sao os mesmos — so muda a forma de escrever. Va com calma!',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Operador Ternario\n\nO **operador ternario** e um atalho para um if-else simples. A sintaxe e:\n\n```\nresultado = (condicao) ? valorSeVerdadeiro : valorSeFalso;\n```\n\nE util para atribuicoes simples onde o valor depende de uma condicao. Para logicas mais complexas, prefira usar if-else normal por questao de legibilidade.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'OperadorTernario.java',
        code: 'public class OperadorTernario {\n    public static void main(String[] args) {\n        int idade = 20;\n\n        // Com if-else tradicional:\n        String situacao;\n        if (idade >= 18) {\n            situacao = "adulto";\n        } else {\n            situacao = "menor de idade";\n        }\n\n        // Com operador ternario (equivalente e mais conciso):\n        String situacao2 = (idade >= 18) ? "adulto" : "menor de idade";\n\n        System.out.println(situacao);   // adulto\n        System.out.println(situacao2);  // adulto\n\n        // Outros exemplos\n        double saldo = 150.0;\n        String status = (saldo > 0) ? "positivo" : "negativo";\n\n        int numero = 7;\n        String paridade = (numero % 2 == 0) ? "par" : "impar";\n        System.out.println(numero + " e " + paridade);\n\n        // Calcular maior de dois numeros\n        int a = 15, b = 20;\n        int maior = (a > b) ? a : b;\n        System.out.println("Maior: " + maior);\n    }\n}',
        description:
          'O operador ternario e um if-else compacto para atribuicoes simples.',
      },
    },
    {
      type: 'text',
      content:
        '## Precedencia de Operadores\n\nAssim como na matematica, os operadores em Java tem **ordem de prioridade** (precedencia). Operadores com maior precedencia sao avaliados primeiro:\n\n1. `++` / `--` (pos/pre-incremento)\n2. `!` (NOT logico), casting `(tipo)`\n3. `*` `/` `%` (multiplicacao, divisao, modulo)\n4. `+` `-` (adicao, subtracao)\n5. `>` `<` `>=` `<=` (comparacao)\n6. `==` `!=` (igualdade)\n7. `&&` (AND logico)\n8. `||` (OR logico)\n9. `? :` (ternario)\n10. `=` `+=` `-=` etc. (atribuicao)\n\nQuando em duvida, use **parenteses** para deixar a intenção clara!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'Precedencia.java',
        code: 'public class Precedencia {\n    public static void main(String[] args) {\n        // Sem parenteses: * tem maior precedencia que +\n        int resultado1 = 2 + 3 * 4;   // 2 + 12 = 14\n        System.out.println(resultado1); // 14\n\n        // Com parenteses: forca a adicao primeiro\n        int resultado2 = (2 + 3) * 4;  // 5 * 4 = 20\n        System.out.println(resultado2); // 20\n\n        // && tem maior precedencia que ||\n        boolean r = true || false && false;\n        // Equivale a: true || (false && false) = true || false = true\n        System.out.println(r); // true\n\n        // Com parenteses para clareza:\n        boolean r2 = (true || false) && false;\n        // Equivale a: true && false = false\n        System.out.println(r2); // false\n    }\n}',
        description:
          'Precedencia de operadores e como parenteses alteram a ordem de avaliacao.',
      },
    },
  ],
  challenges: [
    {
      id: 'oj-c1',
      title: 'Calculadora Basica',
      description:
        'Declare duas variaveis inteiras (a = 17, b = 5) e imprima o resultado da soma, subtracao, multiplicacao, divisao inteira e resto da divisao entre elas.',
      language: 'java',
      starterCode:
        'public class Calculadora {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        // Imprima os resultados das 5 operacoes\n\n    }\n}',
      solution:
        'public class Calculadora {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        System.out.println("Soma: " + (a + b));\n        System.out.println("Subtracao: " + (a - b));\n        System.out.println("Multiplicacao: " + (a * b));\n        System.out.println("Divisao: " + (a / b));\n        System.out.println("Resto: " + (a % b));\n    }\n}',
      hints: [
        'Use parenteses ao redor da operacao quando concatenar com String: "Soma: " + (a + b).',
        'Lembre-se que divisao entre inteiros resulta em inteiro.',
        'O operador % retorna o resto da divisao.',
      ],
    },
    {
      id: 'oj-c2',
      title: 'Verificador de Elegibilidade',
      description:
        'Uma pessoa pode votar se tiver 16 anos ou mais. O voto e obrigatorio entre 18 e 70 anos. Declare uma variavel idade = 20 e use operadores de comparacao e logicos para verificar se pode votar e se o voto e obrigatorio. Imprima os resultados.',
      language: 'java',
      starterCode:
        'public class Elegibilidade {\n    public static void main(String[] args) {\n        int idade = 20;\n\n        // Verifique se pode votar (idade >= 16)\n\n        // Verifique se o voto e obrigatorio (18 <= idade <= 70)\n\n        // Imprima os resultados\n\n    }\n}',
      solution:
        'public class Elegibilidade {\n    public static void main(String[] args) {\n        int idade = 20;\n\n        boolean podeVotar = idade >= 16;\n        boolean votoObrigatorio = idade >= 18 && idade <= 70;\n\n        System.out.println("Idade: " + idade);\n        System.out.println("Pode votar: " + podeVotar);\n        System.out.println("Voto obrigatorio: " + votoObrigatorio);\n    }\n}',
      hints: [
        'Use >= para verificar se a idade e maior ou igual a 16.',
        'Para verificar se esta entre 18 e 70, combine duas condicoes com &&.',
        'Armazene os resultados em variaveis boolean.',
      ],
    },
    {
      id: 'oj-c3',
      title: 'Operadores de Atribuicao em Acao',
      description:
        'Comece com saldo = 1000 (double). Aplique na ordem: adicione 500 (+=), subtraia 200 (-=), multiplique por 2 (*=) e divida por 4 (/=). Imprima o saldo apos cada operacao.',
      language: 'java',
      starterCode:
        'public class SaldoOperacoes {\n    public static void main(String[] args) {\n        double saldo = 1000;\n        System.out.println("Saldo inicial: " + saldo);\n\n        // Adicione 500 usando +=\n\n        // Subtraia 200 usando -=\n\n        // Multiplique por 2 usando *=\n\n        // Divida por 4 usando /=\n\n    }\n}',
      solution:
        'public class SaldoOperacoes {\n    public static void main(String[] args) {\n        double saldo = 1000;\n        System.out.println("Saldo inicial: " + saldo);\n\n        saldo += 500;\n        System.out.println("Apos +500: " + saldo);\n\n        saldo -= 200;\n        System.out.println("Apos -200: " + saldo);\n\n        saldo *= 2;\n        System.out.println("Apos *2: " + saldo);\n\n        saldo /= 4;\n        System.out.println("Apos /4: " + saldo);\n    }\n}',
      hints: [
        'Use += para adicionar, -= para subtrair, *= para multiplicar e /= para dividir.',
        'Imprima o saldo apos cada operacao para acompanhar as mudancas.',
        'O saldo final deve ser 650.0.',
      ],
    },
  ],
};
