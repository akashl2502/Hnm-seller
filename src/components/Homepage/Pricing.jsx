import { card } from "../../assets";
import styles, { layout } from "../../style";


const CardDeal = () => (
  <section id="Pricing" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
       Pricing
      </h2>
      {/* <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
    
      </p> */}

      
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
