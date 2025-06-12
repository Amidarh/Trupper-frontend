"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { useState } from "react";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSubCategoryService } from "@/modules/categories/services/subCategoryServices";
import { useCategoryService } from "@/modules/categories/services/categoryServices";
import { CategoryTypes, } from "@/types/categories.types";
import { SubCategoryFormData } from "@/modules/categories/schema/categoriesSchema";
// import 

const CreateSubCategoryPage = () => {
    const { 
        form: {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
            setValue
        },
        createSubCategory,
    } = useSubCategoryService();
    const [isActive, setIsActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryTypes | undefined>(undefined); // Track selected category
    const { data: categories } = useCategoryService(); // Renamed for clarity

    // Handle form submission
    const onSubmit = async (data: SubCategoryFormData) => {
        try {
            await createSubCategory(data);
        } catch (error) {
            console.error("Error creating subcategory:", error);
        }
    };

    return (
        <DashboardLayout 
            pageTitle="Create a new subcategory"
            subHeading="Manage your subcategories here"
        >
            <Card className="p-4 mb-4">
                <CardContent className="p-0">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center mb-4">
                            <BackButton title="Categories" />
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create Subcategory"}
                            </Button>
                        </div>
                        <div>
                            {/* <div className="h-25 w-25 border rounded-sm"></div> */}
                        </div>

                        <Separator className="my-5"/>

                        <main className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                            <div className="mb-4">
                                <Label htmlFor="name" className="mb-2">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Subcategory name"
                                    className="h-12"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="category" className="mb-2">Category</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setSelectedCategory(categories?.find(cat => cat.id === value));
                                        setValue("userCategory", value, { shouldValidate: true });
                                    }}
                                    value={selectedCategory?.id || ""}
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
                                {errors.userCategory && (
                                    <p className="text-red-500 text-sm">{errors.userCategory.message}</p>
                                )}
                            </div>
                        </main>
                        <div>
                            <h1 className="text-xl">Status</h1>
                            <div className="flex flex-row items-center gap-2.5 mt-5">
                                <p className="text-sm">Active</p>
                                <Switch
                                    checked={isActive}
                                    onCheckedChange={(checked) => {
                                        setIsActive(checked);
                                        setValue("status", checked, { shouldValidate: true });
                                    }}
                                />
                            </div>
                            {errors.status && (
                                <p className="text-red-500 text-sm">{errors.status.message}</p>
                            )}
                        </div>
                        <Separator className="my-5"/>
                    </form>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
};

export default CreateSubCategoryPage;