import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'condicionais-java',
  moduleId: 'java',
  title: 'Condicionais em Java',
  description:
    'Aprenda a tomar decisoes no seu codigo usando if/else, switch/case e o operador ternario em Java.',
  order: 3,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content:
        'Toda decisao que voce toma e uma condicional: \"Se estiver frio, coloco casaco. Senao, vou de camiseta.\" Em Java, escrevemos essas decisoes com if, else if e else!\n\n## Tomando Decisoes no Codigo\n\nNa programacao, frequentemente precisamos que o programa **tome decisoes** com base em condicoes. Por exemplo: se o usuario tem 18 anos ou mais, pode se cadastrar; caso contrario, exibir uma mensagem de erro.\n\nEm Java, temos tres estruturas condicionais principais:\n\n- **if / else if / else** — para verificacoes com expressoes booleanas\n- **switch / case** — para comparar uma variavel com varios valores possiveis\n- **Operador ternario ? :** — um atalho para if/else simples',
    },
    {
      type: 'text',
      content:
        '## if, else if e else\n\nA estrutura basica de decisao em Java. A condicao entre parenteses deve resultar em um valor **boolean** (true ou false):\n\n- **if** — Executa o bloco se a condicao for verdadeira\n- **else if** — Verifica outra condicao se a anterior foi falsa\n- **else** — Executa se nenhuma condicao anterior foi verdadeira\n\nAs **chaves {}** delimitam os blocos de codigo. A indentacao e apenas visual, mas e muito importante para legibilidade.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Condicionais {\n    public static void main(String[] args) {\n        int nota = 75;\n\n        if (nota >= 90) {\n            System.out.println("Conceito: A - Excelente!");\n        } else if (nota >= 70) {\n            System.out.println("Conceito: B - Bom!");\n        } else if (nota >= 50) {\n            System.out.println("Conceito: C - Regular");\n        } else {\n            System.out.println("Conceito: D - Reprovado");\n        }\n    }\n}',
        filename: 'Condicionais.java',
        description: 'Sistema de notas usando if/else if/else. A saida sera "Conceito: B - Bom!".',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'As **chaves** {} sao opcionais quando o bloco tem apenas uma instrucao, mas e uma boa pratica **sempre usa-las** para evitar bugs e deixar o codigo mais legivel.',
    },
    {
      type: 'text',
      content:
        '## switch / case\n\nO switch e ideal quando voce precisa comparar uma variavel com **varios valores fixos**. E mais limpo que varias verificacoes if/else if consecutivas.\n\nPontos importantes:\n- Cada **case** termina com **break** para evitar a execucao dos proximos cases\n- O **default** e executado quando nenhum case corresponde\n- O switch funciona com: int, char, String, byte, short e enum',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class SwitchCase {\n    public static void main(String[] args) {\n        int diaSemana = 3;\n\n        switch (diaSemana) {\n            case 1:\n                System.out.println("Domingo");\n                break;\n            case 2:\n                System.out.println("Segunda-feira");\n                break;\n            case 3:\n                System.out.println("Terca-feira");\n                break;\n            case 4:\n                System.out.println("Quarta-feira");\n                break;\n            case 5:\n                System.out.println("Quinta-feira");\n                break;\n            case 6:\n                System.out.println("Sexta-feira");\n                break;\n            case 7:\n                System.out.println("Sabado");\n                break;\n            default:\n                System.out.println("Dia invalido!");\n                break;\n        }\n    }\n}',
        filename: 'SwitchCase.java',
        description: 'Usando switch/case para determinar o dia da semana. A saida sera "Terca-feira".',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Se voce esquecer o **break** em um case, a execucao **continua** para o proximo case (fenomeno chamado "fall-through"). Isso pode causar bugs inesperados!',
    },
    {
      type: 'text',
      content:
        '## Operador Ternario\n\nO operador ternario e um atalho para expressoes **if/else simples**. Ele tem a seguinte sintaxe:\n\n```\nvariavel = (condicao) ? valorSeVerdadeiro : valorSeFalso;\n```\n\nE muito util para atribuicoes condicionais rapidas, mas deve ser usado apenas para expressoes simples. Para logica mais complexa, prefira if/else.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Ternario {\n    public static void main(String[] args) {\n        int idade = 20;\n\n        // Com if/else\n        String status1;\n        if (idade >= 18) {\n            status1 = "Maior de idade";\n        } else {\n            status1 = "Menor de idade";\n        }\n\n        // Com operador ternario (mesmo resultado)\n        String status2 = (idade >= 18) ? "Maior de idade" : "Menor de idade";\n\n        System.out.println(status1);\n        System.out.println(status2);\n\n        // Outro exemplo: numero par ou impar\n        int numero = 7;\n        String paridade = (numero % 2 == 0) ? "Par" : "Impar";\n        System.out.println(numero + " e " + paridade);\n    }\n}',
        filename: 'Ternario.java',
        description: 'Comparando if/else com o operador ternario para o mesmo resultado.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Use o operador ternario para expressoes simples com apenas duas opcoes. Para logica mais complexa com varias condicoes, prefira **if/else if/else** para manter a legibilidade do codigo.',
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
        '## Switch — Quando há muitos casos\n\nQuando você tem muitas condições sobre o MESMO valor, o `switch` é mais legível que vários `else if`. Cada `case` compara o valor, e o `break` impede que o código continue para o próximo caso:\n\n- **`case valor:`** — testa se a variável é igual a "valor"\n- **`break;`** — obrigatório para sair do switch (sem ele, cai no próximo case)\n- **`default:`** — executado se nenhum case corresponder (equivalente ao else final)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'Switch.java',
        code: `public class Switch {
    public static void main(String[] args) {
        int diaDaSemana = 3;
        String nome;

        switch (diaDaSemana) {
            case 1:
                nome = "Segunda-feira";
                break;
            case 2:
                nome = "Terca-feira";
                break;
            case 3:
                nome = "Quarta-feira";
                break;
            case 4:
                nome = "Quinta-feira";
                break;
            case 5:
                nome = "Sexta-feira";
                break;
            case 6:
            case 7:
                nome = "Fim de semana!";  // Dois cases, mesmo resultado
                break;
            default:
                nome = "Dia invalido";
        }

        System.out.println(diaDaSemana + " = " + nome);
        // 3 = Quarta-feira
    }
}`,
        description: 'switch testa o valor de uma variavel. Sempre use break! Dois cases seguidos compartilham o mesmo código.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra pratica: use if/else quando voce compara DIFERENTES variaveis ou condicoes complexas. Use switch quando voce compara UMA variavel contra MUITOS valores possiveis. Em Java moderno (14+) existe o switch expression com seta (->), mas o switch classico acima funciona em todas as versoes.',
    },
  ],
  challenges: [
    {
      id: 'cj-c1',
      title: 'Classificador de IMC',
      description:
        'Calcule o IMC (peso / altura^2) e classifique: Abaixo do peso (< 18.5), Normal (18.5 a 24.9), Sobrepeso (25 a 29.9), Obesidade (>= 30). Use if/else if/else.',
      language: 'java',
      starterCode:
        'public class ClassificadorIMC {\n    public static void main(String[] args) {\n        double peso = 70.0;\n        double altura = 1.75;\n\n        // Calcule o IMC\n\n        // Classifique usando if/else if/else\n\n    }\n}',
      solution:
        'public class ClassificadorIMC {\n    public static void main(String[] args) {\n        double peso = 70.0;\n        double altura = 1.75;\n\n        double imc = peso / (altura * altura);\n        System.out.println("IMC: " + imc);\n\n        if (imc < 18.5) {\n            System.out.println("Classificacao: Abaixo do peso");\n        } else if (imc < 25.0) {\n            System.out.println("Classificacao: Normal");\n        } else if (imc < 30.0) {\n            System.out.println("Classificacao: Sobrepeso");\n        } else {\n            System.out.println("Classificacao: Obesidade");\n        }\n    }\n}',
      hints: [
        'A formula do IMC e: peso / (altura * altura).',
        'Comece verificando a faixa menor e va subindo.',
        'Use else if para encadear as condicoes.',
      ],
    },
    {
      id: 'cj-c2',
      title: 'Calculadora com Switch',
      description:
        'Crie uma calculadora simples com dois numeros (20 e 5) e um operador char (+). Use switch/case para realizar a operacao correta e imprima o resultado. Trate divisao por zero e operador invalido com default.',
      language: 'java',
      starterCode:
        'public class CalculadoraSwitch {\n    public static void main(String[] args) {\n        double num1 = 20;\n        double num2 = 5;\n        char operador = \'+\';\n\n        // Use switch/case para realizar a operacao\n\n    }\n}',
      solution:
        'public class CalculadoraSwitch {\n    public static void main(String[] args) {\n        double num1 = 20;\n        double num2 = 5;\n        char operador = \'+\';\n\n        double resultado;\n\n        switch (operador) {\n            case \'+\':\n                resultado = num1 + num2;\n                System.out.println(num1 + " + " + num2 + " = " + resultado);\n                break;\n            case \'-\':\n                resultado = num1 - num2;\n                System.out.println(num1 + " - " + num2 + " = " + resultado);\n                break;\n            case \'*\':\n                resultado = num1 * num2;\n                System.out.println(num1 + " * " + num2 + " = " + resultado);\n                break;\n            case \'/\':\n                if (num2 != 0) {\n                    resultado = num1 / num2;\n                    System.out.println(num1 + " / " + num2 + " = " + resultado);\n                } else {\n                    System.out.println("Erro: divisao por zero!");\n                }\n                break;\n            default:\n                System.out.println("Operador invalido!");\n                break;\n        }\n    }\n}',
      hints: [
        'Use char para o operador e switch sobre ele.',
        'Nao esqueca o break em cada case.',
        'Verifique divisao por zero antes de dividir.',
      ],
    },
    {
      id: 'cj-c3',
      title: 'Classificador com Ternario',
      description:
        'Dada uma variavel numero = -7 e idade = 17, use operadores ternarios para: (1) verificar se numero e par ou impar, (2) verificar se numero e positivo, negativo ou zero, (3) verificar se e maior de idade (>= 18). Imprima todos os resultados.',
      language: 'java',
      starterCode:
        'public class TernarioPratica {\n    public static void main(String[] args) {\n        int numero = -7;\n        int idade = 17;\n\n        // Use ternario para verificar par/impar\n\n        // Use ternario para positivo/negativo/zero\n\n        // Use ternario para maior/menor de idade\n\n    }\n}',
      solution:
        'public class TernarioPratica {\n    public static void main(String[] args) {\n        int numero = -7;\n        int idade = 17;\n\n        String paridade = (numero % 2 == 0) ? "Par" : "Impar";\n        System.out.println(numero + " e " + paridade);\n\n        String sinal = (numero > 0) ? "Positivo" : (numero < 0) ? "Negativo" : "Zero";\n        System.out.println(numero + " e " + sinal);\n\n        String maioridade = (idade >= 18) ? "Maior de idade" : "Menor de idade";\n        System.out.println(idade + " anos: " + maioridade);\n    }\n}',
      hints: [
        'Para par/impar, verifique se numero % 2 == 0.',
        'Voce pode aninhar ternarios para tres opcoes: (cond1) ? val1 : (cond2) ? val2 : val3.',
        'Use >= 18 para verificar maioridade.',
      ],
    },
  ],
};
