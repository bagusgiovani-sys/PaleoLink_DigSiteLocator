import { AnimatePresence, motion } from "framer-motion";
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";


const Header = () => {
  // Toggle the mobile menu open or close //
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);}
  
  // State to track if the contact form is open //

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  
  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 25,
            duration: 1.5,
          }}
          className="flex items-center"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
            G
          </div>

          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            GIO
          </span>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="md:flex hidden dark: space-x-8">
          {["Home", "About", "Projects", "Experience", "Contact"].map((item, index) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * index,
                type: "spring",
                stiffness: 160,
                damping: 25,
                }}
                className="relative text-violet-500 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group"
                href="#">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="md:flex hidden items-center space-x-4">

          <motion.a
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600" href="#">
              <FiGithub className="w-5 h-5"/>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.6,
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600" href="#">
              <FiInstagram className="w-5 h-5"/>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.6,
            }}
            className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-600" href="#">
              <FiLinkedin className="w-5 h-5"/>
          </motion.a>

        </div>

        {/* Hire Me Button */}
        <motion.button 
          onClick={openContactForm}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            type: "spring",
            stiffness: 160,
            damping: 25,
            duration: 0.4,
          }}
          className="md:flex hidden ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500">
          Hire Me
        </motion.button>
      

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <motion.button 
            whileTap={{ scale: 0.8 }}
            onClick={toggleMenu}
            className="text-gray-300">
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </motion.button> 
        </div>

      </div>
        
        {/* Mobile Menu */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.5 }}
          className=" md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5">
          <nav className="flex flex-col space-y-3">
            {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
              <a onClick={toggleMenu} className="text-gray-300 font-medium py-2"
              key={item} href="#">
                {item}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-5">

              <a href="#">
                <FiGithub className="w-5 h-5 text-gray-300"/>
              </a>
              <a href="#">
                <FiInstagram className="w-5 h-5 text-gray-300"/>
              </a>
              <a href="#">
                <FiLinkedin className="w-5 h-5 text-gray-300"/>
              </a>
            </div>

            <button 
            onClick={() => {
              toggleMenu()
            }}

            className="mt-4 block w-full px-4 py-2 rounded-md bg-gradient-to-r from-violet-600 to-violet-400 font-bold">
              Contact Me
            </button>

          </div> 

        </motion.div>

        {/* Contact Form */}
        <AnimatePresence>
          {isContactFormOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
            
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"> 
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Get In Touch  
                  </h1>

                  <button onClick={closeContactForm}>
                    <FiX className="w-5 h-5 text-gray-300 font-extrabold"/>
                  </button>

                </div>

              {/* input forms */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="How can I help you?"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                  >

                  </textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.4}}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 text-white font-bold rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-violet-600/50">
                    Send Message
                </motion.button>

              </form>

              </div>
                
            

            </motion.div>
          )}
        </AnimatePresence>

      

    </header>
  );
};

export default Header;
