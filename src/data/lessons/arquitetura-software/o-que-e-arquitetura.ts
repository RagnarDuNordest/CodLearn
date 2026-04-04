import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-arquitetura',
  moduleId: 'arquitetura-software',
  title: 'O que e Arquitetura de Software',
  description: 'Entenda o que e arquitetura de software, por que ela importa e como boas decisoes estruturais facilitam o crescimento do seu sistema.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## O que e Arquitetura de Software?\n\nArquitetura de software e o conjunto de **decisoes fundamentais** sobre como um sistema e organizado. Sao as escolhas que definem a estrutura do projeto: como as partes se dividem, como elas se comunicam, e como o sistema vai crescer ao longo do tempo.\n\nA diferenca entre arquitetura e design comum e simples: **arquitetura sao as decisoes dificeis de mudar depois**. Escolher qual banco de dados usar, como separar as responsabilidades do codigo, como os modulos se comunicam — essas sao decisoes arquiteturais.\n\nPense assim: **design** e escolher a cor das paredes de uma casa. **Arquitetura** e decidir onde ficam as paredes estruturais, a fundacao e os canos. Voce pode repintar uma parede facilmente, mas mover uma parede estrutural e muito custoso.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Uma boa definicao pratica: arquitetura e tudo aquilo que um desenvolvedor experiente desejaria ter acertado no inicio do projeto. Sao as coisas que, se erradas, causam dor por meses ou anos.',
    },
    {
      type: 'text',
      content: '## A Analogia da Construcao Civil\n\nImagine construir uma cidade. Os **urbanistas** definem onde ficam as estradas principais, o sistema de esgoto, os parques. Essas sao decisoes dificeis de reverter depois que a cidade esta construida.\n\nJa os **arquitetos de edificios** decidem o layout de cada construcao: quantos andares, onde ficam as escadas, a distribuicao dos apartamentos.\n\nOs **decoradores** escolhem moveis, cores e cortinas — faceis de mudar a qualquer momento.\n\nNo software:\n- **Urbanistas** = arquitetos de sistema (microservicos, cloud, banco de dados)\n- **Arquitetos de edificios** = arquitetos de software (camadas, modulos, padroes)\n- **Decoradores** = desenvolvedores fazendo escolhas locais (nome de variaveis, algoritmos simples)\n\nUma cidade mal planejada tem engarrafamentos, falta de espaco, servicos que nao funcionam. Um software mal arquitetado tem as mesmas caracteristicas: lentidao, bugs em cadeia, impossibilidade de adicionar funcionalidades novas.',
    },
    {
      type: 'text',
      content: '## O Custo de uma Ma Arquitetura: Divida Tecnica\n\n**Divida tecnica** e o custo acumulado de atalhos e decisoes ruins tomadas ao longo do desenvolvimento. Assim como uma divida financeira, ela cresce com juros: cada atalho de hoje dificulta o trabalho de amanha.\n\nSinais de divida tecnica alta:\n- Adicionar uma funcionalidade simples demora dias ou semanas\n- Corrigir um bug em um lugar quebra algo em outro lugar\n- Novos desenvolvedores levam meses para entender o codigo\n- Ninguem quer mexer em certas partes do sistema ("zona de perigo")\n- Os testes sao dificeis ou impossiveis de escrever\n\nUma boa arquitetura **investe tempo agora** para economizar muito tempo no futuro. O objetivo nao e ter a arquitetura perfeita desde o inicio, mas tomar decisoes conscientes e criar um sistema que **facilita a mudanca**.',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Codigo espaguete e o nome carinhoso para sistemas sem arquitetura definida: tudo misturado, dependencias cruzadas em todas as direcoes, impossivel de testar isoladamente. O nome vem da imagem de um prato de espaguete — tente puxar um fio sem mover os outros.',
    },
    {
      type: 'text',
      content: '## Codigo Espaguete vs Codigo Estruturado\n\nVeja a diferenca pratica entre um script sem estrutura e o mesmo sistema com responsabilidades separadas:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'espaguete.py',
        code: `# MAU EXEMPLO: tudo misturado em um script espaguete
# Banco de dados, logica de negocio e exibicao juntos

import sqlite3

# Conecta ao banco (misturado com tudo)
conn = sqlite3.connect("loja.db")
cursor = conn.cursor()

# Busca produtos (logica de dados misturada com logica de negocio)
cursor.execute("SELECT * FROM produtos")
produtos = cursor.fetchall()

# Calcula desconto e exibe (tudo junto, sem separacao)
for p in produtos:
    nome = p[1]
    preco = p[2]
    estoque = p[3]
    if estoque > 100:
        preco_final = preco * 0.9  # 10% de desconto
    else:
        preco_final = preco
    # Exibicao misturada com calculo
    print(f"Produto: {nome} | Preco: R$ {preco_final:.2f}")
    # Atualiza banco misturado com exibicao
    cursor.execute("UPDATE produtos SET preco=? WHERE id=?", (preco_final, p[0]))

conn.commit()
conn.close()
# Problema: para testar o calculo de desconto, precisamos de um banco de dados real!
# Problema: para mudar como exibimos, precisamos mexer no meio da logica de negocio!
# Problema: se o banco mudar, precisamos reescrever tudo!`,
        description: 'Codigo espaguete: regras de negocio, acesso a dados e exibicao completamente misturados.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'estruturado.py',
        code: `# BOM EXEMPLO: responsabilidades separadas

# --- CAMADA DE DADOS (acesso ao banco) ---
class ProdutoRepositorio:
    def __init__(self, conexao):
        self.conexao = conexao

    def buscar_todos(self):
        cursor = self.conexao.cursor()
        cursor.execute("SELECT id, nome, preco, estoque FROM produtos")
        return cursor.fetchall()

    def atualizar_preco(self, produto_id, novo_preco):
        cursor = self.conexao.cursor()
        cursor.execute("UPDATE produtos SET preco=? WHERE id=?", (novo_preco, produto_id))
        self.conexao.commit()


# --- CAMADA DE NEGOCIO (regras e calculos) ---
class ServicoDesconto:
    LIMITE_ESTOQUE_ALTO = 100
    PERCENTUAL_DESCONTO = 0.10

    def calcular_preco_final(self, preco, estoque):
        # Regra de negocio isolada e testavel sem banco de dados
        if estoque > self.LIMITE_ESTOQUE_ALTO:
            return preco * (1 - self.PERCENTUAL_DESCONTO)
        return preco


# --- CAMADA DE APRESENTACAO (exibicao) ---
class ExibidorDeProdutos:
    def exibir(self, nome, preco_final):
        print(f"Produto: {nome} | Preco com desconto: R$ {preco_final:.2f}")


# --- COORDENACAO (junta tudo) ---
def aplicar_descontos(repositorio, servico, exibidor):
    produtos = repositorio.buscar_todos()
    for produto_id, nome, preco, estoque in produtos:
        preco_final = servico.calcular_preco_final(preco, estoque)
        repositorio.atualizar_preco(produto_id, preco_final)
        exibidor.exibir(nome, preco_final)

# Agora posso testar ServicoDesconto sem banco de dados!
# Agora posso mudar a exibicao sem tocar nas regras de negocio!
# Agora posso trocar o banco sem alterar as regras!`,
        description: 'Codigo estruturado: cada classe tem uma unica responsabilidade. Facil de testar, manter e modificar.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Uma boa arquitetura nao significa mais codigo. Significa codigo mais organizado. O exemplo estruturado e um pouco maior, mas cada parte pode ser lida, testada e modificada de forma independente. Isso vale muito a pena conforme o sistema cresce.',
    },
    {
      type: 'text',
      content: '## Boa Arquitetura Facilita a Mudanca\n\nO objetivo final de uma boa arquitetura e **tornar o software facil de mudar**. Nenhum sistema nasce completo — os requisitos mudam, o negocio evolui, novas tecnologias surgem.\n\nPrincipios que toda boa arquitetura segue:\n\n**Separacao de responsabilidades** — cada parte do sistema faz uma coisa so. Isso limita o impacto de mudancas.\n\n**Baixo acoplamento** — as partes do sistema conhecem o minimo possivel umas das outras. Trocar uma parte nao exige reescrever todas as outras.\n\n**Alta coesao** — coisas que mudam juntas ficam juntas. O codigo relacionado a "pagamentos" fica no modulo de pagamentos, nao espalhado pelo sistema.\n\n**Testabilidade** — voce consegue testar partes do sistema isoladamente, sem precisar subir o sistema inteiro.',
    },
  ],
  challenges: [
    {
      id: 'arquitetura-challenge-1',
      title: 'Identificar Problemas Arquiteturais',
      description: 'Analise o codigo abaixo e identifique pelo menos 3 problemas arquiteturais. Reescreva a funcao principal separando as responsabilidades em funcoes menores e distintas: uma para ler dados, uma para processar/calcular e uma para exibir resultados.',
      language: 'python',
      starterCode: `# Codigo com problemas arquiteturais - identifique e corrija
# Este sistema calcula o salario liquido de funcionarios

funcionarios = [
    {"nome": "Ana", "salario_bruto": 5000, "horas_extras": 10},
    {"nome": "Bruno", "salario_bruto": 3500, "horas_extras": 0},
    {"nome": "Carla", "salario_bruto": 8000, "horas_extras": 5},
]

def processar_folha():
    # TODO: Separe em 3 funcoes:
    # 1. obter_funcionarios() - retorna a lista de funcionarios
    # 2. calcular_salario_liquido(salario_bruto, horas_extras) - faz os calculos
    # 3. exibir_relatorio(nome, salario_liquido) - exibe o resultado
    # Por enquanto, tudo misturado:
    total = 0
    for f in funcionarios:
        valor_hora_extra = (f["salario_bruto"] / 160) * 1.5
        salario_com_extra = f["salario_bruto"] + (valor_hora_extra * f["horas_extras"])
        if salario_com_extra > 6000:
            imposto = salario_com_extra * 0.275
        elif salario_com_extra > 3000:
            imposto = salario_com_extra * 0.15
        else:
            imposto = 0
        liquido = salario_com_extra - imposto
        total += liquido
        print(f"{f['nome']}: Bruto R\${salario_com_extra:.2f} | Imposto R\${imposto:.2f} | Liquido R\${liquido:.2f}")
    print(f"Total folha: R\${total:.2f}")

processar_folha()
`,
      solution: `# Solucao: cada funcao tem uma unica responsabilidade

# Responsabilidade 1: fornecer os dados
def obter_funcionarios():
    return [
        {"nome": "Ana", "salario_bruto": 5000, "horas_extras": 10},
        {"nome": "Bruno", "salario_bruto": 3500, "horas_extras": 0},
        {"nome": "Carla", "salario_bruto": 8000, "horas_extras": 5},
    ]

# Responsabilidade 2: calcular (logica de negocio pura, sem print, sem dados externos)
def calcular_salario_liquido(salario_bruto, horas_extras):
    valor_hora_extra = (salario_bruto / 160) * 1.5
    salario_com_extra = salario_bruto + (valor_hora_extra * horas_extras)

    if salario_com_extra > 6000:
        imposto = salario_com_extra * 0.275
    elif salario_com_extra > 3000:
        imposto = salario_com_extra * 0.15
    else:
        imposto = 0

    liquido = salario_com_extra - imposto
    return salario_com_extra, imposto, liquido

# Responsabilidade 3: exibir (sem calculos, so formatacao)
def exibir_relatorio(nome, salario_bruto_com_extra, imposto, liquido):
    print(f"{nome}: Bruto R\${salario_bruto_com_extra:.2f} | Imposto R\${imposto:.2f} | Liquido R\${liquido:.2f}")

# Coordenacao: junta tudo
def processar_folha():
    funcionarios = obter_funcionarios()
    total = 0
    for f in funcionarios:
        bruto_com_extra, imposto, liquido = calcular_salario_liquido(
            f["salario_bruto"], f["horas_extras"]
        )
        exibir_relatorio(f["nome"], bruto_com_extra, imposto, liquido)
        total += liquido
    print(f"Total folha: R\${total:.2f}")

processar_folha()
# Agora posso testar calcular_salario_liquido sem precisar de dados reais!
# Posso mudar a exibicao sem tocar nos calculos!
`,
      hints: [
        'Comece identificando: onde estao os dados? Onde estao os calculos? Onde esta a exibicao?',
        'Crie uma funcao so para calcular o salario liquido, que receba os valores como parametros e retorne o resultado.',
        'A funcao de exibicao deve receber apenas os valores ja calculados e so fazer print. Nenhum calculo dentro dela.',
      ],
    },
    {
      id: 'arquitetura-challenge-2',
      title: 'Reestruturar um Script Desorganizado',
      description: 'O script abaixo verifica se estudantes foram aprovados e envia "notificacoes" (prints). Ele esta todo misturado. Reestruture-o separando: (1) os dados dos estudantes, (2) a regra de aprovacao, (3) a geracao do texto da notificacao, e (4) o envio da notificacao. Use classes ou funcoes separadas.',
      language: 'python',
      starterCode: `# Script desorganizado - reestruture separando responsabilidades

def verificar_e_notificar():
    estudantes = [
        {"nome": "Ana", "notas": [8.5, 7.0, 9.0, 6.5]},
        {"nome": "Bruno", "notas": [5.0, 4.5, 6.0, 5.5]},
        {"nome": "Carla", "notas": [9.0, 8.5, 9.5, 10.0]},
        {"nome": "Diego", "notas": [6.5, 7.0, 6.0, 7.5]},
    ]
    for e in estudantes:
        media = sum(e["notas"]) / len(e["notas"])
        # Tudo misturado: calculo + decisao + mensagem + envio
        if media >= 7.0:
            msg = f"Parabens {e['nome']}! Voce foi APROVADO com media {media:.1f}."
            print(f"[NOTIFICACAO ENVIADA] -> {msg}")
        else:
            msg = f"Atencao {e['nome']}: voce foi REPROVADO. Sua media foi {media:.1f}."
            print(f"[NOTIFICACAO ENVIADA] -> {msg}")

verificar_e_notificar()
`,
      solution: `# Solucao reestruturada com responsabilidades claras

# 1. Dados
def obter_estudantes():
    return [
        {"nome": "Ana", "notas": [8.5, 7.0, 9.0, 6.5]},
        {"nome": "Bruno", "notas": [5.0, 4.5, 6.0, 5.5]},
        {"nome": "Carla", "notas": [9.0, 8.5, 9.5, 10.0]},
        {"nome": "Diego", "notas": [6.5, 7.0, 6.0, 7.5]},
    ]

# 2. Regra de negocio (calculo e decisao)
def avaliar_estudante(notas):
    media = sum(notas) / len(notas)
    aprovado = media >= 7.0
    return media, aprovado

# 3. Geracao de mensagem (formatacao do texto)
def criar_mensagem(nome, media, aprovado):
    if aprovado:
        return f"Parabens {nome}! Voce foi APROVADO com media {media:.1f}."
    else:
        return f"Atencao {nome}: voce foi REPROVADO. Sua media foi {media:.1f}."

# 4. Envio de notificacao (canal de saida - poderia ser email, SMS etc.)
def enviar_notificacao(mensagem):
    print(f"[NOTIFICACAO ENVIADA] -> {mensagem}")

# Coordenacao: orquestra todas as responsabilidades
def processar_resultado_dos_estudantes():
    estudantes = obter_estudantes()
    for estudante in estudantes:
        media, aprovado = avaliar_estudante(estudante["notas"])
        mensagem = criar_mensagem(estudante["nome"], media, aprovado)
        enviar_notificacao(mensagem)

processar_resultado_dos_estudantes()
# Beneficios: posso testar avaliar_estudante sem dados reais
# Posso mudar o canal de envio (email, SMS) sem tocar na logica
# Posso mudar a mensagem sem tocar nos calculos
`,
      hints: [
        'Identifique as 4 partes: onde estao os dados? Qual e a regra de aprovacao? Como a mensagem e formatada? Como ela e enviada?',
        'A funcao de regra de negocio (avaliar_estudante) deve receber apenas as notas e retornar a media e se foi aprovado.',
        'A funcao enviar_notificacao deve receber apenas a mensagem pronta. Assim, no futuro voce pode mudar de print para envio de email sem alterar mais nada.',
      ],
    },
  ],
};
