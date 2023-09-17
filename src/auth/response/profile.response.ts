import { UserInfo } from 'types/fastify';

export default class GetProfileResp {
  user: UserInfo;
  ok: boolean;
}
