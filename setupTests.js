import "@testing-library/jest-dom";
import { vi } from "vitest";

globalThis.BroadcastChannel = vi.fn().mockImplementation(() => ({
  postMessage: vi.fn(),
  onmessage: null,
  close: vi.fn(),
}));
