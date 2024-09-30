"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";
const NavigateButton = ({children,location}:{children:React.ReactNode,location:string}) => {
    const router = useRouter();
    const handleSubmit = () => {
        router.push(`/${location}`);
    }
    return (
        <form action={handleSubmit}>
            <span><Button type="submit" variant="link">{children}</Button></span>
        </form>
    )
}

export default NavigateButton;