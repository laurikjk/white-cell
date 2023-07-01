import Ellipse from "./Ellipse";
import Line from "./Line";
import LineSegment from "./LineSegment";
import Vector from "./Vector";

type Entry = {
  from: number;
  to: number;
};

type EntryOn = "top" | "bottom";

type LineFrom = {
  line: Line;
  from: Vector;
};

class WhiteCell {
  private ellipse: Ellipse;
  public readonly hole: Entry;
  private entryOn: EntryOn;

  constructor(ellipse: Ellipse, hole: Entry, entryOn: EntryOn = "top") {
    this.ellipse = ellipse;
    this.hole = hole;
    this.entryOn = entryOn;
  }

  private calcReflectionVector(incoming: Vector, normal: Vector): Vector {
    const translation = incoming.add(normal).multiplyScalar(2);
    return incoming.reverse().add(translation);
  }

  private calcReflectionLineFrom(
    incoming: LineSegment,
    mirror: Line
  ): LineFrom {
    const incomingVector = incoming.b.subtract(incoming.a);
    const normalVector = mirror.directionToPoint(incoming.a);
    const outgoingVector = this.calcReflectionVector(
      incomingVector,
      normalVector
    );
    const reflection = new LineSegment(
      incoming.b,
      incoming.b.add(outgoingVector)
    );
    return {
      line: Line.fromLineSegment(reflection),
      from: incoming.b,
    };
  }

  public calcCollision({ line, from }: LineFrom): Vector {
    const intersections = this.ellipse.interceptsWithLine(line);
    const [x1, x2] = intersections;
    return x1.isApproximately(from) ? x2 : x1;
  }

  public nextReflection(lightBeam: LineFrom): LineFrom {
    const collision = this.calcCollision(lightBeam);
    const mirror = this.ellipse.tangentLine(collision);
    const lightSegment = new LineSegment(lightBeam.from, collision);
    const reflection = this.calcReflectionLineFrom(lightSegment, mirror);
    return reflection;
  }

  public goesThroughHole(lightBeam: LineFrom): boolean {
    const collision = this.calcCollision(lightBeam);
    const checkY =
      this.entryOn === "top" ? (y: number) => y > 0 : (y: number) => y < 0;
    return (
      collision.x > this.hole.from &&
      collision.x < this.hole.to &&
      checkY(collision.y)
    );
  }
}

export default WhiteCell;
