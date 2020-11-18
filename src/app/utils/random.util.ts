/**
 * get random number within specific range
 * @param min min number
 * @param max max number
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * get random gaussian number within specific range
 * tries to simulate a normal / guassian distribution
 * @param min min number
 * @param max max number
 */
export function randomGaussianNumber(min: number, max: number): number {
  let r = 0;
  for (let i = 0; i < 16; i++) {
    r += Math.random();
  }
  r = r / 16;
  return Math.floor(r * (max - min)) + min;
}

/**
 * pick random item from array
 * @param items random item candidates
 */
export function randomPick<T>(items: T[]): T {
  return items[randomNumber(0, items.length)];
}

/**
 * return random key
 */
export function randomKey(): string {
  return Math.random().toString(32).split('.')[1];
}

/**
 * return random date
 * @param start start date
 * @param end end date
 */
export function randomDate(start?: Date, end?: Date): Date {
  start = start || new Date(1990, 1, 1);
  end = end || new Date();

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
