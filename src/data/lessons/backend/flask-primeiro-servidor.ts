import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'flask-primeiro-servidor',
  moduleId: 'backend',
  title: 'Flask: Seu Primeiro Servidor',
  description:
    'Aprenda a instalar o Flask, criar sua primeira rota, rodar o servidor e retornar HTML e JSON.',
  order: 2,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Flask e como montar um restaurante pequeno: simples, rapido e perfeito para comecar!\n\n## O Que e Flask?\n\n**Flask** e um micro-framework web para Python. "Micro" nao significa que ele e limitado -- significa que ele e **leve e flexivel**, te dando liberdade para escolher as ferramentas que quiser.\n\nCom Flask, voce consegue criar um servidor web completo com poucas linhas de codigo. Ele e perfeito para aprender backend porque e simples, direto e muito popular no mercado.\n\nVamos instalar e criar nosso primeiro servidor!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Primeiro, instale o Flask no terminal:\n# pip install flask\n\n# Verificando se a instalacao funcionou\nimport flask\nprint(f"Flask instalado com sucesso! Versao: {flask.__version__}")',
        filename: 'instalar_flask.py',
        description: 'Instalando e verificando o Flask.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Recomendamos usar um **ambiente virtual** (venv) para isolar as dependencias do seu projeto. Crie com `python -m venv venv` e ative com `source venv/bin/activate` (Linux/Mac) ou `venv\\Scripts\\activate` (Windows).',
    },
    {
      type: 'text',
      content:
        '## Seu Primeiro Servidor\n\nVamos criar o servidor mais simples possivel com Flask. Precisamos de apenas 5 linhas de codigo!\n\nO processo e:\n1. Importar o Flask\n2. Criar a aplicacao\n3. Definir uma **rota** (URL que o servidor responde)\n4. Rodar o servidor',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask\n\n# Criando a aplicacao Flask\napp = Flask(__name__)\n\n# Definindo a rota principal (/)\n@app.route("/")\ndef pagina_inicial():\n    return "Ola, mundo! Meu primeiro servidor Flask!"\n\n# Rodando o servidor\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'app.py',
        description: 'Servidor Flask minimo com uma rota.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O parametro `debug=True` faz o servidor **reiniciar automaticamente** quando voce salva mudancas no codigo. Muito util durante o desenvolvimento! Mas **nunca** use debug=True em producao.',
    },
    {
      type: 'text',
      content:
        '## Retornando HTML\n\nVoce pode retornar HTML diretamente das suas rotas para criar paginas web completas. Basta retornar uma string com tags HTML.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef pagina_inicial():\n    return """\n    <html>\n    <head><title>Meu Site</title></head>\n    <body>\n        <h1>Bem-vindo ao meu site!</h1>\n        <p>Este e um servidor Flask retornando HTML.</p>\n        <ul>\n            <li>Facil de criar</li>\n            <li>Rapido para prototipar</li>\n            <li>Perfeito para aprender</li>\n        </ul>\n    </body>\n    </html>\n    """\n\n@app.route("/sobre")\ndef sobre():\n    return "<h1>Sobre</h1><p>Pagina criada com Flask!</p>"\n\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'app_html.py',
        description: 'Servidor Flask retornando paginas HTML.',
      },
    },
    {
      type: 'text',
      content:
        '## Retornando JSON (APIs)\n\nPara criar APIs, precisamos retornar dados em formato JSON. O Flask facilita isso com a funcao `jsonify()`, que converte dicionarios Python em respostas JSON automaticamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n# Lista de tarefas em memoria\ntarefas = [\n    {"id": 1, "titulo": "Estudar Flask", "concluida": False},\n    {"id": 2, "titulo": "Criar API", "concluida": False},\n]\n\n@app.route("/api/tarefas")\ndef listar_tarefas():\n    return jsonify(tarefas)\n\n@app.route("/api/status")\ndef status():\n    return jsonify({\n        "status": "online",\n        "versao": "1.0",\n        "total_tarefas": len(tarefas)\n    })\n\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'app_json.py',
        description: 'Servidor Flask retornando dados JSON.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Ao acessar `http://localhost:5000/api/tarefas` no navegador, voce vera os dados JSON. O Flask roda por padrao na porta **5000**. Se a porta ja estiver em uso, mude com `app.run(port=8080)`.',
    },
    {
      type: 'callout',
      content:
        'Backend pode parecer misterioso, mas e so codigo que roda no servidor. Voce ja sabe programar — agora vai aplicar de um jeito novo!',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'be3-c1',
      title: 'Servidor de Saudacao',
      description:
        'Crie um servidor Flask com uma rota "/" que retorna uma saudacao em HTML com seu nome em um h1 e uma mensagem de boas-vindas em um paragrafo.',
      language: 'python',
      starterCode: 'from flask import Flask\n\napp = Flask(__name__)\n\n# Crie a rota "/" que retorna HTML com saudacao\n\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask\n\napp = Flask(__name__)\n\n@app.route("/")\ndef saudacao():\n    return """\n    <h1>Ola, eu sou o Estudante!</h1>\n    <p>Bem-vindo ao meu primeiro servidor Flask!</p>\n    """\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Use o decorador @app.route("/") antes da funcao',
        'Retorne uma string com tags HTML como <h1> e <p>',
        'Use aspas triplas para strings de multiplas linhas',
      ],
    },
    {
      id: 'be3-c2',
      title: 'API de Cardapio',
      description:
        'Crie um servidor Flask com uma rota "/api/cardapio" que retorna uma lista de 3 pratos em JSON, cada um com nome e preco.',
      language: 'python',
      starterCode: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\n# Crie a lista de pratos e a rota /api/cardapio\n\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\ncardapio = [\n    {"nome": "Pizza Margherita", "preco": 35.90},\n    {"nome": "Hamburguer Artesanal", "preco": 28.50},\n    {"nome": "Salada Caesar", "preco": 22.00},\n]\n\n@app.route("/api/cardapio")\ndef listar_cardapio():\n    return jsonify(cardapio)\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Crie uma lista de dicionarios com nome e preco',
        'Use jsonify() para retornar a lista como JSON',
        'Cada prato deve ter pelo menos "nome" e "preco"',
      ],
    },
    {
      id: 'be3-c3',
      title: 'Multiplas Rotas',
      description:
        'Crie um servidor Flask com 3 rotas: "/" retorna uma mensagem de boas-vindas, "/api/info" retorna JSON com nome e versao da API, e "/api/hora" retorna a hora atual em JSON.',
      language: 'python',
      starterCode: 'from flask import Flask, jsonify\nfrom datetime import datetime\n\napp = Flask(__name__)\n\n# Rota / - mensagem de boas-vindas\n\n# Rota /api/info - informacoes da API em JSON\n\n# Rota /api/hora - hora atual em JSON\n\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask, jsonify\nfrom datetime import datetime\n\napp = Flask(__name__)\n\n@app.route("/")\ndef inicio():\n    return "<h1>Bem-vindo a minha API!</h1>"\n\n@app.route("/api/info")\ndef info():\n    return jsonify({\n        "nome": "Minha API",\n        "versao": "1.0.0",\n        "autor": "Estudante"\n    })\n\n@app.route("/api/hora")\ndef hora():\n    agora = datetime.now()\n    return jsonify({\n        "hora": agora.strftime("%H:%M:%S"),\n        "data": agora.strftime("%d/%m/%Y")\n    })\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Cada rota precisa do decorador @app.route() com a URL',
        'Use datetime.now() para obter a hora atual',
        'Use strftime() para formatar a data/hora como string',
      ],
    },
  ],
};
