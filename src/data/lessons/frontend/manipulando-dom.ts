import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'manipulando-dom',
  moduleId: 'frontend',
  title: 'Manipulando o DOM',
  description: 'Aprenda a selecionar e modificar elementos HTML com JavaScript.',
  order: 4,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'O **DOM** (Document Object Model) e a representacao da pagina HTML como uma arvore de objetos. Com JavaScript, voce pode **selecionar**, **modificar**, **criar** e **remover** elementos da pagina em tempo real.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'selecionar.js',
        code: '// Selecionar por ID\nconst titulo = document.getElementById("meu-titulo");\n\n// Selecionar por classe (retorna lista)\nconst items = document.getElementsByClassName("item");\n\n// Selecionar com CSS (mais moderno e recomendado)\nconst botao = document.querySelector(".btn-principal");\nconst todosOsBotoes = document.querySelectorAll(".btn");\n\n// querySelector usa seletores CSS!\nconst primeiro = document.querySelector("#lista li:first-child");',
        description: 'querySelector e querySelectorAll sao os mais usados por aceitarem qualquer seletor CSS.',
      },
    },
    {
      type: 'text',
      content: 'Apos selecionar um elemento, voce pode **modificar** seu conteudo, estilos e classes CSS:\n\n- **`.textContent`** — Define ou le o texto de um elemento (sem HTML)\n- **`.innerHTML`** — Define ou le o conteudo HTML interno de um elemento\n- **`.style.propriedade`** — Acessa estilos CSS diretamente (use camelCase: `fontSize`, nao `font-size`)\n- **`.classList.add(classe)`** — Adiciona uma classe CSS ao elemento\n- **`.classList.remove(classe)`** — Remove uma classe CSS do elemento\n- **`.classList.toggle(classe)`** — Adiciona se nao tem, remove se tem',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'modificar.js',
        code: '// Mudar texto\nconst titulo = document.querySelector("h1");\ntitulo.textContent = "Novo Titulo";\n\n// Mudar HTML interno\nconst div = document.querySelector(".conteudo");\ndiv.innerHTML = "<p>Novo <strong>conteudo</strong></p>";\n\n// Mudar estilos\ntitulo.style.color = "blue";\ntitulo.style.fontSize = "24px";\n\n// Adicionar/remover classes CSS\ntitulo.classList.add("destaque");\ntitulo.classList.remove("oculto");\ntitulo.classList.toggle("ativo"); // adiciona se nao tem, remove se tem',
        description: 'textContent muda texto puro. innerHTML aceita HTML. classList manipula classes CSS.',
      },
    },
    {
      type: 'text',
      content: 'Voce tambem pode **criar**, **inserir** e **remover** elementos dinamicamente:\n\n- **`document.createElement(tag)`** — Cria um novo elemento HTML (ainda nao esta na pagina)\n- **`.appendChild(elemento)`** — Insere o elemento como ultimo filho do elemento pai\n- **`.remove()`** — Remove o elemento do DOM\n- **`.setAttribute(nome, valor)`** — Define um atributo HTML (como `href`, `src`, `id`)\n- **`.getAttribute(nome)`** — Le o valor de um atributo HTML',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'criar_elementos.js',
        code: '// Criar um novo elemento\nconst novoItem = document.createElement("li");\nnovoItem.textContent = "Item novo";\nnovoItem.classList.add("item");\n\n// Adicionar ao DOM\nconst lista = document.querySelector("ul");\nlista.appendChild(novoItem);\n\n// Remover elemento\nconst itemAntigo = document.querySelector(".remover");\nitemAntigo.remove();\n\n// Mudar atributos\nconst link = document.querySelector("a");\nlink.setAttribute("href", "https://exemplo.com");\nlink.getAttribute("href");',
        description: 'createElement cria, appendChild adiciona, remove() deleta elementos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Cuidado com innerHTML!** Inserir HTML de fontes nao confiaveis pode causar vulnerabilidades XSS. Prefira **textContent** para texto puro.',
    },
    {
      type: 'text',
      content: '## Navegando pela Arvore DOM\n\nAlm de selecionar elementos por CSS, voce pode navegar pela estrutura do DOM usando as **propriedades de relacao**:\n\n- **`elemento.parentElement`** — Elemento pai\n- **`elemento.children`** — Filhos diretos (so elementos HTML)\n- **`elemento.firstElementChild`** / **`lastElementChild`** — Primeiro/ultimo filho\n- **`elemento.nextElementSibling`** / **`previousElementSibling`** — Irmaos adjacentes\n- **`elemento.closest(seletor)`** — Sobe na arvore ate encontrar o ancestral que bate com o seletor',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'traversal.js',
        code: '// Dado: <ul id="lista"><li>A</li><li id="meio">B</li><li>C</li></ul>\nconst itemMeio = document.querySelector("#meio");\n\nconsole.log(itemMeio.parentElement);         // <ul id="lista">\nconsole.log(itemMeio.nextElementSibling);    // <li>C</li>\nconsole.log(itemMeio.previousElementSibling);// <li>A</li>\n\nconst lista = document.querySelector("#lista");\nconsole.log(lista.children);          // HTMLCollection [li, li, li]\nconsole.log(lista.firstElementChild); // <li>A</li>\nconsole.log(lista.lastElementChild);  // <li>C</li>\n\n// closest: busca o ancestral mais proximo\nconst botao = document.querySelector(".btn-deletar");\nbotao.addEventListener("click", () => {\n    const cartao = botao.closest(".cartao"); // Sobe ate achar .cartao\n    cartao.remove();\n});',
        description: 'Navegando pela arvore DOM com parentElement, children, siblings e closest.',
      },
    },
    {
      type: 'text',
      content: '## Insercao Moderna: insertAdjacentHTML\n\nAlm de `appendChild`, ha formas mais flexiveis de inserir elementos:\n\n- **`insertAdjacentHTML(posicao, html)`** — Insere HTML em uma posicao especifica\n  - `"beforebegin"` — antes do elemento\n  - `"afterbegin"` — dentro, no inicio\n  - `"beforeend"` — dentro, no final (equivale a appendChild)\n  - `"afterend"` — apos o elemento\n- **`prepend(...nodes)`** — Insere no inicio de um elemento\n- **`before(...nodes)` / `after(...nodes)`** — Insere antes/depois do elemento',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'insercao_moderna.js',
        code: '// insertAdjacentHTML: insere HTML em qualquer posicao\nconst lista = document.querySelector("ul");\n\n// Adiciona no final da lista\nlista.insertAdjacentHTML("beforeend", "<li>Novo item no final</li>");\n\n// Adiciona no inicio da lista\nlista.insertAdjacentHTML("afterbegin", "<li>Novo item no inicio</li>");\n\n// prepend e append\nconst div = document.querySelector(".container");\ndiv.prepend("Texto no inicio"); // tambem aceita texto puro\ndiv.append(document.createElement("hr")); // adiciona uma linha\n\n// Modificar atributos de forma completa\nconst img = document.querySelector("img");\nimg.setAttribute("src", "nova-foto.jpg");\nimg.setAttribute("alt", "Descricao da foto");\nimg.setAttribute("width", "300");\n\n// dataset: atributos data-* para guardar dados\nconst card = document.querySelector(".card");\ncard.dataset.userId = "42";       // data-user-id="42"\ncard.dataset.categoria = "tech"; // data-categoria="tech"\nconsole.log(card.dataset.userId); // "42"',
        description: 'insertAdjacentHTML, prepend/append e manipulacao de atributos e dataset.',
      },
    },
  ],
  challenges: [
    {
      id: 'dom-c1',
      title: 'Mudar Cores Dinamicamente',
      description: 'Escreva um codigo que seleciona todos os paragrafos da pagina e muda a cor de cada um para uma cor diferente.',
      language: 'javascript',
      starterCode: '// Selecione todos os paragrafos\nconst paragrafos = document.querySelectorAll("p");\nconst cores = ["red", "blue", "green", "purple", "orange"];\n\n// Percorra os paragrafos e mude a cor de cada um\n',
      solution: 'const paragrafos = document.querySelectorAll("p");\nconst cores = ["red", "blue", "green", "purple", "orange"];\n\nparagrafos.forEach((p, index) => {\n    p.style.color = cores[index % cores.length];\n});',
      hints: ['Use forEach para percorrer os paragrafos', 'Use o index e o operador % para ciclar pelas cores', 'Mude a cor com elemento.style.color'],
    },
    {
      id: 'dom-c2',
      title: 'Criador de Lista',
      description: 'Crie uma funcao que recebe um array de textos e gera uma lista HTML (<ul> com <li>) no DOM.',
      language: 'javascript',
      starterCode: 'function criarLista(itens) {\n    const ul = document.createElement("ul");\n\n    // Para cada item, crie um <li> e adicione ao <ul>\n\n    document.body.appendChild(ul);\n}\n\ncriarLista(["HTML", "CSS", "JavaScript"]);',
      solution: 'function criarLista(itens) {\n    const ul = document.createElement("ul");\n\n    itens.forEach((texto) => {\n        const li = document.createElement("li");\n        li.textContent = texto;\n        ul.appendChild(li);\n    });\n\n    document.body.appendChild(ul);\n}\n\ncriarLista(["HTML", "CSS", "JavaScript"]);',
      hints: ['Use document.createElement("li") para cada item', 'Defina o texto com li.textContent', 'Adicione cada li ao ul com appendChild'],
    },
  ],
};
