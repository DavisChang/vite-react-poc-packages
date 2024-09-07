import ProductionLine from "../components/ProductionLine";
import { EasySample } from "../components/EasySample";
import { ContextState } from "../components/ContextState";

function XStatePage() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        XState (use @xstate/react)
      </h1>
      <p className="mt-3 leading-6 text-gray-600">
        XState is a state management library based on the concept of finite
        state machines (FSMs) and statecharts. It allows you to manage complex
        state logic in a predictable, declarative manner by modeling your app’s
        states and transitions in a clear and structured way. XState is
        particularly useful for managing workflows, component state, and
        business logic that involves multiple states and transitions, making it
        ideal for UI development, especially in React applications.
      </p>
      <div className="flex flex-col justify-center gap-x-6 py-5">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          EasySample
        </h2>
        <EasySample />
        <br />
      </div>

      <div className="flex flex-col justify-center gap-x-6 py-5">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ContextState
        </h2>
        <ContextState />
        <br />
      </div>

      <div className="flex flex-col justify-center gap-x-6 py-5">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ProductionLine
        </h2>
        <ProductionLine />
        <br />
      </div>

      <div className="text-slate-500 hover:text-slate-600">
        <div className="my-4">
          <a href="https://stately.ai/docs/examples" target="_blank">
            More about XState examples
          </a>
        </div>
      </div>
    </>
  );
}

export default XStatePage;
