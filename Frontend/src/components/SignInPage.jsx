import React from 'react';
import { AuroraBackground } from './ui/aurora-background';
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen">
      <AuroraBackground>
        <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
          <div className="w-full max-w-md">
            <SignIn 
              path="/signin"
              routing="path"
              signUpUrl="/signup"
              redirectUrl="/app"
            />
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
