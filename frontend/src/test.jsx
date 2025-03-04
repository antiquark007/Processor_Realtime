import { useState, useEffect } from "react";
//talk is cheap see the code
const CPUInfo = () => {
  const [cpuCores, setCpuCores] = useState(null);
  const [estimatedSpeed, setEstimatedSpeed] = useState(null);
  const [memoryInfo, setMemoryInfo] = useState(null);
  const [gpuInfo, setGpuInfo] = useState("Unknown");
  const [osInfo, setOsInfo] = useState("Unknown");

  useEffect(() => {
    // Fetch CPU Cores
    setCpuCores(navigator.hardwareConcurrency || "Unknown");

    // Fetch Memory Chrome-only
    setMemoryInfo(navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Unavailable");

    // OS Info from User-Agent
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) setOsInfo("Windows");
    else if (userAgent.includes("Mac")) setOsInfo("MacOS");
    else if (userAgent.includes("Linux")) setOsInfo("Linux");
    else if (userAgent.includes("Android")) setOsInfo("Android");
    else if (userAgent.includes("iPhone")) setOsInfo("iOS");
    else setOsInfo("Unknown");

    // WebGL Renderer for GPU Info
    const getGPUInfo = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          setGpuInfo(
            debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown GPU"
          );
        }
      } catch (e) {
        setGpuInfo("Unavailable");
      }
    };
    getGPUInfo();

    // CPU speed by calculation
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
      <h2>System Performance Info</h2>
      <p><strong>CPU Cores:</strong> {cpuCores}</p>
      <p><strong>Estimated Speed:</strong> {estimatedSpeed}</p>
      <p><strong>Memory Available:</strong> {memoryInfo}</p>
      <p><strong>Operating System:</strong> {osInfo}</p>
      <p><strong>GPU Info:</strong> {gpuInfo}</p>
    </div>
  );
};

export default CPUInfo;
