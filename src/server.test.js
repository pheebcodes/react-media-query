/**
 * @jest-environment node
 */
import React from "react";
import ReactDOMServer from "react-dom/server";
import { useMediaQuery, MediaQuery } from "./index.ts";

const MATCH = "MATCH";
const NO_MATCH = "NO_MATCH";
const QUERY = "dummy query";

function HookComp({ ssr }) {
  return useMediaQuery(QUERY, ssr) ? MATCH : NO_MATCH;
}

describe("useMediaQuery", () => {
  test("returns second param (with false as default)", () => {
    const defaultMatch = ReactDOMServer.renderToString(<HookComp />);
    expect(defaultMatch).toBe(NO_MATCH);

    const match = ReactDOMServer.renderToString(<HookComp ssr={true} />);
    expect(match).toBe(MATCH);

    const noMatch = ReactDOMServer.renderToString(<HookComp ssr={false} />);
    expect(noMatch).toBe(NO_MATCH);
  });
});

describe("MediaQuery", () => {
  test("renders if ssr prop is true", () => {
    const s = ReactDOMServer.renderToString(
      <MediaQuery query={QUERY} children={MATCH} ssr={true} />
    );
    expect(s).toBe(MATCH);
  });

  test("doesn't render if ssr prop is false", () => {
    const s = ReactDOMServer.renderToString(
      <MediaQuery query={QUERY} children={MATCH} ssr={false} />
    );
    expect(s).toBe("");
  });

  test("by default doesn't render if ssr prop isn't provided", () => {
    const s = ReactDOMServer.renderToString(
      <MediaQuery query={QUERY} children={MATCH} />
    );
    expect(s).toBe("");
  });
});
