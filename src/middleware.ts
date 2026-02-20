import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // Se o pathname terminar com '/' (e não for a raiz '/'), remove a barra
  if (url.pathname.endsWith("/") && url.pathname.length > 1) {
    url.pathname = url.pathname.slice(0, -1);
    // Adiciona os query parameters, se houver
    return context.redirect(url.toString(), 301);
  }

  return next();
});
