import * as React from "react";

export const useMediaQuery: (query: string, ssr?: boolean) => boolean =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? useMediaQueryBrowser
    : useMediaQueryServer;

function useMediaQueryBrowser(query: string, _ssr?: boolean): boolean {
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

      return undefined;
    },
    [query]
  );

  return matches;
}

function useMediaQueryServer(_query: string, ssr?: boolean): boolean {
  return !!ssr;
}

interface MediaQueryProps {
  query: string,
  ssr: boolean,
  children: any
};

export function MediaQuery({ query, children, ssr }: MediaQueryProps) {
  const matches: boolean = useMediaQuery(query, ssr);
  return matches ? children : null;
}
