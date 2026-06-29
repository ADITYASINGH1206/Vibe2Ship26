import React from 'react';
import { BellRing } from 'lucide-react';

const NudgeComponent = ({ latestAnalytics }) => {
    if (!latestAnalytics || (!latestAnalytics.interventionTriggered && latestAnalytics.riskScore <= 0.7)) {
        return null;
    }

    return (
        <div className="glass-panel p-6 flex items-center bg-orange-900/20 border-orange-700/50 mt-6 shadow-2xl animate-pulse-slow">
            <BellRing className="w-10 h-10 text-orange-400 mr-6 animate-bounce" />
            <div>
                <h4 className="text-orange-300 font-extrabold text-xl mb-1">PROACTIVE INTERVENTION TRIGGERED</h4>
                <p className="text-orange-200/90 text-sm">
                    High risk of failure detected ({(latestAnalytics.riskScore * 100).toFixed(1)}%). 
                    Next nudge scheduled for: <span className="font-bold text-white bg-orange-800/50 px-2 py-0.5 rounded ml-1">
                        {new Date(latestAnalytics.nextNudgeTime || Date.now()).toLocaleString()}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default NudgeComponent;
