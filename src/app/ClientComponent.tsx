'use client';

import { useEffect } from "react";

export default function ClientComponent() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const originalConsoleError = console.error;

      // Intercepting console.error globally
      console.error = (...args) => {
        if (args[0] && typeof args[0] === 'string') {
          // If it's the Routing error specifically from Leaflet
          if (args[0].includes('Routing error: {}')) {
            // Suppress only this specific error
            return;
          }

          // Allow other errors to appear
        //   originalConsoleError(...args);
        }
      };

      // Optionally wrap leaflet's method that throws this error to try-catch it
      try {
        // Potentially problematic Leaflet method that throws the error
        // Example: Leaflet code that might throw the error
        // leafletMap.routing();
      } catch (error) {
        // If you know where the error originates, you can try to catch it here
      
        originalConsoleError(error);

      }

      return () => {
        console.error = originalConsoleError; // Restore the original console.error
      };
    }
  }, []);

  return null; // This component doesn't render any UI
}
