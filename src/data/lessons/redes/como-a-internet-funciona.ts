import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'como-a-internet-funciona',
  moduleId: 'redes',
  title: 'Como a Internet Funciona',
  description: 'Entenda o modelo em camadas, IP, DNS, roteamento e o que acontece quando voce digita uma URL no navegador',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Como a Internet Funciona\n\nA internet nao e magica — e uma pilha de protocolos bem definidos onde cada camada resolve um problema especifico e entrega um servico para a camada acima.\n\n### O Modelo em Camadas\n\nPense na comunicacao em rede como uma linha de montagem com quatro andares:\n\n**(1) Camada Fisica**\nBits viajando como sinais eletricos no cabo de cobre, pulsos de luz na fibra otica ou ondas de radio no Wi-Fi. Nao ha nenhuma nocao de "endereco" ou "pacote" aqui — apenas 0s e 1s.\n\n**(2) Camada de Rede (Internet Layer)**\nAqui vivem os **enderecos IP**. Cada dispositivo recebe um identificador numerico (ex: `192.168.1.10` no IPv4 ou `2001:db8::1` no IPv6). Os **roteadores** operam nessa camada, lendo o endereco IP de destino e decidindo para qual proximo salto (hop) encaminhar o pacote.\n\n**(3) Camada de Transporte**\nGarante que os dados cheguem completos e na ordem certa (TCP) ou entrega rapida sem garantias (UDP). Tambem introduz as **portas**, que diferenciam processos num mesmo host (porta 80 = HTTP, porta 443 = HTTPS, porta 22 = SSH).\n\n**(4) Camada de Aplicacao**\nProtocolos de alto nivel que os programas usam diretamente: HTTP, HTTPS, DNS, SMTP, FTP. E o andar onde o seu codigo vive.\n\n---\n\n### IP: Enderecos na Rede\n\nO **Internet Protocol (IP)** define como pacotes sao endereçados e roteados entre redes. Cada pacote IP contem:\n- Endereco IP de origem\n- Endereco IP de destino\n- TTL (Time To Live) — decrementado a cada roteador; previne loops infinitos\n- Payload — os dados em si\n\nO IP e **sem conexao e nao confavel por natureza** — ele apenas tenta entregar o pacote. As garantias ficam para o TCP.\n\n---\n\n### DNS: A Agenda Telefonica da Internet\n\nVoce digita `google.com`. O computador precisa do IP. Quem traduz nome para numero e o **Domain Name System (DNS)**.\n\nO processo de resolucao DNS:\n1. Navegador verifica o **cache local**\n2. Se nao encontrar, pergunta ao **resolver recursivo** (geralmente do seu provedor ou 8.8.8.8)\n3. O resolver pergunta aos **root nameservers** (13 grupos no mundo)\n4. Root aponta para o **TLD nameserver** (`.com`, `.br`, etc.)\n5. TLD aponta para o **authoritative nameserver** do dominio\n6. Authoritative responde com o IP\n7. Resolver devolve ao cliente e faz cache pelo TTL configurado\n\n---\n\n### TCP vs UDP\n\n| Caracteristica | TCP | UDP |\n|---|---|---|\n| Conexao | Sim (3-way handshake) | Nao |\n| Garantia de entrega | Sim (ACK + retransmissao) | Nao |\n| Ordem dos pacotes | Garantida | Nao garantida |\n| Controle de fluxo | Sim | Nao |\n| Velocidade | Mais lento | Mais rapido |\n| Overhead | Alto | Baixo |\n\n**Use TCP quando:** precisar de todos os dados corretos e em ordem — paginas web, APIs, email, transferencia de arquivos.\n\n**Use UDP quando:** latencia importa mais que perfeicao — streaming de video, jogos online, chamadas VoIP, DNS (queries rapidas).\n\n---\n\n### O que Acontece ao Digitar uma URL\n\nDigitou `https://github.com/torvalds` e pressionou Enter. Em milissegundos:\n\n1. **DNS lookup** — `github.com` e resolvido para um IP\n2. **TCP handshake** — 3 mensagens (SYN / SYN-ACK / ACK) estabelecem a conexao\n3. **TLS handshake** — certificado e verificado, chave de sessao e negociada (HTTPS)\n4. **HTTP Request** — navegador envia `GET /torvalds HTTP/1.1`\n5. **Servidor processa** — encontra o perfil, monta o HTML\n6. **HTTP Response** — servidor devolve `200 OK` com o corpo HTML\n7. **Renderizacao** — navegador parseia HTML, descobre CSS/JS, faz mais requests\n8. **Pagina exibida**',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'O three-way handshake TCP (SYN, SYN-ACK, ACK) acontece ANTES de qualquer dado ser enviado. Isso adiciona pelo menos uma ida-e-volta de latencia (RTT) a cada nova conexao — e por isso HTTP/2 e HTTP/3 reutilizam conexoes ao maximo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import socket\nimport struct\nimport time\n\n# Resolucao DNS basica com a biblioteca socket do Python\ndef resolver_dns(hostname):\n    """Resolve um hostname para todos os seus enderecos IP."""\n    print(f"Resolvendo: {hostname}")\n    inicio = time.time()\n\n    try:\n        # getaddrinfo retorna uma lista de tuplas com informacoes de endereco\n        # Cada tupla: (familia, tipo, proto, canonname, sockaddr)\n        resultados = socket.getaddrinfo(hostname, None)\n        tempo_ms = (time.time() - inicio) * 1000\n\n        ips_encontrados = set()\n        for familia, tipo, proto, canonname, sockaddr in resultados:\n            ip = sockaddr[0]\n            ips_encontrados.add((ip, familia))\n\n        print(f"Tempo de resolucao: {tempo_ms:.2f}ms")\n        for ip, familia in ips_encontrados:\n            versao = "IPv6" if familia == socket.AF_INET6 else "IPv4"\n            print(f"  {versao}: {ip}")\n\n        return ips_encontrados\n\n    except socket.gaierror as erro:\n        print(f"Erro na resolucao DNS: {erro}")\n        return set()\n\n\n# Verificar informacoes de conexao TCP\ndef inspecionar_conexao_tcp(host, porta):\n    """Tenta estabelecer uma conexao TCP e mede o tempo do handshake."""\n    print(f"\\nConectando a {host}:{porta}")\n\n    # Primeiro resolve o IP\n    try:\n        ip = socket.gethostbyname(host)\n        print(f"IP resolvido: {ip}")\n    except socket.gaierror:\n        print("Falha na resolucao DNS")\n        return\n\n    # Tenta o TCP handshake\n    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    sock.settimeout(5)\n\n    inicio = time.time()\n    try:\n        sock.connect((host, porta))\n        rtt_ms = (time.time() - inicio) * 1000\n        print(f"Conexao TCP estabelecida em {rtt_ms:.2f}ms (RTT)")\n        print(f"Porta local usada: {sock.getsockname()[1]}")\n    except (socket.timeout, ConnectionRefusedError) as erro:\n        print(f"Falha na conexao: {erro}")\n    finally:\n        sock.close()\n\n\n# Demonstracao\nresolver_dns("www.google.com")\nresolver_dns("github.com")\nresolver_dns("dominio-que-nao-existe-xyz.com")\n\ninspecionar_conexao_tcp("www.google.com", 80)\ninspecionar_conexao_tcp("www.google.com", 443)',
        filename: 'dns_e_tcp.py',
        description:
          'Usa o modulo socket do Python para demonstrar resolucao DNS e medicao de RTT do TCP handshake. getaddrinfo suporta IPv4 e IPv6 automaticamente.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'TTL no DNS e diferente do TTL no IP. No DNS, TTL e o tempo em segundos que um resolver pode guardar o resultado em cache (ex: 3600 = 1 hora). No IP, TTL e o numero de roteadores que o pacote pode atravessar antes de ser descartado (previne loops).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Inspecao manual de pacote TCP/IP (conceitual)\n# Na pratica, use ferramentas como Wireshark ou tcpdump\n\nimport socket\n\n# Estrutura de um pacote IP (simplificado)\n# +--------+--------+------------------+\n# | Versao |  TTL   | Protocolo        |\n# +--------+--------+------------------+\n# | Endereco IP de Origem (32 bits)     |\n# +-------------------------------------+\n# | Endereco IP de Destino (32 bits)    |\n# +-------------------------------------+\n# | Dados (payload)                     |\n# +-------------------------------------+\n\n# Estrutura do TCP three-way handshake:\n# Cliente                    Servidor\n#    |  -- SYN (seq=100) -->   |    # "Quero conectar"\n#    |  <-- SYN-ACK        --  |    # "Ok, pode conectar"\n#    |  -- ACK             --> |    # "Confirmado, vamos la"\n#    |  === CONEXAO ABERTA === |\n\n# Demonstracao: descobrir o hostname a partir de um IP (DNS reverso)\ndef dns_reverso(ip):\n    """Faz lookup DNS reverso — IP para hostname."""\n    try:\n        hostname = socket.gethostbyaddr(ip)\n        return hostname[0]  # nome canonico\n    except socket.herror:\n        return "Sem registro PTR"\n\nips_para_testar = [\n    "8.8.8.8",    # Google DNS\n    "1.1.1.1",    # Cloudflare DNS\n    "208.67.222.222",  # OpenDNS\n]\n\nprint("DNS Reverso:")\nfor ip in ips_para_testar:\n    nome = dns_reverso(ip)\n    print(f"  {ip} -> {nome}")',
        filename: 'dns_reverso.py',
        description:
          'DNS reverso mapeia IPs de volta para hostnames usando registros PTR. Util para logs de servidor, seguranca e debugging de rede.',
      },
    },
  ],
  challenges: [
    {
      id: 'redes-c1',
      title: 'Simulador de Resolucao DNS',
      description:
        'Implemente a funcao `analisar_dominio(hostname)` que: (1) resolve o hostname para IPs usando socket, (2) mede o tempo de resolucao em milissegundos, (3) tenta o DNS reverso em cada IP encontrado, (4) retorna um dicionario com as chaves "hostname", "ips", "tempo_ms" e "dns_reverso". Trate erros de DNS graciosamente.',
      language: 'python',
      starterCode:
        'import socket\nimport time\n\ndef analisar_dominio(hostname):\n    """\n    Analisa um dominio: resolve IPs, mede tempo e faz DNS reverso.\n    \n    Retorna:\n        dict com chaves: hostname, ips (list), tempo_ms (float), dns_reverso (dict ip->nome)\n    """\n    # Seu codigo aqui\n    pass\n\n\n# Teste sua implementacao\nresultado = analisar_dominio("www.python.org")\nif resultado:\n    print(f"Hostname: {resultado[\'hostname\']}")\n    print(f"IPs encontrados: {resultado[\'ips\']}")\n    print(f"Tempo de resolucao: {resultado[\'tempo_ms\']:.2f}ms")\n    print(f"DNS reverso: {resultado[\'dns_reverso\']}")\n',
      solution:
        'import socket\nimport time\n\ndef analisar_dominio(hostname):\n    resultado = {\n        "hostname": hostname,\n        "ips": [],\n        "tempo_ms": 0.0,\n        "dns_reverso": {}\n    }\n\n    inicio = time.time()\n    try:\n        infos = socket.getaddrinfo(hostname, None)\n        resultado["tempo_ms"] = (time.time() - inicio) * 1000\n\n        ips_unicos = set()\n        for familia, tipo, proto, canonname, sockaddr in infos:\n            ips_unicos.add(sockaddr[0])\n\n        resultado["ips"] = list(ips_unicos)\n\n        for ip in resultado["ips"]:\n            try:\n                nome = socket.gethostbyaddr(ip)[0]\n            except socket.herror:\n                nome = "sem registro PTR"\n            resultado["dns_reverso"][ip] = nome\n\n    except socket.gaierror as erro:\n        resultado["tempo_ms"] = (time.time() - inicio) * 1000\n        resultado["erro"] = str(erro)\n\n    return resultado\n\n\nresultado = analisar_dominio("www.python.org")\nif resultado:\n    print(f"Hostname: {resultado[\'hostname\']}")\n    print(f"IPs encontrados: {resultado[\'ips\']}")\n    print(f"Tempo de resolucao: {resultado[\'tempo_ms\']:.2f}ms")\n    print(f"DNS reverso: {resultado[\'dns_reverso\']}")\n',
      hints: [
        'Use socket.getaddrinfo(hostname, None) — retorna lista de tuplas; o IP esta em sockaddr[0]',
        'Para DNS reverso, use socket.gethostbyaddr(ip) e capture socket.herror quando nao houver registro PTR',
        'Meça o tempo com time.time() antes e depois da chamada getaddrinfo e calcule a diferenca em milissegundos',
      ],
    },
  ],
};
