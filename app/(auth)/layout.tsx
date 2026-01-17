import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({children}: {children: ReactNode}) {
    return(
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link
                href="/"
                className={buttonVariants({
                    variant: "outline",
                    className: "absolute top-4 left-4",
                })}
            >
                <ArrowLeft className="size-4" />
                Back
            </Link>
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link 
                    className="flex items-center gap-2 self-center font-medium" 
                    href="/"
                >
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    MarshalLMS.
                    </Link>
                {children}

                <div className="text-balance text-center text-xs
                text-muted-foreground">
                    By clicking continue, you agreee to our <span>Terms of service</span>
                    {" "}
                    and <span>Privacy policy</span>.
                </div>
            </div>
        </div>
    )
}