export type Listener<T> = (payload: T) => void;

export const createStore = <T>(initialState: T) => {
    let state = initialState;

    const listeners = new Set<Listener<T>>();

    const get = () => state;

    const subscribe = (fn: Listener<T>): (() => void) => {
        listeners.add(fn);
        return () => listeners.delete(fn);
    };

    const notify = (updater: T | ((prev: T) => T)) => {
        const payload =
            typeof updater === "function"
                ? (updater as (prev: T) => T)(state as T)
                : updater;

        state = payload;
        listeners.forEach((fn) => fn(payload));
    };

    return {
        subscribe,
        notify,
        get,
    };
};

export type Store<T> = ReturnType<typeof createStore<T>>;
