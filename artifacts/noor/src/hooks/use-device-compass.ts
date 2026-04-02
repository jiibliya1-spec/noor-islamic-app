import { useState, useEffect, useCallback } from "react";

export type CompassPermission = "unknown" | "granted" | "denied" | "unavailable";

/**
 * Real-time device compass using DeviceOrientationEvent.
 * - iOS 13+: requests permission before listening
 * - Android/desktop: starts listening immediately (no permission needed)
 *
 * Returns:
 *   heading   – device compass heading in degrees (0 = North, CW). null when unavailable.
 *   permission – current sensor permission state
 *   requestPermission – call this from a user gesture (button tap)
 */
export function useDeviceCompass() {
  const [heading, setHeading] = useState<number | null>(null);
  const [permission, setPermission] = useState<CompassPermission>(() => {
    // On Android / desktop no explicit permission is needed, so we grant eagerly.
    // On iOS we must wait for a user gesture.
    if (typeof DeviceOrientationEvent === "undefined") return "unavailable";
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      return "unknown"; // iOS — needs button tap
    }
    return "granted"; // Android / desktop
  });

  useEffect(() => {
    if (permission !== "granted") return;

    const handler = (e: DeviceOrientationEvent) => {
      // iOS reports the already-corrected compass heading in webkitCompassHeading (0=N, CW).
      // Android reports e.alpha which is CCW from North, so we convert: heading = (360 - alpha) % 360.
      const webkitHeading = (e as any).webkitCompassHeading as number | undefined;
      let newHeading: number;

      if (webkitHeading != null && !isNaN(webkitHeading)) {
        newHeading = webkitHeading;
      } else if (e.alpha != null) {
        newHeading = (360 - e.alpha) % 360;
      } else {
        return; // no data available
      }

      // Accumulate shortest-path delta to avoid 0/360 wrap-around jump in CSS transitions
      setHeading(prev => {
        if (prev === null) return newHeading;
        const delta = ((newHeading - prev + 540) % 360) - 180;
        return prev + delta;
      });
    };

    window.addEventListener("deviceorientation", handler, true);
    return () => window.removeEventListener("deviceorientation", handler, true);
  }, [permission]);

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setPermission("unavailable");
      return;
    }
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      // iOS 13+ — must be called from a user gesture
      try {
        const result = await (DeviceOrientationEvent as any).requestPermission();
        setPermission(result === "granted" ? "granted" : "denied");
      } catch {
        setPermission("denied");
      }
    } else {
      setPermission("granted"); // Android / desktop
    }
  }, []);

  return { heading, permission, requestPermission };
}
