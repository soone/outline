import { Context, Next } from "koa";
import { addTags } from "@server/logging/tracer";

export default function apiTracer() {
  return async function apiTracerMiddleware(ctx: Context, next: Next) {
    const params = ctx.request.body ?? ctx.request.query;

    for (const key in params) {
      if (key === "id" || key.endsWith("Id")) {
        const value = params[key];
        if (typeof value === "string") {
          addTags({
            [`resource.${key}`]: value,
          });
        }
      }
    }

    await next();
  };
}
