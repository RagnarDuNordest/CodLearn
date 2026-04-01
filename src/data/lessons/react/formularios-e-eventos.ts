import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'formularios-e-eventos',
  moduleId: 'react',
  title: 'Formularios e Eventos',
  description: 'Capture inputs do usuario, gerencie formularios controlados e responda a eventos com React',
  order: 4,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## Formularios e Eventos no React\n\n### Componentes Controlados\n\nNo React, inputs de formulario sao mantidos em sincronia com o estado do componente. O valor do input vem do estado, e cada mudanca atualiza o estado.\n\n```jsx\nconst [nome, setNome] = useState("");\n<input value={nome} onChange={(e) => setNome(e.target.value)} />\n```\n\nIsso e chamado de "componente controlado" — o React controla o valor do input.\n\n### Por que controlado?\n\n- Validacao em tempo real enquanto o usuario digita\n- Formatar o valor automaticamente\n- Habilitar/desabilitar botao de submit conforme estado do form\n- Facil acesso ao valor sem consultar o DOM',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState } from "react";\n\nfunction FormularioCadastro() {\n  const [form, setForm] = useState({\n    nome: "",\n    email: "",\n    senha: "",\n  });\n  const [erros, setErros] = useState({});\n  const [enviado, setEnviado] = useState(false);\n\n  // Handler generico para qualquer campo\n  function handleChange(e) {\n    const { name, value } = e.target;\n    setForm((prev) => ({ ...prev, [name]: value }));\n    // Limpa o erro do campo ao comecar a digitar\n    if (erros[name]) {\n      setErros((prev) => ({ ...prev, [name]: "" }));\n    }\n  }\n\n  function validar() {\n    const novosErros = {};\n    if (!form.nome.trim()) novosErros.nome = "Nome e obrigatorio";\n    if (!form.email.includes("@")) novosErros.email = "Email invalido";\n    if (form.senha.length < 6) novosErros.senha = "Minimo 6 caracteres";\n    return novosErros;\n  }\n\n  function handleSubmit(e) {\n    e.preventDefault(); // impede reload da pagina\n    const errosValidacao = validar();\n    if (Object.keys(errosValidacao).length > 0) {\n      setErros(errosValidacao);\n      return;\n    }\n    console.log("Dados enviados:", form);\n    setEnviado(true);\n  }\n\n  if (enviado) {\n    return <p>Cadastro realizado! Bem-vindo, {form.nome}!</p>;\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <input\n          name="nome"\n          placeholder="Nome"\n          value={form.nome}\n          onChange={handleChange}\n        />\n        {erros.nome && <span style={{ color: "red" }}>{erros.nome}</span>}\n      </div>\n\n      <div>\n        <input\n          name="email"\n          type="email"\n          placeholder="Email"\n          value={form.email}\n          onChange={handleChange}\n        />\n        {erros.email && <span style={{ color: "red" }}>{erros.email}</span>}\n      </div>\n\n      <div>\n        <input\n          name="senha"\n          type="password"\n          placeholder="Senha"\n          value={form.senha}\n          onChange={handleChange}\n        />\n        {erros.senha && <span style={{ color: "red" }}>{erros.senha}</span>}\n      </div>\n\n      <button\n        type="submit"\n        disabled={!form.nome || !form.email || !form.senha}\n      >\n        Cadastrar\n      </button>\n    </form>\n  );\n}',
        filename: 'FormularioCadastro.jsx',
        description: 'Formulario controlado com estado unico para todos os campos, validacao antes do submit, limpeza de erros ao digitar, e botao desabilitado enquanto campos estao vazios.',
      },
    },
    {
      type: 'text',
      content: '## Eventos Comuns no React\n\n| Evento | Quando dispara |\n|--------|---------------|\n| `onClick` | Clique em elemento |\n| `onChange` | Valor de input muda |\n| `onSubmit` | Formulario enviado |\n| `onFocus` / `onBlur` | Campo recebe/perde foco |\n| `onKeyDown` | Tecla pressionada |\n| `onMouseEnter` | Mouse entra no elemento |\n\n### Eventos Sinteticos\n\nReact normaliza eventos do navegador em "SyntheticEvents". O objeto `e` passado para handlers tem sempre a mesma interface, independente do navegador.\n\n```jsx\n// e.preventDefault() — impede comportamento padrao\n// e.stopPropagation() — para o bubbling\n// e.target.value — valor do input\n// e.target.name — atributo name do elemento\n```\n\n### Select e Checkbox\n\n```jsx\n// Select controlado\n<select value={opcao} onChange={(e) => setOpcao(e.target.value)}>\n  <option value="a">Opcao A</option>\n  <option value="b">Opcao B</option>\n</select>\n\n// Checkbox controlado\n<input\n  type="checkbox"\n  checked={aceito}\n  onChange={(e) => setAceito(e.target.checked)}\n/>\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Sempre use e.preventDefault() no onSubmit para evitar que a pagina recarregue. Sem isso, o formulario faz uma requisicao GET/POST para a propria URL e recarrega a pagina.',
    },
  ],
  challenges: [
    {
      id: 'form-c1',
      title: 'Formulario de Login com Validacao',
      description: 'Crie um formulario de login com email e senha. Valide: email deve conter "@", senha deve ter pelo menos 6 caracteres. Mostre mensagens de erro abaixo de cada campo. Ao submeter com dados validos, mostre "Login realizado com sucesso!".',
      language: 'javascript',
      starterCode: 'import { useState } from "react";\n\nfunction FormularioLogin() {\n  // TODO: estado para email, senha, erros, loginOk\n  \n  function handleSubmit(e) {\n    e.preventDefault();\n    // TODO: validar campos\n    // TODO: se valido, setar loginOk = true\n  }\n  \n  // TODO: se loginOk, mostrar mensagem de sucesso\n  \n  return (\n    <form onSubmit={handleSubmit}>\n      {/* TODO: input de email com validacao */}\n      {/* TODO: input de senha com validacao */}\n      {/* TODO: botao submit */}\n    </form>\n  );\n}\n\nexport default FormularioLogin;\n',
      solution: 'import { useState } from "react";\n\nfunction FormularioLogin() {\n  const [email, setEmail] = useState("");\n  const [senha, setSenha] = useState("");\n  const [erros, setErros] = useState({ email: "", senha: "" });\n  const [loginOk, setLoginOk] = useState(false);\n\n  function handleSubmit(e) {\n    e.preventDefault();\n    const novosErros = { email: "", senha: "" };\n    if (!email.includes("@")) novosErros.email = "Email invalido";\n    if (senha.length < 6) novosErros.senha = "Senha muito curta (min. 6)";\n    \n    if (novosErros.email || novosErros.senha) {\n      setErros(novosErros);\n      return;\n    }\n    setLoginOk(true);\n  }\n\n  if (loginOk) return <p>Login realizado com sucesso!</p>;\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <input\n          type="email"\n          placeholder="Email"\n          value={email}\n          onChange={(e) => { setEmail(e.target.value); setErros((p) => ({ ...p, email: "" })); }}\n        />\n        {erros.email && <span style={{ color: "red" }}>{erros.email}</span>}\n      </div>\n      <div>\n        <input\n          type="password"\n          placeholder="Senha"\n          value={senha}\n          onChange={(e) => { setSenha(e.target.value); setErros((p) => ({ ...p, senha: "" })); }}\n        />\n        {erros.senha && <span style={{ color: "red" }}>{erros.senha}</span>}\n      </div>\n      <button type="submit">Entrar</button>\n    </form>\n  );\n}\n\nexport default FormularioLogin;\n',
      hints: [
        'Use useState para cada campo: const [email, setEmail] = useState("")',
        'Valide dentro do handleSubmit antes de marcar loginOk',
        'Limpe o erro do campo quando o usuario comeca a digitar novamente',
      ],
    },
  ],
};
