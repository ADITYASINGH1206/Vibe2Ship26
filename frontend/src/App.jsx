import React, { useState, useEffect } from 'react';
import { analyzeTask } from './services/api';
import { BrainCircuit, Activity, Calendar, CheckSquare, Lightbulb } from 'lucide-react';

import DashboardView from './components/DashboardView';
import TaskManagerView from './components/TaskManagerView';
import CalendarView from './components/CalendarView';
import InsightsView from './components/InsightsView';

const LOADING_PHASES = [
    "Extracting entities & timeline...",
    "Clustering tasks semantically...",
    "Calculating failure risk...",
    "Generating personalized insights...",
    "Finalizing agentic schedule..."
];

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [loadingPhase, setLoadingPhase] = useState(null);
    const [masterTaskList, setMasterTaskList] = useState([]);
    const [latestAnalytics, setLatestAnalytics] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                objective: result.objective,
                recommendation: result.recommendation
            });

            const isHighRisk = result.interventionTriggered || result.riskScore > 0.7;
            if (isHighRisk) {
                triggerNotification(
                    "Agent Alert: High risk detected",
                    `High risk of failure for [${result.objective}]. I have scheduled a priority review for you.`
                );
            }
            
            // Switch to dashboard view automatically upon successful submission
            setActiveTab('dashboard');

        } catch (err) {
            clearInterval(phaseInterval);
            setError("Failed to analyze the task. Please ensure the backend and ML-Engine are running.");
        } finally {
            clearInterval(phaseInterval);
            setLoadingPhase(null);
        }
    };

    const renderView = () => {
        switch(activeTab) {
            case 'dashboard':
                return <DashboardView latestAnalytics={latestAnalytics} />;
            case 'tasks':
                return <TaskManagerView onAnalyze={handleAnalyze} loadingPhase={loadingPhase} masterTaskList={masterTaskList} />;
            case 'calendar':
                return (
                    <div className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2 border-b border-gray-700 pb-4">
                            <Calendar className="w-8 h-8 text-indigo-400" />
                            <h2 className="text-3xl font-bold text-gray-100">Calendar Planner</h2>
                        </div>
                        <CalendarView tasks={masterTaskList} />
                    </div>
                );
            case 'insights':
                return <InsightsView latestAnalytics={latestAnalytics} />;
            default:
                return <DashboardView latestAnalytics={latestAnalytics} />;
        }
    };

    const NavItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
        >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </button>
    );

    return (
        <div className="min-h-screen flex bg-gray-900 font-sans selection:bg-blue-500 selection:text-white">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-gray-800 bg-gray-900/50 hidden md:flex flex-col flex-shrink-0">
                <div className="p-6 flex items-center gap-3 border-b border-gray-800">
                    <BrainCircuit className="w-8 h-8 text-blue-500" />
                    <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        Vibe2Ship
                    </h1>
                </div>
                
                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <NavItem id="dashboard" icon={Activity} label="Dashboard" />
                    <NavItem id="tasks" icon={CheckSquare} label="Task Manager" />
                    <NavItem id="calendar" icon={Calendar} label="Calendar" />
                    <NavItem id="insights" icon={Lightbulb} label="Insights" />
                </nav>
            </aside>

            {/* Mobile Navigation Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-800 bg-gray-900/95 backdrop-blur-md z-50 flex justify-around p-3">
                <button onClick={() => setActiveTab('dashboard')} className={`p-2 rounded-lg ${activeTab === 'dashboard' ? 'text-blue-400 bg-blue-900/30' : 'text-gray-500'}`}><Activity className="w-6 h-6" /></button>
                <button onClick={() => setActiveTab('tasks')} className={`p-2 rounded-lg ${activeTab === 'tasks' ? 'text-emerald-400 bg-emerald-900/30' : 'text-gray-500'}`}><CheckSquare className="w-6 h-6" /></button>
                <button onClick={() => setActiveTab('calendar')} className={`p-2 rounded-lg ${activeTab === 'calendar' ? 'text-indigo-400 bg-indigo-900/30' : 'text-gray-500'}`}><Calendar className="w-6 h-6" /></button>
                <button onClick={() => setActiveTab('insights')} className={`p-2 rounded-lg ${activeTab === 'insights' ? 'text-yellow-400 bg-yellow-900/30' : 'text-gray-500'}`}><Lightbulb className="w-6 h-6" /></button>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-12 pb-24 h-screen overflow-y-auto overflow-x-hidden">
                {error && (
                    <div className="mb-6 text-red-400 bg-red-900/30 p-4 rounded-lg text-center border border-red-800 max-w-4xl mx-auto w-full">
                        {error}
                    </div>
                )}
                
                {renderView()}
            </main>
        </div>
    );
}

export default App;
