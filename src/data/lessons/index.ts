import { Lesson } from '@/types/lesson';

// Intro
import { lesson as oQueEProgramacao } from './intro/o-que-e-programacao';
import { lesson as comoComputadoresFuncionam } from './intro/como-computadores-funcionam';
import { lesson as sistemaBinario } from './intro/sistema-binario';
import { lesson as logicaDeProgramacao } from './intro/logica-de-programacao';
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
import { lesson as projetoGuiadoEstruturas } from './estruturas-de-dados/projeto-guiado-estruturas';
import { lesson as projetoLivreEstruturas } from './estruturas-de-dados/projeto-livre-estruturas';
import { lesson as arraysEVetores } from './estruturas-de-dados/arrays-e-vetores';
import { lesson as pilhasEFilas } from './estruturas-de-dados/pilhas-e-filas';
import { lesson as listasEncadeadas } from './estruturas-de-dados/listas-encadeadas';
import { lesson as arvoresBinarias } from './estruturas-de-dados/arvores-binarias';
import { lesson as tabelasHash } from './estruturas-de-dados/tabelas-hash';
import { lesson as grafos } from './estruturas-de-dados/grafos';

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
import { lesson as operadoresLogica } from './logica/operadores';
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

const allLessons: Lesson[] = [
  // Intro
  oQueEProgramacao,
  comoComputadoresFuncionam,
  sistemaBinario,
  logicaDeProgramacao,
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
];

const lessonsMap: Record<string, Lesson> = {};
for (const lesson of allLessons) {
  lessonsMap[lesson.id] = lesson;
}

export function getAllLessons(): Lesson[] {
  return allLessons;
}

export function getLessonById(id: string): Lesson | undefined {
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
