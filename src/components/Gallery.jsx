import  { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FreeRouteNavbar from './FreeRouteNavbar';

const images = [
  { id: 1, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/532128893_1124354936506368_9104299519294476235_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHdBu5OHmEoyQU1s-KJuKMl5Fm4KjVSz97kWbgqNVLP3gE2DLyJVxhpr4iKJ5l0X2Y3Q0zs5yLZe6rLvGnRfyCo&_nc_ohc=CdP3muJhrMkQ7kNvwFyPVgP&_nc_oc=AdmzfX9grDCzXu_-M5t19PXNmk5xggd8OrEQhkLFZxLAzMo4rZg9cQCLA9rhOqatrjQ&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=DsQPIu_FrjHHhUJ4yJahdg&oh=00_AfYZO52VqPFVb_N2AfS-AcOS58tDmcNBeAKuHm9lvsD8qA&oe=68CE3406", title: "Friends Together" },
  { id: 2, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Youth Energy" },
  { id: 3, url: "https://scontent.facc6-1.fna.fbcdn.net/v/t39.30808-6/535392496_1208791884622885_6021688504171864976_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHvgkH3wzSVyEPbQ2xG8zXNCnM8CkSa2NoKczwKRJrY2hanupKHMYIPx6Z0KlE2s5NsNdw-Yan4d760flUZFg2r&_nc_ohc=Hkj8r1RfczMQ7kNvwGXnuuZ&_nc_oc=AdkLkgOePMMaPSCpDYUUc_8lfvPMhlwwrQjB7ASW2FHvKJ8T091OnXhZzlxd165utGo&_nc_zt=23&_nc_ht=scontent.facc6-1.fna&_nc_gid=hGClyBToBMeU_igjE57InA&oh=00_AfZSzaD4cJ928ZllSPkgSArrQQj7l3Ichr56vwBHKZHh4w&oe=68CE6179", title: "Smiles & Joy" },
  { id: 4, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Summer Festival" },
  { id: 5, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/542759520_1221101483391925_7479901416414727716_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH2ZQzVm2ThVS3e3_nm-CF8OhXm0yp7lnU6FebTKnuWdfzG_YvZIc4LiWTQGcrl2u15NTd8aOGCvOBx6hq2U5Ln&_nc_ohc=4reK-VlCva4Q7kNvwGmpx7B&_nc_oc=AdlEt9evQEC4BWUKYwdeWLyLbKdOtv_xEtGKDq1Gs3Sl-ccJG3h9dXLEBIikeidXaBo&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=hk6KvgeTa7ep5iadA365VA&oh=00_AfbmBwIyMHwjrlNBht9MW7uLF2TiigRyeIabdibmIB4HnA&oe=68CE3D16", title: "Youth Vibes" },
  { id: 6, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Adventure" },
  { id: 7, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/519683972_775848328130375_1606141588750797445_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeESLkwE4RJt5lKSGgpzPx3mCGlA8Gdd1sEIaUDwZ13WwTiYbiL_pSQg3CQdmnUHoC73Zh2OVaZPHuQBlLDFmn6H&_nc_ohc=a4Cyx_1Z3Q4Q7kNvwGz54SS&_nc_oc=Adl5FKhXLLNxCOqtx6eqzsMTtcAWVKJu4FO9ZGpfC2YS3nlatDQ60THl5dD4K0qellc&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=sViACD9yq6Vn45bpZGKqyg&oh=00_AfaVGA-KRQmk11uJH7_6gStHT6SLIHWdtu_xyLY88w5MGw&oe=68CE369A", title: "Concert Fun" },
  { id: 8, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Youth Group" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "City Lights" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/524640246_1076689641232569_1322600763973238975_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF8ge117p007GXC8tn_LzcfCemypq2KbeYJ6bKmrYpt5hVvQKcFmQaKvAWvThItNqun4OCsDioEWOEP9zOg-WvB&_nc_ohc=irTMKOznVHsQ7kNvwHKK31R&_nc_oc=AdmWUO5Wl4BLe46ESaLpENH1K8W2_bIfJbaSLU81_8gm1bjJsAgxuo-8V_XOgITpcJ0&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=59qiqvq6xDc2keJDVSkm_A&oh=00_AfZOUBVzD4nup0ONfWFDBZtINmRZaH3Cde5b-kU0gUOp7g&oe=68CE361A", title: "City Lights" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "City Lights" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/532899192_1126546176287244_214473068694260578_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEfWMjppn0KtiMHuKeWkYUgSD5EAbHFPkhIPkQBscU-SOTlZoo3IbPvIYk1nTSPXMo760C4k1NgBbnN_Sgcw76u&_nc_ohc=AF56fD18URoQ7kNvwHlbeKC&_nc_oc=Admvc1UfQgPeVAdyl6mwO3bC5aywTv1-VztJulEhdK6OqcnQWF9fgG1ZCSfifdWkKvc&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=wEnm_6DmTP_cZwOeCrvFRQ&oh=00_AfYDdpAzPVFmYBGQm3fNPs8Z5DM8MCAxmaGD9yyk32l4gw&oe=68CE58FA", title: "City Lights" },
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
