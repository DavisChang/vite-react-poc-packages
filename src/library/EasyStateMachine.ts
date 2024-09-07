import { setup } from "xstate";

export const toggleMachine = setup({
  types: {
    events: {} as { type: "toggle" },
  },
}).createMachine({
  id: "toggle",
  initial: "Inactive",
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      on: { toggle: "Inactive" },
      after: { 2000: "Inactive" },
    },
  },
});
