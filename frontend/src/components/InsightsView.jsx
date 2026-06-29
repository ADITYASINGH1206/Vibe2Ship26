import React from 'react';

const InsightsView = ({ latestAnalytics }) => {
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-accent-blue">psychology</span>
                <h2 className="font-h3 text-h3 text-primary">Cognitive Insights</h2>
            </div>
            
            <div className="w-full mt-4">
                {latestAnalytics?.recommendation ? (
                    <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-accent-blue via-primary to-accent-purple shadow-[0_0_30px_rgba(0,102,255,0.15)] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-primary to-accent-purple blur-2xl opacity-20"></div>
                        <div className="relative bg-surface rounded-2xl p-8 z-10 glass-card">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <span className="material-symbols-outlined text-[120px] text-accent-blue animate-pulse">auto_awesome</span>
                            </div>
                            
                            <h3 className="font-metric text-metric text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple mb-8 flex items-center tracking-wide">
                                <span className="material-symbols-outlined text-[24px] mr-4 text-accent-blue">target</span>
                                AGENTIC STRATEGY
                            </h3>
                            
                            <div className="flex items-start gap-6">
                                <div className="mt-1 bg-accent-blue/10 p-3 rounded-xl border border-accent-blue/30">
                                    <span className="material-symbols-outlined text-[24px] text-accent-blue">bolt</span>
                                </div>
                                <p className="font-body-lg text-on-surface text-lg leading-relaxed font-medium mt-1">
                                    {latestAnalytics.recommendation}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card p-16 flex flex-col items-center justify-center text-center rounded-2xl">
                        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-6 opacity-30">lightbulb</span>
                        <p className="font-body-lg text-on-surface-variant max-w-md">No heuristics generated yet.<br/>Initialize a work cycle to receive AI-powered cognitive recommendations.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InsightsView;
