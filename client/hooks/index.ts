import { RequestError, RequestOptions, ReturnRequest, http, typeUtils } from "@/utils";
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
        const newState = typeUtils.isFunction(update) ? update(prevState) : update;
        return { ...prevState, newState };
      }
      return prevState;
    });
  }, []);
  return [state, newSetState];
};

export function useFetch<T>({
  url,
  data,
  method,
  params,
}: RequestOptions): [T, boolean, RequestError] {
  // better to use a global loading backdrop
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<T | undefined>();
  const [error, setError] = useState<RequestError | undefined>();

  const callback: () => ReturnRequest<T> = useCallback(() => {
    return http.send({ url, data, method, params });
  }, [url, data, method, params]);

  useEffect(() => {
    setLoading(true);
    setValue(undefined);
    setError(undefined);
    const request: ReturnRequest<T> = callback();
    request
      .then((data: T) => setValue(data))
      .catch(setError)
      .finally(() => setLoading(false));

    return () => {
      request.cancel();
      setLoading(false);
    };
  }, [callback]);

  return [value, loading, error];
}
