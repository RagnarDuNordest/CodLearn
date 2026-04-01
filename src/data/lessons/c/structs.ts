import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'structs',
  moduleId: 'c',
  title: 'Structs em C',
  description: 'Aprenda a criar tipos de dados personalizados com structs para organizar informacoes relacionadas.',
  order: 8,
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'Uma struct e como uma **ficha de cadastro**: agrupa informacoes relacionadas (nome, idade, endereco) em um unico pacote. Em vez de ter varias variaveis soltas espalhadas pelo codigo, voce organiza tudo dentro de uma struct.\n\nEm C, uma **struct** (estrutura) permite agrupar variaveis de tipos diferentes em um unico tipo de dado personalizado. Imagine que voce precisa armazenar informacoes de um aluno: nome, nota e matricula. Em vez de criar variaveis separadas, voce cria uma struct que contem tudo isso junto!\n\nStructs sao a base da **organizacao de dados** em C e representam o conceito mais proximo de "objetos" que a linguagem oferece.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Structs sao um dos conceitos mais uteis de C! Se voce ja usou classes em Python, vai se sentir em casa. A ideia e a mesma: agrupar dados relacionados. Voce vai usar structs em praticamente todo projeto real.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'struct_basica.c',
        code: `#include <stdio.h>
#include <string.h>

// Definindo uma struct
struct Aluno {
    char nome[50];
    int matricula;
    float nota;
};

int main() {
    // Criando e inicializando uma variavel do tipo struct Aluno
    struct Aluno aluno1;

    // Acessando membros com o operador ponto (.)
    strcpy(aluno1.nome, "Maria Silva");
    aluno1.matricula = 2024001;
    aluno1.nota = 9.5;

    printf("Nome: %s\\n", aluno1.nome);
    printf("Matricula: %d\\n", aluno1.matricula);
    printf("Nota: %.1f\\n", aluno1.nota);

    // Inicializacao direta na declaracao
    struct Aluno aluno2 = {"Joao Santos", 2024002, 8.7};
    printf("\\nAluno 2: %s - Nota: %.1f\\n", aluno2.nome, aluno2.nota);

    return 0;
}`,
        description: 'Structs agrupam dados relacionados. Use o operador ponto (.) para acessar cada membro.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Use **strcpy** para copiar strings em membros de struct do tipo char[]. Atribuir com = so funciona na inicializacao direta, nao depois.',
    },
    {
      type: 'text',
      content: '**typedef** permite criar um **alias** (apelido) para a struct, evitando escrever `struct NomeDaStruct` toda vez. Essa e a pratica mais comum em projetos C reais:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'typedef_struct.c',
        code: `#include <stdio.h>
#include <string.h>

// Com typedef, criamos um alias para a struct
typedef struct {
    char titulo[100];
    char autor[50];
    int ano;
    float preco;
} Livro;

// Funcao que recebe struct por valor
void exibir_livro(Livro l) {
    printf("\\"%s\\" por %s (%d) - R$ %.2f\\n",
           l.titulo, l.autor, l.ano, l.preco);
}

int main() {
    // Agora usamos apenas "Livro" em vez de "struct Livro"
    Livro livro1 = {"O Senhor dos Aneis", "Tolkien", 1954, 79.90};
    Livro livro2 = {"Dom Casmurro", "Machado de Assis", 1899, 29.90};

    exibir_livro(livro1);
    exibir_livro(livro2);

    return 0;
}`,
        description: 'typedef simplifica a sintaxe. Em vez de "struct Livro l", usamos apenas "Livro l".',
      },
    },
    {
      type: 'text',
      content: '**Arrays de structs** sao extremamente uteis para armazenar colecoes de dados. Combinados com loops, permitem processar muitos registros de forma eficiente:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'array_structs.c',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[30];
    float preco;
    int estoque;
} Produto;

