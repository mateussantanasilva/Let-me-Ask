import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schemas/index.ts'
import { generateAnswer, generateEmbeddings } from '../../services/gemini.ts'
import { and, eq, sql } from 'drizzle-orm'

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question } = request.body

      const questionEmbeddings = await generateEmbeddings(question) // deve gerar embeddings para a pergunta para depois gerar resposta
      const questionEmbeddingsAsString = `[${questionEmbeddings.join(',')}]`
      
      const audioChunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${questionEmbeddingsAsString}::vector)`
        })
        .from(schema.audioChunks)
        .where(and(
          eq(schema.audioChunks.roomId, roomId),
          // grau de similaridade. Quanto mais próximo de 1, mais similar
          sql`1 - (${schema.audioChunks.embeddings} <=> ${questionEmbeddingsAsString}::vector) > 0.7` 
        ))
        .orderBy(sql`1 - (${schema.audioChunks.embeddings} <=> ${questionEmbeddingsAsString}::vector)`)
        .limit(3)

      let answer: string | null = null

      if (audioChunks.length > 0) {
        const transcriptions = audioChunks.map((chunk) => chunk.transcription)

        answer = await generateAnswer(question, transcriptions)
      }

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
          answer,
        })
        .returning()
      const insertedQuestion = result[0]

      if (!insertedQuestion) throw new Error('failed to create question')

      return reply.code(201).send({ questionId: insertedQuestion.id, answer })
    }
  )
}
