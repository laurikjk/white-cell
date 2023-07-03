import Ellipse from "../math/Ellipse";

interface SVGParams {
  viewBox: string;
  rx: number;
  ry: number;
}

const getEllipseSVGParams = (
  ellipse: Ellipse,
  marginPercent: number = 10
): SVGParams => {
  const rx = ellipse.rx();
  const ry = ellipse.ry();

  const margin = (Math.max(rx, ry) * marginPercent) / 100;

  const topLeftX = -rx - margin;
  const topLeftY = -ry - margin;
  const width = 2 * rx + 2 * margin;
  const height = 2 * ry + 2 * margin;

  const viewBox = `${topLeftX} ${topLeftY} ${width} ${height}`;

  return { viewBox, rx, ry };
};

export { getEllipseSVGParams };
