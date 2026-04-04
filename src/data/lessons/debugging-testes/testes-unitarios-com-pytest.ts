import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'testes-unitarios-com-pytest',
  moduleId: 'debugging-testes',
  title: 'Testes Unitarios com pytest',
  description: 'Aprenda a usar o pytest, o framework de testes mais popular do Python, para escrever e organizar seus testes de forma profissional',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        '## pytest: O Framework de Testes do Python\n\n`pytest` e o framework de testes mais usado no ecossistema Python. Ele e simples de aprender mas poderoso o suficiente para projetos grandes.\n\n### Instalando e configurando\n\n```bash\npip install pytest\n```\n\n### Regras do pytest\n\nO pytest descobre seus testes automaticamente se voce seguir as convencoes:\n\n- Arquivos de teste: nome comeca ou termina com `test_` ou `_test` (ex: `test_calculadora.py`)\n- Funcoes de teste: nome comeca com `test_` (ex: `test_calcular_media`)\n- Classes de teste: nome comeca com `Test` (ex: `TestCalculadora`)\n\n```bash\npytest              # roda todos os testes\npytest test_calc.py # roda um arquivo especifico\npytest -v           # modo verbose (mostra o nome de cada teste)\npytest -k "media"   # roda apenas testes com "media" no nome\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# calculadora.py — codigo que vamos testar\ndef somar(a, b):\n    return a + b\n\ndef dividir(a, b):\n    if b == 0:\n        raise ZeroDivisionError("Nao e possivel dividir por zero")\n    return a / b\n\ndef calcular_media(numeros):\n    if not numeros:\n        raise ValueError("Lista nao pode ser vazia")\n    return sum(numeros) / len(numeros)\n\n\n# test_calculadora.py — arquivo de testes\nimport pytest\nfrom calculadora import somar, dividir, calcular_media\n\n# Testes simples com assert\ndef test_somar_positivos():\n    assert somar(2, 3) == 5\n\ndef test_somar_negativos():\n    assert somar(-1, -1) == -2\n\ndef test_somar_zero():\n    assert somar(0, 5) == 5\n\n# Testando excecoes com pytest.raises\ndef test_dividir_por_zero_gera_excecao():\n    with pytest.raises(ZeroDivisionError):\n        dividir(10, 0)\n\ndef test_dividir_por_zero_mensagem_correta():\n    with pytest.raises(ZeroDivisionError, match="Nao e possivel"):\n        dividir(10, 0)\n\n# Testando casos de erro\ndef test_media_lista_vazia_gera_excecao():\n    with pytest.raises(ValueError):\n        calcular_media([])\n\ndef test_media_calculo_correto():\n    assert calcular_media([10, 20, 30]) == 20.0\n\n# Saida ao executar pytest -v:\n# test_calculadora.py::test_somar_positivos PASSED\n# test_calculadora.py::test_somar_negativos PASSED\n# test_calculadora.py::test_somar_zero PASSED\n# test_calculadora.py::test_dividir_por_zero_gera_excecao PASSED\n# ... etc\n# 7 passed in 0.05s',
        filename: 'test_calculadora.py',
        description:
          'Estrutura basica do pytest: funcoes que comecem com test_, assert simples para verificar resultados, e pytest.raises() para verificar excecoes. O pytest descobre e executa todos automaticamente.',
      },
    },
    {
      type: 'text',
      content:
        '## Fixtures: Compartilhando Estado Entre Testes\n\nFixtures sao funcoes que preparam dados ou recursos para os testes. Isso evita duplicacao e garante que cada teste parte de um estado limpo.\n\n```python\n@pytest.fixture\ndef lista_de_produtos():\n    """Retorna uma lista padrao de produtos para os testes."""\n    return [\n        {"nome": "Notebook", "preco": 3500.0, "estoque": 10},\n        {"nome": "Mouse", "preco": 150.0, "estoque": 50},\n        {"nome": "Teclado", "preco": 200.0, "estoque": 30},\n    ]\n\n# Use a fixture como parametro na funcao de teste\ndef test_total_de_produtos(lista_de_produtos):\n    assert len(lista_de_produtos) == 3\n\ndef test_produto_mais_caro(lista_de_produtos):\n    mais_caro = max(lista_de_produtos, key=lambda p: p["preco"])\n    assert mais_caro["nome"] == "Notebook"\n```\n\n## Parametrize: Testando Multiplas Entradas\n\n```python\n@pytest.mark.parametrize("entrada,esperado", [\n    ([1, 2, 3], 2.0),\n    ([10, 20], 15.0),\n    ([5], 5.0),\n    ([0, 0, 0], 0.0),\n])\ndef test_calcular_media_parametrizado(entrada, esperado):\n    assert calcular_media(entrada) == esperado\n# Gera 4 testes separados, um para cada par (entrada, esperado)\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra dos testes bons: cada teste deve verificar UMA coisa, ter nome descritivo que explica o que esta sendo testado, e ser independente (nao depender de outros testes ou de ordem de execucao).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo completo com fixtures e parametrize\nimport pytest\n\n# Codigo sendo testado\nclass ContaBancaria:\n    def __init__(self, saldo_inicial=0):\n        self.saldo = saldo_inicial\n    \n    def depositar(self, valor):\n        if valor <= 0:\n            raise ValueError("Valor do deposito deve ser positivo")\n        self.saldo += valor\n    \n    def sacar(self, valor):\n        if valor <= 0:\n            raise ValueError("Valor do saque deve ser positivo")\n        if valor > self.saldo:\n            raise ValueError("Saldo insuficiente")\n        self.saldo -= valor\n\n# Arquivo de testes\n@pytest.fixture\ndef conta_vazia():\n    return ContaBancaria()\n\n@pytest.fixture\ndef conta_com_saldo():\n    return ContaBancaria(saldo_inicial=1000)\n\ndef test_saldo_inicial_zero(conta_vazia):\n    assert conta_vazia.saldo == 0\n\ndef test_deposito_aumenta_saldo(conta_vazia):\n    conta_vazia.depositar(500)\n    assert conta_vazia.saldo == 500\n\ndef test_saque_diminui_saldo(conta_com_saldo):\n    conta_com_saldo.sacar(300)\n    assert conta_com_saldo.saldo == 700\n\ndef test_saque_acima_do_saldo_gera_erro(conta_com_saldo):\n    with pytest.raises(ValueError, match="Saldo insuficiente"):\n        conta_com_saldo.sacar(2000)\n\n@pytest.mark.parametrize("valor_invalido", [-100, 0, -1])\ndef test_deposito_invalido_gera_erro(conta_vazia, valor_invalido):\n    with pytest.raises(ValueError):\n        conta_vazia.depositar(valor_invalido)',
        filename: 'test_conta_bancaria.py',
        description:
          'Fixtures fornecem estado inicial para os testes sem repeticao. Cada fixture e recriada para cada teste que a usa, garantindo isolamento. O parametrize testa multiplos valores invalidos com um unico teste.',
      },
    },
  ],
  challenges: [
    {
      id: 'pytest-c1',
      title: 'Escreva Testes com pytest',
      description:
        'A classe GerenciadorDeEstoque abaixo esta implementada. Escreva pelo menos 6 testes usando pytest, cobrindo: adicionar produto, remover estoque, erros esperados, e pelo menos uma fixture.',
      language: 'python',
      starterCode:
        '# Instale: pip install pytest\n# Execute: pytest test_estoque.py -v\n\n# Codigo a ser testado\nclass GerenciadorDeEstoque:\n    def __init__(self):\n        self.produtos = {}\n    \n    def adicionar_produto(self, nome, quantidade):\n        if quantidade < 0:\n            raise ValueError("Quantidade nao pode ser negativa")\n        if nome in self.produtos:\n            self.produtos[nome] += quantidade\n        else:\n            self.produtos[nome] = quantidade\n    \n    def remover_estoque(self, nome, quantidade):\n        if nome not in self.produtos:\n            raise KeyError(f"Produto nao encontrado: {nome}")\n        if quantidade > self.produtos[nome]:\n            raise ValueError("Estoque insuficiente")\n        self.produtos[nome] -= quantidade\n    \n    def consultar_estoque(self, nome):\n        return self.produtos.get(nome, 0)\n\n# Escreva seus testes aqui\nimport pytest\n\n# TODO: Crie uma fixture que retorna um GerenciadorDeEstoque com produtos ja adicionados\n\n# TODO: Escreva pelo menos 6 testes\n',
      solution:
        'import pytest\n\nclass GerenciadorDeEstoque:\n    def __init__(self):\n        self.produtos = {}\n    \n    def adicionar_produto(self, nome, quantidade):\n        if quantidade < 0:\n            raise ValueError("Quantidade nao pode ser negativa")\n        if nome in self.produtos:\n            self.produtos[nome] += quantidade\n        else:\n            self.produtos[nome] = quantidade\n    \n    def remover_estoque(self, nome, quantidade):\n        if nome not in self.produtos:\n            raise KeyError(f"Produto nao encontrado: {nome}")\n        if quantidade > self.produtos[nome]:\n            raise ValueError("Estoque insuficiente")\n        self.produtos[nome] -= quantidade\n    \n    def consultar_estoque(self, nome):\n        return self.produtos.get(nome, 0)\n\n@pytest.fixture\ndef estoque_com_produtos():\n    estoque = GerenciadorDeEstoque()\n    estoque.adicionar_produto("Notebook", 10)\n    estoque.adicionar_produto("Mouse", 50)\n    estoque.adicionar_produto("Teclado", 30)\n    return estoque\n\ndef test_estoque_inicial_vazio():\n    estoque = GerenciadorDeEstoque()\n    assert estoque.consultar_estoque("Qualquer") == 0\n\ndef test_adicionar_produto_novo(estoque_com_produtos):\n    assert estoque_com_produtos.consultar_estoque("Notebook") == 10\n\ndef test_adicionar_mesmo_produto_acumula(estoque_com_produtos):\n    estoque_com_produtos.adicionar_produto("Mouse", 20)\n    assert estoque_com_produtos.consultar_estoque("Mouse") == 70\n\ndef test_remover_estoque_diminui_quantidade(estoque_com_produtos):\n    estoque_com_produtos.remover_estoque("Notebook", 3)\n    assert estoque_com_produtos.consultar_estoque("Notebook") == 7\n\ndef test_remover_produto_inexistente_gera_erro(estoque_com_produtos):\n    with pytest.raises(KeyError):\n        estoque_com_produtos.remover_estoque("Monitor", 1)\n\ndef test_remover_acima_do_estoque_gera_erro(estoque_com_produtos):\n    with pytest.raises(ValueError, match="insuficiente"):\n        estoque_com_produtos.remover_estoque("Mouse", 100)\n\ndef test_adicionar_quantidade_negativa_gera_erro():\n    estoque = GerenciadorDeEstoque()\n    with pytest.raises(ValueError):\n        estoque.adicionar_produto("Produto", -5)\n',
      hints: [
        'Crie a fixture com @pytest.fixture antes das funcoes de teste. Ela deve criar um GerenciadorDeEstoque e adicionar alguns produtos',
        'Para testar erros: with pytest.raises(TipoDoErro): / codigo_que_deve_dar_erro()',
        'Teste o comportamento de acumular: adicione o mesmo produto duas vezes e verifique que o estoque somou',
      ],
    },
  ],
};
