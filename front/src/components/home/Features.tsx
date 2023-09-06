import {FC} from 'react';

import styles, {layout} from '../../constants/styles';

import author from '../../assets/author.svg';
import source from '../../assets/source.svg';
import category from '../../assets/category.svg';
import keyword from '../../assets/keyword.svg';
import Button from '../Button';

const features = [
  {
    id: "feature-1",
    icon: author,
    title: "Authors",
    content:
      "Easily select your favorite authors and see their articles in one place.",
  },
  {
    id: "feature-2",
    icon: source,
    title: "Sources",
    content:
      "Choose your trusted sources and gather their feed in a single location.",
  },
  {
    id: "feature-3",
    icon: category,
    title: "Categories",
    content:
      "Select categories you are interested in and keep an eye on them.",
  },
  {
    id: "feature-4",
    icon: keyword,
    title: "Keywords",
    content:
      "Watch keywords that matter the most to you. We'll make a curated list of all articles that matter to you. ",
  }
];

type TFeatureCardProps = {
    icon: string,
    title: string,
    content: string,
    index: number
};
  
const FeatureCard: FC<TFeatureCardProps> = ({ icon, title, content, index }) => (
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
      <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
        <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
          <span className="text-gradient">{title}</span>
        </h4>
        <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
          {content}
        </p>
      </div>
    </div>
);

function Features() {
  return (
    <section id="features" className={layout.section}>
        <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
            Create your custom feed, <br className="sm:block hidden" /> we’ll handle
            the rest.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            With access to over <span className="text-gradient">300+ news sources</span>, we can gather the data at blazing speed and let you infinitely customize your feed however you want. Just come here, and we'll handle the rest!
        </p>

            <Button styles={`mt-10`} text='Go to feed'/>
        </div>

        <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
        </div>
    </section>
  )
}

export default Features