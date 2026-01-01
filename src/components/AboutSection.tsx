import {useRef, useEffect} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiInfraredThermometerFill } from "react-icons/ri";



const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const starsRef = useRef<HTMLDivElement[]>([]);

    const addToStars = (el: HTMLDivElement | null) => {
        if (el && !starsRef.current.includes(el)) {
            starsRef.current.push(el);
        }
    };


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Title Animation
        gsap.fromTo(
            titleRef.current,
            { y: 100, opacity: 0 },

            { 
                y: -300, 
                opacity: 1, 
                duration: 1, 
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 40%",
                    toggleActions: "play none none reverse",    
                }
            }
        )

        // Intro Animation
        gsap.fromTo(
            introRef.current,
            { y: 100, opacity: 0, filter: "blur(10px)" },
            { 
                y: -400, 
                opacity: 1, 
                filter: "blur(0px)",
                duration: 1.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 40%",
                    toggleActions: "play none none reverse",
                }
            }
        )

        // Stars Animation with different speedns and directions
        starsRef.current.forEach((star, index) => {
            const direction = index % 2 === 0 ? 1 : -1; // Alternate directions
            const speed = 0.5 + Math.random() * 0.5; // Different speeds

            gsap.to(star, {
                y: `${direction * (100 + index * 20)}`,
                x: `${direction * -50 - index * 10}`,
                rotation: direction * 360,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: speed,
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === sectionRef.current) {
                    trigger.kill();
                }

            })
        }

    }, []);


    return (
        <section ref={sectionRef} className="h-screen relative overflow-hidden bg-gradient-to-b from-black to-violet-900">

            <div className="absolute-inset-0 overflow-hidden">
                {/* STARS for Background Decorative Elements */}
                {[...Array(10)].map((_, i) => (
                    <div 
                        ref={addToStars}
                        key={`star-${i}`}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${10 + i* 3}px`,
                            height: `${10 + i* 3}px`,
                            backgroundColor:"white",
                            opacity: 0.2 + Math.random() * 0.4,
                        }}
                    />
                ))}
            </div>


            <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
                <h1 ref={titleRef} className="text-4xl lg:mt-20 md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0">
            About Me
                </h1>
            </div>

            <div ref={introRef} className="absolute lg:bottom-[-20rem] md:bottom-[-10rem] bottom-[-20rem] left-0 w-full flex md:flex-row flex-col justify-between lg:px-24 px-5 items-center opacity-0">
                <h3 className="text-sm md:text-2xl font-bold text-purple-200 z-50 lg:max-w-[45rem] max-w[27rem] tracking-wider md:mt-20 sm:mt-[-40rem]mt-[-32rem]"> 
            I'm a passionate web developer with a knack for creating dynamic and responsive web applications. With a strong foundation in JavaScript, React, and Node.js, I enjoy bringing ideas to life through code. When I'm not coding, you can find me exploring the latest tech trends or hiking in nature.
                </h3>

                <img 
                className="lg:h-[40rem] md:h-[25rem] h-[20rem] mix-blend-lighten"
                src="images/person.png" alt="profile-img"/>
            </div>
        </section>
    )
}

export default AboutSection