import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'primeiro-programa-java',
  moduleId: 'java',
  title: 'Seu Primeiro Programa em Java',
  description:
    'Aprenda a escrever, compilar e executar seu primeiro programa Java com o famoso Hello World.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Java e como uma versao mais organizada do C: tudo precisa estar dentro de uma classe. Pode parecer muita coisa no inicio, mas a estrutura se repete em todo programa!\n\n## Bem-vindo ao Java!\n\nJava e uma das linguagens de programacao mais populares do mundo. Criada em 1995 por James Gosling na Sun Microsystems, ela e usada em aplicacoes web, mobile (Android), sistemas bancarios, jogos e muito mais.\n\nO grande diferencial do Java e o conceito **\"Write Once, Run Anywhere\"** (Escreva uma vez, execute em qualquer lugar). O codigo Java e compilado para **bytecode**, que roda em qualquer sistema operacional com a **JVM** (Java Virtual Machine) instalada.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Para programar em Java, voce precisa instalar o **JDK** (Java Development Kit), que inclui o compilador `javac` e a JVM. Baixe a versao mais recente no site oficial da Oracle ou use o OpenJDK.',
    },
    {
      type: 'text',
      content:
        '## Estrutura Basica de um Programa Java\n\nTodo programa Java precisa de uma **classe** e um **metodo main**. A classe e como um container que organiza seu codigo, e o metodo main e o ponto de entrada — e por onde o programa comeca a executar.\n\nVamos entender cada parte:\n\n- **public class NomeDaClasse** — Declara uma classe publica. O nome da classe deve ser identico ao nome do arquivo.\n- **public static void main(String[] args)** — O metodo principal que a JVM procura para iniciar a execucao.\n- **System.out.println()** — Comando para imprimir texto no console com quebra de linha.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class OlaMundo {\n    public static void main(String[] args) {\n        System.out.println("Ola, Mundo!");\n        System.out.println("Bem-vindo ao Java!");\n    }\n}',
        filename: 'OlaMundo.java',
        description: 'O classico Hello World em Java — seu primeiro programa!',
      },
    },
    {
      type: 'text',
      content:
        '## Compilando e Executando\n\nDiferente de linguagens interpretadas como Python, Java e uma linguagem **compilada**. O processo tem duas etapas:\n\n1. **Compilar** com `javac`: transforma o codigo `.java` em bytecode `.class`\n2. **Executar** com `java`: a JVM interpreta o bytecode e roda o programa\n\nNo terminal, voce faria:\n\n```\njavac OlaMundo.java\njava OlaMundo\n```\n\nO primeiro comando gera o arquivo `OlaMundo.class` e o segundo executa o programa.',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'O nome do arquivo `.java` **deve ser identico** ao nome da classe publica dentro dele. Se a classe se chama `OlaMundo`, o arquivo deve ser `OlaMundo.java`. Caso contrario, o compilador vai gerar um erro!',
    },
    {
      type: 'text',
      content:
        '## System.out.println vs System.out.print\n\nJava oferece duas formas principais de imprimir texto:\n\n- **System.out.println()** — Imprime o texto e pula para a proxima linha\n- **System.out.print()** — Imprime o texto e **nao** pula de linha\n\nVoce tambem pode usar **System.out.printf()** para formatacao avancada, similar ao printf da linguagem C.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Impressao {\n    public static void main(String[] args) {\n        System.out.println("Linha 1");\n        System.out.println("Linha 2");\n\n        System.out.print("Mesmo ");\n        System.out.print("linha! ");\n        System.out.println();\n\n        String nome = "Maria";\n        int idade = 25;\n        System.out.printf("Nome: %s, Idade: %d%n", nome, idade);\n    }\n}',
        filename: 'Impressao.java',
        description: 'Diferentes formas de imprimir texto no console Java.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Toda instrucao em Java termina com **ponto e virgula** (`;`). Esquecer o `;` e um dos erros mais comuns para iniciantes. Fique atento!',
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
      id: 'ppj-c1',
      title: 'Apresentacao Pessoal',
      description:
        'Crie um programa Java que imprima seu nome, sua cidade e sua linguagem de programacao favorita, cada um em uma linha separada usando System.out.println().',
      language: 'java',
      starterCode:
        'public class Apresentacao {\n    public static void main(String[] args) {\n        // Imprima seu nome\n\n        // Imprima sua cidade\n\n        // Imprima sua linguagem favorita\n\n    }\n}',
      solution:
        'public class Apresentacao {\n    public static void main(String[] args) {\n        System.out.println("Nome: Raphael");\n        System.out.println("Cidade: Sao Paulo");\n        System.out.println("Linguagem favorita: Java");\n    }\n}',
      hints: [
        'Use System.out.println() para imprimir cada informacao em uma linha separada.',
        'Lembre-se de colocar o texto entre aspas duplas.',
        'Cada instrucao deve terminar com ponto e virgula (;).',
      ],
    },
    {
      id: 'ppj-c2',
      title: 'Cartao de Visita Formatado',
      description:
        'Use System.out.printf() para imprimir um cartao de visita formatado com nome, profissao e telefone. Use %s para strings e %n para quebra de linha.',
      language: 'java',
      starterCode:
        'public class CartaoVisita {\n    public static void main(String[] args) {\n        String nome = "Ana Silva";\n        String profissao = "Desenvolvedora";\n        String telefone = "(11) 99999-0000";\n\n        // Use System.out.printf() para formatar a saida\n\n    }\n}',
      solution:
        'public class CartaoVisita {\n    public static void main(String[] args) {\n        String nome = "Ana Silva";\n        String profissao = "Desenvolvedora";\n        String telefone = "(11) 99999-0000";\n\n        System.out.printf("====================%n");\n        System.out.printf("Nome: %s%n", nome);\n        System.out.printf("Profissao: %s%n", profissao);\n        System.out.printf("Telefone: %s%n", telefone);\n        System.out.printf("====================%n");\n    }\n}',
      hints: [
        'System.out.printf() usa %s para inserir strings e %n para quebra de linha.',
        'O primeiro argumento de printf e a string de formato, os seguintes sao os valores.',
        'Voce pode adicionar decoracao com caracteres como = ou - para deixar bonito.',
      ],
    },
  ],
};
