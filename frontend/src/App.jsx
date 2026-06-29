import React, { useState } from 'react';
import InputBar from './components/InputBar';
import RiskMeter from './components/RiskMeter';
import SemanticClusters from './components/SemanticClusters';
import { analyzeTask } from './services/api';
import { BrainCircuit } from 'lucide-react';

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async (text) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await analyzeTask(text);
            setData(result.data);
        } catch (err) {
            setError("Failed to analyze the task. Please ensure the backend and ML-Engine are running.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-12 font-sans selection:bg-blue-500 selection:text-white">
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

            <main className="max-w-6xl mx-auto flex flex-col gap-8">
                <InputBar onAnalyze={handleAnalyze} isLoading={isLoading} />
                
                {error && (
                    <div className="text-red-400 bg-red-900/30 p-4 rounded-lg text-center border border-red-800">
                        {error}
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                    {/* Left Column: Risk Meter (1/3 width) */}
                    <div className="w-full md:w-1/3">
                        <RiskMeter riskScore={data?.analytics?.averageRiskScore || 0} />
                    </div>
                    
                    {/* Right Column: Semantic Clusters (2/3 width) */}
                    <div className="w-full md:w-2/3">
                        <SemanticClusters tasks={data?.scheduledTasks} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
