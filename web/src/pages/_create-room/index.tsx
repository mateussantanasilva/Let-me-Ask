import { createFileRoute } from '@tanstack/react-router'
import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'

export const Route = createFileRoute('/_create-room/')({
  component: Index,
})

function Index() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />

          <RoomList />
        </div>
      </div>
    </main>
  )
}
