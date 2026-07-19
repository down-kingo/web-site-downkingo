(() => {
  const SITE_ORIGIN = "https://downkingo.com";
  const CONTROLLER_KEY = "__downKingoWebMcpController";

  const getLanguage = () =>
    document.documentElement.lang.toLowerCase().startsWith("pt") ? "pt-BR" : "en";

  const getPageLinks = (language = getLanguage()) => {
    const isPortuguese = language === "pt-BR";
    const prefix = isPortuguese ? "/pt" : "";

    return {
      home: `${SITE_ORIGIN}${prefix}/`,
      download: `${SITE_ORIGIN}${prefix}/download/`,
      documentation: `${SITE_ORIGIN}${prefix}/docs/`,
      use_cases: `${SITE_ORIGIN}${isPortuguese ? "/pt/casos-de-uso/" : "/use-cases/"}`,
      blog: `${SITE_ORIGIN}${prefix}/blog/`,
      roadmap: `${SITE_ORIGIN}${prefix}/roadmap/`,
      source_code: "https://github.com/down-kingo/downkingo",
    };
  };

  const textResult = (text) => ({
    content: [{ type: "text", text }],
  });

  const registerWebMcpTools = async () => {
    const modelContext = document.modelContext || navigator.modelContext;

    if (!modelContext || typeof modelContext.registerTool !== "function") return;
    if (window[CONTROLLER_KEY]) return;

    const controller = new AbortController();
    window[CONTROLLER_KEY] = controller;

    const tools = [
      {
        name: "getDownKingoSiteInfo",
        description: "Returns verified information and official links for the DownKingo desktop media toolbox.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          idempotentHint: true,
        },
        execute: async () => {
          const links = getPageLinks();
          return textResult(JSON.stringify({
            name: "DownKingo",
            type: "Free and open-source desktop media toolbox",
            platforms: ["Windows", "Linux", "macOS"],
            capabilities: [
              "Download media from supported websites",
              "Convert audio, video, and images",
              "Transcribe audio and video locally",
            ],
            privacy: "Media processing runs locally on the user's computer.",
            currentPage: window.location.href,
            officialLinks: links,
          }));
        },
      },
      {
        name: "getDownKingoPageLink",
        description: "Returns the official DownKingo URL for a requested site section and language.",
        inputSchema: {
          type: "object",
          properties: {
            destination: {
              type: "string",
              description: "The DownKingo section to open or cite.",
              enum: ["home", "download", "documentation", "use_cases", "blog", "roadmap", "source_code"],
            },
            language: {
              type: "string",
              description: "Preferred language for the destination page.",
              enum: ["en", "pt-BR"],
            },
          },
          required: ["destination"],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          idempotentHint: true,
        },
        execute: async ({ destination, language }) => {
          const links = getPageLinks(language || getLanguage());
          return textResult(JSON.stringify({ destination, url: links[destination] }));
        },
      },
      {
        name: "getDownKingoDownloadOption",
        description: "Returns the official DownKingo download page anchored to a requested desktop operating system.",
        inputSchema: {
          type: "object",
          properties: {
            operatingSystem: {
              type: "string",
              description: "Desktop operating system that will run DownKingo.",
              enum: ["windows", "linux", "macos"],
            },
            language: {
              type: "string",
              description: "Preferred language for the download page.",
              enum: ["en", "pt-BR"],
            },
          },
          required: ["operatingSystem"],
          additionalProperties: false,
        },
        annotations: {
          readOnlyHint: true,
          idempotentHint: true,
        },
        execute: async ({ operatingSystem, language }) => {
          const downloadPage = getPageLinks(language || getLanguage()).download;
          const cardId = operatingSystem === "macos" ? "card-mac" : `card-${operatingSystem}`;
          return textResult(JSON.stringify({
            operatingSystem,
            url: `${downloadPage}#${cardId}`,
          }));
        },
      },
    ];

    const registrations = tools.map((tool) =>
      modelContext.registerTool(tool, { signal: controller.signal })
    );

    const results = await Promise.allSettled(registrations);
    const failures = results.filter((result) => result.status === "rejected");

    if (failures.length > 0) {
      console.warn(`DownKingo WebMCP: ${failures.length} tool registration(s) failed.`);
    }
  };

  const setupDownloadSelectors = () => {
    document.querySelectorAll("[data-download-selector]").forEach((form) => {
      if (form.dataset.webMcpReady === "true") return;
      form.dataset.webMcpReady = "true";

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) return;

        const operatingSystem = new FormData(form).get("operatingSystem");
        const cardId = operatingSystem === "macos" ? "card-mac" : `card-${operatingSystem}`;
        const target = document.getElementById(cardId);

        if (!target) return;

        target.setAttribute("tabindex", "-1");
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.focus({ preventScroll: true });

        if (event.agentInvoked && typeof event.respondWith === "function") {
          event.respondWith(Promise.resolve(textResult(
            `Showing the ${operatingSystem} download option at ${window.location.origin}${window.location.pathname}#${cardId}`
          )));
        }
      });
    });
  };

  const initialize = () => {
    setupDownloadSelectors();
    registerWebMcpTools().catch(() => {
      console.warn("DownKingo WebMCP tools could not be initialized.");
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  document.addEventListener("astro:page-load", setupDownloadSelectors);
})();
