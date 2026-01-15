import { Header } from "./Header"
import { InsightSidebar } from "./InsightSidebar"
import { DataImportModal } from "../features/DataImportModal"
import { ManualEventModal } from "../features/ManualEventModal"
import { useState } from "react"

interface DashboardLayoutProps {
    children: React.ReactNode
    title?: string
    showTimeRange?: boolean
    showSidebar?: boolean
    onBack?: () => void
}

export function DashboardLayout({ children, title, showTimeRange, showSidebar = false, onBack }: DashboardLayoutProps) {
    const [isImportOpen, setIsImportOpen] = useState(false)
    const [isEventOpen, setIsEventOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Header is fixed at top of layout context, technically part of the flex column */}
            <Header
                title={title}
                showTimeRange={showTimeRange}
                onBack={onBack}
                onImport={() => setIsImportOpen(true)}
                onNewEvent={() => setIsEventOpen(true)}
            />

            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden">
                    {children}
                </main>

                {showSidebar && <InsightSidebar />}
            </div>

            <DataImportModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
            <ManualEventModal isOpen={isEventOpen} onClose={() => setIsEventOpen(false)} />
        </div>
    )
}
