import { setMatches } from "./matchMedia.mock.js";
import React from "react";
import { render, act, cleanup } from "react-testing-library";
import { MediaQuery, useMediaQuery } from "./index.ts";

const MATCH = "MATCH";
const NO_MATCH = "NO_MATCH";
const QUERY = "dummy query";

function HookComp() {
  return useMediaQuery(QUERY) ? MATCH : NO_MATCH;
}

afterEach(cleanup);

describe("useMediaQuery", () => {
  test("returns true when match", () => {
    setMatches(true);
    const { container } = render(<HookComp />);
    expect(container.textContent).toBe(MATCH);
  });

  test("returns false when doesn't match", () => {
    setMatches(false);
    const { container } = render(<HookComp />);
    expect(container.textContent).toBe(NO_MATCH);
  });

  test("listens to changes", () => {
    setMatches(true);
    const { container } = render(<HookComp />);
    expect(container.textContent).toBe(MATCH);
    act(() => {
      setMatches(false);
    });
    expect(container.textContent).toBe(NO_MATCH);
    act(() => {
      setMatches(true);
    });
    expect(container.textContent).toBe(MATCH);
  });
});

describe("MediaQuery", () => {
  test("renders when match", () => {
    setMatches(true);
    const { container } = render(<MediaQuery query={QUERY} children={MATCH} />);
    expect(container.textContent).toBe(MATCH);
  });

  test("doesn't render when doesn't match", () => {
    setMatches(false);
    const { container } = render(
      <MediaQuery query={QUERY} children={NO_MATCH} />
    );
    expect(container.textContent).toBe("");
  });

  test("rerenders on changes", () => {
    setMatches(true);
    const { container } = render(<MediaQuery query={QUERY} children={MATCH} />);
    expect(container.textContent).toBe(MATCH);
    act(() => {
      setMatches(false);
    });
    expect(container.textContent).toBe("");
    act(() => {
      setMatches(true);
    });
    expect(container.textContent).toBe(MATCH);
  });
});
