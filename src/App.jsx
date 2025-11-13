import gsap from 'gsap';
import { ScrollTrigger, SplitText } from "gsap/all";
import { Navbar } from './components/Navbar.jsx';
import Hero from "./components/Hero.jsx";
import ClassicMovies from "./components/ClassicMovies.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
 return (
	<main>
        <Navbar/>
        <Hero/>
        <ClassicMovies/>
    </main>
 )
}

export default App
