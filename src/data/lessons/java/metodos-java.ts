import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'metodos-java',
  moduleId: 'java',
  title: 'Metodos em Java',
  description:
    'Aprenda a criar metodos estaticos, definir parametros, tipos de retorno, void e usar sobrecarga de metodos (overloading).',
  order: 5,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Um metodo e como uma receita salva: voce escreve uma vez e pode usar sempre que precisar, sem reescrever tudo de novo!\n\n## O que sao Metodos?\n\nMetodos sao **blocos de codigo reutilizaveis** que realizam uma tarefa especifica. Em vez de repetir o mesmo codigo varias vezes, voce cria um metodo e o **chama** sempre que precisar.\n\nBeneficios de usar metodos:\n- **Reutilizacao** — Escreva uma vez, use varias vezes\n- **Organizacao** — Divide o codigo em partes menores e mais legiveis\n- **Manutencao** — Corrigir um metodo corrige todos os lugares que o usam\n\nVoce ja usa metodos o tempo todo! `System.out.println()` e `Integer.parseInt()` sao exemplos de metodos prontos do Java.',
    },
    {
      type: 'text',
      content:
        '## Estrutura de um Metodo\n\nA estrutura basica de um metodo em Java e:\n\n```\nmodificador tipoRetorno nomeMetodo(parametros) {\n    // corpo do metodo\n    return valor; // se o tipo nao for void\n}\n```\n\n- **Modificador** — `public`, `private`, `static`, etc.\n- **Tipo de retorno** — O tipo do valor retornado (`int`, `String`, `void` se nao retorna nada)\n- **Nome do metodo** — Segue a convencao **camelCase** (ex: `calcularMedia`)\n- **Parametros** — Dados que o metodo recebe para trabalhar (opcionais)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Metodos {\n    \n    // Metodo sem retorno (void) e sem parametros\n    public static void saudacao() {\n        System.out.println("Ola! Bem-vindo ao Java!");\n    }\n    \n    // Metodo com parametros e sem retorno\n    public static void saudarPessoa(String nome) {\n        System.out.println("Ola, " + nome + "!");\n    }\n    \n    // Metodo com parametros e com retorno\n    public static int somar(int a, int b) {\n        return a + b;\n    }\n    \n    public static void main(String[] args) {\n        saudacao();              // Ola! Bem-vindo ao Java!\n        saudarPessoa("Maria");   // Ola, Maria!\n        \n        int resultado = somar(10, 5);\n        System.out.println("Soma: " + resultado);  // Soma: 15\n    }\n}',
        filename: 'Metodos.java',
        description: 'Tres tipos de metodos: sem parametros, com parametros e com retorno.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Por enquanto, usamos **static** em todos os metodos porque estamos chamando eles diretamente do `main` (que tambem e static). Quando estudarmos orientacao a objetos, entenderemos melhor a diferenca entre metodos estaticos e de instancia.',
    },
    {
      type: 'text',
      content:
        '## Metodos com Retorno e void\n\nQuando um metodo tem um **tipo de retorno** diferente de `void`, ele deve usar a palavra-chave `return` para devolver um valor. O tipo do valor retornado deve corresponder ao tipo declarado.\n\nO `return` tambem encerra a execucao do metodo imediatamente. Metodos **void** nao retornam valor, mas podem usar `return;` (sem valor) para encerrar antecipadamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class MetodosRetorno {\n    \n    public static double calcularMedia(double nota1, double nota2, double nota3) {\n        double media = (nota1 + nota2 + nota3) / 3.0;\n        return media;\n    }\n    \n    public static String classificarNota(double media) {\n        if (media >= 7.0) {\n            return "Aprovado";\n        } else if (media >= 5.0) {\n            return "Recuperacao";\n        } else {\n            return "Reprovado";\n        }\n    }\n    \n    public static boolean ehPar(int numero) {\n        return numero % 2 == 0;\n    }\n    \n    public static void main(String[] args) {\n        double media = calcularMedia(8.0, 6.5, 7.0);\n        System.out.println("Media: " + media);\n        System.out.println("Situacao: " + classificarNota(media));\n        \n        System.out.println("10 e par? " + ehPar(10));  // true\n        System.out.println("7 e par? " + ehPar(7));    // false\n    }\n}',
        filename: 'MetodosRetorno.java',
        description: 'Metodos que retornam double, String e boolean.',
      },
    },
    {
      type: 'text',
      content:
        '## Escopo de Variaveis\n\nO **escopo** de uma variavel define onde ela pode ser usada no codigo. Em Java, variaveis declaradas dentro de um metodo sao **locais** — elas existem apenas dentro daquele metodo.\n\nRegras importantes:\n- Variaveis **locais** existem apenas no metodo ou bloco onde foram declaradas\n- Parametros do metodo tambem sao variaveis locais\n- Dois metodos diferentes podem ter variaveis com o mesmo nome sem conflito\n- Variaveis locais nao sao inicializadas automaticamente — voce deve atribuir um valor antes de usa-las',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Escopo {\n    \n    public static void metodoA() {\n        int x = 10;  // x existe APENAS dentro de metodoA\n        System.out.println("metodoA: x = " + x);\n    }\n    \n    public static void metodoB() {\n        int x = 50;  // outro x, independente do metodoA\n        System.out.println("metodoB: x = " + x);\n    }\n    \n    public static int dobrar(int valor) {\n        int resultado = valor * 2; // resultado e local\n        return resultado;\n    }\n    \n    public static void main(String[] args) {\n        metodoA();   // metodoA: x = 10\n        metodoB();   // metodoB: x = 50\n        \n        int r = dobrar(7);\n        System.out.println("Dobro de 7: " + r);  // 14\n        // System.out.println(resultado); // ERRO! resultado nao existe aqui\n    }\n}',
        filename: 'Escopo.java',
        description: 'Cada metodo tem seu proprio escopo de variaveis.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Tentar acessar uma variavel fora do seu escopo causa um **erro de compilacao**. Variaveis declaradas dentro de um metodo nao sao visiveis em outros metodos.',
    },
    {
      type: 'text',
      content:
        '## Sobrecarga de Metodos (Overloading)\n\nJava permite criar **varios metodos com o mesmo nome**, desde que tenham **parametros diferentes** (em quantidade ou tipo). Isso e chamado de **sobrecarga de metodos** (method overloading).\n\nO compilador decide qual metodo chamar com base nos argumentos passados na chamada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Sobrecarga {\n    \n    // Soma de dois inteiros\n    public static int somar(int a, int b) {\n        return a + b;\n    }\n    \n    // Soma de tres inteiros\n    public static int somar(int a, int b, int c) {\n        return a + b + c;\n    }\n    \n    // Soma de dois doubles\n    public static double somar(double a, double b) {\n        return a + b;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(somar(5, 3));           // 8 (int, int)\n        System.out.println(somar(5, 3, 2));        // 10 (int, int, int)\n        System.out.println(somar(2.5, 3.7));       // 6.2 (double, double)\n    }\n}',
        filename: 'Sobrecarga.java',
        description: 'Tres versoes do metodo somar com parametros diferentes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A sobrecarga e baseada nos **parametros**, nao no tipo de retorno. Dois metodos com o mesmo nome e mesmos parametros mas retornos diferentes causam erro de compilacao!',
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
        '## Sobrecarga de Metodos (Overloading)\n\nEm Java, voce pode ter VARIOS metodos com o mesmo nome, desde que tenham parametros diferentes. Isso se chama **sobrecarga** (overloading). O compilador escolhe qual versao chamar com base nos argumentos fornecidos:\n\n- Mesmos nome, parametros DIFERENTES (numero ou tipo)\n- O tipo de retorno nao diferencia os metodos\n- Muito usado para funcoes que fazem a mesma coisa com tipos diferentes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'Sobrecarga.java',
        code: `public class Sobrecarga {

    // Versao 1: somar dois inteiros
    static int somar(int a, int b) {
        return a + b;
    }

    // Versao 2: somar tres inteiros
    static int somar(int a, int b, int c) {
        return a + b + c;
    }

    // Versao 3: somar dois doubles
    static double somar(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(somar(2, 3));          // 5 (versao 1)
        System.out.println(somar(2, 3, 4));        // 9 (versao 2)
        System.out.println(somar(2.5, 3.5));       // 6.0 (versao 3)

        // Java escolhe automaticamente qual versao usar!
    }
}`,
        description: 'Sobrecarga: mesmo nome, parametros diferentes. Java escolhe a versao correta automaticamente.',
      },
    },
    {
      type: 'text',
      content:
        '## Metodos estaticos vs de instancia\n\nExistem dois tipos de metodos em Java:\n\n**Metodos estaticos (`static`)** — pertencem a CLASSE, nao ao objeto. Chamados diretamente: `NomeDaClasse.metodo()`. Use quando o metodo nao precisa de dados do objeto.\n\n**Metodos de instancia** (sem static) — pertencem ao OBJETO. Precisam de um objeto criado para ser chamados: `objeto.metodo()`. Podem acessar os atributos do objeto via `this`.\n\nOs metodos `main` e `static` porque o Java os chama sem criar um objeto primeiro.',
    },
  ],
  challenges: [
    {
      id: 'mj-c1',
      title: 'Metodo ehPar',
      description:
        'Crie um metodo chamado ehPar que recebe um numero inteiro e retorna true se for par ou false se for impar. No main, teste o metodo com pelo menos 3 numeros diferentes e imprima os resultados.',
      language: 'java',
      starterCode:
        'public class VerificaPar {\n    \n    // Crie o metodo ehPar(int numero) que retorna boolean\n    \n    public static void main(String[] args) {\n        // Teste o metodo com pelo menos 3 numeros\n        \n    }\n}',
      solution:
        'public class VerificaPar {\n    \n    public static boolean ehPar(int numero) {\n        return numero % 2 == 0;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println("4 e par? " + ehPar(4));    // true\n        System.out.println("7 e par? " + ehPar(7));    // false\n        System.out.println("0 e par? " + ehPar(0));    // true\n        System.out.println("13 e par? " + ehPar(13));  // false\n    }\n}',
      hints: [
        'Um numero e par quando o resto da divisao por 2 e zero: numero % 2 == 0.',
        'O metodo deve retornar boolean (true ou false).',
        'Nao esqueca de declarar o metodo como public static.',
      ],
    },
    {
      id: 'mj-c2',
      title: 'Fatorial',
      description:
        'Crie um metodo chamado fatorial que recebe um inteiro n e retorna o fatorial dele (n!). O fatorial de 5 e 5*4*3*2*1 = 120. O fatorial de 0 e 1. Use um laco for dentro do metodo.',
      language: 'java',
      starterCode:
        'public class Fatorial {\n    \n    // Crie o metodo fatorial(int n) que retorna long\n    \n    public static void main(String[] args) {\n        System.out.println("0! = " + fatorial(0));\n        System.out.println("5! = " + fatorial(5));\n        System.out.println("10! = " + fatorial(10));\n    }\n}',
      solution:
        'public class Fatorial {\n    \n    public static long fatorial(int n) {\n        long resultado = 1;\n        for (int i = 2; i <= n; i++) {\n            resultado *= i;\n        }\n        return resultado;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println("0! = " + fatorial(0));   // 1\n        System.out.println("5! = " + fatorial(5));   // 120\n        System.out.println("10! = " + fatorial(10)); // 3628800\n    }\n}',
      hints: [
        'Inicie resultado com 1 (pois 0! = 1 e o laco nao executa para n=0).',
        'Use um for de 2 ate n, multiplicando resultado por i a cada iteracao.',
        'Use o tipo long para suportar valores maiores que int.',
      ],
    },
    {
      id: 'mj-c3',
      title: 'Calculadora com Overloading',
      description:
        'Crie um metodo chamado calcular com 3 versoes sobrecarregadas: (1) calcular(int a, int b) retorna a soma dos dois, (2) calcular(int a, int b, int c) retorna a soma dos tres, (3) calcular(double a, double b) retorna a soma dos dois doubles. Teste todas no main.',
      language: 'java',
      starterCode:
        'public class Calculadora {\n    \n    // Crie as 3 versoes sobrecarregadas do metodo calcular\n    \n    public static void main(String[] args) {\n        System.out.println("Soma int: " + calcular(10, 20));\n        System.out.println("Soma 3 int: " + calcular(10, 20, 30));\n        System.out.println("Soma double: " + calcular(3.14, 2.86));\n    }\n}',
      solution:
        'public class Calculadora {\n    \n    public static int calcular(int a, int b) {\n        return a + b;\n    }\n    \n    public static int calcular(int a, int b, int c) {\n        return a + b + c;\n    }\n    \n    public static double calcular(double a, double b) {\n        return a + b;\n    }\n    \n    public static void main(String[] args) {\n        System.out.println("Soma int: " + calcular(10, 20));        // 30\n        System.out.println("Soma 3 int: " + calcular(10, 20, 30));  // 60\n        System.out.println("Soma double: " + calcular(3.14, 2.86)); // 6.0\n    }\n}',
      hints: [
        'Cada versao do metodo deve ter parametros diferentes em quantidade ou tipo.',
        'A versao com dois int retorna int, a versao com dois double retorna double.',
        'O Java escolhe automaticamente a versao correta com base nos argumentos.',
      ],
    },
  ],
};
