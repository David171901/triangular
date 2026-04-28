import { useId, type SVGProps } from "react";

type CodeIconProps = SVGProps<SVGSVGElement>;

export function Code(props: CodeIconProps) {
  const uid = useId();
  const paint0 = `${uid}-paint0`;
  const paint1 = `${uid}-paint1`;

  return (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <path
        d="M6.5 0.000835135L6.5 1.39369L2.09842 4.42069L6.5 7.42941L6.5 8.82227L1.38067 5.33388L-1.92399e-07 4.42069L1.38067 3.48922L6.5 0.000835135Z"
        fill={`url(#${paint0})`}
      />
      <path
        d="M8.5 8.82338L8.5 7.43053L12.9016 4.40353L8.5 1.39481L8.5 0.00195284L13.6193 3.49034L15 4.40353L13.6193 5.335L8.5 8.82338Z"
        fill={`url(#${paint1})`}
      />
      <defs>
        <linearGradient
          id={paint0}
          x1="6.5"
          y1="9.22056"
          x2="6.5"
          y2="-0.382705"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4B7EFF" />
          <stop offset="1" stopColor="#AC40FF" />
        </linearGradient>
        <linearGradient
          id={paint1}
          x1="8.5"
          y1="-0.396339"
          x2="8.5"
          y2="9.20692"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4B7EFF" />
          <stop offset="1" stopColor="#AC40FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
