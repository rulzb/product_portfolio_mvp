import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List, Plus, ChevronDown, Globe, Smartphone, Server, TrendingUp, Minus } from 'lucide-react';
import { Button } from '../components/Button';
import { Sparkline } from '../components/Sparkline';
import { clsx } from 'clsx';
import { api } from '../services/api';
import type { Product } from '../types';

const PortfolioView: React.FC = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'smartphone': return Smartphone;
            case 'server': return Server;
            default: return Globe;
        }
    };

    const StatusBadge = ({ status }: { status: Product['status'] }) => {
        const styles = {
            stable: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', dot: 'bg-green-500', label: 'Estable' },
            warning: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500', label: 'Warning' },
            critical: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', dot: 'bg-red-500', label: 'Crítico' },
        };
        const s = styles[status];
        return (
            <span className={clsx("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border", s.bg, s.text, s.border)}>
                <span className={clsx("w-1.5 h-1.5 rounded-full", s.dot)}></span>
                {s.label}
            </span>
        );
    };

    if (loading) return <div className="flex h-screen items-center justify-center text-gray-500">Cargando portafolio...</div>;

    return (
        <section className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Resumen de Portafolio</h1>
                    <p className="text-sm text-gray-500">Vista general de salud de productos</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5 mr-2">
                        <button
                            className={clsx("p-1.5 rounded transition-colors", viewMode === 'grid' ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-900")}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            className={clsx("p-1.5 rounded transition-colors", viewMode === 'table' ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-900")}
                            onClick={() => setViewMode('table')}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="relative">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 text-sm text-gray-700 bg-white cursor-pointer">
                            <span>Todos los Productos</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>
                    <Button onClick={() => navigate('/setup')} icon={<Plus className="w-4 h-4" />}>
                        Nuevo Producto
                    </Button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {products.map(product => {
                            const Icon = getIcon(product.iconName);
                            // Visual helpers derived from status/icon for now
                            const iconColor = product.status === 'stable' ? 'text-indigo-600' : 'text-gray-900';
                            const iconBg = product.status === 'stable' ? 'bg-indigo-50' : 'bg-gray-100';

                            return (
                                <div
                                    key={product.id}
                                    onClick={() => navigate(`/dashboard/${product.id}`)}
                                    className={clsx(
                                        "bg-white rounded-xl border border-gray-200 p-6 shadow-sm cursor-pointer transition-all group",
                                        "hover:shadow-md",
                                        product.status === 'stable' ? 'hover:border-indigo-300' :
                                            product.status === 'warning' ? 'hover:border-amber-300' : 'hover:border-red-300'
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", iconBg, iconColor)}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className={clsx("font-bold text-gray-900 transition-colors",
                                                    product.status === 'stable' ? 'group-hover:text-indigo-600' :
                                                        product.status === 'warning' ? 'group-hover:text-amber-600' : 'group-hover:text-red-600'
                                                )}>
                                                    {product.name}
                                                </h3>
                                                <p className="text-xs text-gray-500">{product.description}</p>
                                            </div>
                                        </div>
                                        {product.status === 'stable' && (
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                            </span>
                                        )}
                                        {product.status === 'warning' && <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>}
                                        {product.status === 'critical' && <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-sm shadow-red-200"></span>}
                                    </div>

                                    <Sparkline data={product.sparkline.data} color={product.sparkline.color} dashed={product.sparkline.dashed} />

                                    <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase">{product.metrics.name}</p>
                                            <p className="text-2xl font-bold text-gray-900">{product.metrics.value}</p>
                                        </div>
                                        <span className={clsx("px-2 py-1 rounded text-xs font-bold flex items-center gap-1",
                                            product.status === 'stable' ? 'bg-green-50 text-green-700' :
                                                product.status === 'critical' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
                                        )}>
                                            {product.metrics.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
                                            {product.metrics.trendDirection === 'flat' && <Minus className="w-3 h-3" />}
                                            {product.metrics.trend}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
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
                                {products.map(product => {
                                    const Icon = getIcon(product.iconName);
                                    const iconColor = product.status === 'stable' ? 'text-indigo-600' : 'text-gray-900';
                                    const iconBg = product.status === 'stable' ? 'bg-indigo-50' : 'bg-gray-100';

                                    return (
                                        <tr key={product.id} className="group hover:bg-gray-50 cursor-pointer transition-colors even:bg-white odd:bg-gray-50/50" onClick={() => navigate(`/dashboard/${product.id}`)}>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", iconBg, iconColor)}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className={clsx("text-sm font-bold text-gray-900 transition-colors",
                                                            product.status === 'stable' ? 'group-hover:text-indigo-600' :
                                                                product.status === 'warning' ? 'group-hover:text-amber-600' : 'group-hover:text-red-600'
                                                        )}>{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <StatusBadge status={product.status} />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-sm font-bold text-gray-900">{product.metrics.value}</span>
                                                    <span className="text-xs text-gray-500">{product.metrics.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={clsx("text-xs font-bold flex items-center gap-1 px-2 py-1 rounded w-fit",
                                                    product.status === 'stable' ? 'bg-green-50 text-green-600' :
                                                        product.status === 'critical' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                                                )}>
                                                    {product.metrics.trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
                                                    {product.metrics.trendDirection === 'flat' && <Minus className="w-3 h-3" />}
                                                    {product.metrics.trend}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </section>
    );
};

export default PortfolioView;
