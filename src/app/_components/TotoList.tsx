'use client'
import React, { useState } from 'react'
import { trpc } from '../_trpc/client'
import { servrClient } from '@/server/serverClient'

export const revalidate = 'force-cache'
interface TotoListProps {

  initialTodos: Awaited<ReturnType<(typeof servrClient)['getTodos']>>
}
export const TotoList = ({ initialTodos }: TotoListProps) => {
  const utils = trpc.useContext()
  const { data, refetch } = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos
  })
  const { mutateAsync: addPost } = trpc.addTodo.useMutation({
    onSettled() {
      utils.getTodos.invalidate()
      // refetch()
    }
  })
  const { mutateAsync: deletePosts } = trpc.deleteTodos.useMutation({
    onSuccess() {
      //  invalidate all route
      utils.invalidate()
    }
  })
  const { mutateAsync: togglePost } = trpc.toggleTodo.useMutation({
    onSuccess() {

    }
  })
  const [context, setContext] = useState<string>('')

  return (
    <div >
      <ul>
        {data?.map(todo => (
          <li key={todo.id} className='flex items-center justify-between'>
            <input
              type="checkbox"
              checked={!!todo.done}
              onChange={() => {
                togglePost({ id: todo.id, done: todo.done ? 0 : 1 })
              }}
            />
            <label htmlFor="">{todo.cotext}</label>
          </li>
        ))}
      </ul>

      <div className='flex justify-between items-center'>
        <div>
          <label htmlFor="">Context</label>
          <input
            className='border-2  border-blue-400 focus-visible:outline-none ml-2'
            type="text"
            value={context}
            onChange={e => setContext(e.target.value)}
          />
        </div>
        <button
          className='bg-blue-500 text-white px-2 py-1 rounded-md active:bg-blue-700 hover:bg-blue-600'
          onClick={() => {
            if (!context) return
            addPost(context)
          }}
        >add todos</button>
      </div>
      <button onClick={async () => {
        await utils.client.deleteTodos.mutate()
        // await deletePosts()
      }}>Delete many proxy</button>
      <br />
      <button onClick={async () => {
        // await utils.client.deleteTodos.mutate()
        await deletePosts()
      }}>Delete many </button>
    </div>
  )
}

