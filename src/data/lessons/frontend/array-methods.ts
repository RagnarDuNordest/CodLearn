import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'array-methods',
  moduleId: 'frontend',
  title: 'Array Methods: map, filter e reduce',
  description: 'Domine os tres metodos mais importantes de arrays em JavaScript.',
  order: 2,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'JavaScript tem tres metodos de array que voce vai usar TODO DIA como desenvolvedor: **map**, **filter** e **reduce**. Eles substituem loops `for` chatos e tornam o codigo mais legivel e elegante.\n\nTodos os tres recebem uma **funcao** como argumento (chamada "callback") e percorrem o array aplicando essa funcao a cada elemento.',
    },
    {
      type: 'text',
      content: '## .map() — Transformar\n\n`.map()` cria um NOVO array transformando cada elemento. O tamanho do array resultante e sempre igual ao original.\n\nPense assim: "para cada elemento, aplique uma transformacao".',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'map_exemplos.js',
        code: 'const precos = [10, 25, 50, 100];\n\n// Aplicar 20% de desconto em todos\nconst comDesconto = precos.map(preco => preco * 0.8);\nconsole.log(comDesconto);  // [8, 20, 40, 80]\n\n// Converter array de strings\nconst nomes = ["ana", "carlos", "beatriz"];\nconst maiusculos = nomes.map(nome => nome.toUpperCase());\nconsole.log(maiusculos);  // ["ANA", "CARLOS", "BEATRIZ"]\n\n// Array de objetos -> array de strings\nconst produtos = [\n    { nome: "Notebook", preco: 2500 },\n    { nome: "Mouse", preco: 80 }\n];\nconst descricoes = produtos.map(p => p.nome + ": R$" + p.preco);\nconsole.log(descricoes);\n// ["Notebook: R$2500", "Mouse: R$80"]',
        description: '.map() transforma cada elemento e retorna um novo array do mesmo tamanho.',
      },
    },
    {
      type: 'text',
      content: '## .filter() — Filtrar\n\n`.filter()` cria um NOVO array com apenas os elementos que passam em um teste. O tamanho do resultado pode ser menor que o original.\n\nPense assim: "manter apenas os elementos onde a condicao for true".',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'filter_exemplos.js',
        code: 'const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Apenas pares\nconst pares = numeros.filter(n => n % 2 === 0);\nconsole.log(pares);  // [2, 4, 6, 8, 10]\n\n// Produtos acima de R$100\nconst produtos = [\n    { nome: "Pen Drive", preco: 40 },\n    { nome: "Monitor", preco: 800 },\n    { nome: "Cabo USB", preco: 15 },\n    { nome: "Teclado", preco: 150 }\n];\nconst caros = produtos.filter(p => p.preco > 100);\nconsole.log(caros.map(p => p.nome));\n// ["Monitor", "Teclado"]',
        description: '.filter() mantém apenas os elementos onde a funcao retorna true.',
      },
    },
    {
      type: 'text',
      content: '## .reduce() — Acumular\n\n`.reduce()` "reduz" o array a um UNICO valor, acumulando resultado a cada elemento. E usado para somas, produtos, contagens, ou construir objetos.\n\nRecebe uma funcao com dois parametros: `acumulador` (resultado parcial) e `elemento` (elemento atual). O segundo argumento e o valor inicial do acumulador.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'reduce_exemplos.js',
        code: 'const numeros = [1, 2, 3, 4, 5];\n\n// Soma de todos os elementos\nconst soma = numeros.reduce((acum, n) => acum + n, 0);\nconsole.log(soma);  // 15\n\n// Produto de todos os elementos\nconst produto = numeros.reduce((acum, n) => acum * n, 1);\nconsole.log(produto);  // 120\n\n// Total de uma lista de compras\nconst compras = [\n    { item: "Camiseta", valor: 59.9 },\n    { item: "Calca", valor: 89.9 },\n    { item: "Tenis", valor: 199.9 }\n];\nconst total = compras.reduce((acum, c) => acum + c.valor, 0);\nconsole.log("Total: R$" + total.toFixed(2));\n// Total: R$349.70',
        description: '.reduce() acumula todos os elementos em um unico valor, usando o segundo argumento como valor inicial.',
      },
    },
    {
      type: 'text',
      content: '## Encadeando os tres metodos\n\nA magia e que voce pode encadear `.filter()`, `.map()` e `.reduce()` para fazer operacoes complexas em uma linha:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'encadeamento.js',
        code: 'const funcionarios = [\n    { nome: "Ana", salario: 3000, setor: "TI" },\n    { nome: "Bruno", salario: 4500, setor: "RH" },\n    { nome: "Carla", salario: 5000, setor: "TI" },\n    { nome: "Diego", salario: 2800, setor: "TI" }\n];\n\n// Total de salarios do setor de TI\nconst totalTI = funcionarios\n    .filter(f => f.setor === "TI")      // Ana, Carla, Diego\n    .map(f => f.salario)                 // [3000, 5000, 2800]\n    .reduce((soma, s) => soma + s, 0);   // 10800\n\nconsole.log("Total TI: R$" + totalTI);  // Total TI: R$10800',
        description: 'Encadeie filter, map e reduce para criar pipelines de transformacao de dados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Quando usar cada um: **map** quando voce quer transformar todos os elementos, **filter** quando voce quer selecionar alguns, **reduce** quando voce quer um unico resultado (soma, contagem, objeto). Na maioria das vezes, voce vai usar os tres juntos!',
    },
  ],
  challenges: [
    {
      id: 'array-methods-c1',
      title: 'Carrinho de Compras',
      description: 'Dado um array de produtos com nome e preco, calcule: (1) o total da compra, (2) a lista de nomes dos produtos, (3) apenas os produtos com preco abaixo de R$100.',
      language: 'javascript',
      starterCode: 'const carrinho = [\n    { nome: "Teclado", preco: 150 },\n    { nome: "Mouse", preco: 80 },\n    { nome: "Mousepad", preco: 45 },\n    { nome: "Monitor", preco: 850 },\n    { nome: "Webcam", preco: 90 }\n];\n\n// 1. Total do carrinho\nconst total = // use .reduce()\n\n// 2. Array com apenas os nomes\nconst nomes = // use .map()\n\n// 3. Produtos baratos (preco < 100)\nconst baratos = // use .filter()\n\nconsole.log("Total: R$" + total);      // Total: R$1215\nconsole.log(nomes);                     // ["Teclado", "Mouse", ...]\nconsole.log(baratos.map(p => p.nome)); // ["Mouse", "Mousepad", "Webcam"]',
      solution: 'const carrinho = [\n    { nome: "Teclado", preco: 150 },\n    { nome: "Mouse", preco: 80 },\n    { nome: "Mousepad", preco: 45 },\n    { nome: "Monitor", preco: 850 },\n    { nome: "Webcam", preco: 90 }\n];\n\nconst total = carrinho.reduce((soma, p) => soma + p.preco, 0);\nconst nomes = carrinho.map(p => p.nome);\nconst baratos = carrinho.filter(p => p.preco < 100);\n\nconsole.log("Total: R$" + total);\nconsole.log(nomes);\nconsole.log(baratos.map(p => p.nome));',
      hints: ['.reduce((soma, p) => soma + p.preco, 0) — comece com 0 e some cada preco.', '.map(p => p.nome) — transforme cada produto em apenas seu nome.', '.filter(p => p.preco < 100) — mantenha apenas os baratos.'],
    },
    {
      id: 'array-methods-c2',
      title: 'Analise de Notas',
      description: 'Dado um array de alunos com nome e nota, calcule a media das notas dos aprovados (nota >= 6). Use filter, map e reduce encadeados.',
      language: 'javascript',
      starterCode: 'const alunos = [\n    { nome: "Ana", nota: 8.5 },\n    { nome: "Bruno", nota: 4.0 },\n    { nome: "Carla", nota: 7.0 },\n    { nome: "Diego", nota: 5.5 },\n    { nome: "Elena", nota: 9.0 },\n    { nome: "Felipe", nota: 6.0 }\n];\n\nfunction mediaAprovados(alunos) {\n    // 1. filter: apenas aprovados (nota >= 6)\n    // 2. map: pegar apenas as notas\n    // 3. calcule a media\n    // Retorne a media com 2 casas decimais (use .toFixed(2))\n}\n\nconsole.log(mediaAprovados(alunos)); // "7.63"',
      solution: 'const alunos = [\n    { nome: "Ana", nota: 8.5 },\n    { nome: "Bruno", nota: 4.0 },\n    { nome: "Carla", nota: 7.0 },\n    { nome: "Diego", nota: 5.5 },\n    { nome: "Elena", nota: 9.0 },\n    { nome: "Felipe", nota: 6.0 }\n];\n\nfunction mediaAprovados(alunos) {\n    const aprovados = alunos.filter(a => a.nota >= 6);\n    const notas = aprovados.map(a => a.nota);\n    const soma = notas.reduce((acum, n) => acum + n, 0);\n    return (soma / notas.length).toFixed(2);\n}\n\nconsole.log(mediaAprovados(alunos)); // "7.63"',
      hints: ['Primeiro .filter(a => a.nota >= 6) para pegar os aprovados.', 'Depois .map(a => a.nota) para extrair apenas as notas.', 'Use .reduce((soma, n) => soma + n, 0) para somar e divida por notas.length.'],
    },
    {
      id: 'array-methods-c3',
      title: 'Transformar Array em Objeto',
      description: 'Use .reduce() para transformar um array de pares [chave, valor] em um objeto. Por exemplo: [["nome","Ana"],["idade",25]] vira { nome: "Ana", idade: 25 }.',
      language: 'javascript',
      starterCode: 'function arrayParaObjeto(pares) {\n    // Use .reduce() para construir um objeto\n    // Cada elemento de pares e um array [chave, valor]\n    return pares.reduce((objeto, par) => {\n        // par[0] e a chave, par[1] e o valor\n        // adicione no objeto e retorne o objeto\n    }, {});\n}\n\nconsole.log(arrayParaObjeto([["nome", "Ana"], ["idade", 25], ["cidade", "SP"]]));\n// { nome: "Ana", idade: 25, cidade: "SP" }\n\nconsole.log(arrayParaObjeto([["a", 1], ["b", 2], ["c", 3]]));\n// { a: 1, b: 2, c: 3 }',
      solution: 'function arrayParaObjeto(pares) {\n    return pares.reduce((objeto, par) => {\n        objeto[par[0]] = par[1];\n        return objeto;\n    }, {});\n}\n\nconsole.log(arrayParaObjeto([["nome", "Ana"], ["idade", 25], ["cidade", "SP"]]));\n// { nome: "Ana", idade: 25, cidade: "SP" }\n\nconsole.log(arrayParaObjeto([["a", 1], ["b", 2], ["c", 3]]));\n// { a: 1, b: 2, c: 3 }',
      hints: ['O valor inicial do reduce e {} (objeto vazio).', 'Dentro do reduce: objeto[par[0]] = par[1] adiciona a chave e valor no objeto.', 'Sempre retorne o objeto acumulador no final de cada iteracao.'],
    },
  ],
};
