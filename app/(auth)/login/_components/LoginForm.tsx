"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GithubIcon, Loader, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { error } from "console";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [githubPending, StartGithubTransition] = useTransition();
    const [emailPending, StartEmailTransition] = useTransition();
    const [email, setEmail] = useState("");

    async function signInWithGithub() {
        StartGithubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with Github, you will be redirected...");
                    },
                    onError: (error) => {
                        toast.error("Internal Server Error");
                    },
                },
            });
        });
    }

    function signInWithEmail( ) {
        StartEmailTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: 'sign-in',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success('Email sent')
                        router.push(`/verify-request?email=${email}`);
                    },
                    onError: () => {
                        toast.error('Error sending email');
                    }
                }
            })
        })
    }
    return(
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your Github Email Account</CardDescription>
            </CardHeader>

            <CardContent>
                <Button 
                    disabled={githubPending}
                    onClick={signInWithGithub} 
                    className="w-full" 
                    variant="outline"
                >
                    {githubPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4" />
                            Sign in With Github
                        </>
                    )}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:border-t after:border-border after:flex after:items-center">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="m@gmail.com"
                        required
                        />
                    </div>

                    <Button 
                        disabled={emailPending} 
                        onClick={signInWithEmail} 
                        className="w-full"
                    >
                        {emailPending ? (
                            <>
                                <Loader className="size-4 animate-spin" />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <Send className="size-4" />
                                <span>Continue With Email</span>
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}