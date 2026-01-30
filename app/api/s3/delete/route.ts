import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { error } from "console";
import { NextResponse } from "next/server";
import { env } from "process";

export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        const key = body.key;

        if(!key) {
            return NextResponse.json(
                { error: "Missiong or invalid object key" },
                { status: 400 }
            );
        }

        const command = new DeleteObjectCommand({
            Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
            Key: key,
        });

        await S3.send(command);

        return NextResponse.json(
            { message: "File deleted successully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Missiong or invalid object key" },
            { status: 500 }
        );
    }
}