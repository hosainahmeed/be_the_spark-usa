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
import { useUserSignUpMutation } from '@/app/redux/service/authApis';
import { toast } from 'sonner';

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
    const [signUp, { isLoading: signUpLoading }] = useUserSignUpMutation()

    const inputFields: InputField[] = [
        ...(role === 'organizer'
            ? [{ label: "businessName", type: "text", placeholder: "Business Name" }]
            : []
        ),
        { label: "name", type: "text", placeholder: "Full Name" },
        { label: "email", type: "email", placeholder: "Email Address" },
        { label: "phone", type: "tel", placeholder: "Phone Number" },
        { label: "password", type: "password", placeholder: "Password" },
        { label: "confirmPassword", type: "password", placeholder: "Confirm Password" }
    ];


    const router = useRouter();
    const [formData, setFormData] = useState<Record<string, string>>(
        inputFields.reduce((acc, field) => ({ ...acc, [field.label]: "" }), {})
    );

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (label: string, value: string) => {
        setFormData(prev => ({ ...prev, [label]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                name: formData.name,
                email: formData.email,
                role: role === "organizer" ? "organizer" : "user",
                businessName: formData.businessName || "",
                phone: formData.phone,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            };

            const res = await signUp(data).unwrap();

            if (!res?.success) {
                throw new Error(res?.message);
            }

            toast.success("Account created successfully!");
            router.push(`/one-time-pass?email=${formData.email}?role=${role}`);

        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Something went wrong while signing up!');
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
                                {(field.label === "password" || field.label === "confirmPassword") && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={
                                            field.label === "password"
                                                ? togglePasswordVisibility
                                                : toggleConfirmPasswordVisibility
                                        }
                                        aria-label={
                                            (field.label === "password" ? showPassword : showConfirmPassword)
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {(field.label === "password" ? showPassword : showConfirmPassword) ? (
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
                        disabled={signUpLoading}
                        size="lg"
                    >
                        {signUpLoading ? 'Creating Account...' : 'Next'}
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