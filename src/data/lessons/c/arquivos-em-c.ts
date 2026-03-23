import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arquivos-em-c',
  moduleId: 'c',
  title: 'Manipulacao de Arquivos em C',
  description: 'Aprenda a ler e escrever arquivos de texto e binarios usando as funcoes da biblioteca stdio.h.',
  order: 10,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'Trabalhar com arquivos em C e como ter um **caderno**: voce pode abrir, escrever, ler e fechar. Quando abre o caderno, escolhe se quer ler o que ja esta escrito, escrever algo novo (apagando o anterior), ou continuar escrevendo a partir de onde parou. E no final, voce sempre fecha o caderno para nao perder nada!\n\nEm C, **arquivos** sao manipulados atraves de um ponteiro especial chamado **FILE***. Toda operacao com arquivos segue 3 passos:\n\n**1. Abrir** o arquivo com `fopen()`\n**2. Ler ou escrever** dados no arquivo\n**3. Fechar** o arquivo com `fclose()`\n\nOs modos de abertura mais usados sao:\n- **"r"** — leitura (o arquivo deve existir)\n- **"w"** — escrita (cria novo ou sobrescreve)\n- **"a"** — append (adiciona no final)\n- **"rb"** / **"wb"** — leitura/escrita em modo binario',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Manipular arquivos e uma habilidade muito pratica! Com o que voce vai aprender aqui, ja da para criar programas que salvam dados de verdade -- como um sistema de cadastro, um gerador de relatorios ou um leitor de configuracoes.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'escrever_arquivo.c',
        code: `#include <stdio.h>

int main() {
    // Abrir arquivo para escrita ("w" cria ou sobrescreve)
    FILE *arquivo = fopen("dados.txt", "w");

    // SEMPRE verificar se abriu com sucesso
    if (arquivo == NULL) {
        printf("Erro ao abrir o arquivo!\\n");
        return 1;
    }

    // Escrever usando fprintf (como printf, mas para arquivo)
    fprintf(arquivo, "Nome: Maria Silva\\n");
    fprintf(arquivo, "Idade: 25\\n");
    fprintf(arquivo, "Nota: %.1f\\n", 9.5);

    // Escrever usando fputs (string simples)
    fputs("--- Fim do registro ---\\n", arquivo);

    // SEMPRE fechar o arquivo
    fclose(arquivo);
    printf("Arquivo 'dados.txt' criado com sucesso!\\n");

    return 0;
}`,
        description: 'Use fopen para abrir, fprintf/fputs para escrever, e fclose para fechar. Sempre verifique se fopen retornou NULL.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Sempre verifique** se `fopen` retornou NULL antes de usar o arquivo. E **sempre feche** o arquivo com `fclose` ao terminar. Nao fechar pode causar perda de dados!',
    },
    {
      type: 'text',
      content: 'Para **ler** um arquivo, abra-o no modo `"r"`. As principais funcoes de leitura sao:\n\n- **`fgets(buffer, tamanho, arquivo)`** — Le uma linha inteira (ate `\\n` ou o tamanho do buffer). E a forma mais segura de leitura pois nao excede o tamanho do buffer\n- **`rewind(arquivo)`** — Volta o cursor de leitura para o inicio do arquivo, permitindo le-lo novamente\n- **`fscanf(arquivo, formato, ...)`** — Le dados formatados (semelhante ao `scanf`). Retorna o numero de itens lidos com sucesso',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'ler_arquivo.c',
        code: `#include <stdio.h>

int main() {
    FILE *arquivo = fopen("dados.txt", "r");
    if (arquivo == NULL) {
        printf("Erro: arquivo nao encontrado!\\n");
        return 1;
    }

    // Metodo 1: fgets - le linha por linha (mais seguro)
    char linha[256];
    printf("=== Lendo com fgets ===\\n");
    while (fgets(linha, sizeof(linha), arquivo) != NULL) {
        printf("%s", linha);  // fgets ja inclui o \\n
    }

    // Voltar ao inicio do arquivo para ler novamente
    rewind(arquivo);

    // Metodo 2: fscanf - le dados formatados
    char campo[50];
    char valor[50];
    printf("\\n=== Lendo com fscanf ===\\n");
    while (fscanf(arquivo, "%s %s", campo, valor) == 2) {
        printf("Campo: %-10s Valor: %s\\n", campo, valor);
    }

    fclose(arquivo);
    return 0;
}`,
        description: 'fgets le linhas inteiras (mais seguro). fscanf le dados formatados. rewind volta ao inicio do arquivo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Prefira **fgets** em vez de fscanf para ler linhas de texto. fgets e mais seguro pois limita o tamanho da leitura, evitando estouro de buffer.',
    },
    {
      type: 'text',
      content: 'O modo **append ("a")** e util quando voce quer adicionar dados a um arquivo existente sem perder o conteudo anterior. Ideal para **logs**, **registros** e **historicos**:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'append_arquivo.c',
        code: `#include <stdio.h>
#include <time.h>

void registrar_log(const char *mensagem) {
    FILE *log = fopen("sistema.log", "a");
    if (log == NULL) {
        printf("Erro ao abrir log!\\n");
        return;
    }

    // Obter data e hora atual
    time_t agora = time(NULL);
    struct tm *t = localtime(&agora);

    fprintf(log, "[%02d/%02d/%04d %02d:%02d:%02d] %s\\n",
            t->tm_mday, t->tm_mon + 1, t->tm_year + 1900,
            t->tm_hour, t->tm_min, t->tm_sec, mensagem);

    fclose(log);
}

int main() {
    registrar_log("Sistema iniciado");
    registrar_log("Usuario logou com sucesso");
    registrar_log("Dados processados: 150 registros");

    printf("Logs registrados! Verifique 'sistema.log'\\n");

    // Ler e exibir o log
    FILE *f = fopen("sistema.log", "r");
    if (f != NULL) {
        char linha[256];
        printf("\\n=== Conteudo do Log ===\\n");
        while (fgets(linha, sizeof(linha), f) != NULL) {
            printf("%s", linha);
        }
        fclose(f);
    }

    return 0;
}`,
        description: 'O modo "a" (append) adiciona ao final do arquivo sem apagar o conteudo existente.',
      },
    },
    {
      type: 'text',
      content: 'Para dados **estruturados** (structs, arrays de numeros), o modo **binario** e mais eficiente. Usamos `fwrite` para escrever e `fread` para ler blocos de bytes diretamente:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'arquivo_binario.c',
        code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[50];
    int idade;
    float nota;
} Aluno;

