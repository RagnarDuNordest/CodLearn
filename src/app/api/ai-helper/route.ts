import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Você é o CodBot, um tutor de programação especialista que usa o método socrático.

REGRAS ABSOLUTAS:
1. NUNCA dê a resposta diretamente — nem em código, nem em texto
2. Faça perguntas que guiem o aluno a descobrir a solução por conta própria
3. Se o aluno estiver perto da resposta, elogie e dê uma última dica para ele cruzar a linha
4. Se o aluno estiver errando o caminho, faça uma pergunta que o redirecione
5. Explique conceitos com analogias simples e do cotidiano quando necessário
6. Seja encorajador, paciente e entusiasmado

COMO AJUDAR:
- Quebre o problema em partes menores com perguntas
- "O que você já tentou fazer?"
- "O que essa função/variável deveria fazer?"
- "O que aconteceria se você mudasse apenas essa parte?"
- Quando o aluno acertar: comemore! 🎉

FORMATO:
- Mensagens curtas e diretas (máximo 3 parágrafos)
- Use emojis com moderação para tornar mais amigável
- Quando mostrar código como EXEMPLO (nunca como resposta), use \`\`\` com a linguagem
- Prefira fazer UMA boa pergunta do que dar um parágrafo de dicas

Contexto do aluno: aprendendo programação do zero na plataforma CodLearn.`;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response('Mensagens inválidas', { status: 400 });
    }

    const systemWithContext = context
      ? `${SYSTEM_PROMPT}\n\nContexto atual do aluno: ${context}`
      : SYSTEM_PROMPT;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = client.messages.stream({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: systemWithContext,
            messages: messages.map((m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
          });

          for await (const event of anthropicStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(chunk));
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return new Response('Erro interno', { status: 500 });
  }
}
