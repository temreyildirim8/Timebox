import { useState, useCallback, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { format } from 'date-fns';
import { db } from '../db/db';
import type { Task, TimeBlock } from '../types';

export function useStore() {
  const [selectedDate, setSelectedDate] = useState(() => format(new Date(), 'yyyy-MM-dd'));

  // Reactive data from Dexie
  const tasks = useLiveQuery(() => db.tasks.toArray(), []) || [];
  const timeBlocks = useLiveQuery(() => db.timeBlocks.toArray(), []) || [];
  const notesArray = useLiveQuery(() => db.notes.toArray(), []) || [];

  // Convert notes array to record for backward compatibility
  const notes = useMemo(() => {
    return notesArray.reduce((acc, note) => {
      acc[note.date] = note.content;
      return acc;
    }, {} as Record<string, string>);
  }, [notesArray]);

  const addTask = useCallback(async (title: string, list: 'today' | 'later') => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      completed: false,
      list,
      createdAt: new Date().toISOString(),
      date: list === 'today' ? selectedDate : undefined,
    };
    await db.tasks.add(newTask);
  }, [selectedDate]);

  const toggleTask = useCallback(async (id: string) => {
    const task = await db.tasks.get(id);
    if (task) {
      await db.tasks.update(id, { completed: !task.completed });
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await db.transaction('rw', db.tasks, db.timeBlocks, async () => {
      await db.tasks.delete(id);
      await db.timeBlocks.where('taskId').equals(id).delete();
    });
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    await db.transaction('rw', db.tasks, db.timeBlocks, async () => {
      await db.tasks.update(id, updates);
      if (updates.color) {
        await db.timeBlocks.where('taskId').equals(id).modify({ color: updates.color });
      }
    });
  }, []);

  const updateTaskTitle = useCallback(async (id: string, title: string) => {
    await db.tasks.update(id, { title });
  }, []);

  const moveTaskToList = useCallback(async (id: string, list: 'today' | 'later') => {
    const date = list === 'today' ? selectedDate : undefined;
    await db.transaction('rw', db.tasks, db.timeBlocks, async () => {
      await db.tasks.update(id, { list, date });
      if (list === 'later') {
        await db.timeBlocks.where('taskId').equals(id).delete();
      }
    });
  }, [selectedDate]);

  const scheduleTask = useCallback(async (taskId: string, startTime: string, durationMinutes: number = 20) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationMinutes * 60000);
    const dateStr = format(start, 'yyyy-MM-dd');
    
    await db.transaction('rw', db.tasks, db.timeBlocks, async () => {
      const task = await db.tasks.get(taskId);
      if (!task) return;

      await db.tasks.update(taskId, { list: 'today', date: dateStr });

      const newBlock: TimeBlock = {
        id: Math.random().toString(36).substr(2, 9),
        taskId: taskId,
        title: task.title,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        color: task.color || 'var(--accent)',
      };

      await db.timeBlocks.where('taskId').equals(taskId).delete();
      await db.timeBlocks.add(newBlock);
    });
  }, []);

  const unscheduleTask = useCallback(async (taskId: string) => {
    await db.timeBlocks.where('taskId').equals(taskId).delete();
  }, []);

  const setDate = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const updateNote = useCallback(async (date: string, content: string) => {
    await db.notes.put({ date, content });
  }, []);

  const updateTimeBlock = useCallback(async (id: string, updates: Partial<TimeBlock>) => {
    await db.timeBlocks.update(id, updates);
  }, []);

  const deleteTimeBlock = useCallback(async (id: string) => {
    await db.timeBlocks.delete(id);
  }, []);

  return {
    tasks,
    timeBlocks,
    notes,
    selectedDate,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    updateTaskTitle,
    moveTaskToList,
    setDate,
    updateNote,
    updateTimeBlock,
    deleteTimeBlock,
    scheduleTask,
    unscheduleTask,
  };
}
