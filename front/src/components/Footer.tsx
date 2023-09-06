import styles from "../constants/styles";
import logo from '../assets/logo.svg';

function Footer() {
  return (
    <section className={`${styles.flexCenter} ${styles.padding} flex-col bg-card-gradient`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10">
        <img
          src={logo}
          alt="news-aggregator-logo"
          className="w-[266px] h-[72x] object-contain"
        />
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          A new way keep up with the world!
        </p>
      </div>
    </div>
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright Ⓒ 2023 <span className="text-gradient">News Aggregator</span>. All Rights Reserved.
      </p>
    </div>
  </section>
  )
}

export default Footer