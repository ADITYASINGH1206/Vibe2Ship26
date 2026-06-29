import React, { useState } from 'react';
import { Send, Loader2, Calendar, Tag } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const InputBar = ({ onAnalyze, loadingPhase }) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Work');
    const [targetDeadline, setTargetDeadline] = useState(null);

    const isLoading = loadingPhase !== null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !isLoading) {
            onAnalyze({
                taskDescription: text,
                category,
                targetDeadline: targetDeadline ? targetDeadline.toISOString() : null
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8 bg-gray-800/80 p-4 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
                        placeholder="Dump your task thoughts here (e.g., 'Chemistry paper due Friday')..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                
                <div className="flex gap-2">
                    <div className="relative flex items-center bg-gray-900 border border-gray-700 rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                        <Tag className="w-4 h-4 text-gray-400 mr-2" />
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={isLoading}
                            className="bg-transparent text-gray-300 py-3 focus:outline-none appearance-none pr-4 cursor-pointer"
                        >
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Errands">Errands</option>
                        </select>
                    </div>

                    <div className="relative flex items-center bg-gray-900 border border-gray-700 rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <DatePicker
                            selected={targetDeadline}
                            onChange={(date) => setTargetDeadline(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Target Deadline..."
                            disabled={isLoading}
                            className="bg-transparent text-gray-300 py-3 focus:outline-none cursor-pointer w-48"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={!text.trim() || isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {loadingPhase}
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5 mr-2" />
                        Analyze & Schedule Task
                    </>
                )}
            </button>
        </form>
    );
};

export default InputBar;
