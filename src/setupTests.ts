// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { setLogger } from "react-query";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// silence react-query errors
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
