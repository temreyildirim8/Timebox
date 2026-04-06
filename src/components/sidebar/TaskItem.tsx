import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Circle, GripVertical, Clock, Palette } from 'lucide-react';
import { format } from 'date-fns';
import { ChromePicker } from 'react-color';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useInteractions,
  FloatingPortal,
  useHover,
  safePolygon,
  useRole
} from '@floating-ui/react';
import type { Task, TimeBlock } from '../../types';

interface TaskItemProps {
  task: Task;
  timeBlock?: TimeBlock;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  moveTask: () => void;
  moveIcon: React.ReactNode;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task, timeBlock, toggleTask, deleteTask, updateTask, moveTask, moveIcon
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  // Sortable functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Prevent text selection while color picker is open/being dragged
  useEffect(() => {
    if (isPickerOpen) {
      document.body.classList.add('picker-open');
    } else {
      document.body.classList.remove('picker-open');
    }
    return () => {
      document.body.classList.remove('picker-open');
    };
  }, [isPickerOpen]);

  // Color Picker Floating Logic
  const { refs: pickerRefs, floatingStyles: pickerStyles, context: pickerContext } = useFloating({
    open: isPickerOpen,
    onOpenChange: setIsPickerOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    placement: 'right-start',
  });

  // Tooltip Floating Logic
  const { refs: tooltipRefs, floatingStyles: tooltipStyles, context: tooltipContext } = useFloating({
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    placement: 'top-start',
  });

  const pickerClick = useClick(pickerContext);
  const pickerDismiss = useDismiss(pickerContext);
  const { getReferenceProps: getPickerProps, getFloatingProps: getPickerFloatingProps } = useInteractions([
    pickerClick,
    pickerDismiss,
  ]);

  const tooltipHover = useHover(tooltipContext, {
    delay: 1000,
    handleClose: safePolygon(),
  });
  const tooltipRole = useRole(tooltipContext, { role: 'tooltip' });
  const { getReferenceProps: getTooltipProps, getFloatingProps: getTooltipFloatingProps } = useInteractions([
    tooltipHover,
    tooltipRole,
  ]);

  const handleColorChange = (color: any) => {
    const { r, g, b, a } = color.rgb;
    updateTask(task.id, { color: `rgba(${r}, ${g}, ${b}, ${a})` });
  };

  return (
    <div
      ref={setNodeRef}
      className="draggable-task-item task-item-container"
      data-task-id={task.id}
      data-title={task.title}
      {...attributes}
      style={{
        ...style,
        borderLeft: `4px solid ${task.color || 'var(--accent)'}`
      }}
    >
      <div className="task-item-content">
        <div
          ref={tooltipRefs.setReference}
          className="task-item-drag-handle"
          {...getTooltipProps()}
          {...listeners}
        >
          <GripVertical size={14} />
        </div>

        {isTooltipOpen && (
          <FloatingPortal>
            <div
              ref={tooltipRefs.setFloating}
              style={tooltipStyles}
              className="task-tooltip"
              {...getTooltipFloatingProps()}
            >
              {task.title}
            </div>
          </FloatingPortal>
        )}
        
        <button className="task-item-toggle" onClick={() => toggleTask(task.id)}>
          {task.completed ? (
            <CheckCircle size={18} color="#22c55e" fill="#22c55e" fillOpacity={0.2} />
          ) : (
            <Circle size={18} color="var(--text-secondary)" />
          )}
        </button>

        <div className="task-item-body">
          <div className={`task-item-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
          </div>
          {timeBlock && (
            <div className="task-item-time">
              <Clock size={10} />
              {format(new Date(timeBlock.startTime), 'h:mm a')}
            </div>
          )}
        </div>

        <div className="task-actions">
          <div className="relative-container">
            <button 
              ref={pickerRefs.setReference}
              {...getPickerProps()}
              title="Change color" 
              className="action-btn"
            >
              <Palette size={14} />
            </button>
            {isPickerOpen && (
              <FloatingPortal>
                <div 
                  ref={pickerRefs.setFloating}
                  style={{ ...pickerStyles, zIndex: 99999 }}
                  {...getPickerFloatingProps()}
                >
                  <ChromePicker 
                    color={task.color || '#3b82f6'} 
                    onChange={handleColorChange}
                    disableAlpha={false}
                  />
                </div>
              </FloatingPortal>
            )}
          </div>
          <button className="action-btn" onClick={moveTask} title="Move task">
            {moveIcon}
          </button>
          <button className="action-btn" onClick={() => deleteTask(task.id)} title="Delete task">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
