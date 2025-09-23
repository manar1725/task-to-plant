import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import sunflowerImg from "@/assets/sunflower.jpg";
import tomatoImg from "@/assets/tomato.jpg";
import basilImg from "@/assets/basil.jpg";
import roseImg from "@/assets/rose.jpg";

interface PlantOption {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface PlantSelectionProps {
  onPlantSelect: (plant: PlantOption) => void;
}

const plantOptions: PlantOption[] = [
  {
    id: "sunflower",
    name: "Sunny Sunflower",
    type: "Flower",
    description: "Bright and cheerful, grows tall with your achievements!",
    image: sunflowerImg,
    difficulty: "Easy"
  },
  {
    id: "tomato",
    name: "Cherry Tomato",
    type: "Vegetable",
    description: "Produces sweet rewards as you complete tasks!",
    image: tomatoImg,
    difficulty: "Medium"
  },
  {
    id: "basil",
    name: "Sweet Basil",
    type: "Herb",
    description: "Aromatic and useful, perfect for steady productivity!",
    image: basilImg,
    difficulty: "Easy"
  },
  {
    id: "rose",
    name: "Garden Rose",
    type: "Flower",
    description: "Elegant and beautiful, blooms magnificently when nurtured!",
    image: roseImg,
    difficulty: "Hard"
  }
];

export const PlantSelection = ({ onPlantSelect }: PlantSelectionProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-accent text-accent-foreground";
      case "Medium": return "bg-sunlight text-primary";
      case "Hard": return "bg-primary text-primary-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Choose Your Plant Companion</h2>
        <p className="text-muted-foreground">
          Select a plant that will grow with your productivity journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plantOptions.map((plant) => (
          <Card key={plant.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="space-y-4">
              <div className="relative h-32 bg-gradient-to-b from-accent to-secondary rounded-lg overflow-hidden">
                <img 
                  src={plant.image} 
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{plant.name}</h3>
                  <Badge className={getDifficultyColor(plant.difficulty)}>
                    {plant.difficulty}
                  </Badge>
                </div>
                
                <Badge variant="outline" className="w-fit">
                  {plant.type}
                </Badge>
                
                <p className="text-sm text-muted-foreground">
                  {plant.description}
                </p>
                
                <Button 
                  onClick={() => onPlantSelect(plant)}
                  className="w-full mt-4"
                >
                  Choose {plant.name}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};