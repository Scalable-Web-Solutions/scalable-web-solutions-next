"use client";

import { useEffect, useState } from "react";

export default function AvailabilityStatus() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkAvailability = () => {
      const now = new Date();
      // Convert to PST (UTC-8) or PDT (UTC-7)
      const pstTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
      const hour = pstTime.getHours();
      
      // Available between 6am and 6pm PST
      setIsAvailable(hour >= 6 && hour < 18);
    };

    checkAvailability();
    
    // Check every minute to update status
    const interval = setInterval(checkAvailability, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="flex gap-2 items-center pt-[10px]">
        <span className="bg-green-500 size-3 rounded-full block animate-pulse" />
        <span className="text-sm">We're available now!</span>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-center pt-[10px]">
      <span 
        className={`size-3 rounded-full block animate-pulse ${
          isAvailable ? "bg-green-500" : "bg-yellow-500"
        }`} 
      />
      <span className="text-sm">
        {isAvailable ? "We're available now!" : "We're asleep!"}
      </span>
    </div>
  );
}