import Image from 'next/image'
import { TotoList } from './_components/TotoList'
import { servrClient } from '@/server/serverClient'

export default async function Home() {
  const todos = await servrClient.getTodos()
  return (
    <div className='max-w-xl mx-auto mt-5'>
      <TotoList initialTodos={todos} />
    </div>
  )
}
