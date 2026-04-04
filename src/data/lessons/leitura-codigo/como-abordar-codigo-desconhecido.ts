import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'como-abordar-codigo-desconhecido',
  moduleId: 'leitura-codigo',
  title: 'Como Abordar Codigo Desconhecido',
  description: 'Um metodo sistematico para entender qualquer codigo sem entrar em panico',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Como abordar codigo que voce nunca viu antes\n\nLer codigo desconhecido e uma habilidade — e pode ser aprendida. A maioria dos desenvolvedores iniciantes comete o mesmo erro: abrir o arquivo e tentar ler linha por linha, de cima para baixo, como se fosse um livro. Isso leva ao panico rapidamente.\n\nO profissional experiente faz diferente. Ele usa um metodo sistematico de 5 passos:\n\n### O Metodo dos 5 Passos\n\n**Passo 1 — Entenda o PROPOSITO antes de ler uma linha**\nLeia o README, o nome do arquivo, o nome das funcoes. O que esse codigo deveria fazer? Responda essa pergunta antes de abrir qualquer funcao.\n\n**Passo 2 — Identifique o PONTO DE ENTRADA**\nTodo programa comeca em algum lugar: `main()`, `index.py`, `app.py`, o bloco `if __name__ == "__main__"`. Encontre esse ponto. Tudo começa ali.\n\n**Passo 3 — Leia as ASSINATURAS das funcoes antes do corpo**\nPercorra o arquivo lendo apenas os nomes das funcoes e seus parametros. Ignore o interior por enquanto. Os nomes contam 70% da historia.\n\n**Passo 4 — Siga o FLUXO dos dados, nao a ordem do arquivo**\nOs dados entram por onde? Passam por quais funcoes? Saem como? Trace esse caminho mentalmente.\n\n**Passo 5 — Use PRINTS/LOGS para confirmar seu entendimento**\nDepois de ter uma hipotese sobre o que o codigo faz, coloque alguns `print()` estrategicos e execute. Isso confirma ou corrige sua teoria.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'class GerenciadorTarefas:\n    def __init__(self):\n        self.tarefas = []\n        self.concluidas = []\n\n    def adicionar(self, titulo, prioridade=1):\n        tarefa = {\n            "id": len(self.tarefas) + 1,\n            "titulo": titulo,\n            "prioridade": prioridade,\n            "feita": False\n        }\n        self.tarefas.append(tarefa)\n        return tarefa["id"]\n\n    def concluir(self, id_tarefa):\n        for t in self.tarefas:\n            if t["id"] == id_tarefa and not t["feita"]:\n                t["feita"] = True\n                self.concluidas.append(t)\n                return True\n        return False\n\n    def pendentes(self):\n        return [t for t in self.tarefas if not t["feita"]]\n\n    def por_prioridade(self):\n        return sorted(self.pendentes(), key=lambda t: t["prioridade"], reverse=True)',
        filename: 'gerenciador_tarefas.py',
        description:
          'Antes de ler linha por linha: qual o proposito dessa classe? Como voce saberia? Aplique o Passo 1 e o Passo 3 — leia apenas os nomes dos metodos: __init__, adicionar, concluir, pendentes, por_prioridade. Ja e suficiente para entender que e um gerenciador de tarefas com suporte a prioridade.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Truque profissional: leia os nomes de todos os metodos de uma classe antes de ler qualquer implementacao. Os nomes contam a historia. Se os nomes nao contam a historia, e um sinal de que o codigo esta mal escrito — e isso ja e uma informacao importante.',
    },
    {
      type: 'text',
      content:
        '## A abordagem "de fora para dentro"\n\nEm vez de entrar direto nos detalhes, comece pelo nivel mais alto e va descendo apenas quando necessario.\n\n**Nivel 1 (30 segundos):** O que esse programa FAZ? Leia o nome do projeto, o README, os nomes dos arquivos.\n\n**Nivel 2 (2 minutos):** Quais sao os principais arquivos, classes e funcoes? Leia apenas os nomes, nao os corpos.\n\n**Nivel 3 (tempo variavel):** Como uma funcionalidade especifica funciona? So entao va fundo em uma parte especifica.\n\nA armadilha e pular direto para o Nivel 3. Desenvolvedores experientes resistem a essa tentacao. Eles constroem o mapa antes de explorar o territorio.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'class GerenciadorTarefas:\n    def __init__(self):\n        # Estado interno: lista de todas as tarefas e lista das ja concluidas\n        self.tarefas = []\n        self.concluidas = []\n\n    def adicionar(self, titulo, prioridade=1):\n        # Cria uma tarefa como dicionario e adiciona a lista\n        # Retorna o ID gerado automaticamente\n        tarefa = {\n            "id": len(self.tarefas) + 1,  # ID sequencial simples\n            "titulo": titulo,\n            "prioridade": prioridade,\n            "feita": False  # toda tarefa começa como nao feita\n        }\n        self.tarefas.append(tarefa)\n        return tarefa["id"]\n\n    def concluir(self, id_tarefa):\n        # Busca a tarefa pelo ID (padrão: search loop)\n        # Marca como feita e move para lista de concluidas\n        # Retorna True se encontrou e concluiu, False caso contrario\n        for t in self.tarefas:\n            if t["id"] == id_tarefa and not t["feita"]:\n                t["feita"] = True\n                self.concluidas.append(t)\n                return True\n        return False  # tarefa nao encontrada ou ja concluida\n\n    def pendentes(self):\n        # Filter loop: retorna apenas as tarefas ainda nao feitas\n        return [t for t in self.tarefas if not t["feita"]]\n\n    def por_prioridade(self):\n        # Pega as pendentes e ordena por prioridade (maior primeiro)\n        return sorted(self.pendentes(), key=lambda t: t["prioridade"], reverse=True)',
        filename: 'gerenciador_tarefas_anotado.py',
        description:
          'O mesmo codigo, agora com o processo de entendimento documentado. Perceba como cada comentario captura uma decisao de design — nao apenas "o que" o codigo faz, mas "por que" e "como".',
      },
    },
  ],
  challenges: [
    {
      id: 'abordar-c1',
      title: 'Lendo um Modulo Desconhecido',
      description:
        'Leia o modulo abaixo e escreva um comentario acima de cada funcao explicando o que ela faz em portugues simples. Nao tente adivinhar — aplique o metodo: leia todos os nomes primeiro, veja os parametros e o retorno, entenda o fluxo.',
      language: 'python',
      starterCode:
        '# Modulo: calculadora com historico\n# Tarefa: escreva um comentario acima de cada funcao explicando o que ela faz\n\nclass Calculadora:\n    def __init__(self):\n        self.historico = []\n\n    # [explique o que esta funcao faz]\n    def calcular(self, a, op, b):\n        if op == "+":\n            resultado = a + b\n        elif op == "-":\n            resultado = a - b\n        elif op == "*":\n            resultado = a * b\n        elif op == "/" and b != 0:\n            resultado = a / b\n        else:\n            return None\n        self.historico.append(f"{a} {op} {b} = {resultado}")\n        return resultado\n\n    # [explique o que esta funcao faz]\n    def ultimo_resultado(self):\n        if self.historico:\n            return self.historico[-1]\n        return None\n\n    # [explique o que esta funcao faz]\n    def limpar_historico(self):\n        self.historico = []\n\n    # [explique o que esta funcao faz]\n    def get_historico(self):\n        return list(self.historico)\n',
      solution:
        '# Modulo: calculadora com historico\n\nclass Calculadora:\n    def __init__(self):\n        self.historico = []\n\n    # Realiza uma operacao aritmetica entre dois numeros.\n    # Aceita os operadores +, -, *, /. Protege contra divisao por zero.\n    # Salva a operacao no historico e retorna o resultado (ou None se invalida).\n    def calcular(self, a, op, b):\n        if op == "+":\n            resultado = a + b\n        elif op == "-":\n            resultado = a - b\n        elif op == "*":\n            resultado = a * b\n        elif op == "/" and b != 0:\n            resultado = a / b\n        else:\n            return None\n        self.historico.append(f"{a} {op} {b} = {resultado}")\n        return resultado\n\n    # Retorna a ultima operacao realizada como string (ex: "3 + 5 = 8").\n    # Retorna None se nenhuma operacao foi feita ainda.\n    def ultimo_resultado(self):\n        if self.historico:\n            return self.historico[-1]\n        return None\n\n    # Apaga todo o historico de operacoes, deixando a lista vazia.\n    def limpar_historico(self):\n        self.historico = []\n\n    # Retorna uma copia da lista com todas as operacoes realizadas.\n    # Retorna copia para proteger o estado interno.\n    def get_historico(self):\n        return list(self.historico)\n',
      hints: [
        'Leia todos os nomes de funcao primeiro: calcular, ultimo_resultado, limpar_historico, get_historico. Os nomes ja dizem bastante.',
        'Veja os parametros e o que e retornado: calcular recebe dois numeros e um operador, e retorna o resultado ou None.',
        'Procure padroes: get_ provavelmente le dados, limpar_ provavelmente reseta algo, calcular_ provavelmente processa e salva.',
      ],
    },
    {
      id: 'abordar-c2',
      title: 'Encontre o Ponto de Entrada',
      description:
        'Analise o script abaixo e responda nos comentarios: qual funcao executa primeiro? Qual chama qual? Desenhe o grafo de chamadas como comentarios no final do arquivo.',
      language: 'python',
      starterCode:
        '# Script conversor de arquivos\n# Sua tarefa: identifique o ponto de entrada e o grafo de chamadas\n\ndef ler_arquivo(caminho):\n    with open(caminho, "r") as f:\n        return f.read()\n\ndef converter_para_maiusculas(texto):\n    return texto.upper()\n\ndef salvar_arquivo(caminho, conteudo):\n    with open(caminho, "w") as f:\n        f.write(conteudo)\n\ndef processar(entrada, saida):\n    conteudo = ler_arquivo(entrada)\n    convertido = converter_para_maiusculas(conteudo)\n    salvar_arquivo(saida, convertido)\n\ndef main():\n    processar("input.txt", "output.txt")\n\nif __name__ == "__main__":\n    main()\n\n# GRAFO DE CHAMADAS:\n# [ponto de entrada] --> ???\n# ??? --> ???\n# ??? --> ???\n',
      solution:
        '# Script conversor de arquivos\n\ndef ler_arquivo(caminho):\n    with open(caminho, "r") as f:\n        return f.read()\n\ndef converter_para_maiusculas(texto):\n    return texto.upper()\n\ndef salvar_arquivo(caminho, conteudo):\n    with open(caminho, "w") as f:\n        f.write(conteudo)\n\ndef processar(entrada, saida):\n    conteudo = ler_arquivo(entrada)\n    convertido = converter_para_maiusculas(conteudo)\n    salvar_arquivo(saida, convertido)\n\ndef main():\n    processar("input.txt", "output.txt")\n\nif __name__ == "__main__":\n    main()\n\n# GRAFO DE CHAMADAS:\n# [ponto de entrada] --> main()              (if __name__ == "__main__" dispara main)\n# main()            --> processar()          (main chama processar com os caminhos)\n# processar()       --> ler_arquivo()        (le o conteudo do arquivo de entrada)\n# processar()       --> converter_para_maiusculas()  (transforma o texto)\n# processar()       --> salvar_arquivo()     (salva o resultado no arquivo de saida)\n',
      hints: [
        'Procure pelo bloco "if __name__ == __main__": — esse e o ponto de entrada do script.',
        'Siga a cadeia: o que main() chama? O que essa funcao chama? Trace o caminho ate as funcoes folha.',
        'Funcoes folha sao as que nao chamam outras funcoes do arquivo — geralmente as que interagem com o sistema (ler, salvar).',
      ],
    },
  ],
};
