import { ArrowLeft, LayoutGrid, ChevronDown, UploadCloud, Settings, Plus } from "lucide-react"
import { Button } from "../ui/Button"
import { cn } from "../../lib/utils"

interface HeaderProps {
    title?: string
    showTimeRange?: boolean
    onBack?: () => void
    onImport?: () => void
    onNewEvent?: () => void
}

export function Header({ title = "Portafolio", showTimeRange = false, onBack, onImport, onNewEvent }: HeaderProps) {
    return (
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0 z-20 relative">
            <div className="flex items-center gap-4 text-sm">
                {onBack && (
                    <>
                        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-900 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="h-6 w-px bg-gray-200"></div>
                    </>
                )}

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
                        <LayoutGrid className="w-4 h-4" />
                        <span className="font-medium">Portafolio</span>
                    </div>
                    {title !== "Portafolio" && (
                        <>
                            <span className="text-gray-300">/</span>
                            <div className="flex items-center gap-2 text-gray-900 font-semibold bg-gray-100 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 transition-colors select-none">
                                <span>{title}</span>
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {showTimeRange && (
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                    <button className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", "bg-white shadow-sm text-gray-900 border border-gray-200")}>7D</button>
                    <button className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", "text-gray-500 hover:text-gray-900 hover:bg-white")}>14D</button>
                    <button className={cn("px-3 py-1 text-xs font-medium rounded-md transition-all", "text-gray-500 hover:text-gray-900 hover:bg-white")}>30D</button>
                </div>
            )}

            <div className="flex items-center gap-3">
                <button
                    onClick={onImport}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    title="Importar CSV"
                >
                    <UploadCloud className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-gray-300"></div>
                <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    <Settings className="w-4 h-4" />
                </button>
                <Button variant="primary" size="sm" className="gap-2" onClick={onNewEvent}>
                    <Plus className="w-3 h-3" />
                    <span className="text-xs">Registrar Evento</span>
                </Button>
            </div>
        </header>
    )
}
