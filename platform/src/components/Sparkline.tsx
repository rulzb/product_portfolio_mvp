import React from 'react';

interface SparklineProps {
    data: number[];
    color: string;
    dashed?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({ color, dashed }) => {
    // Simplified SVG path generation for the demo
    // In a real reusable component, this would calculate points based on 'data'
    // For now, mapping colors to specific paths to match MVP
    const getPath = () => {
        if (color === '#10B981') return "M0 25 Q10 20 20 22 T40 15 T60 18 T80 10 L100 5"; // Green
        if (color === '#F59E0B') return "M0 15 Q20 15 40 15 T60 15 T80 20 L100 25"; // Amber
        if (color === '#EF4444') return "M0 5 Q20 5 40 8 T60 15 L80 25 L100 28"; // Red
        return "M0 20 L100 20"; // Default straight
    };

    return (
        <div className="h-16 mb-4">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                <path
                    d={getPath()}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray={dashed ? "4 2" : "none"}
                />
            </svg>
        </div>
    );
};
