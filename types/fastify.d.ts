// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyRequest } from 'fastify';
import { Role } from 'src/common/enums/roles.enum';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserInfo;
  }
}

interface UserInfo {
  id: number;
  email: string;
  name: string;
  role: Role;
}
