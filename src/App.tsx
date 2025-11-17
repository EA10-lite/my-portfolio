import "./App.css";
import { Hero, Services, About } from "./components";
import { Navbar, Footer } from "./layouts";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Footer />
    </div>
  )
}

export default App