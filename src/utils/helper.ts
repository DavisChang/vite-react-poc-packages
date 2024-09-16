/**
 * Debouncing: Ensures that a function is only called after a specified delay
 * since the last invocation. This is useful for scenarios like input validation or window resizing.
 * @param func - The function to debounce.
 * @param delay - The delay (in ms) after which the function should be invoked.
 * @returns A debounced function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: Parameters<T>): void {
    // Explicitly typing `this` as `any`
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttling: Ensures a function is called at most once every specified time interval,
 * even if triggered repeatedly (e.g., scroll events).
 * @param func - The function to throttle.
 * @param limit - The time limit (in ms) between function calls.
 * @returns A throttled function.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function (this: any, ...args: Parameters<T>): void {
    // Explicitly typing `this` as `any`
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}
