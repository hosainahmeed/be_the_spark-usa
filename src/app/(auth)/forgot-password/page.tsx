import SideImage from "@/components/component-layout/SideImage";
import { IMAGE } from "../../../../public/assets/image/index.image";
import { Suspense } from "react";
import ForgetPassword from "@/components/ui/form-related/ForgetPassword";

const Page = () => {
   
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 items-center justify-center max-w-screen-xl mx-auto min-h-screen md:p-4 gap-8 content-center">
            <SideImage image={IMAGE.lockImage} />
            <Suspense fallback={<div>Loading...</div>}>
                <ForgetPassword />
            </Suspense>
        </main>
        
    );
};

export default Page