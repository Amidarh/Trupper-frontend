import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/core/commons/components/imageUpload";
import { useAltStore } from "@/lib/zustand/userStore";
import { toast } from "sonner";
// import { CirclePlus } from "lucide-react";
// import { themeColors } from "@/constants/theme";
// import { 
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
//     TooltipProvider
// } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useCustomizationService } from "../../services";
import { PreferenceFormData } from "../../schema";

export const Preference = () => {
  const organization = useAltStore(state => state.organization);
  const [ edit, setEdit ] = useState(false);

  const {
    preferenceForm: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
      reset
    },
    updatePreference
  } = useCustomizationService();

  const image = watch("image");

  const handleEditState = ()  => {
    setEdit(!edit)
  }

  useEffect(() => {
    if(organization) {
      reset({
        name: organization.name,
        image: organization.logo ?? "",
      })
    }
  }, []);

  const onSubmit = async (data: PreferenceFormData) => {
    try{
      const formData = new FormData();
       formData.append("name", data.name);
       formData.append("image", image ?? "");
      await updatePreference(formData)
    } catch(error: any){
      toast.error(error?.message || "Failed to update Exam");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center justify-between">
        <h1>Customize</h1>
        {edit ? (
          <div className="flex flex-row gap-1.5">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
            <Button variant="destructive" onClick={handleEditState} disabled={isSubmitting}>Cancel</Button>
          </div>
        ) : <Button onClick={handleEditState}>Edit</Button>}
      </div>
        <Separator  className="mt-4"/>
        <div className="mt-5">
          <ImageUpload
            value={image}
            onChange={(file) => {
              if (file) {
                console.log(file)
                setValue("image", file, { shouldValidate: true });
              }
            }}
            disabled={!edit}
            error={errors.image?.message as string}
          />
        </div>
        <Separator className="my-5" />
        <main className="grid sm:grid-cols-2 grid-cols-1 gap-5">
          <div className="mb-4">
            <Label className="mb-2">
              Organization Name
            </Label>
            <Input
              placeholder="Enter Organization Name"
              className="h-12"
              disabled={!edit || isSubmitting}
              { ...register("name") }
            />
             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
        </main>
        {/* <main className="grid grid-cols-2 gap-5 mt-3">
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
        </main> */}
      </form>
    </div>
  );
};
