import Line from "./Line";
import Vector from "./Vector";

class LineSegment {
  readonly a: Vector;
  readonly b: Vector;

  constructor(a: Vector, b: Vector) {
    this.a = a;
    this.b = b;
  }
}

export default LineSegment;
