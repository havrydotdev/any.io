import { FastifyRequest } from 'fastify';

const extractJwtFromCookies = (cookiesKey: string) => {
  return (req: FastifyRequest) => {
    const token = req.cookies?.[cookiesKey];
    return token;
  };
};

export default extractJwtFromCookies;
