import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

// clearing jsdom after each test
afterEach(() => {
  cleanup();
})