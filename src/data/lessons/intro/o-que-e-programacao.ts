import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-programacao',
  moduleId: 'intro',
  title: 'O que e Programacao?',
  description:
    'Descubra o que e programacao, como funciona na pratica e por que aprender isso pode transformar sua vida profissional.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 12,
  sections: [
    {
      type: 'callout',
      calloutType: 'info',
      content: '**Antes de comecar:** Voce nao precisa saber nada de tecnologia para entender esta licao. Se voce sabe usar um celular, voce ja tem tudo que precisa. Vamos do zero absoluto.',
    },
    {
      type: 'text',
      content:
        '## Por que aprender isso vai mudar sua vida?\n\nEngenheiros de software ganham, em media, **R$ 8.000 a R$ 25.000 por mes** no Brasil. Empresas como Google, Nubank, Mercado Livre e centenas de startups contratam o tempo todo. Mas mais importante: programar e a habilidade de **criar coisas do nada**.\n\nVoce pode criar:\n- Um aplicativo que resolva um problema da sua cidade\n- Um site que venda seus produtos\n- Um programa que automatize tarefas chatas do seu trabalho\n- Sistemas que ajudem medicos a salvar vidas\n\nTudo isso comeca pelo que voce vai aprender agora.',
    },
    {
      type: 'text',
      content:
        '## O que e programacao? A analogia perfeita\n\nImagine que voce vai contratar um funcionario para trabalhar na sua loja. Este funcionario e **incrivelmente obediente** — ele faz exatamente o que voce mandar, na ordem que voce mandar, sem questionar.\n\nPorem, este funcionario tem um problema: **ele e extremamente literal**. Se voce disser "abra a porta", ele vai ficar parado esperando voce dizer qual porta. Se voce disser "pegue o produto", ele pergunta: qual produto? Onde esta?\n\nO computador e exatamente esse funcionario. Ele e rapido, incansavel, e nao erra — mas precisa de instrucoes **muito precisas e detalhadas**.\n\n**Programacao e a arte de escrever essas instrucoes.**',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Programacao nao exige genialidade nem dom para matematica. Exige paciencia para ser preciso e curiosidade para resolver problemas. Essas sao habilidades que qualquer pessoa pode desenvolver.',
    },
    {
      type: 'text',
      content:
        '## Por que nao falamos direto com o computador em portugues?\n\nVoce deve estar pensando: "Por que nao simplesmente digito as instrucoes em portugues?"\n\nO computador, no fundo, so entende **eletricidade**: tem corrente eletrica (representado pelo numero 1) ou nao tem (representado pelo 0). Todo programa, todo site, todo jogo e, la no fundo, uma sequencia enorme de zeros e uns.\n\nEscrever programas diretamente em zeros e uns seria assim:\n\n`01001000 01100101 01101100 01101100 01101111`\n\nIsto significa apenas "Hello" em binario. Imagine escrever um aplicativo inteiro assim!\n\nPor isso existem as **linguagens de programacao**: elas sao um idioma intermediario que:\n- **Nos** conseguimos ler e escrever facilmente\n- O computador consegue **traduzir** para zeros e uns automaticamente',
    },
    {
      type: 'text',
      content:
        '## Seu primeiro programa\n\nVamos ver um programa real. Nao se preocupe em memorizar ainda — apenas observe e tente entender o que esta acontecendo:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Tudo que comeca com # e um comentario
# O computador ignora comentarios — eles sao para nos, humanos

# print() e uma funcao que exibe texto na tela
print("Ola, mundo!")

# Podemos fazer contas diretamente
print(10 + 25)

# Podemos misturar texto e calculos
nome = "Maria"
print("Bem-vinda ao CodLearn,", nome)`,
        filename: 'primeiro_programa.py',
        description: 'Seu primeiro contato com codigo Python. Cada linha faz uma coisa especifica.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '**O que acontece quando voce roda um programa?** O Python le seu codigo linha por linha, de cima para baixo, e executa cada instrucao em sequencia. E como seguir uma receita — o computador nunca pula etapas.',
    },
    {
      type: 'text',
      content:
        '## Erros fazem parte — e isso e normal!\n\nSe voce digitar algo errado, o Python vai mostrar uma mensagem de erro. Isso nao e fracasso — e informacao. Veja o tipo de erro mais comum:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# ERRADO: esqueceu as aspas
print(Ola mundo)
# Erro: SyntaxError: invalid syntax

# CERTO: texto sempre entre aspas
print("Ola mundo")
# Saida: Ola mundo`,
        filename: 'erro_comum.py',
        description: 'O Python avisa exatamente onde esta o problema. Erros sao seus aliados, nao inimigos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Erro que todo iniciante comete:** Esquecer as aspas ao redor de textos. Sempre que quiser mostrar palavras, coloque entre aspas: `print("assim")`. Numeros nao precisam de aspas: `print(42)`.',
    },
    {
      type: 'text',
      content:
        '## O dia a dia de um programador\n\nMuita gente imagina um programador digitando codigo o dia inteiro sozinho numa sala escura. A realidade e completamente diferente:\n\n**Manha:** Reuniao com o time para planejar o que vai ser construido\n**Inicio do dia:** Leitura de codigo ja existente para entender o contexto\n**Maior parte do tempo:** Pensar no problema e na solucao\n**Parte do tempo:** Escrever o codigo\n**Resto do tempo:** Testar, corrigir bugs, revisar codigo dos colegas\n\nO codigo em si e apenas uma parte. O grande trabalho e **resolver problemas logicos**.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Segredo dos profissionais:** Ate programadores com 20 anos de experiencia pesquisam no Google e na documentacao todo dia. Ninguem memoriza tudo. O que importa e saber pensar no problema e saber onde encontrar as respostas.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**💻 Configurando o VS Code para este curso**\n\nAntes de comecar a programar, instale duas coisas no VS Code:\n\n**1. Extensao Python** (`Ctrl+Shift+X` → busque "Python" → instale a da Microsoft)\nEla ativa o destaque de sintaxe, autocomplete e permite rodar arquivos Python diretamente no editor.\n\n**2. Extensao Error Lens** (`Ctrl+Shift+X` → busque "Error Lens")\nMostra os erros diretamente na linha do codigo, sem precisar passar o mouse.\n\n**Como rodar seu primeiro codigo:**\n- Crie um arquivo `ola.py`\n- Escreva `print("Ola, mundo!")`\n- Pressione `F5` ou clique no botao ▶ no canto superior direito\n- O resultado aparece no terminal integrado (`Ctrl+``)\n\nA partir de agora, cada licao vai mostrar como usar o VS Code para o topico especifico.',
    },
  ],
  challenges: [
    {
      id: 'oqep-c1',
      title: 'Sua primeira mensagem',
      description:
        'Use a funcao print() para exibir a mensagem "Ola, eu estou aprendendo a programar!" na tela.\n\nLembre-se: o texto dentro do print() precisa estar entre aspas.',
      language: 'python',
      starterCode: '# Escreva seu codigo abaixo\n# Use print() para mostrar a mensagem\n',
      solution: 'print("Ola, eu estou aprendendo a programar!")',
      hints: [
        'A sintaxe e: print("seu texto aqui") — com o texto entre aspas dentro dos parenteses.',
        'Cuidado com erros comuns: esqueceu as aspas? Colocou espaco extra? O Python e sensivel a esses detalhes.',
      ],
      testCases: [
        {
          description: 'Exibe a mensagem corretamente',
          expectedOutput: 'Ola, eu estou aprendendo a programar!',
        },
      ],
    },
    {
      id: 'oqep-c2',
      title: 'Tres mensagens na tela',
      description:
        'Exiba tres mensagens na tela, cada uma em uma linha separada. Cada print() automaticamente vai para a proxima linha.\n\n1. "Eu sou um programador!"\n2. "Python e incrivel!"\n3. "Vamos aprender juntos!"',
      language: 'python',
      starterCode: '# Use tres linhas de print(), uma para cada mensagem\n',
      solution: 'print("Eu sou um programador!")\nprint("Python e incrivel!")\nprint("Vamos aprender juntos!")',
      hints: [
        'Voce vai usar print() tres vezes, cada uma numa linha diferente do seu codigo.',
        'Cada print() exibe o texto e automaticamente pula para a proxima linha.',
        'Cuidado: o texto de cada mensagem precisa ser identico ao pedido (maiusculas, pontuacao, etc).',
      ],
      testCases: [
        {
          description: 'Exibe as tres mensagens na ordem correta',
          expectedOutput: 'Eu sou um programador!\nPython e incrivel!\nVamos aprender juntos!',
        },
      ],
    },
    {
      id: 'oqep-c3',
      title: 'O computador calculando por voce',
      description:
        'O computador e uma maquina de calcular gigante. Use print() para exibir o resultado da soma 10 + 25.\n\nAtencao: numeros NAO precisam de aspas. Se voce colocar aspas, o Python mostrara o texto "10 + 25" em vez de calcular o resultado.',
      language: 'python',
      starterCode: '# Use print() para exibir o resultado de 10 + 25\n# Dica: numeros e operacoes matematicas ficam sem aspas\n',
      solution: 'print(10 + 25)',
      hints: [
        'Errado: print("10 + 25") — isso exibe o texto, nao o calculo.',
        'Certo: print(10 + 25) — sem aspas, o Python calcula e mostra o resultado.',
      ],
      testCases: [
        {
          description: 'Exibe o resultado correto: 35',
          expectedOutput: '35',
        },
      ],
    },
  ],
};
