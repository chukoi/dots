import { useState } from "react";
import "./dots.css";

type Dot = {
  x: number;
  y: number;
};

function Dot({ x, y }: Dot) {
  return <div className="dot" style={{ left: x, top: y }}></div>;
}

function Dots() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [removedDots, setRemovedDots] = useState<Dot[]>([]);

  const addDot = (e: React.MouseEvent<HTMLInputElement>) => {
    const { clientX, clientY } = e;
    setDots((prevDots) => [...prevDots, { x: clientX, y: clientY }]);
    // new dot added so redo set reset as this is a new sequence
    setRemovedDots([]);
  };

  const clearDots = () => {
    if (dots.length === 0) return;

    setDots([]);
  };

  const undoDot = () => {
    if (dots.length === 0) return;

    const newDots = [...dots];
    const lastDot = newDots.pop() as Dot;
    setDots(newDots);
    setRemovedDots([...removedDots, lastDot]);
  };

  const redoDot = () => {
    if (removedDots.length === 0) return;

    const newDots = [...removedDots];
    const lastDot = newDots.pop() as Dot;
    setRemovedDots(newDots);
    setDots([...dots, lastDot]);
  };

  return (
    <>
      <div className="btn-container">
        <button onClick={clearDots}>clear</button>
        <button onClick={undoDot}>undo</button>
        <button onClick={redoDot}>redo</button>
      </div>
      <div className="wrapper" onClick={addDot}>
        {dots.map((d) => (
          <Dot x={d.x} y={d.y} key={`${d.x}-${d.y}`} />
        ))}
      </div>
    </>
  );
}

export default Dots;
