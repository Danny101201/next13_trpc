import { appRouters } from '@/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouters,
    createContext: () => ({}),
  });
export { handler as GET, handler as POST };