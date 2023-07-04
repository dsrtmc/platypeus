import { useEffect, useRef } from "react";

export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    let interval = setInterval(tick, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
