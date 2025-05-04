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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger ,SelectScrollUpButton } from "@/components/ui/select";
import { DurationData } from "@/constants/data";

export const Settings = () => {
  return (
    <div>
        <Separator className="mt-3"/>
        <main className="grid grid-cols-2 gap-5 mt-4">
            <div>
                <h1 className="font-bold">Authentication Settings</h1>
                <div className="flex flex-row items-center gap-4 mt-2">
                    <p>Enable Signup</p>
                    <Switch/>
                </div>
            </div>
        </main>
        <Separator className="mt-3 mb-5"/>
        <h1 className="text-semibold text-gray-900 dark:text-gray-300">Sign up Settings</h1>
        <main className="grid grid-cols-2 gap-5 mt-4">
            <div>
                <Label htmlFor="email" className="mb-2">User Category</Label>
                <Select>
                    <SelectTrigger className="w-full h-10">
                        Exam Type
                    </SelectTrigger>
                    <SelectContent>
                        <SelectScrollUpButton />
                        <SelectGroup>
                            {DurationData.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="email" className="mb-2">Sub Category</Label>
                <Select>
                    <SelectTrigger className="w-full h-10">
                        Exam Type
                    </SelectTrigger>
                    <SelectContent>
                        <SelectScrollUpButton />
                        <SelectGroup>
                            {DurationData.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-row items-center gap-4 mt-2 justify-between">
                <p>Enable Signup With Code</p>
                <Switch/>
            </div>
        </main>
    </div>
  );
};
