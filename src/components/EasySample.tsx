import { useCallback } from "react";
import { useActor } from "@xstate/react";

import { toggleMachine } from "../library/EasyStateMachine";

export const EasySample = () => {
  const [actor, send] = useActor(toggleMachine);

  const handleStartToggle = useCallback(() => {
    send({ type: "toggle" });
  }, [send]);

  return (
    <div>
      <button
        type="button"
        className="rounded-md bg-black hover:bg-white text-white hover:text-black px-2.5 py-1.5 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={handleStartToggle}
      >
        Start
      </button>
      <div className="flex flex-col items-center">
        <p className="mt-3 text-sm leading-6 text-gray-600">
          <span className="text-base font-semibold leading-7 text-gray-900">
            State {"=> "}
          </span>
          <span className="text-base font-semibold leading-7 text-gray-900">
            {actor.value}
          </span>
          , or wait for delay 2 seconds
        </p>
        <div className="my-5">
          <img src="/easy-example.png" alt="easy example" />
        </div>
      </div>
    </div>
  );
};
