"use client";

import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
    data: EnrolledCourseType;
}

export function CourseProgressCard({ data }: iAppProps) {
    const thumbnailUrl = useConstructUrl(data.course.fileKey);
    const { totalLessons, completedLessons, progressPercentate } = useCourseProgress({courseData: data.course});
    return (
        <Card className="group relative py-0 gap-0">
            <Badge className="absolute top-2 right-2 z-10">{data.course.level}</Badge>

            <Image
                src={thumbnailUrl}
                alt={data.course.title}
                width={600}
                height={400}
                className="w-full rounded-t-xl aspect-video h-full object-cover"
            />

            <CardContent className="p-4">
                <Link href={`/dashboard/${data.course.slug}`} className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors">
                    {data.course.title}
                </Link>
                <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
                    {data.course.smallDescription}
                </p>

                <div className="space-y-4">
                    <div>
                        <p>Progress:</p>
                        <p className="font-medium">{progressPercentate}%</p>
                    </div>
                </div>

                <Link href={`/dashboard/${data.course.slug}`} className={buttonVariants({ className: "w-full mt-4" })}>
                    Learn More
                </Link>
            </CardContent>
        </Card>
    )
}