import styles from "./Test.module.css";
import React, { forwardRef } from "react";
import { Transition } from "react-transition-group";

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
  unmounted: { opacity: 0 }, // don't know the reason for it, it just fixes the types
};

interface Props {
  x: number;
  y: number;
  blinking: boolean;
  hidden: boolean;
}

export const Caret = forwardRef<HTMLDivElement, Props>(({ x, y, blinking, hidden }, ref) => {
  return (
    <Transition in={true} appear={true} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...style,
            ...transitionStyles[state],
          }}
        >
          <div
            className={`${styles.caret} ${!blinking && styles.blinking} ${!hidden && styles.hidden}`}
            style={{ left: x, top: y }}
            ref={ref}
          />
        </div>
      )}
    </Transition>
  );
});
