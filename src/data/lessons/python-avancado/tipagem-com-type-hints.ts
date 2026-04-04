import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'tipagem-com-type-hints',
  moduleId: 'python-avancado',
  title: 'Tipagem com Type Hints',
  description: 'Use anotacoes de tipo para documentar, prevenir bugs e habilitar tooling avancado em Python',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## Type Hints no Python\n\nPython e dinamicamente tipado, mas desde a versao 3.5 suporta anotacoes de tipo. Elas nao afetam a execucao — sao verificadas por ferramentas como `mypy` e usadas pelos IDEs para autocomplete e deteccao de erros.\n\n```python\ndef somar(a: int, b: int) -> int:\n    return a + b\n\ndef saudacao(nome: str) -> str:\n    return f"Ola, {nome}!"\n```\n\n### Por que usar?\n\n- **Documentacao viva**: os tipos explicam o que a funcao espera e retorna\n- **Deteccao antecipada de bugs**: mypy encontra erros antes de rodar\n- **Autocomplete melhor**: IDE sabe o tipo e sugere metodos corretos\n- **Refatoracao segura**: mudancas propagam erros de tipo visiveis',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from __future__ import annotations  # permite anotacoes forward reference\nfrom typing import Optional, Union, Any\nfrom collections.abc import Callable, Sequence\n\n# Tipos basicos\ndef processar(nome: str, idade: int, ativo: bool = True) -> str:\n    return f"{nome} ({idade}) — ativo: {ativo}"\n\n# Tipos compostos\ndef somar_lista(numeros: list[int]) -> int:\n    return sum(numeros)\n\ndef buscar_usuario(usuarios: dict[str, int], nome: str) -> int | None:\n    return usuarios.get(nome)\n\n# Tuplas tipadas\ndef coordenadas() -> tuple[float, float]:\n    return (3.14, 2.71)\n\n# Optional (shorthand para X | None)\ndef encontrar(lista: list[str], item: str) -> Optional[str]:\n    return item if item in lista else None\n\n# Union: aceita multiplos tipos\ndef formatar(valor: Union[int, float, str]) -> str:\n    return str(valor)\n\n# Callable: funcoes como argumentos\ndef aplicar(func: Callable[[int], int], valor: int) -> int:\n    return func(valor)\n\nresultado = aplicar(lambda x: x * 2, 5)  # 10\n\n# TypeVar para generics\nfrom typing import TypeVar\nT = TypeVar("T")\n\ndef primeiro(lista: list[T]) -> T | None:\n    return lista[0] if lista else None\n\nprimo_int = primeiro([1, 2, 3])     # tipo inferido: int | None\nprimo_str = primeiro(["a", "b"])    # tipo inferido: str | None\n\n# dataclass com tipos\nfrom dataclasses import dataclass\n\n@dataclass\nclass Usuario:\n    nome: str\n    email: str\n    idade: int\n    admin: bool = False\n\nu = Usuario("Ana", "ana@exemplo.com", 30)\nprint(u.nome)  # IDE sabe que e str',
        filename: 'type_hints.py',
        description: 'Type hints para tipos basicos, compostos (list, dict, tuple), Optional/Union, Callable, TypeVar para generics, e dataclass com tipos. Python 3.10+ usa X | Y em vez de Union[X, Y].',
      },
    },
    {
      type: 'text',
      content: '## TypedDict e Protocol\n\nPara dicionarios com estrutura conhecida e interfaces sem heranca:\n\n```python\nfrom typing import TypedDict, Protocol\n\n# TypedDict: dicionario com chaves e tipos fixos\nclass UsuarioDict(TypedDict):\n    nome: str\n    email: str\n    idade: int\n\ndef salvar_usuario(u: UsuarioDict) -> None:\n    print(f"Salvando {u["nome"]}")\n\nusuario: UsuarioDict = {"nome": "Ana", "email": "ana@ex.com", "idade": 30}\nsalvar_usuario(usuario)  # OK\n\n# Protocol: duck typing com verificacao de tipo\n# Qualquer objeto com metodo .fechar() satisfaz o protocolo\nclass Fechavel(Protocol):\n    def fechar(self) -> None: ...\n\ndef encerrar(recurso: Fechavel) -> None:\n    recurso.fechar()\n```\n\n## Verificando com mypy\n\n```bash\npip install mypy\nmypy meu_arquivo.py\n```\n\nMypy reporta erros como:\n```\nerror: Argument 1 to "somar" has incompatible type "str"; expected "int"\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Nao precisa tipar tudo de uma vez. Comece pelas funcoes publicas e interfaces principais. Mypy tem modo --strict para maxima cobertura, mas o padrao ja pega os erros mais comuns. Em projetos novos, use from __future__ import annotations para habilitar syntax moderna em Python 3.8+.',
    },
  ],
  challenges: [
    {
      id: 'tipos-c1',
      title: 'Anote o Modulo de Inventario',
      description: 'Adicione type hints completos ao modulo de inventario abaixo. Inclua tipos em todos os parametros, retornos e variaveis de instancia. Use dataclass para Produto. Verifique com mypy (ou analise visualmente os tipos).',
      language: 'python',
      starterCode: 'from dataclasses import dataclass, field\nfrom typing import Optional\n\n# TODO: adicione tipos a todos os campos\n@dataclass\nclass Produto:\n    nome = ""\n    preco = 0.0\n    estoque = 0\n    categoria = ""\n\nclass Inventario:\n    def __init__(self):\n        self.produtos = {}  # TODO: tipo dict[str, Produto]\n    \n    def adicionar(self, produto):  # TODO: tipo -> None\n        self.produtos[produto.nome] = produto\n    \n    def buscar(self, nome):  # TODO: retorno Produto ou None\n        return self.produtos.get(nome)\n    \n    def listar_por_categoria(self, categoria):  # TODO: retorno list[Produto]\n        return [p for p in self.produtos.values() if p.categoria == categoria]\n    \n    def total_em_estoque(self):  # TODO: retorno int\n        return sum(p.estoque for p in self.produtos.values())\n    \n    def aplicar_desconto(self, categoria, percentual):  # TODO: tipos\n        # aplica desconto percentual a todos os produtos da categoria\n        for produto in self.produtos.values():\n            if produto.categoria == categoria:\n                produto.preco *= (1 - percentual / 100)\n\n# Teste\ninv = Inventario()\ninv.adicionar(Produto(nome="Notebook", preco=2500.0, estoque=5, categoria="tech"))\nprint(inv.total_em_estoque())\n',
      solution: 'from dataclasses import dataclass, field\nfrom typing import Optional\n\n@dataclass\nclass Produto:\n    nome: str\n    preco: float\n    estoque: int\n    categoria: str\n\nclass Inventario:\n    def __init__(self) -> None:\n        self.produtos: dict[str, Produto] = {}\n    \n    def adicionar(self, produto: Produto) -> None:\n        self.produtos[produto.nome] = produto\n    \n    def buscar(self, nome: str) -> Optional[Produto]:\n        return self.produtos.get(nome)\n    \n    def listar_por_categoria(self, categoria: str) -> list[Produto]:\n        return [p for p in self.produtos.values() if p.categoria == categoria]\n    \n    def total_em_estoque(self) -> int:\n        return sum(p.estoque for p in self.produtos.values())\n    \n    def aplicar_desconto(self, categoria: str, percentual: float) -> None:\n        for produto in self.produtos.values():\n            if produto.categoria == categoria:\n                produto.preco *= (1 - percentual / 100)\n\ninv = Inventario()\ninv.adicionar(Produto(nome="Notebook", preco=2500.0, estoque=5, categoria="tech"))\ninv.adicionar(Produto(nome="Mouse", preco=80.0, estoque=20, categoria="tech"))\nprint(inv.total_em_estoque())  # 25\nprint(inv.listar_por_categoria("tech"))  # [Produto(...), Produto(...)]\n',
      hints: [
        '@dataclass com tipos: cada campo tem nome: tipo = valor_padrao',
        'dict[str, Produto] para o dicionario de produtos',
        'Optional[Produto] e equivalente a Produto | None — use para buscar() que pode retornar None',
        'Metodos sem retorno usam -> None',
      ],
    },
  ],
};
