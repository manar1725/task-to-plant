import { useState } from "react";
import { Menu, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PopupMenu = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-white border-2 border-gray-300 shadow-lg hover:bg-gray-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => setAboutOpen(true)}>
            <Info className="h-4 w-4 mr-2" />
            About
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setHowToPlayOpen(true)}>
            <HelpCircle className="h-4 w-4 mr-2" />
            How to Play
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* About Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              About Plant Productivity Garden
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-base leading-relaxed">
            Complete tasks to care for your plant! Each finished task provides water, sunlight, or nutrients. 
            Watch your plant grow from a tiny seed to full bloom as you become more productive.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* How to Play Dialog */}
      <Dialog open={howToPlayOpen} onOpenChange={setHowToPlayOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              How to Play
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Follow these simple steps to grow your virtual plant:
            </p>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
                Choose your plant companion from the selection screen
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
                Add tasks or pick from suggested chores
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
                Complete tasks to give your plant care (water, sunlight, nutrients)
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">4</span>
                Watch your plant grow through 5 stages: seed → sprout → leaves → mature → full bloom
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">5</span>
                Complete all tasks to see your plant reach its beautiful final form!
              </li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupMenu;