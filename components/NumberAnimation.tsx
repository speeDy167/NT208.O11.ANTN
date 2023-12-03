import React from "react";
import { useSpring, animated, useSprings } from "@react-spring/web";
import { config } from "process";

export default function NumberAnimation({
  arrNumber,
}: {
  arrNumber: number[];
}) {
  const { number } = useSpring({
    from: { number: 0 },
    to: [arrNumber.map((number) => ({ number: number }))],
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
    // loop: true,
  });

  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
}
