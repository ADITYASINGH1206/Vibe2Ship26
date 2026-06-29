import React, { useState, useEffect } from 'react';
import InputBar from './components/InputBar';
import RiskMeter from './components/RiskMeter';
import SemanticClusters from './components/SemanticClusters';
import CalendarView from './components/CalendarView';
import { analyzeTask } from './services/api';
import { BrainCircuit, BellRing } from 'lucide-react';

const LOADING_PHASES = [
    "Extracting entities & timeline...",
    "Clustering tasks semantically...",
    "Calculating failure risk...",
    "Finalizing agentic schedule..."
];

function App() {
    const [loadingPhase, setLoadingPhase] = useState(null);
    const [masterTaskList, setMasterTaskList] = useState([]);
    const [latestAnalytics, setLatestAnalytics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Request Notification permission on mount
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    }, []);

    const triggerNotification = (title, body) => {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, { body, icon: '/favicon.svg' });
        }
    };

    const handleAnalyze = async (taskData) => {
        setLoadingPhase(LOADING_PHASES[0]);
        setError(null);
        
        let phaseIndex = 0;
        const phaseInterval = setInterval(() => {
            phaseIndex++;
            if (phaseIndex < LOADING_PHASES.length) {
                setLoadingPhase(LOADING_PHASES[phaseIndex]);
            }
        }, 800);

        try {
            const result = await analyzeTask(taskData);
            clearInterval(phaseInterval);
            
            // Append new tasks to the master list
            if (result.microTasks && result.microTasks.length > 0) {
                setMasterTaskList(prev => [...prev, ...result.microTasks]);
            }

            // Update latest analytics
            setLatestAnalytics({
                riskScore: result.riskScore,
                interventionTriggered: result.interventionTriggered,
                nextNudgeTime: result.nextNudgeTime,
                category: result.category,
                objective: result.objective
            });

            const isHighRisk = result.interventionTriggered || result.riskScore > 0.7;
            if (isHighRisk) {
                triggerNotification(
                    "Agent Alert: High risk detected",
                    `High risk of failure for [${result.objective}]. I have scheduled a priority review for you.`
                );
            }
        } catch (err) {
            clearInterval(phaseInterval);
            setError("Failed to analyze the task. Please ensure the backend and ML-Engine are running.");
        } finally {
            clearInterval(phaseInterval);
            setLoadingPhase(null);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 font-sans selection:bg-blue-500 selection:text-white pb-24">
            <header className="flex flex-col items-center justify-center mb-12 text-center">
                <div className="flex items-center gap-3 mb-4">
                    <BrainCircuit className="w-10 h-10 text-blue-500" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        The Last-Minute Life Saver
                    </h1>
                </div>
                <p className="text-gray-400 text-lg max-w-2xl">
                    Dump your raw thoughts. The Agentic Brain will parse, schedule, and assess the risk of failure for you.
                </p>
            </header>

            <main className="max-w-7xl mx-auto flex flex-col gap-8">
                <InputBar onAnalyze={handleAnalyze} loadingPhase={loadingPhase} />
                
                {error && (
                    <div className="text-red-400 bg-red-900/30 p-4 rounded-lg text-center border border-red-800 max-w-4xl mx-auto w-full">
                        {error}
                    </div>
                )}

                {/* Dashboard View */}
                {masterTaskList.length > 0 && (
                    <>
                        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
                            {/* Left Column: Risk Meter & Checklists (1/3 width) */}
                            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                                <RiskMeter riskScore={latestAnalytics?.riskScore || 0} />
                                
                                {latestAnalytics?.interventionTriggered && latestAnalytics?.nextNudgeTime && (
                                    <div className="glass-panel p-4 flex items-center bg-orange-900/20 border-orange-700/50">
                                        <BellRing className="w-8 h-8 text-orange-400 mr-4 animate-bounce" />
                                        <div>
                                            <h4 className="text-orange-300 font-bold text-sm">Nudge Status Active</h4>
                                            <p className="text-orange-200/80 text-xs mt-1">
                                                Next Proactive Intervention scheduled for:<br/>
                                                <span className="font-semibold text-white">
                                                    {new Date(latestAnalytics.nextNudgeTime).toLocaleString()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <SemanticClusters tasks={masterTaskList} />
                            </div>
                            
                            {/* Right Column: Calendar View (2/3 width) */}
                            <div className="w-full lg:w-2/3">
                                <CalendarView tasks={masterTaskList} />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;
