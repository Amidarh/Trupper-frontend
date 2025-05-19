"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCategoryService } from "@/modules/categories/services/categoryServices";
import { useState } from "react";

const CreateCategoryPage = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    },
    createCategory,
    serverError,
  } = useCategoryService();

  const [isActive, setIsActive] = useState(false); // Local state to manage Switch

  return (
    <DashboardLayout
      pageTitle="Create a new category"
      subHeading="Manage your categories here"
    >
      <Card className="p-4 mb-4">
        <form className="p-0" onSubmit={handleSubmit(createCategory)}>
          <div className="flex justify-between items-center mb-4">
            <BackButton title="Categories" />
            {isSubmitting ? 
                <Button>Creating...</Button> :
                <Button type="submit">Create Category</Button>
            }
          </div>
          <div>
            <div className="h-25 w-25 border rounded-sm"></div>
          </div>

          <Separator className="my-5" />

          <main className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div className="mb-4">
              <Label className="mb-2">Name</Label>
              <Input
                placeholder="Enter Category name"
                className="h-12"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </main>
          <div>
            <h1 className="text-xl">Status</h1>
            <div className="flex flex-row items-center gap-2.5 mt-5">
              <p className="text-sm">Active</p>
              <Switch
                checked={isActive} // Control Switch with local state
                onCheckedChange={(checked) => {
                  setIsActive(checked); // Update local state
                  setValue("status", checked, { shouldValidate: true }); // Update form state with boolean
                }}
              />
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <Separator className="my-5" />
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default CreateCategoryPage;