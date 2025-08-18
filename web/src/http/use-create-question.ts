import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import type { CreateQuestionRequest, CreateQuestionResponse, GetQuestionsResponse } from './types/question'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(`${api}/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result: CreateQuestionResponse = await response.json()

      return result
    },

    // executa quando é feito a chamada para API
    onMutate: ({ question }) => {
      const previousQuestions = queryClient.getQueryData<GetQuestionsResponse>(['get-questions', roomId])

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      queryClient.setQueryData<GetQuestionsResponse>(
        ['get-questions', roomId], 
        [newQuestion, ...(previousQuestions ?? [])]
      )

      return { previousQuestions, newQuestion }
    },
    
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<GetQuestionsResponse>(
        ['get-questions', roomId], 
        (questions) => {
          if (!questions || !context.newQuestion) return questions

          return questions.map(question => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              }
            }

            return question
          })
        }
      )
    },

    onError: (_error, _variables, context) => {
      if (context?.previousQuestions) {
        queryClient.setQueryData<GetQuestionsResponse>(
          ['get-questions', roomId], 
          context.previousQuestions
        )
      }
    }
  })
}
