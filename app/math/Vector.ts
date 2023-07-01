class Vector {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  public subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  public divideScalar(s: number): Vector {
    return new Vector(this.x / s, this.y / s);
  }

  public multiplyScalar(s: number): Vector {
    return new Vector(this.x * s, this.y * s);
  }

  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  public normalize(): Vector {
    return this.divideScalar(this.length());
  }

  public reverse(): Vector {
    return new Vector(-this.x, -this.y);
  }

  public isApproximately(v: Vector, epsilon: number = 0.0001): boolean {
    return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon;
  }

  public scale(length: number): Vector {
    return this.normalize().multiplyScalar(length);
  }
}

export default Vector;
