"use client"
import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAdminService } from "@/modules/subAdmin/services";

const CreateSubAdmin = () => {
    const {
        form: {
            register,
            handleSubmit,
            formState: { errors, isSubmitting }
        },
        addAdmin,
     } = useAdminService();
    return (
        <DashboardLayout
            pageTitle="Add Sub Admin"
            subHeading="Add Sub Admin for this Application"
        >  
            <Card>
                <form onSubmit={handleSubmit(addAdmin)}>
                <CardHeader className="px-3 flex flex-row items-center justify-between">
                    <BackButton title="Sub Admins"/>
                    {isSubmitting ? <Button>Creating Account</Button> :
                    <Button type="submit">Create Account</Button>}
                </CardHeader>
                <Separator className="mt-4"/>
                    <main 
                        className="grid sm:grid-cols-2 grid-cols-1 gap-5 p-4"
                        >
                        <div className="mb-4">
                            <Label htmlFor="firstName" className="mb-2">First Name</Label>
                            <Input
                                type="firstName" id="firstName" placeholder="Enter First Name" className="h-12"
                                { ...register("firstName") }
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="lastName" className="mb-2">Last Name</Label>
                            <Input type="lastName" id="lastName" placeholder="Enter Last Name" className="h-12"
                            { ...register("lastName") }
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="mb-2">Email</Label>
                            <Input type="email" id="email" placeholder="Enter email address" className="h-12" 
                            { ...register("email") }
                            />
                             {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                    </main>

                    <Separator/>
                    <main className="mt-4 px-4">
                        <h1 className="text-xl">Permissions</h1>

                        <section className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Users</p>
                                <Switch/>
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Categories</p>
                                <Switch />
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Exam Type</p>
                                <Switch />
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Exam</p>
                                <Switch />
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Subjects</p>
                                <Switch />
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Questions</p>
                                <Switch />
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Notifications</p>
                                <Switch />
                            </div>
                            <div className="flex flex-row gap-3 items-center mt-4 justify-between">
                                <p>Newsletters</p>
                                <Switch />
                            </div>
                        </section>
                    </main>
                </form>
            </Card>
        </DashboardLayout>
    )
}

export default CreateSubAdmin;