int main() {
    Produto produtos[3] = {
        {"Caneta", 2.50, 100},
        {"Caderno", 15.90, 50},
        {"Borracha", 1.80, 200}
    };

    int total = 3;
    printf("=== Catalogo de Produtos ===\\n");

    for (int i = 0; i < total; i++) {
        printf("%d. %-10s | R$ %6.2f | Estoque: %d\\n",
               i + 1, produtos[i].nome,
               produtos[i].preco, produtos[i].estoque);
    }

    // Calcular valor total em estoque
    float valor_total = 0;
    for (int i = 0; i < total; i++) {
        valor_total += produtos[i].preco * produtos[i].estoque;
    }
    printf("\\nValor total em estoque: R$ %.2f\\n", valor_total);

    return 0;
}`,
        description: 'Arrays de structs permitem armazenar e processar colecoes de registros com facilidade.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Ao passar structs grandes para funcoes, prefira usar **ponteiros** para evitar copiar toda a estrutura. Use `->` para acessar membros atraves de ponteiros.',
    },
    {
      type: 'text',
      content: '## Structs com Ponteiros\n\nQuando uma funcao recebe um **ponteiro para struct**, voce usa o operador **`->`** (seta) para acessar seus membros, em vez do ponto `.`.\n\n- `f->salario` e equivalente a `(*f).salario` — o operador `->` desreferencia o ponteiro e acessa o membro em uma unica etapa\n- A palavra-chave **`const`** no parametro (`const Funcionario *f`) indica que a funcao pode ler os dados mas nao pode modifica-los',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'struct_ponteiro.c',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[50];
    int idade;
    float salario;
} Funcionario;

// Recebe ponteiro para struct (mais eficiente)
void dar_aumento(Funcionario *f, float percentual) {
    f->salario *= (1 + percentual / 100.0);
}

void exibir(const Funcionario *f) {
    printf("Nome: %s | Idade: %d | Salario: R$ %.2f\\n",
           f->nome, f->idade, f->salario);
}

int main() {
    Funcionario func = {"Ana Costa", 28, 5000.00};

    printf("Antes do aumento:\\n");
    exibir(&func);

    dar_aumento(&func, 15);  // Aumento de 15%

    printf("\\nDepois do aumento de 15%%:\\n");
    exibir(&func);

    return 0;
}`,
        description: 'Com ponteiros, use -> para acessar membros. Ex: f->salario em vez de (*f).salario.',
      },
    },
    {
      type: 'text',
      content: '**Structs aninhadas** permitem compor tipos mais complexos. Uma struct pode conter outra struct como membro, criando hierarquias de dados organizadas:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'struct_aninhada.c',
        code: `#include <stdio.h>

typedef struct {
    float x;
    float y;
} Ponto;

typedef struct {
    Ponto centro;
    float raio;
} Circulo;

typedef struct {
    Ponto superior_esquerdo;
    Ponto inferior_direito;
} Retangulo;

float area_circulo(Circulo c) {
    return 3.14159 * c.raio * c.raio;
}

float area_retangulo(Retangulo r) {
    float largura = r.inferior_direito.x - r.superior_esquerdo.x;
    float altura = r.superior_esquerdo.y - r.inferior_direito.y;
    return largura * altura;
}

int main() {
    Circulo c = {{5.0, 3.0}, 2.5};
    printf("Circulo: centro (%.1f, %.1f), raio %.1f\\n",
           c.centro.x, c.centro.y, c.raio);
    printf("Area: %.2f\\n\\n", area_circulo(c));

    Retangulo r = {{1.0, 6.0}, {7.0, 2.0}};
    printf("Retangulo: (%.1f,%.1f) a (%.1f,%.1f)\\n",
           r.superior_esquerdo.x, r.superior_esquerdo.y,
           r.inferior_direito.x, r.inferior_direito.y);
    printf("Area: %.2f\\n", area_retangulo(r));

    return 0;
}`,
        description: 'Structs aninhadas permitem representar dados complexos como formas geometricas.',
      },
    },
  ],
  challenges: [
    {
      id: 'structs-c1',
      title: 'Cadastro de Alunos',
      description: 'Crie uma struct Aluno com campos nome (char[50]), matricula (int) e nota (float). Crie 3 alunos com dados diferentes, calcule a media das notas e exiba quem tem a maior nota. Use typedef.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <string.h>

// Defina a struct Aluno com typedef

int main() {
    // Crie 3 alunos com dados diferentes

    // Calcule a media das notas

    // Encontre o aluno com a maior nota

    // Exiba os resultados

    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[50];
    int matricula;
    float nota;
} Aluno;

int main() {
    Aluno alunos[3] = {
        {"Maria Silva", 2024001, 9.5},
        {"Joao Santos", 2024002, 7.8},
        {"Ana Costa", 2024003, 10.0}
    };

    float soma = 0;
    int melhor = 0;
    for (int i = 0; i < 3; i++) {
        soma += alunos[i].nota;
        if (alunos[i].nota > alunos[melhor].nota) {
            melhor = i;
        }
    }

    printf("Media da turma: %.1f\\n", soma / 3);
    printf("Melhor aluno: %s (nota %.1f)\\n",
           alunos[melhor].nome, alunos[melhor].nota);

    return 0;
}`,
      hints: [
        'Use typedef struct { ... } Aluno; para definir o tipo.',
        'Crie um array Aluno alunos[3] e inicialize com dados entre chaves.',
        'Use um loop for para somar as notas e encontrar a maior.',
      ],
    },
    {
      id: 'structs-c2',
      title: 'Operacoes com Ponto2D',
      description: 'Crie uma struct Ponto2D com campos x e y (float). Implemente funcoes para: calcular a distancia entre dois pontos, encontrar o ponto medio entre dois pontos, e exibir um ponto no formato (x, y). Use a formula da distancia: sqrt((x2-x1)^2 + (y2-y1)^2).',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <math.h>

// Defina a struct Ponto2D com typedef

// Implemente: float distancia(Ponto2D a, Ponto2D b)

// Implemente: Ponto2D ponto_medio(Ponto2D a, Ponto2D b)

// Implemente: void exibir_ponto(Ponto2D p)

int main() {
    // Crie dois pontos e teste as funcoes
    // Exiba a distancia e o ponto medio

    return 0;
}`,
      solution: `#include <stdio.h>
#include <math.h>

typedef struct {
    float x;
    float y;
} Ponto2D;

float distancia(Ponto2D a, Ponto2D b) {
    float dx = b.x - a.x;
    float dy = b.y - a.y;
    return sqrt(dx * dx + dy * dy);
}

Ponto2D ponto_medio(Ponto2D a, Ponto2D b) {
    Ponto2D m;
    m.x = (a.x + b.x) / 2.0;
    m.y = (a.y + b.y) / 2.0;
    return m;
}

void exibir_ponto(Ponto2D p) {
    printf("(%.1f, %.1f)", p.x, p.y);
}

int main() {
    Ponto2D p1 = {1.0, 2.0};
    Ponto2D p2 = {4.0, 6.0};

    printf("Ponto A: ");
    exibir_ponto(p1);
    printf("\\nPonto B: ");
    exibir_ponto(p2);

    printf("\\nDistancia: %.2f\\n", distancia(p1, p2));

    Ponto2D meio = ponto_medio(p1, p2);
    printf("Ponto medio: ");
    exibir_ponto(meio);
    printf("\\n");

    return 0;
}`,
      hints: [
        'Inclua <math.h> para usar sqrt(). Compile com -lm: gcc programa.c -o programa -lm',
        'A funcao ponto_medio retorna uma struct Ponto2D com x e y sendo a media dos pontos.',
        'Use printf("(%.1f, %.1f)", p.x, p.y) para formatar a exibicao do ponto.',
      ],
    },
    {
      id: 'structs-c3',
      title: 'Catalogo de Produtos',
      description: 'Crie uma struct Produto com nome (char[30]), preco (float) e estoque (int). Crie um array de 4 produtos, exiba todos formatados em tabela, calcule o valor total em estoque e encontre o produto mais caro. Use ponteiros para passar o array para funcoes.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <string.h>

// Defina a struct Produto com typedef

// Implemente: void exibir_catalogo(Produto *lista, int n)
// Deve exibir os produtos formatados em tabela

// Implemente: float valor_total_estoque(Produto *lista, int n)
// Deve retornar preco * estoque de todos os produtos

// Implemente: int indice_mais_caro(Produto *lista, int n)
// Deve retornar o indice do produto mais caro

int main() {
    // Crie um array de 4 produtos
    // Chame as funcoes e exiba os resultados

    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[30];
    float preco;
    int estoque;
} Produto;

void exibir_catalogo(Produto *lista, int n) {
    printf("%-5s %-15s %10s %10s\\n", "#", "Produto", "Preco", "Estoque");
    printf("------------------------------------------\\n");
    for (int i = 0; i < n; i++) {
        printf("%-5d %-15s R$ %7.2f %10d\\n",
               i + 1, lista[i].nome, lista[i].preco, lista[i].estoque);
    }
}

float valor_total_estoque(Produto *lista, int n) {
    float total = 0;
    for (int i = 0; i < n; i++) {
        total += lista[i].preco * lista[i].estoque;
    }
    return total;
}

int indice_mais_caro(Produto *lista, int n) {
    int idx = 0;
    for (int i = 1; i < n; i++) {
        if (lista[i].preco > lista[idx].preco) {
            idx = i;
        }
    }
    return idx;
}

int main() {
    Produto produtos[4] = {
        {"Caneta", 2.50, 100},
        {"Caderno", 18.90, 50},
        {"Mochila", 89.90, 20},
        {"Borracha", 1.50, 200}
    };
    int total = 4;

    exibir_catalogo(produtos, total);

    printf("\\nValor total em estoque: R$ %.2f\\n",
           valor_total_estoque(produtos, total));

    int caro = indice_mais_caro(produtos, total);
    printf("Produto mais caro: %s (R$ %.2f)\\n",
           produtos[caro].nome, produtos[caro].preco);

    return 0;
}`,
      hints: [
        'Ao passar um array de structs para funcao, use Produto *lista como parametro.',
        'Acesse membros com lista[i].nome dentro do loop. Ponteiro para array funciona com indice [].',
        'Para encontrar o mais caro, compare lista[i].preco com lista[idx].preco e atualize o indice.',
      ],
    },
  ],
};
