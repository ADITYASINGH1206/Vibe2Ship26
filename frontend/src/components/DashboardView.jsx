import React from 'react';
import RiskMeter from './RiskMeter';
import NudgeComponent from './NudgeComponent';
import { Activity } from 'lucide-react';

const DashboardView = ({ latestAnalytics }) => {
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-2 border-b border-gray-700 pb-4">
                <Activity className="w-8 h-8 text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-100">Live Dashboard</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">Risk Assessment</h3>
                    <RiskMeter riskScore={latestAnalytics?.riskScore || 0} />
                </div>
                
                <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">Proactive Interventions</h3>
                    {latestAnalytics ? (
                        <NudgeComponent latestAnalytics={latestAnalytics} />
                    ) : (
                        <div className="glass-panel p-8 text-center text-gray-500 italic">
                            No active tasks. Submit a task to begin monitoring.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
