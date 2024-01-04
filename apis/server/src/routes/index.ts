import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("*", function (request, reply) {
    reply.sendFile("index.html");
  });
};

export default root;
