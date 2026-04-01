import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'http-na-pratica',
  moduleId: 'redes',
  title: 'HTTP na Pratica',
  description: 'Domine HTTP: request/response, metodos, status codes, headers e as diferencas entre HTTP/1.1, HTTP/2 e HTTP/3',
  order: 1,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## HTTP na Pratica\n\nHTTP (HyperText Transfer Protocol) e a lingua franca da web. Entender sua estrutura e fundamental para qualquer desenvolvedor que trabalha com APIs, back-end ou front-end.\n\n### Estrutura de uma Requisicao HTTP\n\n```\nMETODO /caminho HTTP/versao\nHeader1: valor\nHeader2: valor\n[linha em branco]\nbody (opcional)\n```\n\nExemplo real de uma requisicao POST:\n```\nPOST /api/usuarios HTTP/1.1\nHost: api.exemplo.com\nContent-Type: application/json\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\nContent-Length: 45\n\n{"nome": "Ana", "email": "ana@exemplo.com"}\n```\n\n### Estrutura de uma Resposta HTTP\n\n```\nHTTP/versao STATUS_CODE DESCRICAO\nHeader1: valor\nHeader2: valor\n[linha em branco]\nbody (opcional)\n```\n\nExemplo de resposta:\n```\nHTTP/1.1 201 Created\nContent-Type: application/json\nLocation: /api/usuarios/42\n\n{"id": 42, "nome": "Ana", "email": "ana@exemplo.com"}\n```\n\n---\n\n### Metodos HTTP\n\n| Metodo | Uso | Idempotente? | Body? |\n|--------|-----|-------------|-------|\n| GET | Buscar recurso | Sim | Nao |\n| POST | Criar recurso | Nao | Sim |\n| PUT | Substituir recurso inteiro | Sim | Sim |\n| PATCH | Atualizar campos especificos | Nao | Sim |\n| DELETE | Remover recurso | Sim | Nao |\n\n**Idempotente** significa que chamar a operacao N vezes tem o mesmo efeito que chamar uma vez. `DELETE /usuarios/5` pode ser chamado 10 vezes — o resultado e o mesmo (usuario deletado).\n\n---\n\n### Status Codes\n\n**2xx — Sucesso**\n- `200 OK` — requisicao bem-sucedida\n- `201 Created` — recurso criado (use apos POST)\n- `204 No Content` — sucesso sem corpo na resposta (use apos DELETE)\n\n**3xx — Redirecionamento**\n- `301 Moved Permanently` — URL mudou para sempre; atualize seus bookmarks\n- `302 Found` — redirecionamento temporario\n- `304 Not Modified` — cache ainda e valido; use o que voce tem\n\n**4xx — Erro do Cliente**\n- `400 Bad Request` — payload invalido ou malformado\n- `401 Unauthorized` — nao autenticado (falta ou token invalido)\n- `403 Forbidden` — autenticado, mas sem permissao\n- `404 Not Found` — recurso nao existe\n- `422 Unprocessable Entity` — estrutura ok, mas dados semanticamente invalidos\n- `429 Too Many Requests` — rate limit excedido\n\n**5xx — Erro do Servidor**\n- `500 Internal Server Error` — bug no servidor\n- `502 Bad Gateway` — servidor upstream nao respondeu corretamente\n- `503 Service Unavailable` — servidor temporariamente fora\n\n---\n\n### Headers Importantes\n\n**Content-Type**: informa o formato do body\n- `application/json` — JSON\n- `multipart/form-data` — upload de arquivos\n- `text/html; charset=utf-8` — HTML\n\n**Authorization**: credenciais do cliente\n- `Bearer <token>` — JWT ou OAuth token\n- `Basic <base64(user:senha)>` — autenticacao basica\n- `ApiKey <chave>` — chave de API\n\n**Cache-Control**: instrucoes de cache\n- `no-cache` — revalida antes de usar cache\n- `no-store` — nunca armazene em cache\n- `max-age=3600` — cache valido por 1 hora\n- `public` — pode ser cacheado por proxies\n- `private` — apenas o browser do usuario\n\n---\n\n### HTTP/1.1 vs HTTP/2 vs HTTP/3\n\n**HTTP/1.1 (1997)**\n- Uma requisicao por conexao TCP por vez (bloqueio HOL)\n- Workarounds: multiplas conexoes paralelas, bundling, spriting\n\n**HTTP/2 (2015)**\n- Multiplexing: multiplas requests na mesma conexao TCP\n- Header compression (HPACK)\n- Server Push (servidor envia recursos antes de serem pedidos)\n- Binario em vez de texto\n\n**HTTP/3 (2022)**\n- Abandona TCP completamente, usa QUIC (sobre UDP)\n- Resolve o HOL blocking do TCP\n- Melhor performance em redes com perda de pacotes (mobile, Wi-Fi ruim)',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        '401 vs 403: sao confundidos com frequencia. 401 significa "voce nao esta autenticado" — o servidor nao sabe quem voce e. 403 significa "eu sei quem voce e, mas voce nao tem permissao". Use corretamente para ajudar clientes de API a diagnosticar problemas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import requests\nimport json\n\n# Base URL para testes — JSONPlaceholder e uma API fake gratuita\nBASE_URL = "https://jsonplaceholder.typicode.com"\n\n\ndef demonstrar_get():\n    """GET: busca recurso existente."""\n    print("=== GET /posts/1 ===")\n    resposta = requests.get(f"{BASE_URL}/posts/1")\n\n    print(f"Status: {resposta.status_code} {resposta.reason}")\n    print(f"Content-Type: {resposta.headers.get(\'Content-Type\')}")\n    print(f"Tempo de resposta: {resposta.elapsed.total_seconds()*1000:.0f}ms")\n    print(f"Body: {json.dumps(resposta.json(), indent=2)}")\n\n\ndef demonstrar_post():\n    """POST: cria novo recurso."""\n    print("\\n=== POST /posts ===")\n    novo_post = {\n        "title": "Aprendendo HTTP",\n        "body": "HTTP e o protocolo da web",\n        "userId": 1\n    }\n    resposta = requests.post(\n        f"{BASE_URL}/posts",\n        json=novo_post,  # requests serializa para JSON e define Content-Type automaticamente\n        headers={"Authorization": "Bearer meu-token-aqui"}\n    )\n    print(f"Status: {resposta.status_code}")\n    print(f"Body: {resposta.json()}")\n\n\ndef demonstrar_put():\n    """PUT: substitui o recurso inteiro."""\n    print("\\n=== PUT /posts/1 ===")\n    post_completo = {\n        "id": 1,\n        "title": "Titulo atualizado",\n        "body": "Conteudo completamente substituido",\n        "userId": 1\n    }\n    resposta = requests.put(f"{BASE_URL}/posts/1", json=post_completo)\n    print(f"Status: {resposta.status_code}")\n    print(f"Body: {resposta.json()}")\n\n\ndef demonstrar_patch():\n    """PATCH: atualiza apenas campos especificos."""\n    print("\\n=== PATCH /posts/1 ===")\n    atualizacao_parcial = {"title": "Apenas o titulo mudou"}\n    resposta = requests.patch(f"{BASE_URL}/posts/1", json=atualizacao_parcial)\n    print(f"Status: {resposta.status_code}")\n    print(f"Body: {resposta.json()}")\n\n\ndef demonstrar_delete():\n    """DELETE: remove o recurso."""\n    print("\\n=== DELETE /posts/1 ===")\n    resposta = requests.delete(f"{BASE_URL}/posts/1")\n    print(f"Status: {resposta.status_code}")  # 200 neste caso\n    print(f"Body vazio: {resposta.text == \'{}\'}")\n\n\ndef inspecionar_headers(url):\n    """Inspeciona todos os headers de uma resposta."""\n    print(f"\\n=== Headers de {url} ===")\n    resposta = requests.get(url)\n    for chave, valor in sorted(resposta.headers.items()):\n        print(f"  {chave}: {valor}")\n\n\n# Executa todas as demonstracoes\ndemonstar_get()\ndemonstar_post()\ndemonstar_put()\ndemonstar_patch()\ndemonstar_delete()\ninspecionar_headers(f"{BASE_URL}/posts/1")',
        filename: 'http_requests.py',
        description:
          'Demonstra todos os metodos HTTP principais usando a biblioteca requests do Python contra a API JSONPlaceholder. Mostra status codes, headers e bodies reais.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A biblioteca requests do Python define automaticamente o header Content-Type: application/json e serializa o dict quando voce usa o parametro json=. Se usar data= em vez de json=, o Content-Type sera application/x-www-form-urlencoded — um erro comum.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import requests\n\n# Tratamento robusto de erros HTTP\ndef requisicao_segura(metodo, url, **kwargs):\n    """Faz uma requisicao HTTP com tratamento completo de erros."""\n    try:\n        resposta = requests.request(metodo, url, timeout=10, **kwargs)\n\n        # raise_for_status() lanca excecao para 4xx e 5xx\n        resposta.raise_for_status()\n        return resposta\n\n    except requests.exceptions.Timeout:\n        print(f"Timeout: {url} nao respondeu em 10 segundos")\n    except requests.exceptions.ConnectionError:\n        print(f"Erro de conexao: impossivel conectar a {url}")\n    except requests.exceptions.HTTPError as erro:\n        status = erro.response.status_code\n        if status == 400:\n            print(f"400 Bad Request: payload invalido -> {erro.response.text}")\n        elif status == 401:\n            print("401 Unauthorized: token ausente ou invalido")\n        elif status == 403:\n            print("403 Forbidden: sem permissao para este recurso")\n        elif status == 404:\n            print(f"404 Not Found: recurso nao existe em {url}")\n        elif status == 429:\n            retry_after = erro.response.headers.get("Retry-After", "desconhecido")\n            print(f"429 Rate Limited: aguarde {retry_after} segundos")\n        elif status >= 500:\n            print(f"{status} Erro do servidor: tente novamente mais tarde")\n        else:\n            print(f"Erro HTTP {status}: {erro}")\n\n    return None\n\n\n# Testes de erro\nprint("Teste 404:")\nrequisicao_segura("GET", "https://jsonplaceholder.typicode.com/posts/99999")\n\nprint("\\nTeste sucesso:")\nresp = requisicao_segura("GET", "https://jsonplaceholder.typicode.com/posts/1")\nif resp:\n    print(f"Sucesso: {resp.status_code}")',
        filename: 'tratamento_http_erros.py',
        description:
          'Padrao de tratamento de erros HTTP com requests: distingue erros de rede (Timeout, ConnectionError) de erros HTTP (4xx, 5xx) e fornece mensagens uteis para cada caso.',
      },
    },
  ],
  challenges: [
    {
      id: 'redes-c2',
      title: 'Inspecionar Respostas HTTP Completas',
      description:
        'Implemente a funcao `inspecionar_resposta(url, metodo="GET", **kwargs)` que faz a requisicao e retorna um dicionario com: "status_code", "status_texto", "headers" (dict), "tamanho_bytes" (int), "tempo_ms" (float), "tipo_conteudo" (string), "e_json" (bool) e "body" (dict se JSON, string caso contrario). Trate timeouts retornando None.',
      language: 'python',
      starterCode:
        'import requests\nimport time\n\ndef inspecionar_resposta(url, metodo="GET", **kwargs):\n    """\n    Faz uma requisicao e retorna um dicionario detalhado da resposta.\n\n    Retorna:\n        dict com: status_code, status_texto, headers, tamanho_bytes,\n                  tempo_ms, tipo_conteudo, e_json, body\n        None em caso de erro de conexao ou timeout\n    """\n    # Seu codigo aqui\n    pass\n\n\n# Testes\nresultado = inspecionar_resposta("https://jsonplaceholder.typicode.com/users/1")\nif resultado:\n    print(f"Status: {resultado[\'status_code\']} {resultado[\'status_texto\']}")\n    print(f"Tempo: {resultado[\'tempo_ms\']:.0f}ms")\n    print(f"Tamanho: {resultado[\'tamanho_bytes\']} bytes")\n    print(f"E JSON: {resultado[\'e_json\']}")\n    print(f"Tipo: {resultado[\'tipo_conteudo\']}")\n',
      solution:
        'import requests\nimport time\n\ndef inspecionar_resposta(url, metodo="GET", **kwargs):\n    try:\n        kwargs.setdefault("timeout", 10)\n        resposta = requests.request(metodo, url, **kwargs)\n\n        tipo_conteudo = resposta.headers.get("Content-Type", "")\n        e_json = "application/json" in tipo_conteudo\n\n        if e_json:\n            try:\n                body = resposta.json()\n            except Exception:\n                body = resposta.text\n        else:\n            body = resposta.text\n\n        return {\n            "status_code": resposta.status_code,\n            "status_texto": resposta.reason,\n            "headers": dict(resposta.headers),\n            "tamanho_bytes": len(resposta.content),\n            "tempo_ms": resposta.elapsed.total_seconds() * 1000,\n            "tipo_conteudo": tipo_conteudo,\n            "e_json": e_json,\n            "body": body\n        }\n    except (requests.exceptions.Timeout, requests.exceptions.ConnectionError):\n        return None\n\n\nresultado = inspecionar_resposta("https://jsonplaceholder.typicode.com/users/1")\nif resultado:\n    print(f"Status: {resultado[\'status_code\']} {resultado[\'status_texto\']}")\n    print(f"Tempo: {resultado[\'tempo_ms\']:.0f}ms")\n    print(f"Tamanho: {resultado[\'tamanho_bytes\']} bytes")\n    print(f"E JSON: {resultado[\'e_json\']}")\n    print(f"Tipo: {resultado[\'tipo_conteudo\']}")\n',
      hints: [
        'Use resposta.elapsed.total_seconds() * 1000 para obter o tempo em ms — mais preciso que time.time()',
        'Use len(resposta.content) para tamanho em bytes (content e bytes, text e string decodificada)',
        'Verifique "application/json" in resposta.headers.get("Content-Type", "") para detectar JSON',
      ],
    },
  ],
};
