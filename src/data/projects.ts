export type ProjectDifficulty = 'iniciante' | 'intermediario' | 'avancado';

export interface ProjectStep {
  title: string;
  description: string;
  code?: string;
  tip?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  duration: string;
  skills: string[];
  emoji: string;
  color: string;
  steps: ProjectStep[];
}

const projects: Project[] = [
  {
    id: 'calculadora-web',
    title: 'Calculadora Web',
    description: 'Construa uma calculadora completa no navegador com HTML, CSS e JavaScript puro. Interface moderna com teclado e mouse.',
    difficulty: 'iniciante',
    duration: '2-3 horas',
    skills: ['HTML', 'CSS Grid', 'JavaScript', 'DOM', 'eventos'],
    emoji: '🧮',
    color: '#0891B2',
    steps: [
      { title: 'Estrutura HTML', description: 'Crie o arquivo index.html com a estrutura semântica da calculadora: display de resultado e grid de botões (0-9, operadores, igual, limpar).', code: '<div class="calculadora">\n  <div class="display" id="display">0</div>\n  <div class="botoes">\n    <button class="btn-op" data-op="C">C</button>\n    <button class="btn-op" data-op="/">÷</button>\n    <!-- ... -->\n  </div>\n</div>' },
      { title: 'Estilização com CSS Grid', description: 'Use CSS Grid para posicionar os botões em 4 colunas. Faça o botão "=" ter 2 colunas de largura. Adicione cores diferentes para números, operadores e ações especiais.', tip: 'grid-template-columns: repeat(4, 1fr). O botão = pode usar grid-column: span 2.' },
      { title: 'Lógica de estado', description: 'Crie variáveis JavaScript para armazenar: valor atual, operador selecionado, valor anterior e flag "esperandoSegundoOperando". Isso evita bugs clássicos da calculadora.', code: 'let valorAtual = "0";\nlet operador = null;\nlet valorAnterior = null;\nlet aguardando = false;' },
      { title: 'Manipulação de botões', description: 'Adicione event listeners usando delegação de eventos (um listener no container, não um por botão). Trate cliques em números, operadores, igual e limpar.', tip: 'document.querySelector(".botoes").addEventListener("click", e => { const btn = e.target.closest("button"); if(!btn) return; ... })' },
      { title: 'Suporte ao teclado', description: 'Adicione um listener no document para keydown. Mapeie teclas numéricas, operadores (+,-,*,/), Enter (=) e Escape (C). Destaque visualmente a tecla pressionada.', code: 'document.addEventListener("keydown", e => {\n  if(e.key >= "0" && e.key <= "9") inserirDigito(e.key);\n  if(e.key === "Enter") calcular();\n  if(e.key === "Escape") limpar();\n});' },
      { title: 'Histórico de operações', description: 'Adicione um segundo display menor acima do principal mostrando a operação atual (ex: "15 + 7 ="). Isso melhora muito a usabilidade e parece mais profissional.', tip: 'Atualize o display de histórico sempre que um operador for selecionado ou o igual for pressionado.' },
    ],
  },
  {
    id: 'todo-app',
    title: 'Lista de Tarefas com localStorage',
    description: 'App de tarefas completo com criação, edição, filtros, prioridades e persistência total no localStorage. Sem banco de dados!',
    difficulty: 'iniciante',
    duration: '3-4 horas',
    skills: ['HTML', 'CSS', 'JavaScript', 'localStorage', 'JSON'],
    emoji: '✅',
    color: '#059669',
    steps: [
      { title: 'Modelagem dos dados', description: 'Defina a estrutura de uma tarefa como objeto JavaScript. Inclua: id (timestamp), texto, concluída (boolean), prioridade (alta/média/baixa), criadaEm (data).', code: 'const novaTarefa = {\n  id: Date.now(),\n  texto: "Estudar JavaScript",\n  concluida: false,\n  prioridade: "alta",\n  criadaEm: new Date().toISOString()\n};' },
      { title: 'CRUD com localStorage', description: 'Crie funções para carregar (JSON.parse), salvar (JSON.stringify), adicionar, remover e atualizar tarefas. Sempre salve após qualquer mudança.', code: 'function salvar(tarefas) {\n  localStorage.setItem("tarefas", JSON.stringify(tarefas));\n}\nfunction carregar() {\n  return JSON.parse(localStorage.getItem("tarefas") || "[]");\n}' },
      { title: 'Renderização dinâmica', description: 'Crie uma função renderizar() que limpa a lista e recria todos os cards a partir do array. Chame-a após cada operação. Cada card tem: checkbox, texto, prioridade, data e botão deletar.', tip: 'Não use innerHTML com strings (vulnerável a XSS). Use createElement e appendChild.' },
      { title: 'Filtros e ordenação', description: 'Adicione botões para filtrar: Todas, Pendentes, Concluídas. E um select de ordenação: Por data, Por prioridade, Alfabético. Mantenha o filtro ativo no estado do app.', code: 'let filtroAtivo = "todas";\nlet ordenacao = "data";\n\nfunction filtrarTarefas(tarefas) {\n  return tarefas\n    .filter(t => filtroAtivo === "todas" || ...)\n    .sort((a, b) => ...);\n}' },
      { title: 'Edição in-line', description: 'Ao clicar no texto de uma tarefa, transforme-o em um <input> editável. Ao pressionar Enter ou sair do foco, salve a edição. Mostre indicador visual ao editar.', tip: 'Substitua o <span> por um <input> temporariamente e foque-o automaticamente com .focus().' },
      { title: 'Animações e feedback visual', description: 'Adicione animações CSS: tarefa nova entra deslizando, ao concluir o texto fica riscado com transição, ao deletar o card desaparece com fade. Mostre um contador de pendentes no header.', code: '@keyframes slideIn {\n  from { opacity: 0; transform: translateY(-10px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.tarefa-nova { animation: slideIn 0.2s ease; }' },
    ],
  },
  {
    id: 'clima-app',
    title: 'App de Clima com API',
    description: 'Consulte o clima de qualquer cidade em tempo real usando a OpenWeatherMap API. Com previsão dos próximos 5 dias, ícones e geolocalização.',
    difficulty: 'iniciante',
    duration: '3-4 horas',
    skills: ['fetch', 'async/await', 'API REST', 'JSON', 'Geolocation API'],
    emoji: '🌤️',
    color: '#7C3AED',
    steps: [
      { title: 'Setup da API', description: 'Crie uma conta gratuita em openweathermap.org e gere uma API key. A API gratuita permite até 1000 chamadas/dia, mais que suficiente. Guarde a key em uma constante (em produção, use variáveis de ambiente).', tip: 'API endpoint: https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={key}&units=metric&lang=pt_br' },
      { title: 'Busca por cidade', description: 'Crie um formulário com input e botão. Ao submeter, faça uma requisição async/await para a API. Trate os erros: cidade não encontrada (404), sem internet, API key inválida.', code: 'async function buscarClima(cidade) {\n  try {\n    const res = await fetch(`${API_URL}?q=${cidade}&appid=${KEY}&units=metric&lang=pt_br`);\n    if(!res.ok) throw new Error(res.status === 404 ? "Cidade não encontrada" : "Erro na API");\n    const dados = await res.json();\n    exibirClima(dados);\n  } catch(e) { exibirErro(e.message); }\n}' },
      { title: 'Exibindo os dados', description: 'Monte a interface com os dados recebidos: cidade/país, temperatura atual, sensação térmica, descrição, umidade, vento e ícone do clima. Os ícones estão em: https://openweathermap.org/img/wn/{icon}@2x.png', code: 'function exibirClima(d) {\n  document.getElementById("cidade").textContent = `${d.name}, ${d.sys.country}`;\n  document.getElementById("temp").textContent = `${Math.round(d.main.temp)}°C`;\n  document.getElementById("icone").src = `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;\n}' },
      { title: 'Previsão de 5 dias', description: 'Use o endpoint /forecast para buscar a previsão de 5 dias (dados de 3 em 3 horas). Agrupe por dia, pegando o horário do meio-dia de cada dia, e exiba cards com temperatura e ícone.', tip: 'URL: /data/2.5/forecast?q={cidade}&appid={key}&units=metric&lang=pt_br\nFiltro: dados.list.filter(item => item.dt_txt.includes("12:00:00"))' },
      { title: 'Geolocalização', description: 'Adicione um botão "Usar minha localização" que usa navigator.geolocation para pegar latitude/longitude e buscar o clima usando o endpoint por coordenadas.', code: 'navigator.geolocation.getCurrentPosition(\n  pos => buscarPorCoords(pos.coords.latitude, pos.coords.longitude),\n  () => alert("Permissão de localização negada")\n);' },
      { title: 'Background dinâmico', description: 'Mude o background da página com base no clima: azul ensolarado, cinza nublado, escuro com efeito chuva (CSS puro), etc. Adicione transição suave entre os temas.', tip: 'Verifique o campo d.weather[0].main: "Clear", "Clouds", "Rain", "Snow", "Thunderstorm"...' },
    ],
  },
  {
    id: 'cli-todo',
    title: 'CLI Todo App em Python',
    description: 'Aplicativo de tarefas de linha de comando em Python puro. Gerencia tarefas com arquivo JSON, comandos intuitivos e interface colorida no terminal.',
    difficulty: 'iniciante',
    duration: '2-3 horas',
    skills: ['Python', 'argparse', 'JSON', 'arquivos', 'sys'],
    emoji: '🐍',
    color: '#3572A5',
    steps: [
      { title: 'Estrutura do projeto', description: 'Crie a estrutura: todo.py (main), storage.py (leitura/escrita JSON), models.py (classe Tarefa). Defina a Tarefa como dataclass com: id, texto, concluida, prioridade, criada_em.', code: 'from dataclasses import dataclass, asdict\nfrom datetime import datetime\n\n@dataclass\nclass Tarefa:\n    id: int\n    texto: str\n    concluida: bool = False\n    prioridade: str = "media"\n    criada_em: str = ""\n    \n    def __post_init__(self):\n        if not self.criada_em:\n            self.criada_em = datetime.now().isoformat()' },
      { title: 'Persistência em JSON', description: 'Implemente o módulo storage.py com funções carregar() e salvar(). Use um arquivo tasks.json na pasta do usuário (~/.todo/tasks.json) para não misturar com o projeto.', code: 'import json, os\nARQUIVO = os.path.expanduser("~/.todo/tasks.json")\n\ndef carregar():\n    os.makedirs(os.path.dirname(ARQUIVO), exist_ok=True)\n    if not os.path.exists(ARQUIVO): return []\n    with open(ARQUIVO) as f: return json.load(f)\n\ndef salvar(tarefas):\n    with open(ARQUIVO, "w") as f:\n        json.dump(tarefas, f, ensure_ascii=False, indent=2)' },
      { title: 'Interface com argparse', description: 'Use argparse para criar subcomandos: add "texto" [-p prioridade], list [-f filtro], done <id>, remove <id>, clear. Cada subcomando chama uma função específica.', code: 'import argparse\nparser = argparse.ArgumentParser(prog="todo")\nsubs = parser.add_subparsers(dest="cmd")\nadd = subs.add_parser("add")\nadd.add_argument("texto")\nadd.add_argument("-p", "--prioridade", choices=["alta","media","baixa"], default="media")' },
      { title: 'Cores no terminal', description: 'Adicione cores usando códigos ANSI (sem bibliotecas externas): vermelho para alta prioridade, amarelo para média, verde para concluídas. Crie um dict de cores e uma função colorir(texto, cor).', code: 'CORES = {\n    "vermelho": "\\033[91m",\n    "verde": "\\033[92m",\n    "amarelo": "\\033[93m",\n    "reset": "\\033[0m"\n}\ndef colorir(texto, cor):\n    return f"{CORES[cor]}{texto}{CORES[\'reset\']}"' },
      { title: 'Listagem formatada', description: 'Implemente a função listar() que exibe as tarefas em uma tabela formatada no terminal: ID | ✓/○ | Prioridade | Texto | Data. Use f-strings com :< N para alinhar colunas.', code: 'print(f"{"ID":<4} {"":"<2} {"Prioridade":<10} {"Tarefa":<40} {"Data":<10}")\nprint("-" * 70)\nfor t in tarefas:\n    status = "✓" if t["concluida"] else "○"\n    print(f"{t["id"]:<4} {status:<2} {t["prioridade"]:<10} {t["texto"]:<40}")' },
    ],
  },
  {
    id: 'blog-flask',
    title: 'Blog com Flask e SQLite',
    description: 'API REST completa de um blog com Flask, SQLAlchemy e SQLite. Posts, categorias, comentários e autenticação básica. Deploy-ready.',
    difficulty: 'intermediario',
    duration: '5-7 horas',
    skills: ['Flask', 'SQLAlchemy', 'SQLite', 'REST API', 'JWT', 'Pydantic'],
    emoji: '📝',
    color: '#F05032',
    steps: [
      { title: 'Setup e estrutura', description: 'Crie o projeto com estrutura de pastas profissional: app/ (blueprints, models, schemas), tests/, config.py, run.py. Use virtual environment e requirements.txt.', code: 'blog/\n├── app/\n│   ├── __init__.py\n│   ├── models.py\n│   ├── routes/\n│   │   ├── posts.py\n│   │   ├── auth.py\n│   │   └── comments.py\n├── config.py\n├── requirements.txt\n└── run.py' },
      { title: 'Models com SQLAlchemy', description: 'Defina os modelos: User (id, username, email, password_hash), Post (id, title, content, slug, author_id, created_at, published), Comment (id, post_id, author_id, content). Implemente as relações 1:N.', code: 'class Post(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    title = db.Column(db.String(200), nullable=False)\n    slug = db.Column(db.String(200), unique=True)\n    content = db.Column(db.Text, nullable=False)\n    author_id = db.Column(db.Integer, db.ForeignKey("user.id"))\n    comments = db.relationship("Comment", backref="post", lazy=True)' },
      { title: 'Autenticação com JWT', description: 'Implemente registro e login com JWT. Passwords com bcrypt. Crie um decorator @token_required para proteger rotas. Tokens expiram em 1 hora.', code: 'def token_required(f):\n    @wraps(f)\n    def decorated(*args, **kwargs):\n        token = request.headers.get("Authorization", "").replace("Bearer ", "")\n        try:\n            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])\n            current_user = User.query.get(data["user_id"])\n        except: return jsonify({"erro": "Token inválido"}), 401\n        return f(current_user, *args, **kwargs)\n    return decorated' },
      { title: 'CRUD de posts', description: 'Implemente todos os endpoints de posts com Blueprint: GET /posts (paginação), GET /posts/<slug>, POST /posts (autenticado), PUT /posts/<id> (só autor), DELETE /posts/<id> (só autor). Auto-gere o slug a partir do título.', tip: 'from slugify import slugify. slug = slugify(titulo). Se já existe, adicione -2, -3, etc.' },
      { title: 'Sistema de comentários', description: 'Adicione endpoints de comentários: GET /posts/<slug>/comments, POST /posts/<slug>/comments (autenticado), DELETE /comments/<id> (autor ou dono do post). Implemente paginação em todos os gets.', code: '@posts_bp.route("/<slug>/comments", methods=["POST"])\n@token_required\ndef criar_comentario(current_user, slug):\n    post = Post.query.filter_by(slug=slug).first_or_404()\n    data = request.get_json()\n    comentario = Comment(content=data["content"], author=current_user, post=post)\n    db.session.add(comentario)\n    db.session.commit()\n    return jsonify(comentario.to_dict()), 201' },
      { title: 'Documentação e testes', description: 'Crie um arquivo README.md com todos os endpoints documentados (método, URL, body, resposta). Escreva pelo menos 5 testes com pytest: criar usuário, login, criar post, listar posts, tentar deletar post de outro usuário.', tip: 'pytest + client fixture do Flask. Use um banco de dados de teste separado (SQLite em memória: SQLALCHEMY_DATABASE_URI = "sqlite://"' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'Mini E-commerce (Full Stack)',
    description: 'Loja virtual completa: frontend em HTML/CSS/JS e backend em Flask. Catálogo de produtos, carrinho, checkout e painel admin.',
    difficulty: 'avancado',
    duration: '10-15 horas',
    skills: ['Flask', 'SQLAlchemy', 'JavaScript', 'HTML/CSS', 'REST API', 'localStorage'],
    emoji: '🛒',
    color: '#D97706',
    steps: [
      { title: 'Arquitetura e banco de dados', description: 'Projete o banco: products (id, name, price, stock, image_url, category_id), categories, orders (id, user_id, total, status), order_items (order_id, product_id, qty, price_at_purchase). Implemente migrations com Flask-Migrate.', tip: 'price_at_purchase é importante — guarda o preço no momento da compra, não o atual.' },
      { title: 'API de produtos', description: 'Implemente: GET /api/products (filtros: categoria, preço min/max, busca, ordenação, paginação), GET /api/products/<id>, POST/PUT/DELETE (admin only). Adicione imagens via URL ou upload para pasta static.', code: '@app.route("/api/products")\ndef listar_produtos():\n    q = Product.query\n    if request.args.get("q"): q = q.filter(Product.name.ilike(f"%{request.args["q"]}%"))\n    if request.args.get("cat"): q = q.filter_by(category_id=request.args["cat"])\n    page = q.paginate(page=int(request.args.get("page",1)), per_page=12)\n    return jsonify({dados: [p.to_dict() for p in page.items], total: page.total})' },
      { title: 'Frontend — Catálogo', description: 'Construa o frontend: navbar com logo, busca e ícone do carrinho (com contador), grid de produtos com filtros laterais. Ao clicar num produto, abra um modal com detalhes e botão "Adicionar ao carrinho".', tip: 'Use CSS Grid com auto-fill/minmax para o grid de produtos se adaptar automaticamente.' },
      { title: 'Carrinho com localStorage', description: 'Implemente o carrinho 100% no frontend com localStorage: adicionar (com quantidade), remover, alterar quantidade, calcular total. O sidebar do carrinho deve deslizar da direita com animação CSS.', code: 'function adicionarAoCarrinho(produto) {\n  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");\n  const existente = carrinho.find(i => i.id === produto.id);\n  if(existente) existente.quantidade++;\n  else carrinho.push({...produto, quantidade: 1});\n  localStorage.setItem("carrinho", JSON.stringify(carrinho));\n  atualizarIconeCarrinho();\n}' },
      { title: 'Checkout e pedidos', description: 'Crie a página de checkout: resumo do pedido, formulário de endereço (com autopreenchimento por CEP), "pagamento" fictício. Ao finalizar, salve o pedido via POST /api/orders e limpe o carrinho.', tip: 'Ao criar o pedido no backend, decremente o estoque atomicamente dentro de uma transaction. Verifique disponibilidade antes de confirmar.' },
      { title: 'Painel Admin', description: 'Crie uma área /admin (protegida por senha) com: lista de pedidos (filtrar por status), alterar status do pedido (pendente→pago→enviado→entregue), cadastrar produtos, gerenciar estoque. Use uma tabela com paginação e ações.', code: '@app.route("/admin/orders")\n@admin_required\ndef listar_pedidos():\n    pedidos = Order.query.order_by(Order.created_at.desc()).paginate(...)\n    return render_template("admin/orders.html", pedidos=pedidos)' },
    ],
  },
  {
    id: 'chat-websocket',
    title: 'Chat em Tempo Real',
    description: 'Chat multi-sala com WebSockets usando Flask-SocketIO e JavaScript. Mensagens instantâneas, status online/offline, notificações e histórico.',
    difficulty: 'avancado',
    duration: '6-8 horas',
    skills: ['Flask-SocketIO', 'WebSockets', 'JavaScript', 'eventos', 'Redis'],
    emoji: '💬',
    color: '#7C3AED',
    steps: [
      { title: 'Setup WebSocket', description: 'Instale Flask-SocketIO e configure o servidor. No frontend, inclua a biblioteca Socket.IO via CDN. Estabeleça a conexão e implemente os eventos básicos de conectar/desconectar.', code: '# Backend\nfrom flask_socketio import SocketIO\nsocketio = SocketIO(app, cors_allowed_origins="*")\n\n@socketio.on("connect")\ndef on_connect():\n    print(f"Cliente conectado: {request.sid}")\n\n# Frontend\nconst socket = io();\nsocket.on("connect", () => console.log("Conectado!"));' },
      { title: 'Salas de chat', description: 'Implemente salas: o usuário escolhe um nome e uma sala ao entrar. Use socketio.join_room() e emit para sala específica. Liste usuários online por sala.', code: '@socketio.on("entrar_sala")\ndef entrar_sala(data):\n    join_room(data["sala"])\n    usuarios_online[request.sid] = {"nome": data["nome"], "sala": data["sala"]}\n    emit("status", {"msg": f"{data["nome"]} entrou na sala"}, to=data["sala"])' },
      { title: 'Envio de mensagens', description: 'Quando o usuário envia uma mensagem, o servidor valida (não vazia, max 500 chars) e faz broadcast para a sala com: conteúdo, autor, timestamp. O frontend renderiza a mensagem diferenciando as próprias (direita) das dos outros (esquerda).', code: '@socketio.on("mensagem")\ndef on_mensagem(data):\n    if not data.get("texto") or len(data["texto"]) > 500: return\n    user = usuarios_online.get(request.sid)\n    msg = {"autor": user["nome"], "texto": data["texto"], "hora": datetime.now().strftime("%H:%M")}\n    emit("mensagem", msg, to=user["sala"])' },
      { title: 'Indicadores de digitação', description: 'Quando o usuário começa a digitar, emita "digitando" para a sala. Após 2 segundos sem teclar, emita "parou_de_digitar". Exiba "João está digitando..." abaixo das mensagens.', tip: 'Use debounce no evento "input" para não emitir a cada tecla. setTimeout de 2s que é resetado a cada tecla.' },
      { title: 'Persistência com Redis', description: 'Guarde as últimas 50 mensagens de cada sala no Redis (lista com LPUSH + LTRIM). Quando um novo usuário entra, envie o histórico com LRANGE. Isso mantém o contexto mesmo após reconexão.', code: 'import redis\nr = redis.Redis()\n\ndef salvar_mensagem(sala, msg):\n    r.lpush(f"chat:{sala}", json.dumps(msg))\n    r.ltrim(f"chat:{sala}", 0, 49)  # mantém só as 50 últimas\n\ndef carregar_historico(sala):\n    return [json.loads(m) for m in r.lrange(f"chat:{sala}", 0, -1)][::-1]' },
    ],
  },
  {
    id: 'auth-sistema',
    title: 'Sistema de Login com JWT',
    description: 'Autenticação completa e segura: registro, login, refresh tokens, reset de senha por email, 2FA com TOTP e proteção contra brute force.',
    difficulty: 'avancado',
    duration: '6-8 horas',
    skills: ['Flask', 'JWT', 'bcrypt', 'Redis', 'email', '2FA'],
    emoji: '🔐',
    color: '#1D4ED8',
    steps: [
      { title: 'Hash de senha seguro', description: 'Use bcrypt para hashear senhas. NUNCA armazene senha em texto plano. Implemente um validador de força de senha no backend (não confie apenas no frontend).', code: 'import bcrypt\n\ndef hash_senha(senha: str) -> str:\n    return bcrypt.hashpw(senha.encode(), bcrypt.gensalt()).decode()\n\ndef verificar_senha(senha: str, hash: str) -> bool:\n    return bcrypt.checkpw(senha.encode(), hash.encode())\n\ndef validar_forca(senha: str) -> bool:\n    return (len(senha) >= 8 and\n            any(c.isupper() for c in senha) and\n            any(c.isdigit() for c in senha))' },
      { title: 'Access e Refresh Tokens', description: 'Implemente dois tipos de JWT: Access (15min) para autenticação e Refresh (7 dias) para renovar o access sem novo login. Guarde os refresh tokens válidos no banco para poder revogá-los.', code: 'def gerar_tokens(user_id):\n    access = jwt.encode({"user_id": user_id, "exp": datetime.utcnow() + timedelta(minutes=15), "type": "access"}, SECRET)\n    refresh = jwt.encode({"user_id": user_id, "exp": datetime.utcnow() + timedelta(days=7), "type": "refresh"}, SECRET)\n    # Salva refresh no banco\n    RefreshToken.create(user_id=user_id, token=refresh)\n    return access, refresh' },
      { title: 'Proteção contra brute force', description: 'Use Redis para contar tentativas de login por IP e por usuário. Após 5 falhas em 15 minutos, bloqueie por 30 minutos. Retorne 429 com tempo de espera no header Retry-After.', code: 'def verificar_brute_force(ip, email):\n    chave = f"login_fail:{ip}:{email}"\n    tentativas = r.incr(chave)\n    if tentativas == 1: r.expire(chave, 900)  # 15 minutos\n    if tentativas > 5:\n        ttl = r.ttl(chave)\n        raise BruteForceException(f"Muitas tentativas. Tente em {ttl}s")' },
      { title: 'Reset de senha por email', description: 'Ao solicitar reset, gere um token seguro (secrets.token_urlsafe(32)), salve com expiração de 1h e envie o link por email. O token é de uso único — invalide após usar.', code: 'import secrets\nfrom datetime import datetime, timedelta\n\ndef criar_token_reset(user_id):\n    token = secrets.token_urlsafe(32)\n    expira = datetime.utcnow() + timedelta(hours=1)\n    ResetToken.create(user_id=user_id, token=token, expira_em=expira)\n    # Enviar email com: f"{BASE_URL}/reset-senha?token={token}"\n    return token' },
      { title: '2FA com TOTP', description: 'Implemente autenticação de dois fatores com TOTP (Google Authenticator compatível). Use a biblioteca pyotp. Ao ativar 2FA, gere um QR Code para escanear. Na verificação, cheque o código de 6 dígitos.', code: 'import pyotp, qrcode\n\ndef gerar_2fa(user):\n    segredo = pyotp.random_base32()\n    user.totp_secret = segredo\n    totp = pyotp.TOTP(segredo)\n    url = totp.provisioning_uri(user.email, issuer_name="MeuApp")\n    # Gerar QR code da url\n    return segredo, url\n\ndef verificar_totp(user, codigo):\n    totp = pyotp.TOTP(user.totp_secret)\n    return totp.verify(codigo)' },
    ],
  },
];

export default projects;
