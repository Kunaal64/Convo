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
                  className="text-5xl font-bold text-gray-900 dark:text-white leading-tight"
                  framerProps={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <GradualSpacing 
                  text="Convo - Convert with ease"
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
                  framerProps={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                />
              </div>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              Convert your documents in seconds - no installs, just clicks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 sm:mb-24 relative z-10">
              <Link to="/signin" className="relative z-10 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg 
                            bg-blue-600 hover:bg-blue-700 text-white 
                            dark:bg-blue-600 dark:hover:bg-blue-700
                            transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="relative z-10 w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg 
                            bg-white/90 hover:bg-white text-blue-700 border-blue-600 hover:border-blue-700
                            dark:bg-transparent dark:text-white dark:border-white/70 dark:hover:bg-white/10
                            transition-all duration-300 shadow-sm hover:shadow"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24 lg:mt-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white/80 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 
                           backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-white/10 
                           shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl ${feature.bgColor} mb-4 sm:mb-6 mx-auto`}>
                  {React.cloneElement(feature.icon, { className: 'w-8 h-8' })}
                </div>
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
