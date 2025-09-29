'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IMAGE } from '../../../../public/assets/image/index.image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface InputField {
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    icons?: string;
}

export default function SigninForm() {
    const inputFields: InputField[] = [
        { label: "Email Address", type: "email", placeholder: "Enter your email address" },
        { label: "Password", type: "password", placeholder: "Enter your password" },
    ];

    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, string>>(
        inputFields.reduce((acc, field) => ({ ...acc, [field.label]: "" }), {})
    );

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (label: string, value: string) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log("Login Form Data:", formData);
            router.push('/');
        } catch (error) {
            console.error('Login submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Card className="w-full shadow-none border-none md:shadow-lg md:border">
            <CardHeader className="flex flex-col items-start gap-2">
                <Image
                    src={IMAGE.brandLogo}
                    alt="Sports Events Brand Logo"
                    width={200}
                    height={50}
                    priority
                />
                <CardTitle className="text-4xl text-[#1F2937] font-bold">
                    Login to Account
                </CardTitle>
                <CardDescription className="text-[#1F2937] text-lg">
                    Please enter your email and password to continue
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {inputFields.map((field) => (
                        <div key={field.label} className="flex flex-col gap-1 relative">
                            <Label htmlFor={field.label} className="text-sm font-medium">
                                {field.label}
                            </Label>
                            <div className="relative">
                                <Input
                                    id={field.label}
                                    type={
                                        field.label === "Password"
                                            ? showPassword ? "text" : "password"
                                            : field.type
                                    }
                                    placeholder={field.placeholder}
                                    value={formData[field.label]}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                    required
                                    className="w-full pr-10"
                                    aria-required="true"
                                    disabled={isLoading}
                                />
                                {field.label === "Password" && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={togglePasswordVisibility}
                                        disabled={isLoading}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="text-right">
                        <Link
                            href="/verify-your-email"
                            className="text-sm text-[var(--blue)] hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-[var(--blue)] hover:bg-[var(--blue)]"
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
                <p className="text-sm text-center text-gray-600">
                    Don’t have an account?{' '}
                    <Link
                        className="text-[var(--blue)] hover:underline font-medium"
                        href="/sign-up"
                    >
                        Sign Up
                    </Link>
                </p>

            </CardFooter>
        </Card>
    );
}