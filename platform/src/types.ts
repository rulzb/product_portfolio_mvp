export interface Product {
    id: string;
    name: string;
    description: string;
    status: 'stable' | 'warning' | 'critical';
    iconName: 'globe' | 'smartphone' | 'server'; // Simplified for serialization
    metrics: {
        name: string;
        value: string;
        trend: string;
        trendDirection: 'up' | 'down' | 'flat';
    };
    sparkline: {
        color: string;
        dashed?: boolean;
        data: number[]; // For future use
    };
}

export interface MetricHistory {
    labels: string[];
    values: number[];
}

export interface DashboardData {
    productId: string;
    metrics: {
        conversion: MetricHistory;
        errors: MetricHistory;
        latency: MetricHistory;
        abandonment: MetricHistory;
    };
    insights: {
        id: string;
        type: 'critical' | 'warning' | 'info';
        title: string;
        description: string;
        timestamp: string;
    }[];
}
