import { useActor } from "@xstate/react";
import { productionLineStateMachine } from "../library/productionLineStateMachine";

const ProductionLine: React.FC = () => {
  const [actor, send] = useActor(productionLineStateMachine);

  console.log("actor:", actor);
  const handleStartToggle = () => {
    send({ type: "START" });
  };

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
        </p>
        <p className="text-base font-semibold leading-7 text-gray-900">
          retries: {actor.context.retries}
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          <span className="text-base font-semibold leading-7 text-gray-900">
            Status {"=> "}
          </span>
          <span className="text-base font-semibold leading-7 text-gray-900">
            {actor.status}
          </span>
        </p>
      </div>
      <div className="my-5">
        <img src="/production-line.png" alt="production line" />
      </div>
    </div>
  );
};

export default ProductionLine;
