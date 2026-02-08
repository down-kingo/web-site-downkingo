/**
 * DownKingo Console Filter v2.0
 *
 * Suprime logs do console de extensões de navegador e scripts de terceiros.
 * Utiliza uma abordagem de whitelist: apenas mensagens que passam pela API
 * do próprio site serão exibidas.
 *
 * @author DownKingo Team
 */
(function () {
  "use strict";

  // ===========================================
  // CONFIGURATION
  // ===========================================

  // Prefixo para logs explícitos do DownKingo (opcional)
  var APP_PREFIX = "[DownKingo]";

  // Padrões de mensagens que devem ser BLOQUEADOS (regex ou string)
  var BLOCKED_PATTERNS = [
    // Extensões de navegador
    /chrome-extension:\/\//i,
    /moz-extension:\/\//i,
    /safari-extension:\/\//i,
    /^EXT\s*-/i,
    /storeHasCashback/i,

    // Cloudflare / Analytics noise
    /XHR finished loading/i,
    /XHR failed loading/i,
    /Fetch failed loading/i,
    /sendObjectBeacon/i,
    /cdn-cgi\/rum/i,

    // Permissions-Policy (não são erros reais, são warnings do browser)
    /Permissions-Policy/i,
    /browsing-topics/i,
    /interest-cohort/i,

    // Preload warnings (informativos, não erros)
    /was preloaded using link preload but not used/i,

    // Script-src fallback (informativo)
    /script-src.*was not explicitly set/i,
    /default-src.*is used as a fallback/i,

    // Message channel (erro de extensão)
    /listener indicated an asynchronous response/i,
    /message channel closed/i,

    // Turnstile internal (normal operation, não precisa logar)
    /Private Access Token challenge/i,

    // Generic extension patterns
    /app\.js:\d+/i,
    /\.sendObjectBeacon/i,
  ];

  // Padrões de mensagens que devem ser SEMPRE PERMITIDOS
  var ALLOWED_PATTERNS = [/^\[DownKingo\]/i, /downkingo/i];

  // ===========================================
  // CORE LOGIC
  // ===========================================

  // Guarda os métodos originais do console
  var originalConsole = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
    group: console.group
      ? console.group.bind(console)
      : console.log.bind(console),
    groupEnd: console.groupEnd
      ? console.groupEnd.bind(console)
      : function () {},
  };

  /**
   * Converte argumentos para uma string para análise
   */
  function argsToString(args) {
    try {
      return Array.prototype.map
        .call(args, function (arg) {
          if (typeof arg === "string") return arg;
          if (arg instanceof Error)
            return arg.message + " " + (arg.stack || "");
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return String(arg);
          }
        })
        .join(" ");
    } catch (e) {
      return "";
    }
  }

  /**
   * Verifica se a mensagem combina com algum padrão
   */
  function matchesPatterns(message, patterns) {
    for (var i = 0; i < patterns.length; i++) {
      var pattern = patterns[i];
      if (pattern instanceof RegExp) {
        if (pattern.test(message)) return true;
      } else if (typeof pattern === "string") {
        if (message.indexOf(pattern) !== -1) return true;
      }
    }
    return false;
  }

  /**
   * Verifica se a mensagem deve ser exibida
   */
  function shouldShowMessage(args) {
    var message = argsToString(args);

    // Se está na whitelist, sempre mostra
    if (matchesPatterns(message, ALLOWED_PATTERNS)) {
      return true;
    }

    // Se está na blacklist, bloqueia
    if (matchesPatterns(message, BLOCKED_PATTERNS)) {
      return false;
    }

    // Por padrão, mostra (para não perder logs importantes)
    return true;
  }

  /**
   * Cria um wrapper para um método do console
   */
  function createWrapper(method) {
    return function () {
      if (shouldShowMessage(arguments)) {
        originalConsole[method].apply(console, arguments);
      }
    };
  }

  // ===========================================
  // APPLY OVERRIDES
  // ===========================================

  // Aplica os wrappers
  console.log = createWrapper("log");
  console.info = createWrapper("info");
  console.warn = createWrapper("warn");
  console.error = createWrapper("error");
  console.debug = createWrapper("debug");

  // Fornece um método para logs explícitos do app (bypass do filtro)
  console.app = function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(APP_PREFIX);
    originalConsole.log.apply(console, args);
  };

  // ===========================================
  // INITIALIZATION LOG (apenas em dev)
  // ===========================================

  if (typeof window !== "undefined") {
    var isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    if (isDev) {
      originalConsole.info(
        APP_PREFIX,
        "Console filter active. Third-party logs suppressed.",
      );
    }
  }

  // ===========================================
  // DEVELOPER RECRUITMENT
  // ===========================================
  setTimeout(function () {
    // Professional Font Stack
    var titleStyle = [
      "font-size: 60px",
      "font-weight: 900",
      'font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      "color: #fff", // Fallback
      "background: -webkit-linear-gradient(right, #0ea5e9, #6366f1)", // Cyan to Indigo
      "-webkit-background-clip: text",
      "-webkit-text-fill-color: transparent",
      "text-transform: uppercase",
      "letter-spacing: -2px",
      "line-height: 1",
    ].join(";");

    var subtitleStyle = [
      "font-size: 14px",
      "color: #94a3b8", // Slate-400
      "font-family: Menlo, CONSOLAS, monospace",
      "text-transform: uppercase",
      "letter-spacing: 2px",
      "margin-top: 10px",
      "margin-bottom: 20px",
      "display: block",
    ].join(";");

    var stackStyle = [
      "font-size: 12px",
      "background: #1e293b", // Slate-800
      "color: #e2e8f0", // Slate-200
      "padding: 4px 8px",
      "border-radius: 4px",
      "font-family: monospace",
      "margin-right: 5px",
    ].join(";");

    var linkStyle = [
      "font-size: 14px",
      "color: #38bdf8", // Sky-400
      "text-decoration: none",
      "font-family: monospace",
      "border-bottom: 1px solid #38bdf8",
      "padding-bottom: 2px",
      "cursor: pointer",
    ].join(";");

    // Start Group
    originalConsole.group(
      "%c     Build the Future.     ",
      "background: #0f172a; color: #fff; padding: 4px 10px; border-radius: 4px;",
    );

    // Title & Subtitle
    originalConsole.log("%cDOWNKINGO", titleStyle);
    originalConsole.log(
      "%cThe Open Source Media Toolbox for Developers.",
      subtitleStyle,
    );

    // Tech Stack Badge Row
    originalConsole.log(
      "%cWails%cGo%cTypeScript%cReact",
      stackStyle,
      stackStyle,
      stackStyle,
      stackStyle,
    );

    // GitHub Link
    originalConsole.log(
      "\n%c→ https://github.com/down-kingo/downkingo",
      linkStyle,
    );
    originalConsole.log("\n");

    // End Group
    originalConsole.groupEnd();
  }, 1000);
})();
