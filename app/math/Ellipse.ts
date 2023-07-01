import Line from "./Line";
import Vector from "./Vector";
import { solveQuadratic } from "./utils";

class Ellipse {
  readonly a: number;
  readonly b: number;
  readonly c: number;

  /**
   * Ellipse equation: x^2/a^2 + y^2/b^2 = c

   */
  constructor(a: number, b: number, c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  // (x1 / a2)x + (y1 / b2)y = c
  public tangentLine(p: Vector): Line {
    const { x: x1, y: y1 } = p;
    const intercept = (this.b ** 2 * this.c) / y1;
    const slope = -(this.b ** 2 * x1) / (this.a ** 2 * y1);
    return new Line(slope, intercept);
  }
  /**
   * ellipse: x^2/A^2 + y^2/B^2 = constant
   * line: mx + b = y
   *
   * together: x^2/A^2 + (mx + b)^2/B^2 = constant
   * x^2/A^2 + m^2x^2/B^2 + 2mbx/B^2 + b^2/B^2 = constant
   * (1/A^2 + m^2/B^2)x^2 + (2mb/B^2)x + (b^2/B^2 - constant) = 0
   *
   * if line is vertical: x = b
   *  y = +/- sqrt(constant*B^2 - b^2/A^2)
   */
  public interceptsWithLine(line: Line): Vector[] {
    const { slope: m, intercept: x } = line;
    if (m === undefined) {
      const y = Math.sqrt(this.c * this.b ** 2 - x * x * this.a ** 2);
      return [new Vector(x, y), new Vector(x, -y)];
    }
    const a = 1 / this.a ** 2 + (m * m) / this.b ** 2;
    const b = (2 * m * x) / this.b ** 2;
    const c = (x * x) / this.b ** 2 - this.c;

    const xIntercepts = solveQuadratic(a, b, c);
    if (xIntercepts.length === 0) return [];
    if (xIntercepts.length === 1) {
      const y = line.y(xIntercepts[0]);
      return [new Vector(xIntercepts[0], y)];
    }

    const y1 = line.y(xIntercepts[0]);
    const y2 = line.y(xIntercepts[1]);
    return [new Vector(xIntercepts[0], y1), new Vector(xIntercepts[1], y2)];
  }
}

export default Ellipse;
