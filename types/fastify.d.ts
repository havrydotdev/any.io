// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserInfo;
  }
}

interface UserInfo {
  id: number;
  email: string;
  name: string;
}
