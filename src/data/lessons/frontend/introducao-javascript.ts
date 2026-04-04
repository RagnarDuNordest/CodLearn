import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'introducao-javascript',
  moduleId: 'frontend',
  title: 'Introducao ao JavaScript',
  description: 'Aprenda os fundamentos do JavaScript: variaveis, tipos de dados e funcoes.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: '**JavaScript** e a linguagem da web. Todo site que voce acessa usa JavaScript para tornar a pagina interativa. Com JS voce pode: reagir a cliques, validar formularios, buscar dados de APIs e muito mais.\n\nDiferente de Python e C, JavaScript roda **dentro do navegador** (e tambem no servidor com Node.js).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'variaveis.js',
        code: '// Variaveis com let (pode mudar) e const (nao muda)\nlet nome = "Raphael";\nlet idade = 20;\nconst PI = 3.14159;\n\n// Tipos de dados\nlet texto = "Ola mundo";     // string\nlet numero = 42;              // number\nlet decimal = 3.14;           // number\nlet verdadeiro = true;        // boolean\nlet nada = null;              // null\nlet indefinido = undefined;   // undefined\n\nconsole.log(nome);     // Raphael\nconsole.log(typeof numero); // number',
        description: 'Use let para variaveis que mudam e const para constantes. JS tem tipagem dinamica.',
      },
    },
    {
      type: 'text',
      content: 'JavaScript tem **funcoes** similares a Python, mas com sintaxe diferente:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'funcoes.js',
        code: '// Funcao tradicional\nfunction saudacao(nome) {\n    return "Ola, " + nome + "!";\n}\n\n// Arrow function (funcao seta) - forma moderna\nconst dobro = (n) => n * 2;\n\nconst soma = (a, b) => {\n    let resultado = a + b;\n    return resultado;\n};\n\nconsole.log(saudacao("Maria")); // Ola, Maria!\nconsole.log(dobro(5));          // 10\nconsole.log(soma(3, 4));        // 7',
        description: 'Arrow functions sao uma forma mais curta de escrever funcoes.',
      },
    },
    {
      type: 'text',
      content: 'JavaScript tambem possui **condicionais** e **lacos** com sintaxe semelhante ao C. Alem do `for` classico, os arrays oferecem o metodo `.forEach()` que facilita a iteracao:\n\n- **`if / else if / else`** — funcionam da mesma forma que em outras linguagens\n- **`for (let i = 0; i < n; i++)`** — laco for com inicializacao, condicao e incremento entre parenteses\n- **`.forEach(funcao)`** — metodo de array que chama uma funcao para cada elemento, sem precisar de indices',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'condicionais_lacos.js',
        code: '// Condicionais\nlet nota = 7;\n\nif (nota >= 7) {\n    console.log("Aprovado!");\n} else if (nota >= 5) {\n    console.log("Recuperacao");\n} else {\n    console.log("Reprovado");\n}\n\n// Laco for\nfor (let i = 1; i <= 5; i++) {\n    console.log("Numero: " + i);\n}\n\n// Arrays\nconst frutas = ["Maca", "Banana", "Laranja"];\nfrutas.forEach((fruta) => {\n    console.log(fruta);\n});',
        description: 'JS usa chaves {} para blocos e === para comparacao estrita.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Dica:** Use **===** (igualdade estrita) em vez de **==** em JavaScript. O === compara valor E tipo, evitando bugs.',
    },
  ],
  challenges: [
    {
      id: 'js-c1',
      title: 'Calculadora de IMC',
      description: 'Crie uma funcao que recebe peso (kg) e altura (m) e retorna o IMC e a classificacao.',
      language: 'javascript',
      starterCode: 'function calcularIMC(peso, altura) {\n    // Calcule o IMC: peso / (altura * altura)\n    // Retorne um objeto com imc e classificacao\n    // Abaixo de 18.5: "Abaixo do peso"\n    // 18.5 a 24.9: "Peso normal"\n    // 25 a 29.9: "Sobrepeso"\n    // 30+: "Obesidade"\n}\n\nconsole.log(calcularIMC(70, 1.75));',
      solution: 'function calcularIMC(peso, altura) {\n    const imc = peso / (altura * altura);\n    let classificacao;\n\n    if (imc < 18.5) {\n        classificacao = "Abaixo do peso";\n    } else if (imc < 25) {\n        classificacao = "Peso normal";\n    } else if (imc < 30) {\n        classificacao = "Sobrepeso";\n    } else {\n        classificacao = "Obesidade";\n    }\n\n    return { imc: imc.toFixed(1), classificacao };\n}\n\nconsole.log(calcularIMC(70, 1.75));',
      hints: ['IMC = peso / (altura * altura)', 'Use if/else if para classificar', 'Use toFixed(1) para arredondar'],
    },
    {
      id: 'js-c2',
      title: 'Filtro de Pares',
      description: 'Use uma arrow function e o metodo .filter() para filtrar apenas os numeros pares de um array.',
      language: 'javascript',
      starterCode: 'const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Use .filter() com arrow function\nconst pares = // seu codigo aqui\n\nconsole.log(pares); // [2, 4, 6, 8, 10]',
      solution: 'const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\nconst pares = numeros.filter((n) => n % 2 === 0);\n\nconsole.log(pares); // [2, 4, 6, 8, 10]',
      hints: ['O metodo .filter() recebe uma funcao que retorna true/false', 'Um numero e par se numero % 2 === 0', 'Arrow function: (n) => condicao'],
    },
  ],
};
