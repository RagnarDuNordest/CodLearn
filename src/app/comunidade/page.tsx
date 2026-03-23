'use client';

import { useState } from 'react';
import { ThumbsUp, MessageSquare, Send, Tag } from 'lucide-react';

interface Tip {
  id: number;
  autor: string;
  iniciais: string;
  cor: string;
  conteudo: string;
  tags: string[];
  likes: number;
  tempo: string;
}

interface Discussao {
  id: number;
  titulo: string;
  preview: string;
  autor: string;
  iniciais: string;
  cor: string;
  categoria: string;
  corCategoria: string;
  respostas: number;
  tempo: string;
}

const TIPS: Tip[] = [
  { id: 1, autor: 'Rafael S.', iniciais: 'RS', cor: '#7C3AED', conteudo: 'Use o método "Rubber Duck Debugging": explique seu código para um pato de borracha (ou qualquer objeto). Verbalizar o problema muitas vezes revela a solução!', tags: ['debugging', 'produtividade'], likes: 47, tempo: '2h atrás' },
  { id: 2, autor: 'Ana Lima', iniciais: 'AL', cor: '#059669', conteudo: 'Aprenda a ler mensagens de erro antes de buscar no Google. 80% do tempo a mensagem já te diz exatamente o que está errado e em qual linha.', tags: ['dica', 'iniciante'], likes: 89, tempo: '5h atrás' },
  { id: 3, autor: 'Pedro Melo', iniciais: 'PM', cor: '#D97706', conteudo: 'Git commit cedo e com frequência. Um commit por mudança lógica, não um commit gigante no fim do dia. Isso facilita imensamente o debug futuro.', tags: ['git', 'boas práticas'], likes: 63, tempo: '1d atrás' },
  { id: 4, autor: 'Carla Neves', iniciais: 'CN', cor: '#E44D26', conteudo: 'Nomeie variáveis com nomes que você entenderia daqui a 6 meses. "x" e "temp" são inimigas do seu eu futuro. "idadeUsuario" e "emailTemporario" são aliados.', tags: ['código limpo', 'boas práticas'], likes: 112, tempo: '1d atrás' },
  { id: 5, autor: 'Lucas Costa', iniciais: 'LC', cor: '#0891B2', conteudo: 'A técnica Pomodoro (25 min focado + 5 min pausa) é real e funciona para programar. Tente por uma semana e você vai se surpreender com quanto consegue produzir.', tags: ['produtividade', 'foco'], likes: 78, tempo: '2d atrás' },
  { id: 6, autor: 'Julia Ramos', iniciais: 'JR', cor: '#B07219', conteudo: 'Quando travar em um problema, dorme! Sério. O cérebro processa informação durante o sono. Muita vez acordei com a solução clara na cabeça.', tags: ['dica', 'saúde'], likes: 94, tempo: '2d atrás' },
  { id: 7, autor: 'Mateus Farias', iniciais: 'MF', cor: '#F05032', conteudo: 'Escreva o teste antes de escrever o código (TDD). Parece contra-intuitivo, mas te força a pensar na interface da função antes da implementação. O código fica muito mais limpo.', tags: ['testes', 'TDD', 'avançado'], likes: 55, tempo: '3d atrás' },
  { id: 8, autor: 'Sofia Dias', iniciais: 'SD', cor: '#3572A5', conteudo: 'Construa projetos pessoais desde o início. Um projeto real (mesmo que simples) ensina mais do que 50 tutoriais. A maioria dos empregos pede portfólio, não certificados.', tags: ['carreira', 'projetos'], likes: 143, tempo: '3d atrás' },
  { id: 9, autor: 'Bruno Henrique', iniciais: 'BH', cor: '#555555', conteudo: 'Use aliases no terminal para comandos frequentes. "alias gs=\'git status\'" e "alias glog=\'git log --oneline --graph\'" salvam horas por semana ao longo do tempo.', tags: ['terminal', 'produtividade', 'git'], likes: 67, tempo: '4d atrás' },
  { id: 10, autor: 'Isabela Torres', iniciais: 'IT', cor: '#1D4ED8', conteudo: 'Leia código de projetos open-source. GitHub tem milhões de projetos reais. Ver como developers experientes estruturam projetos é educação gratuita e de alta qualidade.', tags: ['aprendizado', 'open-source'], likes: 88, tempo: '5d atrás' },
  { id: 11, autor: 'Gabriel Pinto', iniciais: 'GP', cor: '#336791', conteudo: 'Entenda o problema completamente antes de escrever uma linha de código. Desenhe no papel, crie exemplos, defina entrada e saída. Código escrito sem entender o problema é retrabalho garantido.', tags: ['processo', 'resolução de problemas'], likes: 99, tempo: '6d atrás' },
  { id: 12, autor: 'Fernanda Luz', iniciais: 'FL', cor: '#c9a800', conteudo: 'Não compare seu progresso com o de outros. Cada pessoa tem um ritmo diferente. Compare-se com quem você era mês passado. Se melhorou, você está no caminho certo.', tags: ['motivação', 'mentalidade'], likes: 201, tempo: '1sem atrás' },
];

