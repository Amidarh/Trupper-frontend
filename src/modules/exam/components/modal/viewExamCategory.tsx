"use client"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState} from "react";
import { useParams } from "next/navigation";
import { EditExamCategoryFormData } from "../../schema/examCategory";
import { useExamService } from "../../services";
import { ExamCategoryType } from "@/types/examCategory.types";

export function ViewExamCategoryModal({ category }: { category: ExamCategoryType }) {
    const [ isActive, setIsActive ] = useState<boolean>(false)
    const { id } = useParams<{ id: string }>();
    const { 
        editExamCategory,
        editExamCategoryForm: {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
            setValue,
            reset
        },
        getAnExamCategory,
        examCategory,
        removeExamCategory,
        getExamCategories
    } = useExamService()

    useEffect(() => {
        getAnExamCategory(category.id)
    }, [])

    useEffect(() => {
        if(category.id && examCategory){
            reset({
                exam: id,
                name: category.name,
                status: category.status,
            })
            setIsActive(category.status || false)
        }
    }, [examCategory, category, category.id, id, reset])

    const handleCategory = async(data: EditExamCategoryFormData) => {
        try{
            await editExamCategory(category.id,{
                name: data.name,
                exam: id,
                status: isActive
            });
            await getExamCategories(id)
        } catch(error){
            console.log((error as Error).message)
        }
    };

    const handleDelete = async () => {
        try {
            await removeExamCategory(category.id);
            // Optionally, refresh the list or close the modal here if needed
        } catch (error) {
            console.error("Delete failed:", (error as Error).message);
        }
    };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div key={category.id} className={`flex justify-center items-center ${category.status ? "text-green-900 bg-green-200" : "text-red-900 bg-red-200"} px-4 py-2 text-sm  rounded-xl cursor-pointer hover:px-3.5 hover:py-1.5 duration-500`}>
            {category.name}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent >
        <div className="flex flex-row items-center justify-between">
            <h2>Exam category</h2>
            <AlertDialogCancel 
                className="border-none p-0 m-0 w-fit bg-transparent"
            >
                <XCircle/>
            </AlertDialogCancel>
        </div>
        <form onSubmit={handleSubmit(handleCategory)}>
            <div className="mb-4">
                <Label htmlFor="subjectToBeWritten" className="mb-2">
                    Category Name
                </Label>
                <Input
                    id="categoryName"
                    placeholder="Enter Category Name"
                    className="h-12"
                    { ...register("name") }
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
                <Label className="text-xl">Status</Label>
                <div className="flex flex-row gap-5 items-center">
                    <p className="text-sm">Active</p>
                    <Switch
                        checked={isActive}
                        onCheckedChange={(checked) => {
                            setIsActive(checked);
                            setValue("status", checked, { shouldValidate: true });
                        }}
                    />
                </div>
            </div>
            <div className="flex items-end justify-between mt-3">
                <Button
                    type="button"
                    onClick={handleDelete}
                    variant="destructive"
                    disabled={isSubmitting}
                >
                Delete
                </Button>
                <Button type="submit" disabled={isSubmitting}>Save</Button>
            </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}