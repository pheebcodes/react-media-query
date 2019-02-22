import React from "react";

export function useMediaQuery(query) {
  const lastQuery = React.useRef();
  const mq = React.useRef();
  const callback = React.useRef();
  const [matches, setMatches] = React.useState();

  if (lastQuery.current !== query) {
    if (mq.current) {
      mq.current.removeListener(callback.current);
      mq.current = null;
      callback.current = null;
    }

    if (query) {
      mq.current = window.matchMedia(query);

      callback.current = () => {
        setMatches(mq.current.matches);
      };

      mq.current.addListener(callback.current);

      if (lastQuery.current === undefined) {
        setMatches(mq.current.matches);
      }
    }

    lastQuery.current = query;
  }

  return matches;
}

export function MediaQuery({ query, render, children }) {
  const matches = useMediaQuery(query);

  if (matches && render) {
    return render();
  } else if (matches) {
    return children;
  }
  return null;
}
