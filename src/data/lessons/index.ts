import { Lesson } from '@/types/lesson';

// Estrutura de Pensamento
import { lesson as comoPensarComoDev } from './estrutura-pensamento/como-pensar-como-dev';
import { lesson as decomposicaoNaPratica } from './estrutura-pensamento/decomposicao-na-pratica';
import { lesson as abstracaoEModelosMentais } from './estrutura-pensamento/abstracao-e-modelos-mentais';
import { lesson as diagramasEFluxogramas } from './estrutura-pensamento/diagramas-e-fluxogramas';
import { lesson as documentandoOPensamento } from './estrutura-pensamento/documentando-o-pensamento';
import { lesson as projetoEstruturaPensamento } from './estrutura-pensamento/projeto-estrutura-pensamento';

// Leitura de Codigo
import { lesson as comoAbordarCodigoDesconhecido } from './leitura-codigo/como-abordar-codigo-desconhecido';
import { lesson as rastreandoFluxoDeExecucao } from './leitura-codigo/rastreando-fluxo-de-execucao';
import { lesson as reconhecendoPadroesComuns } from './leitura-codigo/reconhecendo-padroes-comuns';
import { lesson as lendoCodigoDeProducao } from './leitura-codigo/lendo-codigo-de-producao';
import { lesson as refatorandoCodigoAlheio } from './leitura-codigo/refatorando-codigo-alheio';
import { lesson as projetoLeituraCodigo } from './leitura-codigo/projeto-leitura-codigo';

// Resolucao de Problemas
import { lesson as entendendoOProblema } from './resolucao-problemas/entendendo-o-problema';
import { lesson as dividirParaConquistar } from './resolucao-problemas/dividir-para-conquistar';
import { lesson as padroesEReutilizacao } from './resolucao-problemas/padroes-e-reutilizacao';
import { lesson as debuggingComoRaciocinio } from './resolucao-problemas/debugging-como-raciocinio';
import { lesson as otimizandoSolucoes } from './resolucao-problemas/otimizando-solucoes';
import { lesson as projetoResolucaoProblemas } from './resolucao-problemas/projeto-resolucao-problemas';

// Pensamento em Sistemas
import { lesson as oQueEUmSistema } from './pensamento-sistemas/o-que-e-um-sistema';
import { lesson as decomposicaoDeSistemas } from './pensamento-sistemas/decomposicao-de-sistemas';
import { lesson as fluxoDeDados } from './pensamento-sistemas/fluxo-de-dados';
import { lesson as interfacesEContratos } from './pensamento-sistemas/interfaces-e-contratos';
import { lesson as tradeOffEmSistemas } from './pensamento-sistemas/trade-offs-em-sistemas';
import { lesson as escalabilidadeBasica } from './pensamento-sistemas/escalabilidade-basica';
import { lesson as projetoDesenhando } from './pensamento-sistemas/projeto-desenhando-um-sistema';

// VS Code
import { lesson as interfaceENavegacao } from './vscode/interface-e-navegacao';
import { lesson as extensoesEssenciais } from './vscode/extensoes-essenciais';
import { lesson as atalhosProdutividade } from './vscode/atalhos-e-produtividade';
import { lesson as debugIntegrado } from './vscode/debug-integrado';
import { lesson as terminalIntegrado } from './vscode/terminal-integrado';
import { lesson as projetoConfigurandoAmbienteVscode } from './vscode/projeto-configurando-ambiente-vscode';

// Ambientes e Ferramentas
import { lesson as ambientesVirtuaisPython } from './ambientes-ferramentas/ambientes-virtuais-python';
import { lesson as gerenciadoresDePacotes } from './ambientes-ferramentas/gerenciadores-de-pacotes';
import { lesson as variaveisDeAmbiente } from './ambientes-ferramentas/variaveis-de-ambiente';
import { lesson as makefileEAutomacao } from './ambientes-ferramentas/makefile-e-automacao';
import { lesson as projetoAmbienteProfissional } from './ambientes-ferramentas/projeto-ambiente-profissional';

