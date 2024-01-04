import fastifyPluginMultipart, {
  type FastifyMultipartOptions,
} from "@fastify/multipart";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin<FastifyMultipartOptions>(
  async (fastify, defaultOptions) => {
    fastify.register(fastifyPluginMultipart, {
      ...defaultOptions,
      attachFieldsToBody: true,
    });
  }
);
