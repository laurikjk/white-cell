import LineSegment from "./LineSegment";
import Vector from "./Vector";

class Line {
  readonly slope: number | undefined;
  readonly intercept: number;

  constructor(slope: number | undefined, intercept: number) {
    this.slope = slope;
    this.intercept = intercept;
  }

  static fromLineSegment(ls: LineSegment): Line {
    const { a, b } = ls;

    const isVertical = a.x === b.x;
    if (isVertical) return new Line(undefined, a.x);

    const isHorizontal = a.y === b.y;
    if (isHorizontal) return new Line(0, a.y);

    const slope = (b.y - a.y) / (b.x - a.x);
    const intercept = a.y - slope * a.x;

    return new Line(slope, intercept);
  }

  public y(x: number): number {
    if (this.slope === undefined) return this.intercept;
    return this.slope * x + this.intercept;
  }

  public closestPointInLine(point: Vector): Vector {
    if (this.slope === undefined) {
      // Vertical line
      return new Vector(this.intercept, point.y);
    }
    if (this.slope === 0) {
      // Horizontal line
      return new Vector(point.x, this.intercept);
    }

    const mPerpendicular = -1 / this.slope;
    const bPerpendicular = point.y - mPerpendicular * point.x;

    const x2 =
      (bPerpendicular - this.intercept) / (this.slope - mPerpendicular);

    const y2 = this.slope * x2 + this.intercept;

    return new Vector(x2, y2);
  }

  public directionToPoint(point: Vector): Vector {
    const closestPoint = this.closestPointInLine(point);

    const subtracted = point.subtract(closestPoint);

    return subtracted;
  }
}

export default Line;
