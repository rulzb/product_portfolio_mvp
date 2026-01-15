import { useState } from "react"
import { DashboardLayout } from "../components/layout/DashboardLayout"
import { LayoutGrid, List, Plus, Globe, Smartphone, Server, TrendingUp, Minus } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { cn } from "../lib/utils"

interface PortfolioViewProps {
    onNavigate: (view: 'dashboard', project?: string) => void
}

export function PortfolioView({ onNavigate }: PortfolioViewProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

    const products = [
        { id: 1, name: 'Plataforma Web', desc: 'Canal Principal', icon: <Globe className="w-6 h-6" />, color: 'text-indigo-600', bg: 'bg-indigo-50', health: 'stable', metric: 'Conversión', value: '2.4%', delta: '5.2%', deltaType: 'up', sparkline: 'M0 25 Q10 20 20 22 T40 15 T60 18 T80 10 L100 5', sparkColor: '#10B981' },
        { id: 2, name: 'App Móvil iOS', desc: 'v4.2.0', icon: <Smartphone className="w-6 h-6" />, color: 'text-gray-900', bg: 'bg-gray-100', health: 'warning', metric: 'Retención D30', value: '42%', delta: '0.0%', deltaType: 'neutral', sparkline: 'M0 15 Q20 15 40 15 T60 15 T80 20 L100 25', sparkColor: '#F59E0B' },
        { id: 3, name: 'Backoffice Admin', desc: 'Herramientas Internas', icon: <Server className="w-6 h-6" />, color: 'text-gray-900', bg: 'bg-gray-100', health: 'critical', metric: 'Tasa de Errores', value: '1.8%', delta: '+0.5%', deltaType: 'bad', sparkline: 'M0 5 Q20 5 40 8 T60 15 L80 25 L100 28', sparkColor: '#EF4444' },
    ]

    return (
        <DashboardLayout title="Portafolio" onBack={undefined}>
            <div className="flex flex-col h-full bg-gray-50">
                {/* Internal Header */}
                <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Resumen de Portafolio</h1>
                        <p className="text-sm text-gray-500">Vista general de salud de productos</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5 mr-2">
                            <button
                                className={cn("p-1.5 rounded transition-colors", viewMode === 'grid' ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600")}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                className={cn("p-1.5 rounded transition-colors", viewMode === 'table' ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600")}
                                onClick={() => setViewMode('table')}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm">
                                <option>Todos los Productos</option>
                                <option>Mis Favoritos</option>
                            </select>
                        </div>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" /> Nuevo Producto
                        </Button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    onClick={() => onNavigate('dashboard', product.name)}
                                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", product.bg, product.color)}>
                                                {product.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                                                <p className="text-xs text-gray-500">{product.desc}</p>
                                            </div>
                                        </div>
                                        <Badge variant={product.health === 'stable' ? 'success' : product.health === 'warning' ? 'warning' : 'danger'}>
                                            {product.health === 'stable' ? 'Estable' : product.health === 'warning' ? 'Warning' : 'Crítico'}
                                        </Badge>
                                    </div>
                                    <div className="h-16 mb-4">
                                        <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
                                            <path d={product.sparkline} fill="none" stroke={product.sparkColor} strokeWidth="2" />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase">{product.metric}</p>
                                            <p className="text-2xl font-bold text-gray-900">{product.value}</p>
                                        </div>
                                        <span className={cn(
                                            "px-2 py-1 rounded text-xs font-bold flex items-center gap-1",
                                            product.deltaType === 'up' ? "bg-green-50 text-green-700" : product.deltaType === 'neutral' ? "bg-gray-50 text-gray-500" : "bg-red-50 text-red-600"
                                        )}>
                                            {product.deltaType === 'neutral' ? <Minus className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                            {product.delta}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Producto</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Salud</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Métrica Norte</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tendencia (7d)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product, idx) => (
                                        <tr
                                            key={product.id}
                                            onClick={() => onNavigate('dashboard', product.name)}
                                            className={cn("group hover:bg-gray-50 cursor-pointer transition-colors", idx % 2 === 0 ? "bg-white" : "bg-gray-50/50")}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", product.bg, product.color)}>
                                                        {product.icon}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.desc}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <Badge variant={product.health === 'stable' ? 'success' : product.health === 'warning' ? 'warning' : 'danger'}>
                                                    {product.health === 'stable' ? 'Estable' : product.health === 'warning' ? 'Warning' : 'Crítico'}
                                                </Badge>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-sm font-bold text-gray-900">{product.value}</span>
                                                    <span className="text-xs text-gray-500">{product.metric}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-xs font-bold flex items-center gap-1 w-fit",
                                                    product.deltaType === 'up' ? "bg-green-50 text-green-700" : product.deltaType === 'neutral' ? "bg-gray-50 text-gray-500" : "bg-red-50 text-red-600"
                                                )}>
                                                    {product.deltaType === 'neutral' ? <Minus className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                                    {product.delta}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </DashboardLayout>
    )
}
