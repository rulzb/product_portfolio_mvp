import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Trello, Github, BarChart2, PieChart, CheckCircle2, ArrowRight } from "lucide-react"
import { cn } from "../lib/utils"

interface SetupViewProps {
    onComplete: () => void
}

export function SetupView({ onComplete }: SetupViewProps) {
    const [step, setStep] = useState(1)
    const [selectedExecution, setSelectedExecution] = useState<string | null>(null)
    const [selectedData, setSelectedData] = useState<string | null>(null)

    const nextStep = () => setStep(s => Math.min(s + 1, 3))
    const prevStep = () => setStep(s => Math.max(s - 1, 1))

    return (
        <div className="min-h-screen bg-white pt-12 flex flex-col items-center">
            <div className="w-full max-w-2xl px-6">
                {/* Stepper */}
                <div className="flex justify-between items-start mb-12 relative">
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 z-0 transform -translate-y-1/2"></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors shadow-sm",
                                step >= s ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-300"
                            )}>
                                {s}
                            </div>
                            <span className={cn("text-xs font-medium transition-colors", step >= s ? "text-gray-900" : "text-gray-400")}>
                                {s === 1 ? "Ejecución" : s === 2 ? "Datos" : "Producto"}
                            </span>
                        </div>
                    ))}
                </div>

                {/* STEP 1: EXECUTION */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Conecta tus herramientas</h2>
                        <p className="text-gray-500 mb-8">¿Dónde vive el código de tus Productos?</p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <ToolCard
                                icon={<Trello className="w-6 h-6 text-blue-600" />}
                                bg="bg-blue-50"
                                title="Jira Software"
                                desc="Issues, Epics & Sprints"
                                selected={selectedExecution === 'jira'}
                                onClick={() => setSelectedExecution('jira')}
                            />
                            <ToolCard
                                icon={<Github className="w-6 h-6 text-gray-900" />}
                                bg="bg-gray-100"
                                title="GitHub"
                                desc="Commits & Deploys"
                                selected={selectedExecution === 'github'}
                                onClick={() => setSelectedExecution('github')}
                            />
                        </div>
                        <div className="flex justify-end pt-8 border-t border-gray-100">
                            <Button onClick={nextStep} disabled={!selectedExecution}>Continuar</Button>
                        </div>
                    </div>
                )}

                {/* STEP 2: DATA */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Conecta tus resultados</h2>
                        <p className="text-gray-500 mb-8">¿Dónde mides el éxito?</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <ToolCard
                                icon={<BarChart2 className="w-6 h-6 text-indigo-600" />}
                                bg="bg-indigo-50"
                                title="Amplitude"
                                desc="Product Analytics"
                                selected={selectedData === 'amplitude'}
                                onClick={() => setSelectedData('amplitude')}
                            />
                            <ToolCard
                                icon={<PieChart className="w-6 h-6 text-yellow-600" />}
                                bg="bg-yellow-50"
                                title="Google Analytics 4"
                                desc="Web Traffic"
                                selected={selectedData === 'ga4'}
                                onClick={() => setSelectedData('ga4')}
                            />
                        </div>
                        <div className="text-center mb-8">
                            <button className="text-sm text-gray-500 hover:text-indigo-600 underline decoration-dotted bg-transparent border-none cursor-pointer">
                                No tengo API, subiré un CSV manual luego.
                            </button>
                        </div>
                        <div className="flex justify-between pt-8 border-t border-gray-100">
                            <Button variant="ghost" onClick={prevStep}>Atrás</Button>
                            <Button onClick={nextStep}>Continuar</Button>
                        </div>
                    </div>
                )}

                {/* STEP 3: PRODUCT DEFINITION */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Define tu primer producto</h2>
                        <p className="text-gray-500 mb-8">Dale un nombre para verlo en tu portafolio.</p>

                        <div className="space-y-4 mb-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
                                <Input type="text" placeholder="Ej: Plataforma Web" className="text-lg py-6" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción (Opcional)</label>
                                <Input type="text" placeholder="Principal canal de ventas B2C" />
                            </div>
                        </div>

                        <div className="flex justify-between pt-8 border-t border-gray-100">
                            <Button variant="ghost" onClick={prevStep}>Atrás</Button>
                            <Button onClick={onComplete} className="gap-2">
                                Crear Portafolio <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function ToolCard({ icon, bg, title, desc, selected, onClick }: { icon: React.ReactNode, bg: string, title: string, desc: string, selected: boolean, onClick: () => void }) {
    return (
        <div
            className={cn(
                "border rounded-xl p-6 cursor-pointer hover:shadow-md transition-all group relative",
                selected ? "border-indigo-500 ring-1 ring-indigo-500 bg-white" : "border-gray-200 bg-white hover:border-indigo-300"
            )}
            onClick={onClick}
        >
            {selected && (
                <div className="absolute top-3 right-3 text-indigo-600">
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                </div>
            )}
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", bg)}>
                {icon}
            </div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
    )
}
