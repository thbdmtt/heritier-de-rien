type LinkArrowProps = {
  direction?: "right" | "up-right" | "down-right";
};

export function LinkArrow({ direction = "right" }: LinkArrowProps) {
  return (
    <span
      className={`link-arrow link-arrow--${direction}`}
      aria-hidden="true"
    />
  );
}
