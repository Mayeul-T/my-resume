export const ANIMATION = {
  DELAY: {
    BASE: 100,
    SKILL: 80,
    EDUCATION: 150,
  },
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
} as const;

export function getStaggerDelay(
  index: number,
  baseDelay = ANIMATION.DELAY.BASE
): string {
  return `${index * baseDelay}ms`;
}

export function getNestedStaggerDelay(
  parentIndex: number,
  childIndex: number,
  parentDelay = ANIMATION.DELAY.BASE,
  childDelay = ANIMATION.DELAY.SKILL
): string {
  return `${parentIndex * parentDelay + childIndex * childDelay}ms`;
}
