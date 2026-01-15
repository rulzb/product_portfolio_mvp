import { useState } from "react"
import { Modal } from "../../components/ui/Modal"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { AlertTriangle, Rocket, Megaphone, MoreHorizontal, Calendar } from "lucide-react"
import { cn } from "../../lib/utils"

interface ManualEventModalProps {
    isOpen: boolean
    onClose: () => void
}

type EventType = 'incident' | 'deploy' | 'marketing' | 'other'

export function ManualEventModal({ isOpen, onClose }: ManualEventModalProps) {
    const [type, setType] = useState<EventType>('deploy')

    const handleSubmit = () => {
        // Logic to save event would go here
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Registrar Evento Manual" maxWidth="md">
            <div className="p-6 space-y-6">

                {/* Type Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evento</label>
                    <div className="grid grid-cols-4 gap-2">
                        <TypeButton
                            active={type === 'deploy'}
                            onClick={() => setType('deploy')}
                            icon={<Rocket className="w-4 h-4" />}
                            label="Deploy"
                            color="indigo"
                        />
                        <TypeButton
                            active={type === 'incident'}
                            onClick={() => setType('incident')}
                            icon={<AlertTriangle className="w-4 h-4" />}
                            label="Incidente"
                            color="red"
                        />
                        <TypeButton
                            active={type === 'marketing'}
                            onClick={() => setType('marketing')}
                            icon={<Megaphone className="w-4 h-4" />}
                            label="Marketing"
                            color="amber"
                        />
                        <TypeButton
                            active={type === 'other'}
                            onClick={() => setType('other')}
                            icon={<MoreHorizontal className="w-4 h-4" />}
                            label="Otro"
                            color="gray"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Título del Evento</label>
                        <Input placeholder="Ej: Hotfix v2.4.1" autoFocus />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                            <Input type="date" icon={<Calendar className="w-4 h-4" />} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                            <Input type="time" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent resize-none"
                            placeholder="Detalles adicionales..."
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Guardar Evento</Button>
                </div>
            </div>
        </Modal>
    )
}

function TypeButton({ active, onClick, icon, label, color }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, color: string }) {
    const activeClasses: Record<string, string> = {
        indigo: "bg-indigo-50 border-indigo-500 text-indigo-700",
        red: "bg-red-50 border-red-500 text-red-700",
        amber: "bg-amber-50 border-amber-500 text-amber-700",
        gray: "bg-gray-100 border-gray-500 text-gray-900"
    }

    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1.5",
                active ? activeClasses[color] : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            )}
        >
            {icon}
            <span className="text-xs font-medium">{label}</span>
        </button>
    )
}
