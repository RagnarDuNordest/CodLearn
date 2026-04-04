import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-cliente-http-completo',
  moduleId: 'redes',
  title: 'Projeto: Cliente HTTP Robusto',
  description: 'Construa um cliente HTTP de producao com autenticacao, retry automatico, cache de respostas e tratamento correto de erros',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content: '## Projeto: Cliente HTTP Robusto\n\nUm cliente HTTP de producao vai alem de `requests.get(url)`. Precisa lidar com:\n\n- **Autenticacao**: Bearer token, refresh automatico\n- **Erros**: timeouts, 429 (rate limit), 5xx (servidor indisponivel)\n- **Retry**: tentar novamente com backoff exponencial\n- **Cache**: nao repetir requisicoes identicas\n- **Logging**: rastrear o que aconteceu\n\n### Backoff Exponencial\n\nQuando uma requisicao falha, espere antes de tentar de novo — e espere cada vez mais:\n- Tentativa 1: imediata\n- Tentativa 2: espera 1s\n- Tentativa 3: espera 2s\n- Tentativa 4: espera 4s\n- + jitter aleatorio para evitar thundering herd',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# pip install requests\nimport requests\nimport time\nimport random\nimport logging\nfrom typing import Any\n\nlogging.basicConfig(level=logging.INFO)\nlogger = logging.getLogger(__name__)\n\nclass ClienteHTTP:\n    def __init__(self, base_url: str, token: str = None, max_tentativas: int = 3):\n        self.base_url = base_url.rstrip("/")\n        self.token = token\n        self.max_tentativas = max_tentativas\n        self._cache = {}  # url -> (timestamp, resposta)\n        self._cache_ttl = 60  # segundos\n    \n    def _headers(self) -> dict:\n        headers = {"Content-Type": "application/json"}\n        if self.token:\n            headers["Authorization"] = f"Bearer {self.token}"\n        return headers\n    \n    def _do_request(self, method: str, endpoint: str, **kwargs) -> requests.Response:\n        url = f"{self.base_url}/{endpoint.lstrip(\'/\')}"\n        \n        for tentativa in range(1, self.max_tentativas + 1):\n            try:\n                logger.info(f"[{method}] {url} (tentativa {tentativa})")\n                response = requests.request(\n                    method, url,\n                    headers=self._headers(),\n                    timeout=10,\n                    **kwargs\n                )\n                \n                if response.status_code == 429:  # rate limit\n                    retry_after = int(response.headers.get("Retry-After", 5))\n                    logger.warning(f"Rate limit. Aguardando {retry_after}s")\n                    time.sleep(retry_after)\n                    continue\n                \n                if response.status_code >= 500:  # erro do servidor\n                    raise requests.HTTPError(f"Erro {response.status_code}")\n                \n                response.raise_for_status()\n                return response\n            \n            except (requests.ConnectionError, requests.Timeout, requests.HTTPError) as e:\n                if tentativa == self.max_tentativas:\n                    logger.error(f"Falhou apos {self.max_tentativas} tentativas: {e}")\n                    raise\n                espera = (2 ** (tentativa - 1)) + random.uniform(0, 1)  # backoff + jitter\n                logger.warning(f"Erro: {e}. Tentando novamente em {espera:.1f}s")\n                time.sleep(espera)\n        \n        raise RuntimeError("Nao deveria chegar aqui")\n    \n    def get(self, endpoint: str, cache: bool = False) -> Any:\n        if cache:\n            agora = time.time()\n            if endpoint in self._cache:\n                ts, dados = self._cache[endpoint]\n                if agora - ts < self._cache_ttl:\n                    logger.info(f"Cache hit: {endpoint}")\n                    return dados\n        \n        response = self._do_request("GET", endpoint)\n        dados = response.json()\n        \n        if cache:\n            self._cache[endpoint] = (time.time(), dados)\n        \n        return dados\n    \n    def post(self, endpoint: str, dados: dict) -> Any:\n        response = self._do_request("POST", endpoint, json=dados)\n        return response.json()',
        filename: 'cliente_http_robusto.py',
        description: 'Cliente de producao com retry exponencial + jitter, tratamento de rate limit (429), cache com TTL, headers de autenticacao automaticos e logging estruturado.',
      },
    },
  ],
  challenges: [
    {
      id: 'cliente-http-c1',
      title: 'Use o Cliente com JSONPlaceholder',
      description: 'Use o ClienteHTTP para buscar posts da API JSONPlaceholder. Implemente: (1) buscar todos os posts com cache, (2) buscar um post especifico, (3) criar um novo post via POST.',
      language: 'python',
      starterCode: '# Cole a classe ClienteHTTP acima e use-a aqui\n# API gratuita: https://jsonplaceholder.typicode.com\n\n# A classe ClienteHTTP ja esta definida acima\n\ndef main():\n    cliente = ClienteHTTP("https://jsonplaceholder.typicode.com")\n    \n    # TODO: buscar todos os posts (com cache=True)\n    # posts = ?\n    # print(f"Total de posts: {len(posts)}")\n    \n    # TODO: buscar post especifico (id=1)\n    # post = ?\n    # print(f"Post 1: {post[\'title\']}")\n    \n    # TODO: criar novo post\n    # novo = ?\n    # print(f"Post criado com ID: {novo[\'id\']}")\n    \n    # BONUS: buscar todos os posts de novo (deve usar o cache)\n    # posts2 = ?\n    # (deve aparecer "Cache hit" no log)\n\nmain()\n',
      solution: 'import requests\nimport time\nimport random\nimport logging\n\nlogging.basicConfig(level=logging.INFO)\nlogger = logging.getLogger(__name__)\n\nclass ClienteHTTP:\n    def __init__(self, base_url, token=None, max_tentativas=3):\n        self.base_url = base_url.rstrip("/")\n        self.token = token\n        self.max_tentativas = max_tentativas\n        self._cache = {}\n        self._cache_ttl = 60\n    \n    def _headers(self):\n        h = {"Content-Type": "application/json"}\n        if self.token:\n            h["Authorization"] = f"Bearer {self.token}"\n        return h\n    \n    def _do_request(self, method, endpoint, **kwargs):\n        url = f"{self.base_url}/{endpoint.lstrip(\'/\')}"\n        for tentativa in range(1, self.max_tentativas + 1):\n            try:\n                r = requests.request(method, url, headers=self._headers(), timeout=10, **kwargs)\n                r.raise_for_status()\n                return r\n            except Exception as e:\n                if tentativa == self.max_tentativas:\n                    raise\n                espera = (2 ** (tentativa - 1)) + random.uniform(0, 1)\n                time.sleep(espera)\n    \n    def get(self, endpoint, cache=False):\n        if cache and endpoint in self._cache:\n            ts, dados = self._cache[endpoint]\n            if time.time() - ts < self._cache_ttl:\n                logger.info(f"Cache hit: {endpoint}")\n                return dados\n        dados = self._do_request("GET", endpoint).json()\n        if cache:\n            self._cache[endpoint] = (time.time(), dados)\n        return dados\n    \n    def post(self, endpoint, dados):\n        return self._do_request("POST", endpoint, json=dados).json()\n\ndef main():\n    cliente = ClienteHTTP("https://jsonplaceholder.typicode.com")\n    \n    posts = cliente.get("/posts", cache=True)\n    print(f"Total de posts: {len(posts)}")\n    \n    post = cliente.get("/posts/1")\n    print(f"Post 1: {post[\'title\']}")\n    \n    novo = cliente.post("/posts", {"title": "Meu Post", "body": "Conteudo", "userId": 1})\n    print(f"Post criado com ID: {novo[\'id\']}")\n    \n    posts2 = cliente.get("/posts", cache=True)  # deve usar cache\n    print(f"Posts (cache): {len(posts2)}")\n\nmain()\n',
      hints: [
        'Use cliente.get("/posts", cache=True) para buscar com cache',
        'Para criar: cliente.post("/posts", {"title": "...", "body": "...", "userId": 1})',
        'JSONPlaceholder e uma API fake — ela aceita POSTs mas nao salva de verdade. O id retornado sera sempre 101',
      ],
    },
  ],
};
