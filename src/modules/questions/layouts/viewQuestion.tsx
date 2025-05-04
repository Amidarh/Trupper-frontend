"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import RichTextEditor from "@/core/commons/components/richTextEditor";
import { 
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const ViewQuestion = () => {
    const [content, setContent] = useState("");
    const [post, setPost] = useState("");

    const onChange = (content: string) => {
      setPost(content);
      console.log(content);
    };
    return (
        <Card>
            <CardHeader className="px-3">
                <div className="flex flex-row items-center justify-between">
                    <BackButton title="Questions"/>
                    <div className="flex flex-row gap-2 items-center">
                        <Button variant="destructive">Delete</Button>
                        <Button>Edit</Button>
                    </div>
                </div>
                <Separator className="my-5"/>
            </CardHeader>
            <CardContent className="py-0 px-4">
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                        <Label htmlFor="email" className="mb-2">Exam</Label>
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
                        <Label htmlFor="email" className="mb-2">Subject</Label>
                        <Select>
                            <SelectTrigger className="w-full h-20" >
                                Subject
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
                        <Label htmlFor="email" className="mb-2">Question Type</Label>
                        <Select>
                            <SelectTrigger className="w-full h-20" >
                                Question Type
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
                        <Label htmlFor="email" className="mb-2">Answer</Label>
                        <Select>
                            <SelectTrigger className="w-full h-20" >
                                Question Type
                            </SelectTrigger>
                            <SelectContent>
                                {/* <SelectScrollUpButton /> */}
                                <SelectGroup>
                                <SelectItem value="Test Data">A</SelectItem>
                                <SelectItem value="Test Data">B</SelectItem>
                                <SelectItem value="Test Data">C</SelectItem>                                                    
                                <SelectItem value="Test Data">D</SelectItem>                                                    
                                <SelectItem value="Test Data">E</SelectItem>                                                    
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </main>
                <Separator className="my-5"/>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Section</Label>
                        <Textarea/>
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-2">Image</Label>
                        <div className="bg-gray-800 rounded-sm h-20">
                            
                        </div>
                    </div>
                </main>
                <div className="mb-4">
                    <Label htmlFor="email" className="mb-2">Question</Label>
                    <RichTextEditor content={post} onChange={onChange} />
                </div>
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Option A</Label>
                        <RichTextEditor content={post} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Option B</Label>
                        <RichTextEditor content={post} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Option C</Label>
                        <RichTextEditor content={post} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Option D</Label>
                        <RichTextEditor content={post} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Option E</Label>
                        <RichTextEditor content={post} onChange={onChange} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" className="mb-2">Reason</Label>
                        <RichTextEditor content={post} onChange={onChange} />
                    </div>
                    <div>
                        <Label htmlFor="email" className="mb-2">Question Type</Label>
                        <Input type="number"/>
                    </div>
                </main>
            </CardContent>
        </Card>
    )
}