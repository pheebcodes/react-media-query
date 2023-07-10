# react-media-query

Easy to use media query hook and component for React.

## Installation

```bash
npm install @phoebecodes/react-media-query
```

## Hook Usage

```javascript
import { useMediaQuery } from "@phoebecodes/react-media-query";

function Comp() {
  /**
   * The useMediaQuery hook takes one argument and directly passes it to
   * window.matchMedia. Anything that window.matchMedia supports is
   * supported in the useMediaQuery hook.
   */
  const isDesktop = useMediaQuery("(min-width: 900px)");
  return <h1>Hello, {isDesktop ? "Desktop" : "Mobile"}!</h1>;
}
```

## Component Usage

```javascript
import { MediaQuery } from "@phoebecodes/react-media-query";

function Comp() {
  return (
    <>
      {/**
       * The MediaQuery component uses the useMediaQuery hook and conditionally
       * renders the children passed to it if the provided media query is
       * a match. The query property is passed to window.matchMedia (through
       * the useMediaQuery hook), so anything window.matchMedia supports is
       * supported by the MediaQuery component.
       */}
      <MediaQuery query="(min-width: 900px)">Hello, desktop!</MediaQuery>
      <MediaQuery query="(max-width: 899px)">Hello, mobile!</MediaQuery>
    </>
  );
}
```

## License

This project is licensed under the BSD 3 Clause license. A copy of the license
is distributed in the root of this project as a file named 'LICENSE'.
