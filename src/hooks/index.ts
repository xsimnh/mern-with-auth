import { typeUtils } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export const useMount = (fn: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
};

export const useUnmount = (fn: () => void) => {
  const fnRef = useLatest(fn);
  fnRef.current = fn;
  useMount(() => () => fnRef.current());
};

export const useLatest = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: S | Pick<S, K> | null | ((prevState: Readonly<S>) => S | Pick<S, K> | null)
) => void;

export const useSetState = <S extends Record<string, any>>(initialState: S): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);
  const newSetState = useCallback((update) => {
    setState((prevState) => {
      if (update) {
        console.log(update);
        const newState = typeUtils.isFunction(update) ? update(prevState) : update;
        return { ...prevState, newState };
      }
      return prevState;
    });
  }, []);
  return [state, newSetState];
};
