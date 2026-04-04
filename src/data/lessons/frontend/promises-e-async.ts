import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'promises-e-async',
  moduleId: 'frontend',
  title: 'Promises e Async/Await',
  description: 'Entenda como JavaScript lida com operacoes assincronas.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'JavaScript e **single-threaded** — executa uma coisa por vez. Mas o navegador precisa fazer muitas coisas ao mesmo tempo: baixar imagens, esperar respostas de APIs, ler arquivos... Como resolver isso sem travar a pagina?\n\nA resposta e **programacao assincrona**: em vez de esperar uma operacao terminar para comecar a proxima, JS "agenda" o trabalho e continua executando outras coisas. Quando o trabalho termina, uma funcao e chamada com o resultado.',
    },
    {
      type: 'text',
      content: '## O que e uma Promise?\n\nUma **Promise** (promessa) e um objeto que representa o resultado de uma operacao assincrona. Ela pode estar em um de tres estados:\n\n- **pending** (pendente) — a operacao ainda esta rodando\n- **fulfilled** (resolvida) — terminou com sucesso\n- **rejected** (rejeitada) — terminou com erro\n\nVoce "encadeia" acoes usando `.then()` (quando der certo) e `.catch()` (quando der errado):',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'promise_exemplo.js',
        code: '// Criando uma Promise manualmente\nconst minhaPromessa = new Promise((resolve, reject) => {\n    const deuCerto = true;\n    if (deuCerto) {\n        resolve("Operacao concluida!");  // sucesso\n    } else {\n        reject("Algo deu errado!");       // falha\n    }\n});\n\n// Usando a Promise\nminhaPromessa\n    .then(resultado => {\n        console.log("Sucesso:", resultado);\n        // "Sucesso: Operacao concluida!"\n    })\n    .catch(erro => {\n        console.log("Erro:", erro);\n    });\n\nconsole.log("Esta linha executa ANTES da Promise!");',
        description: 'Promise representa um valor futuro. .then() trata sucesso, .catch() trata erro.',
      },
    },
    {
      type: 'text',
      content: '## async/await — A forma moderna\n\nEscrever `.then().then().then()` pode ficar confuso. **async/await** e uma sintaxe mais limpa que deixa codigo assincrono parecendo sincrono:\n\n- **`async function`** — marca que a funcao vai trabalhar com Promises\n- **`await`** — pausa a funcao ate a Promise resolver (SEM travar o navegador)\n- Funciona apenas DENTRO de funcoes marcadas como `async`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'async_await.js',
        code: '// Funcao que simula busca de dados (demora 1 segundo)\nfunction buscarDados() {\n    return new Promise((resolve) => {\n        setTimeout(() => {\n            resolve({ nome: "Ana", pontos: 150 });\n        }, 1000);\n    });\n}\n\n// COM async/await (forma moderna)\nasync function main() {\n    console.log("Buscando dados...");\n\n    const dados = await buscarDados();  // Espera a Promise\n    console.log("Nome:", dados.nome);   // Nome: Ana\n    console.log("Pontos:", dados.pontos); // Pontos: 150\n\n    console.log("Pronto!");\n}\n\nmain();\n// "Buscando dados..." aparece imediatamente\n// 1 segundo depois: "Nome: Ana", "Pontos: 150", "Pronto!"',
        description: 'await pausa a funcao async ate a Promise resolver, sem travar o navegador.',
      },
    },
    {
      type: 'text',
      content: '## Tratando erros com try/catch\n\nCom async/await, use `try/catch` para tratar erros — muito mais legivel que `.catch()`:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        filename: 'try_catch_async.js',
        code: 'async function buscarUsuario(id) {\n    try {\n        // fetch retorna uma Promise — await espera ela resolver\n        const resposta = await fetch(\n            "https://jsonplaceholder.typicode.com/users/" + id\n        );\n\n        // Verificar se a requisicao foi bem sucedida\n        if (!resposta.ok) {\n            throw new Error("Usuario nao encontrado");\n        }\n\n        // .json() tambem retorna uma Promise!\n        const usuario = await resposta.json();\n        console.log("Nome:", usuario.name);\n        return usuario;\n\n    } catch (erro) {\n        console.error("Erro:", erro.message);\n        return null;\n    }\n}\n\nbuscarUsuario(1);\nbuscarUsuario(9999); // vai cair no catch',
        description: 'try/catch com async/await e a forma correta de tratar erros em operacoes assincronas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '**Resumo:** Toda vez que voce usar fetch(), voce vai escrever: `async function nome() { const resp = await fetch(url); const dados = await resp.json(); }`. Isso e o padrao que voce vai usar em TODA aplicacao web. Na proxima licao vamos praticar exatamente isso!',
    },
  ],
  challenges: [
    {
      id: 'promises-c1',
      title: 'Promise com setTimeout',
      description: 'Crie uma funcao esperar(ms) que retorna uma Promise que resolve apos "ms" milissegundos. Depois use async/await para criar uma funcao que imprime mensagens com pausa entre elas.',
      language: 'javascript',
      starterCode: 'function esperar(ms) {\n    // Retorne uma Promise que resolve apos "ms" milissegundos\n    // Use: new Promise(resolve => setTimeout(resolve, ms))\n}\n\nasync function contagem() {\n    console.log("3...");\n    await esperar(1000);  // espera 1 segundo\n    console.log("2...");\n    await esperar(1000);\n    console.log("1...");\n    await esperar(1000);\n    console.log("Go!");\n}\n\ncontagem();',
      solution: 'function esperar(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\nasync function contagem() {\n    console.log("3...");\n    await esperar(1000);\n    console.log("2...");\n    await esperar(1000);\n    console.log("1...");\n    await esperar(1000);\n    console.log("Go!");\n}\n\ncontagem();',
      hints: ['new Promise(resolve => setTimeout(resolve, ms)) cria uma Promise que resolve apos ms milissegundos.', 'await esperar(1000) pausa a funcao por 1 segundo sem travar o navegador.', 'A funcao contagem() deve ser async para usar await.'],
    },
    {
      id: 'promises-c2',
      title: 'Fetch com async/await',
      description: 'Escreva uma funcao async que busca um post pelo id na API jsonplaceholder e retorna um objeto com title e body. Se der erro, retorne null.',
      language: 'javascript',
      starterCode: 'async function buscarPost(id) {\n    // Faca fetch para:\n    // "https://jsonplaceholder.typicode.com/posts/" + id\n    // Retorne { title: post.title, body: post.body }\n    // Em caso de erro, retorne null\n}\n\nbuscarPost(1).then(post => {\n    if (post) {\n        console.log("Titulo:", post.title);\n        console.log("Corpo:", post.body.substring(0, 50) + "...");\n    }\n});',
      solution: 'async function buscarPost(id) {\n    try {\n        const resposta = await fetch(\n            "https://jsonplaceholder.typicode.com/posts/" + id\n        );\n        if (!resposta.ok) return null;\n        const post = await resposta.json();\n        return { title: post.title, body: post.body };\n    } catch (erro) {\n        return null;\n    }\n}\n\nbuscarPost(1).then(post => {\n    if (post) {\n        console.log("Titulo:", post.title);\n        console.log("Corpo:", post.body.substring(0, 50) + "...");\n    }\n});',
      hints: ['Use try/catch para tratar erros.', 'await fetch(url) busca os dados. await resposta.json() converte para objeto.', 'Verifique resposta.ok antes de processar os dados.'],
    },
  ],
};
