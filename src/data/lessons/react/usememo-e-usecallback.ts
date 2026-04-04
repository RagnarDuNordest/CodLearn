import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'usememo-e-usecallback',
  moduleId: 'react',
  title: 'useMemo e useCallback',
  description: 'Evite re-renders desnecessarios e calculos repetidos com memoizacao no React',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## O Problema: Re-renders Desnecessarios\n\nNo React, sempre que o estado ou props de um componente mudam, ele re-renderiza. Isso e o comportamento esperado — mas pode causar problemas de performance quando:\n\n1. Um calculo caro e refeito toda vez, mesmo sem dados novos\n2. Uma funcao e recriada a cada render, invalidando memoizacao de filhos\n\n### useMemo — Memoriza um Valor\n\n```jsx\nconst resultado = useMemo(() => calcularCaro(dados), [dados]);\n```\n\n- Executa a funcao apenas quando `dados` muda\n- Retorna o valor cacheado nas outras renders\n- Util para calculos pesados (filtros, ordenacoes, transformacoes)\n\n### useCallback — Memoriza uma Funcao\n\n```jsx\nconst handleClick = useCallback(() => {\n  fazerAlgo(id);\n}, [id]);\n```\n\n- Retorna a mesma referencia de funcao enquanto `id` nao muda\n- Util quando passa funcoes como props para componentes memoizados',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState, useMemo, useCallback, memo } from "react";\n\n// Componente filho memoizado — so re-renderiza se props mudarem\nconst ItemLista = memo(function ItemLista({ item, onRemover }) {\n  console.log("Renderizando item:", item.nome);\n  return (\n    <li>\n      {item.nome} — R$ {item.preco.toFixed(2)}\n      <button onClick={() => onRemover(item.id)}>Remover</button>\n    </li>\n  );\n});\n\nfunction ListaProdutos() {\n  const [produtos] = useState([\n    { id: 1, nome: "Notebook", preco: 2500, categoria: "tech" },\n    { id: 2, nome: "Mouse", preco: 80, categoria: "tech" },\n    { id: 3, nome: "Cadeira", preco: 800, categoria: "moveis" },\n    { id: 4, nome: "Mesa", preco: 600, categoria: "moveis" },\n  ]);\n  const [filtro, setFiltro] = useState("");\n  const [removidos, setRemovidos] = useState(new Set());\n  const [contador, setContador] = useState(0);\n\n  // useMemo: filtragem so roda quando produtos, filtro ou removidos mudam\n  // Sem useMemo: rodaria em TODA render, inclusive ao incrementar contador\n  const produtosFiltrados = useMemo(() => {\n    console.log("Calculando filtro...");  // deve aparecer pouco\n    return produtos\n      .filter((p) => !removidos.has(p.id))\n      .filter((p) => p.nome.toLowerCase().includes(filtro.toLowerCase()));\n  }, [produtos, filtro, removidos]);\n\n  // useMemo: total so recalcula quando lista filtrada muda\n  const total = useMemo(\n    () => produtosFiltrados.reduce((acc, p) => acc + p.preco, 0),\n    [produtosFiltrados]\n  );\n\n  // useCallback: funcao mantém mesma referencia enquanto removidos nao muda\n  // Sem useCallback: ItemLista re-renderizaria mesmo com memo()\n  const handleRemover = useCallback(\n    (id) => setRemovidos((prev) => new Set([...prev, id])),\n    [] // setRemovidos e estavel, nao precisa na lista\n  );\n\n  return (\n    <div>\n      <input\n        placeholder="Filtrar..."\n        value={filtro}\n        onChange={(e) => setFiltro(e.target.value)}\n      />\n      <button onClick={() => setContador((c) => c + 1)}>\n        Render #{contador} (nao afeta a lista)\n      </button>\n      <ul>\n        {produtosFiltrados.map((p) => (\n          <ItemLista key={p.id} item={p} onRemover={handleRemover} />\n        ))}\n      </ul>\n      <strong>Total: R$ {total.toFixed(2)}</strong>\n    </div>\n  );\n}',
        filename: 'ListaProdutos.jsx',
        description: 'useMemo para filtrar e somar apenas quando dados mudam. useCallback para manter referencia estavel da funcao onRemover. memo() no filho para evitar re-renders quando props nao mudam.',
      },
    },
    {
      type: 'text',
      content: '## Quando Usar (e Quando Nao Usar)\n\n**Use useMemo quando:**\n- Calculo e computacionalmente caro (ordenar/filtrar listas grandes)\n- O resultado e passado como prop para componente com memo()\n- Precisa de referencia estavel para arrays/objetos em dependencias de useEffect\n\n**Use useCallback quando:**\n- Passa a funcao como prop para componente com memo()\n- A funcao e dependencia de outro useEffect/useMemo\n\n**NAO use quando:**\n- O calculo e simples (soma de 3 numeros, string concatenation)\n- O componente raramente re-renderiza de qualquer forma\n- Premature optimization — perfil antes de otimizar\n\n### A Regra de Ouro\n\nMemoizacao tem custo: React precisa armazenar o valor e comparar as dependencias a cada render. Para calculos simples, essa overhead pode ser MAIOR que o calculo em si.\n\n**Regra**: meca o problema antes de usar useMemo/useCallback. Use React DevTools Profiler para identificar renders caros.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'memo() no componente filho so funciona se as props tiverem referencia estavel. Arrays e objetos criados inline ([[1,2,3]] ou {{a: 1}}) sao novos a cada render — use useMemo para eles. Funcoes criadas inline tambem sao novas — use useCallback.',
    },
  ],
  challenges: [
    {
      id: 'memo-c1',
      title: 'Otimize a Busca de Contatos',
      description: 'O componente abaixo refaz a busca em 1000 contatos a cada render, mesmo quando so o tema muda. Use useMemo para cachear o resultado da busca. Use useCallback para estabilizar a funcao onSelecionar passada ao filho.',
      language: 'javascript',
      starterCode: 'import { useState, useMemo, useCallback, memo } from "react";\n\n// Gera 1000 contatos falsos\nconst CONTATOS = Array.from({ length: 1000 }, (_, i) => ({\n  id: i,\n  nome: `Contato ${i}`,\n  email: `contato${i}@exemplo.com`,\n}));\n\nconst ItemContato = memo(function ItemContato({ contato, onSelecionar }) {\n  return (\n    <li onClick={() => onSelecionar(contato)}>\n      {contato.nome} — {contato.email}\n    </li>\n  );\n});\n\nfunction BuscaContatos() {\n  const [busca, setBusca] = useState("");\n  const [selecionado, setSelecionado] = useState(null);\n  const [tema, setTema] = useState("claro");  // so muda o visual\n\n  // TODO: use useMemo para cachear esta filtragem\n  const resultados = CONTATOS.filter((c) =>\n    c.nome.toLowerCase().includes(busca.toLowerCase())\n  );\n\n  // TODO: use useCallback para estabilizar esta funcao\n  const handleSelecionar = (contato) => setSelecionado(contato);\n\n  return (\n    <div style={{ background: tema === "escuro" ? "#333" : "#fff" }}>\n      <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar..." />\n      <button onClick={() => setTema(t => t === "claro" ? "escuro" : "claro")}>\n        Tema: {tema}\n      </button>\n      {selecionado && <p>Selecionado: {selecionado.nome}</p>}\n      <ul>{resultados.slice(0, 20).map(c => (\n        <ItemContato key={c.id} contato={c} onSelecionar={handleSelecionar} />\n      ))}</ul>\n    </div>\n  );\n}\n\nexport default BuscaContatos;\n',
      solution: 'import { useState, useMemo, useCallback, memo } from "react";\n\nconst CONTATOS = Array.from({ length: 1000 }, (_, i) => ({\n  id: i,\n  nome: `Contato ${i}`,\n  email: `contato${i}@exemplo.com`,\n}));\n\nconst ItemContato = memo(function ItemContato({ contato, onSelecionar }) {\n  return (\n    <li onClick={() => onSelecionar(contato)}>\n      {contato.nome} — {contato.email}\n    </li>\n  );\n});\n\nfunction BuscaContatos() {\n  const [busca, setBusca] = useState("");\n  const [selecionado, setSelecionado] = useState(null);\n  const [tema, setTema] = useState("claro");\n\n  // Memoizado: so roda quando busca muda, nao quando tema muda\n  const resultados = useMemo(\n    () => CONTATOS.filter((c) => c.nome.toLowerCase().includes(busca.toLowerCase())),\n    [busca]\n  );\n\n  // Referencia estavel: ItemContato nao re-renderiza ao mudar tema\n  const handleSelecionar = useCallback(\n    (contato) => setSelecionado(contato),\n    []\n  );\n\n  return (\n    <div style={{ background: tema === "escuro" ? "#333" : "#fff" }}>\n      <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar..." />\n      <button onClick={() => setTema(t => t === "claro" ? "escuro" : "claro")}>\n        Tema: {tema}\n      </button>\n      {selecionado && <p>Selecionado: {selecionado.nome}</p>}\n      <ul>{resultados.slice(0, 20).map(c => (\n        <ItemContato key={c.id} contato={c} onSelecionar={handleSelecionar} />\n      ))}</ul>\n    </div>\n  );\n}\n\nexport default BuscaContatos;\n',
      hints: [
        'useMemo recebe uma funcao e um array de dependencias: useMemo(() => ..., [busca])',
        'useCallback tem a mesma sintaxe: useCallback((contato) => ..., [])',
        'Ao trocar o tema, a filtragem NAO deve rodar novamente — verifique no console',
      ],
    },
  ],
};
