import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'excecoes-java',
  moduleId: 'java',
  title: 'Excecoes em Java',
  description:
    'Aprenda a tratar erros e excecoes com try-catch-finally, throw, throws e como criar suas proprias excecoes personalizadas.',
  order: 8,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Imagine que voce esta cozinhando seguindo uma receita. E se acabar um ingrediente? Voce pode "jogar" o problema para alguem resolver — ou tratar o problema ali mesmo. Em Java, isso e o sistema de excecoes!\n\n## O que sao Excecoes?\n\nUma **excecao** (exception) e um evento inesperado que ocorre durante a execucao do programa e interrompe o fluxo normal. Exemplos:\n\n- Divisao por zero (`ArithmeticException`)\n- Acesso a um indice invalido de array (`ArrayIndexOutOfBoundsException`)\n- Referencia nula (`NullPointerException`)\n- Arquivo nao encontrado (`FileNotFoundException`)\n\nSem tratamento, uma excecao **encerra o programa** com uma mensagem de erro. Com tratamento, voce controla o que acontece quando o erro ocorre.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'SemTratamento.java',
        code: '// Sem tratamento: programa encerra com erro\npublic class SemTratamento {\n    public static void main(String[] args) {\n        int[] numeros = {1, 2, 3};\n        System.out.println(numeros[10]); // Indice invalido!\n        // Exception in thread "main"\n        // ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 3\n        // Programa encerra aqui!\n        System.out.println("Esta linha nunca sera executada");\n    }\n}',
        description:
          'Sem tratamento, a excecao encerra o programa abruptamente.',
      },
    },
    {
      type: 'text',
      content:
        '## try-catch: Capturando Excecoes\n\nO bloco **try-catch** permite capturar e tratar excecoes:\n\n```\ntry {\n    // Codigo que pode gerar excecao\n} catch (TipoDeExcecao e) {\n    // O que fazer quando a excecao ocorrer\n} finally {\n    // Executado SEMPRE (com ou sem excecao)\n}\n```\n\n- **`try`** — Contém o código que pode falhar\n- **`catch`** — Captura a excecao e executa o tratamento\n- **`finally`** — Executado sempre, seja com erro ou sem (útil para fechar recursos)\n- **`e.getMessage()`** — Retorna a mensagem de erro da excecao',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'TryCatch.java',
        code: 'public class TryCatch {\n    public static void main(String[] args) {\n        // Exemplo 1: divisao por zero\n        try {\n            int resultado = 10 / 0;\n            System.out.println("Resultado: " + resultado);\n        } catch (ArithmeticException e) {\n            System.out.println("Erro: " + e.getMessage()); // "/ by zero"\n        }\n\n        // Exemplo 2: acesso invalido a array\n        int[] numeros = {1, 2, 3};\n        try {\n            System.out.println(numeros[10]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("Indice invalido: " + e.getMessage());\n        } finally {\n            System.out.println("Este bloco sempre executa!");\n        }\n\n        // Exemplo 3: converter string para numero\n        try {\n            int numero = Integer.parseInt("abc"); // nao e um numero!\n        } catch (NumberFormatException e) {\n            System.out.println("Nao e um numero valido: " + e.getMessage());\n        }\n\n        // Capturar multiplas excecoes\n        try {\n            String texto = null;\n            System.out.println(texto.length()); // NullPointerException!\n        } catch (NullPointerException e) {\n            System.out.println("Referencia nula!");\n        } catch (Exception e) {\n            // Exception captura qualquer excecao (mais generica)\n            System.out.println("Erro generico: " + e.getMessage());\n        }\n    }\n}',
        description:
          'try-catch para capturar excecoes especificas, finally para codigo que sempre executa.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Coloque **excecoes mais especificas antes das mais genericas** nos blocos catch! Se voce colocar `catch (Exception e)` primeiro, ele capturara tudo e os outros catch nunca serao alcancados. `Exception` e a classe base de todas as excecoes checked.',
    },
    {
      type: 'text',
      content:
        '## throw e throws: Lancando Excecoes\n\nVoce tambem pode **lancar** excecoes manualmente com a palavra-chave **`throw`**:\n\n```java\nthrow new TipoDeExcecao("mensagem de erro");\n```\n\nQuando um metodo pode lancar uma excecao **checked** (que deve ser tratada), voce declara isso com **`throws`** na assinatura do metodo:\n\n```java\npublic void meuMetodo() throws IOException, SQLException {\n    // ...\n}\n```\n\n**Excecoes Unchecked** (herdam de `RuntimeException`): o compilador nao obriga tratar. Ex: `NullPointerException`, `ArithmeticException`.\n\n**Excecoes Checked**: o compilador OBRIGA tratar com try-catch ou declarar throws. Ex: `IOException`, `SQLException`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'LancandoExcecoes.java',
        code: 'public class LancandoExcecoes {\n    // Metodo que lanca excecao se o valor for invalido\n    public static double calcularRaiz(double numero) {\n        if (numero < 0) {\n            throw new IllegalArgumentException(\n                "Nao e possivel calcular raiz de numero negativo: " + numero\n            );\n        }\n        return Math.sqrt(numero);\n    }\n\n    public static void validarIdade(int idade) {\n        if (idade < 0 || idade > 150) {\n            throw new IllegalArgumentException(\n                "Idade invalida: " + idade\n            );\n        }\n        System.out.println("Idade valida: " + idade);\n    }\n\n    public static void main(String[] args) {\n        // Chamando metodo que pode lancar excecao\n        try {\n            System.out.println(calcularRaiz(16));  // 4.0\n            System.out.println(calcularRaiz(-4));  // lanca excecao!\n        } catch (IllegalArgumentException e) {\n            System.out.println("Erro: " + e.getMessage());\n        }\n\n        // Validando dados do usuario\n        try {\n            validarIdade(25);   // OK\n            validarIdade(-5);   // Lanca excecao\n        } catch (IllegalArgumentException e) {\n            System.out.println("Dado invalido: " + e.getMessage());\n        }\n    }\n}',
        description:
          'throw para lancar excecoes manualmente, com mensagens descritivas para facilitar o debug.',
      },
    },
    {
      type: 'text',
      content:
        '## Excecoes Personalizadas\n\nVoce pode criar suas proprias classes de excecao estendendo `Exception` (checked) ou `RuntimeException` (unchecked). Isso torna o codigo mais expressivo e os erros mais descritivos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'ExcecaoPersonalizada.java',
        code: '// Criando excecao personalizada\npublic class SaldoInsuficienteException extends RuntimeException {\n    private double saldoAtual;\n    private double valorSolicitado;\n\n    public SaldoInsuficienteException(double saldoAtual, double valorSolicitado) {\n        super("Saldo insuficiente! Disponivel: R$" + saldoAtual\n            + " | Solicitado: R$" + valorSolicitado);\n        this.saldoAtual = saldoAtual;\n        this.valorSolicitado = valorSolicitado;\n    }\n\n    public double getSaldoAtual() { return saldoAtual; }\n    public double getValorSolicitado() { return valorSolicitado; }\n}\n\n// Usando a excecao personalizada\npublic class ContaBancaria {\n    private double saldo;\n\n    public ContaBancaria(double saldoInicial) {\n        this.saldo = saldoInicial;\n    }\n\n    public void sacar(double valor) {\n        if (valor > saldo) {\n            throw new SaldoInsuficienteException(saldo, valor);\n        }\n        saldo -= valor;\n        System.out.println("Saque de R$" + valor + " realizado.");\n    }\n\n    public static void main(String[] args) {\n        ContaBancaria conta = new ContaBancaria(100.0);\n        try {\n            conta.sacar(50.0);   // OK\n            conta.sacar(200.0);  // Lanca SaldoInsuficienteException!\n        } catch (SaldoInsuficienteException e) {\n            System.out.println(e.getMessage());\n            System.out.println("Disponivel: R$" + e.getSaldoAtual());\n        }\n    }\n}',
        description:
          'Criando excecoes personalizadas estendendo RuntimeException para erros especificos do dominio.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Hierarquia de excecoes em Java: `Throwable` > `Exception` > `RuntimeException`. Excecoes que herdam de `RuntimeException` sao **unchecked** (nao obrigam try-catch). As que herdam direto de `Exception` sao **checked** e o compilador obriga voce a tratar. Para excecoes personalizadas de logica de negocio, prefira herdar de `RuntimeException`.',
    },
  ],
  challenges: [
    {
      id: 'exc-c1',
      title: 'Divisao Segura',
      description:
        'Crie um metodo chamado dividir(int a, int b) que retorna a divisao de a por b. Se b for zero, lance uma IllegalArgumentException com a mensagem "Divisor nao pode ser zero". No main, teste com divisoes validas e invalidas usando try-catch.',
      language: 'java',
      starterCode:
        'public class DivisaoSegura {\n    public static int dividir(int a, int b) {\n        // Valide se b e zero e lance excecao se for\n        // Caso contrario, retorne a divisao\n    }\n\n    public static void main(String[] args) {\n        // Teste com 10/2 (deve funcionar)\n        // Teste com 5/0 (deve lancar excecao)\n    }\n}',
      solution:
        'public class DivisaoSegura {\n    public static int dividir(int a, int b) {\n        if (b == 0) {\n            throw new IllegalArgumentException("Divisor nao pode ser zero");\n        }\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        try {\n            System.out.println(dividir(10, 2));\n            System.out.println(dividir(5, 0));\n        } catch (IllegalArgumentException e) {\n            System.out.println("Erro: " + e.getMessage());\n        }\n    }\n}',
      hints: [
        'Use throw new IllegalArgumentException("mensagem") se b == 0.',
        'O metodo retorna int normalmente se b for diferente de zero.',
        'No main, use try-catch para capturar IllegalArgumentException.',
      ],
    },
    {
      id: 'exc-c2',
      title: 'Conversor Seguro de String para Numero',
      description:
        'Crie um metodo converter(String texto) que tenta converter a string para inteiro com Integer.parseInt(). Se falhar (NumberFormatException), retorne -1 e imprima uma mensagem de aviso. Teste com "42", "abc" e "100".',
      language: 'java',
      starterCode:
        'public class ConversorSeguro {\n    public static int converter(String texto) {\n        // Tente converter com Integer.parseInt\n        // Se der NumberFormatException, retorne -1\n    }\n\n    public static void main(String[] args) {\n        System.out.println(converter("42"));\n        System.out.println(converter("abc"));\n        System.out.println(converter("100"));\n    }\n}',
      solution:
        'public class ConversorSeguro {\n    public static int converter(String texto) {\n        try {\n            return Integer.parseInt(texto);\n        } catch (NumberFormatException e) {\n            System.out.println("Aviso: \\"" + texto + "\\" nao e um numero valido.");\n            return -1;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(converter("42"));   // 42\n        System.out.println(converter("abc"));  // Aviso + -1\n        System.out.println(converter("100")); // 100\n    }\n}',
      hints: [
        'Integer.parseInt("abc") lanca NumberFormatException.',
        'Use try { return Integer.parseInt(texto); } catch (NumberFormatException e) { ... }.',
        'No catch, retorne -1 como valor sentinela indicando falha.',
      ],
    },
    {
      id: 'exc-c3',
      title: 'Sistema de Notas com Excecao Personalizada',
      description:
        'Crie uma excecao personalizada NotaInvalidaException. Crie um metodo cadastrarNota(double nota) que lanca essa excecao se a nota for menor que 0 ou maior que 10. A excecao deve guardar o valor invalido recebido. Teste no main com notas validas e invalidas.',
      language: 'java',
      starterCode:
        'class NotaInvalidaException extends RuntimeException {\n    // Guarde o valor invalido recebido\n\n    // Construtor com mensagem e valor\n}\n\npublic class SistemaNotas {\n    public static void cadastrarNota(double nota) {\n        // Lance NotaInvalidaException se nota < 0 ou > 10\n        System.out.println("Nota cadastrada: " + nota);\n    }\n\n    public static void main(String[] args) {\n        // Teste com 8.5 (valida), -1 (invalida), 11 (invalida)\n    }\n}',
      solution:
        'class NotaInvalidaException extends RuntimeException {\n    private double valorInvalido;\n\n    public NotaInvalidaException(double valorInvalido) {\n        super("Nota invalida: " + valorInvalido + ". Deve estar entre 0 e 10.");\n        this.valorInvalido = valorInvalido;\n    }\n\n    public double getValorInvalido() {\n        return valorInvalido;\n    }\n}\n\npublic class SistemaNotas {\n    public static void cadastrarNota(double nota) {\n        if (nota < 0 || nota > 10) {\n            throw new NotaInvalidaException(nota);\n        }\n        System.out.println("Nota cadastrada: " + nota);\n    }\n\n    public static void main(String[] args) {\n        try {\n            cadastrarNota(8.5);\n            cadastrarNota(-1);\n        } catch (NotaInvalidaException e) {\n            System.out.println(e.getMessage());\n        }\n\n        try {\n            cadastrarNota(11);\n        } catch (NotaInvalidaException e) {\n            System.out.println("Valor recebido: " + e.getValorInvalido());\n        }\n    }\n}',
      hints: [
        'Estenda RuntimeException no construtor chame super("mensagem descritiva").',
        'Guarde o valor invalido como atributo privado e crie um getter.',
        'Use throw new NotaInvalidaException(nota) quando nota < 0 || nota > 10.',
      ],
    },
  ],
};
