import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'armazenamento-local',
  moduleId: 'frontend',
  title: 'Armazenamento Local',
  description: 'Aprenda a salvar dados no navegador com localStorage e sessionStorage.',
  order: 7,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'O **localStorage** permite salvar dados no navegador do usuario que **persistem** mesmo apos fechar a pagina. E perfeito para salvar preferencias, dados de formularios e estado da aplicacao.\n\nJa o **sessionStorage** funciona igual, mas os dados sao **apagados** quando a aba e fechada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'localStorage_basico.js',
        code: '// Salvar dados\nlocalStorage.setItem("nome", "Raphael");\nlocalStorage.setItem("tema", "dark");\nlocalStorage.setItem("idade", "20");\n\n// Ler dados\nconst nome = localStorage.getItem("nome");\nconsole.log(nome); // "Raphael"\n\n// Remover um item\nlocalStorage.removeItem("idade");\n\n// Limpar tudo\nlocalStorage.clear();',
        description: 'setItem salva, getItem le, removeItem remove, clear limpa tudo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Importante:** localStorage so armazena **strings**! Para salvar objetos ou arrays, use **JSON.stringify()** para salvar e **JSON.parse()** para ler.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'localStorage_json.js',
        code: '// Salvar um objeto\nconst usuario = {\n    nome: "Raphael",\n    curso: "Eng. Computacao",\n    notas: [8, 9, 7, 10]\n};\n\nlocalStorage.setItem("usuario", JSON.stringify(usuario));\n\n// Ler o objeto\nconst dados = JSON.parse(localStorage.getItem("usuario"));\nconsole.log(dados.nome);   // "Raphael"\nconsole.log(dados.notas);  // [8, 9, 7, 10]\n\n// Salvar array\nconst tarefas = ["Estudar JS", "Fazer exercicio", "Ler livro"];\nlocalStorage.setItem("tarefas", JSON.stringify(tarefas));\n\n// Ler array\nconst minhasTarefas = JSON.parse(localStorage.getItem("tarefas"));\nconsole.log(minhasTarefas); // ["Estudar JS", ...]',
        description: 'JSON.stringify converte para string. JSON.parse converte de volta para objeto/array.',
      },
    },
    {
      type: 'text',
      content: 'Veja um exemplo pratico que combina localStorage com eventos do DOM para salvar e restaurar automaticamente o tema da pagina entre visitas:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'exemplo_pratico.js',
        code: '// Exemplo: salvar tema preferido\nfunction salvarTema(tema) {\n    localStorage.setItem("tema", tema);\n    document.body.className = tema;\n}\n\nfunction carregarTema() {\n    const tema = localStorage.getItem("tema") || "light";\n    document.body.className = tema;\n}\n\n// Carrega o tema salvo ao abrir a pagina\ncarregarTema();\n\n// Botao para alternar tema\ndocument.querySelector("#btn-tema").addEventListener("click", () => {\n    const temaAtual = localStorage.getItem("tema") || "light";\n    const novoTema = temaAtual === "light" ? "dark" : "light";\n    salvarTema(novoTema);\n});',
        description: 'Exemplo real: o CodLearn usa localStorage para salvar seu progresso!',
      },
    },
    {
      type: 'text',
      content: '## localStorage vs sessionStorage vs Cookies\n\n| Caracteristica | localStorage | sessionStorage | Cookies |\n|---|---|---|---|\n| **Duracao** | Permanente | Ate fechar a aba | Configuravel |\n| **Capacidade** | ~5-10 MB | ~5-10 MB | ~4 KB |\n| **Enviado ao servidor** | Nao | Nao | Sim (automaticamente) |\n| **Escopo** | Toda a origem | Aba atual | Configuravel |\n\nUse **localStorage** para dados que precisam persistir entre visitas (preferencias, historico). Use **sessionStorage** para dados temporarios validos apenas na sessao atual (formularios em multiplas etapas). **Cookies** sao mais usados pelo servidor para autenticacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'sessionstorage.js',
        code: '// sessionStorage tem a mesma API que localStorage\n// mas os dados somem quando a aba e fechada\n\n// Salvar dados de um formulario multi-etapas\nsessionStorage.setItem("passo1", JSON.stringify({ nome: "Ana", email: "ana@ex.com" }));\nsessionStorage.setItem("passo2", JSON.stringify({ plano: "premium" }));\n\n// Ler na proxima etapa\nconst passo1 = JSON.parse(sessionStorage.getItem("passo1"));\nconsole.log("Nome:", passo1.nome);\n\n// Verificar espaco usado (aproximado)\nfunction tamanhoDoStorage() {\n    let total = 0;\n    for (const chave in localStorage) {\n        if (localStorage.hasOwnProperty(chave)) {\n            total += localStorage.getItem(chave).length + chave.length;\n        }\n    }\n    return (total * 2 / 1024).toFixed(2) + " KB";\n}\nconsole.log("Espaco usado:", tamanhoDoStorage());\n\n// Iterar sobre todos os itens do localStorage\nfor (let i = 0; i < localStorage.length; i++) {\n    const chave = localStorage.key(i);\n    const valor = localStorage.getItem(chave);\n    console.log(chave, "->", valor);\n}',
        description: 'sessionStorage funciona como localStorage, mas os dados somem ao fechar a aba.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Nunca salve dados sensiveis** como senhas, tokens de autenticacao importantes ou CPF no localStorage! Qualquer JavaScript na pagina pode acessar esses dados (vulnerabilidade XSS). Use cookies HttpOnly gerenciados pelo servidor para dados de autenticacao.',
    },
  ],
  challenges: [
    {
      id: 'stor-c1',
      title: 'Lembrar Nome do Usuario',
      description: 'Crie um sistema que pede o nome na primeira visita e salva no localStorage. Na proxima visita, exibe "Bem-vindo de volta, Nome!".',
      language: 'javascript',
      starterCode: 'function verificarUsuario() {\n    const nomeSalvo = localStorage.getItem("nomeUsuario");\n\n    if (nomeSalvo) {\n        // Mostre mensagem de boas-vindas\n    } else {\n        // Peca o nome e salve\n    }\n}\n\nverificarUsuario();',
      solution: 'function verificarUsuario() {\n    const nomeSalvo = localStorage.getItem("nomeUsuario");\n\n    if (nomeSalvo) {\n        console.log("Bem-vindo de volta, " + nomeSalvo + "!");\n    } else {\n        const nome = prompt("Qual e o seu nome?");\n        if (nome) {\n            localStorage.setItem("nomeUsuario", nome);\n            console.log("Ola, " + nome + "! Seu nome foi salvo.");\n        }\n    }\n}\n\nverificarUsuario();',
      hints: ['Use getItem para verificar se ja existe', 'Use prompt() para pedir o nome', 'Use setItem para salvar o nome digitado'],
    },
    {
      id: 'stor-c2',
      title: 'Lista de Favoritos',
      description: 'Crie funcoes para adicionar, listar e remover itens de uma lista de favoritos salva no localStorage.',
      language: 'javascript',
      starterCode: 'function getFavoritos() {\n    // Retorne o array de favoritos do localStorage\n    // Se nao existir, retorne array vazio\n}\n\nfunction adicionarFavorito(item) {\n    // Adicione item ao array e salve\n}\n\nfunction removerFavorito(item) {\n    // Remova item do array e salve\n}\n\nadicionarFavorito("JavaScript");\nadicionarFavorito("Python");\nconsole.log(getFavoritos());',
      solution: 'function getFavoritos() {\n    const dados = localStorage.getItem("favoritos");\n    return dados ? JSON.parse(dados) : [];\n}\n\nfunction adicionarFavorito(item) {\n    const favoritos = getFavoritos();\n    if (!favoritos.includes(item)) {\n        favoritos.push(item);\n        localStorage.setItem("favoritos", JSON.stringify(favoritos));\n    }\n}\n\nfunction removerFavorito(item) {\n    const favoritos = getFavoritos().filter((f) => f !== item);\n    localStorage.setItem("favoritos", JSON.stringify(favoritos));\n}\n\nadicionarFavorito("JavaScript");\nadicionarFavorito("Python");\nconsole.log(getFavoritos());',
      hints: ['Use JSON.parse e JSON.stringify para converter', 'Verifique se o item ja existe com .includes()', 'Use .filter() para remover um item do array'],
    },
  ],
};
