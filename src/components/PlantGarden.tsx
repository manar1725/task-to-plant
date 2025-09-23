import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Sun, Leaf } from "lucide-react";

interface Plant {
  id: string;
  name: string;
  type: string;
  image: string;
  growthStage: number; // 0-100
}

interface PlantGardenProps {
  plant: Plant | null;
  tasksCompleted: number;
  totalTasks: number;
}

export const PlantGarden = ({ plant, tasksCompleted, totalTasks }: PlantGardenProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const previousCompleted = useState(tasksCompleted)[0];

  useEffect(() => {
    if (tasksCompleted > previousCompleted) {
      setShouldAnimate(true);
      setTimeout(() => setShouldAnimate(false), 800);
    }
  }, [tasksCompleted, previousCompleted]);

  if (!plant) {
    return (
      <Card className="flex items-center justify-center h-80 bg-gradient-to-b from-accent to-secondary border-2 border-dashed border-muted-foreground/30">
        <div className="text-center space-y-2">
          <Leaf className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="text-muted-foreground">Choose a plant to start growing!</p>
        </div>
      </Card>
    );
  }

  const waterLevel = Math.min((tasksCompleted / totalTasks) * 100, 100);
  const sunlightLevel = Math.min(((tasksCompleted * 1.2) / totalTasks) * 100, 100);
  const nutrientLevel = Math.min(((tasksCompleted * 0.8) / totalTasks) * 100, 100);
  
  const isFullyGrown = tasksCompleted >= totalTasks && totalTasks > 0;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-b from-background to-accent/20">
        <div className="text-center space-y-4">
          <div className="relative">
            <div 
              className={`mx-auto w-48 h-48 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 flex items-end justify-center overflow-hidden relative ${
                shouldAnimate ? 'animate-plant-grow' : ''
              } ${isFullyGrown ? 'animate-gentle-float' : ''}`}
              style={{
                boxShadow: 'var(--shadow-soft), inset 0 -20px 40px -20px hsl(40 30% 80%)'
              }}
            >
              {/* Soil base */}
              <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-full"></div>
              
              {/* Growth stages */}
              <div className="relative w-full h-full flex items-end justify-center pb-8">
                {/* Seed stage (0-10%) */}
                {plant.growthStage >= 0 && (
                  <div className="absolute bottom-2 w-2 h-2 bg-amber-900 rounded-full"></div>
                )}
                
                {/* Sprout stage (10-30%) */}
                {plant.growthStage >= 10 && (
                  <div className="absolute bottom-4 w-1 bg-green-600 rounded-t-full transition-all duration-1000"
                       style={{ height: `${Math.min((plant.growthStage - 10) / 20 * 20, 20)}px` }}>
                  </div>
                )}
                
                {/* Small plant with leaves (30-60%) */}
                {plant.growthStage >= 30 && (
                  <div className="absolute bottom-4 flex flex-col items-center">
                    <div className="w-2 bg-green-600 rounded-t-full transition-all duration-1000"
                         style={{ height: `${Math.min((plant.growthStage - 30) / 30 * 40, 40)}px` }}>
                    </div>
                    <div className="absolute top-2 flex gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full -rotate-12"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full rotate-12"></div>
                    </div>
                  </div>
                )}
                
                {/* Mature plant (60-90%) */}
                {plant.growthStage >= 60 && (
                  <div className="absolute bottom-4 flex flex-col items-center">
                    <div className="w-3 bg-green-700 rounded-t-full transition-all duration-1000"
                         style={{ height: `${Math.min((plant.growthStage - 60) / 30 * 60, 60)}px` }}>
                    </div>
                    <div className="absolute top-1 flex gap-2">
                      <div className="w-3 h-4 bg-green-500 rounded-full -rotate-45 -translate-x-1"></div>
                      <div className="w-3 h-4 bg-green-500 rounded-full rotate-45 translate-x-1"></div>
                    </div>
                    <div className="absolute top-4 flex gap-3">
                      <div className="w-2 h-3 bg-green-400 rounded-full -rotate-30"></div>
                      <div className="w-2 h-3 bg-green-400 rounded-full rotate-30"></div>
                    </div>
                  </div>
                )}
                
                {/* Full bloom with final plant image (90-100%) */}
                {plant.growthStage >= 90 && (
                  <div className="absolute bottom-0 w-full h-full flex items-end justify-center pb-8 transition-all duration-1000"
                       style={{ opacity: (plant.growthStage - 90) / 10 }}>
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              {isFullyGrown && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-sunlight rounded-full animate-sparkle"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-primary">{plant.name}</h3>
            <Badge variant="secondary" className="text-sm">
              {plant.type}
            </Badge>
            {isFullyGrown && (
              <Badge className="bg-gradient-to-r from-sunlight to-primary text-primary-foreground animate-gentle-float">
                🌟 In Full Bloom!
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Plant Care Status */}
      <Card className="p-4">
        <h4 className="font-semibold mb-4 text-center">Plant Care Status</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <Droplets className="w-6 h-6 mx-auto text-water" />
            <div className="text-sm text-muted-foreground">Water</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-water h-2 rounded-full transition-all duration-500"
                style={{ width: `${waterLevel}%` }}
              />
            </div>
            <div className="text-xs font-medium">{Math.round(waterLevel)}%</div>
          </div>
          
          <div className="text-center space-y-2">
            <Sun className="w-6 h-6 mx-auto text-sunlight" />
            <div className="text-sm text-muted-foreground">Sunlight</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-sunlight h-2 rounded-full transition-all duration-500"
                style={{ width: `${sunlightLevel}%` }}
              />
            </div>
            <div className="text-xs font-medium">{Math.round(sunlightLevel)}%</div>
          </div>
          
          <div className="text-center space-y-2">
            <Leaf className="w-6 h-6 mx-auto text-nutrients" />
            <div className="text-sm text-muted-foreground">Nutrients</div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-nutrients h-2 rounded-full transition-all duration-500"
                style={{ width: `${nutrientLevel}%` }}
              />
            </div>
            <div className="text-xs font-medium">{Math.round(nutrientLevel)}%</div>
          </div>
        </div>
      </Card>
    </div>
  );
};