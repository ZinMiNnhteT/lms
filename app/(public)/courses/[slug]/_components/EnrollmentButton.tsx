"use client";

import { Button } from "@/components/ui/button";
import { CourseSchemaType } from "@/lib/zodSchemas";
import { startTransition, useTransition } from "react";
import { enrollInCourseAction } from "../actions";
import { toast } from "sonner";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2 } from "lucide-react";

export function EnrollmentButton({courseId}: {courseId: string}) {
const [pending, startTransition] = useTransition();

    function onSubmit() {
        startTransition(async () => {
            const { data:result, error } = await tryCatch(enrollInCourseAction(courseId));

            if(error) {
                toast.error("An unexpect error occurred. Please try again.");
                return;
            }

            if(result.status === "success") {
                toast.success(result.message)
            } else if(result.status === "error") {
                toast.error(result.message);
            }
        });
    }

    return (
        <Button onClick={onSubmit} disabled={pending} className="w-full">
            {pending ? (
                <>
                <Loader2 className="size-4 animate-spin" />
                Loading...
                </>
            ): (
                "Enroll Now!"
            )}
        </Button>
    );
}