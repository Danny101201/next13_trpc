import { type AppRouter } from './../../server/index';
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      onSuccess: async (opts) => {
        const queryCache = opts.queryClient.getQueryCache()
        await opts.originalFn()
        // invalidate all queries in the react query cache :
        await opts.queryClient.invalidateQueries()
      }
    }
  }
})