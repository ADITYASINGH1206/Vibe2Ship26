import React from 'react';
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

const RiskMeter = ({ riskScore }) => {
    // Risk score is 0.0 to 1.0
    const percentage = Math.round(riskScore * 100);
    
    let colorClass = 'text-green-500';
    let bgClass = 'bg-green-500';
    if (percentage > 50) {
        colorClass = 'text-yellow-500';
        bgClass = 'bg-yellow-500';
    }
    if (percentage > 80) {
        colorClass = 'text-red-500';
        bgClass = 'bg-red-500';
    }

    return (
        <div className="glass-panel p-6 w-full flex flex-col items-center justify-center relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Risk of Failure</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* SVG Gauge Background */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="10"
                        strokeDasharray="283" // 2 * pi * 45
                        strokeDashoffset="0"
                    />
                    {/* SVG Gauge Progress */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (283 * percentage) / 100}
                        className={clsx('transition-all duration-1000 ease-out', colorClass)}
                    />
                </svg>
                
                {/* Percentage Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={clsx("text-4xl font-bold", colorClass)}>{percentage}%</span>
                </div>
            </div>

            {percentage > 80 && (
                <div className="mt-6 flex items-center text-red-400 bg-red-900/30 p-3 rounded-lg animate-pulse-slow">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Intervention Triggered!</span>
                </div>
            )}
        </div>
    );
};

export default RiskMeter;
