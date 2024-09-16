import { useEffect, useRef } from "react";

/**
 * Custom hook to run useEffect after the component has mounted (skipping the initial render).
 * @param callback - The function to run after mount.
 * @param dependencies - The dependency array for the effect.
 */
const useEffectAfterMount = (callback: () => void, dependencies: any[]) => {
  const hasMounted = useRef(false); // Ref to track if the component has mounted

  useEffect(() => {
    if (hasMounted.current) {
      // If the component has mounted, run the callback
      callback();
    } else {
      // Set ref to true after initial render
      hasMounted.current = true;
    }
  }, dependencies); // Dependencies for the effect
};

export default useEffectAfterMount;
