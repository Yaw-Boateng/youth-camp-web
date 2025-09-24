import emmaMain from "../assets/images/emmaMain.jpg";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";

const images = [emmaMain, img1, img2, img3, img4, img5];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-12 drop-shadow-sm">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg border border-white/10 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={img}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-64 object-cover object-top"
              />{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
