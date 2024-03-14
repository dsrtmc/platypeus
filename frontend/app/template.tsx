"use client";

import React, { PropsWithChildren, Ref } from "react";
import styles from "@/components/test/Test.module.css";
import { Transition } from "react-transition-group";

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
  unmounted: { opacity: 0 }, // don't know the reason for it, it just fixes the types
};

export default function Template({ children }: PropsWithChildren<Props>) {
  return (
    <Transition in={true} appear={true} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...style,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
