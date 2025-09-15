import  { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FreeRouteNavbar from './FreeRouteNavbar';

const images = [
  { id: 1, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Friends Together" },
  { id: 2, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Youth Energy" },
  { id: 3, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Smiles & Joy" },
  { id: 4, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Summer Festival" },
  { id: 5, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Youth Vibes" },
  { id: 6, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Adventure" },
  { id: 7, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Concert Fun" },
  { id: 8, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "Youth Group" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "City Lights" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "City Lights" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "City Lights" },
  { id: 9, url: "https://scontent.facc1-1.fna.fbcdn.net/v/t39.30808-6/548838245_122134084712907246_4802590167733971950_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFeuHtRaG0K2EHj7197nwU4mv8yAGbAcJ6a_zIAZsBwnkW67wvZtY2FhjWwbdDPb1B4MZCldVISv7LCsNUbPXGB&_nc_ohc=3Wwu-9B5uakQ7kNvwEBFQsh&_nc_oc=Adl6qKh0wvFwt7Fe2ysrmmClSqxTd7nmQnlzQb0MbU4fBfVDTy3Bjhg2KHIGFF5w6VA&_nc_zt=23&_nc_ht=scontent.facc1-1.fna&_nc_gid=VytPCpi1Zjml5UtKVTl__g&oh=00_AfbjsRQs91lFQiihc6f8XeecnQRPKoUTd2jAkmnTTmXZTw&oe=68CE6263", title: "City Lights" },
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
