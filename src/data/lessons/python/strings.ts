import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'strings',
  moduleId: 'python',
  title: 'Strings e Manipulacao de Texto',
  description: 'Aprenda a trabalhar com textos em Python.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: '**Strings** sao sequencias de caracteres — ou seja, texto! Voce ja usou strings com print(). Agora vamos aprender a manipula-las de diversas formas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'strings_basico.py',
        code: `# Criando strings
nome = "Raphael"
sobrenome = 'Siqueira'
frase = """Isso e uma
string de multiplas linhas"""

# Concatenacao (juntar strings)
nome_completo = nome + " " + sobrenome
print(nome_completo)  # Raphael Siqueira

# f-strings (forma moderna e pratica)
idade = 20
print(f"Meu nome e {nome} e tenho {idade} anos.")`,
        description: 'Strings podem usar aspas simples, duplas ou triplas.',
      },
    },
    {
      type: 'text',
      content: '## Metodos de String\n\nStrings possuem **metodos** embutidos chamados com ponto: `texto.metodo()`. Eles nao alteram a string original — retornam uma **nova string**.\n\n- **`upper()`** — converte tudo para MAIUSCULO\n- **`lower()`** — converte tudo para minusculo\n- **`strip()`** — remove espacos em branco do inicio e do fim\n- **`replace(antigo, novo)`** — substitui um trecho por outro\n- **`split(separador)`** — divide a string em uma lista de partes\n- **`startswith(trecho)`** / **`endswith(trecho)`** — verifica como a string comeca ou termina',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'strings_metodos.py',
        code: `texto = "  Python e Incrivel!  "

print(texto.upper())       # "  PYTHON E INCRIVEL!  "
print(texto.lower())       # "  python e incrivel!  "
print(texto.strip())       # "Python e Incrivel!"
print(texto.replace("Python", "C"))  # "  C e Incrivel!  "

# Verificando conteudo
print("Python" in texto)   # True
print(texto.startswith(" "))  # True

# Dividindo strings
linguagens = "Python,C,Java,JavaScript"
lista = linguagens.split(",")
print(lista)  # ['Python', 'C', 'Java', 'JavaScript']`,
        description: 'Strings possuem diversos metodos uteis para manipulacao de texto.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Strings sao **imutaveis** em Python. Isso significa que voce nao pode alterar um caractere diretamente. Os metodos como upper() e replace() retornam uma NOVA string, sem alterar a original.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'strings_indexacao.py',
        code: `nome = "Python"

# Indexacao (como listas!)
print(nome[0])     # P
print(nome[-1])    # n
print(len(nome))   # 6

# Fatiamento
print(nome[0:3])   # Pyt
print(nome[3:])    # hon
print(nome[::-1])  # nohtyP (invertido!)`,
        description: 'Strings podem ser acessadas por indice e fatiadas como listas.',
      },
    },
  ],
  challenges: [
    {
      id: 'str-c1',
      title: 'Contador de Vogais',
      description: 'Crie um programa que receba uma string e conte quantas vogais (a, e, i, o, u) ela possui. Considere tanto maiusculas quanto minusculas. Imprima a contagem total.',
      language: 'python',
      starterCode: `texto = "Programacao em Python e muito divertida!"

# Conte quantas vogais existem no texto
# Considere maiusculas e minusculas (A e a sao vogais)
# Dica: converta para minusculo antes de verificar

# Imprima o total de vogais encontradas
`,
      solution: `texto = "Programacao em Python e muito divertida!"

vogais = "aeiou"
contador = 0

for letra in texto.lower():
    if letra in vogais:
        contador += 1

print(f"Texto: {texto}")
print(f"Total de vogais: {contador}")`,
      hints: [
        'Use texto.lower() para converter tudo para minusculo antes de comparar',
        'Crie uma string com as vogais: vogais = "aeiou"',
        'Use "if letra in vogais" para verificar se cada caractere e uma vogal',
      ],
    },
    {
      id: 'str-c2',
      title: 'Inversor de String',
      description: 'Crie um programa que inverta uma string de duas formas: usando fatiamento e usando um laco for. Imprima o resultado de ambas as formas.',
      language: 'python',
      starterCode: `texto = "Python"

# Forma 1: Inverta usando fatiamento [::-1]

# Forma 2: Inverta usando um laco for (sem usar [::-1])

# Imprima o texto original e as duas versoes invertidas
`,
      solution: `texto = "Python"

# Forma 1: Fatiamento
invertido_1 = texto[::-1]

# Forma 2: Laco for
invertido_2 = ""
for letra in texto:
    invertido_2 = letra + invertido_2

print(f"Original: {texto}")
print(f"Invertido (fatiamento): {invertido_1}")
print(f"Invertido (laco for): {invertido_2}")`,
      hints: [
        'Para fatiamento, use texto[::-1] que percorre a string de tras para frente',
        'No laco for, adicione cada letra ANTES da string acumulada: invertido = letra + invertido',
        'Comece com uma string vazia: invertido = ""',
      ],
    },
    {
      id: 'str-c3',
      title: 'Verificador de Palindromo',
      description: 'Crie um programa que verifique se uma palavra e um palindromo (se le igual de tras para frente). Ignore diferencas entre maiusculas e minusculas e remova espacos. Teste com as palavras: "Ana", "arara", "Python" e "A sacada da casa".',
      language: 'python',
      starterCode: `# Crie uma funcao que verifica se um texto e palindromo
# Ignore maiusculas/minusculas e espacos


# Teste com as seguintes palavras:
# "Ana" -> True
# "arara" -> True
# "Python" -> False
# "A sacada da casa" -> True
`,
      solution: `def eh_palindromo(texto):
    texto_limpo = texto.lower().replace(" ", "")
    return texto_limpo == texto_limpo[::-1]

palavras = ["Ana", "arara", "Python", "A sacada da casa"]

for palavra in palavras:
    resultado = eh_palindromo(palavra)
    print(f'"{palavra}" e palindromo? {resultado}')`,
      hints: [
        'Use .lower() para ignorar maiusculas e .replace(" ", "") para remover espacos',
        'Compare a string limpa com ela mesma invertida usando [::-1]',
        'Crie uma funcao para facilitar o teste com multiplas palavras',
      ],
    },
  ],
};
