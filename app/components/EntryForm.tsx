"use client";

import { MouseEvent, useState } from "react";
import { getEllipseSVGParams } from "./utils";
import Ellipse from "../math/Ellipse";
import Line from "../math/Line";

const enabledBtnStyle = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded";
const disabledBtnStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed";



type Point = {
  x: number | null;
  y: number | null;
};

type NonNullPoint = {
  x: number;
  y: number;
};

const isNonNullPoint = (point: Point): point is NonNullPoint => {
  return point.x !== null && point.y !== null;
}

type Props = {
  a: number; b: number; c: number;
  setValues: (
    entryX: number,
    entryY: number,
    collisionX: number,
    collisionY: number,
  ) => void;
}

export default function Form({ a, b, c, setValues }: Props) {
  const ellipse = new Ellipse(a, b, c);
  const { viewBox, rx, ry } = getEllipseSVGParams(ellipse);

  const [isEntry, setIsEntry] = useState<boolean>(true);

  const [entryPoint, setEntryPoint] = useState<Point>({ x: null, y: null });
  const [collisionPoint, setCollisionPoint] = useState<Point>({ x: null, y: null });


  const onClick = (e: MouseEvent<SVGEllipseElement, globalThis.MouseEvent>) => {
    const { clientX } = e;
    const { left, width} = e.currentTarget.getBoundingClientRect();

    const xValue = (clientX - left - width / 2) / (width / 2) * rx;

    const verLine = new Line(undefined, xValue);

    const intersections = ellipse.interceptsWithLine(verLine);

    const [down, up] = intersections

    const setFunc = isEntry ? setEntryPoint : setCollisionPoint;
    const intersection = isEntry ? down : up;

    setFunc({
      x: intersection.x,
      y: intersection.y,
    });
  };

  const onDone = () => {
    if (isNonNullPoint(entryPoint) && isNonNullPoint(collisionPoint)) {
      setValues(
        entryPoint.x,
        entryPoint.y,
        collisionPoint.x,
        collisionPoint.y,
      );
    }
  }

  return (
    <div>
        <p>
          Entry<br/>
          x: {entryPoint.x || "not set"}<br/>
          y: {entryPoint.y || "not set"}
        </p>
        <p>
          Collision<br/>
          x: {collisionPoint.x || "not set"}<br/>
          y: {collisionPoint.y || "not set"}
        </p>
        <div
          style={{
            width: "100%",
            height: "100%",
            color: "white",
            marginTop: "5px",
          }}
        >
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2"
            style={{ width: "200px" }}
            onClick={() => setIsEntry(!isEntry)}
          >
            {!isEntry ? "Set entry point" : "Set collision point"}
          </button>
          <button
            className={collisionPoint.x && entryPoint.x ? enabledBtnStyle : disabledBtnStyle}
            onClick={() => onDone()}
            disabled={!collisionPoint.x || !entryPoint.x}
          >
            Done
          </button>
          <svg viewBox={viewBox} style={{
            width: "100%",
            height: "100%",
          }}>
            <ellipse
              onClick={(e) => onClick(e)}
              cx={0}
              cy={0}
              rx={rx}
              ry={ry}
              fill="white"
              opacity={0.2}
            />
            <ellipse
              onClick={(e) => onClick(e)}
              cx={0}
              cy={0}
              rx={rx}
              ry={ry}
              fill="none"
              stroke="white"
              strokeWidth={rx/100}
            />
            {entryPoint.x !== null
              && entryPoint.y !== null
              && collisionPoint.x !== null
              && collisionPoint.y !== null
              && (
              <line
                x1={entryPoint.x}
                y1={entryPoint.y}
                x2={collisionPoint.x}
                y2={collisionPoint.y}
                stroke="red"
                strokeWidth={rx/100}
              />
            )}
            <circle
              cx={entryPoint.x || 0}
              cy={entryPoint.y || 0}
              r={rx/30}
              fill="black"
              stroke="red"
              opacity={entryPoint.x === null ? 0 : 1}
              strokeWidth={rx/100}
            />
            <circle
              cx={collisionPoint.x || 0}
              cy={collisionPoint.y || 0}
              r={rx/30}
              fill="black"
              stroke="red"
              opacity={collisionPoint.x === null ? 0 : 1}
              strokeWidth={rx/100}
            />
          </svg>
        </div>
    </div>
  );
}

