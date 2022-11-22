import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "~/server/app.router";
import Cors from "cors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";


const cors = Cors();

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export function withCors(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);

    return await handler(req, res);
  };
}

export default withCors(
  trpcNext.createNextApiHandler({
  router: appRouter,
})
);
