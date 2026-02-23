import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./NeuralBackground.css";

const NeuralBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 120,
    particles: {
      number: {
        value: 200,
        density: { enable: true, area: 800 },
      },
      color: { value: "#0e3946" },
      links: {
        enable: true,
        distance: 200,
        color: "#0e3946",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        outModes: { default: "bounce" },
      },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 250, links: { opacity: 0.8 } },
      },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <div className="neural-bg">
      <Particles
        id="tsparticles"
        options={options}
        className="particles-canvas"
      />
    </div>
  );
};

export default NeuralBackground;
