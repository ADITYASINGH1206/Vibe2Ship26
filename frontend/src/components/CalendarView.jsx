import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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

const CalendarView = ({ tasks }) => {
    // Map tasks to react-big-calendar events
    const events = tasks.map(task => {
        const start = new Date(task.startTime);
        const end = new Date(start.getTime() + (parseInt(task.duration) * 60000));
        return {
            title: task.title,
            start,
            end,
            allDay: false
        };
    });

    return (
        <div className="glass-panel p-4 h-[600px] w-full mt-8">
            <h3 className="text-xl font-bold text-gray-200 mb-4 pb-2 border-b border-gray-700">Agentic Schedule</h3>
            <div className="h-[500px]">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', color: 'white' }}
                    views={['month', 'week', 'day']}
                    defaultView="week"
                    step={30}
                    timeslots={2}
                    tooltipAccessor="title"
                />
            </div>
        </div>
    );
};

export default CalendarView;
