'use client'
import React, { PropsWithChildren, useState } from 'react'
import { trpc } from './_trpc/client'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()
export const Provider = ({ children }: PropsWithChildren) => {
  const [client] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc'
        })
      ]
    }))
  return (
    <trpc.Provider queryClient={queryClient} client={client}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

