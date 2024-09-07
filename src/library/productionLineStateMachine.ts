import { fromPromise, assign, setup, raise } from "xstate";

/**
 * Scenario: Industrial Production Line State Machine
 * This state machine simulates an automated production line with multiple stages:
 *
 * 1. Inspecting the Product: The system checks if the product meets quality standards.
 * 2. Packaging the Product: After inspection, if the product passes, it goes to packaging.
 * 3. Retry Mechanism: If the inspection fails, the system retries up to 3 times.
 * 4. Maintenance Mode: If the retries exceed the limit or packaging fails, the system enters maintenance mode.
 */
export type ProductionLineContext = {
  retries: number;
  maxRetries: number;
};

export const productionLineStateMachine = setup({
  types: {
    context: {} as ProductionLineContext,
    events: {} as { type: "START" } | { type: "RETRY" },
  },
  actors: {
    inspectProduct: fromPromise(async () => {
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve();
          } else {
            reject();
          }
        }, 2000)
      );
    }),
    packageProduct: fromPromise(async () => {
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve();
          } else {
            reject();
          }
        }, 2000)
      );
    }),
  },
  guards: {
    canRetry: ({ context }) => context.retries < context.maxRetries, // Guard logic to check retries
  },
}).createMachine({
  id: "productionLine",
  initial: "idle",
  context: {
    retries: 0, // Initialize retries to 0
    maxRetries: 3, // Define the maximum number of retries
  },
  states: {
    idle: {
      description: "Let's Start !!!",
      on: {
        START: "inspecting",
      },
    },
    inspecting: {
      invoke: {
        src: "inspectProduct",
        onDone: {
          target: "packaging",
        },
        onError: [
          {
            guard: "canRetry",
            target: "retrying",
          },
          {
            target: "maintenance",
          },
        ],
      },
    },
    retrying: {
      entry: [
        assign({
          retries: ({ context }) => {
            console.log(context);
            return context.retries + 1; // Increment retries
          },
        }),
        raise({ type: "RETRY" }),
      ],
      on: {
        RETRY: "inspecting", // Retry by transitioning back to 'inspecting'
      },
    },
    packaging: {
      invoke: {
        src: "packageProduct",
        onDone: {
          target: "success",
        },
        onError: "maintenance",
      },
    },
    success: {
      type: "final",
    },
    maintenance: {
      type: "final",
    },
  },
});
