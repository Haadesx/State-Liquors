"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login
        setTimeout(() => {
            setIsLoading(false);
            router.push("/account");
        }, 1000);
    };

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500">Enter your email below to login to your account</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" required type="email" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-sm font-medium hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" required type="password" />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/account/register" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
