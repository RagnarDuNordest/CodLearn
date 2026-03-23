import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-e-tipos-java',
  moduleId: 'java',
  title: 'Variaveis e Tipos de Dados',
  description:
    'Aprenda sobre os tipos primitivos do Java, como declarar variaveis, usar constantes com final, fazer casting e trabalhar com Strings.',
  order: 1,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Em Java, declarar uma variavel e como reservar uma gaveta especifica: voce precisa dizer o tamanho (tipo) antes de guardar algo dentro!\n\n## Variaveis em Java\n\nEm Java, uma **variavel** e um espaco na memoria do computador que armazena um valor. Diferente de Python, Java e uma linguagem de **tipagem estatica** — isso significa que voce **precisa declarar o tipo** da variavel antes de usa-la.\n\nA sintaxe basica e:\n\n```\ntipo nomeVariavel = valor;\n```\n\nUma vez declarado o tipo, a variavel so pode armazenar valores daquele tipo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Variaveis {\n    public static void main(String[] args) {\n        int idade = 25;\n        double altura = 1.75;\n        float peso = 70.5f;\n        char inicial = \'R\';\n        boolean estudante = true;\n        String nome = "Raphael";\n        long populacaoMundial = 8000000000L;\n\n        System.out.println("Nome: " + nome);\n        System.out.println("Idade: " + idade);\n        System.out.println("Altura: " + altura);\n        System.out.println("Peso: " + peso);\n        System.out.println("Inicial: " + inicial);\n        System.out.println("Estudante: " + estudante);\n        System.out.println("Populacao: " + populacaoMundial);\n    }\n}',
        filename: 'Variaveis.java',
        description: 'Declarando variaveis dos tipos mais comuns em Java.',
      },
    },
    {
      type: 'text',
      content:
        '## Tipos Primitivos do Java\n\nJava possui **8 tipos primitivos** que sao os blocos fundamentais de dados:\n\n| Tipo | Tamanho | Descricao | Exemplo |\n|------|---------|-----------|----------|\n| `byte` | 1 byte | Inteiro de -128 a 127 | `byte b = 100;` |\n| `short` | 2 bytes | Inteiro de -32.768 a 32.767 | `short s = 1000;` |\n| `int` | 4 bytes | Inteiro de ~-2 bilhoes a ~2 bilhoes | `int i = 42;` |\n| `long` | 8 bytes | Inteiro muito grande | `long l = 99999L;` |\n| `float` | 4 bytes | Decimal com precisao simples | `float f = 3.14f;` |\n| `double` | 8 bytes | Decimal com precisao dupla | `double d = 3.14;` |\n| `char` | 2 bytes | Um unico caractere Unicode | `char c = \'A\';` |\n| `boolean` | 1 bit | Verdadeiro ou falso | `boolean b = true;` |\n\nAlem dos primitivos, temos a classe **String** para textos (note o S maiusculo — String e uma classe, nao um tipo primitivo).',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Para o dia a dia, voce usara principalmente: **int** para numeros inteiros, **double** para numeros decimais, **boolean** para verdadeiro/falso e **String** para textos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class TiposPrimitivos {\n    public static void main(String[] args) {\n        // Numeros inteiros\n        byte numeroPequeno = 127;\n        short numeroMedio = 32000;\n        int numeroNormal = 2000000;\n        long numeroGrande = 9999999999L;\n\n        // Numeros decimais\n        float pi = 3.14f;\n        double piPreciso = 3.14159265358979;\n\n        // Caractere e booleano\n        char letra = \'J\';\n        boolean javaELegal = true;\n\n        // String (classe, nao primitivo)\n        String linguagem = "Java";\n\n        System.out.println("long: " + numeroGrande);\n        System.out.println("float: " + pi);\n        System.out.println("double: " + piPreciso);\n        System.out.println("char: " + letra);\n        System.out.println("boolean: " + javaELegal);\n        System.out.println("String: " + linguagem);\n    }\n}',
        filename: 'TiposPrimitivos.java',
        description: 'Exemplos de todos os tipos primitivos e String em Java.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Valores do tipo **long** devem terminar com `L` (ex: `99999L`) e valores **float** devem terminar com `f` (ex: `3.14f`). Sem esses sufixos, o compilador pode gerar erros!',
    },
    {
      type: 'text',
      content:
        '## Constantes com final\n\nEm Java, usamos a palavra-chave **final** para declarar constantes — variaveis cujo valor **nao pode ser alterado** depois de atribuido. Por convencao, nomes de constantes sao escritos em **LETRAS_MAIUSCULAS** separadas por underline.\n\nTentar alterar o valor de uma constante gera um erro de compilacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Constantes {\n    public static void main(String[] args) {\n        final double PI = 3.14159265;\n        final int MAIORIDADE = 18;\n        final String PAIS = "Brasil";\n\n        System.out.println("PI: " + PI);\n        System.out.println("Maioridade: " + MAIORIDADE);\n        System.out.println("Pais: " + PAIS);\n\n        // PI = 3.14;  // ERRO! Nao pode alterar uma constante\n    }\n}',
        filename: 'Constantes.java',
        description: 'Usando final para criar constantes em Java.',
      },
    },
    {
      type: 'text',
      content:
        '## Casting (Conversao de Tipos)\n\nAs vezes voce precisa converter um tipo em outro. Em Java, existem dois tipos de casting:\n\n- **Casting implicito (widening):** Ocorre automaticamente quando nao ha perda de dados. Vai do menor para o maior tipo.\n  `byte -> short -> int -> long -> float -> double`\n\n- **Casting explicito (narrowing):** Precisa ser feito manualmente quando pode haver perda de dados. Vai do maior para o menor tipo.\n  `double -> float -> long -> int -> short -> byte`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Casting {\n    public static void main(String[] args) {\n        // Casting implicito (automatico)\n        int meuInt = 100;\n        double meuDouble = meuInt;\n        System.out.println("int para double: " + meuDouble);\n\n        // Casting explicito (manual)\n        double nota = 9.7;\n        int notaInteira = (int) nota;\n        System.out.println("double para int: " + notaInteira);\n\n        // Convertendo String para numero\n        String idadeTexto = "25";\n        int idade = Integer.parseInt(idadeTexto);\n        double altura = Double.parseDouble("1.75");\n\n        System.out.println("Idade: " + idade);\n        System.out.println("Altura: " + altura);\n    }\n}',
        filename: 'Casting.java',
        description: 'Exemplos de casting implicito, explicito e conversao de String.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Para converter String em numero, use **Integer.parseInt()** para inteiros e **Double.parseDouble()** para decimais. Para converter numero em String, use **String.valueOf()** ou concatene com uma string vazia: `"" + numero`.',
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
        '## Trabalhando com Strings\n\nEm Java, **String** e uma classe (nao um tipo primitivo), o que significa que ela possui **metodos** uteis para manipular texto. Os mais importantes sao:\n\n- **`.length()`** — Retorna o numero de caracteres\n- **`.toUpperCase()`** / **`.toLowerCase()`** — Converte para maiusculas/minusculas\n- **`.charAt(indice)`** — Retorna o caractere na posicao especificada\n- **`.contains("texto")`** — Verifica se contem uma substring\n- **`.startsWith("...")`** / **`.endsWith("...")`** — Verifica inicio/fim\n- **`.replace(antigo, novo)`** — Substitui texto\n- **`.trim()`** — Remove espacos do inicio e fim\n- **`.substring(inicio, fim)`** — Extrai parte da string',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'MetodosString.java',
        code: 'public class MetodosString {\n    public static void main(String[] args) {\n        String nome = "  Raphael  ";\n        String email = "usuario@gmail.com";\n\n        // Remover espacos\n        System.out.println(nome.trim()); // "Raphael"\n\n        // Tamanho e transformacoes\n        String limpo = nome.trim();\n        System.out.println("Tamanho: " + limpo.length());\n        System.out.println("Maiusculas: " + limpo.toUpperCase());\n        System.out.println("Minusculas: " + limpo.toLowerCase());\n\n        // Verificacoes\n        System.out.println("Contem gmail: " + email.contains("gmail"));\n        System.out.println("Termina com .com: " + email.endsWith(".com"));\n\n        // Extrair parte da string\n        String dominio = email.substring(email.indexOf("@") + 1);\n        System.out.println("Dominio: " + dominio); // gmail.com\n\n        // IMPORTANTE: comparar Strings com .equals(), nao com ==\n        String a = "Java";\n        String b = "Java";\n        System.out.println(a.equals(b));            // true (correto!)\n        System.out.println(a.equalsIgnoreCase(b));  // true (ignora maiusculas)\n    }\n}',
        description:
          'Metodos da classe String para manipular texto. Use .equals() para comparar, nao ==.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        '**Nunca use `==` para comparar Strings!** O `==` verifica se sao o mesmo objeto na memoria, nao se tem o mesmo conteudo. Use sempre **`.equals()`** para comparar o valor de duas Strings. Exemplo: `"Java".equals(outraVariavel)` — coloque a constante primeiro para evitar NullPointerException.',
    },
  ],
  challenges: [
    {
      id: 'vtj-c1',
      title: 'Ficha de Cadastro',
      description:
        'Declare variaveis para armazenar: nome (String), idade (int), altura (double), inicial do nome (char) e se e estudante (boolean). Imprima todas as informacoes.',
      language: 'java',
      starterCode:
        'public class Cadastro {\n    public static void main(String[] args) {\n        // Declare as variaveis aqui\n\n\n        // Imprima todas as informacoes\n\n    }\n}',
      solution:
        'public class Cadastro {\n    public static void main(String[] args) {\n        String nome = "Raphael";\n        int idade = 20;\n        double altura = 1.75;\n        char inicial = \'R\';\n        boolean estudante = true;\n\n        System.out.println("Nome: " + nome);\n        System.out.println("Idade: " + idade);\n        System.out.println("Altura: " + altura + "m");\n        System.out.println("Inicial: " + inicial);\n        System.out.println("Estudante: " + estudante);\n    }\n}',
      hints: [
        'Use String para nome, int para idade, double para altura, char para inicial e boolean para estudante.',
        'O operador + concatena texto com valores de variaveis.',
        'Valores char usam aspas simples: \'R\'. Strings usam aspas duplas: "texto".',
      ],
    },
    {
      id: 'vtj-c2',
      title: 'Constantes do Sistema Solar',
      description:
        'Declare constantes usando final para: velocidade da luz (int, 300000 km/s), PI (double, 3.14159265) e nome do planeta (String, "Terra"). Imprima todas as constantes formatadas.',
      language: 'java',
      starterCode:
        'public class ConstantesSolares {\n    public static void main(String[] args) {\n        // Declare as constantes com final\n\n\n        // Imprima as constantes\n\n    }\n}',
      solution:
        'public class ConstantesSolares {\n    public static void main(String[] args) {\n        final int VELOCIDADE_LUZ = 300000;\n        final double PI = 3.14159265;\n        final String PLANETA = "Terra";\n\n        System.out.println("Velocidade da luz: " + VELOCIDADE_LUZ + " km/s");\n        System.out.println("PI: " + PI);\n        System.out.println("Planeta: " + PLANETA);\n    }\n}',
      hints: [
        'Use a palavra-chave final antes do tipo para declarar uma constante.',
        'Por convencao, nomes de constantes usam LETRAS_MAIUSCULAS.',
        'Constantes com final nao podem ter seu valor alterado depois.',
      ],
    },
    {
      id: 'vtj-c3',
      title: 'Casting na Pratica',
      description:
        'Converta a String "150" para int, some 50, converta o resultado para double e imprima. Depois, converta 9.99 para int e imprima o valor truncado.',
      language: 'java',
      starterCode:
        'public class CastingPratica {\n    public static void main(String[] args) {\n        String valorTexto = "150";\n\n        // Converta valorTexto para int e some 50\n\n        // Converta o resultado para double e imprima\n\n        // Converta 9.99 para int e imprima\n\n    }\n}',
      solution:
        'public class CastingPratica {\n    public static void main(String[] args) {\n        String valorTexto = "150";\n\n        int valorInt = Integer.parseInt(valorTexto) + 50;\n        double valorDouble = (double) valorInt;\n        System.out.println("Valor double: " + valorDouble);\n\n        double preco = 9.99;\n        int precoTruncado = (int) preco;\n        System.out.println("Preco truncado: " + precoTruncado);\n    }\n}',
      hints: [
        'Use Integer.parseInt() para converter String em int.',
        'O casting de int para double e implicito, mas voce pode usar (double) para ser explicito.',
        'O casting de double para int trunca a parte decimal.',
      ],
    },
  ],
};
