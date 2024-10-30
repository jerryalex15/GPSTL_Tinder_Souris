"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

const Page = () => {
  const router = useRouter();
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/choicePage'); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, router]);

  if (typeof window === 'undefined') {
    return null; // Ensure this code runs only on the client side
  }

  if (!isAuthenticated) {
    return null; // Optionally render a loading state or nothing while redirecting
  }

  return (
    <div>
      {/* Your page content here */}
    </div>
  );
};

export default Page;
