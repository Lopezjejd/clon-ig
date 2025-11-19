import { ReactNode } from "react";
import Header  from "./Header";
import Sidebar from "./Sidebar";
import NavBottom from "./NavBottom";
import { LOGGED_IN_USER } from "@/app/data/UsersData";


export default function MainLayout({children}:{children:ReactNode}){
    const initialHref = `/profile/${LOGGED_IN_USER.username}-${LOGGED_IN_USER.id}`;
    return (
        <div>
            <Header></Header>
            <main>
            {children}
                 <section className="hidden xl:inline-grid">
              <Sidebar></Sidebar>
            </section>
            </main>
       <NavBottom initialHref={initialHref}></NavBottom>
        </div>
    )
}