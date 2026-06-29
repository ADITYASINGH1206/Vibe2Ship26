import React, { useState, useEffect } from 'react';
import { analyzeTask } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardView from './components/DashboardView';
import TaskManagerView from './components/TaskManagerView';
import CalendarView from './components/CalendarView';
import InsightsView from './components/InsightsView';
import BillTrackerView from './components/BillTrackerView';
import HabitsView from './components/HabitsView';
import DeveloperProfileView from './components/DeveloperProfileView';

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
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Toggle Dark Mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Global State
    const [masterTaskList, setMasterTaskList] = useState([]);
    const [latestAnalytics, setLatestAnalytics] = useState(null);
    const [bills, setBills] = useState([
        { id: 1, payee: 'Electricity Provider', amount: 120.50, dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), paid: false },
        { id: 2, payee: 'Internet Bill', amount: 79.99, dueDate: new Date(Date.now() - 86400000).toISOString(), paid: false },
    ]);
    const [habits, setHabits] = useState([
        { id: 1, name: 'Drink 2L Water', completedDays: [] },
        { id: 2, name: 'Read 30 mins', completedDays: [] },
        { id: 3, name: 'Workout', completedDays: [] }
    ]);

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
            
            if (result.microTasks && result.microTasks.length > 0) {
                const newTasks = result.microTasks.map(t => ({
                    ...t,
                    id: Math.random().toString(36).substr(2, 9),
                    objective: result.objective,
                    category: result.category
                }));
                setMasterTaskList(prev => [...prev, ...newTasks]);
            }

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
                toast.error(`High risk detected for [${result.objective}]. Schedule reviewed!`, {
                    position: "top-right",
                    autoClose: 5000,
                    theme: isDarkMode ? "dark" : "light"
                });
            } else {
                toast.success(`Task scheduled successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: isDarkMode ? "dark" : "light"
                });
            }
            
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
                return <DashboardView latestAnalytics={latestAnalytics} masterTaskList={masterTaskList} bills={bills} habits={habits} />;
            case 'tasks':
                return <TaskManagerView onAnalyze={handleAnalyze} loadingPhase={loadingPhase} masterTaskList={masterTaskList} />;
            case 'calendar':
                return <CalendarView tasks={masterTaskList} setTasks={setMasterTaskList} bills={bills} />;
            case 'insights':
                return <InsightsView latestAnalytics={latestAnalytics} />;
            case 'bills':
                return <BillTrackerView bills={bills} setBills={setBills} />;
            case 'habits':
                return <HabitsView habits={habits} setHabits={setHabits} />;
            case 'profile':
                return <DeveloperProfileView />;
            default:
                return <DashboardView latestAnalytics={latestAnalytics} masterTaskList={masterTaskList} bills={bills} habits={habits} />;
        }
    };

    const NavItem = ({ id, icon, label }) => {
        const isActive = activeTab === id;
        return (
            <button
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors w-full text-left
                ${isActive 
                    ? 'text-primary font-bold border-r-2 border-primary bg-surface-bright/10 dark:bg-surface-bright/30' 
                    : 'text-on-surface-variant hover:bg-surface-bright/10 dark:hover:bg-surface-bright/30'}`}
            >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-body-md">{label}</span>
            </button>
        );
    };

    return (
        <div className="bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden relative">
            <ToastContainer />
            
            {/* Atmospheric Orbs */}
            <div className="orb bg-accent-blue w-[40rem] h-[40rem] -top-20 -left-20 animate-pulse"></div>
            <div className="orb bg-accent-purple w-[30rem] h-[30rem] bottom-0 right-0" style={{ animationDelay: '2s' }}></div>
            
            {/* Side Navigation Shell */}
            <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 border-r border-border-subtle/40 dark:border-white/10 flex-col py-6 px-4 bg-surface-panel/80 dark:bg-surface/80 backdrop-blur-xl z-50">
                <div className="mb-8 px-2">
                    <h1 className="font-h2 text-h2 tracking-tighter text-primary">Auralis</h1>
                    <p className="font-label-caps text-label-caps text-on-surface-variant/60 uppercase tracking-widest mt-1">Audio Intelligence</p>
                </div>
                
                <nav className="flex-1 space-y-2">
                    <NavItem id="dashboard" icon="dashboard" label="Command Center" />
                    <NavItem id="tasks" icon="checklist" label="Tasks & Queue" />
                    <NavItem id="calendar" icon="calendar_today" label="Smart Calendar" />
                    <NavItem id="bills" icon="account_balance_wallet" label="Fiscal & Bills" />
                    <NavItem id="habits" icon="bolt" label="Habits Synergy" />
                    <NavItem id="insights" icon="psychology" label="AI Insights" />
                    <NavItem id="profile" icon="account_circle" label="Developer Profile" />
                </nav>

                <div className="mt-auto glass-card p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest flex-shrink-0 border border-border-subtle">
                        <img className="w-full h-full object-cover" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfKwQkZ4FN3L4WHF70oQOg1yZ16mU0Jr2K288bWeMyXacdgsb4stlZdIzuzDcuGF5lpM6LkYCxeM069_FGvbjI0jeHm8d_BLSd_U7qbVmDnjK8UYyApgFk0qJPJSLyQJnFN1KNHLXKQkIV9tRnVyBE1kIbDIvGmAOaZrL6KvlEGAwh9YI0NON94b7fstLN2-mbdcogaIRIzwroAp_ek8_K1UEfq779hfPRvDTej8m_5PMVzkiFrgKzmnVh-CKXPjKy0W6ThPAg4jdn"/>
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-label-caps text-label-caps text-primary truncate">Alex Rivera</p>
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant/40 truncate tracking-widest mt-1">Master Tier Pro</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Nav Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border-subtle/40 bg-surface/95 backdrop-blur-md z-50 flex justify-around p-3 overflow-x-auto">
                <button onClick={() => setActiveTab('dashboard')} className={`p-2 rounded-lg flex justify-center ${activeTab === 'dashboard' ? 'text-primary' : 'text-on-surface-variant'}`}><span className="material-symbols-outlined">dashboard</span></button>
                <button onClick={() => setActiveTab('tasks')} className={`p-2 rounded-lg flex justify-center ${activeTab === 'tasks' ? 'text-primary' : 'text-on-surface-variant'}`}><span className="material-symbols-outlined">checklist</span></button>
                <button onClick={() => setActiveTab('calendar')} className={`p-2 rounded-lg flex justify-center ${activeTab === 'calendar' ? 'text-primary' : 'text-on-surface-variant'}`}><span className="material-symbols-outlined">calendar_today</span></button>
                <button onClick={() => setActiveTab('insights')} className={`p-2 rounded-lg flex justify-center ${activeTab === 'insights' ? 'text-primary' : 'text-on-surface-variant'}`}><span className="material-symbols-outlined">psychology</span></button>
                <button onClick={() => setActiveTab('profile')} className={`p-2 rounded-lg flex justify-center ${activeTab === 'profile' ? 'text-primary' : 'text-on-surface-variant'}`}><span className="material-symbols-outlined">account_circle</span></button>
            </div>

            {/* Main Content Wrapper */}
            <div className="lg:ml-64 relative z-10 min-h-screen pb-24 lg:pb-12">
                
                {/* Top Nav Bar */}
                <header className="fixed top-0 right-0 left-0 lg:left-64 flex items-center justify-between px-6 lg:px-8 h-20 z-40 bg-surface/60 dark:bg-surface/40 backdrop-blur-md border-b border-border-subtle/40 dark:border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="lg:hidden block">
                             <h1 className="font-h3 text-h3 tracking-tighter text-primary">Auralis</h1>
                        </div>
                        <div className="relative hidden md:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
                            <input className="bg-surface-container-low border border-border-subtle/50 dark:border-white/10 rounded-full pl-10 pr-6 py-2 font-body-md text-primary focus:ring-1 focus:ring-primary w-64 transition-all focus:w-80" placeholder="Scan nodes..." type="text"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Theme Toggler */}
                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="w-10 h-10 flex items-center justify-center rounded-full glass-card text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90"
                            title="Toggle Theme"
                        >
                            <span className="material-symbols-outlined">
                                {isDarkMode ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>
                        
                        <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                    </div>
                </header>

                <main className="pt-28 px-4 lg:px-8 max-w-[1400px] mx-auto">
                    {error && (
                        <div className="mb-6 text-error bg-error-container/30 p-4 rounded-lg text-center border border-error max-w-4xl mx-auto w-full">
                            {error}
                        </div>
                    )}
                    
                    {renderView()}
                </main>
            </div>
        </div>
    );
}

export default App;
