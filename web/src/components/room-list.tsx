import { Link } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function RoomList() {
  const { data: rooms, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Salas recentes</h2>
        </CardTitle>
        <CardDescription>
          <p>Acesso rápido para as salas criadas recentemente</p>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            <p>Carregando salas...</p>
          </div>
        )}

        {rooms?.map((room) => (
          <Link
            className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
            key={room.id}
            params={{ id: room.id }}
            to="/room/$id"
          >
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>

              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {dayjs(room.createdAt).toNow()}
                </Badge>

                <Badge variant="secondary">
                  {room.questionsCount} pergunta(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1 text-sm">
              Entrar
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
