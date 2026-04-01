import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'efeitos-com-useeffect',
  moduleId: 'react',
  title: 'Efeitos com useEffect',
  description: 'Aprenda a lidar com side effects em React: buscar dados de APIs, sincronizar com sistemas externos e fazer limpeza de recursos com useEffect',
  order: 3,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## O que sao side effects?\n\nUm side effect e qualquer coisa que o componente faz alem de calcular e retornar JSX. Exemplos:\n\n- Buscar dados de uma API\n- Atualizar o titulo da pagina (`document.title`)\n- Configurar um timer (`setTimeout`, `setInterval`)\n- Assinar um evento do navegador (`addEventListener`)\n- Conectar a um WebSocket\n\nEsses efeitos nao podem ficar dentro do corpo principal do componente, pois o componente pode re-renderizar muitas vezes, e voce nao quer buscar dados da API a cada re-render.\n\n**useEffect** e o hook que diz ao React: "execute esse codigo depois que o componente aparecer na tela e depois de renders especificos."',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState, useEffect } from "react";\n\nfunction TituloDinamico({ titulo }) {\n  // Executa depois de todo render onde "titulo" mudou\n  useEffect(() => {\n    document.title = `${titulo} | Meu App`;\n  }, [titulo]); // array de dependencias\n\n  return <h1>{titulo}</h1>;\n}\n\n// As tres formas de usar useEffect:\n\n// 1. Sem array: executa depois de TODO render\nuseEffect(() => {\n  console.log("Componente renderizou");\n});\n\n// 2. Array vazio []: executa UMA VEZ apos o primeiro render (mount)\nuseEffect(() => {\n  console.log("Componente montou — buscar dados iniciais aqui");\n}, []);\n\n// 3. Array com dependencias: executa quando qualquer dependencia muda\nuseEffect(() => {\n  console.log(`O valor de "filtro" mudou para: ${filtro}`);\n}, [filtro]);',
        filename: 'useeffect-formas.jsx',
        description:
          'O array de dependencias controla quando o efeito executa. Sem array: todo render. Array vazio: apenas no mount. Array com valores: quando os valores mudam.',
      },
    },
    {
      type: 'text',
      content:
        '## Buscando dados de API\n\nBuscar dados e o caso de uso mais comum do useEffect. O padrao consiste em: criar um estado para os dados, um estado de carregamento e um estado de erro, e buscar os dados no mount (array vazio).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState, useEffect } from "react";\n\nfunction ListaDeUsuarios() {\n  const [usuarios, setUsuarios] = useState([]);\n  const [carregando, setCarregando] = useState(true);\n  const [erro, setErro] = useState(null);\n\n  useEffect(() => {\n    // Funcao asincrona dentro do effect\n    async function buscarUsuarios() {\n      try {\n        setCarregando(true);\n        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");\n\n        if (!resposta.ok) {\n          throw new Error(`Erro HTTP: ${resposta.status}`);\n        }\n\n        const dados = await resposta.json();\n        setUsuarios(dados);\n      } catch (e) {\n        setErro(e.message);\n      } finally {\n        setCarregando(false);\n      }\n    }\n\n    buscarUsuarios();\n  }, []); // Array vazio: busca apenas uma vez\n\n  if (carregando) return <p>Carregando usuarios...</p>;\n  if (erro) return <p>Erro: {erro}</p>;\n\n  return (\n    <ul>\n      {usuarios.map((usuario) => (\n        <li key={usuario.id}>\n          <strong>{usuario.name}</strong> — {usuario.email}\n        </li>\n      ))}\n    </ul>\n  );\n}',
        filename: 'buscar-dados-api.jsx',
        description:
          'Nao torne o callback do useEffect async diretamente — crie uma funcao async interna e a chame. O padrao loading/error/data e a forma mais robusta de lidar com chamadas a API.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Nunca faca: useEffect(async () => { ... }, []). O React nao suporta callbacks async no useEffect. Crie uma funcao async interna e a invoque dentro do callback sincrono.',
    },
    {
      type: 'text',
      content:
        '## Cleanup: limpando efeitos\n\nAlguns efeitos precisam ser "desfeitos" quando o componente sai da tela (unmount) ou antes de o efeito ser reexecutado. A funcao de cleanup e retornada pelo callback do useEffect.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState, useEffect } from "react";\n\n// Exemplo 1: Limpando um setInterval\nfunction RelogioEmTempoReal() {\n  const [horario, setHorario] = useState(new Date().toLocaleTimeString());\n\n  useEffect(() => {\n    const intervalo = setInterval(() => {\n      setHorario(new Date().toLocaleTimeString());\n    }, 1000);\n\n    // Funcao de cleanup: cancela o intervalo quando o componente desmonta\n    return () => {\n      clearInterval(intervalo);\n    };\n  }, []);\n\n  return <p>Horario: {horario}</p>;\n}\n\n// Exemplo 2: Cancelando fetch com AbortController\nfunction PerfilDeUsuario({ usuarioId }) {\n  const [usuario, setUsuario] = useState(null);\n\n  useEffect(() => {\n    const controlador = new AbortController();\n\n    async function buscar() {\n      try {\n        const resposta = await fetch(\n          `https://jsonplaceholder.typicode.com/users/${usuarioId}`,\n          { signal: controlador.signal } // passa o signal para o fetch\n        );\n        const dados = await resposta.json();\n        setUsuario(dados);\n      } catch (e) {\n        if (e.name !== "AbortError") {\n          console.error("Erro ao buscar:", e);\n        }\n      }\n    }\n\n    buscar();\n\n    // Cleanup: cancela o fetch se o componente desmontar\n    // ou se usuarioId mudar antes do fetch terminar\n    return () => {\n      controlador.abort();\n    };\n  }, [usuarioId]); // Rebusca sempre que usuarioId muda\n\n  if (!usuario) return <p>Carregando...</p>;\n  return <p>{usuario.name}</p>;\n}',
        filename: 'useeffect-cleanup.jsx',
        description:
          'Retorne uma funcao de cleanup para cancelar timers, remover event listeners ou abortar fetches. Sem cleanup, componentes desmontados podem tentar atualizar estado, causando memory leaks.',
      },
    },
    {
      type: 'text',
      content:
        '## Evitando loops infinitos\n\nO erro mais comum com useEffect: criar um loop infinito inadvertidamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState, useEffect } from "react";\n\n// PROBLEMA 1: Sem dependencias — loop infinito\nfunction Problematico({ buscarDados }) {\n  const [dados, setDados] = useState([]);\n\n  // ERRADO: executa todo render -> setDados -> render -> executa -> loop\n  useEffect(() => {\n    buscarDados().then(setDados);\n  }); // sem array de dependencias!\n\n  return <div>{dados.length} items</div>;\n}\n\n// PROBLEMA 2: Objeto/funcao no array de dependencias\nfunction TambemProblematico() {\n  const [dados, setDados] = useState([]);\n\n  // ERRADO: opcoes e um novo objeto a cada render\n  // portanto o efeito executa a cada render\n  const opcoes = { pagina: 1 }; // novo objeto em cada render!\n\n  useEffect(() => {\n    fetch("/api/dados", opcoes).then(/* ... */);\n  }, [opcoes]); // opcoes muda a cada render -> loop!\n\n  return <div>{dados.length}</div>;\n}\n\n// SOLUCAO: mova valores estaticos para fora ou use useMemo\nconst OPCOES_ESTATICAS = { pagina: 1 }; // fora do componente = nao muda\n\nfunction Correto() {\n  const [dados, setDados] = useState([]);\n\n  useEffect(() => {\n    fetch("/api/dados", OPCOES_ESTATICAS)\n      .then((r) => r.json())\n      .then(setDados);\n  }, []); // sem dependencias que mudam a cada render\n\n  return <div>{dados.length} items</div>;\n}',
        filename: 'evitar-loops.jsx',
        description:
          'Loops infinitos surgem quando o efeito atualiza algo que esta no array de dependencias. Objetos e funcoes criados dentro do componente sao "novos" a cada render, causando loops.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O plugin ESLint "eslint-plugin-react-hooks" detecta arrays de dependencias incorretos automaticamente. Em projetos Vite, ele ja vem configurado. Nunca ignore os avisos de dependencias — eles geralmente indicam bugs reais.',
    },
  ],
  challenges: [
    {
      id: 'react-c4-usuarios',
      title: 'Buscar Usuarios da API',
      description:
        'Crie um componente ListaDeUsuarios que busque dados da URL "https://jsonplaceholder.typicode.com/users" ao montar. Enquanto carrega, exiba "Buscando usuarios...". Se houver erro, exiba "Erro ao buscar: {mensagem}". Quando carregado, renderize os usuarios em cards com nome (h3), email (p) e telefone (p). Adicione tambem um botao "Recarregar" que faz a busca novamente.',
      language: 'javascript',
      starterCode:
        'import { useState, useEffect } from "react";\n\nfunction ListaDeUsuarios() {\n  const [usuarios, setUsuarios] = useState([]);\n  const [carregando, setCarregando] = useState(true);\n  const [erro, setErro] = useState(null);\n  // Dica: um estado para "forcar" recarregamento\n  const [tentativa, setTentativa] = useState(0);\n\n  useEffect(() => {\n    // Implemente a busca aqui\n    // Use a URL: https://jsonplaceholder.typicode.com/users\n  }, [tentativa]); // reexecuta quando tentativa muda\n\n  function recarregar() {\n    // Como forcar o useEffect a rodar novamente?\n  }\n\n  // Renderize os estados de carregamento, erro e sucesso\n}\n\nexport default ListaDeUsuarios;\n',
      solution:
        'import { useState, useEffect } from "react";\n\nfunction ListaDeUsuarios() {\n  const [usuarios, setUsuarios] = useState([]);\n  const [carregando, setCarregando] = useState(true);\n  const [erro, setErro] = useState(null);\n  const [tentativa, setTentativa] = useState(0);\n\n  useEffect(() => {\n    async function buscarUsuarios() {\n      try {\n        setCarregando(true);\n        setErro(null);\n        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");\n        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);\n        const dados = await resposta.json();\n        setUsuarios(dados);\n      } catch (e) {\n        setErro(e.message);\n      } finally {\n        setCarregando(false);\n      }\n    }\n    buscarUsuarios();\n  }, [tentativa]);\n\n  function recarregar() {\n    setTentativa((anterior) => anterior + 1);\n  }\n\n  if (carregando) return <p>Buscando usuarios...</p>;\n\n  if (erro) {\n    return (\n      <div>\n        <p>Erro ao buscar: {erro}</p>\n        <button onClick={recarregar}>Tentar novamente</button>\n      </div>\n    );\n  }\n\n  return (\n    <div>\n      <button onClick={recarregar}>Recarregar</button>\n      {usuarios.map((usuario) => (\n        <div key={usuario.id} style={{ border: "1px solid #ccc", padding: "12px", margin: "8px 0" }}>\n          <h3>{usuario.name}</h3>\n          <p>{usuario.email}</p>\n          <p>{usuario.phone}</p>\n        </div>\n      ))}\n    </div>\n  );\n}\n\nexport default ListaDeUsuarios;\n',
      hints: [
        'Crie uma funcao async dentro do useEffect e a chame imediatamente — nao torne o callback do useEffect async diretamente.',
        'Use setCarregando(true) antes do fetch e setCarregando(false) no bloco finally para garantir que o estado de carregamento seja desativado mesmo em caso de erro.',
        'Para o botao Recarregar, use um estado "tentativa" que incrementa a cada clique. Como tentativa esta no array de dependencias, o useEffect re-executa.',
        'Lembre-se de limpar o erro com setErro(null) no inicio de cada busca para nao mostrar um erro antigo.',
      ],
    },
  ],
};
