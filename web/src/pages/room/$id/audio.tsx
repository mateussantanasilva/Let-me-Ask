import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useUploadAudio } from '@/http/use-upload-audio'

export const Route = createFileRoute('/room/$id/audio')({
  component: RouteComponent,
})

const isRecordingSupported =
  navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

function RouteComponent() {
  const { id } = Route.useParams()

  const [isRecording, setIsRecording] = useState(false)

  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { mutateAsync: uploadAudioRequest } = useUploadAudio(id)

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = event => {
      if (event.data.size > 0) {
        uploadAudio(event.data) // envia o audio para o servidor a cada 5 segundos
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada')
    }

    recorder.current.onstop = () => {
      console.log('Gravação parada')
    }

    recorder.current.start()
  }

  async function handleStartRecording() {
    if (!isRecordingSupported) return alert('O seu navegador não suporta gravação de áudio')

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()

      createRecorder(audio)
    }, 5000) // a cada 5 segundos
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    const response = await uploadAudioRequest(formData)

    console.log(response)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={handleStopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={handleStartRecording}>Gravar áudio</Button>
      )}
      
      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </main>
  )
}
