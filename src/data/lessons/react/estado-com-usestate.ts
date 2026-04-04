import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'estado-com-usestate',
  moduleId: 'react',
  title: 'Estado com useState',
  description: 'Entenda o que e estado em React, como usar o hook useState para criar dados reativos e por que nunca mutar o estado diretamente',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## O que e estado?\n\nEstado (state) e qualquer dado que pode mudar ao longo do tempo e que, quando muda, deve causar uma atualizacao na tela. A diferenca fundamental entre estado e uma variavel comum:\n\n- **Variavel comum:** mudar o valor nao causa re-render. O que esta na tela nao muda.\n- **Estado (useState):** mudar o valor dispara automaticamente um novo render do componente com o valor atualizado.\n\n### Quando algo deve ser estado?\n\nPergunte: "Se esse valor mudar, a tela precisa atualizar?"\n- Texto digitado em um input? **Estado** — a tela mostra o texto em tempo real.\n- Lista de itens que o usuario adiciona? **Estado** — a lista na tela cresce.\n- O item selecionado em um menu? **Estado** — o item ativo precisa ser destacado.\n- Uma constante de configuracao? **Nao e estado** — nao muda durante a vida do componente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState } from "react";\n\n// useState retorna um array com exatamente dois itens:\n// [valorAtual, funcaoParaMudarOValor]\nfunction Contador() {\n  const [contagem, setContagem] = useState(0); // 0 e o valor inicial\n\n  return (\n    <div>\n      <p>Contagem: {contagem}</p>\n\n      {/* Chamar setContagem atualiza o estado E dispara um re-render */}\n      <button onClick={() => setContagem(contagem + 1)}>+1</button>\n      <button onClick={() => setContagem(contagem - 1)}>-1</button>\n      <button onClick={() => setContagem(0)}>Resetar</button>\n    </div>\n  );\n}\n\n// NUNCA faca isso — nao funciona:\nfunction ContraExemplo() {\n  let contagem = 0; // variavel comum\n\n  function incrementar() {\n    contagem = contagem + 1; // muda a variavel...\n    // ...mas nao dispara re-render! A tela nao atualiza.\n    console.log(contagem); // o valor muda no console\n  }\n\n  return (\n    <div>\n      <p>Contagem: {contagem}</p> {/* Sempre mostra 0 */}\n      <button onClick={incrementar}>+1</button>\n    </div>\n  );\n}',
        filename: 'usestate-basico.jsx',
        description:
          'useState retorna um par [valor, setter]. Chamar o setter com um novo valor agenda um re-render do componente. Variáveis comuns nao tem esse poder — mutar uma variavel comum nao atualiza a tela.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Estado e imutavel — nunca mute o estado diretamente. Para arrays: nao use push/pop/splice, crie um novo array. Para objetos: nao altere propriedades, crie um novo objeto com spread. Mutar diretamente corrompe o mecanismo de deteccao de mudancas do React.',
    },
    {
      type: 'text',
      content:
        '## Estado imutavel: arrays e objetos\n\nQuando o estado e um array ou objeto, voce precisa criar uma nova referencia ao inves de modificar a existente. O React compara referencias para decidir se houve mudanca.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState } from "react";\n\nfunction ListaDeTarefas() {\n  const [tarefas, setTarefas] = useState([\n    { id: 1, texto: "Estudar React", feita: false },\n    { id: 2, texto: "Fazer exercicio", feita: true },\n  ]);\n\n  // CORRETO: cria novo array com spread + novo item\n  function adicionarTarefa(texto) {\n    const novaTarefa = { id: Date.now(), texto, feita: false };\n    setTarefas([...tarefas, novaTarefa]); // novo array!\n  }\n\n  // ERRADO: mutacao direta — React nao detecta a mudanca\n  // tarefas.push(novaTarefa); // NAO FACA ISSO\n  // setTarefas(tarefas);     // mesma referencia = sem re-render\n\n  // CORRETO: atualizar item especifico com map\n  function marcarFeita(id) {\n    setTarefas(\n      tarefas.map((tarefa) =>\n        tarefa.id === id ? { ...tarefa, feita: !tarefa.feita } : tarefa\n      )\n    );\n  }\n\n  // CORRETO: remover item com filter\n  function removerTarefa(id) {\n    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));\n  }\n\n  return (\n    <div>\n      <ul>\n        {tarefas.map((tarefa) => (\n          <li key={tarefa.id} style={{ textDecoration: tarefa.feita ? "line-through" : "none" }}>\n            {tarefa.texto}\n            <button onClick={() => marcarFeita(tarefa.id)}>Concluir</button>\n            <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}',
        filename: 'estado-arrays.jsx',
        description:
          'Para arrays em estado: adicione com spread [...array, novoItem], atualize com map(), remova com filter(). Cada operacao retorna um novo array — nunca o mesmo array modificado.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState } from "react";\n\n// Estado com objeto\nfunction FormularioDeContato() {\n  const [formulario, setFormulario] = useState({\n    nome: "",\n    email: "",\n    mensagem: "",\n  });\n\n  // Funcao generica para atualizar qualquer campo\n  function handleChange(campo, valor) {\n    // CORRETO: spread do objeto atual + campo alterado\n    setFormulario({ ...formulario, [campo]: valor });\n\n    // ERRADO: mutacao direta\n    // formulario.nome = valor; // NAO FACA ISSO\n  }\n\n  return (\n    <form>\n      <input\n        value={formulario.nome}\n        onChange={(e) => handleChange("nome", e.target.value)}\n        placeholder="Seu nome"\n      />\n      <input\n        value={formulario.email}\n        onChange={(e) => handleChange("email", e.target.value)}\n        placeholder="Seu email"\n      />\n      <textarea\n        value={formulario.mensagem}\n        onChange={(e) => handleChange("mensagem", e.target.value)}\n        placeholder="Sua mensagem"\n      />\n      <p>Nome: {formulario.nome}</p>\n    </form>\n  );\n}',
        filename: 'estado-objetos.jsx',
        description:
          'Para objetos em estado, use spread: { ...objetoAtual, campoAlterado: novoValor }. Isso cria um novo objeto com todos os campos originais mais o campo atualizado. Notacao computada [campo] permite usar uma variavel como chave.',
      },
    },
    {
      type: 'text',
      content:
        '## Multiplos estados e estado derivado\n\nVoce pode ter quantos `useState` quiser em um componente. Prefira multiplos estados simples a um unico estado objeto complexo. Estado derivado e um valor calculado a partir do estado — nao precisa ser armazenado, apenas calculado na hora do render.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: 'import { useState } from "react";\n\nfunction CarrinhoDeCompras() {\n  const [itens, setItens] = useState([]);\n  const [desconto, setDesconto] = useState(0);\n  const [modalAberto, setModalAberto] = useState(false);\n\n  // Estado derivado: calculado a partir de outros estados\n  // NAO precisa de useState — recalcula a cada render\n  const subtotal = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);\n  const valorDesconto = subtotal * (desconto / 100);\n  const total = subtotal - valorDesconto;\n  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);\n\n  function adicionarItem(produto) {\n    const itemExistente = itens.find((i) => i.id === produto.id);\n    if (itemExistente) {\n      setItens(\n        itens.map((i) =>\n          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i\n        )\n      );\n    } else {\n      setItens([...itens, { ...produto, quantidade: 1 }]);\n    }\n  }\n\n  return (\n    <div>\n      <h1>Carrinho ({quantidadeTotal} itens)</h1>\n      <p>Subtotal: R$ {subtotal.toFixed(2)}</p>\n      <p>Desconto ({desconto}%): -R$ {valorDesconto.toFixed(2)}</p>\n      <p><strong>Total: R$ {total.toFixed(2)}</strong></p>\n    </div>\n  );\n}',
        filename: 'multiplos-estados.jsx',
        description:
          'Prefira estados simples e especificos. subtotal, total e quantidadeTotal sao derivados de itens e desconto — calcule na hora do render, nao armazene em estado separado. Isso evita inconsistencias.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use a forma funcional do setter quando o novo estado depende do estado anterior: setContagem(anterior => anterior + 1). Isso garante que voce sempre tem o valor mais recente, especialmente em closures e callbacks asincronos.',
    },
  ],
  challenges: [
    {
      id: 'react-c3-contador',
      title: 'Contador Completo',
      description:
        'Implemente um componente Contador com tres botoes: Incrementar (adiciona 1), Decrementar (subtrai 1) e Resetar (volta a 0). Adicione uma regra: o contador nao pode ir abaixo de 0 nem acima de 10. Quando estiver no limite, o botao correspondente deve ficar desabilitado. Mostre a contagem atual com destaque visual diferente para 0 (vermelho), 10 (verde) e valores intermediarios (preto).',
      language: 'javascript',
      starterCode:
        'import { useState } from "react";\n\nfunction Contador() {\n  const [contagem, setContagem] = useState(0);\n\n  // Implemente as funcoes\n  function incrementar() {\n    // Adicione 1, mas nao ultrapasse 10\n  }\n\n  function decrementar() {\n    // Subtraia 1, mas nao va abaixo de 0\n  }\n\n  function resetar() {\n    // Volta para 0\n  }\n\n  // Calcule a cor baseada na contagem\n  const cor = "preto"; // mude para vermelho (0), verde (10) ou preto\n\n  return (\n    <div style={{ textAlign: "center", padding: "20px" }}>\n      <h1 style={{ color: cor, fontSize: "3rem" }}>{contagem}</h1>\n      {/* Adicione os botoes com disabled quando nos limites */}\n    </div>\n  );\n}\n\nexport default Contador;\n',
      solution:
        'import { useState } from "react";\n\nfunction Contador() {\n  const [contagem, setContagem] = useState(0);\n\n  function incrementar() {\n    if (contagem < 10) {\n      setContagem(contagem + 1);\n    }\n  }\n\n  function decrementar() {\n    if (contagem > 0) {\n      setContagem(contagem - 1);\n    }\n  }\n\n  function resetar() {\n    setContagem(0);\n  }\n\n  const cor = contagem === 0 ? "red" : contagem === 10 ? "green" : "black";\n\n  return (\n    <div style={{ textAlign: "center", padding: "20px" }}>\n      <h1 style={{ color: cor, fontSize: "3rem" }}>{contagem}</h1>\n      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>\n        <button onClick={decrementar} disabled={contagem === 0}>\n          Decrementar\n        </button>\n        <button onClick={resetar}>Resetar</button>\n        <button onClick={incrementar} disabled={contagem === 10}>\n          Incrementar\n        </button>\n      </div>\n    </div>\n  );\n}\n\nexport default Contador;\n',
      hints: [
        'Use um if dentro da funcao incrementar para checar se contagem < 10 antes de chamar setContagem.',
        'A prop disabled de um button aceita um booleano: disabled={contagem === 0} desabilita quando a contagem for 0.',
        'Para a cor, use um ternario encadeado: contagem === 0 ? "red" : contagem === 10 ? "green" : "black".',
        'Passe a cor no style inline: style={{ color: cor }}.',
      ],
    },
  ],
};
