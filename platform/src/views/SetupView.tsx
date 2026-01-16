import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Trello, Github, BarChart2, PieChart, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { clsx } from 'clsx';
import { api } from '../services/api';

const SetupView: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [productName, setProductName] = useState('');

    const toggleTool = (tool: string) => {
        setSelectedTools(prev =>
            prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
        );
    };

    const handleNext = async () => {
        if (step < 3) setStep(step + 1);
        else {
            if (productName) {
                await api.createProduct(productName, '');
            }
            navigate('/portfolio');
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigate('/login');
    };

    return (
        <section className="flex flex-col items-center bg-white min-h-screen pt-12">
            <div className="w-full max-w-2xl px-6">
                {/* Stepper */}
                <div className="flex justify-between items-start mb-12 relative">
                    <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 z-0 transform -translate-y-1/2"></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                            <div className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 shadow-sm transition-colors",
                                step === s ? "bg-black text-white border-black" :
                                    step > s ? "bg-black text-white border-black" :
                                        "bg-white text-gray-400 border-gray-300"
                            )}>
                                {s}
                            </div>
                            <span className={clsx("text-xs font-medium transition-colors", step >= s ? "text-gray-900" : "text-gray-400")}>
                                {s === 1 ? 'Ejecución' : s === 2 ? 'Datos' : 'Producto'}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Step 1: Tools */}
                {step === 1 && (
                    <div className="fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Conecta tus herramientas</h2>
                        <p className="text-gray-500 mb-8">¿Dónde vive el código de tus Productos?</p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <ToolCard
                                icon={<Trello className="w-6 h-6" />}
                                title="Jira Software"
                                subtitle="Issues, Epics & Sprints"
                                color="bg-blue-50 text-blue-600"
                                selected={selectedTools.includes('jira')}
                                onClick={() => toggleTool('jira')}
                            />
                            <ToolCard
                                icon={<Github className="w-6 h-6" />}
                                title="GitHub"
                                subtitle="Commits & Deploys"
                                color="bg-gray-100 text-gray-900"
                                selected={selectedTools.includes('github')}
                                onClick={() => toggleTool('github')}
                            />
                        </div>
                        <div className="flex justify-end pt-8 border-t border-gray-100">
                            <Button onClick={handleNext}>Continuar</Button>
                        </div>
                    </div>
                )}

                {/* Step 2: Data */}
                {step === 2 && (
                    <div className="fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Conecta tus resultados</h2>
                        <p className="text-gray-500 mb-8">¿Dónde mides el éxito?</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <ToolCard
                                icon={<BarChart2 className="w-6 h-6" />}
                                title="Amplitude"
                                subtitle="Product Analytics"
                                color="bg-indigo-50 text-indigo-600"
                                selected={selectedTools.includes('amplitude')}
                                onClick={() => toggleTool('amplitude')}
                            />
                            <ToolCard
                                icon={<PieChart className="w-6 h-6" />}
                                title="Google Analytics 4"
                                subtitle="Web Traffic"
                                color="bg-yellow-50 text-yellow-600"
                                selected={selectedTools.includes('ga4')}
                                onClick={() => toggleTool('ga4')}
                            />
                        </div>
                        <div className="text-center mb-8">
                            <button className="text-sm text-gray-500 hover:text-indigo-600 underline decoration-dotted bg-transparent border-none cursor-pointer">
                                No tengo API, subiré un CSV manual luego.
                            </button>
                        </div>
                        <div className="flex justify-between pt-8 border-t border-gray-100">
                            <Button variant="ghost" onClick={handleBack}>Atrás</Button>
                            <Button onClick={handleNext}>Continuar</Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Product */}
                {step === 3 && (
                    <div className="fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Define tu primer producto</h2>
                        <p className="text-gray-500 mb-8">Dale un nombre para verlo en tu portafolio.</p>

                        <div className="space-y-4 mb-8">
                            <Input
                                label="Nombre del Producto"
                                placeholder="Ej: Plataforma Web"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="text-lg"
                            />
                            <Input
                                label="Descripción (Opcional)"
                                placeholder="Principal canal de ventas B2C"
                            />
                        </div>

                        <div className="flex justify-between pt-8 border-t border-gray-100">
                            <Button variant="ghost" onClick={handleBack}>Atrás</Button>
                            <Button onClick={handleNext} icon={<ArrowRight className="w-4 h-4" />}>
                                Crear Portafolio
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const ToolCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    color: string;
    selected: boolean;
    onClick: () => void;
}> = ({ icon, title, subtitle, color, selected, onClick }) => (
    <div
        className={clsx(
            "border rounded-xl p-6 cursor-pointer transition-all group relative",
            selected ? "border-indigo-500 shadow-md ring-1 ring-indigo-500" : "border-gray-200 hover:border-indigo-500 hover:shadow-md"
        )}
        onClick={onClick}
    >
        <div className={clsx("absolute top-3 right-3 transition-opacity text-indigo-600", selected ? "opacity-100" : "opacity-0")}>
            <CheckCircle2 className="w-5 h-5 fill-current" />
        </div>
        <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center mb-3", color)}>
            {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
);

export default SetupView;
