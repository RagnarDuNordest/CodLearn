import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'props-e-composicao',
  moduleId: 'react',
  title: 'Props e Composicao',
  description: 'Como passar dados entre componentes com props, usar a prop children e compor interfaces complexas a partir de componentes simples',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Props: a comunicacao entre componentes\n\nProps (abreviacao de properties) sao a forma de passar dados de um componente pai para um componente filho. Pense nelas como os argumentos de uma funcao: voce define quais dados o componente precisa, e quem o usa fornece esses dados.\n\n### Regras fundamentais das props\n\n**(1) Props sao readonly — nunca modifique props**\nUm componente filho nunca deve alterar as props que recebeu. Se voce precisa de dados que mudam, use estado (`useState`). Essa imutabilidade torna o fluxo de dados previsivel.\n\n**(2) Fluxo unidirecional**\nDados sempre fluem de pai para filho, nunca na direcao contraria. Para enviar dados de volta ao pai, o pai passa uma funcao como prop e o filho a chama.\n\n**(3) Qualquer tipo e valido como prop**\nStrings, numeros, booleanos, arrays, objetos, funcoes e ate outros componentes React podem ser passados como props.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Definindo e recebendo props\nfunction Perfil({ nome, idade, cargo, ativo }) {\n  return (\n    <div className="perfil">\n      <h2>{nome}</h2>\n      <p>Cargo: {cargo}</p>\n      <p>Idade: {idade} anos</p>\n      {/* Booleanos controlam renderizacao condicional */}\n      {ativo && <span className="badge-ativo">Ativo</span>}\n    </div>\n  );\n}\n\n// Passando props ao usar o componente\nfunction App() {\n  return (\n    <div>\n      <Perfil nome="Ana Lima" idade={28} cargo="Engenheira" ativo={true} />\n      <Perfil nome="Carlos Melo" idade={35} cargo="Designer" ativo={false} />\n    </div>\n  );\n}\n\n// Props com valores padrao (default props)\nfunction Botao({ texto = "Clique aqui", cor = "azul", tamanho = "medio" }) {\n  return (\n    <button className={`btn btn-${cor} btn-${tamanho}`}>\n      {texto}\n    </button>\n  );\n}\n\n// Sem nenhuma prop — usa todos os defaults\n// <Botao />\n// Com algumas props sobrescritas\n// <Botao texto="Salvar" cor="verde" />',
        filename: 'props-basico.jsx',
        description:
          'Props sao desestruturadas diretamente no parametro da funcao. Valores padrao evitam props indefinidas. Booleanos passados como {true} podem ser simplificados: ativo={true} equivale a apenas ativo.',
      },
    },
    {
      type: 'text',
      content:
        '## Funcoes como props: comunicacao filho -> pai\n\nPara um componente filho se comunicar com o pai, o pai passa uma funcao como prop. O filho chama essa funcao quando precisa notificar o pai sobre algo — um clique, uma mudanca de valor, etc.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// O pai controla o que acontece ao clicar\nfunction ItemDeLista({ texto, onRemover }) {\n  return (\n    <li>\n      {texto}\n      {/* Filho chama a funcao do pai ao clicar */}\n      <button onClick={onRemover}>X</button>\n    </li>\n  );\n}\n\nfunction Lista() {\n  const itens = ["Comprar leite", "Estudar React", "Fazer exercicio"];\n\n  function handleRemover(indice) {\n    console.log(`Removendo item no indice ${indice}`);\n    // Em uma aplicacao real, atualizariamos o estado aqui\n  }\n\n  return (\n    <ul>\n      {itens.map((item, indice) => (\n        <ItemDeLista\n          key={indice}\n          texto={item}\n          onRemover={() => handleRemover(indice)}\n        />\n      ))}\n    </ul>\n  );\n}',
        filename: 'funcoes-como-props.jsx',
        description:
          'A convencao e nomear props de funcao com o prefixo "on": onClick, onRemover, onChange, onSubmit. O pai passa a funcao, o filho decide quando chama-la. Isso mantem o fluxo unidirecional intacto.',
      },
    },
    {
      type: 'text',
      content:
        '## A prop children\n\n`children` e uma prop especial que recebe tudo que esta entre as tags de abertura e fechamento de um componente. E fundamental para criar componentes de layout reutilizaveis como cards, modals e containers.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Componente que usa children como "slot"\nfunction Card({ titulo, children }) {\n  return (\n    <div className="card">\n      <div className="card-header">\n        <h3>{titulo}</h3>\n      </div>\n      <div className="card-body">\n        {/* children e qualquer coisa passada entre <Card> e </Card> */}\n        {children}\n      </div>\n    </div>\n  );\n}\n\nfunction Modal({ titulo, onFechar, children }) {\n  return (\n    <div className="overlay">\n      <div className="modal">\n        <div className="modal-topo">\n          <h2>{titulo}</h2>\n          <button onClick={onFechar}>Fechar</button>\n        </div>\n        <div className="modal-conteudo">\n          {children}\n        </div>\n      </div>\n    </div>\n  );\n}\n\n// Usando os componentes com children\nfunction App() {\n  return (\n    <div>\n      <Card titulo="Informacoes do Usuario">\n        {/* Qualquer JSX aqui vira o children do Card */}\n        <p>Nome: Ana Lima</p>\n        <p>Email: ana@email.com</p>\n        <button>Editar perfil</button>\n      </Card>\n\n      <Card titulo="Estatisticas">\n        <ul>\n          <li>Projetos: 12</li>\n          <li>Tarefas concluidas: 48</li>\n        </ul>\n      </Card>\n    </div>\n  );\n}',
        filename: 'children-prop.jsx',
        description:
          'children permite que componentes de layout sejam agnósticos sobre seu conteudo. O Card nao sabe o que esta dentro dele — apenas define a estrutura visual do container. Isso e composicao de componentes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Composicao e preferivel a heranca em React. Em vez de criar ComponenteEspecializado que estende ComponenteBase, crie ComponenteBase flexivel que aceita children e props configuráveis.',
    },
    {
      type: 'text',
      content:
        '## Composicao avancada: o padrao slot\n\nPara layouts mais complexos com multiplas areas de conteudo, voce pode usar props nomeadas que aceitam JSX. Isso e o equivalente ao "named slots" de outros frameworks.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Layout de pagina com multiplos "slots"\nfunction LayoutDePagina({ cabecalho, lateral, conteudo, rodape }) {\n  return (\n    <div className="layout">\n      <header className="cabecalho">{cabecalho}</header>\n      <div className="corpo">\n        <aside className="lateral">{lateral}</aside>\n        <main className="conteudo">{conteudo}</main>\n      </div>\n      <footer className="rodape">{rodape}</footer>\n    </div>\n  );\n}\n\n// Usando o layout com conteudo especifico\nfunction PaginaDePerfil() {\n  return (\n    <LayoutDePagina\n      cabecalho={<nav><a href="/">Inicio</a> | <a href="/perfil">Perfil</a></nav>}\n      lateral={\n        <ul>\n          <li>Configuracoes</li>\n          <li>Notificacoes</li>\n          <li>Seguranca</li>\n        </ul>\n      }\n      conteudo={\n        <div>\n          <h1>Meu Perfil</h1>\n          <p>Conteudo principal da pagina aqui.</p>\n        </div>\n      }\n      rodape={<p>Todos os direitos reservados 2025</p>}\n    />\n  );\n}',
        filename: 'composicao-avancada.jsx',
        description:
          'Props podem receber JSX como valor, criando slots nomeados. LayoutDePagina define a estrutura visual enquanto PaginaDePerfil define o conteudo. A separacao de responsabilidades e clara.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Evite prop drilling excessivo: passar props por 4 ou mais niveis de componentes intermediarios e um sinal de que talvez voce precise de Context ou de reestruturar sua arvore de componentes.',
    },
  ],
  challenges: [
    {
      id: 'react-c2-button',
      title: 'Componente Button com Variantes',
      description:
        'Crie um componente Button que aceite as props: children (conteudo do botao), variant ("primary" | "secondary" | "danger"), size ("small" | "medium" | "large") com default "medium", disabled (booleano, default false) e onClick (funcao). O componente deve aplicar className="btn btn-{variant} btn-{size}" e repassar onClick e disabled ao elemento button nativo. Crie tambem um App que demonstre todas as variantes.',
      language: 'javascript',
      starterCode:
        '// Implemente o componente Button com variantes\n\nfunction Button({ children, variant, size = "medium", disabled = false, onClick }) {\n  // Monte o className baseado nas props\n  // Retorne um <button> com as props corretas\n}\n\nfunction App() {\n  function handleClique(variante) {\n    console.log(`Clicou no botao: ${variante}`);\n  }\n\n  return (\n    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>\n      {/* Renderize um botao de cada variante */}\n      {/* Renderize um botao desabilitado */}\n    </div>\n  );\n}\n\nexport default App;\n',
      solution:
        'function Button({ children, variant, size = "medium", disabled = false, onClick }) {\n  const className = `btn btn-${variant} btn-${size}`;\n\n  return (\n    <button\n      className={className}\n      disabled={disabled}\n      onClick={onClick}\n    >\n      {children}\n    </button>\n  );\n}\n\nfunction App() {\n  function handleClique(variante) {\n    console.log(`Clicou no botao: ${variante}`);\n  }\n\n  return (\n    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>\n      <Button variant="primary" onClick={() => handleClique("primary")}>\n        Confirmar\n      </Button>\n      <Button variant="secondary" onClick={() => handleClique("secondary")}>\n        Cancelar\n      </Button>\n      <Button variant="danger" onClick={() => handleClique("danger")}>\n        Excluir\n      </Button>\n      <Button variant="primary" size="small" onClick={() => handleClique("small")}>\n        Pequeno\n      </Button>\n      <Button variant="primary" disabled>\n        Desabilitado\n      </Button>\n    </div>\n  );\n}\n\nexport default App;\n',
      hints: [
        'Use template literals para montar o className: `btn btn-${variant} btn-${size}`.',
        'Repasse disabled e onClick diretamente para o elemento <button> nativo.',
        'children e passado entre as tags: <Button>Texto aqui</Button>. Dentro do componente, {children} renderiza esse conteudo.',
        'Para o botao desabilitado, apenas escreva disabled sem valor — equivale a disabled={true} em JSX.',
      ],
    },
  ],
};
