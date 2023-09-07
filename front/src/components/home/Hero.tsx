import styles from "../../constants/styles";
import robot from "../../assets/robot.png";
import arrowUp from "../../assets/arrow-up.svg";
import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

    return (
    <div onClick={() => { navigate('/feed'); }} className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
        <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
            <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Go to</span>
            </p>
            <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" />
        </div>
        
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Feed</span>
        </p>
        </div>
    </div>
    );
}

function Hero() {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-card-gradient rounded-[10px] mb-2">
          <p className={`${styles.paragraph} ml-2`}>
            Beyond Headlines, Into Understanding.
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[52px] text-[32px] text-white ss:leading-[70px] leading-[50px]">
            Everything <br className="sm:block hidden" />{" "}
            <span className="text-gradient">You Need to Know</span>{" "}
          </h1>
          {/* Start Button */}
          <div className="ss:flex hidden md:mr-4 mr-0">
            <Start />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[52px] text-[32px] text-white ss:leading-[70px] leading-[50px] w-full">
          In One Place.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Enter <span className="text-gradient">News Aggregator</span> - a curated space where the world's stories converge. We've done the hard work for you, bringing together trusted news from varied sources, ensuring you receive a comprehensive, unbiased, and streamlined view of the world around you.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <Start />
      </div>
    </section>
    );
}

export default Hero