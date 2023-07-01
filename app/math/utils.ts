type QuadraticResult = [number, number] | [number] | [];

const solveQuadratic = (a: number, b: number, c: number): QuadraticResult => {
  const discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return [];
  }
  if (discriminant === 0) {
    return [-b / (2 * a)];
  }

  return [
    (-b + Math.sqrt(discriminant)) / (2 * a),
    (-b - Math.sqrt(discriminant)) / (2 * a),
  ];
};

export { solveQuadratic };
