import { ChevronDownIcon } from "@heroicons/react/24/outline";
import  { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FreeRouteNavbar from "./FreeRouteNavbar";

// A custom hook to handle the countdown logic
const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

// Main App component
const App = () => {
  // Refs for GSAP animations
  const navRef = useRef(null);
  const heroAnim1Ref = useRef(null);
  const heroAnim2Ref = useRef(null);
  const heroAnim3Ref = useRef(null);
  const motiveTextRef = useRef(null);
  const pic1Ref = useRef(null);
  const pic2Ref = useRef(null);
  const bannerRef = useRef(null);
  const futureRef = useRef(null);
  const videoRef = useRef(null);

  // State for lazy-loaded resources
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [susImgSrc, setSusImgSrc] = useState(null);
  const [heroImgSrc, setHeroImgSrc] = useState(null);
  const [pic1ImgSrc, setPic1ImgSrc] = useState(null);
  const [pic2ImgSrc, setPic2ImgSrc] = useState(null);
  const [bannerImgSrc, setBannerImgSrc] = useState(null);

  // Countdown logic for September 24, 2025
  const targetDate = "2025-09-24T00:00:00Z";
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  // Lazy-load GSAP and other libraries
  useEffect(() => {
    const loadScript = (url, callback) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = callback;
      document.body.appendChild(script);
    };

    const loadRemixicon = () => {
      const link = document.createElement("link");
      link.href =
        "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    };

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
      () => {
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
          () => {
            loadScript(
              "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js",
              () => {
                setGsapLoaded(true);
                loadRemixicon();
              }
            );
          }
        );
      }
    );
  }, []);

  // GSAP animations - runs only after GSAP is loaded
  useEffect(() => {
    if (gsapLoaded) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // --- On-load Animations (similar to anim2) ---
      const tl = window.gsap.timeline();
      tl.from(navRef.current.children, {
        stagger: 0.2,
        y: 10,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(
        [heroAnim1Ref.current, heroAnim2Ref.current, heroAnim3Ref.current],
        {
          y: 50,
          opacity: 0,
          ease: "expo.out",
          stagger: 0.3,
          duration: 1,
        }
      );

      // --- Scroll-based Animations ---
      // Motive Text GSAP Split Text and Fade In
      const splitText = new window.SplitText(motiveTextRef.current, {
        type: "words",
      });
      const motiveTl = window.gsap.timeline({
        scrollTrigger: {
          trigger: motiveTextRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
      motiveTl.from(splitText.words, {
        opacity: 0.2,
        stagger: 0.1,
        ease: "none",
      });

      // Picture Section Animations
      const picTl = window.gsap.timeline({
        scrollTrigger: {
          trigger: pic1Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      picTl.from(pic1Ref.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      picTl.from(
        pic2Ref.current,
        {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1"
      );

      // Banner Section Animation
      window.gsap.from(bannerRef.current, {
        y: 100,
        opacity: 0,
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Future Section Video Fade
      window.gsap.to(futureRef.current.querySelector("video"), {
        opacity: 1,
        scrollTrigger: {
          trigger: futureRef.current,
          start: "top 50%",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero Title Parallax/Scale
      const heroText = new window.SplitText(
        heroAnim2Ref.current.querySelectorAll("h1"),
        { type: "chars" }
      );
      window.gsap.to(heroText.chars, {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: "-100vh",
        opacity: 0,
        stagger: 0.05,
        ease: "none",
      });

      return () => {
        // Cleanup function to kill all ScrollTrigger instances when the component unmounts
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [gsapLoaded]);

  // Lazy-load images with a single IntersectionObserver instance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgId = entry.target.dataset.imgId;
            switch (imgId) {
              case "susImg":
                setSusImgSrc(
                  "https://images.unsplash.com/photo-1549487928-8951a8770220?q=80&w=2564&auto=format&fit=crop"
                );
                break;
              case "heroImg":
                setHeroImgSrc(
                  "https://images.pexels.com/photos/9577193/pexels-photo-9577193.jpeg"
                );
                break;
              case "pic1Img":
                setPic1ImgSrc(
                  "https://images.pexels.com/photos/8815250/pexels-photo-8815250.jpeg"
                );
                break;
              case "pic2Img":
                setPic2ImgSrc(
                  "https://images.pexels.com/photos/935944/pexels-photo-935944.jpeg"
                );
                break;
              case "bannerImg":
                setBannerImgSrc(
                  "https://images.pexels.com/photos/29397249/pexels-photo-29397249.jpeg"
                );
                break;
              case "video":
                setVideoSrc(
                  "https://www.pexels.com/download/video/7519128/"
                );
                break;
              default:
                break;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const elementsToObserve = [
      document.querySelector("#susimagewrapper"),
      document.querySelector("#heroImg"),
      document.querySelector("#pic1Img"),
      document.querySelector("#pic2Img"),
      document.querySelector("#bimg"),
      document.querySelector("#future"),
    ].filter(Boolean);

    elementsToObserve.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToObserve.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="font-['Nimbus_Sans_L'] w-full antialiased overflow-x-hidden">
      {/* Tailwind CSS CDN is kept for simplicity */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Main Container */}
      <div id="main" className="w-full">
        {/* Home Section */}
        <div id="home" className="min-h-screen">
          {/* Nav */}
          <FreeRouteNavbar />
       
          <div
            id="hero"
            className="flex flex-col md:flex-row mt-12 md:mt-24 lg:mt-32 px-8 md:px-12 lg:px-16 justify-between items-start md:items-center"
          >
            <div
              ref={heroAnim1Ref}
              id="sustain"
              className="w-full md:w-1/4 mb-8 md:mb-0"
            >
              <h5 className="text-gray-900">01.</h5>
              <h2 className="text-gray-900">Acts 26:19.</h2>
              <p className="capitalize font-extrabold text-gray-500 text-xs md:text-sm mt-2 md:mt-4">
               “So then, King Agrippa, I was not disobedient to the vision from heaven..
              </p>
              <div
                id="susimagewrapper"
                className="w-full relative overflow-hidden mt-4 h-32 md:h-48"
                data-img-id="susImg"
              >
                {susImgSrc && (
                  <img
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] object-cover"
                    src={susImgSrc}
                    alt="Pink and green plant"
                  />
                )}
              </div>
            </div>
            <div
              ref={heroAnim2Ref}
              id="ephemeral"
              className="relative w-full md:w-[35%] lg:w-[30%] min-h-[42vw] md:min-h-96"
            >
              <div
                id="heading"
                className="absolute top-[-10%] md:top-[-20%] left-[-5%] md:left-[-12%]"
              >
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-light tracking-tighter leading-none">
                  Youth Camp
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-light tracking-tighter leading-none">
                  {days > 0 ? `${days} Days` : ""}
                  {hours > 0 ? ` ${hours} Hrs` : ""}
                  {minutes > 0 ? ` ${minutes} Mins` : ""}
                  {seconds > 0 ? ` ${seconds} Sec` : ""} More
                </h1>
              </div>
              <div id="imgtext" className="w-full h-auto">
                <div
                  id="heroImg"
                  className="w-full h-auto"
                  data-img-id="heroImg"
                >
                  {heroImgSrc && (
                    <img
                      className="w-full h-auto object-cover"
                      src={heroImgSrc}
                      alt="Young people at a camp"
                    />
                  )}
                </div>
                <p className="mt-8 leading-tight text-base md:text-lg lg:text-xl tracking-tight w-[60%] ml-auto">
                  An unforgettable journey of adventure and faith awaits.
                </p>
              </div>
            </div>
            <div
              ref={heroAnim3Ref}
              id="visit"
              className="flex gap-4 items-center mt-8 md:mt-0"
            >
              <div
                id="circlev"
                className="rounded-full border border-gray-500 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
              >
                        <ChevronDownIcon className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="font-light text-gray-500 capitalize">
                visit our gallery.
              </h3>
            </div>
          </div>
        </div>
        {/* Our Motive Section */}
        <div
          id="motive"
          className="px-8 md:px-12 lg:px-16 mt-24 md:mt-32 flex flex-col md:flex-row justify-between"
        >
          <h3 className="uppercase text-gray-500 text-sm md:text-base">
            our motive
          </h3>
          <p
            ref={motiveTextRef}
            className="leading-relaxed md:leading-snug tracking-tighter text-3xl md:text-4xl lg:text-5xl w-full md:w-[85%] text-right mt-4 md:mt-0"
          >
            At GAC Youth, we are deeply committed to empowering the next
            generation. We believe in building a vibrant, supportive community,
            it's at the core of everything we do. Our programs are designed to
            inspire faith, foster leadership, and create lasting friendships.
          </p>
        </div>
        {/* Pictures Section */}
        <div
          id="pictures"
          className="flex flex-col md:flex-row justify-between mt-24 px-8 md:px-16 lg:px-24"
        >
          <div
            ref={pic1Ref}
            id="firstpic"
            className="w-full md:w-[45%] lg:w-[35%] mb-8 md:mb-0"
          >
            <div
              id="pic1Img"
              className="w-full h-72 md:h-96 mb-4 bg-gray-500"
              data-img-id="pic1Img"
            >
              {pic1ImgSrc && (
                <img
                  className="w-full h-full object-cover"
                  src={pic1ImgSrc}
                  alt="sea"
                />
              )}
            </div>
            <h1 className="tracking-tighter font-light text-2xl md:text-3xl">
              Synergy.
            </h1>
            <p className="opacity-80 tracking-tighter text-sm md:text-base mt-2">
              Building connections and growing together in faith.
            </p>
          </div>
          <div
            ref={pic2Ref}
            id="secondpic"
            className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-end"
          >
            <div
              id="pic2Img"
              className="w-full h-80 md:h-96 lg:h-[45rem] mb-4 bg-gray-500"
              data-img-id="pic2Img"
            >
              {pic2ImgSrc && (
                <img
                  className="w-full h-full object-cover"
                  src={pic2ImgSrc}
                  alt="cloud"
                />
              )}
            </div>
            <h1 className="tracking-tighter font-light text-2xl md:text-3xl">
              Harmony.
            </h1>
            <p className="opacity-80 tracking-tighter text-sm md:text-base mt-2 w-full md:w-1/2 text-right">
              A community where everyone belongs and can thrive.
            </p>
          </div>
        </div>
        {/* Banner Section */}
        <div
          ref={bannerRef}
          id="banner"
          className="flex flex-col md:flex-row items-center w-full mt-24 md:mt-32"
        >
          <div
            id="bimg"
            className="w-full md:w-[65%] h-[60vh] bg-gray-500"
            data-img-id="bannerImg"
          >
            {bannerImgSrc && (
              <img
                className="h-full w-full object-cover object-position-center"
                src={bannerImgSrc}
                alt="bottle"
              />
            )}
          </div>
          <div
            id="btext"
            className="w-full md:w-[35%] px-8 md:px-12 lg:px-16 mt-8 md:mt-0"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter leading-none">
              Inspiration
            </h1>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter leading-none">
              for all ages
            </h1>
            <p className="mt-4 md:mt-6 w-full md:w-3/5 text-sm md:text-base">
              Bringing exciting events and enriching experiences to the youth.
            </p>
          </div>
        </div>
        {/* Future Section */}
        <div
          ref={futureRef}
          id="future"
          className="relative overflow-hidden flex flex-col items-center justify-center w-full min-h-screen bg-white"
          data-img-id="video"
        >
          {videoSrc && (
            <video
              ref={videoRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              muted
              loop
            ></video>
          )}
          <div
            id="ftext"
            className="relative z-10 bg-white p-4 md:p-8 rounded-lg shadow-lg text-center"
          >
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-tighter">
              Youth Camp 2025
            </h1>
            <button className="px-6 py-2 md:px-8 md:py-3 text-xs md:text-sm capitalize mt-4 md:mt-6 font-bold rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
              Don't miss out - register today!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;