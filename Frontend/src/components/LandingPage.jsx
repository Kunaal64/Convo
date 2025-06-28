import React from 'react';
import { motion } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';
import { Button } from './ui/button';
import { FileText, Users, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      title: "Intuitive Sketching",
      description: "Create and edit sketches with our easy-to-use drawing tools. Perfect for brainstorming and ideation."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time. See changes as they happen and collaborate seamlessly."
    },
    {
      icon: <Share2 className="w-8 h-8 text-blue-500" />,
      title: "Easy Sharing",
      description: "Share your sketches with anyone, anywhere. Export in multiple formats or generate shareable links."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AuroraBackground>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Welcome to Convo
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-12 max-w-2xl mx-auto">
              The ultimate platform for real-time collaboration and creativity
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24 relative z-10">
              <Link to="/signin" className="relative z-10">
                <Button size="lg" className="px-8 py-6 text-lg relative z-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="relative z-10">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg relative z-10 bg-white/5 backdrop-blur-sm hover:bg-white/10 border-white/30">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-32 relative z-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-xl"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
