import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent()  {
  return (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
