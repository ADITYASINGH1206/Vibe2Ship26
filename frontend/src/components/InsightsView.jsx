import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

const RiskCurveChart = ({ data, pois }) => {
    return (
        <div className="w-full h-80 mt-6 glass-card p-4 rounded-xl border border-primary/20 bg-surface/50">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis 
                        dataKey="time" 
                        stroke="#8e9192" 
                        tick={{ fill: '#8e9192', fontSize: 12 }} 
                        tickMargin={10} 
                        axisLine={false} 
                    />
                    <YAxis 
                        stroke="#8e9192" 
                        tick={{ fill: '#8e9192', fontSize: 12 }} 
                        domain={[0, 100]} 
                        axisLine={false} 
                        tickLine={false} 
                        label={{ value: 'Risk of Failure', angle: -90, position: 'insideLeft', fill: '#8e9192', fontSize: 12 }} 
                    />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1c1b1b', border: '1px solid #4b5563', borderRadius: '8px', color: '#e5e7eb' }} 
                        itemStyle={{ color: '#3b82f6' }} 
                    />
                    <Line 
                        type="monotone" 
                        dataKey="risk" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        dot={false} 
                        activeDot={{ r: 6, fill: '#3b82f6', stroke: '#1c1b1b', strokeWidth: 2 }} 
                    />
                    
                    {pois.map((poi, index) => (
                        <ReferenceDot 
                            key={index} 
                            x={poi.time} 
                            y={poi.risk} 
                            r={6} 
                            fill="#ef4444" 
                            stroke="#1c1b1b" 
                            strokeWidth={2} 
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

const InsightsView = ({ latestAnalytics }) => {
    // Generate simulated data based on latest risk score
    const baseRisk = latestAnalytics ? Math.round(latestAnalytics.riskScore * 100) : 30;
    
    // Simulated weekly timeline data
    const chartData = [
        { time: 'Mon', risk: Math.max(0, baseRisk - 20) },
        { time: 'Tue', risk: Math.max(0, baseRisk - 10) },
        { time: 'Wed', risk: baseRisk },
        { time: 'Thu', risk: Math.min(100, baseRisk + 15) },
        { time: 'Fri', risk: Math.min(100, baseRisk + 25) },
        { time: 'Sat', risk: Math.max(0, baseRisk - 30) },
        { time: 'Sun', risk: Math.max(0, baseRisk - 40) },
    ];

    // Identify POIs (Points of Interest) where risk > 70
    const pois = chartData.filter(d => d.risk > 70);

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
                
                {/* Time Trading Risk Chart */}
                <div className="mt-8">
                    <h3 className="font-metric text-xl text-primary mb-2 flex items-center">
                        <span className="material-symbols-outlined mr-2">monitoring</span>
                        Risk Curve Market Structure
                    </h3>
                    <p className="text-on-surface-variant text-sm mb-4">
                        Timeline analysis of cognitive overload points. Red indicators denote structural breakdown in schedule capacity.
                    </p>
                    <RiskCurveChart data={chartData} pois={pois} />
                </div>
            </div>
        </div>
    );
};

export default InsightsView;
