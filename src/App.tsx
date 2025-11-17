import "./App.css";
import { Hero, Services, Projects } from "./components";
import { Navbar, Footer } from "./layouts";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Footer />
    </div>
  )
}

export default App