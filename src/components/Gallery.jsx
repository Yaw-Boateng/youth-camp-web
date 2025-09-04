import  { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FreeRouteNavbar from './FreeRouteNavbar';

const images = [
  { id: 1, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/538369203_1208792414622832_717407893965182359_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHN8RWTmGG4Hjx71x3djX0PYr_KotDjTFpiv8qi0ONMWmLhMrealtDlKFWNMnLyXgcTUDeilFl2n1FTN3ZsC4eq&_nc_ohc=NBmhFnqE8JMQ7kNvwHL_8Rw&_nc_oc=Adk6_y17FLmlbCaqGWlhgnYwvmoEQ6tUothaWnaR3pQDv074fZpr--2RDwInQI2S3Gc&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=2gTnYC9ZqGVRAMtjeuQz9w&oh=00_AfYL-DvHr5APe4DSKcWc6FpMtEnUTII25S4ZwyZw7b_vzA&oe=68BF8CA5", title: "Friends Together" },
  { id: 2, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/537044055_1208792614622812_4482594615966925170_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF8KHInScaXKCEa0sq10WYr3Rgz4sDn7XndGDPiwOfteU_s-3c6_1gs45CkzUNdAbKsmv78YsN2j8Wlbw4eAY7S&_nc_ohc=drDcgC1t9gUQ7kNvwExBjwf&_nc_oc=AdluRktIVPhTZsZCAMnFdbAHtUFei6NUN2deoAXcBGBVCg1r8VRUnPO_7WQvCmBaUgI&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=d7xrbOZJeYmlS3Fp7VTHEA&oh=00_AfZNRstYyIh1iKHiJMW0j0sJxgCGoGt8NYk8XEVhHKA2CQ&oe=68BF9C5A", title: "Youth Energy" },
  { id: 3, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/529959743_792220846493123_8173880423776589245_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEHLvHJpjmDGv60_8BCxSjg3U8G7AV8ERLdTwbsBXwREiMkTKlmyasEulPz7nwuEJU6bTg1fzCqf9HCkaVrGaIf&_nc_ohc=VguQ87z2Zg0Q7kNvwEcj1JL&_nc_oc=AdmnaD0LTXY4Wsc4zFmJ-yTqwotfP_oeFfTw9PKzhiG7rwI3jreaKgl5odwui4rgUaY&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=9SdqVSJjuBjddjqzm6neWw&oh=00_AfaQCry-eDfs7pVSjAuy7Z6qgux54Stea_kkMN3bo2Cq-A&oe=68BF8DA4", title: "Smiles & Joy" },
  { id: 4, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/535367712_1208791231289617_3312420262967173698_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGwFs2LRp0oVV28IrGJzuFIn_SXwaOIeUif9JfBo4h5TxHMlpDopv8R60rQ1xcQWyCm2nWF_qqObY-KiWb7HAh&_nc_ohc=0Vdo1FzGGO4Q7kNvwFIrWcw&_nc_oc=AdkvKG9qoVoCYbCctmIYI5gpOOQoShWzzKyEjyDlFNjSiXZGjqA1R8RtOhwvVMpk7zE&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=IK8qGwTDVV_V4RLWTZcNUQ&oh=00_AfYtizeChgnjYl0Gbz31MQnySB-MMtKDk5WLUpRo0rhCFg&oe=68BF86E7", title: "Summer Festival" },
  { id: 5, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/534377200_797801752601699_4367567913033340280_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGwAJNJvt56dtapflbw6lY8dedCViNqBSN150JWI2oFI4vLsNGc5YTN5SnfHkWZbL9mB2Etnn32FdA_8UrQgMmA&_nc_ohc=7M0vAgBqy3AQ7kNvwGfjExx&_nc_oc=AdmDaccf9Odp5CY_th_xXyONO34bAlK5VOc2lqlfZHFqM-64pZmVzCTVD7GMwn8u6Hk&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=kYQIZvMQBPMnihmw1Hm7sw&oh=00_AfZm_SKYlMtL9zh6v4kkFiGyR4JN7XfWp82TXvy2z8_STA&oe=68BF8DD0", title: "Youth Vibes" },
  { id: 6, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/518380106_775848444797030_1433213663768580253_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEDVeks3qW2ICsWSsNKyEr1rtSkOl_zgASu1KQ6X_OABA_Noevm3VpuB8gkYyYW4B4kWhGEOh1TwSbbST_xPwj0&_nc_ohc=V3Rp6EY--jgQ7kNvwFYJmr9&_nc_oc=Adn3NqHtuIvvrr_iAtBLlt5aUH5lvG_PTFo0xckM3mt-fUzfj5Dt97_T8EsbJrX6hFY&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=Sl0FgrnrPGWSCrShe09MHg&oh=00_Afa8bQhMqSBIa-h4a4bAeqXoLn3QE9zf9x0f1eY1_Zzh8g&oe=68BFB415", title: "Adventure" },
  { id: 7, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/515505333_1126777046264157_1688782230696564551_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHRcdmIswgxvPXT92i-DEPjuCxdbXa-yxK4LF1tdr7LEjC1ogfn1TVs5DetbznytJr97BVfo8QY-wHmWAm62JKr&_nc_ohc=q1H_eIxSFIgQ7kNvwEbqHZI&_nc_oc=Adl2nkH-3NuSytty6db0fIknIiZab0ho6BWa2_rsrDRPdzkliAm_FyivOY6cGG1s8rU&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=43X39vJuZesN7wx_8sXYfQ&oh=00_AfZNtZzOMZxjGSbAvUWrlY5LPINicJX9DFjZ2PlIKp3qyg&oe=68BF9FB0", title: "Concert Fun" },
  { id: 8, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/528126376_122129956400853883_8150449181937926109_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeESmz8_M-nCoapy8a-qLksnOtjz7pO0rGg62PPuk7SsaOTJJO2HrDIWu0zQsaohyNkQNpgL09HlB1ggXZGqyE9o&_nc_ohc=T_Q84zn_vNgQ7kNvwH8Pgvp&_nc_oc=AdkVVttPkFa9c2DEdlxCmDJ3L7SpTNaK6g2Dmp3j2-T8ufnQOVDTQ9kJQ9wMwtLvm7w&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=O647R85nXSPdxiq5CoqWyg&oh=00_AfYfIImV10BSH3wmFHXOTtY60ikwwYYgYkwsQQCCiJe2kA&oe=68BFA1F7", title: "Youth Group" },
  { id: 9, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/515435717_1126775232931005_5319795537150998375_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF_nDvJ2U2rqpYeIgwKrNZNXz_SGnmCuYxfP9IaeYK5jD7oPlEZEFJ30ZKAUg6M7HvryOTUxfAa9l-wP010pZKm&_nc_ohc=AXGnxlk-IsIQ7kNvwHXbHGs&_nc_oc=AdnQaSb6IhoJ1zZedONIXNZhqy9qB5SkyjJKkyno0oMJh3gi_UP2fuYlig0GOa0gYMc&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=bDg1i6XX1OTuIxfzteKuZQ&oh=00_AfYCN6FJsr6wv3X0dEuMBPG4BNjUSwPf2CEpsgKHpHcPxQ&oe=68BF9304", title: "City Lights" },
  { id: 9, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/505397257_1152475413587866_278621287353094845_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFPvQPp416GmBBunH7WrxFgL0083DnUx0EvTTzcOdTHQUN9Y5y_tEdYAtE64RHFHrCso1LVk5_yVzeHpgWZlwvI&_nc_ohc=KgunG2lDSI8Q7kNvwFOFpBD&_nc_oc=Adnt9U9R1ywL7_oXgwZNtLtYnafyPYSWRmPRNULrM4eQzIqrmy1drwGmHrUNa4P9lLg&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=2Y4FLk7_v44YV87MszUH0Q&oh=00_AfYk3UZJ3omOVH_nqTNUcAWcHGNfblGrW82qcgtENYsXwQ&oe=68BF9771", title: "City Lights" },
  { id: 9, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/520262388_1070899308478269_3938535722912353493_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE8-WLXu7_StU4qJ-ZdgQJ4ks4u9vGVvSWSzi728ZW9JT9peTGG5jC1wZtqbo9caGZ5WpHfuts7NDKziEsC8MtO&_nc_ohc=EO_YLKlGFvIQ7kNvwEGx8_e&_nc_oc=AdlVrxvFPn5w0hICmWqI0oIwyIRIv5UGb26F7yy0HYkWRYgCreAvR-HkAl_68sk8cOg&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=zwatu4JwNUAPE5Ct_aCiWw&oh=00_AfZ3zPtxI84KMAA13_LkLXpr610iRi0Y_N4Nej8v1zYKjA&oe=68BFBF85", title: "City Lights" },
  { id: 9, url: "https://scontent.facc9-1.fna.fbcdn.net/v/t39.30808-6/506717029_696436386487919_739691170130113030_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEt0teiZ4bcT5X2yVWboEU9BLZzRvd-omAEtnNG936iYH8W-5EN_JcdUfI5UsiBbP9Cv8ZE882fVsQNvrR6EXdh&_nc_ohc=LPDijgerupoQ7kNvwFeUYDs&_nc_oc=Adl5Mx5_FVUTaPBxPDewN2oy7gRpthzoU7J3IbxktRaaACu-i8MNbSniD2uNhaQCPRY&_nc_zt=23&_nc_ht=scontent.facc9-1.fna&_nc_gid=3-LtAWXR5uFxenJYTKtSMw&oh=00_AfaVr9JehCdaWhyrXTfjxoWKST3tZN1C18jcUiaNKt8qVw&oe=68BF91D2", title: "City Lights" },
];


const Gallery = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the component is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1, // Delay between each item animation
      },
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased overflow-x-hidden p-8">
    <FreeRouteNavbar />

      <div className="container mx-auto">
        <header className="text-center mb-16 pt-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tighter leading-tight">
            Our Gallery
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            A showcase of beautiful moments and breathtaking views. Explore our collection.
          </p>
        </header>
        
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {images.map(image => (
            <motion.div
              key={image.id}
              className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg transform-gpu cursor-pointer group"
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
              transition={{ duration: 0.3 }}
              variants={itemVariants}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white text-lg font-semibold transform-gpu translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
