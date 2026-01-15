import { Sparkles } from "lucide-react"

interface InsightProps {
    id: string
    title: string
    desc: string
    time: string
    severity: 'critical' | 'warning' | 'info'
}

export function InsightSidebar() {
    const insights: InsightProps[] = [
        { id: '1', title: 'Caída de Conversión post-deploy', desc: 'Se detectó una correlación del 92% entre el Deploy v2.4 y la caída en el funnel.', time: 'Hace 2h', severity: 'critical' },
        { id: '2', title: 'Latencia inusual API Login', desc: 'Tiempos de respuesta +200ms sin deploy asociado.', time: 'Hace 5h', severity: 'warning' },
    ]

    return (
        <aside className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col shrink-0 z-20 h-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white h-14 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                        <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-sm text-gray-900">AI Analyst</span>
                </div>
                <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">2 NUEVOS</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {insights.map(item => (
                    <div key={item.id} className={
                        `bg-white p-3 rounded-lg border-l-4 border-y border-r border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group
                        ${item.severity === 'critical' ? 'border-l-red-500' : item.severity === 'warning' ? 'border-l-amber-400' : 'border-l-blue-400'}
                        `
                    }>
                        <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wide
                                ${item.severity === 'critical' ? 'text-red-600' : item.severity === 'warning' ? 'text-amber-600' : 'text-blue-600'}
                            `}>
                                {item.severity === 'critical' ? 'Impacto Crítico' : item.severity === 'warning' ? 'Anomalía Leve' : 'Información'}
                            </span>
                            <span className="text-[10px] text-gray-400">{item.time}</span>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                        <p className="text-[11px] text-gray-500 leading-snug">{item.desc}</p>
                    </div>
                ))}
            </div>
        </aside>
    )
}
