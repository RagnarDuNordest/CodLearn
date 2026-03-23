import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-frontend',
  moduleId: 'frontend',
  title: 'Projeto: Lista de Tarefas Dinâmica',
  description:
    'Construa uma To-Do List completa com JavaScript puro: DOM, eventos, localStorage e manipulação de elementos — o clássico projeto que todo dev front-end já fez.',
  order: 9,
  estimatedMinutes: 45,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-frontend',
    title: 'To-Do List com JavaScript Puro',
    language: 'javascript',
    scenario:
      'Você está construindo um app de produtividade como freelancer. O cliente quer uma lista de tarefas simples que funcione no browser, salve as tarefas no localStorage e permita marcar como concluída ou deletar.',
    objective:
      'Criar uma To-Do List completa com HTML + CSS + JavaScript: adicionar, completar e deletar tarefas, com persistência em localStorage.',
    steps: [
      {
        id: 'gp-front-s1',
        title: 'HTML + CSS da interface',
        description:
          'Crie o HTML com: input de texto, botão "Adicionar" e uma lista vazia (<ul id="lista">). Adicione CSS básico para centralizar e estilizar.',
        starterCode:
          '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <title>Lista de Tarefas</title>\n    <style>\n        body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 0 20px; }\n        h1 { text-align: center; color: #1a1a2e; }\n        .input-area { display: flex; gap: 8px; margin: 24px 0; }\n        input { flex: 1; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem; }\n        button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; }\n        /* Estilize: ul (sem bullets), li (padding, borda, flex), .concluida (riscado) */\n    </style>\n</head>\n<body>\n    <h1>Minhas Tarefas</h1>\n    <div class="input-area">\n        <input type="text" id="inputTarefa" placeholder="Nova tarefa...">\n        <button onclick="adicionarTarefa()">Adicionar</button>\n    </div>\n    <ul id="lista"></ul>\n    <script>\n        // JavaScript na proxima etapa\n    </script>\n</body>\n</html>\n',
        solution:
          '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <title>Lista de Tarefas</title>\n    <style>\n        body { font-family: sans-serif; max-width: 500px; margin: 40px auto; padding: 0 20px; }\n        h1 { text-align: center; color: #1a1a2e; }\n        .input-area { display: flex; gap: 8px; margin: 24px 0; }\n        input { flex: 1; padding: 10px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 1rem; }\n        button { padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 8px; cursor: pointer; }\n        ul { list-style: none; padding: 0; }\n        li { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px; }\n        .concluida { text-decoration: line-through; color: #a0aec0; }\n        .btn-del { background: #ef4444; padding: 4px 10px; font-size: 0.8rem; }\n    </style>\n</head>\n<body>\n    <h1>Minhas Tarefas</h1>\n    <div class="input-area">\n        <input type="text" id="inputTarefa" placeholder="Nova tarefa...">\n        <button onclick="adicionarTarefa()">Adicionar</button>\n    </div>\n    <ul id="lista"></ul>\n</body>\n</html>',
        hints: [
          'list-style: none remove os bullets da <ul>.',
          'display: flex; justify-content: space-between alinha o texto à esquerda e o botão à direita.',
          '.concluida { text-decoration: line-through } risca o texto.',
        ],
        testCases: [
          { description: 'Página deve ter input, botão "Adicionar" e <ul id="lista">', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-front-s2',
        title: 'Adicionar e deletar tarefas com JavaScript',
        description:
          'Implemente adicionarTarefa(): cria um <li> com o texto, um botão "Concluir" e um botão "Deletar". Clicar em Deletar remove o item. Clicar em Concluir adiciona/remove a classe .concluida.',
        starterCode:
          '<script>\nfunction adicionarTarefa() {\n    const input = document.getElementById("inputTarefa");\n    const texto = input.value.trim();\n    if (texto === "") return;\n\n    const lista = document.getElementById("lista");\n    const li = document.createElement("li");\n\n    // Crie um span com o texto\n    // Crie botao "Concluir" que toggle a classe .concluida no li\n    // Crie botao "Deletar" que remove o li\n    // Adicione span e botoes ao li\n    // Adicione li a lista\n\n    input.value = "";\n}\n</script>\n',
        solution:
          '<script>\nfunction adicionarTarefa() {\n    const input = document.getElementById("inputTarefa");\n    const texto = input.value.trim();\n    if (texto === "") return;\n    const lista = document.getElementById("lista");\n    const li = document.createElement("li");\n    const span = document.createElement("span");\n    span.textContent = texto;\n    const btnConcluir = document.createElement("button");\n    btnConcluir.textContent = "Concluir";\n    btnConcluir.onclick = () => li.classList.toggle("concluida");\n    const btnDeletar = document.createElement("button");\n    btnDeletar.textContent = "Deletar";\n    btnDeletar.className = "btn-del";\n    btnDeletar.onclick = () => lista.removeChild(li);\n    li.appendChild(span);\n    li.appendChild(btnConcluir);\n    li.appendChild(btnDeletar);\n    lista.appendChild(li);\n    input.value = "";\n}\n</script>',
        hints: [
          'document.createElement("li") cria um elemento HTML.',
          'li.classList.toggle("concluida") adiciona/remove a classe.',
          'lista.removeChild(li) remove o item da lista.',
        ],
        testCases: [
          { description: 'Clicar em Adicionar cria um <li> com o texto; Deletar remove; Concluir risca', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-front-s3',
        title: 'Salvar tarefas no localStorage',
        description:
          'Adicione persistência: ao criar/deletar/concluir uma tarefa, salve o estado no localStorage. Ao carregar a página, restaure as tarefas salvas.',
        starterCode:
          '<script>\nlet tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];\n\nfunction salvar() {\n    // Percorra todos os <li> e salve {texto, concluida} no array tarefas\n    // localStorage.setItem("tarefas", JSON.stringify(tarefas))\n}\n\nfunction renderizar() {\n    // Limpe a lista e recrie todos os itens a partir do array tarefas\n}\n\nfunction adicionarTarefa() {\n    const input = document.getElementById("inputTarefa");\n    const texto = input.value.trim();\n    if (texto === "") return;\n    tarefas.push({ texto, concluida: false });\n    salvar();\n    renderizar();\n    input.value = "";\n}\n\n// Chame renderizar() ao carregar a pagina\nrenderizar();\n</script>\n',
        solution:
          '<script>\nlet tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];\n\nfunction salvar() {\n    localStorage.setItem("tarefas", JSON.stringify(tarefas));\n}\n\nfunction renderizar() {\n    const lista = document.getElementById("lista");\n    lista.innerHTML = "";\n    tarefas.forEach((t, i) => {\n        const li = document.createElement("li");\n        if (t.concluida) li.classList.add("concluida");\n        const span = document.createElement("span");\n        span.textContent = t.texto;\n        const btnC = document.createElement("button");\n        btnC.textContent = "Concluir";\n        btnC.onclick = () => { tarefas[i].concluida = !tarefas[i].concluida; salvar(); renderizar(); };\n        const btnD = document.createElement("button");\n        btnD.textContent = "Deletar";\n        btnD.className = "btn-del";\n        btnD.onclick = () => { tarefas.splice(i, 1); salvar(); renderizar(); };\n        li.append(span, btnC, btnD);\n        lista.appendChild(li);\n    });\n}\n\nfunction adicionarTarefa() {\n    const input = document.getElementById("inputTarefa");\n    const texto = input.value.trim();\n    if (!texto) return;\n    tarefas.push({ texto, concluida: false });\n    salvar();\n    renderizar();\n    input.value = "";\n}\n\nrenderizar();\n</script>',
        hints: [
          'localStorage.setItem("key", JSON.stringify(dados)) salva.',
          'JSON.parse(localStorage.getItem("key")) || [] carrega ou retorna array vazio.',
          'lista.innerHTML = "" limpa a lista antes de re-renderizar.',
        ],
        testCases: [
          { description: 'Tarefas persistem após recarregar a página (F5)', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
