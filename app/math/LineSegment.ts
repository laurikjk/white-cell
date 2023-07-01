import Vector from "./Vector";

class LineSegment {
  readonly a: Vector;
  readonly b: Vector;

  constructor(a: Vector, b: Vector) {
    this.a = a;
    this.b = b;
  }

  extendFromA(length: number): LineSegment {
    return new LineSegment(
      this.a,
      this.a.add(this.b.subtract(this.a).normalize().scale(length))
    );
  }

  extendFromB(length: number): LineSegment {
    return new LineSegment(
      this.b.add(this.a.subtract(this.b).normalize().scale(length)),
      this.b
    );
  }
}

export default LineSegment;
