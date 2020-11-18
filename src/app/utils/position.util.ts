export interface OffsetPoints {
  x: number;
  y: number;
}

/**
 * return x/y offset points of element
 * @param el element to get points
 */
export function getOffsetPoints(el: HTMLElement): OffsetPoints {
  let target = el;
  const points = {
    x: 0,
    y: 0,
  };

  while (target) {
    points.x += target.offsetLeft;
    points.y += target.offsetTop;

    target = target.offsetParent as HTMLElement;
  }

  return points;
}
