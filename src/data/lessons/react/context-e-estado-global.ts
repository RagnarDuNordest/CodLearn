import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'context-e-estado-global',
  moduleId: 'react',
  title: 'Context e Estado Global',
  description: 'Compartilhe estado entre componentes distantes sem prop drilling usando Context API',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## O Problema: Prop Drilling\n\nImagine um componente de tema (claro/escuro) que precisa chegar ate um botao profundamente aninhado:\n\n```\nApp\n  Layout (recebe tema)\n    Sidebar (recebe tema)\n      Menu (recebe tema)\n        Botao (FINALMENTE usa tema)\n```\n\nPassar `tema` por 4 niveis de componentes que nao o usam e "prop drilling" — desnecessario e dificil de manter.\n\n### Context API: Estado Compartilhado\n\nContext permite que qualquer componente descendente acesse um valor sem ele ser passado explicitamente por props:\n\n1. **Criar o contexto**: `createContext()`\n2. **Prover o valor**: `<MeuContexto.Provider value={...}>`\n3. **Consumir o valor**: `useContext(MeuContexto)`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { createContext, useContext, useState } from "react";\n\n// 1. Criar o contexto com valor padrao\nconst TemaContext = createContext({\n  tema: "claro",\n  alternarTema: () => {},\n});\n\n// 2. Hook customizado para consumir o contexto\nfunction useTema() {\n  return useContext(TemaContext);\n}\n\n// 3. Provider — envolve a arvore que precisa do contexto\nfunction TemaProvider({ children }) {\n  const [tema, setTema] = useState("claro");\n\n  function alternarTema() {\n    setTema((t) => (t === "claro" ? "escuro" : "claro"));\n  }\n\n  return (\n    <TemaContext.Provider value={{ tema, alternarTema }}>\n      {children}\n    </TemaContext.Provider>\n  );\n}\n\n// Componentes que USAM o contexto (nao recebem nada via props)\nfunction BotaoTema() {\n  const { tema, alternarTema } = useTema();\n  return (\n    <button onClick={alternarTema}>\n      Tema atual: {tema} — Clique para mudar\n    </button>\n  );\n}\n\nfunction Cabecalho() {\n  const { tema } = useTema();\n  return (\n    <header\n      style={{\n        background: tema === "escuro" ? "#222" : "#f0f0f0",\n        color: tema === "escuro" ? "#fff" : "#000",\n        padding: "1rem",\n      }}\n    >\n      <h1>Meu App</h1>\n      <BotaoTema />\n    </header>\n  );\n}\n\n// Componentes intermediarios NAO precisam passar props de tema\nfunction Layout({ children }) {\n  return (\n    <div>\n      <Cabecalho />\n      <main>{children}</main>\n    </div>\n  );\n}\n\n// App: so precisa envolver com o Provider\nfunction App() {\n  return (\n    <TemaProvider>\n      <Layout>\n        <p>Conteudo da pagina</p>\n      </Layout>\n    </TemaProvider>\n  );\n}',
        filename: 'TemaContext.jsx',
        description: 'TemaProvider guarda o estado e disponibiliza via contexto. Qualquer componente descendente acessa tema e alternarTema via useTema() — sem prop drilling.',
      },
    },
    {
      type: 'text',
      content: '## Quando Usar Context\n\n**Bons casos de uso:**\n- Tema claro/escuro\n- Usuario logado (nome, avatar, permissoes)\n- Idioma/internacionalizacao\n- Carrinho de compras\n\n**Quando NAO usar:**\n- Estado local de um componente — use useState\n- Estado de formulario — mantenha no componente do form\n- Cache de dados do servidor — use React Query ou SWR\n\n### Performance: Cuidado com Atualizacoes\n\nTodo componente que chama `useContext(MeuContexto)` re-renderiza quando o valor do contexto muda. Se o contexto tem muitos dados e atualiza frequentemente, pode causar renders desnecessarios.\n\n**Solucao**: divida contextos por dominio. Nao coloque tudo em um unico contexto global.\n\n```jsx\n// Ruim: um contexto gigante\n<AppContext.Provider value={{ tema, usuario, carrinho, notificacoes }}>\n\n// Bom: contextos separados\n<TemaProvider>\n  <UsuarioProvider>\n    <CarrinhoProvider>\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Sempre crie um hook customizado (useTema, useUsuario) para encapsular o useContext. Isso evita importar o objeto de contexto em todo componente e permite mudar a implementacao sem alterar os consumidores.',
    },
  ],
  challenges: [
    {
      id: 'context-c1',
      title: 'Context de Usuario Logado',
      description: 'Implemente um UsuarioContext que guarda o usuario logado (nome e email). Crie: UsuarioProvider com estado, useUsuario hook, componente LoginForm que faz o "login" setando o usuario, componente PerfilUsuario que mostra os dados e um botao de logout.',
      language: 'javascript',
      starterCode: 'import { createContext, useContext, useState } from "react";\n\n// TODO: crie o UsuarioContext\n// TODO: crie o UsuarioProvider\n// TODO: crie o hook useUsuario\n\nfunction LoginForm() {\n  // TODO: formulario com nome e email\n  // ao submeter, chama a funcao de login do contexto\n  return <div>LoginForm</div>;\n}\n\nfunction PerfilUsuario() {\n  // TODO: mostra nome e email do usuario logado\n  // TODO: botao de logout\n  return <div>Perfil</div>;\n}\n\nfunction App() {\n  // TODO: envolva com o provider\n  // Se ha usuario, mostra PerfilUsuario. Senao, mostra LoginForm.\n  return <div>App</div>;\n}\n\nexport default App;\n',
      solution: 'import { createContext, useContext, useState } from "react";\n\nconst UsuarioContext = createContext({ usuario: null, login: () => {}, logout: () => {} });\n\nfunction UsuarioProvider({ children }) {\n  const [usuario, setUsuario] = useState(null);\n  function login(nome, email) { setUsuario({ nome, email }); }\n  function logout() { setUsuario(null); }\n  return (\n    <UsuarioContext.Provider value={{ usuario, login, logout }}>\n      {children}\n    </UsuarioContext.Provider>\n  );\n}\n\nfunction useUsuario() {\n  return useContext(UsuarioContext);\n}\n\nfunction LoginForm() {\n  const { login } = useUsuario();\n  const [nome, setNome] = useState("");\n  const [email, setEmail] = useState("");\n  function handleSubmit(e) {\n    e.preventDefault();\n    if (nome && email) login(nome, email);\n  }\n  return (\n    <form onSubmit={handleSubmit}>\n      <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />\n      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />\n      <button type="submit">Entrar</button>\n    </form>\n  );\n}\n\nfunction PerfilUsuario() {\n  const { usuario, logout } = useUsuario();\n  return (\n    <div>\n      <p>Bem-vindo, {usuario.nome}!</p>\n      <p>Email: {usuario.email}</p>\n      <button onClick={logout}>Sair</button>\n    </div>\n  );\n}\n\nfunction App() {\n  return (\n    <UsuarioProvider>\n      <AppConteudo />\n    </UsuarioProvider>\n  );\n}\n\nfunction AppConteudo() {\n  const { usuario } = useUsuario();\n  return usuario ? <PerfilUsuario /> : <LoginForm />;\n}\n\nexport default App;\n',
      hints: [
        'createContext aceita o valor padrao: createContext({ usuario: null, login: () => {}, logout: () => {} })',
        'O Provider armazena o estado com useState e passa { usuario, login, logout } como value',
        'useUsuario e so um wrapper: return useContext(UsuarioContext)',
      ],
    },
  ],
};
