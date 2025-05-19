"use client"

import AppSidebar from "../sidebar";
// import ModeToggle from "../theme";
import { Bell } from "lucide-react";
import { useLogout } from "@/hooks/auth/logOut";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenuSubTrigger, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { MobileSidebar } from "../sidebar/mobileSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useAltStore } from "@/lib/zustand/userStore";

export default function NavBar ({ title, subHeading }: { title: string, subHeading?: string }) {
    const { setTheme } = useTheme();
    const user = useAltStore(state => state.user);
    const organization = useAltStore(state => state.organization);
    const { isLoading, logout, serverError } = useLogout()

    return (
        <nav 
            className="h-14 border-b flex justify-between items-center w-full px-4 fixed z-1 backdrop-blur-md"
        >
            <AppSidebar userRole={(user?.role?.toUpperCase() as any) || null}/>
           <main className="flex justify-between items-center w-full relative backdrop-blur-md max-lg:hidden">
                <div className="relative -left-2">
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p className="text-[12px] text-gray-600 dark:text-gray-300">{subHeading}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Bell className="cursor-pointer"/>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                            <AvatarFallback>{user?.firstName?.slice(0,1)}{user?.lastName?.slice(0,1)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className="border-b p-1 w-full min-w-[180px]">
                            <div className="flex flex-col text-sm">
                                <span className="font-medium">{user?.firstName}</span>
                                <span className="text-xs text-muted-foreground">{user?.email}</span>
                            </div>
                            </div>
                            <DropdownMenuItem>
                                <Link href="/dashboard/settings">Setting</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                                </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            {isLoading ? <DropdownMenuItem className="bg-red-400"
                            >
                                logging out...
                            </DropdownMenuItem> :
                            <DropdownMenuItem className="bg-red-400 cursor-pointer"
                                onClick={() => logout()}
                            >
                                logout
                            </DropdownMenuItem>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
           </main>

           {/* Mobile Navigation */}
           <main
            className="w-full justify-between items-center flex flex-row lg:hidden"
           >
                <MobileSidebar userRole={(user?.role)?.toUpperCase as any || null}/>
                <h1 className="text-xl">{organization?.name}</h1>
                <Bell className="cursor-pointer"/>
           </main>
        </nav>
    )
}