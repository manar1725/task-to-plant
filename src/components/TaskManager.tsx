import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskManagerProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
}

export const TaskManager = ({ tasks, onTasksChange }: TaskManagerProps) => {
  const [newTaskText, setNewTaskText] = useState("");
  const { toast } = useToast();

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        text: newTaskText.trim(),
        completed: false
      };
      onTasksChange([...tasks, newTask]);
      setNewTaskText("");
      toast({
        title: "Task added! 🌱",
        description: "Your plant is excited to grow!",
      });
    }
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const wasCompleted = task.completed;
        const newCompleted = !task.completed;
        
        if (!wasCompleted && newCompleted) {
          toast({
            title: "Task completed! 🎉",
            description: "Your plant just got some love!",
          });
        }
        
        return { ...task, completed: newCompleted };
      }
      return task;
    });
    onTasksChange(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    onTasksChange(tasks.filter(task => task.id !== taskId));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Daily Tasks</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4" />
            {completedTasks}/{totalTasks}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
              style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {totalTasks > 0 && completedTasks === totalTasks 
              ? "All tasks complete! Your plant is blooming! 🌸" 
              : `${completedTasks} of ${totalTasks} tasks completed`
            }
          </p>
        </div>

        {/* Add new task */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1"
          />
          <Button onClick={addTask} size="sm" className="shrink-0">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Task list */}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No tasks yet! Add some tasks to start growing your plant.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                  task.completed
                    ? 'bg-accent/30 border-primary/30 animate-task-complete'
                    : 'bg-card hover:bg-accent/10'
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="shrink-0"
                />
                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? 'line-through text-muted-foreground'
                      : 'text-foreground'
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};