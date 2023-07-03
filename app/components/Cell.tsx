"use client";

import { useState } from "react";
import Ellipse from "../math/Ellipse";
import LineSegment from "../math/LineSegment";
import Vector from "../math/Vector";
import WhiteCell from "../math/WhiteCell";
import Line from "../math/Line";
import { getEllipseSVGParams } from "./utils";

type Props = {
    a: number;
    b: number;
    c: number;
    startX: number
    startY: number
    endX: number
    endY: number
};

export default function Home({ 
    a,
    b,
    c,
    startX,
    startY,
    endX,
    endY,
}: Props) {
  const ellipse = new Ellipse(a, b, c);
  const entry = { from: startX - 0.01, to: startX + 0.01}
  const whitecell = new WhiteCell(ellipse, entry, "top");

  const startingLine = new LineSegment(
    new Vector(startX, startY),
    new Vector(endX, endY)
  );

  const first = startingLine ? [{
    line: Line.fromLineSegment(startingLine),
    from: startingLine.a,
  }] : [];

  const [reflections, setReflections] = useState(first);
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

  const firstLine = () => {
    const extended = startingLine.extendFromB(50);
    return (
      <>
        <line
          style={{
            fillOpacity: 0,
            strokeWidth: rx / 100,
            stroke: "red",
            filter: `blur(${(rx / 100) * 3}px)`
          }}
          x1={extended.a.x}
          y1={extended.a.y}
          x2={extended.b.x}
          y2={extended.b.y}
        />
        <line
          style={{
            fillOpacity: 0,
            strokeWidth: rx / 100,
            stroke: "red",
          }}
          x1={extended.a.x}
          y1={extended.a.y}
          x2={extended.b.x}
          y2={extended.b.y}
        />
      </>
    );
  };

  const lastLine = () => {
    if (wentThrough === null) return null;
    const latest = reflections[wentThrough - 1];
    const next = whitecell.nextReflection(latest);
    const last = whitecell.nextReflection(next);
    const lineSegExtended = new LineSegment(next.from, last.from).extendFromA(
      50
    );
    return (
      <>
        <line
          style={{
            fillOpacity: 0,
            strokeWidth: rx / 100,
            stroke: "red",
            filter: `blur(${(rx / 100) * 3}px)`
          }}
          x1={lineSegExtended.a.x}
          y1={lineSegExtended.a.y}
          x2={lineSegExtended.b.x}
          y2={lineSegExtended.b.y}
        />
        <line
          style={{
            fillOpacity: 0,
            strokeWidth: rx / 100,
            stroke: "red",
          }}
          x1={lineSegExtended.a.x}
          y1={lineSegExtended.a.y}
          x2={lineSegExtended.b.x}
          y2={lineSegExtended.b.y}
        />
      </>
    );
  };

  const { viewBox, rx, ry } = getEllipseSVGParams(ellipse);

  return (
      <>
          <div className="flex flex-row items-center justify-center">
            <button
              className="mt-8 bg-white text-black font-bold py-2 px-4 rounded mr-4"
              onClick={() => next()}
            >
              NEXT
            </button>

            <button
              className="mt-8 bg-white text-black font-bold py-2 px-4 rounded mr-4"
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
          </div>
          

          <div className="mt-8 text-center">
            <p>amount of reflections: {reflections.length}</p>
            <p>goes through hole: {wentThrough ? "yes" : "no"}</p>
          </div>

        <div
          style={{
            width: "100%",
            height: "100%",
            color: "white",
            opacity: "0.5",
            marginTop: "50px",
          }}
        >
          <svg viewBox={viewBox} style={{
            width: "100%",
            height: "100%",
          }}>
            <ellipse
              cx={0}
              cy={0}
              rx={rx}
              ry={ry}
              fill="white"
            />
            <circle
              cx={startX}
              cy={startY}
              r={rx / 20}
              fill="pink"
              stroke="black"
              strokeWidth={rx / 100}

            />
            {firstLine()}
            <g>
              {reflections.map((reflection, i) => {
                const x1 = reflection.from.x;
                const y1 = reflection.from.y;
                const x2 = whitecell.calcCollision(reflection).x;
                const y2 = whitecell.calcCollision(reflection).y;
                return (
                  <>
                    <line
                      style={{
                        fillOpacity: 0,
                        strokeWidth: rx / 100,
                        stroke: "red",
                      }}
                      key={`line-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                    />
                    <line
                      style={{
                        fillOpacity: 0,
                        strokeWidth: rx / 100,
                        stroke: "red",
                        filter: `blur(${(rx / 100) * 3}px)`
                      }}
                      key={`glow-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                    />
                  </>
                );
              })}
            </g>
            {lastLine()}
          </svg>
        </div>
      </>
  );
}
