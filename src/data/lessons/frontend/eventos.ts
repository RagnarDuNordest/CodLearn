import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'eventos',
  moduleId: 'frontend',
  title: 'Eventos',
  description: 'Aprenda a reagir a acoes do usuario como cliques, digitacao e envio de formularios.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: '**Eventos** sao acoes que acontecem na pagina: um clique, uma tecla pressionada, o mouse passando sobre um elemento, um formulario sendo enviado. Com JavaScript, voce pode **escutar** esses eventos e **reagir** a eles.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'eventos_basicos.js',
        code: '// Escutar um clique\nconst botao = document.querySelector("#meu-botao");\n\nbotao.addEventListener("click", function() {\n    alert("Voce clicou!");\n});\n\n// Com arrow function\nbotao.addEventListener("click", () => {\n    console.log("Clique detectado!");\n});\n\n// Eventos comuns:\n// "click"      - clique do mouse\n// "dblclick"   - duplo clique\n// "mouseover"  - mouse sobre o elemento\n// "mouseout"   - mouse saiu do elemento\n// "keydown"    - tecla pressionada\n// "keyup"      - tecla solta\n// "submit"     - formulario enviado\n// "input"      - valor de input mudou',
        description: 'addEventListener e a forma principal de escutar eventos em JavaScript.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'evento_formulario.js',
        code: '// Capturar envio de formulario\nconst form = document.querySelector("#meu-form");\nconst input = document.querySelector("#nome-input");\nconst lista = document.querySelector("#lista-nomes");\n\nform.addEventListener("submit", (evento) => {\n    evento.preventDefault(); // Impede recarregar a pagina!\n\n    const nome = input.value;\n    if (nome.trim() !== "") {\n        const li = document.createElement("li");\n        li.textContent = nome;\n        lista.appendChild(li);\n        input.value = ""; // Limpa o campo\n    }\n});\n\n// Reagir a digitacao em tempo real\ninput.addEventListener("input", (e) => {\n    console.log("Digitando:", e.target.value);\n});',
        description: 'preventDefault() impede o comportamento padrao. e.target.value pega o valor do input.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**event.preventDefault()** e essencial em formularios! Sem ele, a pagina recarrega ao enviar o form. O objeto **event** (ou **e**) contem informacoes sobre o evento: qual tecla, posicao do mouse, qual elemento, etc.',
    },
    {
      type: 'text',
      content: 'Para eventos de teclado, use os eventos `"keydown"` (tecla pressionada) ou `"keyup"` (tecla solta). O objeto de evento contem a propriedade **`e.key`** com o nome da tecla pressionada (ex: `"Enter"`, `"Escape"`, `"a"`, `"ArrowUp"`).\n\nVoce tambem pode **remover** um ouvinte de evento com **`removeEventListener`**, passando o mesmo tipo de evento e a mesma funcao usada no `addEventListener`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'evento_teclado.js',
        code: '// Detectar teclas\ndocument.addEventListener("keydown", (e) => {\n    console.log("Tecla:", e.key);\n\n    if (e.key === "Enter") {\n        console.log("Enter pressionado!");\n    }\n\n    if (e.key === "Escape") {\n        console.log("Escapou!");\n    }\n});\n\n// Remover evento\nfunction handler() {\n    console.log("Clicou!");\n}\nbotao.addEventListener("click", handler);\nbotao.removeEventListener("click", handler);',
        description: 'Use e.key para saber qual tecla foi pressionada. removeEventListener remove o ouvinte.',
      },
    },
    {
      type: 'text',
      content: '## Delegacao de Eventos\n\nEm vez de adicionar um listener a cada elemento filho, voce pode adicionar **um unico listener no elemento pai** e verificar qual filho foi clicado. Isso se chama **delegacao de eventos** (event delegation).\n\nIsso e muito util para elementos criados dinamicamente — um listener no pai captura eventos de filhos que ainda nem existem!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'event_delegation.js',
        code: '// SEM delegacao: um listener por item (ruim para listas grandes)\ndocument.querySelectorAll(".item").forEach((item) => {\n    item.addEventListener("click", () => {\n        console.log("Clicou:", item.textContent);\n    });\n});\n\n// COM delegacao: um unico listener no pai\nconst lista = document.querySelector("#minha-lista");\n\nlista.addEventListener("click", (e) => {\n    // e.target e o elemento que foi clicado de fato\n    if (e.target.tagName === "LI") {\n        console.log("Clicou no item:", e.target.textContent);\n        e.target.classList.toggle("selecionado");\n    }\n});\n\n// Funciona ate para itens adicionados DEPOIS!\nconst novoItem = document.createElement("li");\nnovoItem.textContent = "Item novo";\nlista.appendChild(novoItem); // tambem responde ao clique',
        description: 'Delegacao de eventos: um listener no pai captura cliques em todos os filhos, inclusive os criados dinamicamente.',
      },
    },
    {
      type: 'text',
      content: '## Propriedades do Objeto de Evento\n\nO objeto `e` (ou `event`) passado para o handler contem informacoes detalhadas sobre o que aconteceu:\n\n**Mouse:**\n- **`e.clientX` / `e.clientY`** — Posicao do mouse na janela\n- **`e.target`** — Elemento onde o evento ocorreu\n- **`e.currentTarget`** — Elemento onde o listener foi registrado\n\n**Teclado:**\n- **`e.key`** — Nome legivel da tecla: `"Enter"`, `"Escape"`, `"a"`\n- **`e.ctrlKey`** / **`e.shiftKey`** / **`e.altKey`** — Teclas modificadoras pressionadas',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'propriedades_evento.js',
        code: '// Rastrear posicao do mouse\ndocument.addEventListener("mousemove", (e) => {\n    document.querySelector("#coords").textContent =\n        "X: " + e.clientX + " | Y: " + e.clientY;\n});\n\n// Combinacoes de teclas (atalhos)\ndocument.addEventListener("keydown", (e) => {\n    if (e.ctrlKey && e.key === "s") {\n        e.preventDefault(); // Bloqueia o dialogo de salvar do browser\n        console.log("Salvando...");\n    }\n\n    if (e.ctrlKey && e.key === "z") {\n        console.log("Desfazendo...");\n    }\n});\n\n// e.target vs e.currentTarget\nconst container = document.querySelector(".container");\ncontainer.addEventListener("click", (e) => {\n    console.log("Onde o listener esta:", e.currentTarget.id);\n    console.log("O que foi clicado:", e.target.tagName);\n});',
        description: 'Propriedades do evento para rastrear mouse, combinacoes de teclas e identificar elementos.',
      },
    },
  ],
  challenges: [
    {
      id: 'ev-c1',
      title: 'Contador de Cliques',
      description: 'Crie um contador que incrementa a cada clique em um botao e mostra o valor na tela.',
      language: 'javascript',
      starterCode: 'let contagem = 0;\nconst botao = document.querySelector("#btn-contar");\nconst display = document.querySelector("#contador");\n\n// Adicione um evento de clique que incrementa\n// a contagem e atualiza o display\n',
      solution: 'let contagem = 0;\nconst botao = document.querySelector("#btn-contar");\nconst display = document.querySelector("#contador");\n\nbotao.addEventListener("click", () => {\n    contagem++;\n    display.textContent = contagem;\n});',
      hints: ['Use addEventListener("click", ...)', 'Incremente a variavel contagem com ++', 'Atualize display.textContent com o novo valor'],
    },
    {
      id: 'ev-c2',
      title: 'Validacao de Formulario',
      description: 'Crie uma validacao que mostra mensagem de erro se o campo email estiver vazio ou nao conter @.',
      language: 'javascript',
      starterCode: 'const form = document.querySelector("#form-email");\nconst emailInput = document.querySelector("#email");\nconst erro = document.querySelector("#msg-erro");\n\nform.addEventListener("submit", (e) => {\n    e.preventDefault();\n\n    // Valide se o email nao esta vazio e contem @\n    // Mostre mensagem de erro ou sucesso\n});',
      solution: 'const form = document.querySelector("#form-email");\nconst emailInput = document.querySelector("#email");\nconst erro = document.querySelector("#msg-erro");\n\nform.addEventListener("submit", (e) => {\n    e.preventDefault();\n    const email = emailInput.value.trim();\n\n    if (email === "") {\n        erro.textContent = "O campo email e obrigatorio!";\n        erro.style.color = "red";\n    } else if (!email.includes("@")) {\n        erro.textContent = "Email invalido! Falta o @";\n        erro.style.color = "red";\n    } else {\n        erro.textContent = "Email valido!";\n        erro.style.color = "green";\n    }\n});',
      hints: ['Use e.preventDefault() para impedir o reload', 'Pegue o valor com emailInput.value.trim()', 'Use .includes("@") para verificar se contem @'],
    },
  ],
};
