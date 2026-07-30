type LinkArrowProps = {
  direction?: "right" | "up-right" | "down-right";
};

const textArrows = {
  right: "\u2192\uFE0E",
  "up-right": "\u2197\uFE0E",
  "down-right": "\u2198\uFE0E",
} as const;

export function LinkArrow({ direction = "right" }: LinkArrowProps) {
  return (
    <span
      className={`link-arrow link-arrow--${direction}`}
      aria-hidden="true"
    >
      {textArrows[direction]}
    </span>
  );
}
