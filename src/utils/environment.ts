class Environment {
  API_ENDPOINT: string;
  LOG_LEVEL: string;

  constructor() {
    const runtimeEnv = (window as any).__ENV__ || {};
    this.API_ENDPOINT =
      runtimeEnv.API_ENDPOINT || import.meta.env.VITE_API_ENDPOINT;
    this.LOG_LEVEL = runtimeEnv.LOG_LEVEL || import.meta.env.VITE_LOG_LEVEL;
  }
}

const environment = new Environment();

export default environment;
