export type ProjectArea = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'dados' | 'devops';
export type ProjectLevel = 'junior' | 'pleno' | 'senior';

export interface RealProject {
  id: string;
  title: string;
  client: string;
  clientBio: string;
  area: ProjectArea[];
  level: ProjectLevel;
  duration: string;
  techStack: string[];
  problem: string;
  requirements: string[];
  nonFunctional: string[];
  acceptanceCriteria: string[];
  bonus?: string[];
  color: string;
  emoji: string;
}

const realProjects: RealProject[] = [
  {
    id: 'rp-01',
    title: 'Sistema de Agendamento para Clínica',
    client: 'Clínica Bem-Estar Saúde',
    clientBio: 'Clínica médica multidisciplinar com 12 especialidades e 3 unidades em São Paulo.',
    area: ['fullstack'],
    level: 'junior',
    duration: '2-3 semanas',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    problem:
      'A clínica realiza todos os agendamentos por telefone, o que gera filas de espera, cancelamentos de última hora e conflitos de horário entre médicos. A recepção gasta em média 4 horas por dia apenas gerenciando a agenda de forma manual. Precisamos de um sistema web que permita que pacientes agendem consultas online e que a equipe visualize e gerencie a agenda em tempo real.',
    requirements: [
      'Pacientes devem poder criar conta, fazer login e visualizar sua agenda de consultas.',
      'O sistema deve exibir os horários disponíveis por médico e especialidade.',
      'Pacientes devem poder agendar, remarcar e cancelar consultas com até 24h de antecedência.',
      'Recepcionistas devem ter um painel administrativo para gerenciar todos os agendamentos.',
      'O sistema deve enviar e-mail de confirmação e lembrete 1 dia antes da consulta.',
      'Deve ser possível bloquear horários por férias, feriados ou ausência do médico.',
    ],
    nonFunctional: [
      'O sistema deve suportar até 500 usuários simultâneos sem degradação de performance.',
      'A interface deve ser responsiva e funcionar bem em dispositivos móveis.',
      'Dados dos pacientes devem ser armazenados em conformidade com a LGPD.',
    ],
    acceptanceCriteria: [
      'Um paciente consegue agendar uma consulta em menos de 3 minutos sem assistência.',
      'Dois pacientes não podem agendar o mesmo horário com o mesmo médico.',
      'O painel da recepção exibe a agenda do dia em tempo real com atualização automática.',
      'E-mails de confirmação são enviados em até 2 minutos após o agendamento.',
      'O sistema impede cancelamentos fora do prazo de 24 horas.',
    ],
    bonus: [
      'Integração com Google Calendar para sincronização automática da agenda dos médicos.',
      'Sistema de fila de espera para horários mais disputados.',
      'Relatório mensal de taxa de cancelamentos por médico.',
    ],
    color: '#10b981',
    emoji: '🏥',
  },
  {
    id: 'rp-02',
    title: 'API de E-commerce com Pagamentos',
    client: 'ModaRápida Ltda.',
    clientBio: 'Loja de moda online com catálogo de 5.000 produtos e presença em 8 estados brasileiros.',
    area: ['backend'],
    level: 'pleno',
    duration: '3-4 semanas',
    techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Stripe'],
    problem:
      'A ModaRápida possui um site de e-commerce legado com uma API monolítica que apresenta quedas frequentes durante promoções e datas sazonais como Black Friday. O time de frontend foi refatorado para React mas a API atual não suporta as necessidades modernas de performance e integração com gateways de pagamento mais robustos. Precisamos de uma nova API REST bem documentada, segura e escalável.',
    requirements: [
      'CRUD completo de produtos, categorias, estoque e imagens com suporte a variantes (cor, tamanho).',
      'Sistema de autenticação com JWT, refresh tokens e suporte a login social (Google, Facebook).',
      'Integração com Stripe para processar pagamentos, reembolsos e webhooks.',
      'Carrinho de compras persistente com suporte a cupons de desconto e frete calculado por CEP.',
      'Sistema de pedidos com rastreamento de status e histórico completo.',
      'Documentação da API com Swagger/OpenAPI atualizada automaticamente.',
    ],
    nonFunctional: [
      'A API deve responder em até 200ms para 95% das requisições em condições normais.',
      'Dados sensíveis de pagamento nunca devem ser armazenados diretamente (PCI-DSS).',
      'Deve usar cache Redis para produtos populares, reduzindo carga no banco de dados.',
    ],
    acceptanceCriteria: [
      'Um pedido completo (produto → carrinho → pagamento → confirmação) funciona de ponta a ponta.',
      'Webhooks do Stripe atualizam o status do pedido automaticamente.',
      'A API suporta 1.000 requisições por segundo em teste de carga sem erros 5xx.',
      'Toda rota protegida retorna 401 para tokens inválidos ou expirados.',
    ],
    bonus: [
      'Sistema de recomendação de produtos baseado em histórico de compras.',
      'Endpoint de relatório de vendas por período, categoria e região.',
      'Rate limiting por IP para proteger contra abuso.',
    ],
    color: '#8b5cf6',
    emoji: '🛒',
  },
  {
    id: 'rp-03',
    title: 'Dashboard de Analytics para SaaS',
    client: 'MetricaFlow',
    clientBio: 'Startup de automação de marketing B2B com mais de 200 clientes ativos e crescimento de 30% ao mês.',
    area: ['frontend'],
    level: 'pleno',
    duration: '2-3 semanas',
    techStack: ['React', 'TypeScript', 'Recharts', 'TanStack Query', 'Tailwind CSS'],
    problem:
      'Os clientes da MetricaFlow acessam dados de performance de suas campanhas de marketing por meio de relatórios exportados em PDF — um processo manual e demorado que gera insatisfação e alto churn. O time de backend já entrega uma API REST com todos os dados necessários, mas não existe uma interface de visualização adequada. Precisamos de um dashboard interativo e responsivo que transforme dados brutos em insights visuais acionáveis.',
    requirements: [
      'Dashboard principal com KPIs em tempo real: taxa de conversão, CAC, LTV, MRR e churn rate.',
      'Gráficos de linha para evolução temporal com zoom e seletor de período customizável.',
      'Mapa de calor de atividade por hora e dia da semana.',
      'Tabela de funil de conversão com drill-down por etapa e segmento.',
      'Comparativo entre períodos (ex.: essa semana vs. semana anterior).',
      'Exportação de qualquer gráfico ou tabela como PNG, CSV ou PDF.',
    ],
    nonFunctional: [
      'O dashboard deve carregar os dados iniciais em menos de 1.5 segundos.',
      'Deve funcionar corretamente em Chrome, Firefox e Safari nas últimas 2 versões.',
      'Suporte a modo escuro e claro conforme preferência do sistema operacional.',
    ],
    acceptanceCriteria: [
      'Todos os gráficos atualizam automaticamente quando o período selecionado muda.',
      'O filtro de segmento aplica-se a todos os componentes do dashboard simultaneamente.',
      'A exportação de CSV contém os mesmos dados exibidos no componente de tabela.',
      'Em telas menores que 768px, o layout reorganiza os cards em coluna única.',
    ],
    bonus: [
      'Alertas configuráveis por e-mail quando uma métrica ultrapassa um threshold.',
      'Modo de apresentação full-screen com atualização automática para TVs de escritório.',
      'Compartilhamento de dashboard por link público com expiração.',
    ],
    color: '#3b82f6',
    emoji: '📊',
  },
  {
    id: 'rp-04',
    title: 'App de Delivery Mobile',
    client: 'SaborNaMão',
    clientBio: 'Rede de restaurantes fast-casual com 18 unidades no interior de São Paulo buscando digitalizar seus pedidos.',
    area: ['mobile'],
    level: 'pleno',
    duration: '4-6 semanas',
    techStack: ['React Native', 'Expo', 'Firebase', 'Google Maps API', 'Stripe'],
    problem:
      'A SaborNaMão depende exclusivamente de plataformas de delivery de terceiros (iFood, Rappi) e paga comissões de até 30% por pedido, o que corrói drasticamente a margem do negócio. A empresa quer lançar seu próprio aplicativo de delivery para fidelizar clientes diretos e recuperar a margem. O desafio é entregar uma experiência de usuário equivalente às grandes plataformas.',
    requirements: [
      'Tela de cardápio com categorias, fotos dos pratos, preços e tempo estimado de preparo.',
      'Carrinho de compras com personalização de itens (ex.: sem cebola, ponto da carne).',
      'Rastreamento em tempo real do pedido com mapa e status atualizado.',
      'Histórico de pedidos com opção de repetir o pedido anterior.',
      'Pagamento via cartão de crédito, PIX e vale-refeição.',
      'Programa de fidelidade com pontos por pedido e resgates.',
    ],
    nonFunctional: [
      'O app deve funcionar em iOS 14+ e Android 10+ sem degradação perceptível.',
      'O tempo de abertura do app (cold start) deve ser menor que 3 segundos.',
      'O mapa de rastreamento deve atualizar a posição do entregador a cada 10 segundos.',
    ],
    acceptanceCriteria: [
      'Um usuário consegue finalizar um pedido desde o cardápio até a confirmação de pagamento em menos de 2 minutos.',
      'O status do pedido muda para "Em preparo" em até 30 segundos após confirmação do restaurante.',
      'A notificação push chega ao usuário em cada mudança de status do pedido.',
      'O programa de fidelidade exibe o saldo correto após cada pedido concluído.',
    ],
    bonus: [
      'Suporte a múltiplos endereços de entrega salvos no perfil do usuário.',
      'Sistema de avaliação do pedido com fotos e comentários.',
      'Modo offline que exibe o cardápio mesmo sem conexão.',
    ],
    color: '#f59e0b',
    emoji: '🍔',
  },
  {
    id: 'rp-05',
    title: 'Pipeline de Dados para Startup de Fintech',
    client: 'CreditoJá',
    clientBio: 'Fintech de crédito pessoal que processa mais de 10.000 solicitações de empréstimo por mês usando análise de dados.',
    area: ['dados'],
    level: 'pleno',
    duration: '3-5 semanas',
    techStack: ['Python', 'Apache Airflow', 'dbt', 'BigQuery', 'Looker Studio'],
    problem:
      'A equipe de data science da CreditoJá passa 60% do tempo limpando e preparando dados manualmente a partir de CSVs exportados de diferentes sistemas (CRM, banco de dados operacional, APIs de bureaus de crédito). Isso atrasa a análise de risco e prejudica decisões de crédito. Precisamos de um pipeline automatizado e confiável que centralize, limpe e transforme os dados diariamente, disponibilizando tabelas prontas para consumo.',
    requirements: [
      'Ingestão automática diária de dados do banco operacional PostgreSQL, CRM HubSpot e API da Serasa.',
      'Camada de staging com validação e limpeza dos dados brutos (deduplicação, normalização de CPF, etc.).',
      'Camada de transformação com modelos dbt para calcular score de risco, PD (probabilidade de default) e LGD.',
      'Data mart de clientes com histórico de empréstimos, pagamentos e inadimplência.',
      'Alertas automáticos por e-mail quando pipelines falham ou quando anomalias são detectadas nos dados.',
      'Dashboard no Looker Studio conectado ao BigQuery com métricas de carteira de crédito.',
    ],
    nonFunctional: [
      'O pipeline completo deve terminar em até 2 horas para processar o volume diário.',
      'Toda transformação deve ter testes automatizados de qualidade de dados (não nulos, unicidade, referências).',
      'O histórico completo de execuções deve ser auditável via logs centralizados.',
    ],
    acceptanceCriteria: [
      'As tabelas finais no BigQuery refletem os dados do dia anterior até as 06h00.',
      'Falha em qualquer etapa dispara alerta e não propaga dados corrompidos para camadas seguintes.',
      'Os modelos dbt passam em todos os testes de qualidade definidos para os dados de produção.',
      'O dashboard de carteira exibe inadimplência por faixa de score com atualização diária.',
    ],
    bonus: [
      'Implementação de Data Lineage para rastrear a origem de cada campo nas tabelas finais.',
      'Comparativo automatizado entre scorecards antigos e novos após cada alteração de modelo.',
      'Suporte a re-processamento histórico de qualquer data específica via Airflow.',
    ],
    color: '#06b6d4',
    emoji: '🔬',
  },
  {
    id: 'rp-06',
    title: 'Sistema de Autenticação OAuth + JWT',
    client: 'StackHub Tecnologia',
    clientBio: 'Software house que desenvolve múltiplos produtos SaaS e precisa de um sistema de identidade centralizado.',
    area: ['backend'],
    level: 'junior',
    duration: '2-3 semanas',
    techStack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Passport.js'],
    problem:
      'A StackHub possui 4 produtos SaaS diferentes, cada um com seu próprio sistema de autenticação implementado de forma inconsistente. Usuários precisam de contas separadas para cada produto, senhas diferentes e não há Single Sign-On. Isso gera atritos no onboarding e aumenta os chamados de suporte com redefinições de senha. Precisamos de um serviço centralizado de autenticação que todos os produtos possam usar.',
    requirements: [
      'Registro e login com e-mail/senha com validação de força de senha e e-mail de verificação.',
      'Login social com Google e GitHub via OAuth 2.0.',
      'Emissão de access tokens JWT (15min) e refresh tokens seguros (30 dias).',
      'Endpoint de revogação de tokens e sessão ativa (logout de todos os dispositivos).',
      'Fluxo completo de recuperação de senha via e-mail com token de uso único.',
      'Rate limiting por IP para evitar brute force nos endpoints de autenticação.',
    ],
    nonFunctional: [
      'Senhas devem ser armazenadas com bcrypt (fator de custo mínimo 12).',
      'Refresh tokens devem ser armazenados no Redis com TTL correto e rotação automática.',
      'Logs de tentativas de login (sucesso e falha) devem ser mantidos por 90 dias.',
    ],
    acceptanceCriteria: [
      'Um usuário consegue se registrar, verificar o e-mail e fazer login em menos de 3 minutos.',
      'Após revogar sessão, o access token antigo retorna 401 em todas as requisições.',
      'Após 5 tentativas de login falhas, o IP é bloqueado por 15 minutos.',
      'O fluxo OAuth com Google funciona sem erros no navegador e retorna token válido.',
    ],
    bonus: [
      'Autenticação por dois fatores (2FA) via TOTP (Google Authenticator).',
      'Painel de administração para listar, suspender e revogar usuários.',
      'Webhook para notificar produtos externos sobre eventos de login suspeito.',
    ],
    color: '#ef4444',
    emoji: '🔐',
  },
  {
    id: 'rp-07',
    title: 'Plataforma de Streaming de Vídeo',
    client: 'EduStream Brasil',
    clientBio: 'Plataforma de cursos online focada em profissionalização técnica com 50.000 alunos ativos.',
    area: ['fullstack'],
    level: 'senior',
    duration: '6-8 semanas',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'AWS S3', 'CloudFront', 'FFmpeg', 'PostgreSQL'],
    problem:
      'A EduStream entrega seus vídeos diretamente de um servidor dedicado que frequentemente fica sobrecarregado durante picos de acesso (lançamentos de cursos, Black Friday). O processo de upload de novos vídeos pelos instrutores é manual e demorado, e não há transcodificação automática para diferentes qualidades. O player tem altos índices de buffering em conexões lentas. Precisamos de uma solução profissional de armazenamento, transcodificação e entrega de vídeo.',
    requirements: [
      'Upload de vídeo pelos instrutores com progresso em tempo real e validação de formato.',
      'Pipeline de transcodificação automática para múltiplas qualidades (360p, 720p, 1080p) via FFmpeg.',
      'Player de vídeo adaptativo (HLS) com seleção automática de qualidade baseada na banda.',
      'Proteção de conteúdo: URLs assinadas com expiração para vídeos pagos.',
      'Rastreamento de progresso do aluno por vídeo com retomada do ponto de parada.',
      'Painel do instrutor para gerenciar cursos, capítulos, vídeos e visualizar analytics de engajamento.',
    ],
    nonFunctional: [
      'A transcodificação de um vídeo de 1 hora deve ser concluída em menos de 30 minutos.',
      'O player deve iniciar a reprodução em menos de 2 segundos em conexão de 10 Mbps.',
      'O CDN (CloudFront) deve servir o conteúdo com menos de 50ms de latência para usuários no Brasil.',
    ],
    acceptanceCriteria: [
      'Um instrutor faz upload de um vídeo e em 30 minutos ele está disponível em todas as qualidades.',
      'Um aluno sem acesso pago recebe 403 ao tentar acessar a URL do vídeo diretamente.',
      'O progresso do aluno é salvo automaticamente a cada 30 segundos durante a reprodução.',
      'O player troca de qualidade automaticamente sem interrupção perceptível em conexão instável.',
    ],
    bonus: [
      'Geração automática de legendas por IA usando AWS Transcribe.',
      'Miniaturas (thumbnails) de pré-visualização geradas automaticamente a cada 10 segundos do vídeo.',
      'Suporte a transmissão ao vivo (live stream) com chat integrado.',
    ],
    color: '#ec4899',
    emoji: '🎬',
  },
  {
    id: 'rp-08',
    title: 'Chatbot de Atendimento com IA',
    client: 'SuporteRápido Soluções',
    clientBio: 'Empresa de terceirização de suporte ao cliente que atende mais de 30 marcas de e-commerce simultâneamente.',
    area: ['fullstack'],
    level: 'pleno',
    duration: '3-5 semanas',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Socket.io'],
    problem:
      'O time de atendimento da SuporteRápido recebe mais de 2.000 tickets por dia, dos quais 65% são perguntas repetitivas sobre status de pedido, política de devolução e prazo de entrega — temas que poderiam ser resolvidos automaticamente. Os atendentes humanos ficam sobrecarregados e o tempo médio de resposta é de 4 horas. Precisamos de um chatbot inteligente que resolva dúvidas simples automaticamente e escale para humanos apenas os casos complexos.',
    requirements: [
      'Widget de chat embarcável (iframe/script) para ser instalado em qualquer e-commerce cliente.',
      'Integração com OpenAI GPT para resposta contextual com base em documentos de FAQ do cliente.',
      'Consulta em tempo real ao sistema de pedidos via API REST configurável por cliente.',
      'Transferência para atendente humano com histórico completo da conversa quando necessário.',
      'Painel de monitoramento para supervisores com conversas em tempo real e métricas.',
      'Treinamento customizável: cada cliente pode fazer upload de PDFs e textos como base de conhecimento.',
    ],
    nonFunctional: [
      'O chatbot deve responder em menos de 3 segundos para 90% das mensagens.',
      'O widget deve carregar em menos de 500ms e não impactar o desempenho do site hospedeiro.',
      'Conversas devem ser armazenadas criptografadas e acessíveis por 1 ano.',
    ],
    acceptanceCriteria: [
      'O chatbot responde corretamente a perguntas sobre política de devolução usando o FAQ do cliente.',
      'A consulta de status de pedido por número retorna o status correto em até 2 segundos.',
      'Ao transferir para humano, o atendente vê todo o histórico da conversa imediatamente.',
      'O painel do supervisor exibe métricas de satisfação, tempo médio e taxa de resolução automática.',
    ],
    bonus: [
      'Suporte a múltiplos idiomas detectado automaticamente.',
      'Análise de sentimento das conversas para identificar clientes insatisfeitos.',
      'Integração com WhatsApp Business API para atendimento via WhatsApp.',
    ],
    color: '#14b8a6',
    emoji: '🤖',
  },
  {
    id: 'rp-09',
    title: 'Sistema de Monitoramento DevOps',
    client: 'InfraCore Cloud',
    clientBio: 'Empresa de managed services que administra a infraestrutura de nuvem de mais de 80 clientes corporativos.',
    area: ['devops'],
    level: 'senior',
    duration: '5-7 semanas',
    techStack: ['Prometheus', 'Grafana', 'Kubernetes', 'Terraform', 'Python', 'Alertmanager'],
    problem:
      'A InfraCore gerencia múltiplos clusters Kubernetes e dezenas de serviços em AWS e GCP para seus clientes. Atualmente, os alertas de incidentes chegam por e-mail sem priorização e a equipe de plantão frequentemente é acordada por falsos positivos de baixa criticidade. Não existe uma visão unificada do estado de saúde de todos os clientes. Precisamos de um sistema de observabilidade robusto com alertas inteligentes e runbooks automatizados.',
    requirements: [
      'Stack completa de observabilidade: métricas (Prometheus), logs (Loki), traces (Tempo) e dashboards (Grafana).',
      'Alertas com múltiplos níveis de severidade (P1 a P4) e roteamento inteligente por horário e time de plantão.',
      'Runbooks automatizados para os 10 incidentes mais comuns (ex.: pod crashloop, disco cheio, OOM).',
      'Multi-tenant: cada cliente vê apenas seus próprios dados no Grafana com RBAC configurado.',
      'Relatório SLA mensal gerado automaticamente por cliente com métricas de uptime e MTTR.',
      'Integração com PagerDuty, Slack e Microsoft Teams para notificações.',
    ],
    nonFunctional: [
      'O stack de observabilidade deve ter disponibilidade de 99.9% (não pode cair junto com o monitorado).',
      'Métricas devem ser retidas por 90 dias com downsampling automático para dados mais antigos.',
      'O sistema deve suportar 500 nós Kubernetes com coleta de métricas a cada 15 segundos.',
    ],
    acceptanceCriteria: [
      'Um alerta P1 aciona o plantão via PagerDuty em menos de 2 minutos após o evento.',
      'Falsos positivos (alertas que se resolvem em menos de 5 minutos) não acionam o plantão fora do horário comercial.',
      'O runbook de pod crashloop resolve o problema automaticamente em 80% dos casos sem intervenção humana.',
      'Cada cliente consegue acessar apenas seus próprios dashboards e métricas no Grafana.',
    ],
    bonus: [
      'Anomaly detection com machine learning para detectar comportamentos anômalos antes de causar falha.',
      'Cost Explorer integrado mostrando custo de cloud por cliente e serviço em tempo real.',
      'Chaos engineering automatizado com relatório de resiliência mensal.',
    ],
    color: '#f97316',
    emoji: '🖥️',
  },
  {
    id: 'rp-10',
    title: 'App de Gestão Financeira Pessoal',
    client: 'FinançasClaras',
    clientBio: 'Startup de educação financeira que oferece conteúdo gratuito e planeja monetizar com ferramentas premium.',
    area: ['fullstack'],
    level: 'junior',
    duration: '2-3 semanas',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    problem:
      'A maioria dos usuários da FinançasClaras ainda gerencia seus gastos em planilhas Excel desorganizadas ou simplesmente não controla as finanças. O aplicativo de gestão financeira atual da empresa é uma PWA descontinuada com bugs críticos e visual desatualizado. Precisamos de uma nova versão moderna que engaje os usuários no hábito de registrar transações diariamente e visualizar a saúde financeira de forma clara.',
    requirements: [
      'Registro de transações (receitas e despesas) com categorias, valor, data e descrição opcional.',
      'Dashboard com saldo atual, gráfico de gastos por categoria do mês e evolução do saldo.',
      'Metas de economia mensais por categoria com progresso visual.',
      'Relatório mensal comparando gastos previstos versus realizados.',
      'Importação de extrato bancário em formato OFX ou CSV.',
      'Alertas quando o gasto em uma categoria ultrapassa o orçamento definido.',
    ],
    nonFunctional: [
      'O aplicativo deve funcionar como PWA instalável no celular com suporte a modo offline para leitura.',
      'Dados financeiros do usuário devem ser criptografados em repouso.',
      'A interface deve ser simples o suficiente para usuários sem familiaridade com tecnologia.',
    ],
    acceptanceCriteria: [
      'Um usuário registra uma nova transação em menos de 30 segundos.',
      'O dashboard reflete imediatamente uma nova transação sem necessidade de recarregar a página.',
      'A importação de extrato OFX reconhece e categoriza corretamente pelo menos 70% das transações.',
      'O relatório mensal está disponível para download em PDF com todos os dados do mês.',
    ],
    bonus: [
      'Integração com Open Finance para importação automática de transações bancárias.',
      'Assistente financeiro com dicas personalizadas baseadas no perfil de gastos.',
      'Modo família com compartilhamento de orçamento entre membros.',
    ],
    color: '#22c55e',
    emoji: '💰',
  },
  {
    id: 'rp-11',
    title: 'Marketplace de Freelancers',
    client: 'TalentoBR',
    clientBio: 'Plataforma de conexão entre empresas brasileiras e profissionais freelancers de tecnologia e criação.',
    area: ['fullstack'],
    level: 'senior',
    duration: '6-10 semanas',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Stripe Connect'],
    problem:
      'O mercado de freelancers de tecnologia no Brasil é fragmentado entre plataformas internacionais (Upwork, Fiverr) que cobram altas taxas e não se adaptam às particularidades do mercado local (PIX, NF-e, contratos CLT PJ). A TalentoBR quer criar o maior marketplace nacional de freelancers, focado em transparência, pagamentos locais e proteção para ambos os lados da negociação.',
    requirements: [
      'Cadastro e perfil completo para freelancers com portfólio, habilidades, certificados e taxa horária.',
      'Sistema de busca avançada com Elasticsearch por habilidade, localização, disponibilidade e preço.',
      'Publicação de projetos pelas empresas com briefing, orçamento e prazo.',
      'Sistema de propostas: freelancers enviam propostas com valor e cronograma, empresas selecionam.',
      'Pagamento seguro via escrow: empresa paga antes, freelancer recebe após aprovação da entrega.',
      'Sistema de avaliação bidirecional com notas e comentários públicos após cada projeto.',
    ],
    nonFunctional: [
      'A busca de freelancers deve retornar resultados em menos de 500ms mesmo com 100.000 perfis.',
      'O sistema de escrow deve ser auditável e ter tratamento de disputas com prazo de resolução definido.',
      'A plataforma deve estar em conformidade com a legislação trabalhista brasileira (PJ, emissão de NF).',
    ],
    acceptanceCriteria: [
      'Uma empresa publica um projeto e recebe pelo menos uma proposta dentro de 24 horas no ambiente de teste.',
      'O pagamento fica retido em escrow e é liberado apenas após a empresa marcar o projeto como concluído.',
      'A avaliação de um freelancer aparece publicamente no perfil em menos de 5 minutos após envio.',
      'A busca por "desenvolvedor React São Paulo" retorna perfis relevantes com score de correspondência.',
    ],
    bonus: [
      'Sistema de contratos digitais com assinatura eletrônica integrada.',
      'Plano premium para freelancers com badge verificado e destaque nos resultados de busca.',
      'Dashboard analítico para freelancers com métricas de visualizações de perfil, taxa de proposta aceita e faturamento.',
    ],
    color: '#a855f7',
    emoji: '🤝',
  },
  {
    id: 'rp-12',
    title: 'Sistema de Notificações em Tempo Real',
    client: 'PulseNotify',
    clientBio: 'Infraestrutura SaaS que oferece serviço de notificações como serviço (NaaS) para aplicativos de terceiros.',
    area: ['backend'],
    level: 'pleno',
    duration: '3-4 semanas',
    techStack: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Socket.io', 'FCM', 'APNS'],
    problem:
      'A PulseNotify precisa de um sistema de notificações central que sirva múltiplos canais (push mobile, e-mail, SMS, WebSocket in-app) com um único ponto de entrada via API. O sistema atual envia notificações de forma síncrona, causando timeouts nos clientes quando os provedores externos estão lentos. Além disso, não há rastreamento de entrega, o que impede análise de engajamento pelos clientes da PulseNotify.',
    requirements: [
      'API REST para envio de notificações com suporte a canal único ou multicanal simultâneo.',
      'Fila assíncrona com retry automático e backoff exponencial para falhas de entrega.',
      'Suporte a push notifications via FCM (Android) e APNS (iOS) com templates configuráveis.',
      'Canal WebSocket para notificações in-app em tempo real com reconexão automática.',
      'Rastreamento completo do ciclo de vida: enviado, entregue, visualizado, clicado.',
      'Agendamento de notificações para horário futuro com cancelamento possível até o momento do envio.',
    ],
    nonFunctional: [
      'O sistema deve processar 10.000 notificações por minuto em horário de pico.',
      'A latência entre receber o pedido de notificação e o início do processamento deve ser menor que 100ms.',
      'Taxa de entrega mínima de 99% para notificações sem falha do provedor externo.',
    ],
    acceptanceCriteria: [
      'Uma notificação enviada via API chega ao dispositivo mobile em menos de 5 segundos.',
      'Falha em um canal (ex.: FCM offline) não impede a entrega pelos outros canais configurados.',
      'O webhook de status notifica o cliente quando uma notificação é visualizada pelo usuário final.',
      'Notificações agendadas são enviadas com precisão de ±1 minuto do horário configurado.',
    ],
    bonus: [
      'Segmentação de usuários por atributos para envio de campanhas em lote.',
      'Análise de horário de maior engajamento por usuário para otimização automática.',
      'SDK JavaScript e Python para facilitar a integração pelos clientes da PulseNotify.',
    ],
    color: '#f43f5e',
    emoji: '🔔',
  },
];

export default realProjects;
