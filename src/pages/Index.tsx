import { useState } from "react";
import { PlantGarden } from "@/components/PlantGarden";
import { TaskManager, Task } from "@/components/TaskManager";
import { PlantSelection } from "@/components/PlantSelection";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Plant {
  id: string;
  name: string;
  type: string;
  image: string;
  growthStage: number;
}

const Index = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handlePlantSelect = (plantOption: any) => {
    const newPlant: Plant = {
      ...plantOption,
      growthStage: 0
    };
    setSelectedPlant(newPlant);
  };

  const handleTasksChange = (newTasks: Task[]) => {
    setTasks(newTasks);
    
    // Update plant growth based on completed tasks
    if (selectedPlant) {
      const completedTasks = newTasks.filter(task => task.completed).length;
      const totalTasks = newTasks.length;
      const growthStage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      
      setSelectedPlant(prev => prev ? { ...prev, growthStage } : null);
    }
  };

  const resetGarden = () => {
    setSelectedPlant(null);
    setTasks([]);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  if (!selectedPlant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 p-4">
        <div className="container mx-auto max-w-4xl py-8">
          <PlantSelection onPlantSelect={handlePlantSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            🌱 Plant Productivity Garden
          </h1>
          <p className="text-muted-foreground">
            Complete tasks to nurture your {selectedPlant.name} to full bloom!
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetGarden}
            className="mt-4"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <PlantGarden 
              plant={selectedPlant}
              tasksCompleted={completedTasks}
              totalTasks={totalTasks}
            />
          </div>
          
          <div className="space-y-6">
            <TaskManager 
              tasks={tasks}
              onTasksChange={handleTasksChange}
            />
          </div>
        </div>

        {completedTasks === totalTasks && totalTasks > 0 && (
          <div className="text-center mt-8 p-6 bg-gradient-to-r from-sunlight/20 to-primary/20 rounded-lg border border-primary/30">
            <h2 className="text-2xl font-bold text-primary mb-2">
              🎉 Congratulations! 
            </h2>
            <p className="text-muted-foreground">
              Your {selectedPlant.name} has reached full bloom! You've completed all your tasks for today.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;