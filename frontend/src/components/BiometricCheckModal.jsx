import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Loader2, Fingerprint, X } from 'lucide-react';
import { toast } from 'react-toastify';

const BiometricCheckModal = ({ isOpen, onClose, onSuccess }) => {
    const [isScanning, setIsScanning] = useState(false);

    if (!isOpen) return null;

    const handleVerify = () => {
        setIsScanning(true);
        // Simulate a 3-second scan
        setTimeout(() => {
            setIsScanning(false);
            toast.success("Identity Logged: Discipline Maintained", {
                theme: 'dark'
            });
            onSuccess();
            onClose();
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative bg-surface-card border border-border-subtle p-6 rounded-3xl w-[90%] max-w-md shadow-2xl flex flex-col items-center">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <Fingerprint className="w-12 h-12 text-primary mb-2" />
                    <h2 className="font-h3 text-h3 text-primary mb-1">Biometric Enforcer</h2>
                    <p className="text-on-surface-variant text-sm px-4">
                        High-risk block detected. Please verify presence to proceed and recalibrate schedule risk.
                    </p>
                </div>

                {/* Webcam Frame */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-primary/20 mb-6 group">
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary z-10"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary z-10"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary z-10"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary z-10"></div>
                    
                    {/* Scanner Line Overlay */}
                    {isScanning && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_#000000] shadow-primary animate-[scan_1.5s_ease-in-out_infinite_alternate] z-20"></div>
                    )}

                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className={`w-full h-full object-cover transition-all duration-300 ${isScanning ? 'brightness-125 saturate-50' : 'brightness-100'}`}
                    />
                    
                    {/* Dark overlay with text when scanning */}
                    {isScanning && (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center z-10">
                            <span className="font-metric text-lg text-primary tracking-widest font-bold animate-pulse drop-shadow-md">
                                SCANNING...
                            </span>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={isScanning}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-background rounded-xl font-metric text-md tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isScanning ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-3" />
                            Authenticating...
                        </>
                    ) : (
                        "Verify Presence"
                    )}
                </button>
            </div>
            
            <style>{`
                @keyframes scan {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(16rem); }
                }
            `}</style>
        </div>
    );
};

export default BiometricCheckModal;
