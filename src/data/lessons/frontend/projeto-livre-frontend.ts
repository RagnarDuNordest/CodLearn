import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-frontend',
  moduleId: 'frontend',
  title: 'Projeto Livre: Buscador de Filmes',
  description:
    'Construa um buscador de filmes que consome a API do OMDb em tempo real — o tipo de projeto que aparece em todo portfólio de frontend.',
  order: 10,
  estimatedMinutes: 50,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-frontend',
    title: 'Buscador de Filmes com API',
    language: 'javascript',
    scenario:
      'Você está montando seu portfólio como desenvolvedor frontend. Um buscador de filmes é um projeto clássico que demonstra: consumo de API, manipulação de DOM, eventos e CSS responsivo.',
    objective:
      'Criar uma página que busca filmes na API do OMDb, exibe os resultados em cards e mostra os detalhes ao clicar.',
    requirements: [
      'Input de busca + botão que chama a API: https://www.omdbapi.com/?apikey=<sua_key>&s=<titulo>',
      'Exibir resultados em cards com: pôster, título e ano',
      'Ao clicar em um card, buscar os detalhes (?i=<imdbID>) e exibir em um modal ou seção de detalhes',
      'Tratamento de erro: exibir "Nenhum filme encontrado" se a API retornar erro',
      'Design responsivo: grid de 3 colunas no desktop, 1 no mobile',
    ],
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Buscador de Filmes</title>\n    <style>\n        /* Seus estilos: body, .busca, .grid (3 colunas), .card, @media mobile */\n    </style>\n</head>\n<body>\n    <h1>Buscador de Filmes</h1>\n    <div class="busca">\n        <input type="text" id="inputBusca" placeholder="Digite o nome do filme...">\n        <button onclick="buscar()">Buscar</button>\n    </div>\n    <div id="resultados"></div>\n    <script>\n        const API_KEY = "SUA_CHAVE_AQUI"; // Gere em omdbapi.com\n\n        async function buscar() {\n            const titulo = document.getElementById("inputBusca").value;\n            // Fetch na API e renderize os cards\n        }\n\n        async function verDetalhes(imdbID) {\n            // Busca detalhes por ID e exibe\n        }\n    </script>\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Buscador de Filmes</title>\n    <style>\n        body { font-family: sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; background: #111; color: white; }\n        h1 { text-align: center; margin-bottom: 24px; }\n        .busca { display: flex; gap: 8px; margin-bottom: 32px; }\n        input { flex: 1; padding: 12px; border-radius: 8px; border: none; font-size: 1rem; }\n        button { padding: 12px 24px; background: #e50914; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }\n        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }\n        .card { background: #222; border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.2s; }\n        .card:hover { transform: scale(1.03); }\n        .card img { width: 100%; display: block; }\n        .card-info { padding: 12px; }\n        .card h3 { font-size: 0.9rem; margin-bottom: 4px; }\n        .card p { color: #888; font-size: 0.8rem; }\n        #detalhe { background: #222; border-radius: 12px; padding: 24px; margin-top: 32px; display: none; }\n        @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }\n    </style>\n</head>\n<body>\n    <h1>🎬 Buscador de Filmes</h1>\n    <div class="busca">\n        <input type="text" id="inputBusca" placeholder="Digite o nome do filme...">\n        <button onclick="buscar()">Buscar</button>\n    </div>\n    <div id="resultados" class="grid"></div>\n    <div id="detalhe"></div>\n    <script>\n        const API_KEY = "SUA_CHAVE_AQUI";\n        async function buscar() {\n            const titulo = document.getElementById("inputBusca").value;\n            if (!titulo) return;\n            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${titulo}`);\n            const data = await res.json();\n            const div = document.getElementById("resultados");\n            if (data.Response === "False") { div.innerHTML = "<p>Nenhum filme encontrado.</p>"; return; }\n            div.innerHTML = data.Search.map(f =>\n                `<div class="card" onclick="verDetalhes(\'${f.imdbID}\')">\n                    <img src="${f.Poster !== "N/A" ? f.Poster : "https://via.placeholder.com/300x450"}" alt="${f.Title}">\n                    <div class="card-info"><h3>${f.Title}</h3><p>${f.Year}</p></div>\n                </div>`\n            ).join("");\n        }\n        async function verDetalhes(id) {\n            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);\n            const f = await res.json();\n            const div = document.getElementById("detalhe");\n            div.style.display = "block";\n            div.innerHTML = `<h2>${f.Title} (${f.Year})</h2><p><b>Diretor:</b> ${f.Director}</p><p><b>Elenco:</b> ${f.Actors}</p><p>${f.Plot}</p>`;\n        }\n    </script>\n</body>\n</html>',
    hints: [
      'Use async/await com fetch() para chamar a API.',
      'data.Search contém o array de resultados.',
      'Registre sua chave grátis em https://www.omdbapi.com/apikey.aspx',
    ],
    testCases: [
      { description: 'Busca retorna cards de filmes; clique exibe detalhes; erro mostra mensagem', inputs: [], expectedOutput: '' },
    ],
  },
};
