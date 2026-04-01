import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'reconhecendo-padroes-comuns',
  moduleId: 'leitura-codigo',
  title: 'Reconhecendo Padroes Comuns',
  description: 'Os mesmos padroes aparecem em todo codigo — aprenda a identifica-los instantaneamente',
  order: 2,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Padroes: a linguagem secreta do codigo\n\nUm enxadrista experiente nao analisa cada peca individualmente — ele reconhece **posicoes** inteiras de uma vez. Da mesma forma, um desenvolvedor experiente nao le codigo linha por linha: ele reconhece **padroes** instantaneamente.\n\nOs mesmos padroes aparecem em TODOS os codigos, independente da linguagem ou do dominio. Quando voce os conhece, ler codigo desconhecido fica muito mais rapido.\n\n### Os 6 padroes fundamentais:\n\n1. **Acumulador** — coleta um resultado ao longo de um loop (soma, contagem, concatenacao)\n2. **Filter loop** — seleciona apenas os elementos que satisfazem uma condicao\n3. **Search loop** — encontra o primeiro elemento que satisfaz algo e para\n4. **Guard clause** — verifica pre-condicoes antes de executar a logica principal\n5. **Transform** — mapeia cada elemento para outro valor\n6. **Builder** — constroi uma estrutura complexa passo a passo',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# PADRAO 1: Acumulador\n# Reconheca: variavel iniciada antes do loop, modificada dentro\ndef somar_lista(nums):\n    total = 0           # variavel acumuladora\n    for n in nums:\n        total += n      # acumula\n    return total\n\n\n# PADRAO 2: Filter loop\n# Reconheca: lista vazia antes do loop, append condicional dentro\ndef apenas_positivos(nums):\n    resultado = []      # colecao que sera preenchida\n    for n in nums:\n        if n > 0:       # condicao de filtro\n            resultado.append(n)\n    return resultado\n\n\n# PADRAO 3: Search loop\n# Reconheca: return DENTRO do loop, return None apos o loop\ndef encontrar_primeiro_par(nums):\n    for n in nums:\n        if n % 2 == 0:\n            return n    # achou, retorna imediatamente\n    return None         # nao encontrou\n\n\n# PADRAO 4: Guard clause\n# Reconheca: ifs no inicio que retornam cedo para entradas invalidas\ndef calcular_imc(peso, altura):\n    if peso <= 0:\n        return None     # guard: entrada invalida\n    if altura <= 0:\n        return None     # guard: entrada invalida\n    return peso / (altura ** 2)  # logica principal so executa se passou nas guards\n\n\n# PADRAO 5: Transform\n# Reconheca: list comprehension ou loop que cria nova lista com um item por entrada\ndef converter_celsius_fahrenheit(temps):\n    return [(t * 9/5) + 32 for t in temps]  # transforma cada elemento\n\n\n# PADRAO 6: Builder\n# Reconheca: estrutura criada vazia e construida incrementalmente\ndef criar_relatorio(vendas):\n    relatorio = {}      # estrutura sendo construida\n    relatorio["total"] = sum(vendas)\n    relatorio["media"] = sum(vendas) / len(vendas) if vendas else 0\n    relatorio["maior"] = max(vendas) if vendas else 0\n    relatorio["qtd"] = len(vendas)\n    return relatorio',
        filename: 'padroes_fundamentais.py',
        description:
          'Os 6 padroes fundamentais. Depois de internaliza-los, voce vai reconhece-los em millisegundos — mesmo em linguagens diferentes e contextos variados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Quando encontrar um loop, pergunte: ele esta ACUMULANDO, FILTRANDO, BUSCANDO ou TRANSFORMANDO? A resposta revela 80% do que o loop faz — antes mesmo de ler o corpo completo.',
    },
    {
      type: 'text',
      content:
        '## Convencoes de nomenclatura como pistas\n\nOs nomes das funcoes sao pistas poderosas sobre o que elas fazem. Desenvolvedores experientes seguem convencoes:\n\n| Prefixo | Significado tipico | Exemplo |\n|---|---|---|\n| `get_` / `fetch_` / `find_` | Le dados, nao modifica | `get_user_by_id()` |\n| `add_` / `create_` / `insert_` | Cria dados novos | `add_product()` |\n| `update_` / `set_` / `change_` | Modifica dados existentes | `update_email()` |\n| `delete_` / `remove_` / `clear_` | Remove dados | `delete_account()` |\n| `is_` / `has_` / `can_` | Retorna booleano | `is_admin()` |\n| `calculate_` / `compute_` | Faz calculo, retorna valor | `calculate_tax()` |\n| `validate_` / `check_` | Verifica condicao | `validate_email()` |\n\nQualquer funcao que quebre essas convencoes — como `get_user()` que modifica dados — esta mal nomeada. Isso e um sinal de alerta.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Modulo utilitario: identifique o padrao de cada funcao\n\ndef get_usuarios_ativos(usuarios):\n    return [u for u in usuarios if u["ativo"]]\n\ndef calcular_total_pedido(itens):\n    subtotal = 0\n    for item in itens:\n        subtotal += item["preco"] * item["quantidade"]\n    desconto = subtotal * 0.1 if subtotal > 100 else 0\n    return subtotal - desconto\n\ndef find_usuario_por_email(usuarios, email):\n    for u in usuarios:\n        if u["email"] == email:\n            return u\n    return None\n\ndef is_email_valido(email):\n    return "@" in email and "." in email.split("@")[-1]\n\ndef criar_perfil(nome, email, idade):\n    if not is_email_valido(email):\n        return None\n    if idade < 0 or idade > 150:\n        return None\n    perfil = {}\n    perfil["nome"] = nome\n    perfil["email"] = email.lower()\n    perfil["idade"] = idade\n    perfil["ativo"] = True\n    return perfil\n\ndef contar_por_status(usuarios):\n    contagem = {"ativos": 0, "inativos": 0}\n    for u in usuarios:\n        if u["ativo"]:\n            contagem["ativos"] += 1\n        else:\n            contagem["inativos"] += 1\n    return contagem',
        filename: 'modulo_usuarios.py',
        description:
          'Identifique o padrao de cada funcao: get_usuarios_ativos (filter), calcular_total_pedido (acumulador), find_usuario_por_email (search), is_email_valido (guard/boolean), criar_perfil (guard + builder), contar_por_status (acumulador com estrutura).',
      },
    },
  ],
  challenges: [
    {
      id: 'padroes-c1',
      title: 'Identifique o Padrao',
      description:
        'Para cada um dos 5 trechos abaixo, escreva o nome do padrao e explique em uma frase o que o codigo faz.',
      language: 'python',
      starterCode:
        '# Trecho 1\ndef processar(dados):\n    saida = []\n    for d in dados:\n        if d["status"] == "pendente":\n            saida.append(d)\n    return saida\n# Padrao: ???\n# O que faz: ???\n\n\n# Trecho 2\ndef analisar(numeros):\n    maximo = numeros[0]\n    for n in numeros[1:]:\n        if n > maximo:\n            maximo = n\n    return maximo\n# Padrao: ???\n# O que faz: ???\n\n\n# Trecho 3\ndef verificar(senha):\n    if len(senha) < 8:\n        return False\n    if not any(c.isupper() for c in senha):\n        return False\n    if not any(c.isdigit() for c in senha):\n        return False\n    return True\n# Padrao: ???\n# O que faz: ???\n\n\n# Trecho 4\ndef transformar(nomes):\n    return [n.strip().title() for n in nomes]\n# Padrao: ???\n# O que faz: ???\n\n\n# Trecho 5\ndef localizar(lista, alvo):\n    for i, item in enumerate(lista):\n        if item == alvo:\n            return i\n    return -1\n# Padrao: ???\n# O que faz: ???\n',
      solution:
        '# Trecho 1\ndef processar(dados):\n    saida = []\n    for d in dados:\n        if d["status"] == "pendente":\n            saida.append(d)\n    return saida\n# Padrao: Filter loop\n# O que faz: retorna apenas os itens cujo status e "pendente"\n\n\n# Trecho 2\ndef analisar(numeros):\n    maximo = numeros[0]\n    for n in numeros[1:]:\n        if n > maximo:\n            maximo = n\n    return maximo\n# Padrao: Acumulador (variante: rastreamento de maximo)\n# O que faz: encontra e retorna o maior numero da lista\n\n\n# Trecho 3\ndef verificar(senha):\n    if len(senha) < 8:\n        return False\n    if not any(c.isupper() for c in senha):\n        return False\n    if not any(c.isdigit() for c in senha):\n        return False\n    return True\n# Padrao: Guard clause\n# O que faz: valida se a senha atende aos requisitos minimos (8 chars, maiuscula e numero)\n\n\n# Trecho 4\ndef transformar(nomes):\n    return [n.strip().title() for n in nomes]\n# Padrao: Transform\n# O que faz: normaliza cada nome removendo espacos e capitalizando corretamente\n\n\n# Trecho 5\ndef localizar(lista, alvo):\n    for i, item in enumerate(lista):\n        if item == alvo:\n            return i\n    return -1\n# Padrao: Search loop\n# O que faz: retorna o indice do primeiro elemento igual ao alvo, ou -1 se nao encontrado\n',
      hints: [
        'No Trecho 1, veja: ha uma lista vazia antes do loop e append condicional dentro — isso e um padrao classico.',
        'No Trecho 3, cada if retorna False imediatamente se uma condicao falhar — funcoes que "barram" entradas ruins sao guard clauses.',
        'No Trecho 5, o return DENTRO do loop e o sinal do search: assim que achou, retorna imediatamente sem continuar.',
      ],
    },
    {
      id: 'padroes-c2',
      title: 'Complete o Padrao',
      description:
        'Complete cada funcao usando o padrao adequado. Os nomes e docstrings dizem exatamente o que cada uma deve fazer.',
      language: 'python',
      starterCode:
        'def filter_active_users(users):\n    """Retorna apenas os usuarios onde user["active"] == True"""\n    # Use o padrao Filter loop\n    pass\n\n\ndef find_max_score(scores):\n    """Retorna o maior valor da lista. Retorna None se a lista for vazia."""\n    # Use o padrao Search/Acumulador\n    pass\n\n\ndef build_report(sales_data):\n    """\n    Recebe lista de dicionarios com {"product": str, "amount": float}.\n    Retorna dicionario com:\n      - "total": soma de todos os amounts\n      - "count": quantidade de vendas\n      - "average": media dos amounts\n      - "products": lista unica de produtos vendidos\n    """\n    # Use o padrao Builder\n    pass\n',
      solution:
        'def filter_active_users(users):\n    """Retorna apenas os usuarios onde user["active"] == True"""\n    result = []\n    for user in users:\n        if user["active"]:\n            result.append(user)\n    return result\n\n\ndef find_max_score(scores):\n    """Retorna o maior valor da lista. Retorna None se a lista for vazia."""\n    if not scores:\n        return None\n    maximo = scores[0]\n    for s in scores[1:]:\n        if s > maximo:\n            maximo = s\n    return maximo\n\n\ndef build_report(sales_data):\n    """\n    Recebe lista de dicionarios com {"product": str, "amount": float}.\n    Retorna dicionario com total, count, average e products.\n    """\n    if not sales_data:\n        return {"total": 0, "count": 0, "average": 0, "products": []}\n\n    report = {}\n    report["total"] = sum(s["amount"] for s in sales_data)\n    report["count"] = len(sales_data)\n    report["average"] = report["total"] / report["count"]\n    report["products"] = list(set(s["product"] for s in sales_data))\n    return report\n',
      hints: [
        'filter_active_users: crie uma lista vazia, percorra users, e faca append somente quando user["active"] for True.',
        'find_max_score: use uma guard clause primeiro (lista vazia retorna None), depois rastreie o maximo com uma variavel.',
        'build_report: crie um dicionario vazio e adicione cada chave separadamente — total com sum(), count com len(), average calculado, products com set() para remover duplicatas.',
      ],
    },
  ],
};
