"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-4 max-w-4xl mx-auto text-center"
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold text-white">
            Welcome to Convo
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Transform your documents with ease. Convert, edit, and manage your files in one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <SignedOut>
            <Button
              asChild
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full font-semibold transition-all"
            >
              <Link href="/sign-in">
                Get Started - It's Free
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full font-semibold transition-all"
              asChild
            >
              <Link href="/sign-up">
                Create Account
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button
              onClick={() => router.push('/dashboard')}
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full font-semibold transition-all"
            >
              Go to Dashboard
            </Button>
          </SignedIn>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-blue-400 mb-4">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

const features = [
  {
    title: "Fast Conversion",
    description: "Convert your documents in seconds with our high-speed processing.",
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 12 7-7 7 7" />
        <path d="m12 19 7-7-7-7" />
      </svg>
    ),
  },
  {
    title: "Secure Storage",
    description: "Your files are encrypted and stored securely in the cloud.",
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Easy to Use",
    description: "Simple and intuitive interface for all your document needs.",
    icon: (props: any) => (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];
