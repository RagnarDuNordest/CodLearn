import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'websockets-e-tempo-real',
  moduleId: 'redes',
  title: 'WebSockets e Tempo Real',
  description: 'Entenda como WebSockets permitem comunicacao bidirecional em tempo real e quando usar em vez de HTTP polling',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## O Problema do HTTP para Tempo Real\n\nHTTP e request/response: o cliente pede, o servidor responde. O servidor nao pode enviar dados proativamente.\n\nPara apps em tempo real (chat, notificacoes, live updates), opcoes com HTTP puro:\n- **Polling**: cliente pergunta a cada X segundos — desperdica recursos\n- **Long polling**: cliente fica esperando ate ter novidade — melhor mas complexo\n\n### WebSocket: conexao persistente bidirecional\n\nWebSocket estabelece uma conexao TCP persistente. Apos o handshake inicial (via HTTP), tanto cliente quanto servidor podem enviar mensagens a qualquer momento sem abrir nova conexao.\n\n**Handshake**:\n```\nCliente -> Servidor: GET /ws HTTP/1.1\n           Upgrade: websocket\nServidor -> Cliente: 101 Switching Protocols\n```\n\nApos isso, a conexao e WebSocket — bidirecional e persistente.\n\n### Quando usar WebSocket vs HTTP\n\n| Situacao | Use |\n|----------|-----|\n| Chat em tempo real | WebSocket |\n| Notificacoes ao vivo | WebSocket ou SSE |\n| Dashboard com atualizacoes | WebSocket ou SSE |\n| Busca, formularios, CRUD | HTTP REST |\n| Upload de arquivos | HTTP REST |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# pip install websockets\nimport asyncio\nimport websockets\nimport json\n\n# Servidor WebSocket\nclientes_conectados = set()\n\nasync def handler(websocket):\n    """Gerencia cada cliente conectado."""\n    clientes_conectados.add(websocket)\n    print(f"Cliente conectado. Total: {len(clientes_conectados)}")\n    try:\n        async for mensagem in websocket:\n            dados = json.loads(mensagem)\n            print(f"Recebido: {dados}")\n            \n            # Broadcast para todos os outros clientes\n            if dados.get("tipo") == "mensagem":\n                resposta = json.dumps({\n                    "tipo": "broadcast",\n                    "de": dados.get("usuario", "anonimo"),\n                    "texto": dados["texto"]\n                })\n                # Envia para todos exceto o remetente\n                outros = clientes_conectados - {websocket}\n                if outros:\n                    await asyncio.gather(*[c.send(resposta) for c in outros])\n    except websockets.exceptions.ConnectionClosed:\n        pass\n    finally:\n        clientes_conectados.discard(websocket)\n        print(f"Cliente desconectado. Total: {len(clientes_conectados)}")\n\nasync def main():\n    async with websockets.serve(handler, "localhost", 8765):\n        print("Servidor rodando em ws://localhost:8765")\n        await asyncio.Future()  # roda para sempre\n\nif __name__ == "__main__":\n    asyncio.run(main())',
        filename: 'servidor_websocket.py',
        description: 'Servidor de chat simples com WebSocket. Cada cliente conectado e adicionado ao set. Mensagens sao broadcast para todos os outros clientes usando asyncio.gather para envio paralelo.',
      },
    },
    {
      type: 'text',
      content: '## Server-Sent Events (SSE)\n\nSSE e uma alternativa mais simples quando voce precisa apenas de atualizacoes do servidor para o cliente (unidirecional).\n\n```python\nfrom flask import Flask, Response\nimport time\n\napp = Flask(__name__)\n\n@app.route("/eventos")\ndef stream_eventos():\n    def gerar():\n        while True:\n            time.sleep(1)\n            yield f"data: {time.time()}\\n\\n"  # formato SSE\n    return Response(gerar(), mimetype="text/event-stream")\n```\n\nNo cliente JavaScript:\n```javascript\nconst source = new EventSource(\'/eventos\');\nsource.onmessage = (e) => console.log(e.data);\n```\n\n**SSE vs WebSocket**:\n- SSE: mais simples, so servidor->cliente, funciona sobre HTTP normal\n- WebSocket: bidirecional, menor overhead por mensagem, precisa de biblioteca',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Para a maioria dos casos de "atualizacoes em tempo real" (notificacoes, feeds, dashboards), SSE e suficiente e mais simples. Use WebSocket quando precisar de comunicacao bidirecional real (chat, jogos, colaboracao).',
    },
  ],
  challenges: [
    {
      id: 'ws-c1',
      title: 'Adicione Salas ao Chat',
      description: 'O servidor de chat acima envia mensagens para todos os clientes. Adicione o conceito de "salas": clientes podem entrar em uma sala e mensagens so vao para clientes da mesma sala.',
      language: 'python',
      starterCode: '# pip install websockets\nimport asyncio\nimport websockets\nimport json\n\n# Dicionario: sala -> set de clientes\nsalas = {}  # ex: {"geral": {ws1, ws2}, "tech": {ws3}}\n\nasync def handler(websocket):\n    sala_atual = None\n    try:\n        async for mensagem in websocket:\n            dados = json.loads(mensagem)\n            \n            if dados["tipo"] == "entrar_sala":\n                # TODO: remover de sala atual (se houver)\n                # TODO: adicionar ao set da nova sala\n                # TODO: notificar cliente que entrou na sala\n                sala_atual = dados["sala"]\n            \n            elif dados["tipo"] == "mensagem" and sala_atual:\n                # TODO: broadcast apenas para clientes da mesma sala\n                pass\n    finally:\n        # TODO: remover da sala ao desconectar\n        pass\n\nasync def main():\n    async with websockets.serve(handler, "localhost", 8765):\n        await asyncio.Future()\n\nif __name__ == "__main__":\n    asyncio.run(main())\n',
      solution: 'import asyncio\nimport websockets\nimport json\n\nsalas = {}\n\nasync def handler(websocket):\n    sala_atual = None\n    try:\n        async for mensagem in websocket:\n            dados = json.loads(mensagem)\n            \n            if dados["tipo"] == "entrar_sala":\n                # Sair da sala atual\n                if sala_atual and sala_atual in salas:\n                    salas[sala_atual].discard(websocket)\n                \n                # Entrar na nova sala\n                sala_atual = dados["sala"]\n                if sala_atual not in salas:\n                    salas[sala_atual] = set()\n                salas[sala_atual].add(websocket)\n                \n                await websocket.send(json.dumps({\n                    "tipo": "sistema",\n                    "texto": f"Voce entrou na sala: {sala_atual}"\n                }))\n            \n            elif dados["tipo"] == "mensagem" and sala_atual:\n                resposta = json.dumps({\n                    "tipo": "mensagem",\n                    "sala": sala_atual,\n                    "de": dados.get("usuario", "anonimo"),\n                    "texto": dados["texto"]\n                })\n                # Broadcast apenas para a sala\n                outros = salas.get(sala_atual, set()) - {websocket}\n                if outros:\n                    await asyncio.gather(*[c.send(resposta) for c in outros])\n    finally:\n        if sala_atual and sala_atual in salas:\n            salas[sala_atual].discard(websocket)\n\nasync def main():\n    async with websockets.serve(handler, "localhost", 8765):\n        await asyncio.Future()\n\nif __name__ == "__main__":\n    asyncio.run(main())\n',
      hints: [
        'Use um dicionario salas = {} onde a chave e o nome da sala e o valor e um set de websockets',
        'Ao entrar em uma sala, remova o cliente da sala anterior: salas[sala_atual].discard(websocket)',
        'Broadcast: filtre apenas clientes da mesma sala: outros = salas.get(sala_atual, set()) - {websocket}',
      ],
    },
  ],
};
