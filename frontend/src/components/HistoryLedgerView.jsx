import React from 'react';

const HistoryLedgerView = ({ historyLedger }) => {
    // Sort ledger items by completedAt descending (newest first)
    const sortedLedger = [...(historyLedger || [])].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    const LedgerItem = ({ item }) => {
        const isTask = item.type === 'task';
        const date = new Date(item.completedAt);
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <div className="flex items-start gap-4 p-4 mb-4 rounded-xl glass-card border border-border-subtle hover:border-primary/50 transition-colors animate-in fade-in slide-in-from-left-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isTask ? 'bg-primary/20 text-primary' : 'bg-accent-emerald/20 text-accent-emerald'}`}>
                    <span className="material-symbols-outlined">
                        {isTask ? 'check_circle' : 'account_balance_wallet'}
                    </span>
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h4 className="font-body-lg font-semibold text-on-surface">{item.title}</h4>
                            <p className="font-body-sm text-on-surface-variant mt-1">
                                {isTask ? `Objective: ${item.objective}` : `Paid Amount: $${item.amount.toFixed(2)}`}
                            </p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <span className="font-label-caps text-xs tracking-widest text-on-surface-variant uppercase">{dateStr}</span>
                            <span className="font-metric text-sm text-on-surface">{timeStr}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">receipt_long</span>
                <h2 className="font-h3 text-h3 text-primary">History Ledger</h2>
            </div>
            
            <div className="w-full">
                {sortedLedger.length === 0 ? (
                    <div className="glass-card p-16 flex flex-col items-center justify-center text-center rounded-2xl border-dashed">
                        <span className="material-symbols-outlined text-[64px] text-on-surface-variant mb-6 opacity-30">
                            history_toggle_off
                        </span>
                        <p className="font-body-lg text-on-surface-variant max-w-md">
                            Your ledger is empty. Complete tasks or pay bills to see them logged here permanently.
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-6 top-6 bottom-6 w-px bg-border-subtle/50 -z-10"></div>
                        <div className="flex flex-col gap-2">
                            {sortedLedger.map(item => (
                                <LedgerItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryLedgerView;
