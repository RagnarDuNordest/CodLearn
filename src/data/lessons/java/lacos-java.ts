import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'lacos-java',
  moduleId: 'java',
  title: 'Lacos de Repeticao em Java',
  description:
    'Aprenda a usar for, while e do-while para repetir blocos de codigo, alem de break, continue e uma previa do for-each.',
  order: 4,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Imagine mandar \"Bom dia!\" para 50 colegas. Em vez de escrever 50 mensagens, voce cria um laco que repete a acao automaticamente!\n\n## Por que usar Lacos?\n\nImagine que voce precisa imprimir os numeros de 1 a 1000. Seria impraticavel escrever mil linhas de `System.out.println()`. Os **lacos de repeticao** (ou loops) resolvem esse problema: eles permitem executar um bloco de codigo **varias vezes** de forma automatica.\n\nJava oferece tres tipos de lacos:\n\n- **`for`** — Quando voce sabe quantas vezes quer repetir\n- **`while`** — Quando quer repetir enquanto uma condicao for verdadeira\n- **`do-while`** — Similar ao while, mas garante pelo menos uma execucao',
    },
    {
      type: 'text',
      content:
        '## O Laco for\n\nO `for` e o laco mais usado quando sabemos o numero de repeticoes. Sua estrutura tem tres partes:\n\n```\nfor (inicializacao; condicao; atualizacao) {\n    // codigo a repetir\n}\n```\n\n- **Inicializacao** — Executada uma unica vez no inicio (ex: `int i = 0`)\n- **Condicao** — Verificada antes de cada iteracao. Se `false`, o laco para\n- **Atualizacao** — Executada ao final de cada iteracao (ex: `i++`)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class LacoFor {\n    public static void main(String[] args) {\n        // Contando de 1 a 5\n        for (int i = 1; i <= 5; i++) {\n            System.out.println("Contagem: " + i);\n        }\n        \n        System.out.println("---");\n        \n        // Contando de 10 a 0 (decrescente, de 2 em 2)\n        for (int i = 10; i >= 0; i -= 2) {\n            System.out.println("Valor: " + i);\n        }\n        \n        System.out.println("---");\n        \n        // Tabuada do 7\n        for (int i = 1; i <= 10; i++) {\n            System.out.println("7 x " + i + " = " + (7 * i));\n        }\n    }\n}',
        filename: 'LacoFor.java',
        description: 'Exemplos praticos do laco for: contagem crescente, decrescente e tabuada.',
      },
    },
    {
      type: 'text',
      content:
        '## O Laco while\n\nO `while` repete o bloco de codigo **enquanto** a condicao for verdadeira. E ideal quando voce nao sabe exatamente quantas vezes vai repetir.\n\n```\nwhile (condicao) {\n    // codigo a repetir\n}\n```\n\nCuidado: se a condicao nunca se tornar `false`, voce tera um **loop infinito**!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class LacoWhile {\n    public static void main(String[] args) {\n        // Contando ate 5 com while\n        int contador = 1;\n        while (contador <= 5) {\n            System.out.println("Contador: " + contador);\n            contador++;\n        }\n        \n        System.out.println("---");\n        \n        // Dividindo por 2 ate chegar a 1\n        int numero = 64;\n        while (numero > 1) {\n            System.out.println(numero);\n            numero /= 2;\n        }\n        System.out.println(numero);\n    }\n}',
        filename: 'LacoWhile.java',
        description: 'Usando while para repeticoes com condicao dinamica.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Sempre garanta que a condicao do **while** vai se tornar `false` em algum momento. Caso contrario, seu programa entrara em um **loop infinito** e travara! Verifique se a variavel de controle e atualizada dentro do laco.',
    },
    {
      type: 'text',
      content:
        '## O Laco do-while\n\nO `do-while` e similar ao `while`, mas com uma diferenca crucial: ele **executa o bloco pelo menos uma vez** antes de verificar a condicao.\n\n```\ndo {\n    // codigo a executar\n} while (condicao);\n```\n\nIsso e util em situacoes como menus interativos, onde voce quer mostrar as opcoes antes de perguntar se o usuario quer continuar.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class LacoDoWhile {\n    public static void main(String[] args) {\n        // Simulando tentativas\n        int tentativas = 0;\n        \n        do {\n            tentativas++;\n            System.out.println("Tentativa " + tentativas);\n        } while (tentativas < 3);\n        \n        System.out.println("Total de tentativas: " + tentativas);\n        \n        System.out.println("---");\n        \n        // Diferenca para while: executa pelo menos uma vez\n        int x = 10;\n        do {\n            System.out.println("do-while executou com x = " + x);\n        } while (x < 5); // Condicao ja e falsa, mas executa uma vez\n    }\n}',
        filename: 'LacoDoWhile.java',
        description: 'O do-while garante pelo menos uma execucao do bloco.',
      },
    },
    {
      type: 'text',
      content:
        '## break e continue\n\nDuas palavras-chave especiais controlam o fluxo dentro de lacos:\n\n- **`break`** — Interrompe o laco imediatamente e sai dele\n- **`continue`** — Pula para a proxima iteracao, ignorando o restante do bloco\n\nAmbos podem ser usados em qualquer tipo de laco (`for`, `while`, `do-while`).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class BreakContinue {\n    public static void main(String[] args) {\n        // break: para quando encontrar o numero 5\n        System.out.println("Exemplo break:");\n        for (int i = 1; i <= 10; i++) {\n            if (i == 5) {\n                System.out.println("Encontrei o 5! Parando...");\n                break;\n            }\n            System.out.println("Numero: " + i);\n        }\n        \n        System.out.println("---");\n        \n        // continue: pula numeros pares\n        System.out.println("Exemplo continue:");\n        for (int i = 1; i <= 10; i++) {\n            if (i % 2 == 0) {\n                continue; // Pula para a proxima iteracao\n            }\n            System.out.println("Impar: " + i);\n        }\n    }\n}',
        filename: 'BreakContinue.java',
        description: 'Controlando o fluxo dos lacos com break e continue.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use **break** quando quiser sair do laco antecipadamente (ex: encontrou o que procurava). Use **continue** quando quiser pular uma iteracao especifica sem sair do laco.',
    },
    {
      type: 'text',
      content:
        '## Previa: for-each (Enhanced for)\n\nO Java possui uma forma simplificada de percorrer colecoes chamada **for-each**. Ele itera automaticamente sobre cada elemento sem precisar controlar indices.\n\n```\nfor (tipo elemento : colecao) {\n    // usar elemento\n}\n```\n\nVeremos o for-each em detalhes na aula de Arrays. Por enquanto, veja um exemplo rapido:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class ForEachPrevia {\n    public static void main(String[] args) {\n        String[] frutas = {"Maca", "Banana", "Laranja", "Uva"};\n        \n        // for-each: percorre cada elemento automaticamente\n        for (String fruta : frutas) {\n            System.out.println("Fruta: " + fruta);\n        }\n    }\n}',
        filename: 'ForEachPrevia.java',
        description: 'Previa do for-each para percorrer arrays de forma simplificada.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'O for-each e mais limpo e legivel, mas nao da acesso ao indice do elemento. Quando voce precisar do indice, use o for tradicional.',
    },
    {
      type: 'callout',
      content:
        'Se voce ja aprendeu Python ou C, os conceitos sao os mesmos — so muda a forma de escrever. Va com calma!',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'lj-c1',
      title: 'Tabuada Completa',
      description:
        'Receba um numero inteiro (ex: 5) e imprima sua tabuada completa de 1 a 10 usando um laco for. O formato deve ser: "5 x 1 = 5", "5 x 2 = 10", etc.',
      language: 'java',
      starterCode:
        'public class Tabuada {\n    public static void main(String[] args) {\n        int numero = 5;\n        \n        // Use um laco for para imprimir a tabuada de 1 a 10\n        \n    }\n}',
      solution:
        'public class Tabuada {\n    public static void main(String[] args) {\n        int numero = 5;\n        \n        System.out.println("Tabuada do " + numero + ":");\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(numero + " x " + i + " = " + (numero * i));\n        }\n    }\n}',
      hints: [
        'Use for (int i = 1; i <= 10; i++) para iterar de 1 a 10.',
        'Dentro do laco, multiplique o numero pelo contador i.',
        'Use concatenacao de String com + para montar a saida.',
      ],
    },
    {
      id: 'lj-c2',
      title: 'Soma de 1 ate N',
      description:
        'Dado um numero N, use um laco while para calcular a soma de todos os inteiros de 1 ate N. Por exemplo, se N = 5, a soma sera 1+2+3+4+5 = 15. Imprima o resultado.',
      language: 'java',
      starterCode:
        'public class SomaAteN {\n    public static void main(String[] args) {\n        int n = 10;\n        int soma = 0;\n        \n        // Use um laco while para somar de 1 ate n\n        \n        System.out.println("Soma de 1 ate " + n + ": " + soma);\n    }\n}',
      solution:
        'public class SomaAteN {\n    public static void main(String[] args) {\n        int n = 10;\n        int soma = 0;\n        int i = 1;\n        \n        while (i <= n) {\n            soma += i;\n            i++;\n        }\n        \n        System.out.println("Soma de 1 ate " + n + ": " + soma);\n    }\n}',
      hints: [
        'Crie uma variavel i comecando em 1 para controlar o while.',
        'A condicao do while deve ser i <= n.',
        'Dentro do laco, acumule o valor de i na variavel soma e incremente i.',
      ],
    },
    {
      id: 'lj-c3',
      title: 'Numeros Primos',
      description:
        'Use lacos para imprimir todos os numeros primos de 2 ate 50. Um numero primo e divisivel apenas por 1 e por ele mesmo. Use um for externo para cada numero e um for interno para testar divisores. Use break para otimizar.',
      language: 'java',
      starterCode:
        'public class NumerosPrimos {\n    public static void main(String[] args) {\n        System.out.println("Numeros primos de 2 a 50:");\n        \n        // Para cada numero de 2 a 50, verifique se e primo\n        for (int num = 2; num <= 50; num++) {\n            // Verifique se num e primo\n            \n        }\n    }\n}',
      solution:
        'public class NumerosPrimos {\n    public static void main(String[] args) {\n        System.out.println("Numeros primos de 2 a 50:");\n        \n        for (int num = 2; num <= 50; num++) {\n            boolean ehPrimo = true;\n            \n            for (int div = 2; div <= num / 2; div++) {\n                if (num % div == 0) {\n                    ehPrimo = false;\n                    break;\n                }\n            }\n            \n            if (ehPrimo) {\n                System.out.println(num);\n            }\n        }\n    }\n}',
      hints: [
        'Para cada numero, assuma que e primo (boolean ehPrimo = true).',
        'Teste divisores de 2 ate num/2. Se algum dividir exatamente, nao e primo.',
        'Use break para sair do laco interno assim que encontrar um divisor.',
      ],
    },
  ],
};
