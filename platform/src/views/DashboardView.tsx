import { DashboardLayout } from "../components/layout/DashboardLayout"
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Rocket, Bug, AlertTriangle } from "lucide-react"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

interface DashboardViewProps {
    project: string
    onBack: () => void
}

export function DashboardView({ project, onBack }: DashboardViewProps) {
    const data = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Conversion Rate',
                data: [2.1, 2.2, 2.15, 2.3, 1.8, 1.9, 2.1],
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgb(99, 102, 241)',
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: '#F3F4F6',
                    borderDash: [4, 4]
                },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                border: { display: false }
            }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        }
    }

    // Mock Events
    const events = [
        { percent: 20, icon: <Rocket className="w-4 h-4" />, color: "bg-blue-100 text-blue-600", title: "Deploy v1.9" },
        { percent: 60, icon: <Bug className="w-4 h-4" />, color: "bg-amber-100 text-amber-600", title: "Incident" },
        { percent: 85, icon: <AlertTriangle className="w-4 h-4" />, color: "bg-red-100 text-red-600", title: "Checkout Error" },
    ]

    return (
        <DashboardLayout
            title={project}
            showTimeRange={true}
            showSidebar={true}
            onBack={onBack}
        >
            <div className="flex-1 flex flex-col min-h-0 bg-white">
                {/* Metric Selector Bar (Static MVP) */}
                <div className="h-12 border-b border-gray-100 flex items-center px-6 gap-6 text-xs font-medium text-gray-500 bg-white z-10">
                    <div className="flex items-center gap-2 text-gray-900 border-b-2 border-indigo-500 h-full px-1 cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Tasa de Conversión
                    </div>
                    <div className="flex items-center gap-2 hover:text-gray-900 h-full px-1 cursor-pointer">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Abandono Carrito
                    </div>
                </div>

                <div className="flex-1 relative p-6 w-full h-full overflow-hidden">
                    {/* Events Lane */}
                    <div className="h-16 w-full relative mb-4 border-b border-dashed border-gray-100">
                        {events.map((ev, i) => (
                            <div
                                key={i}
                                className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer shadow-sm hover:scale-110 transition-transform z-10 ${ev.color}`}
                                style={{ left: `${ev.percent}%` }}
                                title={ev.title}
                            >
                                {ev.icon}
                            </div>
                        ))}
                    </div>

                    {/* Chart Container */}
                    <div className="w-full h-[calc(100%-5rem)] relative">
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
