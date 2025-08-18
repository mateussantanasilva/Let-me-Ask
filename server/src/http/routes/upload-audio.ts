import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { generateEmbeddings, transcribeAudio } from "../../services/gemini.ts";
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schemas/index.ts';

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      }
    },
    async (request, reply) => {
      const { roomId } = request.params
      const audio = await request.file() // stream: consome aos poucos

      if (!audio) throw new Error('audio file is required')

      const audioBuffer = await audio.toBuffer() // acumula todo o conteúdo para converter para base64
      const audioAsBase64 = audioBuffer.toString('base64')

      const mimeType = audio.mimetype

      const transcription = await transcribeAudio(audioAsBase64, mimeType)
      const embeddings = await generateEmbeddings(transcription)

      const result = await db.insert(schema.audioChunks).values({
        roomId,
        transcription,
        embeddings,
      }).returning()
      const insertedAudioChunk = result[0]

      if (!insertedAudioChunk) throw new Error('failed to create audio chunk')

      return reply.code(201).send({ chunkId: insertedAudioChunk.id })
    }
  )
}