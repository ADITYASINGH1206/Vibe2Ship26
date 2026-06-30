import React, { useState } from 'react';
import { Send, Loader2, Calendar, Tag } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const InputBar = ({ onAnalyze, loadingPhase }) => {
    const [text, setText] = useState('');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('Work');
    const [targetDeadline, setTargetDeadline] = useState(null);

    const isLoading = loadingPhase !== null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !isLoading) {
            const finalDescription = notes.trim() ? `${text}\n\nAdditional Subtasks & Links:\n${notes}` : text;
            onAnalyze({
                taskDescription: finalDescription,
                category,
                targetDeadline: targetDeadline ? targetDeadline.toISOString() : null
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8 glass-card p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-3 relative">
                    <input
                        type="text"
                        className="w-full bg-surface-container-low text-on-surface border border-border-subtle rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md"
                        placeholder="Main objective (e.g., 'Prep for Presentation')..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={isLoading}
                    />
                    <textarea
                        className="w-full bg-surface-container-lowest text-on-surface border border-border-subtle rounded-xl py-3 pl-4 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm resize-none h-20"
                        placeholder="Add explicit subtasks, links, or specific notes here (optional)..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={isLoading}
                    ></textarea>
                </div>
                
                <div className="flex flex-col gap-4">
                    <div className="relative flex items-center bg-surface-container-low border border-border-subtle rounded-xl px-4 focus-within:border-primary transition-all z-50">
                        <Tag className="w-4 h-4 text-on-surface-variant mr-2" />
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            disabled={isLoading}
                            className="bg-transparent text-on-surface font-body-md py-3 focus:outline-none appearance-none pr-4 cursor-pointer"
                        >
                            <option value="Work" className="bg-surface text-on-surface">Work</option>
                            <option value="Personal" className="bg-surface text-on-surface">Personal</option>
                            <option value="Urgent" className="bg-surface text-on-surface">Urgent</option>
                            <option value="Errands" className="bg-surface text-on-surface">Errands</option>
                        </select>
                    </div>

                    <div className="relative flex items-center bg-surface-container-low border border-border-subtle rounded-xl px-4 focus-within:border-primary transition-all z-50">
                        <Calendar className="w-4 h-4 text-on-surface-variant mr-2" />
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
                            className="bg-transparent text-on-surface font-body-md py-3 focus:outline-none cursor-pointer w-48"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={!text.trim() || isLoading}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-background rounded-xl font-metric text-md tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-3" />
                        {loadingPhase}
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5 mr-3" />
                        Analyze & Schedule Task
                    </>
                )}
            </button>
        </form>
    );
};

export default InputBar;