// Docker
import { lesson as oQueEDocker } from './docker/o-que-e-docker';
import { lesson as primeiroPassosComDocker } from './docker/primeiros-passos-com-docker';
import { lesson as criandoImagensComDockerfile } from './docker/criando-imagens-com-dockerfile';
import { lesson as volumesEVariaveis } from './docker/volumes-e-variaveis';
import { lesson as dockerCompose } from './docker/docker-compose';
import { lesson as projetoDockerizandoAplicacao } from './docker/projeto-dockerizando-aplicacao';

// CI/CD com GitHub Actions
import { lesson as oQueECicd } from './cicd/o-que-e-cicd';
import { lesson as githubActionsPrimeirosPassos } from './cicd/github-actions-primeiros-passos';
import { lesson as rodandoTestesNoCi } from './cicd/rodando-testes-no-ci';
import { lesson as variaveisESecrets } from './cicd/variaveis-e-secrets';
import { lesson as projetoPipelineCompleto } from './cicd/projeto-pipeline-completo';

// Debugging e Testes
import { lesson as oQueEDebugging } from './debugging-testes/o-que-e-debugging';
import { lesson as lendoErrosEStackTraces } from './debugging-testes/lendo-erros-e-stack-traces';
import { lesson as ferramentasDeDebug } from './debugging-testes/ferramentas-de-debug';
import { lesson as introducaoATestes } from './debugging-testes/introducao-a-testes';
import { lesson as testesUnitariosComPytest } from './debugging-testes/testes-unitarios-com-pytest';
import { lesson as projetoDebugandoETestando } from './debugging-testes/projeto-debugando-e-testando';

// Boas Praticas e Padroes
import { lesson as nomenclaturaEClareza } from './boas-praticas/nomenclatura-e-clareza';
import { lesson as funcoesEResponsabilidadeUnica } from './boas-praticas/funcoes-e-responsabilidade-unica';
import { lesson as estruturaDeProjetos } from './boas-praticas/estrutura-de-projetos';
import { lesson as padroesDeProjetos } from './boas-praticas/padroes-de-design';
import { lesson as codigoLimpoNaPratica } from './boas-praticas/codigo-limpo-na-pratica';
import { lesson as projetoRefatoracaoCompleta } from './boas-praticas/projeto-refatoracao-completa';

// Arquitetura de Software
import { lesson as oQueEArquitetura } from './arquitetura-software/o-que-e-arquitetura';
import { lesson as principiosSolid } from './arquitetura-software/principios-solid';
import { lesson as padroesDeProjeto } from './arquitetura-software/padroes-de-projeto';
import { lesson as mvcECamadas } from './arquitetura-software/mvc-e-camadas';
import { lesson as cleanCode } from './arquitetura-software/clean-code';
import { lesson as projetoArquitetura } from './arquitetura-software/projeto-arquitetura';
import { lesson as estilosArquiteturais } from './arquitetura-software/estilos-arquiteturais';
import { lesson as arquiteturaHexagonal } from './arquitetura-software/arquitetura-hexagonal';
import { lesson as eventDriven } from './arquitetura-software/event-driven';
import { lesson as domainDrivenDesign } from './arquitetura-software/domain-driven-design';
import { lesson as decisoesDeArquitetura } from './arquitetura-software/decisoes-de-arquitetura';

// Intro
import { lesson as oQueEProgramacao } from './intro/o-que-e-programacao';
import { lesson as comoComputadoresFuncionam } from './intro/como-computadores-funcionam';
import { lesson as sistemaBinario } from './intro/sistema-binario';
import { lesson as logicaDeProgramacao } from './intro/logica-de-programacao';
import { lesson as gitEControleDeVersao } from './intro/git-e-controle-de-versao';
import { lesson as projetoGuiadoIntro } from './intro/projeto-guiado-intro';
import { lesson as projetoLivreIntro } from './intro/projeto-livre-intro';

// Python
import { lesson as projetoGuiadoPython } from './python/projeto-guiado-python';
import { lesson as projetoLivrePython } from './python/projeto-livre-python';
import { lesson as variaveisETipos } from './python/variaveis-e-tipos';
import { lesson as operadores } from './python/operadores';
import { lesson as condicionais } from './python/condicionais';
import { lesson as lacosDeRepeticao } from './python/lacos-de-repeticao';
import { lesson as funcoes } from './python/funcoes';
import { lesson as listas } from './python/listas';
import { lesson as strings } from './python/strings';
import { lesson as dicionariosETuplas } from './python/dicionarios-e-tuplas';
import { lesson as tratamentoDeErros } from './python/tratamento-de-erros';
import { lesson as classesEObjetos } from './python/classes-e-objetos';
import { lesson as arquivos } from './python/arquivos';
import { lesson as modulosEImports } from './python/modulos-e-imports';

