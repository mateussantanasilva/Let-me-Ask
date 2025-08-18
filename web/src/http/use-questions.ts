import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import type { GetQuestionsResponse } from './types/question'

export function useQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(`${api}/rooms/${roomId}/questions`)
      
      const result: GetQuestionsResponse = await response.json()

      return result
    },
  })
}
