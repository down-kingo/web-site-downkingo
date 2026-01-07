export default {
  async fetch(request, env) {
    // Serve static assets if found
    return env.ASSETS.fetch(request);
  },
};
