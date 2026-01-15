import { useState } from "react"
import { Modal } from "../../components/ui/Modal"
import { Button } from "../../components/ui/Button"
import { UploadCloud, FileText, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface DataImportModalProps {
    isOpen: boolean
    onClose: () => void
}

type ImportStep = 'upload' | 'map' | 'validate'

export function DataImportModal({ isOpen, onClose }: DataImportModalProps) {
    const [step, setStep] = useState<ImportStep>('upload')
    const [fileName, setFileName] = useState<string | null>(null)

    // Mock Column Mapping State (simulated usage for now)
    // const [mappings, setMappings] = useState({
    //     'Fecha': 'timestamp',
    //     'Evento': 'event_name',
    //     'Valor': 'value'
    // })

    const handleFileUpload = () => {
        // Simulate file selection
        setFileName("export_amplitude_v2.csv")
    }

    const reset = () => {
        setStep('upload')
        setFileName(null)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={reset} title="Importar Datos" maxWidth="lg">
            <div className="p-6">
                {/* Stepper Header */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <StepIndicator step={1} current={step === 'upload' ? 1 : step === 'map' ? 2 : 3} label="Cargar Archivo" />
                    <div className="h-px bg-gray-200 flex-1 mx-4"></div>
                    <StepIndicator step={2} current={step === 'upload' ? 1 : step === 'map' ? 2 : 3} label="Mapear Columnas" />
                    <div className="h-px bg-gray-200 flex-1 mx-4"></div>
                    <StepIndicator step={3} current={step === 'upload' ? 1 : step === 'map' ? 2 : 3} label="Validar" />
                </div>

                {/* STEP 1: UPLOAD */}
                {step === 'upload' && (
                    <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={handleFileUpload}>
                        {fileName ? (
                            <>
                                <FileText className="w-12 h-12 text-indigo-500 mb-4" />
                                <p className="text-lg font-medium text-gray-900">{fileName}</p>
                                <p className="text-sm text-gray-500">2.4 MB • CSV</p>
                            </>
                        ) : (
                            <>
                                <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                                <p className="text-lg font-medium text-gray-900">Arrastra tu CSV aquí</p>
                                <p className="text-sm text-gray-500">o haz clic para explorar</p>
                            </>
                        )}
                    </div>
                )}

                {/* STEP 2: MAPPING */}
                {step === 'map' && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-blue-800">Hemos detectado 3 columnas. Verifica que coincidan con los campos de ProductAI.</p>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-500 font-medium">
                                    <tr>
                                        <th className="px-4 py-3">Columna en CSV</th>
                                        <th className="px-4 py-3">Ejemplo</th>
                                        <th className="px-4 py-3">Campo Destino</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-4 py-3 font-medium">Date_Time</td>
                                        <td className="px-4 py-3 text-gray-500">2023-10-24 14:00</td>
                                        <td className="px-4 py-3">
                                            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2">
                                                <option>Timestamp</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium">Event_Type</td>
                                        <td className="px-4 py-3 text-gray-500">checkout_completed</td>
                                        <td className="px-4 py-3">
                                            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg block w-full p-2">
                                                <option>Event Name</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* STEP 3: VALIDATE */}
                {step === 'validate' && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Datos listos para importar!</h3>
                        <p className="text-gray-500 mb-6">Se han procesado 1,240 filas sin errores.</p>

                        <div className="grid grid-cols-3 gap-4 text-center max-w-lg mx-auto">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase font-bold">Eventos</p>
                                <p className="text-lg font-bold text-gray-900">1,240</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase font-bold">Usuarios</p>
                                <p className="text-lg font-bold text-gray-900">856</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500 uppercase font-bold">Rango</p>
                                <p className="text-lg font-bold text-gray-900">30 días</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Controls */}
                <div className="flex justify-end pt-8 mt-4 border-t border-gray-100 gap-3">
                    <Button variant="ghost" onClick={reset}>Cancelar</Button>
                    {step === 'upload' && (
                        <Button disabled={!fileName} onClick={() => setStep('map')}>
                            Siguiente <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                    {step === 'map' && (
                        <Button onClick={() => setStep('validate')}>
                            Validar Datos <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                    {step === 'validate' && (
                        <Button onClick={reset} className="bg-green-600 hover:bg-green-700 text-white">
                            Importar Finalizar
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    )
}

function StepIndicator({ step, current, label }: { step: number, current: number, label: string }) {
    const isActive = current >= step
    const isCurrent = current === step

    return (
        <div className="flex flex-col items-center gap-2">
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                isActive ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-400",
                isCurrent && "ring-4 ring-gray-100"
            )}>
                {step}
            </div>
            <span className={cn(
                "text-xs font-medium",
                isActive ? "text-gray-900" : "text-gray-400"
            )}>{label}</span>
        </div>
    )
}
