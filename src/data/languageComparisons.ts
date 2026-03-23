export interface LanguageComparison {
  concept: string;
  description: string;
  examples: { language: string; code: string }[];
}

export const comparisons: LanguageComparison[] = [
  {
    concept: 'Hello World',
    description: 'O programa mais simples: exibir uma mensagem na tela.',
    examples: [
      {
        language: 'Python',
        code: `print("Hello, World!")`,
      },
      {
        language: 'JavaScript',
        code: `console.log("Hello, World!");`,
      },
      {
        language: 'C',
        code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      },
      {
        language: 'Java',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      },
    ],
  },
  {
    concept: 'Variáveis',
    description: 'Como declarar e atribuir valores a variáveis.',
    examples: [
      {
        language: 'Python',
        code: `nome = "Ana"
idade = 20
altura = 1.65
ativo = True`,
      },
      {
        language: 'JavaScript',
        code: `let nome = "Ana";
const idade = 20;
var altura = 1.65;
let ativo = true;`,
      },
      {
        language: 'C',
        code: `char nome[] = "Ana";
int idade = 20;
float altura = 1.65f;
int ativo = 1;`,
      },
      {
        language: 'Java',
        code: `String nome = "Ana";
int idade = 20;
double altura = 1.65;
boolean ativo = true;`,
      },
    ],
  },
  {
    concept: 'Condicionais (if/else)',
    description: 'Executar código baseado em uma condição.',
    examples: [
      {
        language: 'Python',
        code: `idade = 18

if idade >= 18:
    print("Maior de idade")
elif idade >= 16:
    print("Pode votar")
else:
    print("Menor de idade")`,
      },
      {
        language: 'JavaScript',
        code: `let idade = 18;

if (idade >= 18) {
    console.log("Maior de idade");
} else if (idade >= 16) {
    console.log("Pode votar");
} else {
    console.log("Menor de idade");
}`,
      },
      {
        language: 'C',
        code: `int idade = 18;

if (idade >= 18) {
    printf("Maior de idade\\n");
} else if (idade >= 16) {
    printf("Pode votar\\n");
} else {
    printf("Menor de idade\\n");
}`,
      },
      {
        language: 'Java',
        code: `int idade = 18;

if (idade >= 18) {
    System.out.println("Maior de idade");
} else if (idade >= 16) {
    System.out.println("Pode votar");
} else {
    System.out.println("Menor de idade");
}`,
      },
    ],
  },
  {
    concept: 'Loop for',
    description: 'Repetir um bloco de código um número determinado de vezes.',
    examples: [
      {
        language: 'Python',
        code: `for i in range(5):
    print(i)

# Com lista
frutas = ["maçã", "banana", "uva"]
for fruta in frutas:
    print(fruta)`,
      },
      {
        language: 'JavaScript',
        code: `for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Com array
const frutas = ["maçã", "banana", "uva"];
for (const fruta of frutas) {
    console.log(fruta);
}`,
      },
      {
        language: 'C',
        code: `for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}

// Com array
char *frutas[] = {"maçã", "banana", "uva"};
for (int i = 0; i < 3; i++) {
    printf("%s\\n", frutas[i]);
}`,
      },
      {
        language: 'Java',
        code: `for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// Com array
String[] frutas = {"maçã", "banana", "uva"};
for (String fruta : frutas) {
    System.out.println(fruta);
}`,
      },
    ],
  },
  {
    concept: 'Função',
    description: 'Definir e chamar uma função que soma dois números.',
    examples: [
      {
        language: 'Python',
        code: `def somar(a, b):
    return a + b

resultado = somar(3, 4)
print(resultado)  # 7`,
      },
      {
        language: 'JavaScript',
        code: `function somar(a, b) {
    return a + b;
}

// Ou arrow function:
const somar2 = (a, b) => a + b;

const resultado = somar(3, 4);
console.log(resultado); // 7`,
      },
      {
        language: 'C',
        code: `#include <stdio.h>

int somar(int a, int b) {
    return a + b;
}

int main() {
    int resultado = somar(3, 4);
    printf("%d\\n", resultado); // 7
    return 0;
}`,
      },
      {
        language: 'Java',
        code: `public class Main {
    static int somar(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int resultado = somar(3, 4);
        System.out.println(resultado); // 7
    }
}`,
      },
    ],
  },
  {
    concept: 'Lista/Array',
    description: 'Criar e manipular coleções de valores.',
    examples: [
      {
        language: 'Python',
        code: `numeros = [1, 2, 3, 4, 5]
numeros.append(6)      # adiciona
numeros.remove(3)      # remove
print(numeros[0])      # primeiro
print(len(numeros))    # tamanho`,
      },
      {
        language: 'JavaScript',
        code: `let numeros = [1, 2, 3, 4, 5];
numeros.push(6);           // adiciona
numeros.splice(2, 1);      // remove índice 2
console.log(numeros[0]);   // primeiro
console.log(numeros.length); // tamanho`,
      },
      {
        language: 'C',
        code: `#include <stdio.h>

int numeros[] = {1, 2, 3, 4, 5};
int tamanho = 5;

// Adicionar requer novo array em C
printf("%d\\n", numeros[0]);  // primeiro
printf("%d\\n", tamanho);     // tamanho`,
      },
      {
        language: 'Java',
        code: `import java.util.ArrayList;

ArrayList<Integer> numeros = new ArrayList<>();
numeros.add(1);
numeros.add(2);
numeros.add(3);
numeros.remove(Integer.valueOf(2)); // remove valor
System.out.println(numeros.get(0));  // primeiro
System.out.println(numeros.size());  // tamanho`,
      },
    ],
  },
  {
    concept: 'Leitura de input',
    description: 'Ler dados digitados pelo usuário.',
    examples: [
      {
        language: 'Python',
        code: `nome = input("Digite seu nome: ")
idade = int(input("Digite sua idade: "))
print(f"Olá, {nome}! Você tem {idade} anos.")`,
      },
      {
        language: 'JavaScript',
        code: `// No Node.js:
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
rl.question('Digite seu nome: ', (nome) => {
    console.log(\`Olá, \${nome}!\`);
    rl.close();
});`,
      },
      {
        language: 'C',
        code: `#include <stdio.h>

int main() {
    char nome[50];
    int idade;
    printf("Digite seu nome: ");
    scanf("%s", nome);
    printf("Digite sua idade: ");
    scanf("%d", &idade);
    printf("Ola, %s! Voce tem %d anos.\\n",
           nome, idade);
    return 0;
}`,
      },
      {
        language: 'Java',
        code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Digite seu nome: ");
        String nome = sc.nextLine();
        System.out.print("Digite sua idade: ");
        int idade = sc.nextInt();
        System.out.println("Olá, " + nome +
            "! Você tem " + idade + " anos.");
    }
}`,
      },
    ],
  },
  {
    concept: 'Comentários',
    description: 'Como escrever comentários no código.',
    examples: [
      {
        language: 'Python',
        code: `# Comentário de uma linha

"""
Comentário de
múltiplas linhas
(docstring)
"""

x = 5  # Comentário inline`,
      },
      {
        language: 'JavaScript',
        code: `// Comentário de uma linha

/*
 * Comentário de
 * múltiplas linhas
 */

let x = 5; // Comentário inline`,
      },
      {
        language: 'C',
        code: `// Comentário de uma linha (C99+)

/*
 * Comentário de
 * múltiplas linhas
 */

int x = 5; /* Inline */`,
      },
      {
        language: 'Java',
        code: `// Comentário de uma linha

/*
 * Comentário de
 * múltiplas linhas
 */

/** Javadoc para documentação */
int x = 5; // Inline`,
      },
    ],
  },
];
