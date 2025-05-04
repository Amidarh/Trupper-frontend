import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { themeColors } from "@/constants/theme";
import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";

export const Preference = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1>Customize</h1>
        <Button>Save</Button>
      </div>
      <div  className="mt-4">
        <Separator/>
        <div className="mt-5">
          <div className="flex w-[150px] h-[150px] border rounded-sm"></div>
        </div>
        <Separator className="my-5" />
        <main className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2">
              Organization Name
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Category Name"
              className="h-12"
            />
          </div>
        </main>
        <main className="grid grid-cols-2 gap-5 mt-3">
          <div className="mb-4">
            <Label htmlFor="email" className="mb-2">
              Theme Color
            </Label>
            <div className="flex flex-row flex-wrap gap-1.5 mt-2">
              {themeColors.map((color, index) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                            key={index}
                            className={`size-8 rounded-sm cursor-pointer ${color.primary}`}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{color.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            <div className="mt-3">
              <Button>
                <CirclePlus />
                <p className="ml-2">Add Custom Color</p>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
