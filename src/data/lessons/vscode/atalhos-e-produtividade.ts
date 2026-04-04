import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'atalhos-e-produtividade',
  moduleId: 'vscode',
  title: 'Atalhos e Produtividade',
  description: 'Domine os atalhos mais poderosos do VS Code: multi-cursor, selecao de coluna, mover linhas, busca e substituicao global e renomear simbolo',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Atalhos que mudam como voce programa\n\nA diferenca entre um programador lento e um rapido nao e velocidade de digitacao — e o conhecimento de atalhos que eliminam acoes repetitivas. O VS Code tem alguns dos atalhos mais poderosos de qualquer editor.\n\n### Multi-cursor — editar varios lugares ao mesmo tempo\n\n**Adicionar cursor manualmente:**\n`Alt+Click` — adiciona um cursor onde voce clica. Cada cursor opera independentemente.\n\n**Selecionar proxima ocorrencia:**\n`Ctrl+D` — seleciona a proxima ocorrencia da palavra sob o cursor. Pressione varias vezes para selecionar mais.\n`Ctrl+Shift+L` — seleciona TODAS as ocorrencias de uma vez.\n\n**Cursor em todas as linhas de uma selecao:**\n`Alt+Shift+I` — coloca um cursor no final de cada linha selecionada. Ideal para adicionar algo ao fim de varias linhas.\n\n### Selecao de coluna (block selection)\n`Shift+Alt+arraste` — seleciona um bloco retangular de texto. Util para editar colunas de dados.\n`Shift+Alt+Down/Up` — expande a selecao de coluna linha por linha.\n\n### Mover e duplicar linhas\n`Alt+Down/Up` — move a linha atual (ou as linhas selecionadas) para cima ou para baixo.\n`Shift+Alt+Down/Up` — duplica a linha atual acima ou abaixo.\n\n### Comentar codigo\n`Ctrl+/` — comenta/descomenta linha(s) selecionada(s) com comentario de linha.\n`Shift+Alt+A` — comenta/descomenta com comentario de bloco.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo de uso de multi-cursor:\n# Imagine que voce tem esta lista e quer adicionar virgula ao final de cada item\n\nnomes = [\n    "Alice"\n    "Bruno"\n    "Carlos"\n    "Diana"\n    "Eduardo"\n]\n\n# Passo a passo com multi-cursor:\n# 1. Selecione todas as linhas com os nomes (de "Alice" ate "Eduardo")\n# 2. Pressione Alt+Shift+I para colocar cursor no fim de cada linha\n# 3. Digite a virgula — ela aparece em todas as linhas simultaneamente\n\n# Resultado:\nnomes = [\n    "Alice",\n    "Bruno",\n    "Carlos",\n    "Diana",\n    "Eduardo",\n]\n\n# Outro uso: renomear uma variavel local com Ctrl+D\n# Posicione o cursor em "preco" e pressione Ctrl+D para selecionar cada ocorrencia\npreco = 100\npreco_com_desconto = preco * 0.9\nprint(f"Preco original: {preco}, Com desconto: {preco_com_desconto}")',
        filename: 'multi_cursor_exemplo.py',
        description:
          'Demonstracao de situacoes onde multi-cursor economiza tempo: adicionar caracteres ao fim de multiplas linhas e renomear variaveis locais. Estas tecnicas eliminam a necessidade de editar linha por linha.',
      },
    },
    {
      type: 'text',
      content:
        '## Busca e Substituicao Avancada\n\n### Busca no arquivo atual\n`Ctrl+F` — abre a barra de busca.\n- Icone `.*` — ativa expressoes regulares\n- Icone `Aa` — ativa case-sensitive\n- Icone `[ab]` — corresponde apenas palavra inteira\n\n### Busca global (todos os arquivos)\n`Ctrl+Shift+F` — busca em todos os arquivos do workspace.\n- Suporta regex, filtros de arquivo (`*.py`) e exclusoes (`node_modules`)\n- `Ctrl+Shift+H` — busca e substituicao global\n\n### Renomear simbolo — F2\n`F2` e o atalho correto para renomear variaveis, funcoes e classes em todo o projeto. Diferente de busca e substituicao, o F2 entende o escopo do codigo e so renomeia as referencias corretas (nao textos coincidentes em comentarios ou strings).\n\n### Outros atalhos essenciais\n- `Ctrl+Z / Ctrl+Shift+Z` — desfazer/refazer\n- `Ctrl+X / C / V` — recortar/copiar/colar (sem selecao, opera na linha inteira)\n- `Ctrl+Shift+K` — deletar linha inteira\n- `Ctrl+Enter` — inserir linha abaixo (sem mover o cursor)\n- `Ctrl+Shift+Enter` — inserir linha acima\n- `Home / End` — inicio/fim da linha\n- `Ctrl+Home / Ctrl+End` — inicio/fim do arquivo\n- `Ctrl+L` — selecionar linha inteira\n- `Ctrl+Shift+[` / `Ctrl+Shift+]` — fechar/abrir bloco de codigo (folding)',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Atalho dos atalhos: Ctrl+K Ctrl+S abre o editor de atalhos de teclado com busca. Voce pode ver todos os atalhos, filtrar por acao e redefinir qualquer um. Tambem ha o comando "Preferences: Open Keyboard Shortcuts (JSON)" para editar diretamente em JSON.',
    },
  ],
  challenges: [
    {
      id: 'vscode-atalhos-c1',
      title: 'Refatoracao com Atalhos',
      description:
        'O codigo abaixo tem uma variavel chamada "val" usada em varios lugares, e multiplas linhas que precisam de ponto-e-virgula ao final. Refatore o codigo: renomeie "val" para "preco_unitario" em todos os lugares, e escreva a versao corrigida. Documente no comentario inicial quais atalhos do VS Code voce usaria para fazer isso rapidamente.',
      language: 'python',
      starterCode:
        '# Documente aqui os atalhos que usaria para fazer esta refatoracao:\n# Atalho para renomear simbolo: ?\n# Atalho para adicionar texto ao fim de multiplas linhas: ?\n\nval = 50\nquantidade = 3\ndesconto = 0.1\n\ntotal = val * quantidade\ntotal_com_desconto = total - (total * desconto)\npreco_por_unidade = val\n\nprint(f"Valor: {val}")\nprint(f"Total: {total}")\nprint(f"Com desconto: {total_com_desconto}")\nprint(f"Preco por unidade: {preco_por_unidade}")\n',
      solution:
        '# Atalhos usados para fazer esta refatoracao:\n# Atalho para renomear simbolo: F2 (posicionar cursor em "val" e pressionar F2)\n# Atalho para adicionar texto ao fim de multiplas linhas: selecionar linhas + Alt+Shift+I\n\npreco_unitario = 50\nquantidade = 3\ndesconto = 0.1\n\ntotal = preco_unitario * quantidade\ntotal_com_desconto = total - (total * desconto)\npreco_por_unidade = preco_unitario\n\nprint(f"Valor: {preco_unitario}")\nprint(f"Total: {total}")\nprint(f"Com desconto: {total_com_desconto}")\nprint(f"Preco por unidade: {preco_por_unidade}")\n',
      hints: [
        'F2 e o atalho para renomear simbolo — ele renomeia apenas as referencias ao simbolo, nao todas as ocorrencias de texto',
        'Para adicionar texto ao fim de multiplas linhas: selecione as linhas desejadas e pressione Alt+Shift+I para colocar um cursor no fim de cada uma',
        'Ctrl+D seleciona a proxima ocorrencia da palavra sob o cursor — util para renomear quando F2 nao esta disponivel',
      ],
    },
    {
      id: 'vscode-atalhos-c2',
      title: 'Script de Referencia de Atalhos',
      description:
        'Crie um script Python que imprime uma tabela formatada com os 12 atalhos mais importantes do VS Code organizados por categoria: Edicao (4 atalhos), Navegacao (4 atalhos) e Busca (4 atalhos). Use string formatting para alinhar as colunas.',
      language: 'python',
      starterCode:
        '# Tabela de atalhos essenciais do VS Code\n# Organize em 3 categorias com 4 atalhos cada\n\ndef imprimir_tabela_atalhos():\n    atalhos = {\n        "Edicao": [\n            # Adicione 4 atalhos de edicao: (atalho, descricao)\n        ],\n        "Navegacao": [\n            # Adicione 4 atalhos de navegacao\n        ],\n        "Busca": [\n            # Adicione 4 atalhos de busca\n        ],\n    }\n    \n    # Complete: imprima a tabela formatada\n    pass\n\nimprimir_tabela_atalhos()\n',
      solution:
        '# Tabela de atalhos essenciais do VS Code\n\ndef imprimir_tabela_atalhos():\n    atalhos = {\n        "Edicao": [\n            ("Alt+Up/Down", "Mover linha para cima ou para baixo"),\n            ("Shift+Alt+Down", "Duplicar linha abaixo"),\n            ("Ctrl+Shift+K", "Deletar linha inteira"),\n            ("Alt+Shift+I", "Cursor no fim de cada linha selecionada"),\n        ],\n        "Navegacao": [\n            ("Ctrl+P", "Quick Open - abrir arquivo por nome"),\n            ("Ctrl+G", "Ir para linha especifica"),\n            ("F12", "Ir para definicao do simbolo"),\n            ("Alt+Left/Right", "Navegar no historico de posicoes"),\n        ],\n        "Busca": [\n            ("Ctrl+F", "Buscar no arquivo atual"),\n            ("Ctrl+H", "Buscar e substituir no arquivo"),\n            ("Ctrl+Shift+F", "Busca global em todos os arquivos"),\n            ("F2", "Renomear simbolo em todo o projeto"),\n        ],\n    }\n\n    for categoria, lista in atalhos.items():\n        print(f"\\n=== {categoria} ===")\n        print(f"  {\'Atalho\':<25} {\'Descricao\'}")\n        print(f"  {\'-\'*24} {\'-\'*35}")\n        for atalho, descricao in lista:\n            print(f"  {atalho:<25} {descricao}")\n\nimprimir_tabela_atalhos()\n',
      hints: [
        'Use um dicionario onde as chaves sao as categorias e os valores sao listas de tuplas (atalho, descricao)',
        'Para alinhar colunas use f-string com especificador de largura: f"{texto:<25}" alinha a esquerda em 25 caracteres',
        'Itere o dicionario com "for categoria, lista in atalhos.items()" e dentro itere a lista de tuplas',
      ],
    },
  ],
};
