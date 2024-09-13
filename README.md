# POC - React + TypeScript + Vite + TailwindCSS

This template provides a minimal setup to get React working for POC

## Getting Start

```bash
$ npm run i
$ npm run dev
```

### XState (use @xstate/react)

XState is a state management library based on the concept of finite state machines (FSMs) and statecharts. It allows you to manage complex state logic in a predictable, declarative manner by modeling your app’s states and transitions in a clear and structured way.

XState is particularly useful for managing workflows, component state, and business logic that involves multiple states and transitions, making it ideal for UI development, especially in React applications.

### Recursive Rendering
This component represents a recursive rendering of a nested tree structure (topics and subtopics), allowing users to expand and collapse each topic. Key details:

	1.	Component Structure: It uses a recursive component (RenderTopic) to display hierarchical topics, toggling visibility with state (isExpanded).
	2.	HTML Semantics: The topics are rendered as a list (<ul>, <li>), keeping the structure meaningful for screen readers.
	3.	Recursive Nested Components: Each topic renders its subtopics recursively through RenderTopic, enabling deeply nested structures to be displayed dynamically.