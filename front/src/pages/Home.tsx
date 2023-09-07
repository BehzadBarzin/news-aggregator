import Footer from "../components/Footer";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import styles from "../constants/styles";

function Home() {
  return (
    <div>
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
      <Footer />
      </div>
  )
}

export default Home