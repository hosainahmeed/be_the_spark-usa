"use client";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import SectionLayout from "@/components/component-layout/SectionLayout";
import { ArrowLeft } from "lucide-react";

interface IChooseRole {
    title: string;
    description: string;
    icon: StaticImageData;
    state: string;
    buttonText: string,
}

export default function ChooseRoleClient({ roles }: { roles: IChooseRole[] }) {
    const router = useRouter();
    const handleNavigateWithState = (state: string) => {
        router.push(`/sign-up?role=${state}`);
    };

    return (
        <SectionLayout>
            <h1 className="text-title font-semibold text-center mt-3 flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}><ArrowLeft /> Back to Home</h1>
            <div className="w-full h-screen flex items-center justify-center px-1">
                <div className="grid gap-8 md:grid-cols-1">
                    {roles && roles.map((role, index) => (
                        <div
                            key={index}
                            onPointerDown={() => handleNavigateWithState(role.state)}
                            className={
                                cn("flex gap-4 items-center p-6 rounded-2xl bg-[#E6ECF5] border border-gray-200 cursor-pointer transition",
                                    "flex-col text-center",
                                    "md:flex-row md:text-start",
                                )
                            }
                        >
                            <Image
                                src={role.icon}
                                width={200}
                                height={200}
                                alt={role.title}
                                className="rounded-xl object-contain"
                            />
                            <div>
                                <h2 className="text-title font-semibold">{role.title}</h2>
                                <p className={cn(
                                    "text-gray-600 text-center",
                                    "text-gray-600 md:text-start"
                                )}>{role.description}</p>
                                <Button
                                    className={cn("primary-btn mt-3 px-4 py-6 rounded cursor-pointer")}
                                    onPointerDown={() => handleNavigateWithState(role.state)}
                                >{role.buttonText}</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
