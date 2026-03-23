import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'objetos-em-js',
  moduleId: 'frontend',
  title: 'Objetos em JavaScript',
  description: 'Aprenda a usar objetos em JS: propriedades, metodos e JSON.',
  order: 1,
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'Em JavaScript, **objetos** sao a forma principal de organizar dados relacionados. Um objeto agrupa **propriedades** (dados) e **metodos** (funcoes) em uma unica estrutura.\n\nVoce ja conhece dicionarios em Python (`{"nome": "Ana"}`). Objetos em JS sao a mesma ideia, mas com superpoderes!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'objetos_basico.js',
        code: '// Criando um objeto\nconst pessoa = {\n    nome: "Ana",\n    idade: 25,\n    cidade: "Sao Paulo"\n};\n\n// Acessando propriedades\nconsole.log(pessoa.nome);        // Ana\nconsole.log(pessoa["idade"]);    // 25\n\n// Modificando propriedades\npessoa.idade = 26;\nconsole.log(pessoa.idade);       // 26\n\n// Adicionando nova propriedade\npessoa.email = "ana@email.com";\nconsole.log(pessoa.email);       // ana@email.com',
        description: 'Objetos em JS usam chaves {}. Acesse propriedades com ponto (.) ou colchetes [""].',
      },
    },
    {
      type: 'text',
      content: 'Objetos tambem podem ter **metodos** — funcoes que pertencem ao objeto. Dentro de um metodo, `this` se refere ao proprio objeto:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'objeto_metodos.js',
        code: 'const calculadora = {\n    resultado: 0,\n\n    somar(n) {\n        this.resultado += n;\n        return this;  // permite encadeamento\n    },\n\n    subtrair(n) {\n        this.resultado -= n;\n        return this;\n    },\n\n    mostrar() {\n        console.log("Resultado:", this.resultado);\n        return this;\n    }\n};\n\ncalculadora.somar(10).somar(5).subtrair(3).mostrar();\n// Resultado: 12',
        description: '`this` dentro de um metodo se refere ao proprio objeto.',
      },
    },
    {
      type: 'text',
      content: '## Percorrendo objetos\n\nPara percorrer as propriedades de um objeto, use `Object.keys()`, `Object.values()` ou `Object.entries()`:\n\n- **`Object.keys(obj)`** — retorna array com os nomes das propriedades\n- **`Object.values(obj)`** — retorna array com os valores\n- **`Object.entries(obj)`** — retorna array de pares `[chave, valor]`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'percorrer_objeto.js',
        code: 'const notas = { matematica: 8, portugues: 7, historia: 9 };\n\n// Percorrendo chaves\nObject.keys(notas).forEach(materia => {\n    console.log(materia + ": " + notas[materia]);\n});\n// matematica: 8\n// portugues: 7\n// historia: 9\n\n// Calculando a media\nconst valores = Object.values(notas);\nconst media = valores.reduce((soma, n) => soma + n, 0) / valores.length;\nconsole.log("Media:", media);  // 8',
        description: 'Object.keys(), Object.values() e Object.entries() permitem percorrer objetos.',
      },
    },
    {
      type: 'text',
      content: '## JSON — Formato de dados da web\n\n**JSON** (JavaScript Object Notation) e o formato padrao para trocar dados na web. E basicamente um objeto JS salvo como texto. Toda API que voce vai consumir retorna JSON!\n\n- **`JSON.stringify(obj)`** — converte objeto para string JSON\n- **`JSON.parse(texto)`** — converte string JSON de volta para objeto',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'json_exemplo.js',
        code: 'const usuario = {\n    id: 1,\n    nome: "Raphael",\n    ativo: true,\n    tags: ["js", "python"]\n};\n\n// Objeto -> JSON (string)\nconst json = JSON.stringify(usuario);\nconsole.log(json);\n// {"id":1,"nome":"Raphael","ativo":true,"tags":["js","python"]}\n\n// JSON (string) -> Objeto\nconst recuperado = JSON.parse(json);\nconsole.log(recuperado.nome);    // Raphael\nconsole.log(recuperado.tags[0]); // js',
        description: 'JSON.stringify() e JSON.parse() convertem entre objetos e texto.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Quando voce fizer fetch() para uma API, a resposta vem como JSON. O metodo .json() que voce vai usar converte automaticamente a string JSON em objeto JavaScript para voce trabalhar!',
    },
  ],
  challenges: [
    {
      id: 'objetos-c1',
      title: 'Cadastro de Produto',
      description: 'Crie uma funcao que recebe nome, preco e quantidade e retorna um objeto produto. Adicione tambem um metodo valorTotal() que retorna preco * quantidade.',
      language: 'javascript',
      starterCode: 'function criarProduto(nome, preco, quantidade) {\n    // Retorne um objeto com: nome, preco, quantidade\n    // e um metodo valorTotal() que retorna preco * quantidade\n}\n\nconst p = criarProduto("Notebook", 2500, 3);\nconsole.log(p.nome);          // Notebook\nconsole.log(p.preco);         // 2500\nconsole.log(p.valorTotal());  // 7500',
      solution: 'function criarProduto(nome, preco, quantidade) {\n    return {\n        nome: nome,\n        preco: preco,\n        quantidade: quantidade,\n        valorTotal() {\n            return this.preco * this.quantidade;\n        }\n    };\n}\n\nconst p = criarProduto("Notebook", 2500, 3);\nconsole.log(p.nome);          // Notebook\nconsole.log(p.preco);         // 2500\nconsole.log(p.valorTotal());  // 7500',
      hints: ['Retorne um objeto literal com { nome, preco, quantidade, valorTotal() {} }.', 'Dentro do metodo valorTotal, use this.preco e this.quantidade.', 'Um metodo e uma funcao dentro do objeto: valorTotal() { return ... }'],
    },
    {
      id: 'objetos-c2',
      title: 'Filtrar Alunos Aprovados',
      description: 'Dado um array de objetos aluno (com nome e nota), retorne um array com apenas os nomes dos alunos aprovados (nota >= 6).',
      language: 'javascript',
      starterCode: 'function aprovados(alunos) {\n    // Retorne array com os NOMES dos alunos com nota >= 6\n}\n\nconst turma = [\n    { nome: "Ana", nota: 8 },\n    { nome: "Bruno", nota: 4 },\n    { nome: "Carla", nota: 9 },\n    { nome: "Diego", nota: 5 },\n    { nome: "Elena", nota: 7 }\n];\n\nconsole.log(aprovados(turma));\n// ["Ana", "Carla", "Elena"]',
      solution: 'function aprovados(alunos) {\n    return alunos\n        .filter(aluno => aluno.nota >= 6)\n        .map(aluno => aluno.nome);\n}\n\nconst turma = [\n    { nome: "Ana", nota: 8 },\n    { nome: "Bruno", nota: 4 },\n    { nome: "Carla", nota: 9 },\n    { nome: "Diego", nota: 5 },\n    { nome: "Elena", nota: 7 }\n];\n\nconsole.log(aprovados(turma));\n// ["Ana", "Carla", "Elena"]',
      hints: ['Use .filter() para pegar apenas alunos com nota >= 6.', 'Use .map() para transformar cada aluno em apenas seu nome.', 'Pode encadear: alunos.filter(...).map(...)'],
    },
    {
      id: 'objetos-c3',
      title: 'Converter para JSON e Voltar',
      description: 'Crie uma funcao que recebe um objeto, converte para JSON (string), depois converte de volta para objeto e retorna a propriedade solicitada. Isso simula o que acontece ao enviar/receber dados de uma API.',
      language: 'javascript',
      starterCode: 'function simularAPI(objeto, propriedade) {\n    // 1. Converta o objeto para JSON (string) com JSON.stringify\n    // 2. Converta de volta para objeto com JSON.parse\n    // 3. Retorne o valor da propriedade solicitada\n}\n\nconst dados = { nome: "Maria", idade: 30, cidade: "Rio" };\nconsole.log(simularAPI(dados, "nome"));   // Maria\nconsole.log(simularAPI(dados, "idade"));  // 30\nconsole.log(simularAPI(dados, "cidade")); // Rio',
      solution: 'function simularAPI(objeto, propriedade) {\n    const json = JSON.stringify(objeto);\n    const recuperado = JSON.parse(json);\n    return recuperado[propriedade];\n}\n\nconst dados = { nome: "Maria", idade: 30, cidade: "Rio" };\nconsole.log(simularAPI(dados, "nome"));   // Maria\nconsole.log(simularAPI(dados, "idade"));  // 30\nconsole.log(simularAPI(dados, "cidade")); // Rio',
      hints: ['Use JSON.stringify(objeto) para converter para string.', 'Use JSON.parse(json) para converter de volta para objeto.', 'Para acessar a propriedade dinamicamente, use recuperado[propriedade] com colchetes.'],
    },
  ],
};
