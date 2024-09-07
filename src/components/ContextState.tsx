import { useCallback } from "react";
import { useActor } from "@xstate/react";

import { toggleWithContextMachine } from "../library/ContextStateMachine";

const MAX_COUNT = 5;
export const ContextState = () => {
  const [actor, send] = useActor(toggleWithContextMachine, {
    input: { maxCount: 10 },
  });

  const handleStartToggle = useCallback(() => {
    send({ type: "toggle" });
  }, [send]);

  return (
    <div>
      <button
        type="button"
        className="rounded-md bg-black hover:bg-white text-white hover:text-black
        px-2.5 py-1.5 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
        onClick={handleStartToggle}
        disabled={actor.context.count === MAX_COUNT}
      >
        Start {`${actor.context.count === MAX_COUNT ? "(X)" : ""}`}
      </button>
      <div className="flex flex-col items-center">
        <p className="mt-3 text-sm leading-6 text-gray-600">
          <span className="text-base font-semibold leading-7 text-gray-900">
            State {"=> "}
          </span>
          <span className="text-base font-semibold leading-7 text-gray-900">
            {actor.value}
          </span>
          , or wait for delay 2 seconds.
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          maxCount only
          <span className="text-base font-semibold leading-7 text-gray-900">
            {` ${MAX_COUNT} `}
          </span>
          times, the count is
          <span className="text-base font-semibold leading-7 text-gray-900">
            {` ${actor.context.count} `}
          </span>
        </p>
        <div className="my-5">
          <img src="/with-context.png" alt="easy example with context" />
        </div>
      </div>
    </div>
  );
};
