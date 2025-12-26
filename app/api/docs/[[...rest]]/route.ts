import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { router } from "@/routers";

const openAPIHandler = new OpenAPIHandler(router, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
      docsPath: "/",
      specPath: "/spec.json",
      specGenerateOptions: {
        info: {
          title: "AI E-commerce API",
          version: "1.0.0",
        },
        servers: [{ url: "/api/rpc" }],
        security: [{ bearerAuth: [] }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
      },
      docsConfig: {
        authentication: {
          securitySchemes: {
            bearerAuth: {
              token: "default-token",
            },
          },
        },
      },
    }),
  ],
});

async function handleRequest(request: Request) {
  const { response } = await openAPIHandler.handle(request, {
    prefix: "/api/docs",
    context: {},
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const GET = handleRequest;
