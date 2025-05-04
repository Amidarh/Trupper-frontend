import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const SecuritySettings = () => {
    return (
        <section>
            <div className="flex flex-row items-center justify-between">
                <h1 className="font-bold">Update Your password</h1>
                <Button>Update</Button>
            </div>
            <Separator className="my-5"/>
            <main 
                className="grid sm:grid-cols-2 grid-cols-1 gap-5"
            >
                <div className="mb-4">
                    <Label htmlFor="email" className="mb-2">Current Password</Label>
                    <Input type="password" id="email" placeholder="Enter Old Password" className="h-12" />
                </div>
            </main>
            <main 
                className="grid sm:grid-cols-2 grid-cols-1 gap-5"
            >
                <div className="mb-4">
                    <Label htmlFor="FullName" className="mb-2">New Password</Label>
                    <Input type="password" id="fullName" placeholder="Enter new Password" className="h-12" />
                </div>
                <div className="mb-4">
                    <Label htmlFor="email" className="mb-2">Confirm New Password</Label>
                    <Input type="password" id="email" placeholder="Confirm New Password" className="h-12" />
                </div>
            </main>
            <Separator className="my-5"/>
            <main className="flex flex-row items-center justify-between">
                <p>Change your account email</p>
                <Button>Change</Button>
            </main>
            <Separator className="my-5"/>
            <main className="flex flex-row items-center justify-between">
                <p>Enable 2fa for your account</p>
                <Button>Enable</Button>
            </main>
            <Separator className="my-5"/>
            <main className="flex flex-row items-center justify-between">
                <p>logout every device</p>
                <Button variant="destructive">Logout</Button>
            </main>
        </section>
    )
}