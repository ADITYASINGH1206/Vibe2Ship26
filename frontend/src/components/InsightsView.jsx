import React from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';

const InsightsView = ({ latestAnalytics }) => {
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-2 border-b border-gray-700 pb-4">
                <Lightbulb className="w-8 h-8 text-yellow-400" />
                <h2 className="text-3xl font-bold text-gray-100">Personalized Insights</h2>
            </div>
            
            <div className="w-full mt-4">
                {latestAnalytics?.recommendation ? (
                    <div className="glass-panel p-8 bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-32 h-32 text-yellow-300" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-yellow-500 mb-4 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2" />
                            AI Recommendation
                        </h3>
                        
                        <p className="text-gray-200 text-lg leading-relaxed relative z-10">
                            {latestAnalytics.recommendation}
                        </p>
                    </div>
                ) : (
                    <div className="glass-panel p-12 flex flex-col items-center justify-center text-center">
                        <Lightbulb className="w-16 h-16 text-gray-600 mb-4 opacity-50" />
                        <p className="text-gray-400 text-lg">No insights generated yet.<br/>Submit a task to receive AI-powered recommendations.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsightsView;