// C
import { lesson as projetoGuiadoC } from './c/projeto-guiado-c';
import { lesson as projetoLivreC } from './c/projeto-livre-c';
import { lesson as primeiroProgramaEmC } from './c/primeiro-programa-em-c';
import { lesson as variaveisETiposEmC } from './c/variaveis-e-tipos-em-c';
import { lesson as operadoresEmC } from './c/operadores-em-c';
import { lesson as condicionaisEmC } from './c/condicionais-em-c';
import { lesson as lacosEmC } from './c/lacos-em-c';
import { lesson as funcoesEmC } from './c/funcoes-em-c';
import { lesson as ponteiros } from './c/ponteiros';
import { lesson as memoriaEAlocacao } from './c/memoria-e-alocacao';
import { lesson as structs } from './c/structs';
import { lesson as arquivosEmC } from './c/arquivos-em-c';
import { lesson as preprocessador } from './c/preprocessador';
import { lesson as compilacao } from './c/compilacao';

// Estruturas de Dados
import { lesson as projetoGuiadoEstruturas } from './estruturas/projeto-guiado-estruturas';
import { lesson as projetoLivreEstruturas } from './estruturas/projeto-livre-estruturas';
import { lesson as arraysEVetores } from './estruturas/arrays-e-vetores';
import { lesson as pilhasEFilas } from './estruturas/pilhas-e-filas';
import { lesson as listasEncadeadas } from './estruturas/listas-encadeadas';
import { lesson as arvoresBinarias } from './estruturas/arvores-binarias';
import { lesson as tabelasHash } from './estruturas/tabelas-hash';
import { lesson as grafos } from './estruturas/grafos';

// Algoritmos
import { lesson as projetoGuiadoAlgoritmos } from './algoritmos/projeto-guiado-algoritmos';
import { lesson as projetoLivreAlgoritmos } from './algoritmos/projeto-livre-algoritmos';
import { lesson as oQueSaoAlgoritmos } from './algoritmos/o-que-sao-algoritmos';
import { lesson as buscaLinearEBinaria } from './algoritmos/busca-linear-e-binaria';
import { lesson as ordenacaoBasica } from './algoritmos/ordenacao-basica';
import { lesson as recursao } from './algoritmos/recursao';
import { lesson as complexidade } from './algoritmos/complexidade';
import { lesson as programacaoDinamica } from './algoritmos/programacao-dinamica';
import { lesson as algoritmosEmGrafos } from './algoritmos/algoritmos-em-grafos';
import { lesson as algoritmosGulosos } from './algoritmos/algoritmos-gulosos';
import { lesson as backtracking } from './algoritmos/backtracking';
import { lesson as algoritmosDeString } from './algoritmos/algoritmos-de-string';
import { lesson as algoritmosGulososAvancados } from './algoritmos/algoritmos-gulosos-avancados';

// Java
import { lesson as projetoGuiadoJava } from './java/projeto-guiado-java';
import { lesson as projetoLivreJava } from './java/projeto-livre-java';
import { lesson as primeiroProgramaJava } from './java/primeiro-programa-java';
import { lesson as variaveisETiposJava } from './java/variaveis-e-tipos-java';
import { lesson as operadoresJava } from './java/operadores-java';
import { lesson as condicionaisJava } from './java/condicionais-java';
import { lesson as lacosJava } from './java/lacos-java';
import { lesson as metodosJava } from './java/metodos-java';
import { lesson as arraysJava } from './java/arrays-java';
import { lesson as classesEObjetosJava } from './java/classes-e-objetos-java';
import { lesson as excecoesJava } from './java/excecoes-java';

// HTML e CSS
import { lesson as projetoGuiadoHtmlCss } from './html-css/projeto-guiado-html-css';
import { lesson as projetoLivreHtmlCss } from './html-css/projeto-livre-html-css';
import { lesson as introducaoHtml } from './html-css/introducao-html';
import { lesson as textosEListas } from './html-css/textos-e-listas';
import { lesson as linksEImagens } from './html-css/links-e-imagens';
import { lesson as formulariosHtml } from './html-css/formularios-html';
import { lesson as introducaoCss } from './html-css/introducao-css';
import { lesson as boxModelELayout } from './html-css/box-model-e-layout';
import { lesson as flexbox } from './html-css/flexbox';
import { lesson as responsividade } from './html-css/responsividade';

