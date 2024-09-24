import { useEffect, useState } from "react";

/**
 * A hook that debounces a value.
 *
 * The main use case for this is when you have a value that changes
 * rapidly, but you don't want to execute a function on every change.
 * Instead, you want to execute it after the value has stopped changing
 * for a certain amount of time.
 *
 * For example, you might have a search bar that sends a request to a
 * server whenever the user types something. If the user types "hello",
 * you don't want to send a request for "h", then for "he", then for
 * "hel", and finally for "hello". You want to send a single request
 * after the user has stopped typing.
 *
 * @param value The value that you want to debounce.
 * @param delay The amount of time (in milliseconds) that the value must
 *              not change before the debounced value is updated.
 * @returns The debounced value.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  /**
   * The debounced value is the value that is returned by this hook.
   * It is the value that is most recently known to have been stable
   * for at least `delay` milliseconds.
   */
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  /**
   * This effect is run every time the value changes, and it is also
   * run once when the component is mounted.
   *
   * When it is run, it schedules a function to be executed after
   * `delay` milliseconds have passed. When that function is executed,
   * it updates the debounced value to be the current value.
   *
   * If the value changes while the effect is waiting for the
   * function to be executed, the timeout is cleared and a new
   * timeout is scheduled. This ensures that the debounced value is
   * not updated until the value has stopped changing.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      /**
       * This function is executed after `delay` milliseconds have
       * passed since the value last changed. It updates the debounced
       * value to be the current value.
       */
      setDebouncedValue(value);
    }, delay);

    /**
     * This function is executed when the component is unmounted, or
     * when the value changes. It clears the timeout that was scheduled
     * by the previous execution of this effect.
     */
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  /**
   * The debounced value is returned by this hook.
   */
  return debouncedValue;
};


