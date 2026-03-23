export interface CheatsheetItem {
  code: string;
  description: string;
}

export interface CheatsheetExample {
  code: string;     // code block shown with syntax color
  output?: string;  // result shown below (lighter color)
  note?: string;    // small description below output
}

export interface CheatsheetEntry {
  category: string;
  example?: CheatsheetExample;   // block-style card
  items?: CheatsheetItem[];      // table-style card (kept for compat)
}

export interface Cheatsheet {
  moduleId: string;
  title: string;
  entries: CheatsheetEntry[];
}

const cheatsheets: Cheatsheet[] = [
  /* ───────────────────────────── PYTHON ───────────────────────────── */
  {
    moduleId: 'python',
    title: 'Sintaxe Python',
    entries: [
      {
        category: 'Hello World',
        example: {
          code: `print("Olá, Mundo!")
print("Python", 3.12, "🐍")`,
          output: `Olá, Mundo!
Python 3.12 🐍`,
        },
      },
      {
        category: 'Variáveis e Tipos',
        example: {
          code: `nome = "Raphael"   # str
idade = 20         # int
altura = 1.75      # float
ativo = True       # bool

print(type(nome))
print(f"{nome} tem {idade} anos")`,
          output: `<class 'str'>
Raphael tem 20 anos`,
        },
      },
      {
        category: 'Entrada do Usuário',
        example: {
          code: `nome = input("Seu nome: ")
ano = int(input("Ano de nascimento: "))
idade = 2025 - ano
print(f"Olá, {nome}! Você tem {idade} anos.")`,
          output: `Seu nome: Raphael
Ano de nascimento: 2005
Olá, Raphael! Você tem 20 anos.`,
        },
      },
      {
        category: 'Condicionais',
        example: {
          code: `nota = 7.5

if nota >= 7:
    print("Aprovado ✅")
elif nota >= 5:
    print("Recuperação ⚠️")
else:
    print("Reprovado ❌")`,
          output: `Aprovado ✅`,
        },
      },
      {
        category: 'Loop for',
        example: {
          code: `frutas = ["maçã", "uva", "manga"]

for fruta in frutas:
    print(f"🍎 {fruta}")

# range
for i in range(1, 4):
    print(i, end=" ")`,
          output: `🍎 maçã
🍎 uva
🍎 manga
1 2 3`,
        },
      },
      {
        category: 'Loop while',
        example: {
          code: `contador = 1

while contador <= 5:
    print(contador, end=" ")
    contador += 1

print("\\nFim!")`,
          output: `1 2 3 4 5
Fim!`,
        },
      },
      {
        category: 'Funções',
        example: {
          code: `def saudacao(nome, formal=False):
    if formal:
        return f"Bom dia, {nome}."
    return f"Oi, {nome}!"

print(saudacao("Ana"))
print(saudacao("Dr. Lima", formal=True))`,
          output: `Oi, Ana!
Bom dia, Dr. Lima.`,
        },
      },
      {
        category: 'Listas',
        example: {
          code: `nums = [3, 1, 4, 1, 5, 9]
nums.append(2)
nums.sort()
print(nums)
print("Min:", min(nums), "| Max:", max(nums))
print("Índice 0:", nums[0], "| Último:", nums[-1])`,
          output: `[1, 1, 2, 3, 4, 5, 9]
Min: 1 | Max: 9
Índice 0: 1 | Último: 9`,
        },
      },
      {
        category: 'Dicionários',
        example: {
          code: `pessoa = {"nome": "Raph", "idade": 20}
pessoa["cidade"] = "SP"

print(pessoa["nome"])
print(pessoa.get("profissao", "N/A"))
print(list(pessoa.keys()))`,
          output: `Raph
N/A
['nome', 'idade', 'cidade']`,
        },
      },
      {
        category: 'String — Métodos',
        example: {
          code: `txt = "  olá, mundo!  "
print(txt.strip())
print(txt.strip().upper())
print("a,b,c".split(","))
print("-".join(["x", "y", "z"]))
print("mundo".replace("mundo", "Python"))`,
          output: `olá, mundo!
OLÁ, MUNDO!
['a', 'b', 'c']
x-y-z
Python`,
        },
      },
      {
        category: 'List Comprehension',
        example: {
          code: `quadrados = [x**2 for x in range(1, 6)]
print(quadrados)

pares = [x for x in range(10) if x % 2 == 0]
print(pares)`,
          output: `[1, 4, 9, 16, 25]
[0, 2, 4, 6, 8]`,
        },
      },
      {
        category: 'Try / Except',
        example: {
          code: `try:
    valor = int(input("Digite um número: "))
    print(10 / valor)
except ValueError:
    print("Não é um número!")
except ZeroDivisionError:
    print("Não pode dividir por zero!")
finally:
    print("Fim.")`,
          output: `Digite um número: 0
Não pode dividir por zero!
Fim.`,
        },
      },
    ],
  },

  /* ───────────────────────────── JAVASCRIPT ───────────────────────────── */
  {
    moduleId: 'frontend',
    title: 'JavaScript',
    entries: [
      {
        category: 'Variáveis',
        example: {
          code: `let nome = "Raphael";      // pode reatribuir
const PI = 3.14;           // constante
var legado = "evite usar"; // escopo de função

console.log(nome, PI);`,
          output: `Raphael 3.14`,
        },
      },
      {
        category: 'Tipos e Coerção',
        example: {
          code: `console.log(typeof "texto");   // string
console.log(typeof 42);        // number
console.log(typeof true);      // boolean
console.log(typeof null);      // object (bug histórico)
console.log(Number("3.14"));   // 3.14
console.log(String(100));      // "100"`,
          output: `string
number
boolean
object
3.14
100`,
        },
      },
      {
        category: 'Arrow Functions',
        example: {
          code: `const somar = (a, b) => a + b;
const dobrar = n => n * 2;
const saudar = nome => {
  return \`Olá, \${nome}!\`;
};

console.log(somar(3, 4));
console.log(dobrar(5));
console.log(saudar("Ana"));`,
          output: `7
10
Olá, Ana!`,
        },
      },
      {
        category: 'Arrays',
        example: {
          code: `const nums = [1, 2, 3, 4, 5];

console.log(nums.map(x => x * 2));
console.log(nums.filter(x => x % 2 === 0));
console.log(nums.reduce((acc, x) => acc + x, 0));`,
          output: `[2, 4, 6, 8, 10]
[2, 4]
15`,
        },
      },
      {
        category: 'Objetos',
        example: {
          code: `const pessoa = {
  nome: "Raphael",
  idade: 20,
  saudar() {
    return \`Oi, sou \${this.nome}!\`;
  }
};

console.log(pessoa.nome);
console.log(pessoa.saudar());
const { nome, idade } = pessoa; // destructuring
console.log(nome, idade);`,
          output: `Raphael
Oi, sou Raphael!
Raphael 20`,
        },
      },
      {
        category: 'Promises / Async',
        example: {
          code: `async function buscarDados(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro:", err.message);
  }
}

// uso
buscarDados("/api/user").then(data => console.log(data));`,
          output: `{ id: 1, nome: "Raphael" }`,
          note: 'Async/await é açúcar sintático sobre Promises',
        },
      },
      {
        category: 'Manipulação do DOM',
        example: {
          code: `// Selecionar elementos
const titulo = document.querySelector("h1");
const itens = document.querySelectorAll("li");

// Modificar
titulo.textContent = "Novo título";
titulo.classList.add("destaque");

// Criar elemento
const p = document.createElement("p");
p.textContent = "Parágrafo novo";
document.body.appendChild(p);`,
          note: 'Executa no contexto do navegador (Browser API)',
        },
      },
      {
        category: 'Eventos',
        example: {
          code: `const btn = document.querySelector("#meu-btn");

btn.addEventListener("click", (e) => {
  console.log("Clicado!", e.target);
  e.preventDefault(); // evita comportamento padrão
});

// Evento de teclado
document.addEventListener("keydown", (e) => {
  console.log("Tecla:", e.key);
});`,
          output: `Clicado! <button id="meu-btn">
Tecla: Enter`,
        },
      },
    ],
  },

  /* ───────────────────────────── HTML & CSS ───────────────────────────── */
  {
    moduleId: 'html-css',
    title: 'HTML & CSS',
    entries: [
      {
        category: 'Estrutura HTML',
        example: {
          code: `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Olá, Mundo!</h1>
    <p>Parágrafo de texto.</p>
  </body>
</html>`,
          note: 'Esqueleto básico de toda página HTML',
        },
      },
      {
        category: 'Tags Essenciais',
        items: [
          { code: '<h1> … <h6>', description: 'Títulos (h1 = maior)' },
          { code: '<p>', description: 'Parágrafo' },
          { code: '<a href="url">', description: 'Link' },
          { code: '<img src="" alt="">', description: 'Imagem' },
          { code: '<ul> / <ol> / <li>', description: 'Listas' },
          { code: '<div> / <span>', description: 'Contêiner bloco / inline' },
          { code: '<input> / <button>', description: 'Campo / botão de formulário' },
          { code: '<header> / <main> / <footer>', description: 'Semântica de layout' },
        ],
      },
      {
        category: 'Seletores CSS',
        example: {
          code: `/* Por tag */
p { color: blue; }

/* Por classe */
.destaque { font-weight: bold; }

/* Por ID */
#titulo { font-size: 2rem; }

/* Combinado */
.card p { margin: 8px 0; }

/* Pseudo-classe */
a:hover { text-decoration: underline; }`,
          note: 'Especificidade: ID > Classe > Tag',
        },
      },
      {
        category: 'Box Model',
        example: {
          code: `.caixa {
  width: 200px;
  height: 100px;
  padding: 16px;       /* espaço interno */
  border: 2px solid #333;
  margin: 24px auto;   /* espaço externo */
  box-sizing: border-box; /* largura inclui padding */
}`,
          note: 'margin > border > padding > content',
        },
      },
      {
        category: 'Flexbox',
        example: {
          code: `.container {
  display: flex;
  flex-direction: row;        /* ou column */
  justify-content: center;    /* eixo principal */
  align-items: center;        /* eixo cruzado */
  gap: 16px;
  flex-wrap: wrap;
}

.filho {
  flex: 1;  /* cresce para preencher espaço */
}`,
          note: 'Use flex para layouts 1D (linha ou coluna)',
        },
      },
      {
        category: 'Grid',
        example: {
          code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 16px;
}

/* Item ocupando 2 colunas */
.destaque {
  grid-column: span 2;
}`,
          note: 'Use grid para layouts 2D (linhas E colunas)',
        },
      },
      {
        category: 'Responsividade',
        example: {
          code: `/* Mobile first */
.container {
  padding: 16px;
  flex-direction: column;
}

/* Tablet (≥768px) */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    padding: 32px;
  }
}

/* Desktop (≥1024px) */
@media (min-width: 1024px) {
  .container { max-width: 1200px; }
}`,
          note: 'Sempre comece pelo mobile, depois expanda',
        },
      },
    ],
  },

  /* ───────────────────────────── SQL ───────────────────────────── */
  {
    moduleId: 'sql',
    title: 'SQL',
    entries: [
      {
        category: 'SELECT Básico',
        example: {
          code: `SELECT nome, email, idade
FROM usuarios
WHERE ativo = true
ORDER BY nome ASC
LIMIT 3;`,
          output: `nome        | email            | idade
------------|------------------|------
Ana Lima    | ana@email.com    | 22
Bruno Silva | bruno@email.com  | 28
Carla Souza | carla@email.com  | 25`,
        },
      },
      {
        category: 'WHERE e Filtros',
        example: {
          code: `-- Comparação
SELECT * FROM produtos WHERE preco > 50;

-- BETWEEN
SELECT * FROM pedidos
WHERE data BETWEEN '2024-01-01' AND '2024-12-31';

-- LIKE (busca por padrão)
SELECT * FROM usuarios WHERE nome LIKE 'Ana%';

-- IN
SELECT * FROM produtos WHERE categoria IN ('eletro', 'info');`,
          note: '% = qualquer texto, _ = um caractere',
        },
      },
      {
        category: 'Agregações',
        example: {
          code: `SELECT
  departamento,
  COUNT(*)        AS total,
  AVG(salario)    AS media_sal,
  MAX(salario)    AS maior_sal
FROM funcionarios
GROUP BY departamento
HAVING COUNT(*) > 2
ORDER BY media_sal DESC;`,
          output: `departamento | total | media_sal | maior_sal
-------------|-------|-----------|----------
TI           | 5     | 8500.00   | 12000.00
RH           | 3     | 5200.00   | 6500.00`,
        },
      },
      {
        category: 'JOINs',
        example: {
          code: `-- INNER JOIN: só registros em ambas
SELECT p.nome, c.nome AS categoria
FROM produtos p
INNER JOIN categorias c ON p.categoria_id = c.id;

-- LEFT JOIN: todos da esquerda
SELECT u.nome, p.titulo
FROM usuarios u
LEFT JOIN posts p ON u.id = p.usuario_id;`,
          note: 'INNER = interseção | LEFT = tudo da esquerda + match da direita',
        },
      },
      {
        category: 'INSERT / UPDATE / DELETE',
        example: {
          code: `-- Inserir
INSERT INTO usuarios (nome, email, idade)
VALUES ('Raphael', 'raph@email.com', 20);

-- Atualizar
UPDATE usuarios
SET idade = 21
WHERE email = 'raph@email.com';

-- Deletar
DELETE FROM usuarios
WHERE id = 42;`,
          note: '⚠️ Sempre use WHERE no UPDATE e DELETE!',
        },
      },
      {
        category: 'CREATE TABLE',
        example: {
          code: `CREATE TABLE produtos (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  nome      VARCHAR(100) NOT NULL,
  preco     DECIMAL(10, 2) NOT NULL,
  estoque   INT DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
          note: 'AUTO_INCREMENT gera IDs automáticos',
        },
      },
    ],
  },

  /* ───────────────────────────── GIT ───────────────────────────── */
  {
    moduleId: 'git',
    title: 'Git',
    entries: [
      {
        category: 'Configuração Inicial',
        example: {
          code: `git config --global user.name "Raphael"
git config --global user.email "raph@email.com"
git config --global core.editor "code --wait"

# Verificar
git config --list`,
          output: `user.name=Raphael
user.email=raph@email.com
core.editor=code --wait`,
        },
      },
      {
        category: 'Fluxo Básico',
        example: {
          code: `git init                    # inicializa repositório
git status                  # ver estado dos arquivos
git add index.html          # adicionar arquivo
git add .                   # adicionar tudo
git commit -m "feat: login" # salvar snapshot
git log --oneline           # ver histórico`,
          output: `a3f1c2e feat: login
b8d9e4a fix: botão de cadastro
c2f3a1b init: estrutura do projeto`,
        },
      },
      {
        category: 'Branches',
        example: {
          code: `git branch                  # listar branches
git branch feature/login    # criar branch
git switch feature/login    # mudar de branch
git switch -c hotfix/bug    # criar e mudar

git merge feature/login     # unir ao branch atual
git branch -d feature/login # deletar branch`,
          output: `* main
  feature/login
  hotfix/bug`,
        },
      },
      {
        category: 'Remote (GitHub)',
        example: {
          code: `# Conectar repositório remoto
git remote add origin https://github.com/user/repo.git

# Enviar código
git push -u origin main     # primeiro push
git push                    # pushs seguintes

# Baixar código
git pull origin main        # baixar + integrar
git fetch                   # baixar sem integrar`,
          output: `Branch 'main' set up to track 'origin/main'.`,
        },
      },
      {
        category: 'Desfazer Mudanças',
        example: {
          code: `git restore arquivo.txt       # descartar mudanças
git restore --staged arq.txt  # remover do stage
git revert HEAD               # desfazer último commit
git stash                     # guardar mudanças temporariamente
git stash pop                 # restaurar do stash`,
          note: '⚠️ Evite git reset --hard em código publicado',
        },
      },
    ],
  },

  /* ───────────────────────────── LINUX ───────────────────────────── */
  {
    moduleId: 'linux',
    title: 'Linux Terminal',
    entries: [
      {
        category: 'Navegação',
        example: {
          code: `pwd               # pasta atual
ls -la            # listar com detalhes
cd projetos/      # entrar na pasta
cd ..             # voltar um nível
cd ~              # ir para home
ls *.py           # listar só .py`,
          output: `/home/raphael
drwxr-xr-x  raphael  projetos/
-rw-r--r--  raphael  main.py
-rw-r--r--  raphael  utils.py`,
        },
      },
      {
        category: 'Arquivos e Pastas',
        example: {
          code: `mkdir meu-projeto          # criar pasta
touch index.html           # criar arquivo vazio
cp arquivo.txt copia.txt   # copiar
mv copia.txt backup/       # mover ou renomear
rm arquivo.txt             # remover arquivo
rm -rf pasta/              # remover pasta (cuidado!)
cat arquivo.txt            # exibir conteúdo`,
          output: `# arquivo.txt removido
# pasta/ e todo conteúdo removido`,
        },
      },
      {
        category: 'Busca com grep / find',
        example: {
          code: `# grep: busca texto dentro de arquivos
grep "def " main.py          # buscar em arquivo
grep -r "TODO" ./src/        # buscar recursivo
grep -n "erro" log.txt       # mostrar número de linha

# find: busca arquivos
find . -name "*.py"          # todos os .py
find . -name "*.log" -delete # deletar logs`,
          output: `main.py:5:def somar(a, b):
main.py:12:def dividir(a, b):
./src/utils.py:# TODO: melhorar isso`,
        },
      },
      {
        category: 'Pipes e Redirecionamento',
        example: {
          code: `# | passa saída para próximo comando
ls | grep ".py"
cat log.txt | grep "ERROR" | wc -l

# > sobrescreve arquivo
echo "Olá" > arquivo.txt

# >> adiciona ao final
echo "Mundo" >> arquivo.txt

# 2> redireciona erros
python app.py 2> erros.log`,
          output: `main.py
utils.py
3   # 3 linhas com ERROR`,
        },
      },
      {
        category: 'Permissões',
        example: {
          code: `ls -l script.sh
# -rw-r--r-- raphael script.sh

chmod +x script.sh       # tornar executável
chmod 755 script.sh      # dono:rwx grupo:r-x outros:r-x
chown raphael:dev arq    # mudar dono e grupo
sudo comando             # executar como root`,
          output: `-rwxr-xr-x raphael script.sh`,
          note: '7=rwx 6=rw- 5=r-x 4=r-- 0=---',
        },
      },
      {
        category: 'Processos',
        example: {
          code: `ps aux           # listar processos
top              # monitor em tempo real
htop             # monitor interativo (melhor)

kill 1234        # encerrar processo pelo PID
kill -9 1234     # forçar encerramento
pkill python     # matar por nome

# Rodar em background
python server.py &
jobs             # listar processos em background`,
          output: `[1] 4823   # PID do processo em background`,
        },
      },
    ],
  },

  /* ───────────────────────────── LÓGICA ───────────────────────────── */
  {
    moduleId: 'logica',
    title: 'Lógica de Programação',
    entries: [
      {
        category: 'Operadores Lógicos',
        items: [
          { code: 'A AND B (&&)', description: 'Verdadeiro só se A e B forem verdadeiros' },
          { code: 'A OR B  (||)', description: 'Verdadeiro se ao menos um for verdadeiro' },
          { code: 'NOT A   (!)',  description: 'Inverte: NOT true = false' },
          { code: 'A XOR B',     description: 'Verdadeiro se apenas um for verdadeiro' },
        ],
      },
      {
        category: 'Tabela Verdade',
        example: {
          code: `A     | B     | AND  | OR   | XOR
------|-------|------|------|-----
true  | true  | true | true | false
true  | false | false| true | true
false | true  | false| true | true
false | false | false| false| false`,
          note: 'AND exige ambos | OR exige ao menos 1 | XOR exige exatamente 1',
        },
      },
      {
        category: 'Se / Senão (pseudocódigo)',
        example: {
          code: `SE nota >= 7 ENTÃO
    ESCREVA "Aprovado"
SENÃO SE nota >= 5 ENTÃO
    ESCREVA "Recuperação"
SENÃO
    ESCREVA "Reprovado"
FIM SE`,
          output: `(nota = 6.5) → Recuperação`,
        },
      },
      {
        category: 'Enquanto (pseudocódigo)',
        example: {
          code: `contador ← 1

ENQUANTO contador <= 5 FAÇA
    ESCREVA contador
    contador ← contador + 1
FIM ENQUANTO`,
          output: `1
2
3
4
5`,
        },
      },
      {
        category: 'Para (pseudocódigo)',
        example: {
          code: `soma ← 0

PARA i DE 1 ATÉ 10 FAÇA
    soma ← soma + i
FIM PARA

ESCREVA "Soma:", soma`,
          output: `Soma: 55`,
        },
      },
      {
        category: 'Algoritmo — Exemplo',
        example: {
          code: `ALGORITMO verificar_primo
  LEIA numero
  primo ← VERDADEIRO

  PARA i DE 2 ATÉ raiz(numero) FAÇA
    SE numero MOD i = 0 ENTÃO
      primo ← FALSO
      PARE
    FIM SE
  FIM PARA

  SE primo ENTÃO
    ESCREVA numero, "é primo"
  SENÃO
    ESCREVA numero, "não é primo"
FIM ALGORITMO`,
          output: `(numero = 7) → 7 é primo
(numero = 9) → 9 não é primo`,
        },
      },
    ],
  },

  /* ───────────────────────────── LINGUAGEM C ───────────────────────────── */
  {
    moduleId: 'c',
    title: 'Linguagem C',
    entries: [
      {
        category: 'Hello World',
        example: {
          code: `#include <stdio.h>

int main() {
    printf("Olá, Mundo!\\n");
    printf("C versão: %d\\n", __STDC_VERSION__);
    return 0;
}`,
          output: `Olá, Mundo!
C versão: 201710`,
          note: 'Compile: gcc hello.c -o hello && ./hello',
        },
      },
      {
        category: 'Tipos e Variáveis',
        example: {
          code: `int    idade  = 20;
float  altura = 1.75f;
double pi     = 3.14159;
char   letra  = 'A';
char   nome[] = "Raphael";

printf("%d %f %c %s\\n", idade, altura, letra, nome);`,
          output: `20 1.750000 A Raphael`,
          note: 'int=4B | float=4B | double=8B | char=1B',
        },
      },
      {
        category: 'Entrada e Saída',
        example: {
          code: `#include <stdio.h>

int main() {
    int n;
    char nome[50];

    printf("Seu nome: ");
    scanf("%s", nome);           // lê string sem espaço
    printf("Sua idade: ");
    scanf("%d", &n);             // & = endereço da variável

    printf("Olá, %s! Você tem %d anos.\\n", nome, n);
    return 0;
}`,
          output: `Seu nome: Raphael
Sua idade: 20
Olá, Raphael! Você tem 20 anos.`,
        },
      },
      {
        category: 'Condicionais',
        example: {
          code: `int nota = 75;

if (nota >= 70) {
    printf("Aprovado\\n");
} else if (nota >= 50) {
    printf("Recuperação\\n");
} else {
    printf("Reprovado\\n");
}

// Ternário
char *status = (nota >= 70) ? "Aprovado" : "Reprovado";
printf("%s\\n", status);`,
          output: `Aprovado
Aprovado`,
        },
      },
      {
        category: 'Loops',
        example: {
          code: `// for
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);
}
printf("\\n");

// while
int n = 10;
while (n > 0) {
    printf("%d ", n);
    n -= 3;
}
printf("\\n");`,
          output: `1 2 3 4 5
10 7 4 1`,
        },
      },
      {
        category: 'Funções',
        example: {
          code: `#include <stdio.h>

// declaração (protótipo)
int fatorial(int n);

int main() {
    printf("5! = %d\\n", fatorial(5));
    printf("0! = %d\\n", fatorial(0));
    return 0;
}

int fatorial(int n) {
    if (n <= 1) return 1;
    return n * fatorial(n - 1);
}`,
          output: `5! = 120
0! = 1`,
        },
      },
      {
        category: 'Arrays',
        example: {
          code: `int nums[5] = {3, 1, 4, 1, 5};
int soma = 0;

for (int i = 0; i < 5; i++) {
    soma += nums[i];
    printf("%d ", nums[i]);
}
printf("\\nSoma: %d\\n", soma);

// Array 2D (matriz)
int mat[2][3] = {{1, 2, 3}, {4, 5, 6}};
printf("mat[1][2] = %d\\n", mat[1][2]);`,
          output: `3 1 4 1 5
Soma: 14
mat[1][2] = 6`,
        },
      },
      {
        category: 'Ponteiros',
        example: {
          code: `int x = 42;
int *p = &x;         // p guarda o endereço de x

printf("Valor:    %d\\n", x);
printf("Endereço: %p\\n", (void*)p);
printf("Via ptr:  %d\\n", *p);  // * = desreferenciar

*p = 100;            // altera x através do ponteiro
printf("x agora:  %d\\n", x);`,
          output: `Valor:    42
Endereço: 0x7ffd...
Via ptr:  42
x agora:  100`,
          note: '& = endereço de | * = valor no endereço',
        },
      },
    ],
  },

  /* ───────────────────────────── JAVA ───────────────────────────── */
  {
    moduleId: 'java',
    title: 'Java',
    entries: [
      {
        category: 'Hello World',
        example: {
          code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Olá, Mundo!");
        System.out.printf("Java %s%n",
            System.getProperty("java.version"));
    }
}`,
          output: `Olá, Mundo!
Java 21.0.1`,
          note: 'Compile: javac Main.java && java Main',
        },
      },
      {
        category: 'Tipos e Variáveis',
        example: {
          code: `int    idade  = 20;
double altura = 1.75;
boolean ativo = true;
char   letra  = 'A';
String nome   = "Raphael";  // objeto, não primitivo

// var (inferência de tipo — Java 10+)
var pi = 3.14159;

System.out.println(nome + " tem " + idade + " anos");`,
          output: `Raphael tem 20 anos`,
        },
      },
      {
        category: 'Condicionais',
        example: {
          code: `int nota = 75;

if (nota >= 70) {
    System.out.println("Aprovado");
} else if (nota >= 50) {
    System.out.println("Recuperação");
} else {
    System.out.println("Reprovado");
}

// Switch expression (Java 14+)
String res = switch (nota / 10) {
    case 10, 9 -> "A";
    case 8, 7  -> "B";
    case 6     -> "C";
    default    -> "F";
};
System.out.println("Conceito: " + res);`,
          output: `Aprovado
Conceito: B`,
        },
      },
      {
        category: 'Loops',
        example: {
          code: `// for
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}

// for-each
int[] nums = {10, 20, 30, 40};
int soma = 0;
for (int n : nums) soma += n;
System.out.println("\\nSoma: " + soma);

// while
int n = 1;
while (n <= 3) {
    System.out.print(n++ + " ");
}`,
          output: `1 2 3 4 5
Soma: 100
1 2 3`,
        },
      },
      {
        category: 'Métodos',
        example: {
          code: `public class Calculadora {
    // estático: não precisa de instância
    public static int somar(int a, int b) {
        return a + b;
    }

    // sobrecarga: mesmo nome, parâmetros diferentes
    public static double somar(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(somar(3, 4));
        System.out.println(somar(1.5, 2.5));
    }
}`,
          output: `7
4.0`,
        },
      },
      {
        category: 'Classes e Objetos',
        example: {
          code: `class Pessoa {
    String nome;
    int idade;

    Pessoa(String nome, int idade) {  // construtor
        this.nome = nome;
        this.idade = idade;
    }

    String saudar() {
        return "Oi, sou " + nome + "!";
    }
}

// uso
Pessoa p = new Pessoa("Raphael", 20);
System.out.println(p.saudar());
System.out.println(p.idade);`,
          output: `Oi, sou Raphael!
20`,
        },
      },
      {
        category: 'ArrayList',
        example: {
          code: `import java.util.ArrayList;

ArrayList<String> frutas = new ArrayList<>();
frutas.add("Maçã");
frutas.add("Banana");
frutas.add("Manga");

System.out.println(frutas);
System.out.println("Tamanho: " + frutas.size());
frutas.remove("Banana");
System.out.println(frutas);`,
          output: `[Maçã, Banana, Manga]
Tamanho: 3
[Maçã, Manga]`,
        },
      },
      {
        category: 'Exceções',
        example: {
          code: `try {
    int[] arr = new int[3];
    arr[5] = 10;  // índice inválido!
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Índice fora do limite!");
} catch (Exception e) {
    System.out.println("Erro: " + e.getMessage());
} finally {
    System.out.println("Executado sempre.");
}`,
          output: `Índice fora do limite!
Executado sempre.`,
        },
      },
    ],
  },

  /* ───────────────────────────── ESTRUTURAS DE DADOS ───────────────────────────── */
  {
    moduleId: 'estruturas-de-dados',
    title: 'Estruturas de Dados',
    entries: [
      {
        category: 'Arrays / Vetores',
        example: {
          code: `# Acesso O(1), inserção no fim O(1) amortizado
nums = [10, 20, 30, 40, 50]

print(nums[0])       # primeiro → 10
print(nums[-1])      # último  → 50
print(nums[1:4])     # slice   → [20, 30, 40]

nums.append(60)      # inserir no fim O(1)
nums.insert(0, 5)    # inserir no início O(n)
nums.pop()           # remover do fim O(1)
print(nums)`,
          output: `10
50
[20, 30, 40]
[5, 10, 20, 30, 40, 50]`,
          note: 'Acesso por índice O(1) | Busca O(n) | Inserção no meio O(n)',
        },
      },
      {
        category: 'Pilha (Stack) — LIFO',
        example: {
          code: `# LIFO: Last In, First Out (último a entrar, primeiro a sair)
# Ex: desfazer (Ctrl+Z), chamadas de função, expressões

pilha = []

pilha.append("a")   # push
pilha.append("b")
pilha.append("c")
print("Topo:", pilha[-1])  # peek

while pilha:
    print(pilha.pop(), end=" ")  # pop`,
          output: `Topo: c
c b a`,
          note: 'push/pop O(1) | Use list em Python ou collections.deque',
        },
      },
      {
        category: 'Fila (Queue) — FIFO',
        example: {
          code: `from collections import deque

# FIFO: First In, First Out (primeiro a entrar, primeiro a sair)
# Ex: fila de impressão, BFS, tarefas

fila = deque()

fila.append("A")     # enqueue
fila.append("B")
fila.append("C")
print("Frente:", fila[0])

while fila:
    print(fila.popleft(), end=" ")  # dequeue`,
          output: `Frente: A
A B C`,
          note: 'enqueue/dequeue O(1) com deque | list.pop(0) é O(n)',
        },
      },
      {
        category: 'Lista Encadeada',
        example: {
          code: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.proximo = None

class ListaEncadeada:
    def __init__(self):
        self.cabeca = None

    def inserir(self, valor):
        novo = No(valor)
        novo.proximo = self.cabeca
        self.cabeca = novo

    def imprimir(self):
        atual = self.cabeca
        while atual:
            print(atual.valor, end=" → ")
            atual = atual.proximo
        print("None")

lista = ListaEncadeada()
lista.inserir(3)
lista.inserir(2)
lista.inserir(1)
lista.imprimir()`,
          output: `1 → 2 → 3 → None`,
          note: 'Inserção no início O(1) | Busca O(n) | Sem índice direto',
        },
      },
      {
        category: 'Tabela Hash (Dicionário)',
        example: {
          code: `# Hash Table: chave → valor em O(1) médio
contagem = {}

palavras = ["gato", "cão", "gato", "peixe", "cão", "gato"]
for p in palavras:
    contagem[p] = contagem.get(p, 0) + 1

print(contagem)
print("gato:", contagem["gato"])
print("cão" in contagem)  # O(1)`,
          output: `{'gato': 3, 'cão': 2, 'peixe': 1}
gato: 3
True`,
          note: 'Busca/inserção/remoção O(1) médio | O(n) pior caso (colisões)',
        },
      },
      {
        category: 'Árvore Binária de Busca',
        example: {
          code: `class No:
    def __init__(self, v):
        self.v, self.esq, self.dir = v, None, None

class ABB:
    def __init__(self): self.raiz = None

    def inserir(self, v, no=None, ini=True):
        if ini: no = self.raiz
        if self.raiz is None:
            self.raiz = No(v); return
        if v < no.v:
            if no.esq is None: no.esq = No(v)
            else: self.inserir(v, no.esq, False)
        else:
            if no.dir is None: no.dir = No(v)
            else: self.inserir(v, no.dir, False)

    def em_ordem(self, no=None, ini=True):
        if ini: no = self.raiz
        if no:
            self.em_ordem(no.esq, False)
            print(no.v, end=" ")
            self.em_ordem(no.dir, False)

t = ABB()
for n in [5, 3, 7, 1, 4, 6, 8]: t.inserir(n)
t.em_ordem()`,
          output: `1 3 4 5 6 7 8`,
          note: 'Em ordem = valores ordenados | Busca O(log n) balanceada',
        },
      },
      {
        category: 'Complexidades Comparadas',
        items: [
          { code: 'Array — acesso',     description: 'O(1) por índice' },
          { code: 'Array — busca',      description: 'O(n) linear' },
          { code: 'Hash Table — busca', description: 'O(1) médio' },
          { code: 'Pilha/Fila',         description: 'push/pop O(1)' },
          { code: 'ABB balanceada',     description: 'busca O(log n)' },
          { code: 'Lista Encadeada',    description: 'acesso O(n), inserção início O(1)' },
        ],
      },
    ],
  },

  /* ───────────────────────────── ALGORITMOS ───────────────────────────── */
  {
    moduleId: 'algoritmos',
    title: 'Algoritmos',
    entries: [
      {
        category: 'Busca Linear',
        example: {
          code: `def busca_linear(lista, alvo):
    for i, v in enumerate(lista):
        if v == alvo:
            return i       # índice encontrado
    return -1              # não encontrado

nums = [4, 2, 9, 1, 7, 5]
print(busca_linear(nums, 7))   # 4
print(busca_linear(nums, 3))   # -1`,
          output: `4
-1`,
          note: 'O(n) — verifica um por um | Funciona em listas não ordenadas',
        },
      },
      {
        category: 'Busca Binária',
        example: {
          code: `def busca_binaria(lista, alvo):
    esq, dir = 0, len(lista) - 1

    while esq <= dir:
        meio = (esq + dir) // 2
        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            esq = meio + 1    # descartar metade esquerda
        else:
            dir = meio - 1    # descartar metade direita

    return -1

nums = [1, 3, 5, 7, 9, 11, 15, 20]  # DEVE estar ordenada
print(busca_binaria(nums, 11))  # 5
print(busca_binaria(nums, 4))   # -1`,
          output: `5
-1`,
          note: 'O(log n) — divide pela metade a cada passo | Lista ORDENADA',
        },
      },
      {
        category: 'Bubble Sort',
        example: {
          code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        trocou = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                trocou = True
        if not trocou:
            break          # já ordenado, sair cedo
    return arr

print(bubble_sort([5, 3, 8, 1, 9, 2]))`,
          output: `[1, 2, 3, 5, 8, 9]`,
          note: 'O(n²) pior caso | Simples mas lento para listas grandes',
        },
      },
      {
        category: 'Merge Sort',
        example: {
          code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    meio = len(arr) // 2
    esq = merge_sort(arr[:meio])
    dir = merge_sort(arr[meio:])
    return merge(esq, dir)

def merge(esq, dir):
    res, i, j = [], 0, 0
    while i < len(esq) and j < len(dir):
        if esq[i] <= dir[j]:
            res.append(esq[i]); i += 1
        else:
            res.append(dir[j]); j += 1
    return res + esq[i:] + dir[j:]

print(merge_sort([5, 3, 8, 1, 9, 2]))`,
          output: `[1, 2, 3, 5, 8, 9]`,
          note: 'O(n log n) sempre | Divide e conquista | Estável',
        },
      },
      {
        category: 'Recursão',
        example: {
          code: `def fatorial(n):
    if n <= 1: return 1        # caso base
    return n * fatorial(n - 1) # caso recursivo

def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fatorial(6))             # 720
print([fibonacci(i) for i in range(8)])`,
          output: `720
[0, 1, 1, 2, 3, 5, 8, 13]`,
          note: 'Sempre defina o caso base! Sem ele → recursão infinita (stack overflow)',
        },
      },
      {
        category: 'Complexidade Big O',
        items: [
          { code: 'O(1)',      description: 'Constante — acesso a array, hash lookup' },
          { code: 'O(log n)',  description: 'Logarítmico — busca binária, BST' },
          { code: 'O(n)',      description: 'Linear — busca linear, percorrer lista' },
          { code: 'O(n log n)',description: 'Linearítmico — merge sort, quicksort médio' },
          { code: 'O(n²)',     description: 'Quadrático — bubble/selection/insertion sort' },
          { code: 'O(2ⁿ)',     description: 'Exponencial — fibonacci recursivo ingênuo' },
        ],
      },
      {
        category: 'BFS e DFS em Grafo',
        example: {
          code: `from collections import deque

grafo = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [], 'E': [], 'F': []
}

# BFS — largura (fila)
def bfs(inicio):
    fila, visitados = deque([inicio]), {inicio}
    ordem = []
    while fila:
        v = fila.popleft()
        ordem.append(v)
        for viz in grafo[v]:
            if viz not in visitados:
                visitados.add(viz); fila.append(viz)
    return ordem

# DFS — profundidade (pilha/recursão)
def dfs(v, visitados=None):
    if visitados is None: visitados = set()
    visitados.add(v)
    ordem = [v]
    for viz in grafo[v]:
        if viz not in visitados:
            ordem += dfs(viz, visitados)
    return ordem

print("BFS:", bfs('A'))
print("DFS:", dfs('A'))`,
          output: `BFS: ['A', 'B', 'C', 'D', 'E', 'F']
DFS: ['A', 'B', 'D', 'E', 'C', 'F']`,
          note: 'BFS = camada por camada | DFS = vai fundo antes de voltar',
        },
      },
    ],
  },

  /* ───────────────────────────── BACKEND ───────────────────────────── */
  {
    moduleId: 'backend',
    title: 'Backend com Python',
    entries: [
      {
        category: 'Flask — Primeiro Servidor',
        example: {
          code: `from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Olá, Mundo!"

@app.route("/ping")
def ping():
    return "pong"

if __name__ == "__main__":
    app.run(debug=True)  # http://localhost:5000`,
          note: 'Instalar: pip install flask | debug=True recarrega ao salvar',
        },
      },
      {
        category: 'Rotas e Parâmetros',
        example: {
          code: `from flask import Flask, request

app = Flask(__name__)

# Parâmetro na URL
@app.route("/usuario/<int:id>")
def get_usuario(id):
    return f"Usuário #{id}"

# Query string: /busca?q=python&pagina=2
@app.route("/busca")
def busca():
    q = request.args.get("q", "")
    pg = request.args.get("pagina", 1, type=int)
    return f"Buscando '{q}' — página {pg}"`,
          output: `GET /usuario/42  → "Usuário #42"
GET /busca?q=python&pagina=2  → "Buscando 'python' — página 2"`,
        },
      },
      {
        category: 'API REST com JSON',
        example: {
          code: `from flask import Flask, jsonify, request

app = Flask(__name__)

# Banco em memória (só para exemplo)
usuarios = [
    {"id": 1, "nome": "Ana"},
    {"id": 2, "nome": "Bruno"},
]

@app.route("/api/usuarios", methods=["GET"])
def listar():
    return jsonify(usuarios)

@app.route("/api/usuarios", methods=["POST"])
def criar():
    data = request.get_json()
    novo = {"id": len(usuarios) + 1, "nome": data["nome"]}
    usuarios.append(novo)
    return jsonify(novo), 201   # 201 Created`,
          output: `GET  /api/usuarios → [{"id":1,...}, {"id":2,...}]
POST /api/usuarios → {"id":3,"nome":"Carla"} 201`,
          note: 'HTTP 200=OK | 201=Criado | 400=Erro cliente | 404=Não encontrado | 500=Erro servidor',
        },
      },
      {
        category: 'Métodos HTTP',
        items: [
          { code: 'GET',    description: 'Buscar dados (sem corpo)' },
          { code: 'POST',   description: 'Criar novo recurso (com corpo JSON)' },
          { code: 'PUT',    description: 'Atualizar recurso completo' },
          { code: 'PATCH',  description: 'Atualizar recurso parcialmente' },
          { code: 'DELETE', description: 'Remover recurso' },
        ],
      },
      {
        category: 'SQLite com Python',
        example: {
          code: `import sqlite3

conn = sqlite3.connect("banco.db")
cur = conn.cursor()

# Criar tabela
cur.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        nome  TEXT NOT NULL,
        email TEXT UNIQUE
    )
""")

# Inserir
cur.execute("INSERT INTO usuarios (nome, email) VALUES (?, ?)",
            ("Raphael", "raph@email.com"))
conn.commit()

# Consultar
for row in cur.execute("SELECT * FROM usuarios"):
    print(row)

conn.close()`,
          output: `(1, 'Raphael', 'raph@email.com')`,
          note: 'Use ? como placeholder para evitar SQL Injection!',
        },
      },
      {
        category: 'Autenticação com JWT',
        example: {
          code: `import jwt, datetime

SECRET = "minha_chave_secreta"

def gerar_token(user_id):
    payload = {
        "sub": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")

def verificar_token(token):
    try:
        data = jwt.decode(token, SECRET, algorithms=["HS256"])
        return data["sub"]  # retorna o user_id
    except jwt.ExpiredSignatureError:
        return None  # token expirado

token = gerar_token(42)
print("Token gerado")
print("User ID:", verificar_token(token))`,
          output: `Token gerado
User ID: 42`,
          note: 'pip install pyjwt | Nunca armazene senhas em texto puro — use bcrypt',
        },
      },
    ],
  },

  /* ───────────────────────────── INTRO / FUNDAMENTOS ───────────────────────────── */
  {
    moduleId: 'intro',
    title: 'Fundamentos de Programação',
    entries: [
      {
        category: 'O que é um Algoritmo',
        example: {
          code: `// Algoritmo: fazer café
1. Ferver água
2. Colocar pó de café no filtro
3. Despejar água quente
4. Aguardar coar
5. Servir

// Todo programa é um algoritmo!`,
          note: 'Algoritmo = sequência finita de passos para resolver um problema',
        },
      },
      {
        category: 'Variáveis e Constantes',
        items: [
          { code: 'variável',   description: 'Espaço nomeado na memória que pode mudar de valor' },
          { code: 'constante',  description: 'Valor fixo que não muda durante a execução' },
          { code: 'int',        description: 'Número inteiro: -2, 0, 42' },
          { code: 'float',      description: 'Número decimal: 3.14, -0.5' },
          { code: 'string',     description: 'Texto: "olá", "código"' },
          { code: 'boolean',    description: 'Verdadeiro ou Falso: true / false' },
        ],
      },
      {
        category: 'Estruturas de Controle',
        items: [
          { code: 'if / else',    description: 'Executa bloco se condição for verdadeira' },
          { code: 'for',          description: 'Repete n vezes ou itera sobre coleção' },
          { code: 'while',        description: 'Repete enquanto condição for verdadeira' },
          { code: 'break',        description: 'Interrompe o loop imediatamente' },
          { code: 'continue',     description: 'Pula para a próxima iteração' },
          { code: 'return',       description: 'Retorna valor e sai da função' },
        ],
      },
      {
        category: 'Tipos de Funções',
        example: {
          code: `// Função sem retorno (procedimento)
função exibir(msg):
    imprimir(msg)

// Função com retorno
função somar(a, b):
    retornar a + b

// Função com parâmetro padrão
função saudar(nome = "visitante"):
    retornar "Olá, " + nome`,
          note: 'Funções tornam o código reutilizável e organizado',
        },
      },
    ],
  },
];

const cheatsheetsMap: Record<string, Cheatsheet> = {};
for (const sheet of cheatsheets) {
  cheatsheetsMap[sheet.moduleId] = sheet;
}

export function getCheatsheetByModuleId(moduleId: string): Cheatsheet | undefined {
  return cheatsheetsMap[moduleId];
}

export default cheatsheets;
