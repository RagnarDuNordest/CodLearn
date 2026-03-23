import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'classes-e-objetos-java',
  moduleId: 'java',
  title: 'Classes e Objetos em Java',
  description:
    'Aprenda os fundamentos da Programacao Orientada a Objetos: classes, objetos, construtores, atributos, metodos, encapsulamento e heranca.',
  order: 7,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Pense em uma classe como a planta de uma casa: ela define como a casa sera. O objeto e a casa construida a partir dessa planta!\n\n## Programacao Orientada a Objetos (POO)\n\nJava e uma linguagem **orientada a objetos**. Isso significa que tudo gira em torno de **classes** e **objetos**.\n\n- **Classe** — E o "molde" ou "planta" que define as caracteristicas (atributos) e comportamentos (metodos) de algo.\n- **Objeto** — E uma instancia concreta de uma classe. E criado a partir do molde.\n\nPense assim: a classe `Carro` define que todo carro tem cor, modelo e velocidade. Um objeto seria um carro especifico: um Gol vermelho a 60 km/h.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Carro {\n    // Atributos (caracteristicas)\n    String modelo;\n    String cor;\n    int ano;\n    double velocidade;\n    \n    // Metodo (comportamento)\n    public void acelerar(double incremento) {\n        velocidade += incremento;\n        System.out.println(modelo + " acelerou para " + velocidade + " km/h");\n    }\n    \n    public void frear() {\n        velocidade = 0;\n        System.out.println(modelo + " parou!");\n    }\n    \n    public void exibirInfo() {\n        System.out.println("Modelo: " + modelo);\n        System.out.println("Cor: " + cor);\n        System.out.println("Ano: " + ano);\n        System.out.println("Velocidade: " + velocidade + " km/h");\n    }\n}',
        filename: 'Carro.java',
        description: 'Definindo a classe Carro com atributos e metodos.',
      },
    },
    {
      type: 'text',
      content:
        '## Criando Objetos com new\n\nPara criar um objeto (instancia) de uma classe, usamos a palavra-chave **`new`**:\n\n```\nNomeClasse objeto = new NomeClasse();\n```\n\nDepois de criar o objeto, acessamos seus atributos e metodos usando o operador **ponto** (`.`). Cada objeto e independente — alterar os atributos de um nao afeta os outros.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class TesteCarro {\n    public static void main(String[] args) {\n        // Criando objetos\n        Carro meuCarro = new Carro();\n        meuCarro.modelo = "Gol";\n        meuCarro.cor = "Vermelho";\n        meuCarro.ano = 2023;\n        \n        Carro outroCarro = new Carro();\n        outroCarro.modelo = "Civic";\n        outroCarro.cor = "Preto";\n        outroCarro.ano = 2024;\n        \n        // Usando metodos\n        meuCarro.exibirInfo();\n        meuCarro.acelerar(80);\n        meuCarro.acelerar(20);\n        meuCarro.frear();\n        \n        System.out.println("---");\n        outroCarro.exibirInfo();\n    }\n}',
        filename: 'TesteCarro.java',
        description: 'Criando objetos da classe Carro e chamando seus metodos.',
      },
    },
    {
      type: 'text',
      content:
        '## Construtores\n\nUm **construtor** e um metodo especial chamado automaticamente quando um objeto e criado com `new`. Ele tem o **mesmo nome da classe** e nao tem tipo de retorno.\n\nConstrutores sao usados para **inicializar** os atributos do objeto no momento da criacao. Voce pode ter varios construtores (sobrecarga) — um sem parametros (padrao) e outros com parametros.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Pessoa {\n    String nome;\n    int idade;\n    String cidade;\n    \n    // Construtor padrao (sem parametros)\n    public Pessoa() {\n        nome = "Desconhecido";\n        idade = 0;\n        cidade = "Nao informada";\n    }\n    \n    // Construtor com parametros\n    public Pessoa(String nome, int idade, String cidade) {\n        this.nome = nome;     // this diferencia o atributo do parametro\n        this.idade = idade;\n        this.cidade = cidade;\n    }\n    \n    public void apresentar() {\n        System.out.println("Ola! Sou " + nome + ", tenho " + idade\n            + " anos e moro em " + cidade + ".");\n    }\n}',
        filename: 'Pessoa.java',
        description: 'Classe com construtor padrao e construtor parametrizado.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A palavra-chave **this** referencia o proprio objeto. Usamos `this.nome = nome` quando o parametro tem o mesmo nome do atributo, para distinguir entre os dois.',
    },
    {
      type: 'text',
      content:
        '## Encapsulamento (private, public, getters e setters)\n\nEncapsulamento e o principio de **esconder os detalhes internos** de uma classe e controlar o acesso aos atributos. Usamos:\n\n- **`private`** — O atributo so pode ser acessado dentro da propria classe\n- **`public`** — O atributo ou metodo pode ser acessado de qualquer lugar\n- **Getters** — Metodos publicos que retornam o valor de um atributo privado\n- **Setters** — Metodos publicos que modificam o valor de um atributo privado, podendo incluir validacoes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class ContaBancaria {\n    private String titular;\n    private double saldo;\n    \n    public ContaBancaria(String titular, double saldoInicial) {\n        this.titular = titular;\n        this.saldo = saldoInicial;\n    }\n    \n    // Getter\n    public String getTitular() {\n        return titular;\n    }\n    \n    public double getSaldo() {\n        return saldo;\n    }\n    \n    // Setter com validacao\n    public void setTitular(String titular) {\n        if (titular != null && !titular.isEmpty()) {\n            this.titular = titular;\n        }\n    }\n    \n    // Metodos com validacao\n    public void depositar(double valor) {\n        if (valor > 0) {\n            saldo += valor;\n            System.out.println("Deposito de R$" + valor + " realizado!");\n        } else {\n            System.out.println("Valor invalido para deposito!");\n        }\n    }\n    \n    public void sacar(double valor) {\n        if (valor > 0 && valor <= saldo) {\n            saldo -= valor;\n            System.out.println("Saque de R$" + valor + " realizado!");\n        } else {\n            System.out.println("Saldo insuficiente ou valor invalido!");\n        }\n    }\n}',
        filename: 'ContaBancaria.java',
        description: 'Encapsulamento com atributos privados, getters, setters e validacoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Sem encapsulamento, qualquer parte do codigo pode modificar os atributos diretamente, inclusive com valores invalidos (ex: saldo negativo). Getters e setters permitem **controlar** e **validar** essas modificacoes.',
    },
    {
      type: 'text',
      content:
        '## Heranca (extends)\n\nA **heranca** permite que uma classe **herde** atributos e metodos de outra classe. Usamos a palavra-chave **`extends`**.\n\n- **Superclasse (classe pai)** — A classe que e herdada\n- **Subclasse (classe filha)** — A classe que herda\n\nA subclasse pode adicionar novos atributos e metodos, e tambem **sobrescrever** metodos da superclasse usando `@Override`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class Animal {\n    protected String nome;\n    protected int idade;\n    \n    public Animal(String nome, int idade) {\n        this.nome = nome;\n        this.idade = idade;\n    }\n    \n    public void emitirSom() {\n        System.out.println("(som generico)");\n    }\n    \n    public void apresentar() {\n        System.out.println(nome + " tem " + idade + " anos.");\n    }\n}\n\npublic class Cachorro extends Animal {\n    private String raca;\n    \n    public Cachorro(String nome, int idade, String raca) {\n        super(nome, idade);  // Chama o construtor da superclasse\n        this.raca = raca;\n    }\n    \n    @Override  // Sobrescrevendo o metodo da superclasse\n    public void emitirSom() {\n        System.out.println(nome + " faz: Au au!");\n    }\n    \n    public void buscarBola() {\n        System.out.println(nome + " foi buscar a bola!");\n    }\n}',
        filename: 'Animal.java',
        description: 'Heranca: classe Cachorro herda de Animal e sobrescreve metodos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'A palavra-chave **super** e usada para chamar o construtor ou metodos da superclasse. O **@Override** e uma anotacao que indica que estamos sobrescrevendo um metodo herdado — nao e obrigatoria, mas e uma boa pratica.',
    },
    {
      type: 'text',
      content:
        '## Resumo dos Conceitos\n\n| Conceito | Descricao |\n|----------|----------|\n| **Classe** | Molde que define atributos e metodos |\n| **Objeto** | Instancia concreta criada com `new` |\n| **Construtor** | Metodo especial para inicializar o objeto |\n| **Encapsulamento** | Proteger atributos com `private` + getters/setters |\n| **Heranca** | Reutilizar codigo com `extends` |\n| **this** | Referencia ao proprio objeto |\n| **super** | Referencia a superclasse (classe pai) |\n| **@Override** | Anotacao para sobrescrita de metodos |',
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
      id: 'coj-c1',
      title: 'Classe Pessoa',
      description:
        'Crie uma classe Pessoa com atributos nome (String) e idade (int). Adicione um construtor com parametros, um metodo apresentar() que imprime "Ola, meu nome e [nome] e tenho [idade] anos." e um metodo ehMaiorDeIdade() que retorna true se idade >= 18. No main, crie duas pessoas e teste os metodos.',
      language: 'java',
      starterCode:
        'public class Pessoa {\n    // Atributos\n    \n    // Construtor\n    \n    // Metodo apresentar()\n    \n    // Metodo ehMaiorDeIdade()\n    \n    public static void main(String[] args) {\n        // Crie duas pessoas e teste os metodos\n        \n    }\n}',
      solution:
        'public class Pessoa {\n    String nome;\n    int idade;\n    \n    public Pessoa(String nome, int idade) {\n        this.nome = nome;\n        this.idade = idade;\n    }\n    \n    public void apresentar() {\n        System.out.println("Ola, meu nome e " + nome + " e tenho " + idade + " anos.");\n    }\n    \n    public boolean ehMaiorDeIdade() {\n        return idade >= 18;\n    }\n    \n    public static void main(String[] args) {\n        Pessoa p1 = new Pessoa("Ana", 25);\n        Pessoa p2 = new Pessoa("Lucas", 16);\n        \n        p1.apresentar();\n        System.out.println("Maior de idade? " + p1.ehMaiorDeIdade());\n        \n        p2.apresentar();\n        System.out.println("Maior de idade? " + p2.ehMaiorDeIdade());\n    }\n}',
      hints: [
        'Use this.nome = nome no construtor para diferenciar o parametro do atributo.',
        'O metodo apresentar() nao retorna nada (void), apenas imprime.',
        'O metodo ehMaiorDeIdade() retorna boolean (true ou false).',
      ],
    },
    {
      id: 'coj-c2',
      title: 'Classe ContaBancaria Encapsulada',
      description:
        'Crie uma classe ContaBancaria com atributos privados: titular (String) e saldo (double). Implemente: construtor, getTitular(), getSaldo(), depositar(double valor) com validacao (valor > 0) e sacar(double valor) com validacao (valor > 0 e saldo suficiente). O saldo nunca pode ficar negativo. Teste no main.',
      language: 'java',
      starterCode:
        'public class ContaBancaria {\n    // Atributos privados\n    \n    // Construtor\n    \n    // Getters\n    \n    // Metodo depositar com validacao\n    \n    // Metodo sacar com validacao\n    \n    public static void main(String[] args) {\n        // Teste as operacoes\n        \n    }\n}',
      solution:
        'public class ContaBancaria {\n    private String titular;\n    private double saldo;\n    \n    public ContaBancaria(String titular, double saldoInicial) {\n        this.titular = titular;\n        this.saldo = saldoInicial;\n    }\n    \n    public String getTitular() {\n        return titular;\n    }\n    \n    public double getSaldo() {\n        return saldo;\n    }\n    \n    public void depositar(double valor) {\n        if (valor > 0) {\n            saldo += valor;\n            System.out.println("Deposito de R$" + valor + " realizado.");\n        } else {\n            System.out.println("Valor invalido para deposito.");\n        }\n    }\n    \n    public void sacar(double valor) {\n        if (valor > 0 && valor <= saldo) {\n            saldo -= valor;\n            System.out.println("Saque de R$" + valor + " realizado.");\n        } else {\n            System.out.println("Saldo insuficiente ou valor invalido.");\n        }\n    }\n    \n    public static void main(String[] args) {\n        ContaBancaria conta = new ContaBancaria("Maria", 1000.00);\n        System.out.println("Titular: " + conta.getTitular());\n        System.out.println("Saldo: R$" + conta.getSaldo());\n        \n        conta.depositar(500.00);\n        System.out.println("Saldo: R$" + conta.getSaldo());\n        \n        conta.sacar(200.00);\n        System.out.println("Saldo: R$" + conta.getSaldo());\n        \n        conta.sacar(5000.00);\n        System.out.println("Saldo: R$" + conta.getSaldo());\n    }\n}',
      hints: [
        'Atributos devem ser private para encapsulamento.',
        'Valide se o valor do deposito e maior que zero.',
        'No saque, verifique se o valor e positivo E se ha saldo suficiente.',
      ],
    },
    {
      id: 'coj-c3',
      title: 'Heranca: Animal e Cachorro',
      description:
        'Crie uma classe Animal com atributos nome e idade, um construtor e um metodo emitirSom() que imprime "(som generico)". Crie uma classe Cachorro que herda de Animal, adiciona o atributo raca, usa super() no construtor e sobrescreve emitirSom() para imprimir "Au au!". Teste no main.',
      language: 'java',
      starterCode:
        'public class Animal {\n    // Atributos\n    \n    // Construtor\n    \n    // Metodo emitirSom()\n    \n    // Metodo apresentar()\n    \n}\n\n// Classe Cachorro que herda de Animal\n// public class Cachorro extends Animal {\n//     ...\n// }\n\n// No main, crie objetos e teste',
      solution:
        'public class Animal {\n    protected String nome;\n    protected int idade;\n    \n    public Animal(String nome, int idade) {\n        this.nome = nome;\n        this.idade = idade;\n    }\n    \n    public void emitirSom() {\n        System.out.println("(som generico)");\n    }\n    \n    public void apresentar() {\n        System.out.println(nome + " tem " + idade + " anos.");\n    }\n}\n\n// Em arquivo Cachorro.java:\n// public class Cachorro extends Animal {\n//     private String raca;\n//     \n//     public Cachorro(String nome, int idade, String raca) {\n//         super(nome, idade);\n//         this.raca = raca;\n//     }\n//     \n//     @Override\n//     public void emitirSom() {\n//         System.out.println(nome + " faz: Au au!");\n//     }\n//     \n//     public String getRaca() {\n//         return raca;\n//     }\n// }\n\n// No main:\n// Animal a = new Animal("Gato", 3);\n// Cachorro c = new Cachorro("Rex", 5, "Labrador");\n// a.apresentar();\n// a.emitirSom();\n// c.apresentar();\n// c.emitirSom();\n// System.out.println("Raca: " + c.getRaca());',
      hints: [
        'Use protected nos atributos da superclasse para que a subclasse possa acessar.',
        'Use super(nome, idade) no construtor da subclasse para chamar o construtor da superclasse.',
        'Use @Override antes do metodo emitirSom() na subclasse para indicar sobrescrita.',
      ],
    },
  ],
};