// Backend
import { lesson as projetoGuiadoBackend } from './backend/projeto-guiado-backend';
import { lesson as projetoLivreBackend } from './backend/projeto-livre-backend';
import { lesson as oQueEBackend } from './backend/o-que-e-backend';
import { lesson as apisRest } from './backend/apis-rest';
import { lesson as flaskPrimeiroServidor } from './backend/flask-primeiro-servidor';
import { lesson as rotasEParametros } from './backend/rotas-e-parametros';
import { lesson as bancoDeDadosSqlite } from './backend/banco-de-dados-sqlite';
import { lesson as autenticacao } from './backend/autenticacao';

// Logica de Programacao
import { lesson as projetoGuiadoLogica } from './logica/projeto-guiado-logica';
import { lesson as projetoLivreLogica } from './logica/projeto-livre-logica';
import { lesson as pensamentoComputacional } from './logica/pensamento-computacional';
import { lesson as algoritmosEFluxogramas } from './logica/algoritmos-e-fluxogramas';
import { lesson as pseudocodigo } from './logica/pseudocodigo';
import { lesson as tiposDeDados } from './logica/tipos-de-dados';
import { lesson as operadoresLogica } from './logica/operadores-logica';
import { lesson as operadoresLogicos } from './logica/operadores-logicos';
import { lesson as funcoeseModularizacao } from './logica/funcoes-e-modularizacao';
import { lesson as estruturasDeDecisao } from './logica/estruturas-de-decisao';
import { lesson as estruturasDeRepeticao } from './logica/estruturas-de-repeticao';
import { lesson as vetoresEMatrizes } from './logica/vetores-e-matrizes';
import { lesson as testeDeMesa } from './logica/teste-de-mesa';

// Linux e Terminal
import { lesson as projetoGuiadoLinux } from './linux/projeto-guiado-linux';
import { lesson as projetoLivreLinux } from './linux/projeto-livre-linux';
import { lesson as introducaoLinux } from './linux/introducao-linux';
import { lesson as navegacaoEArquivos } from './linux/navegacao-e-arquivos';
import { lesson as manipulacaoDeTexto } from './linux/manipulacao-de-texto';
import { lesson as permissoesEUsuarios } from './linux/permissoes-e-usuarios';
import { lesson as processosESistema } from './linux/processos-e-sistema';
import { lesson as redirecionamentoEPipes } from './linux/redirecionamento-e-pipes';

// Git Aprofundado
import { lesson as projetoGuiadoGit } from './git/projeto-guiado-git';
import { lesson as projetoLivreGit } from './git/projeto-livre-git';
import { lesson as fundamentosDoGit } from './git/fundamentos-do-git';
import { lesson as branches } from './git/branches';
import { lesson as mergeEConflitos } from './git/merge-e-conflitos';
import { lesson as repositoriosRemotos } from './git/repositorios-remotos';
import { lesson as githubNaPratica } from './git/github-na-pratica';
import { lesson as gitAvancado } from './git/git-avancado';

// SQL e Banco de Dados
import { lesson as projetoGuiadoSql } from './sql/projeto-guiado-sql';
import { lesson as projetoLivreSql } from './sql/projeto-livre-sql';
import { lesson as oQueSaoBancosDeDados } from './sql/o-que-sao-bancos-de-dados';
import { lesson as criandoTabelas } from './sql/criando-tabelas';
import { lesson as inserindoEConsultando } from './sql/inserindo-e-consultando';
import { lesson as filtrosEOrdenacao } from './sql/filtros-e-ordenacao';
import { lesson as funcoesEAgregacao } from './sql/funcoes-e-agregacao';
import { lesson as relacionamentosEJoin } from './sql/relacionamentos-e-join';
import { lesson as atualizandoEDeletando } from './sql/atualizando-e-deletando';
import { lesson as indicesEPerformance } from './sql/indices-e-performance';
import { lesson as transacoesEAcid } from './sql/transacoes-e-acid';
import { lesson as windowFunctions } from './sql/window-functions';
import { lesson as sqlAvancadoPratica } from './sql/sql-avancado-pratica';

