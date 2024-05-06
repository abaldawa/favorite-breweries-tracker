/**
 * @author Abhijit Baldawa
 */

import { useEffect, useState } from "react";

/**
 * @public
 *
 * This hook determines whether the provided dom element ref
 * is visible in the viewport or not
 *
 * @param domElementRefToObserve
 * @param shouldObserve - Turn observing element on/off on the fly
 * @returns
 */
const useIsElementVisible = (
  domElementRefToObserve: React.RefObject<HTMLElement>,
  shouldObserve: boolean
) => {
  const [isElementVisible, setIsElementVisible] = useState(false);

  useEffect(() => {
    const domElementToObserve = domElementRefToObserve.current;

    let observer: IntersectionObserver | undefined;

    if (domElementToObserve && shouldObserve) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setIsElementVisible(true);
          } else {
            setIsElementVisible(false);
          }
        },
        { threshold: 1 }
      );

      observer.observe(domElementToObserve);
    }

    return () => {
      if (domElementToObserve && shouldObserve) {
        observer?.unobserve(domElementToObserve);
      }
    };
  }, [domElementRefToObserve, shouldObserve]);

  return isElementVisible;
};

export { useIsElementVisible };
