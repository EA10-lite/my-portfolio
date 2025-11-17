import "./App.css";
import { Hero, Services } from "./components";
import { Navbar, Footer } from "./layouts";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </div>
  )
}

export default App