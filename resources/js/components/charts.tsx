import { useId } from 'react';
import { cn } from '@/lib/utils';

type ChartProps = {
    data: number[];
    className?: string;
};

export function Sparkline({ data, className }: ChartProps) {
    const id = useId();
    const width = 96;
    const height = 32;
    const pad = 2;

    if (data.length < 2) {
        return null;
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = (width - pad * 2) / (data.length - 1);

    const points = data.map((value, index) => [
        pad + index * stepX,
        height - pad - ((value - min) / range) * (height - pad * 2),
    ]);

    const line = points
        .map(
            ([x, y], index) =>
                `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`,
        )
        .join(' ');
    const area = `${line} L${points[points.length - 1][0].toFixed(1)},${height} L${points[0][0].toFixed(1)},${height} Z`;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={cn('overflow-visible', className)}
            aria-hidden="true"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop
                        offset="0%"
                        stopColor="currentColor"
                        stopOpacity="0.3"
                    />
                    <stop
                        offset="100%"
                        stopColor="currentColor"
                        stopOpacity="0"
                    />
                </linearGradient>
            </defs>
            <path d={area} fill={`url(#${id})`} />
            <path
                d={line}
                pathLength="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sparkline-draw"
            />
        </svg>
    );
}

export function MiniBars({ data, className }: ChartProps) {
    const width = 120;
    const height = 40;
    const pad = 4;

    if (data.length === 0) {
        return null;
    }

    const max = Math.max(...data, 1);
    const barStep = (width - pad * 2) / data.length;
    const barWidth = barStep * 0.6;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={cn('overflow-visible', className)}
            aria-hidden="true"
            preserveAspectRatio="none"
        >
            {data.map((value, index) => {
                const barHeight = (value / max) * (height - pad * 2) || 1;
                const x = pad + index * barStep + (barStep - barWidth) / 2;

                return (
                    <rect
                        key={index}
                        x={x}
                        y={height - pad - barHeight}
                        width={barWidth}
                        height={barHeight}
                        rx="1.5"
                        fill="currentColor"
                        className={cn(
                            'mini-bar',
                            index === data.length - 1
                                ? 'opacity-100'
                                : 'opacity-35',
                        )}
                    />
                );
            })}
        </svg>
    );
}
