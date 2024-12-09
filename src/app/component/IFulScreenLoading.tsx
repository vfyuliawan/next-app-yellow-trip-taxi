import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { useLoading } from "../context/ILoadingContext";

const FullscreenLoader = () => {
  const { isLoading } = useLoading(); // Access the loading state from context

  if (!isLoading) return null; // If not loading, return nothing (remove overlay)

  return (
    <div
      style={{
        zIndex: isLoading ? 9999 : -999999,
        backgroundColor: isLoading ? "rgba(255, 255, 255, 0.7)" : "transparent",
      }}
      className="fullscreen-overlay"
    >
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
};

export default FullscreenLoader;
