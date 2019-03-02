import React from "react";

export function useMediaQuery(query) {
  const lastQuery = React.useRef();
  const cancel = React.useRef();
  const [matches, setMatches] = React.useState();

  if (lastQuery.current !== query) {
    if (cancel.current) {
      cancel.current();
      cancel.current = null;
    }

    if (query) {
      const mq = window.matchMedia(query);
      const cb = () => {
        setMatches(mq.matches);
      };
      mq.addListener(cb);

      cancel.current = () => {
        mq.removeListener(cb);
      };

      if (
        lastQuery.current === undefined ||
        lastQuery.current === null ||
        lastQuery.current === ""
      ) {
        setMatches(mq.matches);
      }
    }

    lastQuery.current = query;
  }

  React.useEffect(() => cancel.current, [cancel.current]);

  return matches;
}

export function MediaQuery({ query, children }) {
  const matches = useMediaQuery(query);
  return matches ? children : null;
}
