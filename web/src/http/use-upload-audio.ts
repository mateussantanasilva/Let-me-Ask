import { useMutation } from '@tanstack/react-query'
import { api } from './api'

export function useUploadAudio(roomId: string) {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${api}/rooms/${roomId}/audio`, {
        method: 'POST',
        body: data,
      })

      const result = await response.json()

      return result
    },
  })
}
