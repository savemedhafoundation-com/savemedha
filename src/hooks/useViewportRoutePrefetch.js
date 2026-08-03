import { useEffect } from "react";
import { prefetchRouteByKey } from "../routing/routeRegistry";

export default function useViewportRoutePrefetch(
  rootRef,
  { rootMargin = "220px 0px", threshold = 0.01 } = {}
) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root || typeof window === "undefined") {
      return undefined;
    }

    const routeNodes = new WeakSet();
    const maybeWarmRoute = (node) => {
      if (!node || routeNodes.has(node)) {
        return;
      }

      routeNodes.add(node);
      intersectionObserver.observe(node);
    };

    const intersectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                  return;
                }

                const routeKey =
                  entry.target.getAttribute("data-prefetch-route");

                if (routeKey) {
                  prefetchRouteByKey(routeKey);
                }

                intersectionObserver.unobserve(entry.target);
              });
            },
            { root: null, rootMargin, threshold }
          )
        : null;

    const scan = () => {
      root.querySelectorAll("[data-prefetch-route]").forEach((node) => {
        if (intersectionObserver) {
          maybeWarmRoute(node);
          return;
        }

        const routeKey = node.getAttribute("data-prefetch-route");
        if (routeKey) {
          prefetchRouteByKey(routeKey);
        }
      });
    };

    scan();

    const mutationObserver = new MutationObserver(() => {
      scan();
    });

    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [rootRef, rootMargin, threshold]);
}
