import { ReactNode } from "react";
import Header  from "./Header";
import Sidebar from "./Sidebar";
import NavBottom from "./NavBottom";

export default function MainLayout({children}:{children:ReactNode}){
    return (
        <div>
            <Header></Header>
            <main>
            {children}
                 <section className="hidden xl:inline-grid">
              <Sidebar></Sidebar>
            </section>
            </main>
       <NavBottom></NavBottom>
        </div>
    )
}