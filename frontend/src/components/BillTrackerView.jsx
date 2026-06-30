import React, { useState } from 'react';

const BillTrackerView = ({ bills, setBills, setHistoryLedger }) => {
    const [payee, setPayee] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleAddBill = (e) => {
        e.preventDefault();
        if (!payee || !amount || !dueDate) return;
        
        const newBill = {
            id: Math.random().toString(36).substr(2, 9),
            payee,
            amount: parseFloat(amount),
            dueDate: new Date(dueDate).toISOString(),
            paid: false
        };
        setBills(prev => [...prev, newBill]);
        setPayee(''); setAmount(''); setDueDate('');
    };

    const togglePaid = (id) => {
        const bill = bills.find(b => b.id === id);
        if (!bill) return;

        if (!bill.paid) {
            // It was unpaid, now paying -> add to ledger
            setHistoryLedger?.(prev => [{
                id: Math.random().toString(36).substr(2, 9),
                refId: bill.id,
                type: 'bill',
                title: bill.payee,
                amount: bill.amount,
                completedAt: new Date().toISOString()
            }, ...prev]);
        } else {
            // It was paid, now un-paying -> remove from ledger
            setHistoryLedger?.(prev => prev.filter(item => item.refId !== bill.id));
        }

        setBills(prev => prev.map(b => b.id === id ? { ...b, paid: !b.paid } : b));
    };

    const pendingBills = bills.filter(b => !b.paid).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const paidBills = bills.filter(b => b.paid).sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

    const isOverdue = (dateStr) => new Date(dateStr) < new Date();

    const BillItem = ({ bill }) => {
        const overdue = !bill.paid && isOverdue(bill.dueDate);
        return (
            <div className={`flex items-center justify-between p-4 mb-2 rounded-xl border ${bill.paid ? 'bg-surface-container/30 border-border-subtle/50 opacity-60' : overdue ? 'bg-error-container/20 border-error/50' : 'bg-surface-container-high/50 border-transparent hover:border-border-subtle'}`}>
                <div className="flex items-center gap-4">
                    <button onClick={() => togglePaid(bill.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${bill.paid ? 'bg-accent-emerald border-accent-emerald' : 'border-border-subtle hover:border-primary'}`}>
                        {bill.paid && <span className="material-symbols-outlined text-background text-[16px]">check</span>}
                    </button>
                    <div>
                        <h4 className={`font-body-md font-semibold ${bill.paid ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{bill.payee}</h4>
                        <div className="flex items-center gap-1 font-label-caps text-[10px] tracking-widest uppercase mt-1">
                            <span className={`material-symbols-outlined text-[14px] ${overdue ? 'text-error' : 'text-on-surface-variant'}`}>schedule</span>
                            <span className={overdue ? 'text-error font-bold' : 'text-on-surface-variant'}>
                                {new Date(bill.dueDate).toLocaleDateString()} {overdue && '(OVERDUE)'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`font-metric text-lg ${bill.paid ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                    ${bill.amount.toFixed(2)}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">account_balance_wallet</span>
                <h2 className="font-h3 text-h3 text-primary">Fiscal Obligations</h2>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border-t-4 border-t-accent-blue/50">
                <h3 className="font-metric text-metric text-on-surface mb-6">Queue Obligation</h3>
                <form onSubmit={handleAddBill} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Payee / Entity</label>
                        <input type="text" value={payee} onChange={e=>setPayee(e.target.value)} className="w-full bg-surface-container-low border border-border-subtle rounded-xl p-3 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="e.g. Server Hosting" />
                    </div>
                    <div className="w-full md:w-32">
                        <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Capital ($)</label>
                        <input type="number" step="0.01" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full bg-surface-container-low border border-border-subtle rounded-xl p-3 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" placeholder="0.00" />
                    </div>
                    <div className="w-full md:w-48">
                        <label className="block font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Due Date</label>
                        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="w-full bg-surface-container-low border border-border-subtle rounded-xl p-3 text-on-surface font-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none" />
                    </div>
                    <button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-background rounded-xl p-3 px-6 flex items-center justify-center font-metric h-[48px] transition-colors">
                        <span className="material-symbols-outlined mr-2">add</span> Enqueue
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-metric text-metric text-on-surface mb-6 flex justify-between items-end pb-4 border-b border-border-subtle/50">
                        Pending <span className="px-3 py-1 rounded-full bg-error/10 text-error font-label-caps text-[10px] tracking-widest">{pendingBills.length}</span>
                    </h3>
                    <div className="flex flex-col mt-4">
                        {pendingBills.length === 0 ? <p className="text-on-surface-variant font-body-md italic p-4 text-center">Accounts settled.</p> : pendingBills.map(b => <BillItem key={b.id} bill={b} />)}
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-metric text-metric text-on-surface mb-6 flex justify-between items-end pb-4 border-b border-border-subtle/50">
                        Settled <span className="px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-label-caps text-[10px] tracking-widest">{paidBills.length}</span>
                    </h3>
                    <div className="flex flex-col mt-4">
                        {paidBills.length === 0 ? <p className="text-on-surface-variant font-body-md italic p-4 text-center">No settlements yet.</p> : paidBills.map(b => <BillItem key={b.id} bill={b} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillTrackerView;
