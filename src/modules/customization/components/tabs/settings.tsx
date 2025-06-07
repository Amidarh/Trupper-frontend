import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { CategoryTypes } from "@/types/categories.types";
import { SubCategoryTypes } from "@/types/categories.types";
import { useCategoryService } from "@/modules/categories/services/categoryServices";
import { useSubCategoryService } from "@/modules/categories/services/subCategoryServices";
import { useAltStore } from "@/lib/zustand/userStore";
import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { CirclePlus } from "lucide-react";
// import { themeColors } from "@/constants/theme";
// import { 
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
//     TooltipProvider
// } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger , SelectValue } from "@/components/ui/select";
import { useCustomizationService } from "../../services";

export const Settings = () => {
    const organization = useAltStore(state => state.organization);
    const [ edit, setEdit ] = useState(false);
    const [ enableSignup, setEnableSignup ] = useState<boolean | undefined>(false);
    const [ enableSignupCode, setEnableSignupCode ] = useState<boolean>();
    const [selectedCategory, setSelectedCategory] = useState<CategoryTypes | undefined>(undefined);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryTypes | undefined>(undefined);
    const { data: categories, isLoading: categoryLoading } = useCategoryService();
    const { getSubCategoryByCategory, subCategory, singleSubCategoryLoading: subCategoryLoading } = useSubCategoryService();

    const {
        settingsForm: {
            reset,
            setValue,
            formState: { errors, isSubmitting },
            watch,
            handleSubmit
        },
        updateSettings
    } = useCustomizationService();

    const handleEditState = ()  => {
        setEdit(!edit)
    };

    useEffect(() => {
    if(organization) {
      reset({
        codeSignUp: organization.codeSignUp,
        enableSignUp: organization.enableSignup,
        defaultCategory: organization.defaultCategory,
        defaultSubCategory: organization.defaultSubCategory
      });
      console.log(organization.enableSignup)
      setEnableSignup(organization?.enableSignup);
      setEnableSignupCode(organization.codeSignUp);
      setSelectedCategory(categories?.find((category) => category.id === organization.defaultCategory))
    getSubCategoryByCategory(organization.defaultCategory)
    setSelectedSubCategory(subCategory?.find((category) => category.id === organization.defaultSubCategory))
    }
  }, []);

   const onSubmit = async (data: any) => {
      try{
        await updateSettings(data)
      } catch(error: any){
        toast.error(error?.message || "Failed to update Exam");
      }
    }
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Separator className="mt-3"/>
        <main className="gap-5 mt-4">
            <div className="flex flex-row items-center justify-between">
                <h1>Customize</h1>
                {edit ? (
                    <div className="flex flex-row gap-1.5">
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
                    <Button variant="destructive" onClick={handleEditState} disabled={isSubmitting}>Cancel</Button>
                    </div>
                ) : <Button onClick={handleEditState}>Edit</Button>}
                </div>
            <div>
                <div className="flex flex-row items-center gap-4 mt-2">
                    <p>Enable Signup</p>
                    <Switch
                        checked={enableSignup}
                        onCheckedChange={(checked) => {
                        setEnableSignup(checked);
                        setValue("enableSignUp", checked, { shouldValidate: true });
                        }}
                        disabled={!edit}
                    />
                    {errors.enableSignUp && <p className="text-red-500 text-sm">{errors.enableSignUp.message}</p>}
                </div>
            </div>
        </main>
        <Separator className="mt-3 mb-5"/>
        {enableSignup && <>
            <h1 className="text-semibold text-gray-900 dark:text-gray-300">Sign up Settings</h1>
             <div className="flex flex-row items-center gap-4 mt-2">
                <p>Enable Signup With Code</p>
                <Switch
                    checked={enableSignupCode}
                    onCheckedChange={(checked) => {
                    setEnableSignupCode(checked);
                    setValue("codeSignUp", checked, { shouldValidate: true });
                    }}
                    disabled={!edit}
                />
            </div>
           {!enableSignupCode && 
                <>
                    <Separator className="my-5"/>
                    <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                        <div>
                            <Label htmlFor="category" className="mb-2">Category</Label>
                            <Select
                                onValueChange={(value) => {
                                    const category = categories?.find((cat) => cat.id === value);
                                    setSelectedCategory(category);
                                    setSelectedSubCategory(undefined);
                                    setValue("defaultCategory", value, { shouldValidate: true });
                                    setValue("defaultSubCategory", "");
                                    getSubCategoryByCategory(value);
                                }}
                                value={selectedCategory?.id || ""}
                                disabled={categoryLoading || !categories?.length || !edit}
                            >
                                <SelectTrigger className="w-full h-12">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.defaultCategory && (
                                <p className="text-red-500 text-sm mt-1">{errors.defaultCategory.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="subCategory" className="mb-2">Sub Category</Label>
                            <Select
                                onValueChange={(value) => {
                                    const subCat = subCategory?.find((cat) => cat.id === value);
                                    setSelectedSubCategory(subCat);
                                    setValue("defaultSubCategory", value, { shouldValidate: true });
                                }}
                                value={selectedSubCategory?.id || ""}
                                disabled={subCategoryLoading || !subCategory?.length || !selectedCategory || !edit}
                            >
                                <SelectTrigger className="w-full h-12">
                                    <SelectValue
                                        placeholder={
                                            subCategoryLoading
                                                ? "Loading..."
                                                : !selectedCategory
                                                ? "Select a category first"
                                                : "Select Sub Category"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {subCategory?.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.defaultSubCategory && (
                                <p className="text-red-500 text-sm mt-1">{errors.defaultSubCategory.message}</p>
                            )}
                        </div>
                    </main>
                </>
            }
        </>}
    </form>
  );
};
