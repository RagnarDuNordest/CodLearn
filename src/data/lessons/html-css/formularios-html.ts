import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'formularios-html',
  moduleId: 'html-css',
  title: 'Formularios HTML',
  description:
    'Aprenda a criar formularios interativos com campos de texto, selecao, botoes e diferentes tipos de input.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Formularios na web sao como fichas de papel que voce preenche no medico: campos para nome, email, mensagem. Vamos aprender a criar esses formularios com HTML!\n\n## O que sao formularios?\n\nFormularios sao a principal forma de coletar informacoes do usuario em uma pagina web. Eles estao em toda parte: cadastros, campos de busca, comentarios, pesquisas, logins e muito mais.\n\nEm HTML, usamos a tag **`<form>`** para criar um formulario. Dentro dela, colocamos os campos onde o usuario vai digitar ou selecionar informacoes.\n\nOs atributos mais importantes do `<form>` sao:\n- **`action`**: A URL para onde os dados serao enviados.\n- **`method`**: O metodo HTTP usado (geralmente `GET` ou `POST`).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'formulario-basico.html',
        code: '<form action="/cadastro" method="POST">\n  <label for="nome">Nome:</label>\n  <input type="text" id="nome" name="nome" placeholder="Digite seu nome">\n\n  <label for="email">E-mail:</label>\n  <input type="email" id="email" name="email" placeholder="seu@email.com">\n\n  <button type="submit">Enviar</button>\n</form>',
        description:
          'Formulario basico com campos de nome e e-mail. A tag label identifica cada campo, o input cria os campos de entrada e o button envia o formulario.',
      },
    },
    {
      type: 'text',
      content:
        '## A tag `<label>` e `<input>`\n\nA tag **`<label>`** cria um rotulo para um campo do formulario. O atributo `for` do label deve corresponder ao `id` do input. Isso melhora a acessibilidade e permite que o usuario clique no texto do label para focar no campo.\n\nA tag **`<input>`** e a mais versatil dos formularios. Dependendo do atributo `type`, ela cria diferentes tipos de campo:\n\n- **`text`**: Campo de texto simples\n- **`email`**: Campo de e-mail (valida o formato)\n- **`password`**: Campo de senha (oculta os caracteres)\n- **`number`**: Campo numerico (aceita apenas numeros)\n- **`checkbox`**: Caixa de selecao\n- **`radio`**: Botao de opcao (selecionar uma entre varias)\n- **`date`**: Seletor de data',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'tipos-input.html',
        code: '<form>\n  <label for="senha">Senha:</label>\n  <input type="password" id="senha" name="senha">\n\n  <label for="idade">Idade:</label>\n  <input type="number" id="idade" name="idade" min="0" max="120">\n\n  <label for="nascimento">Data de nascimento:</label>\n  <input type="date" id="nascimento" name="nascimento">\n\n  <label>\n    <input type="checkbox" name="termos"> Aceito os termos de uso\n  </label>\n\n  <p>Genero:</p>\n  <label><input type="radio" name="genero" value="m"> Masculino</label>\n  <label><input type="radio" name="genero" value="f"> Feminino</label>\n  <label><input type="radio" name="genero" value="o"> Outro</label>\n</form>',
        description:
          'Diferentes tipos de input: senha, numero, data, checkbox e radio. Note que os radio buttons com o mesmo name formam um grupo onde apenas um pode ser selecionado.',
      },
    },
    {
      type: 'text',
      content:
        '## Select e Textarea\n\nAlem do `<input>`, existem outros elementos de formulario importantes:\n\n**`<select>`**: Cria um menu suspenso (dropdown) para o usuario escolher uma opcao. Cada opcao e definida com `<option>`.\n\n**`<textarea>`**: Cria um campo de texto com varias linhas, ideal para comentarios ou mensagens longas. Diferente do input, o textarea tem tag de abertura e fechamento. Os atributos `rows` e `cols` controlam o tamanho visivel.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'select-textarea.html',
        code: '<form>\n  <label for="estado">Estado:</label>\n  <select id="estado" name="estado">\n    <option value="">Selecione...</option>\n    <option value="SP">Sao Paulo</option>\n    <option value="RJ">Rio de Janeiro</option>\n    <option value="MG">Minas Gerais</option>\n    <option value="BA">Bahia</option>\n  </select>\n\n  <label for="mensagem">Mensagem:</label>\n  <textarea id="mensagem" name="mensagem" rows="4" cols="50"\n    placeholder="Digite sua mensagem aqui..."></textarea>\n\n  <button type="submit">Enviar</button>\n</form>',
        description:
          'Exemplo de select (menu suspenso) com opcoes de estados e textarea (campo de texto multilinha) para mensagens.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O atributo "name" e essencial em todos os campos de formulario. E ele que identifica cada campo quando os dados sao enviados ao servidor. Sem o name, o dado daquele campo nao sera enviado.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'O atributo "placeholder" mostra um texto de exemplo dentro do campo que desaparece quando o usuario comeca a digitar. Ele nao substitui o label — sempre use ambos para boa acessibilidade.',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa decorar todas as tags! Com a pratica, as mais usadas ficam automaticas.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Validacao de Formularios com HTML\n\nO HTML5 oferece atributos de validacao que funcionam diretamente no navegador, sem precisar de JavaScript. Eles verificam os dados antes de enviar o formulario e exibem mensagens de erro automaticamente.\n\nOs principais atributos de validacao sao:\n\n- **`required`**: Torna o campo obrigatorio. O formulario nao sera enviado se estiver vazio.\n- **`min` e `max`**: Definem o valor minimo e maximo para campos numericos ou de data.\n- **`minlength` e `maxlength`**: Limitam o numero de caracteres de campos de texto.\n- **`pattern`**: Valida o valor com uma expressao regular.\n- **`type="email"`**: Valida o formato de e-mail automaticamente.\n- **`type="url"`**: Valida o formato de URL automaticamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'html',
        filename: 'validacao.html',
        code: '<form action="/cadastro" method="POST">\n  <!-- Campo obrigatorio -->\n  <label for="nome">Nome completo: *</label>\n  <input type="text" id="nome" name="nome"\n    required\n    minlength="3"\n    maxlength="100"\n    placeholder="Digite seu nome completo">\n\n  <!-- Email com validacao automatica -->\n  <label for="email">E-mail: *</label>\n  <input type="email" id="email" name="email"\n    required\n    placeholder="seu@email.com">\n\n  <!-- Numero com limites -->\n  <label for="idade">Idade:</label>\n  <input type="number" id="idade" name="idade"\n    min="18"\n    max="120">\n\n  <!-- Senha com tamanho minimo -->\n  <label for="senha">Senha: *</label>\n  <input type="password" id="senha" name="senha"\n    required\n    minlength="8"\n    placeholder="Minimo 8 caracteres">\n\n  <button type="submit">Cadastrar</button>\n  <button type="reset">Limpar</button>\n</form>',
        description: 'Formulario com validacao HTML5: required para campos obrigatorios, minlength/maxlength para texto, min/max para numeros. O botao reset limpa todos os campos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Acessibilidade em formularios e fundamental. Sempre associe cada `<label>` ao seu `<input>` correspondente usando `for` e `id`. Para grupos de radio buttons e checkboxes, use `<fieldset>` e `<legend>` para agrupar e descrever o grupo. Isso beneficia usuarios de leitores de tela.',
    },
  ],
  challenges: [
    {
      id: 'form-c1',
      title: 'Formulario de login',
      description:
        'Crie um formulario com dois campos: um input de email (com label "E-mail:") e um input de senha (com label "Senha:"), seguidos de um botao "Entrar".',
      language: 'html',
      starterCode:
        '<form>\n  <!-- Crie os campos de email e senha com labels e o botao aqui -->\n</form>',
      solution:
        '<form>\n  <label for="email">E-mail:</label>\n  <input type="email" id="email" name="email">\n\n  <label for="senha">Senha:</label>\n  <input type="password" id="senha" name="senha">\n\n  <button type="submit">Entrar</button>\n</form>',
      hints: [
        'Use type="email" para o campo de e-mail e type="password" para a senha.',
        'O atributo for do label deve ser igual ao id do input correspondente.',
        'Use <button type="submit"> para criar o botao de envio.',
      ],
    },
    {
      id: 'form-c2',
      title: 'Formulario com select',
      description:
        'Crie um formulario com um label "Curso:", um select com id "curso" e 3 opcoes: "HTML e CSS" (value="html-css"), "JavaScript" (value="js") e "Python" (value="python"). Adicione uma primeira opcao desabilitada com texto "Selecione um curso".',
      language: 'html',
      starterCode:
        '<form>\n  <!-- Crie o select com as opcoes aqui -->\n</form>',
      solution:
        '<form>\n  <label for="curso">Curso:</label>\n  <select id="curso" name="curso">\n    <option value="" disabled>Selecione um curso</option>\n    <option value="html-css">HTML e CSS</option>\n    <option value="js">JavaScript</option>\n    <option value="python">Python</option>\n  </select>\n</form>',
      hints: [
        'Use <select> com <option> para criar o menu suspenso.',
        'A primeira opcao pode ter o atributo disabled para nao ser selecionavel.',
        'Cada <option> precisa de um atributo value.',
      ],
    },
    {
      id: 'form-c3',
      title: 'Formulario de contato completo',
      description:
        'Crie um formulario de contato com: input de texto para o nome (label "Nome:"), input de email (label "E-mail:"), textarea para a mensagem (label "Mensagem:", 5 rows) e um botao "Enviar Mensagem".',
      language: 'html',
      starterCode:
        '<form action="/contato" method="POST">\n  <!-- Crie os campos de contato aqui -->\n</form>',
      solution:
        '<form action="/contato" method="POST">\n  <label for="nome">Nome:</label>\n  <input type="text" id="nome" name="nome">\n\n  <label for="email">E-mail:</label>\n  <input type="email" id="email" name="email">\n\n  <label for="mensagem">Mensagem:</label>\n  <textarea id="mensagem" name="mensagem" rows="5"></textarea>\n\n  <button type="submit">Enviar Mensagem</button>\n</form>',
      hints: [
        'Use <input type="text"> para o nome e <input type="email"> para o email.',
        'Use <textarea> com o atributo rows="5" para o campo de mensagem.',
        'Nao esqueca de associar cada label ao seu campo usando for e id.',
      ],
    },
  ],
};
