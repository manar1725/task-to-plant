import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import sunflowerImg from "@/assets/sunflower.jpg";
import tomatoImg from "@/assets/tomato.jpg";
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
    description: "Bright and cheerful, grows tall with your achievements! Follows realistic stages: seed → sprout → seedling → budding → flowering → mature bloom.",
    image: sunflowerImg,
    difficulty: "Easy"
  },
  {
    id: "beet",
    name: "Garden Beet",
    type: "Root Vegetable",
    description: "Strong roots, steady growth! Realistic stages: seed → sprout → leaf growth → bulb formation → mature harvest.",
    image: roseImg, // Using rose image temporarily for beet
    difficulty: "Medium"
  },
  {
    id: "pumpkin",
    name: "Prize Pumpkin",
    type: "Vine",
    description: "Sprawling vines, big rewards! Follows natural stages: seed → sprout → vine growth → flowering → fruiting → full pumpkin.",
    image: tomatoImg, // Using tomato image temporarily for pumpkin
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

  const [selectedPlant, setSelectedPlant] = useState<string>("");

  const handleSelectChange = (plantId: string) => {
    setSelectedPlant(plantId);
    const plant = plantOptions.find(p => p.id === plantId);
    if (plant) {
      onPlantSelect(plant);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">Choose Your Plant Companion</h2>
        <p className="text-muted-foreground">
          Select a plant that will grow realistically with your productivity journey
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-4">
          <label htmlFor="plant-select" className="text-lg font-semibold block">
            Select Your Plant:
          </label>
          <select
            id="plant-select"
            value={selectedPlant}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="w-full p-3 border-2 border-primary/30 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="">-- Choose a Plant --</option>
            {plantOptions.map((plant) => (
              <option key={plant.id} value={plant.id}>
                {plant.name} - {plant.description.split('!')[0]}
              </option>
            ))}
          </select>

          {selectedPlant && (
            <div className="mt-6 p-4 bg-accent rounded-lg space-y-3 animate-fade-in">
              {plantOptions.filter(p => p.id === selectedPlant).map((plant) => (
                <div key={plant.id} className="space-y-2">
                  <div className="relative h-48 bg-gradient-to-b from-accent to-secondary rounded-lg overflow-hidden">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-primary">{plant.name}</h3>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(plant.difficulty)}>
                      {plant.difficulty}
                    </Badge>
                    <Badge variant="outline">{plant.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{plant.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};