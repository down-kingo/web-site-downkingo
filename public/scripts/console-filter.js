/**
 * Console Filter - DownKingo
 * Filtra logs do console para mostrar apenas mensagens do próprio site,
 * removendo ruído de extensões do navegador e scripts de terceiros.
 */
(function () {
  "use strict";

  // Domínios permitidos (mensagens desses domínios serão exibidas)
  const ALLOWED_DOMAINS = ["downkingo.com", "localhost", "127.0.0.1"];

  // Padrões de URL a serem bloqueados (extensões, analytics, etc.)
  const BLOCKED_PATTERNS = [
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
    /^safari-extension:\/\//,
    /^ms-browser-extension:\/\//,
    /extensions\//i,
    /google-analytics\.com/,
    /googletagmanager\.com/,
    /facebook\.net/,
    /doubleclick\.net/,
    /hotjar\.com/,
    /clarity\.ms/,
  ];

  // Prefixo para identificar logs do site (opcional)
  const APP_PREFIX = "[DownKingo]";
  const SHOW_PREFIX = false; // Mude para true se quiser prefixo nos logs

  // Guarda os métodos originais
  const originalConsole = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  };

  /**
   * Verifica se o log vem de uma fonte permitida
   * @returns {boolean}
   */
  function isFromAllowedSource() {
    try {
      // Cria um erro para capturar o stack trace
      const stack = new Error().stack || "";

      // Se o stack contém padrões bloqueados, rejeita
      for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(stack)) {
          return false;
        }
      }

      // Se o stack contém domínios permitidos, aceita
      for (const domain of ALLOWED_DOMAINS) {
        if (stack.includes(domain)) {
          return true;
        }
      }

      // Verifica se é um script inline ou do próprio documento
      // Scripts inline geralmente têm '<anonymous>' ou o hostname da página
      const currentHost = window.location.hostname;
      if (stack.includes(currentHost) || stack.includes("<anonymous>")) {
        return true;
      }

      // Se não conseguiu determinar, bloqueia por padrão
      // (isso pode ser ajustado para 'true' se preferir permitir por padrão)
      return false;
    } catch (e) {
      // Em caso de erro, permite o log para não quebrar nada
      return true;
    }
  }

  /**
   * Sobrescreve um método do console com filtragem
   * @param {string} method - Nome do método (log, warn, error, etc.)
   */
  function overrideConsoleMethod(method) {
    console[method] = function (...args) {
      if (isFromAllowedSource()) {
        if (SHOW_PREFIX) {
          originalConsole[method](APP_PREFIX, ...args);
        } else {
          originalConsole[method](...args);
        }
      }
      // Se não for de fonte permitida, simplesmente ignora
    };
  }

  // Aplica a sobrescrita em todos os métodos relevantes
  ["log", "info", "warn", "error", "debug"].forEach(overrideConsoleMethod);

  // Log inicial para confirmar que o filtro está ativo (pode ser removido em produção)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    originalConsole.info(
      "[Console Filter] Filtro de console ativo. Logs de terceiros serão suprimidos."
    );
  }
})();
