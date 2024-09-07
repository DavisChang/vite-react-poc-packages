import { assign, setup } from "xstate";

type TInput = {
  maxCount: number;
};
type TContext = {
  count: number;
  maxCount: number;
};

export const toggleWithContextMachine = setup({
  types: {
    context: {} as TContext,
    input: {} as TInput,
    events: {} as { type: "toggle" },
  },
}).createMachine({
  id: "toggle",
  context: ({ input }) => ({
    count: 0,
    maxCount: input.maxCount,
  }),
  initial: "Inactive",
  states: {
    Inactive: {
      on: {
        toggle: {
          // Only trigger toggle transition if count is less than maxCount
          guard: ({ context }) => context.count < context.maxCount,
          target: "Active",
        },
      },
    },
    Active: {
      entry: assign({
        count: ({ context }) => context.count + 1,
      }),
      on: { toggle: "Inactive" },
      after: { 2000: "Inactive" },
    },
  },
});
