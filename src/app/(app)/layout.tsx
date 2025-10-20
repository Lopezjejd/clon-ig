import MainLayout  from "@/components/layout/MainLayout";
import { ReactNode } from "react";

export default function AppLayout({children}:{children:ReactNode}){
    return <MainLayout>{children}</MainLayout>
}