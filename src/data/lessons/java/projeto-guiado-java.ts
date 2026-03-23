import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-java',
  moduleId: 'java',
  title: 'Projeto: Calculadora OOP em Java',
  description:
    'Construa uma calculadora orientada a objetos em Java — o padrão de código usado em sistemas corporativos e aplicativos Android.',
  order: 8,
  estimatedMinutes: 40,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-java',
    title: 'Calculadora com Classe e Métodos',
    language: 'java',
    scenario:
      'Você foi contratado como desenvolvedor Java júnior. Sua primeira tarefa é criar uma classe Calculadora reutilizável, seguindo boas práticas de OOP, que será usada em um sistema bancário.',
    objective:
      'Criar a classe Calculadora com métodos estáticos para as 4 operações e um método main que a demonstra.',
    steps: [
      {
        id: 'gp-java-s1',
        title: 'Criar a classe e método somar',
        description:
          'Crie a classe Calculadora com um método estático somar(double a, double b) que retorna a soma. No main, teste com dois valores e exiba o resultado.',
        starterCode:
          'public class Calculadora {\n\n    public static double somar(double a, double b) {\n        // Retorne a + b\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        double a = 15.5, b = 4.5;\n        System.out.println("Soma: " + somar(a, b));\n    }\n}\n',
        solution:
          'public class Calculadora {\n\n    public static double somar(double a, double b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        double a = 15.5, b = 4.5;\n        System.out.println("Soma: " + somar(a, b));\n    }\n}',
        hints: [
          'public static double somar(double a, double b) { return a + b; }',
          'System.out.println("Soma: " + somar(a, b)) imprime o resultado.',
        ],
        testCases: [
          { description: 'somar(15.5, 4.5) → Soma: 20.0', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-java-s2',
        title: 'Adicionar as demais operações',
        description:
          'Adicione subtrair, multiplicar e dividir (com verificação de divisão por zero). Exiba todos os resultados no main.',
        starterCode:
          'public class Calculadora {\n\n    public static double somar(double a, double b) { return a + b; }\n\n    public static double subtrair(double a, double b) {\n        // Retorne a - b\n        return 0;\n    }\n\n    public static double multiplicar(double a, double b) {\n        // Retorne a * b\n        return 0;\n    }\n\n    public static double dividir(double a, double b) {\n        // Se b == 0, retorne 0\n        // Caso contrario, retorne a / b\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        double a = 15.5, b = 4.5;\n        System.out.println("Soma: " + somar(a, b));\n        System.out.println("Subtracao: " + subtrair(a, b));\n        System.out.println("Multiplicacao: " + multiplicar(a, b));\n        System.out.println("Divisao: " + dividir(a, b));\n    }\n}\n',
        solution:
          'public class Calculadora {\n\n    public static double somar(double a, double b) { return a + b; }\n    public static double subtrair(double a, double b) { return a - b; }\n    public static double multiplicar(double a, double b) { return a * b; }\n    public static double dividir(double a, double b) {\n        if (b == 0) return 0;\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        double a = 15.5, b = 4.5;\n        System.out.println("Soma: " + somar(a, b));\n        System.out.println("Subtracao: " + subtrair(a, b));\n        System.out.println("Multiplicacao: " + multiplicar(a, b));\n        System.out.println("Divisao: " + dividir(a, b));\n    }\n}',
        hints: [
          'Cada método segue o padrão: public static double nome(double a, double b) { return ...; }',
          'Para dividir: if (b == 0) return 0; return a / b;',
        ],
        testCases: [
          { description: 'a=15.5, b=4.5 → Soma 20.0, Sub 11.0, Mult 69.75, Div 3.44...', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-java-s3',
        title: 'Adicionar histórico de operações',
        description:
          'Transforme Calculadora em uma classe instanciável (sem static nos métodos de cálculo). Adicione um ArrayList<String> historico que guarda cada operação realizada. Exiba o histórico no final.',
        starterCode:
          'import java.util.ArrayList;\n\npublic class Calculadora {\n    private ArrayList<String> historico = new ArrayList<>();\n\n    public double somar(double a, double b) {\n        double resultado = a + b;\n        historico.add(a + " + " + b + " = " + resultado);\n        return resultado;\n    }\n\n    // Implemente subtrair, multiplicar e dividir\n    // Cada um deve adicionar ao historico\n\n    public void exibirHistorico() {\n        System.out.println("Historico:");\n        for (String op : historico) {\n            System.out.println("  " + op);\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculadora calc = new Calculadora();\n        calc.somar(10, 5);\n        calc.subtrair(10, 3);\n        calc.multiplicar(4, 6);\n        calc.exibirHistorico();\n    }\n}\n',
        solution:
          'import java.util.ArrayList;\n\npublic class Calculadora {\n    private ArrayList<String> historico = new ArrayList<>();\n\n    public double somar(double a, double b) {\n        double r = a + b;\n        historico.add(a + " + " + b + " = " + r);\n        return r;\n    }\n    public double subtrair(double a, double b) {\n        double r = a - b;\n        historico.add(a + " - " + b + " = " + r);\n        return r;\n    }\n    public double multiplicar(double a, double b) {\n        double r = a * b;\n        historico.add(a + " * " + b + " = " + r);\n        return r;\n    }\n\n    public void exibirHistorico() {\n        System.out.println("Historico:");\n        for (String op : historico) {\n            System.out.println("  " + op);\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculadora calc = new Calculadora();\n        calc.somar(10, 5);\n        calc.subtrair(10, 3);\n        calc.multiplicar(4, 6);\n        calc.exibirHistorico();\n    }\n}',
        hints: [
          'historico.add("...") adiciona uma string à lista.',
          'for (String op : historico) percorre todos os itens.',
        ],
        testCases: [
          { description: 'Histórico exibe as 3 operações realizadas', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
