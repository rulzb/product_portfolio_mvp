import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, maxWidth = 'max-w-md' }) => {
    if (!isOpen) return null;

    return (
        <Fragment>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
                <div className={`relative bg-white rounded-xl shadow-2xl w-full ${maxWidth} bg-white overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
                    {(title) && (
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                            {title && <h3 className="font-bold text-gray-900 text-lg">{title}</h3>}
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </Fragment>
    );
};
