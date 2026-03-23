import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-todo-list',
  moduleId: 'frontend',
  title: 'Projeto: Todo List',
  description: 'Construa uma aplicacao completa de lista de tarefas juntando tudo que aprendeu.',
  order: 8,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: 'Vamos juntar **tudo** que aprendemos para criar uma **Todo List** funcional: HTML para a estrutura, CSS para o visual, JavaScript para a interatividade, DOM para manipulacao, eventos para acoes do usuario e localStorage para persistencia.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'todo.html',
        code: '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <title>Minha Todo List</title>\n    <style>\n        body { font-family: sans-serif; max-width: 500px; margin: 50px auto; }\n        .todo-item { display: flex; align-items: center; padding: 8px; border-bottom: 1px solid #ddd; }\n        .todo-item.done { text-decoration: line-through; opacity: 0.5; }\n        .todo-text { flex: 1; margin-left: 8px; }\n        .btn-delete { background: #e74c3c; color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; }\n    </style>\n</head>\n<body>\n    <h1>Todo List</h1>\n    <form id="todo-form">\n        <input id="todo-input" type="text" placeholder="Nova tarefa...">\n        <button type="submit">Adicionar</button>\n    </form>\n    <div id="todo-list"></div>\n    <script src="todo.js"></script>\n</body>\n</html>',
        description: 'Estrutura HTML com formulario, lista e estilos basicos.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'todo.js',
        code: '// Estado da aplicacao\nlet tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];\n\n// Elementos do DOM\nconst form = document.querySelector("#todo-form");\nconst input = document.querySelector("#todo-input");\nconst lista = document.querySelector("#todo-list");\n\n// Renderizar tarefas na tela\nfunction renderizar() {\n    lista.innerHTML = "";\n    tarefas.forEach((tarefa, index) => {\n        const div = document.createElement("div");\n        div.className = "todo-item" + (tarefa.feita ? " done" : "");\n\n        const checkbox = document.createElement("input");\n        checkbox.type = "checkbox";\n        checkbox.checked = tarefa.feita;\n        checkbox.addEventListener("change", () => toggleTarefa(index));\n\n        const texto = document.createElement("span");\n        texto.className = "todo-text";\n        texto.textContent = tarefa.texto;\n\n        const btnDelete = document.createElement("button");\n        btnDelete.className = "btn-delete";\n        btnDelete.textContent = "X";\n        btnDelete.addEventListener("click", () => removerTarefa(index));\n\n        div.appendChild(checkbox);\n        div.appendChild(texto);\n        div.appendChild(btnDelete);\n        lista.appendChild(div);\n    });\n}',
        description: 'Funcao que cria os elementos HTML para cada tarefa dinamicamente.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'todo_acoes.js',
        code: '// Salvar no localStorage\nfunction salvar() {\n    localStorage.setItem("tarefas", JSON.stringify(tarefas));\n}\n\n// Adicionar tarefa\nform.addEventListener("submit", (e) => {\n    e.preventDefault();\n    const texto = input.value.trim();\n    if (texto) {\n        tarefas.push({ texto: texto, feita: false });\n        salvar();\n        renderizar();\n        input.value = "";\n    }\n});\n\n// Marcar como feita\nfunction toggleTarefa(index) {\n    tarefas[index].feita = !tarefas[index].feita;\n    salvar();\n    renderizar();\n}\n\n// Remover tarefa\nfunction removerTarefa(index) {\n    tarefas.splice(index, 1);\n    salvar();\n    renderizar();\n}\n\n// Renderizar ao carregar a pagina\nrenderizar();',
        description: 'Cada acao modifica o array, salva no localStorage e re-renderiza.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Padrao usado:** Estado (array) -> Acao (modifica array) -> Salvar (localStorage) -> Renderizar (DOM). Esse padrao de "source of truth" e a base de frameworks como React e Vue!',
    },
  ],
  challenges: [
    {
      id: 'todo-c1',
      title: 'Adicionar Data nas Tarefas',
      description: 'Modifique a Todo List para que cada tarefa salve a data em que foi criada e mostre na tela.',
      language: 'javascript',
      starterCode: '// Modifique a funcao de adicionar tarefa\n// para incluir a data de criacao\n\nform.addEventListener("submit", (e) => {\n    e.preventDefault();\n    const texto = input.value.trim();\n    if (texto) {\n        // Adicione um campo "criadaEm" com a data atual\n        tarefas.push({ texto: texto, feita: false });\n        salvar();\n        renderizar();\n        input.value = "";\n    }\n});',
      solution: 'form.addEventListener("submit", (e) => {\n    e.preventDefault();\n    const texto = input.value.trim();\n    if (texto) {\n        const agora = new Date();\n        const data = agora.toLocaleDateString("pt-BR");\n        tarefas.push({ texto: texto, feita: false, criadaEm: data });\n        salvar();\n        renderizar();\n        input.value = "";\n    }\n});',
      hints: ['Use new Date() para pegar a data atual', 'Use .toLocaleDateString("pt-BR") para formatar', 'Adicione o campo criadaEm ao objeto da tarefa'],
    },
    {
      id: 'todo-c2',
      title: 'Filtrar Tarefas',
      description: 'Adicione botoes para filtrar: Todas, Pendentes e Concluidas.',
      language: 'javascript',
      starterCode: 'let filtro = "todas"; // "todas", "pendentes", "concluidas"\n\nfunction renderizarFiltrado() {\n    let tarefasFiltradas;\n\n    // Filtre baseado no valor de filtro\n    // "todas" -> todas as tarefas\n    // "pendentes" -> tarefa.feita === false\n    // "concluidas" -> tarefa.feita === true\n\n    // Renderize tarefasFiltradas no DOM\n}',
      solution: 'let filtro = "todas";\n\nfunction renderizarFiltrado() {\n    let tarefasFiltradas;\n\n    if (filtro === "pendentes") {\n        tarefasFiltradas = tarefas.filter((t) => !t.feita);\n    } else if (filtro === "concluidas") {\n        tarefasFiltradas = tarefas.filter((t) => t.feita);\n    } else {\n        tarefasFiltradas = tarefas;\n    }\n\n    lista.innerHTML = "";\n    tarefasFiltradas.forEach((tarefa, index) => {\n        const div = document.createElement("div");\n        div.className = "todo-item" + (tarefa.feita ? " done" : "");\n        div.textContent = tarefa.texto;\n        lista.appendChild(div);\n    });\n}\n\n// Botoes de filtro\ndocument.querySelector("#btn-todas").addEventListener("click", () => {\n    filtro = "todas";\n    renderizarFiltrado();\n});',
      hints: ['Use .filter() para filtrar o array de tarefas', 'Filtre por tarefa.feita === true ou false', 'Mude a variavel filtro e re-renderize'],
    },
  ],
};
