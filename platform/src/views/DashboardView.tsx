import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, LayoutGrid, ChevronDown, UploadCloud, Settings, Plus,
    Sparkles, AlertTriangle
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { clsx } from 'clsx';
import { api } from '../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardView: React.FC = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [timeRange, setTimeRange] = useState('7D');
    const [activeMetric, setActiveMetric] = useState<'conversion' | 'errors' | 'loading' | 'abandonment'>('conversion');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isManualModalOpen, setIsManualModalOpen] = useState(false);
    const [isInsightOpen, setIsInsightOpen] = useState(false);
    const [data, setData] = useState<any>(null); // Using any for simplicity in refactor, ideally DashboardData
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;
        const loadDashboard = async () => {
            setLoading(true);
            try {
                const dashboardData = await api.getDashboardData(productId);
                setData(dashboardData);
            } catch (error) {
                console.error("Failed to load dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, [productId, timeRange]);

    if (loading || !data) return <div className="flex h-screen items-center justify-center text-gray-500">Cargando métricas...</div>;

    // Derived Data for Chart
    const currentMetricHistory = data.metrics[activeMetric];
    const chartData = {
        labels: currentMetricHistory?.labels || [],
        datasets: [
            {
                label: activeMetric,
                data: currentMetricHistory?.values || [],
                borderColor: activeMetric === 'errors' ? '#EF4444' : '#6366F1',
                backgroundColor: activeMetric === 'errors' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            x: { grid: { display: false } },
            y: { border: { display: false }, grid: { borderDash: [2, 4], color: '#f3f4f6' } }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        }
    };

    const MetricTab = ({ id, label, color, active }: { id: 'conversion' | 'errors' | 'loading' | 'abandonment', label: string, color: string, active: boolean }) => (
        <div
            className={clsx(
                "flex items-center gap-2 h-full px-1 cursor-pointer transition-colors border-b-2 py-3",
                active ? `border-[${color}] text-gray-900` : "border-transparent text-gray-500 hover:text-gray-900"
            )}
            onClick={() => setActiveMetric(id)}
            style={{ borderColor: active ? color : 'transparent' }}
        >
            <span className={clsx("w-2 h-2 rounded-full", active ? "opacity-100" : "bg-gray-300")} style={{ backgroundColor: active ? color : undefined }}></span>
            {label}
        </div>
    );

    return (
        <section className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-4 text-sm">
                    <button onClick={() => navigate('/portfolio')} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <div className="flex items-center gap-2 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors" onClick={() => navigate('/portfolio')}>
                        <LayoutGrid className="w-4 h-4" />
                        <span className="font-medium">Portafolio</span>
                    </div>
                    <span className="text-gray-300">/</span>
                    <div className="flex items-center gap-2 text-gray-900 font-semibold bg-gray-100 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 transition-colors select-none">
                        <span className="capitalize">{productId?.replace('-', ' ')}</span>
                        <ChevronDown className="w-3 h-3 text-gray-500" />
                    </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                    {['7D', '14D', '30D'].map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={clsx(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                timeRange === range ? "bg-white shadow-sm text-gray-900 border border-gray-200" : "text-gray-500 hover:text-gray-900 hover:bg-white"
                            )}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setIsImportModalOpen(true)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" title="Importar CSV">
                        <UploadCloud className="w-4 h-4" />
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        <Settings className="w-4 h-4" />
                    </button>
                    <Button size="sm" onClick={() => setIsManualModalOpen(true)} icon={<Plus className="w-3 h-3" />}>
                        Registrar Evento
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Main Area */}
                <main className="flex-1 flex flex-col min-w-0 bg-white relative">
                    <div className="h-12 border-b border-gray-100 flex items-center px-6 gap-6 text-xs font-medium text-gray-500 bg-white z-10 overflow-x-auto">
                        <MetricTab id="conversion" label="Tasa de Conversión" color="#6366F1" active={activeMetric === 'conversion'} />
                        <MetricTab id="abandonment" label="Abandono Carrito" color="#F59E0B" active={activeMetric === 'abandonment'} />
                        <MetricTab id="errors" label="Tasa de Errores" color="#EF4444" active={activeMetric === 'errors'} />
                        <MetricTab id="loading" label="Tiempo de Carga" color="#10B981" active={activeMetric === 'loading'} />
                    </div>

                    <div className="flex-1 p-6 overflow-hidden relative">
                        <div className="w-full h-full pb-10">
                            <Line options={chartOptions} data={chartData} />
                        </div>

                        {/* KPI Overlay */}
                        <div className="absolute top-6 right-6 text-right pointer-events-none">
                            <p className="text-sm text-gray-500 font-medium capitalize">{activeMetric.replace('_', ' ')} Actual</p>
                            <p className="text-3xl font-bold tracking-tight text-gray-900">
                                {activeMetric === 'conversion' ? '2.4%' : activeMetric === 'errors' ? '1.8%' : '142ms'}
                                <span className={clsx("text-sm font-medium px-1.5 py-0.5 rounded ml-1", activeMetric === 'errors' ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50")}>
                                    {activeMetric === 'errors' ? '↑ 0.5%' : '↓ 1.2%'}
                                </span>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 z-20">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                                <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-semibold text-sm text-gray-900">AI Analyst</span>
                        </div>
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">2 NUEVOS</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <div onClick={() => setIsInsightOpen(true)} className="bg-white p-3 rounded-lg border-l-4 border-l-red-500 border-y border-r border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Impacto Crítico</span>
                                <span className="text-[10px] text-gray-400">Hace 2h</span>
                            </div>
                            <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">Caída de Conversión post-deploy</h3>
                            <p className="text-[11px] text-gray-500 leading-snug">Se detectó una correlación del 92% entre el <strong>Deploy v2.4</strong> y la caída en el funnel.</p>
                            <div className="mt-2 text-[10px] text-indigo-600 font-medium group-hover:underline">Ver Evidencia →</div>
                        </div>

                        <div className="bg-white p-3 rounded-lg border-l-4 border-l-amber-400 border-y border-r border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide">Anomalía Leve</span>
                                <span className="text-[10px] text-gray-400">Hace 5h</span>
                            </div>
                            <h3 className="text-xs font-semibold text-gray-900 mb-1">Latencia inusual API Login</h3>
                            <p className="text-[11px] text-gray-500 leading-snug">Tiempos de respuesta +200ms sin deploy asociado.</p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Manual Entry Modal */}
            <Modal isOpen={isManualModalOpen} onClose={() => setIsManualModalOpen(false)} title="Registrar Evento Externo">
                <div className="p-6 pt-0">
                    <div className="space-y-4">
                        <Input label="Nombre del Evento" placeholder="Ej: Campaña Black Friday" />
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                        <Button variant="ghost" size="sm" onClick={() => setIsManualModalOpen(false)}>Cancelar</Button>
                        <Button size="sm" onClick={() => setIsManualModalOpen(false)}>Guardar Evento</Button>
                    </div>
                </div>
            </Modal>

            {/* Import Modal */}
            <Modal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)} title="" maxWidth="max-w-2xl">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">Importar Datos Externos</h3>
                        <p className="text-xs text-gray-500">Carga masiva vía CSV</p>
                    </div>
                </div>
                <div className="p-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">Arrastra tu archivo CSV aquí</p>
                        <p className="text-xs text-gray-500 mb-4">o haz clic para buscar</p>
                        <button className="text-xs text-indigo-600 font-medium hover:underline">Descargar plantilla</button>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <Button variant="ghost" size="sm" onClick={() => setIsImportModalOpen(false)}>Cancelar</Button>
                    <Button size="sm" disabled>Importar</Button>
                </div>
            </Modal>

            {/* Insight Detail Modal (Drawer style in MVP, Modal here for simplicity) */}
            <Modal isOpen={isInsightOpen} onClose={() => setIsInsightOpen(false)} title="Detalle de Insight">
                <div className="p-6 pt-0">
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4 text-sm">
                        <AlertTriangle className="w-4 h-4 inline mr-2" />
                        Se ha detectado una correlación fuerte (92%)
                    </div>
                    <p className="text-gray-600 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button size="sm" onClick={() => setIsInsightOpen(false)}>Entendido</Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default DashboardView;
