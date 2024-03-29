import { stats } from "../../constants";
import styles from "../../style";

const Stats = () => (
  <section className={`${styles.flexCenter} flex-row flex-wrap bg-white rounded-md sm:mb-20 mb-6`}>
    
    {stats.map((stat) => (
      <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3`} >
        
        <p className="font-poppins font-normal  xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] bg-gradient-to-r bg-clip-text  text-transparent 
            from-blue-500 via-black to-indigo-500
            animate-text uppercase ml-3">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
