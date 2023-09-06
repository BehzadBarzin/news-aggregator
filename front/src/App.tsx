import Navbar from "./components/Navbar";
import Features from "./components/home/Features";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import styles from "./constants/styles";

function App() {
  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>      
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Features />
        </div>
      </div>
    </div>
  )
}

export default App