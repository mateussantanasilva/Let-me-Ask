import { useQuery } from '@tanstack/react-query'
import { api } from './api'
import type { GetRoomsResponse } from './types/get-rooms-response'

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${api}/rooms`)
      
      const result: GetRoomsResponse = await response.json()

      return result
    },
  })
}
