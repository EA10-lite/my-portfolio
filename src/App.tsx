import "./App.css";
import { Hero, Services, About, Projects } from "./components";
import { Navbar, Footer } from "./layouts";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      <Hero />
      {/* <Experience /> */}
      <About />
      <Services />
      <Projects />
      <Footer />
    </div>
  )
}

export default App