"use client";

import { useState } from "react";
import EllipseForm from "./EllipseForm";
import EntryForm from "./EntryForm";
import Cell from "./Cell";
import Ellipse from "../math/Ellipse";

export default function Home() {
  const [ellipse, setEllipse] = useState<{ a: number, b: number, c: number } | null>(null);

  const [first, setFirst] = useState<{ startX: number, startY: number, endX: number, endY: number } | null>(null);

  const setValues = (
    entryX: number,
    entryY: number,
    collisionX: number,
    collisionY: number,
  ) => {
    setFirst({
      startX: entryX,
      startY: entryY,
      endX: collisionX,
      endY: collisionY,
    });
  };

  return (
    <div>
      {ellipse === null && (
        <EllipseForm setEllipse={setEllipse} />
      )}
      {ellipse !== null && first === null && (
        <EntryForm
          a={ellipse.a}
          b={ellipse.b}
          c={ellipse.c}
          setValues={setValues}
        />
      )}
      {ellipse !== null && first !== null && (
        <Cell 
          a={ellipse.a}
          b={ellipse.b}
          c={ellipse.c}
          startX={first.startX}
          startY={first.startY}
          endX={first.endX}
          endY={first.endY}
        />
      )}
    </div>
  );
}
