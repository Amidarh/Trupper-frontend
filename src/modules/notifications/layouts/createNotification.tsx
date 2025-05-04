"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/core/commons/navigation/backButton";
import RichTextEditor from "@/core/commons/components/richTextEditor";
import { useState } from "react";
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const CreateNotifications = () => {
    const [ content, setContent ] = useState("")
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <BackButton title="Notifications"/>
                <div className="flex flex-row gap-2">
                    <Button variant="outline" className="border-amber-600 text-amber-600">Save</Button>
                    <Button>Send</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Separator/>
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                    <div>
                        <Label htmlFor="email" className="mb-2">Category</Label>
                        <Select>
                            <SelectTrigger className="w-full h-20" >
                                Exam Duration
                            </SelectTrigger>
                            <SelectContent>
                                {/* <SelectScrollUpButton /> */}
                                <SelectGroup>
                                <SelectItem value="Test Data">Test Data Tes Data</SelectItem>
                                <SelectItem value="Test Data">Test Data Tes Data</SelectItem>
                                <SelectItem value="Test Data">Test Data Tes Data</SelectItem>                                                    
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-2">Sub Category</Label>
                        <Select>
                            <SelectTrigger className="w-full h-20" >
                                Exam Duration
                            </SelectTrigger>
                            <SelectContent>
                                {/* <SelectScrollUpButton /> */}
                                <SelectGroup>
                                <SelectItem value="Test Data">Test Data Tes Data</SelectItem>
                                <SelectItem value="Test Data">Test Data Tes Data</SelectItem>
                                <SelectItem value="Test Data">Test Data Tes Data</SelectItem>                                                    
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </main>
                <Separator className="my-5"/>
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                    <div>
                        <Label htmlFor="email" className="mb-2">Title</Label>
                        <Input/>
                    </div>
                </main>
                <main className="mt-5">
                    <Label htmlFor="content" className="mb-2">Description</Label>
                    <RichTextEditor
                        content={content} 
                        onChange={() => console.log(content)}
                    />
                </main>
                <main className="mt-5">
                    <Label htmlFor="content" className="mb-2">Content</Label>
                    <RichTextEditor
                        content={content} 
                        onChange={() => console.log(content)}
                    />
                </main>
            </CardContent>
        </Card>
    )
}