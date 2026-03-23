import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'classes-e-objetos',
  moduleId: 'python',
  title: 'Classes e Objetos',
  description: 'Aprenda os fundamentos da Programacao Orientada a Objetos com classes, objetos e heranca.',
  order: 9,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: 'A **Programacao Orientada a Objetos (POO)** e uma forma de organizar seu codigo criando "moldes" chamados **classes** e "copias" chamadas **objetos**.\n\nPense assim: uma **classe** e como a planta de uma casa — ela define como a casa sera. Um **objeto** e a casa construida a partir dessa planta. Voce pode construir varias casas (objetos) a partir da mesma planta (classe), cada uma com suas proprias caracteristicas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'classe_basica.py',
        code: `# Definindo uma classe
class Cachorro:
    # O metodo __init__ e o construtor (inicializador)
    # Ele e chamado automaticamente ao criar um objeto
    def __init__(self, nome, raca, idade):
        self.nome = nome      # atributo
        self.raca = raca      # atributo
        self.idade = idade     # atributo

    # Metodo (funcao dentro da classe)
    def latir(self):
        print(f"{self.nome} diz: Au au!")

    def info(self):
        print(f"{self.nome} - {self.raca}, {self.idade} anos")

# Criando objetos (instancias da classe)
rex = Cachorro("Rex", "Pastor Alemao", 5)
luna = Cachorro("Luna", "Labrador", 3)

# Usando metodos e atributos
rex.latir()        # Rex diz: Au au!
luna.info()        # Luna - Labrador, 3 anos
print(rex.nome)    # Rex`,
        description: 'Uma classe define atributos (dados) e metodos (acoes). O self referencia o proprio objeto.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'O **self** e uma referencia ao proprio objeto. Quando escrevemos self.nome = nome, estamos dizendo: "o atributo nome DESTE objeto recebe o valor passado". Todo metodo de uma classe recebe self como primeiro parametro.',
    },
    {
      type: 'text',
      content: '## Metodos Especiais\n\nPython reserva nomes de metodos entre duplos underscores (`__nome__`) para comportamentos especiais, chamados de **metodos magicos** ou **dunder methods**.\n\n- **`__str__(self)`** — Define o texto exibido ao usar `print()` ou `str()` no objeto. Sem ele, `print(objeto)` mostra algo como `<Produto object at 0x...>`\n- **`__init__(self, ...)`** — O construtor, chamado automaticamente ao criar um objeto\n\nAlm disso, metodos comuns podem **modificar atributos** do proprio objeto usando `self.atributo = novo_valor`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'metodos_especiais.py',
        code: `class Produto:
    def __init__(self, nome, preco, quantidade):
        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade

    # Metodo __str__ define como o objeto aparece ao usar print()
    def __str__(self):
        return f"{self.nome} - R$ {self.preco:.2f} ({self.quantidade} em estoque)"

    def valor_total(self):
        return self.preco * self.quantidade

    def aplicar_desconto(self, percentual):
        desconto = self.preco * (percentual / 100)
        self.preco -= desconto
        print(f"Desconto de {percentual}% aplicado! Novo preco: R$ {self.preco:.2f}")

# Usando a classe
notebook = Produto("Notebook", 3500.00, 10)
print(notebook)                    # Notebook - R$ 3500.00 (10 em estoque)
print(f"Valor total: R$ {notebook.valor_total():.2f}")

notebook.aplicar_desconto(15)      # Desconto de 15% aplicado!
print(notebook)                    # Notebook - R$ 2975.00 (10 em estoque)`,
        description: 'O metodo __str__ personaliza como o objeto e exibido. Metodos podem modificar atributos.',
      },
    },
    {
      type: 'text',
      content: 'Veja um exemplo mais completo que combina validacoes, multiplos metodos e um historico interno para mostrar como classes organizam dados e comportamentos de forma coesa:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'classe_conta_bancaria.py',
        code: `class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo
        self.extrato = []

    def depositar(self, valor):
        if valor <= 0:
            print("Valor invalido para deposito!")
            return
        self.saldo += valor
        self.extrato.append(f"Deposito: +R$ {valor:.2f}")
        print(f"Deposito de R$ {valor:.2f} realizado!")

    def sacar(self, valor):
        if valor <= 0:
            print("Valor invalido para saque!")
            return
        if valor > self.saldo:
            print("Saldo insuficiente!")
            return
        self.saldo -= valor
        self.extrato.append(f"Saque: -R$ {valor:.2f}")
        print(f"Saque de R$ {valor:.2f} realizado!")

    def ver_extrato(self):
        print(f"--- Extrato de {self.titular} ---")
        for operacao in self.extrato:
            print(operacao)
        print(f"Saldo atual: R$ {self.saldo:.2f}")

conta = ContaBancaria("Ana", 1000)
conta.depositar(500)
conta.sacar(200)
conta.sacar(2000)    # Saldo insuficiente!
conta.ver_extrato()`,
        description: 'Classes permitem encapsular dados e logica, criando objetos que gerenciam seu proprio estado.',
      },
    },
    {
      type: 'text',
      content: '## Heranca\n\nA **heranca** permite criar uma classe nova baseada em uma classe existente. A classe filha **herda** todos os atributos e metodos da classe pai, e pode adicionar novos ou modificar os existentes.\n\nIsso evita repeticao de codigo e cria hierarquias logicas, como: Animal -> Cachorro, Veiculo -> Carro.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'heranca.py',
        code: `# Classe pai (base)
class Animal:
    def __init__(self, nome, especie):
        self.nome = nome
        self.especie = especie

    def __str__(self):
        return f"{self.nome} ({self.especie})"

    def fazer_som(self):
        print(f"{self.nome} faz um som...")

# Classe filha - herda de Animal
class Cachorro(Animal):
    def __init__(self, nome, raca):
        super().__init__(nome, "Canino")  # Chama o __init__ do pai
        self.raca = raca

    def fazer_som(self):  # Sobrescrevendo o metodo do pai
        print(f"{self.nome} diz: Au au!")

    def buscar(self):
        print(f"{self.nome} foi buscar a bolinha!")

class Gato(Animal):
    def __init__(self, nome, cor):
        super().__init__(nome, "Felino")
        self.cor = cor

    def fazer_som(self):
        print(f"{self.nome} diz: Miau!")

# Usando heranca
rex = Cachorro("Rex", "Labrador")
mimi = Gato("Mimi", "branco")

print(rex)             # Rex (Canino)
rex.fazer_som()        # Rex diz: Au au!
rex.buscar()           # Rex foi buscar a bolinha!

print(mimi)            # Mimi (Felino)
mimi.fazer_som()       # Mimi diz: Miau!`,
        description: 'Com heranca, classes filhas reutilizam codigo da classe pai e podem personalizar comportamentos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Use **super().__init__()** para chamar o construtor da classe pai. Assim, voce nao precisa repetir a inicializacao dos atributos que a classe pai ja define.',
    },
  ],
  challenges: [
    {
      id: 'class-c1',
      title: 'Classe Animal',
      description: 'Crie uma classe Animal com atributos nome, tipo e som. Adicione um metodo apresentar() que imprima uma frase como "Eu sou Rex, um cachorro, e faco Au au!". Crie pelo menos 3 animais diferentes e chame o metodo apresentar() para cada um.',
      language: 'python',
      starterCode: `# Crie a classe Animal com:
# - __init__ recebendo nome, tipo e som
# - metodo apresentar() que imprime os dados do animal

# Crie pelo menos 3 animais e chame apresentar()
`,
      solution: `class Animal:
    def __init__(self, nome, tipo, som):
        self.nome = nome
        self.tipo = tipo
        self.som = som

    def apresentar(self):
        print(f"Eu sou {self.nome}, um {self.tipo}, e faco {self.som}!")

cachorro = Animal("Rex", "cachorro", "Au au")
gato = Animal("Mimi", "gato", "Miau")
vaca = Animal("Mimosa", "vaca", "Muuu")

cachorro.apresentar()
gato.apresentar()
vaca.apresentar()`,
      hints: [
        'Defina a classe com class Animal: e o __init__ com self, nome, tipo e som',
        'No __init__, use self.nome = nome para guardar cada atributo',
        'No metodo apresentar, use f-string com self.nome, self.tipo e self.som',
      ],
    },
    {
      id: 'class-c2',
      title: 'Conta Bancaria com Transferencia',
      description: 'Crie uma classe ContaBancaria com atributos titular e saldo. Implemente os metodos: depositar(valor), sacar(valor) com validacao de saldo, e transferir(valor, outra_conta) que saca de uma conta e deposita na outra. Crie duas contas e faca uma transferencia entre elas.',
      language: 'python',
      starterCode: `class ContaBancaria:
    def __init__(self, titular, saldo=0):
        pass  # Inicialize os atributos

    def depositar(self, valor):
        pass  # Adicione ao saldo

    def sacar(self, valor):
        pass  # Verifique o saldo antes de sacar

    def transferir(self, valor, outra_conta):
        pass  # Saque desta conta e deposite na outra

    def __str__(self):
        pass  # Retorne uma string com titular e saldo

# Crie duas contas e faca uma transferencia
`,
      solution: `class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, valor):
        if valor > 0:
            self.saldo += valor
            print(f"Deposito de R$ {valor:.2f} na conta de {self.titular}")
        else:
            print("Valor invalido!")

    def sacar(self, valor):
        if valor > self.saldo:
            print("Saldo insuficiente!")
            return False
        if valor <= 0:
            print("Valor invalido!")
            return False
        self.saldo -= valor
        print(f"Saque de R$ {valor:.2f} da conta de {self.titular}")
        return True

    def transferir(self, valor, outra_conta):
        print(f"Transferencia de R$ {valor:.2f}: {self.titular} -> {outra_conta.titular}")
        if self.sacar(valor):
            outra_conta.depositar(valor)
            print("Transferencia realizada com sucesso!")
        else:
            print("Transferencia falhou!")

    def __str__(self):
        return f"{self.titular}: R$ {self.saldo:.2f}"

conta_ana = ContaBancaria("Ana", 1000)
conta_bruno = ContaBancaria("Bruno", 500)

print(conta_ana)
print(conta_bruno)

conta_ana.transferir(300, conta_bruno)

print(conta_ana)
print(conta_bruno)`,
      hints: [
        'No metodo sacar, retorne True ou False para indicar se o saque foi bem-sucedido',
        'No metodo transferir, use self.sacar() e outra_conta.depositar()',
        'Lembre-se de validar o saldo antes de fazer o saque na transferencia',
      ],
    },
    {
      id: 'class-c3',
      title: 'Alunos com Heranca',
      description: 'Crie uma classe base Pessoa com nome e idade. Depois, crie uma classe Aluno que herda de Pessoa e adiciona o atributo notas (lista) e os metodos: adicionar_nota(nota), calcular_media() e situacao() que retorna "Aprovado" se media >= 7 ou "Reprovado" caso contrario. Teste com 2 alunos.',
      language: 'python',
      starterCode: `# Classe base Pessoa
class Pessoa:
    pass  # Defina __init__ e __str__

# Classe Aluno que herda de Pessoa
class Aluno(Pessoa):
    pass  # Use super().__init__(), adicione notas
    # Metodos: adicionar_nota, calcular_media, situacao

# Crie 2 alunos, adicione notas e verifique a situacao
`,
      solution: `class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __str__(self):
        return f"{self.nome}, {self.idade} anos"

class Aluno(Pessoa):
    def __init__(self, nome, idade):
        super().__init__(nome, idade)
        self.notas = []

    def adicionar_nota(self, nota):
        if 0 <= nota <= 10:
            self.notas.append(nota)
        else:
            print("Nota deve estar entre 0 e 10!")

    def calcular_media(self):
        if not self.notas:
            return 0
        return sum(self.notas) / len(self.notas)

    def situacao(self):
        media = self.calcular_media()
        if media >= 7:
            return "Aprovado"
        return "Reprovado"

    def __str__(self):
        media = self.calcular_media()
        return f"{self.nome}, {self.idade} anos - Media: {media:.1f} ({self.situacao()})"

aluno1 = Aluno("Ana", 20)
aluno1.adicionar_nota(8.0)
aluno1.adicionar_nota(7.5)
aluno1.adicionar_nota(9.0)

aluno2 = Aluno("Bruno", 22)
aluno2.adicionar_nota(5.0)
aluno2.adicionar_nota(6.5)
aluno2.adicionar_nota(4.0)

print(aluno1)
print(aluno2)`,
      hints: [
        'Na classe Aluno, use super().__init__(nome, idade) para inicializar nome e idade',
        'Inicialize self.notas = [] no __init__ do Aluno',
        'Em calcular_media, verifique se a lista nao esta vazia antes de dividir',
      ],
    },
  ],
};
