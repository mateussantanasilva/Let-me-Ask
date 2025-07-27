import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'

type GetRoomsApiResponse = Array<{
  id: string
  name: string
}>

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsApiResponse = await response.json()

      return result
    },
  })

  return (
    <div>
      <h3>Welcome Home!</h3>

      {isLoading && <p>Carregando...</p>}

      <div className="flex flex-col gap-2">
        {rooms?.map((room) => (
          <Link
            key={room.id}
            params={{ id: room.id }}
            to="/room/$id"
          >
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
