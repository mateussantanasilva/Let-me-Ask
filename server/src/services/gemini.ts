import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
})

const model = 'gemini-2.5-flash'

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const prompt = 'Transcreva o áudio para português brasileiro. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e a formatação original do áudio. Divida o texto em parágrafos quando necessário.'

  
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        }
      }
    ]
  })

  if (!response.text) throw new Error('failed to transcribe audio')

  return response.text
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [
      {
        text,
      }
    ],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT' // finalidade do embedding: busca por similaridade
    }
  })

  if (!response.embeddings?.[0]?.values) throw new Error('failed to generate embeddings')

  return response.embeddings[0].values
}

export async function generateAnswer(question: string, transcriptions: string[]) {
  const context = transcriptions.join('\n\n') // junta com quebra de linha

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português brasileiro.

    Contexto:
    ${context}

    Pergunta:
    ${question}

    Instruções:
    - Use apenas informações contidas no contexto enviado
    - Se não houver informações suficientes no contexto, não responda nada pois não temos informações suficientes para responder a pergunta. Não invente respostas.
    - Se não houver informações suficientes no contexto, não responda coisas do tipo "Não temos informações suficientes para responder a pergunta" ou "Não temos informações suficientes para responder a pergunta".
    - Seja objetivo e direto na resposta
    - Mantenha um tom educativo e profissional
    - Cite trechos relevantes do contexto se apropriado
    - Se for citar o contexto, utilize o termo "conteúdo da aula"
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [{
      text: prompt
    }]
  })  

  if (!response.text) throw new Error('failed to generate answer with gemini')

  return response.text
}