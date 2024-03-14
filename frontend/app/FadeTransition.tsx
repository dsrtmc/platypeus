"use client";

import React, { PropsWithChildren, Ref, useRef } from "react";
import { Transition } from "react-transition-group";
import styles from "./page.module.css";

interface Props {}

const duration = 300;

const style = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 }, // don't know the point of this one, needed for the types to work
};

export const FadeTransition: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  // TODO: throws a warning that ref isn't added even though it is?
  // TODO: use a HOC to avoid having to use a wrapping <div>?
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <Transition nodeRef={ref} in={true} appear={true} timeout={duration}>
      {/* TODO: would highly appreciate getting rid of this wrapper div for it ruins my styling */}
      {(state) => (
        <div
          style={{
            ...style,
            ...transitionStyles[state],
          }}
          ref={ref}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
