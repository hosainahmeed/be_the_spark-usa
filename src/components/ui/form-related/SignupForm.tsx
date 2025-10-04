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
import { useRouter, useSearchParams } from 'next/navigation';

interface InputField {
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    icons?: string;
}

export default function SignupForm() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role');
    console.log(role)
    const inputFields: InputField[] = [
        ...(role === 'list-events' ? [{ label: "Business Name", type: "text", placeholder: "Major League Baseball (MLB)" }] : []),
        { label: "Full Name", type: "text", placeholder: "Full Name" },
        { label: "Email Address", type: "email", placeholder: "Email Address" },
        { label: "Phone Number", type: "tel", placeholder: "Phone Number" },
        { label: "Password", type: "password", placeholder: "Password" },
        { label: "Confirm Password", type: "password", placeholder: "Confirm Password" },
    ];

    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, string>>(
        inputFields.reduce((acc, field) => ({ ...acc, [field.label]: "" }), {})
    );

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (label: string, value: string) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            setTimeout(() => {
                setIsLoading(false);
                router.push('/one-time-pass');
            }, 2000);
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div>
            <CardHeader className="flex flex-col items-start gap-2">
                <Image
                    src={IMAGE.brandLogo}
                    alt="Sports Events Brand Logo"
                    width={200}
                    height={50}
                    priority
                />
                <CardTitle className="text-4xl text-[#1F2937] font-bold">
                    Create Your Account
                </CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                    Sign up with your email and phone number to get started with sports events.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="flex mt-5 flex-col gap-6">
                    {inputFields.map((field) => (
                        <div key={field.label} className="flex flex-col gap-1 relative">
                            <Label htmlFor={field.label}>{field.label}</Label>
                            <div className="relative">
                                <Input
                                    id={field.label}
                                    type={
                                        field.label === "Password"
                                            ? showPassword ? "text" : "password"
                                            : field.label === "Confirm Password"
                                                ? showConfirmPassword ? "text" : "password"
                                                : field.type
                                    }
                                    placeholder={field.placeholder}
                                    value={formData[field.label]}
                                    onChange={(e) => handleChange(field.label, e.target.value)}
                                    required
                                    className="w-full pr-10"
                                    aria-required="true"
                                />
                                {(field.label === "Password" || field.label === "Confirm Password") && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={
                                            field.label === "Password"
                                                ? togglePasswordVisibility
                                                : toggleConfirmPasswordVisibility
                                        }
                                        aria-label={
                                            (field.label === "Password" ? showPassword : showConfirmPassword)
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {(field.label === "Password" ? showPassword : showConfirmPassword) ? (
                                            <EyeOff className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-500" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}

                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-[var(--blue)] hover:bg-[var(--blue)]"
                        disabled={isLoading}
                        size="lg"
                    >
                        {isLoading ? 'Creating Account...' : 'Next'}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col mt-3 gap-2">
                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link
                        className="text-[var(--blue)] hover:underline font-medium"
                        href="/sign-in"
                    >
                        Sign In
                    </Link>
                </p>
            </CardFooter>
        </div>
    );
}