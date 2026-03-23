import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-backend',
  moduleId: 'backend',
  title: 'Projeto: Validação de Cadastro',
  description:
    'Implemente as validações de uma API de cadastro de usuários — o coração de qualquer sistema de autenticação real.',
  order: 6,
  estimatedMinutes: 35,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-backend',
    title: 'Lógica de Validação de Usuário',
    language: 'python',
    scenario:
      'Você está desenvolvendo o backend de um sistema de cadastro. Antes de salvar um usuário no banco de dados, a API precisa validar o e-mail e a senha. Você vai implementar essas validações em Python puro.',
    objective:
      'Criar funções de validação de e-mail e senha que serão usadas pela sua API, com testes automatizados para garantir que funcionam corretamente.',
    steps: [
      {
        id: 'gp-back-s1',
        title: 'Validar formato de e-mail',
        description:
          'Crie a função `validar_email(email)` que retorna True se o e-mail contiver "@" E "." após o "@". Retorna False caso contrário.',
        starterCode:
          '# Etapa 1: Validar e-mail\ndef validar_email(email):\n    # Verifique se "@" esta no email\n    # Verifique se "." aparece depois do "@"\n    # Retorne True ou False\n    pass\n\nprint(validar_email("user@email.com"))\nprint(validar_email("invalido@"))\nprint(validar_email("semaaroba.com"))\n',
        solution:
          'def validar_email(email):\n    if "@" not in email:\n        return False\n    partes = email.split("@")\n    if len(partes) != 2:\n        return False\n    if "." not in partes[1]:\n        return False\n    return True\n\nprint(validar_email("user@email.com"))\nprint(validar_email("invalido@"))\nprint(validar_email("semaaroba.com"))',
        hints: [
          'Use "if \'@\' not in email: return False" para verificar o @.',
          'Use email.split("@") para separar as duas partes.',
          'A parte após o @ deve conter um ".".',
        ],
        testCases: [
          {
            description: 'user@email.com → True; invalido@ → False; semaaroba.com → False',
            inputs: [],
            expectedOutput: 'True\nFalse\nFalse',
          },
        ],
      },
      {
        id: 'gp-back-s2',
        title: 'Validar força da senha',
        description:
          'Crie `validar_senha(senha)` que retorna True se: a senha tiver 8+ caracteres E contiver pelo menos um número. Caso contrário, retorna False.',
        starterCode:
          '# Etapa 2: Validar senha\ndef validar_senha(senha):\n    # Verifique se len(senha) >= 8\n    # Verifique se pelo menos um char e digito (use .isdigit())\n    pass\n\nprint(validar_senha("Senha123"))\nprint(validar_senha("curta1"))\nprint(validar_senha("semNumeros"))\n',
        solution:
          'def validar_senha(senha):\n    if len(senha) < 8:\n        return False\n    tem_numero = False\n    for char in senha:\n        if char.isdigit():\n            tem_numero = True\n            break\n    return tem_numero\n\nprint(validar_senha("Senha123"))\nprint(validar_senha("curta1"))\nprint(validar_senha("semNumeros"))',
        hints: [
          'len(senha) < 8 → retorne False imediatamente.',
          'Percorra a senha com for; use char.isdigit() para detectar números.',
        ],
        testCases: [
          {
            description: '"Senha123" → True; "curta1" → False; "semNumeros" → False',
            inputs: [],
            expectedOutput: 'True\nFalse\nFalse',
          },
        ],
      },
      {
        id: 'gp-back-s3',
        title: 'Função completa de cadastro',
        description:
          'Combine as duas validações em `cadastrar_usuario(nome, email, senha)`. Se tudo for válido, retorne "Cadastro realizado". Se não, liste os erros encontrados.',
        starterCode:
          '# Etapa 3: Cadastro completo\ndef validar_email(email):\n    if "@" not in email: return False\n    partes = email.split("@")\n    return len(partes) == 2 and "." in partes[1]\n\ndef validar_senha(senha):\n    if len(senha) < 8: return False\n    return any(c.isdigit() for c in senha)\n\ndef cadastrar_usuario(nome, email, senha):\n    erros = []\n    if len(nome) < 2:\n        erros.append("Nome muito curto")\n    if not validar_email(email):\n        erros.append("Email invalido")\n    if not validar_senha(senha):\n        erros.append("Senha fraca")\n    if len(erros) == 0:\n        return "Cadastro realizado"\n    return "Erros: " + ", ".join(erros)\n\nprint(cadastrar_usuario("Maria", "maria@email.com", "Senha123"))\nprint(cadastrar_usuario("J", "invalido", "123"))\n',
        solution:
          'def validar_email(email):\n    if "@" not in email: return False\n    partes = email.split("@")\n    return len(partes) == 2 and "." in partes[1]\n\ndef validar_senha(senha):\n    if len(senha) < 8: return False\n    return any(c.isdigit() for c in senha)\n\ndef cadastrar_usuario(nome, email, senha):\n    erros = []\n    if len(nome) < 2:\n        erros.append("Nome muito curto")\n    if not validar_email(email):\n        erros.append("Email invalido")\n    if not validar_senha(senha):\n        erros.append("Senha fraca")\n    if len(erros) == 0:\n        return "Cadastro realizado"\n    return "Erros: " + ", ".join(erros)\n\nprint(cadastrar_usuario("Maria", "maria@email.com", "Senha123"))\nprint(cadastrar_usuario("J", "invalido", "123"))',
        hints: [
          'Crie uma lista erros = [] e adicione mensagens de erro com erros.append(...).',
          '", ".join(erros) junta todos os erros em uma string com vírgula.',
        ],
        testCases: [
          {
            description: 'Dados válidos → realizado; dados inválidos → lista de erros',
            inputs: [],
            expectedOutput: 'Cadastro realizado\nErros: Nome muito curto, Email invalido, Senha fraca',
          },
        ],
      },
    ],
  },
};
