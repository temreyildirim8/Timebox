import React, { useRef, useEffect, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format, isSameDay } from 'date-fns';
import type { TimeBlock, Task } from '../../types';
import { useDroppable } from '@dnd-kit/core';

interface ScheduleProps {
  selectedDate: string;
  timeBlocks: TimeBlock[];
  tasks: Task[];
  deleteTimeBlock: (id: string) => void;
  updateTimeBlock: (id: string, updates: Partial<TimeBlock>) => void;
  setDate: (date: string) => void;
  scheduleTask: (taskId: string, startTime: string, durationMinutes?: number) => void;
  unscheduleTask: (taskId: string) => void;
}

export const Schedule: React.FC<ScheduleProps> = ({
  selectedDate,
  timeBlocks,
  tasks,
  deleteTimeBlock,
  updateTimeBlock,
  setDate,
  scheduleTask,
  unscheduleTask,
}) => {
  const calendarRef = useRef<FullCalendar>(null);

  const scrollToCurrentTime = (smooth = true) => {
    if (!calendarRef.current) return;
    
    const calendarApi = calendarRef.current.getApi();
    if (calendarApi && isSameDay(new Date(), new Date(selectedDate))) {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      // Offset by 1 hour (60 mins) from the top
      const scrollMinutes = Math.max(0, currentMinutes - 60);
      
      const pixelsPerMinute = 40 / 15;
      const scrollTop = scrollMinutes * pixelsPerMinute;

      const scroller = (calendarRef.current as any).elRef.current?.querySelector('.fc-scroller');
      if (scroller) {
        scroller.scrollTo({
          top: scrollTop,
          behavior: smooth ? 'smooth' : 'auto'
        });
      }
    }
  };

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const currentCalDate = format(calendarApi.getDate(), 'yyyy-MM-dd');
      if (currentCalDate !== selectedDate) {
        calendarApi.gotoDate(selectedDate);
      }
      setTimeout(() => scrollToCurrentTime(false), 200);
    }
  }, [selectedDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToCurrentTime(true);
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const { setNodeRef, isOver } = useDroppable({
    id: 'calendar-droppable',
    data: {
      type: 'calendar'
    }
  });

  const events = useMemo(() => {
    return timeBlocks
      .filter(block => {
        const blockDate = format(new Date(block.startTime), 'yyyy-MM-dd');
        return blockDate === selectedDate;
      })
      .map(block => {
        const task = tasks.find(t => t.id === block.taskId);
        const isCompleted = task?.completed || false;
        
        return {
          id: block.id,
          title: block.title || 'Untitled',
          start: block.startTime,
          end: block.endTime,
          backgroundColor: isCompleted ? 'rgba(31, 41, 55, 0.6)' : (task?.color || block.color || 'var(--accent)'),
          borderColor: 'transparent',
          className: isCompleted ? 'event-completed' : '',
          extendedProps: { taskId: block.taskId, completed: isCompleted }
        };
      });
  }, [timeBlocks, tasks, selectedDate]);

  const handleEventChange = (info: any) => {
    const { event } = info;
    updateTimeBlock(event.id, {
      startTime: event.startStr,
      endTime: event.endStr
    });
  };

  const handleEventReceive = (info: any) => {
    const { event } = info;
    const taskId = event.extendedProps.taskId;
    const startTime = event.startStr;
    event.remove();
    if (taskId) {
      scheduleTask(taskId, startTime);
    }
  };

  const handleEventDragStop = (info: any) => {
    const { jsEvent, event } = info;
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      const rect = sidebar.getBoundingClientRect();
      if (
        jsEvent.clientX >= rect.left &&
        jsEvent.clientX <= rect.right &&
        jsEvent.clientY >= rect.top &&
        jsEvent.clientY <= rect.bottom
      ) {
        if (event.extendedProps.taskId) {
          unscheduleTask(event.extendedProps.taskId);
        } else {
          deleteTimeBlock(event.id);
        }
      }
    }
  };

  return (
    <div 
      ref={setNodeRef}
      className="main-content" 
      style={{ 
        backgroundColor: isOver ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
        transition: 'background-color 0.2s ease',
        borderRight: '1px solid var(--border)'
      }}
    >
      <header style={{ 
        flexShrink: 0,
        height: '70px',
        padding: '0 1.5rem', 
        borderBottom: '1px solid var(--border)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: 'var(--bg-primary)',
        zIndex: 10
      }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase' }}>
          {format(new Date(selectedDate), 'EEEE, MMMM do')}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() - 1);
              setDate(format(date, 'yyyy-MM-dd'));
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)'
            }}
            aria-label="Previous day"
          >
            ←
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setDate(e.target.value)}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.4rem 0.6rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              colorScheme: 'dark'
            }}
          />
          <button
            onClick={() => {
              const date = new Date(selectedDate);
              date.setDate(date.getDate() + 1);
              setDate(format(date, 'yyyy-MM-dd'));
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)'
            }}
            aria-label="Next day"
          >
            →
          </button>
        </div>
      </header>

      <div className="calendar-wrapper" style={{ flex: 1 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          headerToolbar={false}
          allDaySlot={false}
          slotDuration="00:15:00"
          snapDuration="00:05:00"
          slotLabelInterval="01:00"
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short',
            hour12: true
          }}
          expandRows={true}
          height="100%"
          editable={true}
          selectable={false}
          droppable={true}
          forceEventDuration={true}
          events={events}
          eventChange={handleEventChange}
          eventReceive={handleEventReceive}
          eventDragStop={handleEventDragStop}
          nowIndicator={true}
          dayHeaders={false}
          themeSystem="standard"
          eventTextColor="#fff"
          eventDisplay="block"
        />
      </div>

      <style>{`
        .fc {
          --fc-border-color: var(--grid-line);
          --fc-now-indicator-color: var(--accent);
          --fc-today-bg-color: transparent;
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: transparent;
          --fc-list-event-hover-bg-color: var(--bg-tertiary);
          font-family: inherit;
        }
        .fc .fc-timegrid-slot {
          height: 40px !important;
          border-bottom: 0;
        }
        .fc .fc-timegrid-slot-minor {
          border-top-style: dashed;
        }
        .fc-theme-standard td, .fc-theme-standard th {
          border-color: var(--grid-line);
        }
        .fc-theme-standard .fc-scrollgrid {
          border: none;
        }
        .fc-theme-standard td {
          border-right: none !important;
        }
        .fc .fc-timegrid-now-indicator-line {
          border-width: 2px 0 0;
        }
        .fc .fc-timegrid-axis-frame,
        .fc .fc-timegrid-slot-label-cushion {
          justify-content: flex-end;
          padding-right: 10px;
          color: var(--text-secondary);
          font-size: 0.56rem;
          text-transform: lowercase;
        }
        .fc-scroller {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .fc-scroller::-webkit-scrollbar {
          display: none !important;
        }
        .fc-event {
          border-radius: 6px;
          padding: 2px 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: grab;
          font-size: 0.8rem;
          border: none !important;
        }
        .fc-event:active {
          cursor: grabbing;
        }
        .event-completed {
          opacity: 0.7;
        }
        .event-completed .fc-event-title,
        .event-completed .fc-event-time {
          color: #a0a0a0; /* Grey text */
        }
        .fc-v-event .fc-event-main {
          color: #d0d0d0;
        }
        .fc-timegrid-event .fc-event-time {
          font-size: 0.7rem;
          margin-bottom: 2px;
        }
      `}</style>
    </div>
  );
};
