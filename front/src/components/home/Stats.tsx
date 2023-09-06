import styles from "../../constants/styles";

const stats = [
    {
      id: "stats-1",
      title: "News Sources",
      value: "300+",
    },
    {
      id: "stats-2",
      title: "Trusted by",
      value: "380K+",
    },
    {
      id: "stats-3",
      title: "Articles",
      value: "50K+",
    },
];

function Stats() {
  return (
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
        {stats.map((stat) => (
        <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3`} >
            <p className="font-poppins font-normal xs:text-[28px] text-[21px] xs:leading-[36px] leading-[21px] text-gradient uppercase mr-3">
            {stat.title}
            </p>
            <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
            {stat.value}
            </h4>
        </div>
        ))}
    </section>
  )
}

export default Stats