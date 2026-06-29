import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './calendar-overrides.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = (typeof withDragAndDrop === 'function') ? withDragAndDrop(Calendar) : withDragAndDrop.default(Calendar);

const CalendarView = ({ tasks, setTasks, bills }) => {
    const [view, setView] = useState('week');
    const [date, setDate] = useState(new Date());

    // Map tasks to react-big-calendar events
    const taskEvents = tasks.map(task => {
        const start = new Date(task.startTime);
        const end = new Date(start.getTime() + (parseInt(task.duration) * 60000));
        return {
            id: task.id,
            title: task.title,
            start,
            end,
            allDay: false,
            type: 'task'
        };
    });

    // Map bills to events
    const billEvents = (bills || []).map(bill => {
        const start = new Date(bill.dueDate);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour block
        return {
            id: `bill-${bill.id}`,
            title: `💳 ${bill.payee} ($${bill.amount})`,
            start,
            end,
            allDay: true,
            type: 'bill'
        };
    });

    const events = [...taskEvents, ...billEvents];

    const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
        if (event.type === 'bill') return; // Don't allow dragging bills for now
        
        setTasks(prevTasks => {
            return prevTasks.map(t => {
                if (t.id === event.id) {
                    // Update start time and duration based on resize/drop
                    const newDuration = Math.round((end.getTime() - start.getTime()) / 60000);
                    return { ...t, startTime: start.toISOString(), duration: newDuration.toString() };
                }
                return t;
            });
        });
    };

    const resizeEvent = ({ event, start, end }) => {
        moveEvent({ event, start, end });
    };

    const deleteEvent = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const CustomEvent = ({ event }) => (
        <div className="relative group w-full h-full flex items-center justify-between pr-1">
            <span className="truncate font-body-md text-sm">{event.title}</span>
            {event.type === 'task' && (
                <button 
                    onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 bg-error rounded text-background transition-opacity absolute right-0 top-0 bottom-0 flex items-center justify-center h-full hover:bg-error/80"
                >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                </button>
            )}
        </div>
    );

    const eventPropGetter = (event) => {
        if (event.type === 'bill') {
            return { style: { backgroundColor: 'var(--color-error-container)', border: '1px solid var(--color-error)', color: 'var(--color-on-error-container)', borderRadius: '8px' } };
        }
        return { style: { backgroundColor: 'var(--color-primary)', border: '1px solid var(--color-primary-fixed)', color: 'var(--color-background)', borderRadius: '8px' } };
    };

    return (
        <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-2 border-b border-border-subtle/50 pb-6">
                <span className="material-symbols-outlined text-[32px] text-primary">calendar_today</span>
                <h2 className="font-h3 text-h3 text-primary">Smart Calendar</h2>
            </div>
            <div className="glass-card p-6 h-[700px] w-full rounded-2xl">
                <div className="h-full font-body-md text-on-surface calendar-auralis">
                    <DnDCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '100%', color: 'var(--color-on-surface)' }}
                        views={['month', 'week', 'day']}
                        view={view}
                        onView={setView}
                        date={date}
                        onNavigate={setDate}
                        step={30}
                        timeslots={2}
                        onEventDrop={moveEvent}
                        onEventResize={resizeEvent}
                        resizable
                        components={{
                            event: CustomEvent
                        }}
                        eventPropGetter={eventPropGetter}
                        tooltipAccessor="title"
                    />
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
