import environment from "../utils/environment";

function DynamicEnvironmentVariables() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Dynamic Environment Variables{" "}
      </h1>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold">
          This approach dynamically replaces environment variables during
          runtime by modifying the static assets served in your application. It
          ensures that environment-specific settings (e.g., API endpoints or log
          levels) can be adjusted without rebuilding the application.
        </h2>
        <pre>
          {`
            Docker ENV =>  script to replace ENV => window.__ENV__ => environment
          `}
        </pre>

        <h3 className="mt-8 font-semibold text-pink-500">
          {" "}
          This method cannot inject sensitive variables (such as passwords,
          secret keys, etc.) because Vite is a Client-Side Render (CSR)
          framework and cannot protect sensitive data.
        </h3>
      </div>
      <div className="p-4 w-full my-4 text-left">
        <h2 className="text-xl font-bold">
          <p>
            {" "}
            API_ENDPOINT: <strong> {environment.API_ENDPOINT}</strong>
          </p>
          <p>
            {" "}
            LOG_LEVEL: <strong> {environment.LOG_LEVEL}</strong>
          </p>
        </h2>
        <pre>
          {`
            # Get variable from: 
            this.API_ENDPOINT = runtimeEnv.API_ENDPOINT || import.meta.env.VITE_API_ENDPOINT;
            this.LOG_LEVEL = runtimeEnv.LOG_LEVEL || import.meta.env.VITE_LOG_LEVEL;

            # .env.production file
            VITE_VALUE="This is a production VITE_VALUE environment variable"

            # Dynamically environment variables
            Use a Script to Inject Environment Variables
              - Modify index.html
                <script id="env-script">window.__ENV__ = {};</script>
              - Inject Variables Dynamically
                Write a script(env-inject.js) to replace window.__ENV__ dynamically at runtime.
              - Run the Injection Before Serving
                "preview": "node env-inject.js && vite preview"
              - Access the Environment Variables in Code (environment.ts)
              - ENV files
                .env (default)
                .env.production (production)
              - Docker Compose ENV (Inject Variables by ENV)
                environment:
                  API_ENDPOINT: "https://api.production.com"
                  LOG_LEVEL: "warn"
              - Run Command (Can change environment)
                environment:
                  API_ENDPOINT: "https://api.production2.com"
                  LOG_LEVEL: "error"
                Run docker-compose up
          `}
        </pre>
      </div>
    </div>
  );
}

export default DynamicEnvironmentVariables;
