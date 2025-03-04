import { useState, useEffect } from "react";

const ProcessorSpeedChecker = () => {
  const [cpuCores, setCpuCores] = useState(null);
  const [estimatedSpeed, setEstimatedSpeed] = useState(null);

  useEffect(() => {
    setCpuCores(navigator.hardwareConcurrency || "Unknown");

    // Estimate speed by running a computation-heavy loop
    const estimateSpeed = () => {
      let start = performance.now();
      let num = 0;
      for (let i = 0; i < 1e7; i++) {
        num += Math.sqrt(i);
      }
      let end = performance.now();
      return (1e7 / (end - start)).toFixed(2) + " operations/ms";
    };

    setEstimatedSpeed(estimateSpeed());
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Processor Info</h2>
      <p><strong>CPU Cores:</strong> {cpuCores}</p>
      <p><strong>Estimated Speed:</strong> {estimatedSpeed}</p>
    </div>
  );
};

export default ProcessorSpeedChecker;