const DISCUSSOES: Discussao[] = [
  { id: 1, titulo: 'Python ou JavaScript para começar em 2024?', preview: 'Estou iniciando em programação e não sei por qual linguagem começar. Vi que Python é mais simples, mas JavaScript parece mais empregável...', autor: 'Victor M.', iniciais: 'VM', cor: '#7C3AED', categoria: 'Dúvida', corCategoria: 'bg-blue-500/15 text-blue-400', respostas: 23, tempo: '1h atrás' },
  { id: 2, titulo: 'Como organizar estudos conciliando trabalho?', preview: 'Trabalho 8h por dia e tenho apenas 2h livres. Alguém tem dicas de como maximizar o aprendizado com pouco tempo disponível?', autor: 'Mariana F.', iniciais: 'MF', cor: '#059669', categoria: 'Discussão', corCategoria: 'bg-purple-500/15 text-purple-400', respostas: 31, tempo: '3h atrás' },
  { id: 3, titulo: 'Meu primeiro projeto Flutter — feedback?', preview: 'Terminei meu primeiro app mobile! É um gerenciador de hábitos. Adoraria feedback da comunidade antes de publicar na Play Store...', autor: 'André S.', iniciais: 'AS', cor: '#D97706', categoria: 'Projeto', corCategoria: 'bg-emerald-500/15 text-emerald-400', respostas: 12, tempo: '5h atrás' },
  { id: 4, titulo: 'Diferença real entre SQL e NoSQL?', preview: 'Aprendi SQL mas vejo muito sobre MongoDB. Quando realmente faz sentido usar um banco NoSQL ao invés de relacional?', autor: 'Tais P.', iniciais: 'TP', cor: '#336791', categoria: 'Dúvida', corCategoria: 'bg-blue-500/15 text-blue-400', respostas: 18, tempo: '8h atrás' },
  { id: 5, titulo: 'Como explicar lógica de ponteiros em C?', preview: 'Sempre tive dificuldade com ponteiros. Finalmente entendi usando a analogia de "endereços na cidade". Alguém tem outras analogias boas?', autor: 'Ricardo L.', iniciais: 'RL', cor: '#555555', categoria: 'Recursos', corCategoria: 'bg-amber-500/15 text-amber-400', respostas: 9, tempo: '1d atrás' },
  { id: 6, titulo: 'Chegando a 6 meses de estudos — retrospectiva', preview: 'Comecei sem saber nada e hoje consigo criar APIs, fazer CRUD completo e entender estruturas de dados. Vou compartilhar o que funcionou para mim...', autor: 'Camila G.', iniciais: 'CG', cor: '#E44D26', categoria: 'Conquista', corCategoria: 'bg-pink-500/15 text-pink-400', respostas: 47, tempo: '2d atrás' },
];

const CATEGORIAS_FORM = ['Dúvida', 'Dica', 'Projeto', 'Recurso', 'Discussão'];

export default function ComunidadePage() {
  const [tipLikes, setTipLikes] = useState<Record<number, boolean>>({});
  const [tipForm, setTipForm] = useState('');
  const [catForm, setCatForm] = useState('Dica');
  const [activeTab, setActiveTab] = useState<'dicas' | 'discussoes' | 'contribuir'>('dicas');
  const [search, setSearch] = useState('');

  const toggleLike = (id: number) => setTipLikes(prev => ({ ...prev, [id]: !prev[id] }));

  const filteredTips = search
    ? TIPS.filter(t => t.conteudo.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
    : TIPS;

  return (
    <div className="w-full pb-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🤝</span>
          <h1 className="text-3xl font-bold">Comunidade</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Dicas, discussões e conquistas de quem está na mesma jornada.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-xl p-1 mb-8 w-fit">
        {(['dicas', 'discussoes', 'contribuir'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'dicas' ? '💡 Dicas' : tab === 'discussoes' ? '💬 Discussões' : '✏️ Contribuir'}
          </button>
        ))}
      </div>

      {/* Dicas */}
      {activeTab === 'dicas' && (
        <div>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar dicas por conteúdo ou tag..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredTips.map(tip => (
              <div key={tip.id} className="flex flex-col bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: tip.cor }}>
                    {tip.iniciais}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{tip.autor}</p>
                    <p className="text-[10px] text-muted-foreground">{tip.tempo}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-3">{tip.conteudo}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tip.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-accent/40 rounded text-[10px] text-muted-foreground">
                        <Tag className="w-2 h-2" />{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleLike(tip.id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all ${tipLikes[tip.id] ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {tip.likes + (tipLikes[tip.id] ? 1 : 0)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Discussões */}
      {activeTab === 'discussoes' && (
        <div className="space-y-3">
          {DISCUSSOES.map(d => (
            <div key={d.id} className="flex gap-4 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ backgroundColor: d.cor }}>
                {d.iniciais}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{d.titulo}</h3>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${d.corCategoria} border-current/30`}>{d.categoria}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{d.preview}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{d.autor}</span>
                  <span>·</span>
                  <span>{d.tempo}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{d.respostas} respostas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contribuir */}
      {activeTab === 'contribuir' && (
        <div className="max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-1">Compartilhe uma dica</h2>
            <p className="text-sm text-muted-foreground mb-6">Sua experiência pode ajudar outros estudantes. Compartilhe o que aprendeu!</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Sua dica</label>
                <textarea
                  value={tipForm}
                  onChange={e => setTipForm(e.target.value)}
                  placeholder="Compartilhe uma dica, truque ou aprendizado que te ajudou..."
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <p className="text-[10px] text-muted-foreground text-right mt-1">{tipForm.length}/500</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Categoria</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIAS_FORM.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCatForm(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${catForm === cat ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-muted-foreground hover:text-foreground'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={tipForm.trim().length < 20}
                onClick={() => { alert('Dica enviada! (funcionalidade em breve)'); setTipForm(''); }}
              >
                <Send className="w-4 h-4" />
                Publicar dica
              </button>
              <p className="text-[11px] text-muted-foreground text-center">Mínimo de 20 caracteres. Seja respeitoso e construtivo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
