import fastifyPluginStatic, {
  type FastifyStaticOptions,
} from "@fastify/static";
import fastifyPlugin from "fastify-plugin";
import * as path from "path";

export default fastifyPlugin<FastifyStaticOptions>(
  async (fastify, defaultOptions) => {
    fastify.register(fastifyPluginStatic, {
      ...defaultOptions,
      root: path.join(process.cwd(), "public"),
      wildcard: false,
    });
  }
);
