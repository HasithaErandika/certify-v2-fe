import { useState, useEffect } from "react";

interface LoadingScreenProps {
  /** Optional duration in milliseconds after which the loading screen automatically hides. Default is 2500ms. */
  duration?: number;
  /** Force loading state visibility if provided */
  isLoading?: boolean;
  /** Optional callback when loading completes */
  onFinished?: () => void;
}

export function LoadingScreen({ duration = 2500, isLoading, onFinished }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isLoading !== undefined) {
      setVisible(isLoading);
      return;
    }

    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onFinished) onFinished();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isLoading, onFinished]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000000",
        zIndex: 9999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          marginBottom: "0.5rem",
        }}
      >
        Loading ...
      </h1>
      <img
        src="/running-fox.gif"
        alt="Running Fox Loading"
        style={{
          width: "120px",
          height: "auto",
        }}
      />
    </div>
  );
}

export default LoadingScreen;
