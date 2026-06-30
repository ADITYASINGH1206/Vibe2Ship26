import React, { useState, useEffect } from 'react';
import { analyzeTask } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocalStorage } from './hooks/useLocalStorage';

import DashboardView from './components/DashboardView';
import TaskManagerView from './components/TaskManagerView';
import CalendarView from './components/CalendarView';
import InsightsView from './components/InsightsView';
import BillTrackerView from './components/BillTrackerView';
import HabitsView from './components/HabitsView';
import DeveloperProfile from './components/DeveloperProfile';
import BiometricCheckModal from './components/BiometricCheckModal';

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
    const [masterTaskList, setMasterTaskList] = useLocalStorage('vibe2ship_tasks', []);
    const [latestAnalytics, setLatestAnalytics] = useState(null);
    const [bills, setBills] = useLocalStorage('vibe2ship_bills', [
        { id: 1, payee: 'Electricity Provider', amount: 120.50, dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), paid: false },
        { id: 2, payee: 'Internet Bill', amount: 79.99, dueDate: new Date(Date.now() - 86400000).toISOString(), paid: false },
    ]);
    const [habits, setHabits] = useLocalStorage('vibe2ship_habits', [
        { id: 1, name: 'Drink 2L Water', completedDays: [] },
        { id: 2, name: 'Read 30 mins', completedDays: [] },
        { id: 3, name: 'Workout', completedDays: [] }
    ]);

    const [isBiometricModalOpen, setIsBiometricModalOpen] = useState(false);
    const [enforcerTriggeredIds, setEnforcerTriggeredIds] = useState(new Set());
    const [pendingBiometricAction, setPendingBiometricAction] = useState(null);

    const requireBiometricCheck = (actionObj) => {
        setPendingBiometricAction(actionObj);
        setIsBiometricModalOpen(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            masterTaskList.forEach(task => {
                const startTime = new Date(task.startTime);
                if (
                    !enforcerTriggeredIds.has(task.id) && 
                    Math.abs(now - startTime) < 60000 && // Within a minute
                    latestAnalytics?.riskScore > 0.5 // High risk threshold for demo
                ) {
                    setEnforcerTriggeredIds(prev => new Set(prev).add(task.id));
                    setIsBiometricModalOpen(true);
                }
            });
        }, 10000); // Check every 10s for simulation
        
        return () => clearInterval(interval);
    }, [masterTaskList, latestAnalytics, enforcerTriggeredIds]);

    const handleBiometricSuccess = () => {
        if (latestAnalytics) {
            setLatestAnalytics(prev => ({
                ...prev,
                riskScore: Math.max(0.1, prev.riskScore - 0.4) // Dynamically flatten risk curve
            }));
        }
        
        if (pendingBiometricAction) {
            if (pendingBiometricAction.type === 'DELETE_OBJECTIVE') {
                setMasterTaskList(prev => prev.filter(t => t.objective !== pendingBiometricAction.payload));
            }
            setPendingBiometricAction(null);
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
                return <DashboardView latestAnalytics={latestAnalytics} masterTaskList={masterTaskList} setMasterTaskList={setMasterTaskList} requireBiometricCheck={requireBiometricCheck} bills={bills} habits={habits} />;
            case 'tasks':
                return <TaskManagerView onAnalyze={handleAnalyze} loadingPhase={loadingPhase} masterTaskList={masterTaskList} />;
            case 'calendar':
                return <CalendarView tasks={masterTaskList} setTasks={setMasterTaskList} bills={bills} />;
            case 'insights':
                return <InsightsView latestAnalytics={latestAnalytics} masterTaskList={masterTaskList} />;
            case 'bills':
                return <BillTrackerView bills={bills} setBills={setBills} />;
            case 'habits':
                return <HabitsView habits={habits} setHabits={setHabits} />;
            case 'profile':
                return <DeveloperProfile />;
            default:
                return <DashboardView latestAnalytics={latestAnalytics} masterTaskList={masterTaskList} setMasterTaskList={setMasterTaskList} requireBiometricCheck={requireBiometricCheck} bills={bills} habits={habits} />;
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
            <BiometricCheckModal 
                isOpen={isBiometricModalOpen} 
                onClose={() => setIsBiometricModalOpen(false)} 
                onSuccess={handleBiometricSuccess} 
            />
            
            {/* Atmospheric Orbs */}
            <div className="orb bg-accent-blue w-[40rem] h-[40rem] -top-20 -left-20 animate-pulse"></div>
            <div className="orb bg-accent-purple w-[30rem] h-[30rem] bottom-0 right-0" style={{ animationDelay: '2s' }}></div>
            
            {/* Side Navigation Shell */}
            <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 border-r border-border-subtle/40 dark:border-white/10 flex-col py-6 px-4 bg-surface-panel/80 dark:bg-surface/80 backdrop-blur-xl z-50 overflow-hidden">
                <div className="mb-8 px-2 flex items-center gap-3 overflow-hidden">
                    <img src="/logo.png" alt="OptiFlow Logo" className="h-10 w-10 object-contain rounded-xl shadow-lg shrink-0" />
                    <div className="min-w-0">
                        <h1 className="font-h3 text-h3 tracking-tighter text-primary truncate">OptiFlow</h1>
                        <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest mt-1 truncate">Cognitive Interface</p>
                    </div>
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
                        <div className="lg:hidden flex items-center gap-2">
                             <img src="/logo.png" alt="OptiFlow Logo" className="h-8 w-8 object-contain rounded-lg shadow-sm" />
                             <h1 className="font-h3 text-h3 tracking-tighter text-primary">OptiFlow</h1>
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

                        {/* Force Biometric Demo Button */}
                        <button 
                            onClick={() => setIsBiometricModalOpen(true)}
                            className="w-10 h-10 flex items-center justify-center rounded-full glass-card text-accent-purple hover:text-primary transition-colors scale-95 active:scale-90"
                            title="Force Biometric Scan (Demo)"
                        >
                            <span className="material-symbols-outlined">fingerprint</span>
                        </button>
                        
                        <button className="w-10 h-10 flex items-center justify-center rounded-full glass-card text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90">
                            <span className="material-symbols-outlined">notifications</span>
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
