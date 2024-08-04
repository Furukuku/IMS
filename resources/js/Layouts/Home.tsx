import Header from "@/Components/Header"
import NavBar from "@/Components/NavBar"
import { ReactNode, useState } from "react"

const Home = ({ children }: { children: ReactNode } ) => {
  const [navBar, setNavBar] = useState<boolean>(true);

  return (
    <div className="flex">
      <NavBar 
        navBar={navBar}
        setNavBar={setNavBar}
      />
      <div className="w-60 hidden lg:block" />
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

export default Home
