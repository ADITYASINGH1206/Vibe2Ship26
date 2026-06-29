import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const InputBar = ({ onAnalyze, isLoading }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !isLoading) {
            onAnalyze(text);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
            <div className="relative flex items-center">
                <input
                    type="text"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-4 pl-6 pr-16 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg placeholder-gray-400"
                    placeholder="Dump your task thoughts here (e.g., 'Chemistry paper due Friday')..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={!text.trim() || isLoading}
                    className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                </button>
            </div>
        </form>
    );
};

export default InputBar;
