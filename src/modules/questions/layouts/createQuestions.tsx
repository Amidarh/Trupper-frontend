"use client";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/core/commons/navigation/backButton";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichTextEditor from "@/core/commons/components/richTextEditor";
import ImageUploadTwo from "@/core/commons/components/imageUpload/imageUploadTwo";

import { useExamService } from "@/modules/exam/services";
import { useSubjectService } from "@/modules/subjects/services";
import { useQuestionService } from "../services";

import { toast } from "sonner";
import { questionTypeData, questionObject } from "@/constants/question";
import { QuestionFormData } from "../schemas";
import { ExamType } from "@/types/exam.types";
import { SubjectType } from "@/types/subject.types";

export const CreateQuestion = () => {
  const [selectedExam, setSelectedExam] = useState<ExamType | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | undefined>(undefined);
  const [selectedQuestionType, setSelectedQuestionType] = useState<{ name: string; label: string } | undefined>(undefined);
  const [selectedAnswer, setSelectedAnswer] = useState<{ name: string; label: string } | undefined>(undefined);

  const {
    form: {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
      watch,
    },
    createQuestion,
    serverError,
  } = useQuestionService();
  const image = watch("image");

  const section = watch("section");
  const question = watch("question");
  const a = watch("a");
  const b = watch("b");
  const c = watch("c");
  const d = watch("d");
  const reason = watch("reason");

  const { data: exams, isLoading: examLoading } = useExamService();
  const { getSubjectByExam, subjectList, subjectListLoading } = useSubjectService();

  const onSubmit = useCallback(
    async (data: QuestionFormData) => {
      try {
         if (!image) {
            toast.error("Please select an image");
            return;
        }
        const formData = new FormData();
        formData.append("exam", data.exam);
        formData.append("subject", data.subject);
        formData.append("questionType", data.questionType);
        formData.append("answer", data.answer);
        formData.append("section", data.section);
        formData.append("question", data.question);
        formData.append("a", data.a);
        formData.append("b", data.b);
        formData.append("c", data.c);
        formData.append("d", data.d);
        formData.append("reason", data.reason);
        formData.append("image", image);
        await createQuestion(formData);
      } catch (error: any) {
        console.error("Failed to create question:", error);
        toast.error(serverError || "Failed to create question");
      }
    },
    [createQuestion, serverError]
  );

  return (
    <Card>
      <form className="py-0 px-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center justify-between">
          <BackButton title="Questions" />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding Question..." : "Add Question"}
          </Button>
        </div>

        <Separator className="my-5" />

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Exam Select */}
          <div>
            <Label className="mb-2">Exam</Label>
            <Select
              onValueChange={(value) => {
                const exam = exams?.find((e) => e.id === value);
                setSelectedExam(exam);
                getSubjectByExam(exam?.id);
                setValue("exam", value, { shouldValidate: true });
              }}
              value={selectedExam?.id || ""}
              disabled={examLoading || !exams?.length}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder={examLoading ? "Loading..." : "Select exam"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {exams?.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.exam && <p className="text-red-500 text-sm">{errors.exam.message}</p>}
          </div>

          {/* Subject Select */}
          <div>
            <Label className="mb-2">Subject</Label>
            <Select
              onValueChange={(value) => {
                const subject = subjectList?.find((s) => s.id === value);
                setSelectedSubject(subject);
                setValue("subject", value, { shouldValidate: true });
              }}
              value={selectedSubject?.id || ""}
              disabled={subjectListLoading || !subjectList?.length}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subjectList?.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
          </div>

          {/* Question Type */}
          <div>
            <Label className="mb-2">Question Type</Label>
            <Select
              onValueChange={(value) => {
                const type = questionTypeData?.find((q) => q.name === value);
                setSelectedQuestionType(type);
                setValue("questionType", value, { shouldValidate: true });
              }}
              value={selectedQuestionType?.name || ""}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {questionTypeData?.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.questionType && <p className="text-red-500 text-sm">{errors.questionType.message}</p>}
          </div>

          {/* Answer */}
          <div>
            <Label className="mb-2">Answer</Label>
            <Select
              onValueChange={(value) => {
                const answer = questionObject?.find((a) => a.name === value);
                setSelectedAnswer(answer);
                setValue("answer", value, { shouldValidate: true });
              }}
              value={selectedAnswer?.name || ""}
            >
              <SelectTrigger className="w-full h-20">
                <SelectValue placeholder="Select answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {questionObject?.map((a) => (
                    <SelectItem key={a.name} value={a.name}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.answer && <p className="text-red-500 text-sm">{errors.answer.message}</p>}
          </div>
        </main>

        <Separator className="my-5" />

        {/* Rich Text Fields */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="mb-4">
            <Label className="mb-2">Section</Label>
            <RichTextEditor content={section} onChange={(e) => setValue("section", e, { shouldValidate: true })} />
            {errors.section && <p className="text-red-500 text-sm">{errors.section.message}</p>}
            </div>

            <div className="mb-4">
                <ImageUploadTwo
                    value={image}
                    onChange={(file) => {
                    if (file) {
                        setValue("image", file, { shouldValidate: true });
                    }
                    }}
                    error={errors.image?.message}
                />
            </div>
        </main>

        <div className="mb-4">
          <Label className="mb-2">Question</Label>
          <RichTextEditor content={question} onChange={(e) => setValue("question", e, { shouldValidate: true })} />
          {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <Label className="mb-2">Option A</Label>
            <RichTextEditor content={a} onChange={(e) => setValue("a", e, { shouldValidate: true })} />
            {errors.a && <p className="text-red-500 text-sm">{errors.a.message}</p>}
          </div>

          <div>
            <Label className="mb-2">Option B</Label>
            <RichTextEditor content={b} onChange={(e) => setValue("b", e, { shouldValidate: true })} />
            {errors.b && <p className="text-red-500 text-sm">{errors.b.message}</p>}
          </div>

          <div>
            <Label className="mb-2">Option C</Label>
            <RichTextEditor content={c} onChange={(e) => setValue("c", e, { shouldValidate: true })} />
            {errors.c && <p className="text-red-500 text-sm">{errors.c.message}</p>}
          </div>

          <div>
            <Label className="mb-2">Option D</Label>
            <RichTextEditor content={d} onChange={(e) => setValue("d", e, { shouldValidate: true })} />
            {errors.d && <p className="text-red-500 text-sm">{errors.d.message}</p>}
          </div>

          <div>
            <Label className="mb-2">Reason</Label>
            <RichTextEditor content={reason} onChange={(e) => setValue("reason", e, { shouldValidate: true })} />
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
          </div>
        </main>
      </form>
    </Card>
  );
};