// Frontend
import { lesson as projetoGuiadoFrontend } from './frontend/projeto-guiado-frontend';
import { lesson as projetoLivreFrontend } from './frontend/projeto-livre-frontend';
import { lesson as introducaoJavascript } from './frontend/introducao-javascript';
import { lesson as objetosEmJs } from './frontend/objetos-em-js';
import { lesson as arrayMethods } from './frontend/array-methods';
import { lesson as promessasEAsync } from './frontend/promises-e-async';
import { lesson as manipulandoDom } from './frontend/manipulando-dom';
import { lesson as eventos } from './frontend/eventos';
import { lesson as fetchApi } from './frontend/fetch-api';
import { lesson as armazenamentoLocal } from './frontend/armazenamento-local';
import { lesson as projetoTodoList } from './frontend/projeto-todo-list';

// Python Avancado
import { lesson as comprehensionsEGenerators } from './python-avancado/comprehensions-e-generators';
import { lesson as decorators } from './python-avancado/decorators';
import { lesson as contextManagers } from './python-avancado/context-managers';
import { lesson as tipagemComTypeHints } from './python-avancado/tipagem-com-type-hints';
import { lesson as metaprogramacao } from './python-avancado/metaprogramacao';
import { lesson as projetoBibliotecaPython } from './python-avancado/projeto-biblioteca-python';

// Concorrencia e Paralelismo
import { lesson as concorrenciaVsParalelismo } from './concorrencia/concorrencia-vs-paralelismo';
import { lesson as threadsEmPython } from './concorrencia/threads-em-python';
import { lesson as asyncAwait } from './concorrencia/async-await';
import { lesson as multiprocessingPython } from './concorrencia/multiprocessing-python';
import { lesson as problemasClassicosConcorrencia } from './concorrencia/problemas-classicos-concorrencia';
import { lesson as projetoProcessamentoParalelo } from './concorrencia/projeto-processamento-paralelo';

// Redes e Protocolos
import { lesson as comoAInternetFunciona } from './redes/como-a-internet-funciona';
import { lesson as httpNaPratica } from './redes/http-na-pratica';
import { lesson as restEDesignDeApis } from './redes/rest-e-design-de-apis';
import { lesson as websocketsETempoReal } from './redes/websockets-e-tempo-real';
import { lesson as graphqlVsRest } from './redes/graphql-vs-rest';
import { lesson as projetoClienteHttpCompleto } from './redes/projeto-cliente-http-completo';

// React
import { lesson as oQueEReact } from './react/o-que-e-react';
import { lesson as propsEComposicao } from './react/props-e-composicao';
import { lesson as estadoComUsestate } from './react/estado-com-usestate';
import { lesson as efeitosComUseeffect } from './react/efeitos-com-useeffect';
import { lesson as formulariosEEventos } from './react/formularios-e-eventos';
import { lesson as usememoEUsecallback } from './react/usememo-e-usecallback';
import { lesson as contextEEstadoGlobal } from './react/context-e-estado-global';
import { lesson as projetoAppCompleto } from './react/projeto-app-completo';

// Seguranca de Software
import { lesson as ameacasEVulnerabilidades } from './seguranca/ameacas-e-vulnerabilidades';
import { lesson as sqlInjection } from './seguranca/sql-injection';
import { lesson as xssECsrf } from './seguranca/xss-e-csrf';
import { lesson as autenticacaoESenhas } from './seguranca/autenticacao-e-senhas';
import { lesson as httpsECriptografia } from './seguranca/https-e-criptografia';
import { lesson as projetoAuditoriaDeSeguranca } from './seguranca/projeto-auditoria-de-seguranca';

