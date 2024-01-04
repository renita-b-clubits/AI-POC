import cookie from "@fastify/cookie";
import fastifyPluginJWT, { type FastifyJWTOptions } from "@fastify/jwt";
import { FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import envVariables from "../environment/variables";

export type Payload = {
  role: {
    name: string;
  };
  id: number;
  name: string;
  username: string;
  mobile: string | null;
  email: string | null;
  password: string;
};

export type User = {
  id: number;
  name: string;
  role: string;
  // NOTE: Remove if not used in the frontend in all pages
  username: string;
  mobile: string | null;
  email: string | null;
  imageUrl?: string | null;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: Payload; // payload type is used for signing and verifying
    user: User; // user type is return type of `request.user` object
  }
}

export default fastifyPlugin<FastifyJWTOptions>(
  async (fastify, defaultOptions) => {
    fastify.register(cookie);

    fastify.register(fastifyPluginJWT, {
      ...defaultOptions,
      secret: envVariables.JWT_SECRET,
      cookie: {
        cookieName: "refreshToken",
        signed: false,
      },
      sign: {
        expiresIn: "30m",
      },
      formatUser: (payload) => {
        return {
          id: payload.id,
          name: payload.name,
          role: payload.role.name,
          username: payload.username,
          email: payload.email,
          mobile: payload.mobile,
        };
      },
    });

    fastify.decorateRequest("authenticate", async (req: FastifyRequest) => {
      await req.jwtVerify();
      await req.jwtVerify({ onlyCookie: true });
    });
  }
);

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  export interface FastifyRequest {
    authenticate: (req: FastifyRequest) => Promise<void>;
  }
}
