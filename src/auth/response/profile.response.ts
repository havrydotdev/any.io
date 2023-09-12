import { CustomUser } from 'types/fastify';

export default class GetProfileResp {
  user: CustomUser;
  ok: boolean;
}
