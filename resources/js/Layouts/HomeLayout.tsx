import Header from "@/Components/Header"
import NavBar from "@/Components/NavBar"
import { ReactNode, useState } from "react"

const HomeLayout = ({ children }: { children: ReactNode } ) => {
  const [navBar, setNavBar] = useState<boolean>(false);

  return (
    <div className="flex">
      <NavBar 
        navBar={navBar}
        setNavBar={setNavBar}
      />
      <div className="w-0 lg:w-60 transition-all duration-300 ease-in-out" />
      <section className="flex-1">
        <Header 
          navBar={navBar}
          setNavBar={setNavBar}
        />
        {children}
      </section>
    </div>
  )
}

export default HomeLayout
