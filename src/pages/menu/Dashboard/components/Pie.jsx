import React from "react";

const cleanPercentage = (percentage) => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct, radius }) => {
    const r = radius;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - pct) * circ) / 100;
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
            strokeWidth={"0.5rem"}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};

const Text = ({ children }) => {
    return (
        <>
            <text
                x="50%"
                y="40%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize={"0.4rem"}
                color="var(--text-highlighted)"
                fontWeight={500}
            >
                Subtopics
            </text>
            <text
                x="50%"
                y="55%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize={"0.75rem"}
                fontWeight={600}
            >
                {children}
            </text>
        </>
    );
};

const Pie = ({ percentage, colour, radius, children }) => {
    const pct = cleanPercentage(percentage);
    return (
        <svg width={75} height={75}>
            <g transform={`rotate(-90 37.5 100)`}>
                <Circle colour="#EAECF0" radius={radius} />
                <Circle colour={colour} pct={pct} radius={radius} />
            </g>
            <Text>
                {children}
            </Text>
        </svg>
    );
};

export default Pie;
