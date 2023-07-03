"use client";
import { useState } from "react";
import FloatInput from "./FloatInput";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const enabledBtnStyle = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded";
const disabledBtnStyle = "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded cursor-not-allowed";

// ellipse equation: x^2/a^2 + y^2/b^2 = c
const EllipseEquation = ({ a, b, c }: { a: number | null; b: number | null; c: number | null }) => {
  return (
    <div className="flex flex-row items-center justify-center p-4">
      <Latex>
        {`$\\frac{x^2}{${a || "a"}^2} + \\frac{y^2}{${b || "b"}^2} = ${c || "c"}$`}
      </Latex>
    </div>
  );
}

type Ellipse = {
  a: number
  b: number
  c: number
}

type FormProps = {
  setEllipse: (value: Ellipse) => void
}

export default function Form({ setEllipse }: FormProps) {
  const [a, setA] = useState<number | null>(null);
  const [b, setB] = useState<number | null>(null);
  const [c, setC] = useState<number | null>(null);

  const enableDone = a !== null && b !== null && c !== null;

  const done = () => {
    if (enableDone) {
      setEllipse({ a, b, c });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center mb-4">
        <div className="flex flex-col">
          <h3 className="font-bold text-center">Ellipse equation</h3>
          <EllipseEquation a={a} b={b} c={c} />
          <FloatInput label="a" onChange={setA} />
          <FloatInput label="b" onChange={setB} />
          <FloatInput label="c" onChange={setC} />
          <button
            className={enableDone ? enabledBtnStyle : disabledBtnStyle}
            onClick={done}
            disabled={!enableDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
