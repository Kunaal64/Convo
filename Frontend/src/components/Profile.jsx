import React from 'react';
import { useUser } from '@clerk/clerk-react';

function Profile() {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20 rounded-full"
                src={user?.imageUrl}
                alt={user?.fullName || 'Profile'}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.fullName || 'Welcome!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.firstName || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.lastName || 'Not provided'}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email Address
              </p>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {user?.primaryEmailAddress?.emailAddress || 'No email'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
