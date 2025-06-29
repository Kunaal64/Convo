import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuroraBackground } from './ui/aurora-background';
import { Button } from './ui/button';
import { GradualSpacing } from './ui/gradual-spacing';
import { FileText, FileSearch, FileText as FileText2, FileCode, User, FileCheck, FileQuestion, MessageSquareText } from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <FileSearch className="w-8 h-8 text-blue-500" />,
      title: "Convert Documents",
      description: "Quickly convert your documents online - no downloads, no hassle, just a few clicks.",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: <User className="w-8 h-8 text-purple-500" />,
      title: "Personalized",
      description: "Access your PDF chats, conversion history, and past files - all in one place, personalized for you.",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: <MessageSquareText className="w-8 h-8 text-green-500" />,
      title: "PDF - Chat",
      description: "Convo is your smart AI doc assistant to understand, summarize, and share anything, anywhere",
      bgColor: "bg-green-500/20"
    }
  ];

  // Animation variants for buttons
  const buttonVariants = {
    initial: { 
      y: 20, 
      opacity: 0,
      scale: 0.98
    },
    animate: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    },
    tap: {
      scale: 0.98
    }
  };

  // Animation variants for feature cards
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * index,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }),
    hover: {
      y: -5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 15
      }
    }
  };

  // Animation for feature icons with 3D tilt effect
  const iconVariants = {
    initial: { 
      opacity: 0,
      scale: 0.96,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0
    },
    animate: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.1
      }
    },
    hover: {
      scale: 1.05,
      rotateX: [0, 5, -5, 2, 0],
      rotateY: [0, 5, -3, 2, 0],
      rotateZ: [0, 2, -2, 1, 0],
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden dark:bg-zinc-900">
      <AuroraBackground>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6"
          >
            <div className="mb-6 sm:mb-8">
              <div className="block sm:hidden">
                <GradualSpacing 
                  text="Convo"
                  className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
                  style={{
                    fontFamily: '"Fredoka", sans-serif',
                    letterSpacing: '-0.5px',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
                  }}
                  framerProps={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.6, ease: 'easeOut' }
                    }
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <GradualSpacing 
                  text="Convo - Convert with ease"
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight"
                  style={{
                    fontFamily: '"Fredoka", sans-serif',
                    letterSpacing: '-1px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                  framerProps={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.8, 
                        ease: [0.16, 1, 0.3, 1],
                        staggerChildren: 0.03
                      }
                    }
                  }}
                />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Convert your documents in seconds - no installs, just clicks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 sm:mb-24 relative z-10">
              <motion.div 
                className="relative z-10 w-full sm:w-auto"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="/signin">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg 
                              bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white 
                              dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800
                              transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20
                              transform hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">Sign In</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="relative z-10 w-full sm:w-auto"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{ delay: 0.1 }}
              >
                <Link to="/signup">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg 
                              bg-white/90 hover:bg-white text-blue-700 border-blue-600 hover:border-blue-700
                              dark:bg-transparent dark:text-white dark:border-white/70 dark:hover:bg-white/10
                              transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10
                              transform hover:-translate-y-0.5 group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24 lg:mt-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-white/80 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 
                         backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 
                         shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -inset-12 opacity-0 group-hover:opacity-30 transition-opacity duration-700" 
                       style={{
                         background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                         transform: 'translateX(-100%) rotate(12deg)',
                         transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
                       }}
                       aria-hidden="true">
                  </div>
                </div>
                
                {/* Icon with 3D tilt effect */}
                <motion.div 
                  className={`w-14 h-14 flex items-center justify-center rounded-xl ${feature.bgColor} mb-4 sm:mb-6 mx-auto 
                             transition-all duration-300 group-hover:shadow-lg overflow-hidden`}
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ 
                    delay: 0.1 * index,
                    type: 'spring',
                    stiffness: 300,
                    damping: 15
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Subtle shine effect on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%', skewX: '-20deg' }}
                      whileHover={{
                        x: '200%',
                        transition: { duration: 0.8, ease: 'easeOut' }
                      }}
                    />
                    {/* Main icon with 3D effect */}
                    <motion.div 
                      className="relative z-10"
                      whileHover={{
                        scale: 1.15,
                        transition: { type: 'spring', stiffness: 400, damping: 10 }
                      }}
                    >
                      {React.cloneElement(feature.icon, { 
                        className: 'w-7 h-7',
                        strokeWidth: 2.2
                      })}
                    </motion.div>
                  </div>
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
