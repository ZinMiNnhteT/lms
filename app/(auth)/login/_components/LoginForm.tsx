"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GithubIcon, Loader, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [githubPending, StartGithubTransition] = useTransition();
    const [googlePending, StartGoogleTransition] = useTransition();
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
                    onError: () => {
                        toast.error("Internal Server Error");
                    },
                },
            });
        });
    }

    async function signInWithGoogle() {
        StartGoogleTransition(async () => {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with Google, you will be redirected...");
                    },
                    onError: () => {
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

            <CardContent className="space-y-4">
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

                <Button 
                    disabled={googlePending}
                    onClick={signInWithGoogle} 
                    className="w-full" 
                    variant="outline"
                >
                    {googlePending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <svg className="size-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.38 8.55 1 10.22 1 12s.38 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Sign in With Google
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