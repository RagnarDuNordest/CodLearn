import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'fetch-api',
  moduleId: 'frontend',
  title: 'Fetch API',
  description: 'Aprenda a consumir APIs REST e buscar dados externos com JavaScript.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'A **Fetch API** permite que seu site busque dados de servidores externos. E assim que aplicacoes web modernas funcionam: o frontend busca dados de uma API e exibe na tela, sem recarregar a pagina.\n\nA fetch retorna uma **Promise** - um objeto que representa uma operacao assincrona (que demora para completar).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'fetch_basico.js',
        code: '// Buscar dados de uma API\nfetch("https://jsonplaceholder.typicode.com/users/1")\n    .then((resposta) => resposta.json())\n    .then((dados) => {\n        console.log("Nome:", dados.name);\n        console.log("Email:", dados.email);\n    })\n    .catch((erro) => {\n        console.error("Erro:", erro);\n    });',
        description: 'fetch() faz a requisicao, .then() processa a resposta, .catch() trata erros.',
      },
    },
    {
      type: 'text',
      content: 'A forma mais moderna e usar **async/await**, que torna o codigo mais legivel:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'async_await.js',
        code: '// Forma moderna com async/await\nasync function buscarUsuario(id) {\n    try {\n        const resposta = await fetch(\n            "https://jsonplaceholder.typicode.com/users/" + id\n        );\n\n        if (!resposta.ok) {\n            throw new Error("Erro na requisicao");\n        }\n\n        const dados = await resposta.json();\n        console.log("Nome:", dados.name);\n        return dados;\n    } catch (erro) {\n        console.error("Falha:", erro.message);\n    }\n}\n\nbuscarUsuario(1);',
        description: 'async/await torna codigo assincrono mais legivel. await "espera" a resposta.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'fetch_na_tela.js',
        code: '// Buscar e mostrar na pagina\nasync function carregarPosts() {\n    const lista = document.querySelector("#posts");\n    lista.innerHTML = "Carregando...";\n\n    try {\n        const resp = await fetch(\n            "https://jsonplaceholder.typicode.com/posts?_limit=5"\n        );\n        const posts = await resp.json();\n\n        lista.innerHTML = "";\n        posts.forEach((post) => {\n            const div = document.createElement("div");\n            div.innerHTML = "<h3>" + post.title + "</h3>" +\n                "<p>" + post.body + "</p>";\n            lista.appendChild(div);\n        });\n    } catch (erro) {\n        lista.innerHTML = "Erro ao carregar posts.";\n    }\n}\n\ncarregarPosts();',
        description: 'Busque dados da API e insira no DOM para o usuario ver.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '**Verbos HTTP:** GET (buscar dados), POST (criar), PUT (atualizar tudo), PATCH (atualizar parte), DELETE (remover). O fetch usa GET por padrao.',
    },
    {
      type: 'text',
      content: '## Enviando Dados: POST, PUT e DELETE\n\nPara enviar dados para uma API, voce precisa configurar o fetch com um objeto de opcoes:\n\n- **`method`** — O verbo HTTP: `"POST"`, `"PUT"`, `"PATCH"`, `"DELETE"`\n- **`headers`** — Cabecalhos HTTP, como o tipo do conteudo\n- **`body`** — O corpo da requisicao. Use `JSON.stringify()` para enviar objetos\n\nA header `"Content-Type": "application/json"` avisa o servidor que o corpo e JSON.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'fetch_post.js',
        code: '// POST: criar um recurso\nasync function criarPost(titulo, corpo) {\n    const resposta = await fetch(\n        "https://jsonplaceholder.typicode.com/posts",\n        {\n            method: "POST",\n            headers: {\n                "Content-Type": "application/json",\n            },\n            body: JSON.stringify({\n                title: titulo,\n                body: corpo,\n                userId: 1,\n            }),\n        }\n    );\n\n    const novoPost = await resposta.json();\n    console.log("Post criado com ID:", novoPost.id);\n    return novoPost;\n}\n\n// PUT: atualizar um recurso\nasync function atualizarPost(id, novosDados) {\n    const resp = await fetch(\n        "https://jsonplaceholder.typicode.com/posts/" + id,\n        {\n            method: "PUT",\n            headers: { "Content-Type": "application/json" },\n            body: JSON.stringify(novosDados),\n        }\n    );\n    return resp.json();\n}\n\n// DELETE: remover um recurso\nasync function deletarPost(id) {\n    const resp = await fetch(\n        "https://jsonplaceholder.typicode.com/posts/" + id,\n        { method: "DELETE" }\n    );\n    console.log("Deletado. Status:", resp.status); // 200\n}\n\ncriarPost("Meu Titulo", "Conteudo do post");',
        description: 'Enviando dados com POST (criar), PUT (atualizar) e DELETE (remover).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Tratando erros HTTP:** `fetch()` nao lanca erro automaticamente para status 4xx/5xx — ela so lanca erro em falha de rede. Sempre verifique `resposta.ok` (true se status e 200-299) ou `resposta.status` para tratar erros da API.',
    },
  ],
  challenges: [
    {
      id: 'fetch-c1',
      title: 'Buscador de CEP',
      description: 'Use a API ViaCEP (viacep.com.br/ws/XXXXX/json/) para buscar informacoes de um CEP e mostrar na tela.',
      language: 'javascript',
      starterCode: 'async function buscarCEP(cep) {\n    // Faca fetch para:\n    // "https://viacep.com.br/ws/" + cep + "/json/"\n    // Retorne os dados (logradouro, bairro, localidade)\n}\n\nbuscarCEP("01001000").then((dados) => {\n    console.log(dados);\n});',
      solution: 'async function buscarCEP(cep) {\n    try {\n        const resp = await fetch(\n            "https://viacep.com.br/ws/" + cep + "/json/"\n        );\n        const dados = await resp.json();\n        console.log("Rua:", dados.logradouro);\n        console.log("Bairro:", dados.bairro);\n        console.log("Cidade:", dados.localidade);\n        return dados;\n    } catch (erro) {\n        console.error("Erro ao buscar CEP:", erro);\n    }\n}\n\nbuscarCEP("01001000").then((dados) => {\n    console.log(dados);\n});',
      hints: ['Use fetch() com a URL da API + o CEP', 'Converta a resposta com .json()', 'Os campos sao: logradouro, bairro, localidade, uf'],
    },
    {
      id: 'fetch-c2',
      title: 'Lista de Usuarios',
      description: 'Busque uma lista de usuarios da API jsonplaceholder e crie cards HTML para cada um mostrando nome e email.',
      language: 'javascript',
      starterCode: 'async function carregarUsuarios() {\n    const container = document.querySelector("#usuarios");\n\n    // Busque de:\n    // "https://jsonplaceholder.typicode.com/users"\n    // Para cada usuario, crie um div com nome e email\n}\n\ncarregarUsuarios();',
      solution: 'async function carregarUsuarios() {\n    const container = document.querySelector("#usuarios");\n\n    try {\n        const resp = await fetch(\n            "https://jsonplaceholder.typicode.com/users"\n        );\n        const usuarios = await resp.json();\n\n        usuarios.forEach((user) => {\n            const div = document.createElement("div");\n            div.innerHTML = "<strong>" + user.name + "</strong>" +\n                "<br>Email: " + user.email;\n            container.appendChild(div);\n        });\n    } catch (erro) {\n        container.textContent = "Erro ao carregar.";\n    }\n}\n\ncarregarUsuarios();',
      hints: ['Use await fetch() para buscar os dados', 'O resultado e um array de objetos com name e email', 'Use forEach para criar um elemento para cada usuario'],
    },
  ],
};
