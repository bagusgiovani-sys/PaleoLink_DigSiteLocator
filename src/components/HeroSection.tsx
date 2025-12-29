import { motion } from "framer-motion"
import Spline from "@splinetool/react-spline"
const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center justify between lg:px-24 px-10 relative overflow-hidden">
       
        {/* Left Section */}
        <div className="z-40 lg:mb-0 mb-[20%]">
            <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 26,
                delay: 1.5,
                duration: 2.0 }}
            className="text-5xl lg:text-8xl font-bold z-10 mb-6">
                Building Fast <br/> Responsive 3D Web
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 26,
                delay: 1.9,
                duration: 2.0 }}
            className="text-md md:text-lg lg:text-xl text-gray-300 max-w-2xl">
            Crafting immersive 3D web experiences with cutting-edge <br/>
            technologies like Three.js and React Three Fiber to bring <br/>
            your vision to life.

            </motion.p>

        </div>

        {/* Right Section - Spline 3D Model */}

        
        <Spline scene="https://prod.spline.design/oFic1hcweQjszJKe/scene.splinecode" />


    </section>
  )
}

export default HeroSection