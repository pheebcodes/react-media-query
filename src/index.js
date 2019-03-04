import React from "react";

export const useMediaQuery =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? useMediaQueryBrowser
    : useMediaQueryServer;

function useMediaQueryBrowser(query) {
  const [matches, setMatches] = React.useState();

  React.useLayoutEffect(
    () => {
      if (query) {
        const mq = window.matchMedia(query);
        const cb = () => {
          setMatches(mq.matches);
        };
        mq.addListener(cb);
        setMatches(mq.matches);

        return () => {
          mq.removeListener(cb);
        };
      }
    },
    [query]
  );

  return matches;
}

function useMediaQueryServer(_query, ssr = false) {
  return !!ssr;
}

export function MediaQuery({ query, children, ssr }) {
  const matches = useMediaQuery(query, ssr);
  return matches ? children : null;
}