int main() {
    // === ESCRITA BINARIA ===
    Aluno turma[3] = {
        {"Ana Costa", 20, 9.2},
        {"Pedro Lima", 22, 8.5},
        {"Julia Ramos", 19, 9.8}
    };

    FILE *f = fopen("alunos.bin", "wb");
    if (f == NULL) {
        printf("Erro ao criar arquivo binario!\\n");
        return 1;
    }

    // fwrite(dados, tamanho_de_cada, quantidade, arquivo)
    fwrite(turma, sizeof(Aluno), 3, f);
    fclose(f);
    printf("Dados salvos em modo binario!\\n");

    // === LEITURA BINARIA ===
    Aluno leitura[3];
    f = fopen("alunos.bin", "rb");
    if (f == NULL) {
        printf("Erro ao ler arquivo binario!\\n");
        return 1;
    }

    // fread(destino, tamanho_de_cada, quantidade, arquivo)
    int lidos = fread(leitura, sizeof(Aluno), 3, f);
    fclose(f);

    printf("\\n%d alunos lidos do arquivo:\\n", lidos);
    for (int i = 0; i < lidos; i++) {
        printf("%-15s | Idade: %d | Nota: %.1f\\n",
               leitura[i].nome, leitura[i].idade, leitura[i].nota);
    }

    return 0;
}`,
        description: 'Arquivos binarios armazenam structs diretamente. fwrite/fread operam com blocos de bytes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Arquivos **texto** sao legiveis por humanos e editaveis com qualquer editor. Arquivos **binarios** sao menores e mais rapidos para leitura/escrita, mas nao sao legiveis diretamente.',
    },
  ],
  challenges: [
    {
      id: 'arquivos-c1',
      title: 'Salvar e Carregar Alunos',
      description: 'Crie uma struct Aluno com nome, matricula e nota. Implemente uma funcao salvar_alunos que escreve um array de alunos em um arquivo texto (um por linha, com campos separados por virgula). Implemente outra funcao que le o arquivo e exibe os dados formatados.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[50];
    int matricula;
    float nota;
} Aluno;

// Implemente: void salvar_alunos(Aluno *lista, int n, const char *nomeArquivo)
// Deve escrever cada aluno em uma linha: nome,matricula,nota

// Implemente: void carregar_alunos(const char *nomeArquivo)
// Deve ler o arquivo e exibir os dados formatados

int main() {
    Aluno turma[3] = {
        {"Maria Silva", 2024001, 9.5},
        {"Joao Santos", 2024002, 7.8},
        {"Ana Costa", 2024003, 10.0}
    };

    // Salve os alunos no arquivo "turma.txt"
    // Carregue e exiba os alunos do arquivo

    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nome[50];
    int matricula;
    float nota;
} Aluno;

void salvar_alunos(Aluno *lista, int n, const char *nomeArquivo) {
    FILE *f = fopen(nomeArquivo, "w");
    if (f == NULL) {
        printf("Erro ao abrir arquivo para escrita!\\n");
        return;
    }
    for (int i = 0; i < n; i++) {
        fprintf(f, "%s,%d,%.1f\\n", lista[i].nome, lista[i].matricula, lista[i].nota);
    }
    fclose(f);
    printf("Dados salvos em '%s'!\\n", nomeArquivo);
}

void carregar_alunos(const char *nomeArquivo) {
    FILE *f = fopen(nomeArquivo, "r");
    if (f == NULL) {
        printf("Erro ao abrir arquivo para leitura!\\n");
        return;
    }
    char nome[50];
    int matricula;
    float nota;
    printf("\\n=== Alunos do Arquivo ===\\n");
    while (fscanf(f, "%[^,],%d,%f\\n", nome, &matricula, &nota) == 3) {
        printf("Nome: %-15s | Mat: %d | Nota: %.1f\\n", nome, matricula, nota);
    }
    fclose(f);
}

int main() {
    Aluno turma[3] = {
        {"Maria Silva", 2024001, 9.5},
        {"Joao Santos", 2024002, 7.8},
        {"Ana Costa", 2024003, 10.0}
    };

    salvar_alunos(turma, 3, "turma.txt");
    carregar_alunos("turma.txt");

    return 0;
}`,
      hints: [
        'Use fprintf(f, "%s,%d,%.1f\\n", ...) para escrever cada aluno em uma linha.',
        'Para ler campos separados por virgula, use fscanf com o formato "%[^,],%d,%f\\n".',
        'Nao esqueca de verificar se fopen retornou NULL e de fechar o arquivo com fclose.',
      ],
    },
    {
      id: 'arquivos-c2',
      title: 'Contar Linhas de um Arquivo',
      description: 'Crie um programa que recebe o nome de um arquivo, le seu conteudo e conta: o numero total de linhas, o numero de linhas vazias e o numero de linhas com conteudo. Exiba os resultados formatados. Primeiro, crie o arquivo de teste com algumas linhas.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <string.h>

// Implemente: void criar_arquivo_teste(const char *nomeArquivo)
// Crie um arquivo com pelo menos 8 linhas (algumas vazias)

// Implemente: void contar_linhas(const char *nomeArquivo)
// Conte linhas totais, vazias e com conteudo

int main() {
    const char *arquivo = "teste.txt";

    // Crie o arquivo de teste
    // Conte e exiba as estatisticas

    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void criar_arquivo_teste(const char *nomeArquivo) {
    FILE *f = fopen(nomeArquivo, "w");
    if (f == NULL) return;

    fprintf(f, "Primeira linha com texto\\n");
    fprintf(f, "Segunda linha com texto\\n");
    fprintf(f, "\\n");
    fprintf(f, "Quarta linha com texto\\n");
    fprintf(f, "\\n");
    fprintf(f, "\\n");
    fprintf(f, "Setima linha com texto\\n");
    fprintf(f, "Oitava linha com texto\\n");

    fclose(f);
    printf("Arquivo '%s' criado!\\n", nomeArquivo);
}

void contar_linhas(const char *nomeArquivo) {
    FILE *f = fopen(nomeArquivo, "r");
    if (f == NULL) {
        printf("Erro ao abrir '%s'!\\n", nomeArquivo);
        return;
    }

    char linha[256];
    int total = 0, vazias = 0, com_conteudo = 0;

    while (fgets(linha, sizeof(linha), f) != NULL) {
        total++;
        if (linha[0] == '\\n' || linha[0] == '\\0') {
            vazias++;
        } else {
            com_conteudo++;
        }
    }

    fclose(f);

    printf("\\n=== Estatisticas de '%s' ===\\n", nomeArquivo);
    printf("Linhas totais:       %d\\n", total);
    printf("Linhas com conteudo: %d\\n", com_conteudo);
    printf("Linhas vazias:       %d\\n", vazias);
}

int main() {
    const char *arquivo = "teste.txt";

    criar_arquivo_teste(arquivo);
    contar_linhas(arquivo);

    return 0;
}`,
      hints: [
        'Use fgets em um loop while para ler linha por linha ate retornar NULL.',
        'Uma linha vazia contem apenas "\\n" como primeiro caractere.',
        'Incremente contadores diferentes para linhas vazias e com conteudo.',
      ],
    },
    {
      id: 'arquivos-c3',
      title: 'Copiar Conteudo de Arquivo',
      description: 'Crie um programa que copia o conteudo de um arquivo de origem para um arquivo de destino. Primeiro crie um arquivo de origem com conteudo. Depois copie para o destino usando fgets/fputs. Ao final, exiba quantos bytes foram copiados e o conteudo do arquivo destino.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <string.h>

// Implemente: void criar_origem(const char *nomeArquivo)
// Crie um arquivo com conteudo para ser copiado

// Implemente: int copiar_arquivo(const char *origem, const char *destino)
// Copie o conteudo e retorne o numero de bytes copiados

// Implemente: void exibir_arquivo(const char *nomeArquivo)
// Exiba o conteudo do arquivo

int main() {
    // Crie o arquivo de origem
    // Copie para o destino
    // Exiba o resultado da copia

    return 0;
}`,
      solution: `#include <stdio.h>
#include <string.h>

void criar_origem(const char *nomeArquivo) {
    FILE *f = fopen(nomeArquivo, "w");
    if (f == NULL) return;

    fprintf(f, "=== Relatorio de Vendas ===\\n");
    fprintf(f, "Produto: Notebook\\n");
    fprintf(f, "Quantidade: 15\\n");
    fprintf(f, "Valor unitario: R$ 3500.00\\n");
    fprintf(f, "Total: R$ 52500.00\\n");

    fclose(f);
    printf("Arquivo de origem criado!\\n");
}

int copiar_arquivo(const char *origem, const char *destino) {
    FILE *src = fopen(origem, "r");
    if (src == NULL) {
        printf("Erro ao abrir '%s'!\\n", origem);
        return -1;
    }

    FILE *dst = fopen(destino, "w");
    if (dst == NULL) {
        printf("Erro ao criar '%s'!\\n", destino);
        fclose(src);
        return -1;
    }

    char buffer[256];
    int bytes = 0;
    while (fgets(buffer, sizeof(buffer), src) != NULL) {
        fputs(buffer, dst);
        bytes += strlen(buffer);
    }

    fclose(src);
    fclose(dst);
    return bytes;
}

void exibir_arquivo(const char *nomeArquivo) {
    FILE *f = fopen(nomeArquivo, "r");
    if (f == NULL) return;

    char linha[256];
    while (fgets(linha, sizeof(linha), f) != NULL) {
        printf("%s", linha);
    }
    fclose(f);
}

int main() {
    criar_origem("origem.txt");

    int bytes = copiar_arquivo("origem.txt", "copia.txt");
    if (bytes >= 0) {
        printf("Copiados %d bytes!\\n\\n", bytes);
        printf("=== Conteudo da copia ===\\n");
        exibir_arquivo("copia.txt");
    }

    return 0;
}`,
      hints: [
        'Abra o arquivo de origem com "r" e o destino com "w" ao mesmo tempo.',
        'Use fgets para ler e fputs para escrever no loop de copia.',
        'Nao esqueca de fechar AMBOS os arquivos. Se o destino falhar ao abrir, feche a origem primeiro.',
      ],
    },
  ],
};
