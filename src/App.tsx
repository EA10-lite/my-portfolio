import "./App.css";
import { About, Hero } from "./components";
import { Navbar, Footer } from "./layouts";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}

export default App