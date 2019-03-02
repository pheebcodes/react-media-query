import React from "react";
import "react-testing-library/cleanup-after-each";
import { render } from "react-testing-library";
import { MediaQuery, useMediaQuery } from "../src/";

const MATCH = "MATCH";
const NO_MATCH = "NO_MATCH";
const QUERY = "dummy query";

function buildMatchMedia(matches) {
  return () => ({
    matches,
    addListener: () => undefined,
    removeListener: () => undefined
  });
}

function HookComp() {
  return useMediaQuery(QUERY) ? MATCH : NO_MATCH;
}

describe("useMediaQuery", () => {
  test("returns true when match", () => {
    window.matchMedia = buildMatchMedia(true);
    const { container } = render(<HookComp />);
    expect(container.textContent).toBe(MATCH);
  });

  test("returns false when doesn't match", () => {
    window.matchMedia = buildMatchMedia(false);
    const { container } = render(<HookComp />);
    expect(container.textContent).toBe(NO_MATCH);
  });
});

describe("MediaQuery", () => {
  test("renders when match", () => {
    window.matchMedia = buildMatchMedia(true);
    const { container } = render(<MediaQuery query={QUERY} children={MATCH} />);
    expect(container.textContent).toBe(MATCH);
  });

  test("doesn't render when doesn't match", () => {
    window.matchMedia = buildMatchMedia(false);
    const { container } = render(
      <MediaQuery query={QUERY} children={NO_MATCH} />
    );
    expect(container.textContent).toBe("");
  });
});
