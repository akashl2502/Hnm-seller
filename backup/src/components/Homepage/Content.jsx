import styles from "../../style";
import { discount} from "../../assets";
import robot from "../../assets/impact-1.png"


const Content = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Discounts</span> Available For{" "}
            <span className="text-white">First 100</span> Deliveries
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold  ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            We Power<br className="" />
            <span className="bg-gradient-to-r bg-clip-text  text-transparent 
            from-teal-500 via-orange-800 to-indigo-500
            animate-text relative">Ecommerce</span>{" "}
          </h1>
          
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Buisness by making shipping Easy.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
         Online Makes Everything Easier
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[110%] h-[50%] z-[5] sm:  scale-10050" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        
      </div>
    </section>
  );
};

export default Content;
