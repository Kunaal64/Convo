import React from 'react';
import { AuroraBackground } from './ui/aurora-background';
import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen">
      <AuroraBackground>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[80vh]">
          <div className="w-full max-w-md bg-background/80 backdrop-blur-sm p-8 rounded-xl border border-border shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
            <SignUp 
              path="/signup" 
              routing="path"
              signInUrl="/signin"
              appearance={{
                elements: {
                  card: 'shadow-none bg-transparent',
                  headerTitle: 'text-foreground',
                  headerSubtitle: 'text-muted-foreground',
                  socialButtonsBlockButton: 'border-border hover:bg-muted/50',
                  formFieldInput: 'border-border focus:ring-2 focus:ring-primary/20',
                  footerActionText: 'text-muted-foreground',
                  footerActionLink: 'text-primary hover:text-primary/80',
                },
              }}
            />
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
