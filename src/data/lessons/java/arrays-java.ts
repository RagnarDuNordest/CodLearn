import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arrays-java',
  moduleId: 'java',
  title: 'Arrays e ArrayList em Java',
  description:
    'Aprenda a declarar, acessar e percorrer arrays, usar Arrays.sort, ArrayList e o laco for-each em Java.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Arrays sao como um trem: cada vagao (posicao) carrega um passageiro (valor), e voce acessa pelo numero do vagao!\n\n## O que sao Arrays?\n\nUm **array** e uma estrutura de dados que armazena uma colecao de elementos **do mesmo tipo** em posicoes contiguoas de memoria. Cada elemento e acessado por um **indice** numerico que comeca em **0**.\n\nArrays em Java tem **tamanho fixo** — uma vez criado, voce nao pode aumentar ou diminuir seu tamanho.\n\nExistem duas formas de declarar um array:\n\n```\ntipo[] nomeArray = new tipo[tamanho];\ntipo[] nomeArray = {valor1, valor2, valor3};\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class ArraysBasico {\n    public static void main(String[] args) {\n        // Criando array com tamanho definido\n        int[] notas = new int[5];\n        notas[0] = 85;\n        notas[1] = 92;\n        notas[2] = 78;\n        notas[3] = 90;\n        notas[4] = 88;\n        \n        // Criando array com valores iniciais\n        String[] nomes = {"Ana", "Bruno", "Carlos", "Diana"};\n        \n        // Acessando elementos\n        System.out.println("Primeira nota: " + notas[0]);   // 85\n        System.out.println("Segundo nome: " + nomes[1]);    // Bruno\n        \n        // Tamanho do array\n        System.out.println("Total de notas: " + notas.length);  // 5\n        System.out.println("Total de nomes: " + nomes.length);  // 4\n    }\n}',
        filename: 'ArraysBasico.java',
        description: 'Criando, preenchendo e acessando elementos de arrays.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Cuidado com o **ArrayIndexOutOfBoundsException**! Se um array tem 5 elementos, os indices validos sao de 0 a 4. Acessar o indice 5 causara um erro em tempo de execucao.',
    },
    {
      type: 'text',
      content:
        '## Percorrendo Arrays com for e for-each\n\nExistem duas formas principais de percorrer todos os elementos de um array:\n\n- **for tradicional** — Voce controla o indice manualmente\n- **for-each (enhanced for)** — Forma simplificada que itera sobre cada elemento\n\nO for-each e mais limpo, mas nao da acesso ao indice.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'public class PercorrerArrays {\n    public static void main(String[] args) {\n        double[] precos = {19.99, 35.50, 12.00, 89.90, 45.00};\n        \n        // For tradicional (com indice)\n        System.out.println("Com for tradicional:");\n        for (int i = 0; i < precos.length; i++) {\n            System.out.println("Indice " + i + ": R$" + precos[i]);\n        }\n        \n        System.out.println("---");\n        \n        // For-each (sem indice)\n        System.out.println("Com for-each:");\n        double soma = 0;\n        for (double preco : precos) {\n            soma += preco;\n            System.out.println("Preco: R$" + preco);\n        }\n        System.out.println("Total: R$" + soma);\n    }\n}',
        filename: 'PercorrerArrays.java',
        description: 'Duas formas de percorrer um array: for tradicional e for-each.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use o **for-each** quando voce so precisa ler os valores do array. Use o **for tradicional** quando precisar do indice ou modificar os elementos.',
    },
    {
      type: 'text',
      content:
        '## Ordenando com Arrays.sort\n\nA classe utilitaria `java.util.Arrays` oferece metodos prontos para trabalhar com arrays. O mais usado e o **`Arrays.sort()`**, que ordena os elementos em ordem crescente.\n\nVoce tambem pode usar `Arrays.toString()` para imprimir o conteudo do array de forma formatada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'import java.util.Arrays;\n\npublic class OrdenarArrays {\n    public static void main(String[] args) {\n        int[] numeros = {42, 15, 88, 3, 67, 29};\n        \n        System.out.println("Antes: " + Arrays.toString(numeros));\n        // Antes: [42, 15, 88, 3, 67, 29]\n        \n        Arrays.sort(numeros);\n        \n        System.out.println("Depois: " + Arrays.toString(numeros));\n        // Depois: [3, 15, 29, 42, 67, 88]\n        \n        // Funciona com Strings tambem (ordem alfabetica)\n        String[] nomes = {"Carlos", "Ana", "Bruno", "Diana"};\n        Arrays.sort(nomes);\n        System.out.println("Nomes: " + Arrays.toString(nomes));\n        // Nomes: [Ana, Bruno, Carlos, Diana]\n    }\n}',
        filename: 'OrdenarArrays.java',
        description: 'Usando Arrays.sort() para ordenar e Arrays.toString() para imprimir.',
      },
    },
    {
      type: 'text',
      content:
        '## ArrayList — Arrays Dinamicos\n\nDiferente dos arrays comuns, o **ArrayList** e uma classe que permite criar listas com **tamanho dinamico** — voce pode adicionar e remover elementos a qualquer momento.\n\nPara usar o ArrayList, voce precisa importar `java.util.ArrayList`. Ele trabalha com **classes wrapper** ao inves de tipos primitivos:\n\n- `int` -> `Integer`\n- `double` -> `Double`\n- `boolean` -> `Boolean`\n- `char` -> `Character`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        code: 'import java.util.ArrayList;\n\npublic class ArrayListExemplo {\n    public static void main(String[] args) {\n        // Criando um ArrayList de Strings\n        ArrayList<String> frutas = new ArrayList<>();\n        \n        // Adicionando elementos\n        frutas.add("Maca");\n        frutas.add("Banana");\n        frutas.add("Laranja");\n        frutas.add("Uva");\n        \n        // Acessando elementos\n        System.out.println("Primeira fruta: " + frutas.get(0));\n        \n        // Tamanho da lista\n        System.out.println("Total: " + frutas.size());\n        \n        // Removendo elemento\n        frutas.remove("Banana");\n        System.out.println("Apos remover: " + frutas);\n        \n        // Verificando se contem\n        System.out.println("Tem Uva? " + frutas.contains("Uva"));\n        \n        // Percorrendo com for-each\n        for (String fruta : frutas) {\n            System.out.println("Fruta: " + fruta);\n        }\n    }\n}',
        filename: 'ArrayListExemplo.java',
        description: 'Criando e manipulando um ArrayList com os metodos mais comuns.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'No ArrayList, usamos `size()` para obter o tamanho (e um metodo). Em arrays comuns, usamos `length` sem parenteses (e uma propriedade). Nao confunda!',
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
        '## ArrayList — Array que cresce automaticamente\n\nArrays em Java tem tamanho FIXO. Se voce precisar de uma lista que cresce, use **ArrayList** da biblioteca `java.util`:\n\n- **`new ArrayList<>()`** — cria lista vazia (use `<>` para inferir o tipo)\n- **`.add(valor)`** — adiciona ao final\n- **`.get(indice)`** — acessa pelo indice\n- **`.size()`** — retorna o tamanho atual\n- **`.remove(indice)`** — remove pelo indice\n- **`.contains(valor)`** — verifica se contém o valor',
    },
    {
      type: 'code',
      codeExample: {
        language: 'java',
        filename: 'ListasDinamicas.java',
        code: `import java.util.ArrayList;

public class ListasDinamicas {
    public static void main(String[] args) {
        // ArrayList cresce automaticamente
        ArrayList<String> nomes = new ArrayList<>();

        nomes.add("Ana");
        nomes.add("Bruno");
        nomes.add("Carla");

        System.out.println("Tamanho: " + nomes.size()); // 3
        System.out.println("Primeiro: " + nomes.get(0)); // Ana

        // Percorrendo com for-each
        for (String nome : nomes) {
            System.out.println("Ola, " + nome + "!");
        }

        // Remover um elemento
        nomes.remove("Bruno");
        System.out.println("Apos remocao: " + nomes.size()); // 2

        // Verificar se contem
        System.out.println(nomes.contains("Ana")); // true
    }
}`,
        description: 'ArrayList e mais flexivel que arrays: cresce automaticamente. Use import java.util.ArrayList.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Quando usar array vs ArrayList? Use array quando o tamanho e FIXO e conhecido (ex: notas de 5 alunos). Use ArrayList quando o tamanho pode variar (ex: lista de usuarios que podem ser adicionados ou removidos). Na pratica, ArrayList e mais comum no dia a dia.',
    },
  ],
  challenges: [
    {
      id: 'aj-c1',
      title: 'Maior e Menor do Array',
      description:
        'Dado um array de inteiros, encontre e imprima o maior e o menor valor usando um laco for. Nao use Arrays.sort() — faca a busca manualmente!',
      language: 'java',
      starterCode:
        'public class MaiorMenor {\n    public static void main(String[] args) {\n        int[] numeros = {42, 15, 88, 3, 67, 29, 91, 10};\n        \n        // Encontre o maior e o menor valor\n        \n        // Imprima os resultados\n        \n    }\n}',
      solution:
        'public class MaiorMenor {\n    public static void main(String[] args) {\n        int[] numeros = {42, 15, 88, 3, 67, 29, 91, 10};\n        \n        int maior = numeros[0];\n        int menor = numeros[0];\n        \n        for (int i = 1; i < numeros.length; i++) {\n            if (numeros[i] > maior) {\n                maior = numeros[i];\n            }\n            if (numeros[i] < menor) {\n                menor = numeros[i];\n            }\n        }\n        \n        System.out.println("Maior: " + maior);\n        System.out.println("Menor: " + menor);\n    }\n}',
      hints: [
        'Inicie maior e menor com o primeiro elemento do array: numeros[0].',
        'Percorra o array a partir do indice 1 comparando cada elemento.',
        'Atualize maior quando encontrar um valor maior, e menor quando encontrar um valor menor.',
      ],
    },
    {
      id: 'aj-c2',
      title: 'Inverter Array',
      description:
        'Dado um array de inteiros, crie um novo array com os elementos na ordem inversa. Por exemplo, {1, 2, 3, 4, 5} deve virar {5, 4, 3, 2, 1}. Imprima ambos os arrays usando Arrays.toString().',
      language: 'java',
      starterCode:
        'import java.util.Arrays;\n\npublic class InverterArray {\n    public static void main(String[] args) {\n        int[] original = {10, 20, 30, 40, 50};\n        \n        // Crie um novo array invertido\n        \n        System.out.println("Original: " + Arrays.toString(original));\n        // Imprima o array invertido\n        \n    }\n}',
      solution:
        'import java.util.Arrays;\n\npublic class InverterArray {\n    public static void main(String[] args) {\n        int[] original = {10, 20, 30, 40, 50};\n        int[] invertido = new int[original.length];\n        \n        for (int i = 0; i < original.length; i++) {\n            invertido[i] = original[original.length - 1 - i];\n        }\n        \n        System.out.println("Original: " + Arrays.toString(original));\n        System.out.println("Invertido: " + Arrays.toString(invertido));\n    }\n}',
      hints: [
        'Crie um novo array do mesmo tamanho: new int[original.length].',
        'O elemento na posicao i do invertido vem da posicao (tamanho - 1 - i) do original.',
        'Use Arrays.toString() para imprimir os arrays de forma formatada.',
      ],
    },
    {
      id: 'aj-c3',
      title: 'Remover Duplicatas com ArrayList',
      description:
        'Dado um array de inteiros com valores repetidos, use um ArrayList para criar uma lista sem duplicatas. Percorra o array original e adicione ao ArrayList apenas se o elemento ainda nao existir na lista. Imprima a lista final.',
      language: 'java',
      starterCode:
        'import java.util.ArrayList;\n\npublic class RemoverDuplicatas {\n    public static void main(String[] args) {\n        int[] numeros = {3, 7, 3, 2, 7, 8, 2, 5, 8, 3};\n        \n        // Crie um ArrayList e adicione apenas valores unicos\n        \n        // Imprima a lista sem duplicatas\n        \n    }\n}',
      solution:
        'import java.util.ArrayList;\n\npublic class RemoverDuplicatas {\n    public static void main(String[] args) {\n        int[] numeros = {3, 7, 3, 2, 7, 8, 2, 5, 8, 3};\n        \n        ArrayList<Integer> unicos = new ArrayList<>();\n        \n        for (int num : numeros) {\n            if (!unicos.contains(num)) {\n                unicos.add(num);\n            }\n        }\n        \n        System.out.println("Original: ");\n        for (int num : numeros) {\n            System.out.print(num + " ");\n        }\n        System.out.println();\n        System.out.println("Sem duplicatas: " + unicos);\n    }\n}',
      hints: [
        'Use ArrayList<Integer> para armazenar inteiros (wrapper class).',
        'Antes de adicionar, verifique com contains() se o valor ja existe.',
        'Percorra o array original com for-each para simplificar o codigo.',
      ],
    },
  ],
};
