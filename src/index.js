import React from "react";

export function useMediaQuery(query) {
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

export function MediaQuery({ query, children }) {
  const matches = useMediaQuery(query);
  return matches ? children : null;
}
