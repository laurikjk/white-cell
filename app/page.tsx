"use client";

import { useState } from "react";
import Ellipse from "./math/Ellipse"
import LineSegment from "./math/LineSegment";
import Vector from "./math/Vector";
import WhiteCell from "./math/WhiteCell";
import Line from "./math/Line";

export default function Home() {
  const ellipse = new Ellipse(0.5, 1, 100);
  const whitecell = new WhiteCell(
    ellipse,
    { from: -0.01, to: 0.01 },
    "top",
  );
  const startingLine = new LineSegment(
    new Vector(0.0, 10.1),
    new Vector(1.4, -9.6)
  );

  const first = {
    line: Line.fromLineSegment(startingLine),
    from: startingLine.a,
  };

  const [reflections, setReflections] = useState([first]);
  const [wentThrough, setWentThrough] = useState<number | null>(null);

  const next = (amnt = 1) => {
    const newReflections = [...reflections];
    for (let i = 0; i < amnt; i++) {
      const last = newReflections[newReflections.length - 1];
      const nextReflection = whitecell.nextReflection(last);
      if (whitecell.goesThroughHole(nextReflection)) {
        setWentThrough(newReflections.length);
        break;
      } 
      newReflections.push(nextReflection);
    }
    setReflections(newReflections);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">

        <h1 className="text-6xl font-bold text-center">
          WHITE CELL
        </h1>

        <button
          className="mt-8 bg-white text-black font-bold py-2 px-4 rounded"
          onClick={() => next()}
        >
          NEXT
        </button>

        <button
          className="mt-8 bg-white text-black font-bold py-2 px-4 rounded"
          onClick={() => next(10)}
        >
          NEXT 10
        </button>

        <button
          className="mt-8 bg-white text-black font-bold py-2 px-4 rounded"
          onClick={() => next(100)}
        >
          NEXT 100
        </button>
        
        <div>
          <p>
            amount of reflections: {reflections.length}
          </p>
          <p>
            goes through hole: {wentThrough ? "yes" : "no"}
          </p>
        </div>

        <div style={{
          width: "500px",
          height: "500px",
          color: "white",
          opacity: "0.5",
          marginTop: "50px",
        }} >
          <svg viewBox="-1000 -1000 2000 2000" width="100%" height="100%">
            <ellipse
              rx={ellipse.a * 1000}
              ry={ellipse.b * 1000}
              fill="none"
              stroke="white"
              strokeWidth="4"
            />
            <g>
              {reflections.map((reflection, i) => (
                <line
                  key={i}
                  x1={reflection.from.x * 100}
                  y1={reflection.from.y * 100}
                  x2={whitecell.calcCollision(reflection).x * 100}
                  y2={whitecell.calcCollision(reflection).y * 100}
                  stroke="white"
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
        
    </main>
  )
}