const allLessons: Lesson[] = [
  // Estrutura de Pensamento
  comoPensarComoDev,
  decomposicaoNaPratica,
  abstracaoEModelosMentais,
  diagramasEFluxogramas,
  documentandoOPensamento,
  projetoEstruturaPensamento,
  // Leitura de Codigo
  comoAbordarCodigoDesconhecido,
  rastreandoFluxoDeExecucao,
  reconhecendoPadroesComuns,
  lendoCodigoDeProducao,
  refatorandoCodigoAlheio,
  projetoLeituraCodigo,
  // Resolucao de Problemas
  entendendoOProblema,
  dividirParaConquistar,
  padroesEReutilizacao,
  debuggingComoRaciocinio,
  otimizandoSolucoes,
  projetoResolucaoProblemas,
  // Pensamento em Sistemas
  oQueEUmSistema,
  decomposicaoDeSistemas,
  fluxoDeDados,
  interfacesEContratos,
  tradeOffEmSistemas,
  escalabilidadeBasica,
  projetoDesenhando,
  // VS Code
  interfaceENavegacao,
  extensoesEssenciais,
  atalhosProdutividade,
  debugIntegrado,
  terminalIntegrado,
  projetoConfigurandoAmbienteVscode,
  // Ambientes e Ferramentas
  ambientesVirtuaisPython,
  gerenciadoresDePacotes,
  variaveisDeAmbiente,
  makefileEAutomacao,
  projetoAmbienteProfissional,
  // Docker
  oQueEDocker,
  primeiroPassosComDocker,
  criandoImagensComDockerfile,
  volumesEVariaveis,
  dockerCompose,
  projetoDockerizandoAplicacao,
  // CI/CD com GitHub Actions
  oQueECicd,
  githubActionsPrimeirosPassos,
  rodandoTestesNoCi,
  variaveisESecrets,
  projetoPipelineCompleto,
  // Debugging e Testes
  oQueEDebugging,
  lendoErrosEStackTraces,
  ferramentasDeDebug,
  introducaoATestes,
  testesUnitariosComPytest,
  projetoDebugandoETestando,
  // Boas Praticas e Padroes
  nomenclaturaEClareza,
  funcoesEResponsabilidadeUnica,
  estruturaDeProjetos,
  padroesDeProjetos,
  codigoLimpoNaPratica,
  projetoRefatoracaoCompleta,
  // Arquitetura de Software
  oQueEArquitetura,
  principiosSolid,
  padroesDeProjeto,
  mvcECamadas,
  cleanCode,
  projetoArquitetura,
  estilosArquiteturais,
  arquiteturaHexagonal,
  eventDriven,
  domainDrivenDesign,
  decisoesDeArquitetura,
  // Intro
  oQueEProgramacao,
  comoComputadoresFuncionam,
  sistemaBinario,
  logicaDeProgramacao,
  gitEControleDeVersao,
  projetoGuiadoIntro,
  projetoLivreIntro,
  // Python
  variaveisETipos,
  operadores,
  condicionais,
  lacosDeRepeticao,
  funcoes,
  listas,
  strings,
  dicionariosETuplas,
  tratamentoDeErros,
  classesEObjetos,
  arquivos,
  modulosEImports,
  projetoGuiadoPython,
  projetoLivrePython,
  // C
  primeiroProgramaEmC,
  variaveisETiposEmC,
  operadoresEmC,
  condicionaisEmC,
  lacosEmC,
  funcoesEmC,
  ponteiros,
  memoriaEAlocacao,
  structs,
  arquivosEmC,
  preprocessador,
  compilacao,
  projetoGuiadoC,
  projetoLivreC,
  // Estruturas de Dados
  arraysEVetores,
  pilhasEFilas,
  listasEncadeadas,
  arvoresBinarias,
  tabelasHash,
  grafos,
  projetoGuiadoEstruturas,
  projetoLivreEstruturas,
  // Algoritmos
  oQueSaoAlgoritmos,
  buscaLinearEBinaria,
  ordenacaoBasica,
  recursao,
  complexidade,
  programacaoDinamica,
  algoritmosEmGrafos,
  algoritmosGulosos,
  projetoGuiadoAlgoritmos,
  projetoLivreAlgoritmos,
  // Java
  primeiroProgramaJava,
  variaveisETiposJava,
  operadoresJava,
  condicionaisJava,
  lacosJava,
  metodosJava,
  arraysJava,
  classesEObjetosJava,
  excecoesJava,
  projetoGuiadoJava,
  projetoLivreJava,
  // HTML e CSS
  introducaoHtml,
  textosEListas,
  linksEImagens,
  formulariosHtml,
  introducaoCss,
  boxModelELayout,
  flexbox,
  responsividade,
  projetoGuiadoHtmlCss,
  projetoLivreHtmlCss,
  // Backend
  oQueEBackend,
  apisRest,
  flaskPrimeiroServidor,
  rotasEParametros,
  bancoDeDadosSqlite,
  autenticacao,
  projetoGuiadoBackend,
  projetoLivreBackend,
  // Logica de Programacao
  pensamentoComputacional,
  algoritmosEFluxogramas,
  pseudocodigo,
  tiposDeDados,
  operadoresLogica,
  operadoresLogicos,
  estruturasDeDecisao,
  estruturasDeRepeticao,
  vetoresEMatrizes,
  funcoeseModularizacao,
  testeDeMesa,
  projetoGuiadoLogica,
  projetoLivreLogica,
  // Frontend
  introducaoJavascript,
  objetosEmJs,
  arrayMethods,
  promessasEAsync,
  manipulandoDom,
  eventos,
  fetchApi,
  armazenamentoLocal,
  projetoTodoList,
  projetoGuiadoFrontend,
  projetoLivreFrontend,
  // Linux e Terminal
  introducaoLinux,
  navegacaoEArquivos,
  manipulacaoDeTexto,
  permissoesEUsuarios,
  processosESistema,
  redirecionamentoEPipes,
  projetoGuiadoLinux,
  projetoLivreLinux,
  // Git Aprofundado
  fundamentosDoGit,
  branches,
  mergeEConflitos,
  repositoriosRemotos,
  githubNaPratica,
  gitAvancado,
  projetoGuiadoGit,
  projetoLivreGit,
  // SQL e Banco de Dados
  oQueSaoBancosDeDados,
  criandoTabelas,
  inserindoEConsultando,
  filtrosEOrdenacao,
  funcoesEAgregacao,
  relacionamentosEJoin,
  atualizandoEDeletando,
  projetoGuiadoSql,
  projetoLivreSql,
  indicesEPerformance,
  transacoesEAcid,
  windowFunctions,
  sqlAvancadoPratica,
  // Algoritmos (expansao)
  backtracking,
  algoritmosDeString,
  algoritmosGulososAvancados,
  // Python Avancado
  comprehensionsEGenerators,
  decorators,
  contextManagers,
  tipagemComTypeHints,
  metaprogramacao,
  projetoBibliotecaPython,
  // Concorrencia e Paralelismo
  concorrenciaVsParalelismo,
  threadsEmPython,
  asyncAwait,
  multiprocessingPython,
  problemasClassicosConcorrencia,
  projetoProcessamentoParalelo,
  // Redes e Protocolos
  comoAInternetFunciona,
  httpNaPratica,
  restEDesignDeApis,
  websocketsETempoReal,
  graphqlVsRest,
  projetoClienteHttpCompleto,
  // React
  oQueEReact,
  propsEComposicao,
  estadoComUsestate,
  efeitosComUseeffect,
  formulariosEEventos,
  usememoEUsecallback,
  contextEEstadoGlobal,
  projetoAppCompleto,
  // Seguranca de Software
  ameacasEVulnerabilidades,
  sqlInjection,
  xssECsrf,
  autenticacaoESenhas,
  httpsECriptografia,
  projetoAuditoriaDeSeguranca,
];

const lessonsMap: Record<string, Lesson> = {};
for (const lesson of allLessons) {
  lessonsMap[lesson.id] = lesson;
}

export function getAllLessons(): Lesson[] {
  return allLessons;
}

export function getLessonById(id: string, moduleId?: string): Lesson | undefined {
  if (moduleId) {
    return allLessons.find((l) => l.id === id && l.moduleId === moduleId);
  }
  return lessonsMap[id];
}

export function getLessonsByModule(moduleId: string): Lesson[] {
  return allLessons
    .filter((l) => l.moduleId === moduleId)
    .sort((a, b) => a.order - b.order);
}

export function getAdjacentLessons(
  moduleId: string,
  lessonId: string
): { prev: Lesson | null; next: Lesson | null } {
  const moduleLessons = getLessonsByModule(moduleId);
  const index = moduleLessons.findIndex((l) => l.id === lessonId);

  return {
    prev: index > 0 ? moduleLessons[index - 1] : null,
    next: index < moduleLessons.length - 1 ? moduleLessons[index + 1] : null,
  };
}
