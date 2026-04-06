import { Sidebar } from "./components/sidebar/Sidebar";
import { Schedule } from "./components/schedule/Schedule";
import { Notes } from "./components/notes/Notes";
import { ActivityHeatmap } from "./components/heatmap/ActivityHeatmap";
import { useStore } from "./hooks/useStore";

function App() {
  const store = useStore();
  const {
    tasks,
    timeBlocks,
    notes,
    selectedDate,
    addTask,
    toggleTask,
    deleteTask,
    duplicateTask,
    updateTask,
    updateTaskTitle,
    moveTaskToList,
    setDate,
    updateNote,
    updateTimeBlock,
    deleteTimeBlock,
    scheduleTask,
    unscheduleTask,
    reorderTasks,
  } = store;

  const currentNote = notes[selectedDate] || "";

  return (
    <div className="app-container">
        <div className="app-sidebar-column">
          <Sidebar
            tasks={tasks}
            timeBlocks={timeBlocks}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            duplicateTask={duplicateTask}
            updateTask={updateTask}
            updateTaskTitle={updateTaskTitle}
            moveTaskToList={moveTaskToList}
            reorderTasks={reorderTasks}
            selectedDate={selectedDate}
          />
        </div>

        <Schedule
          selectedDate={selectedDate}
          timeBlocks={timeBlocks}
          tasks={tasks}
          deleteTimeBlock={deleteTimeBlock}
          updateTimeBlock={updateTimeBlock}
          setDate={setDate}
          scheduleTask={scheduleTask}
          unscheduleTask={unscheduleTask}
        />

        <div className="app-notes-column">
          <Notes
            date={selectedDate}
            note={currentNote}
            updateNote={updateNote}
          />
          <ActivityHeatmap tasks={tasks} />
        </div>
      </div>
  );
}

export default App;
