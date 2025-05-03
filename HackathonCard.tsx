"use client";

import Image from "next/image";
import { useState } from "react";
import { FaUsers, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";


interface HackathonCardProps {
 
  name: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "live" | "ended";

  // Optional props
  location?: string;
  participants?: number; // Can be 0 or more
  description?: string;
  hackathonUrl?: string; // Added optional URL for the details link/button
  onViewDetails?: (name: string) => void; 
}

// Constants
const DESCRIPTION_TRUNCATE_LENGTH = 100;

// Helper function to format status text
const formatStatus = (status: HackathonCardProps['status']): string => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const HackathonCard = ({
  name,
  imageUrl,
  location,
  participants,
  startDate,
  endDate,
  description,
  status,
  hackathonUrl, // Use this if provided
  onViewDetails, // Use this if provided
}: HackathonCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Determine if the description is long enough to be truncated
  const canTruncateDescription = description && description.length > DESCRIPTION_TRUNCATE_LENGTH;

  const handleToggleDescription = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent potential form submission if wrapped in form
    setShowFullDescription(!showFullDescription);
  };

  const handleViewDetailsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault();
     if (onViewDetails) {
       onViewDetails(name); // Pass back identifier if needed
     } else if (hackathonUrl) {
       
       window.location.href = hackathonUrl;
     }
     // If neither handler nor URL, the button will do nothing visually
  };

  // Determine text for the description
  const displayDescription = canTruncateDescription && !showFullDescription
    ? `${description.slice(0, DESCRIPTION_TRUNCATE_LENGTH)}...`
    : description;

  // Determine text for participants, handling pluralization and undefined
  const participantsText = typeof participants === 'number' && participants >= 0
    ? `${participants} Participant${participants !== 1 ? 's' : ''}`
    : null; // Render nothing if participants is undefined or negative

  return (
  
    // Use dark text on light backgrounds and light text on dark backgrounds for status badges
    <div className="border border-gray-700 rounded-lg p-4 flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow duration-200 bg-[#1b1b22] max-w-sm w-full">
      <div className="relative w-full h-52"> {/* Container for responsive image */}
        <Image
          src={imageUrl || "/placeholder.png"} // Fallback image
          
          alt={`Banner image for ${name}`}
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Provide sizes hint
          className="rounded-md object-cover" // object-cover works well with fill
          priority 
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        {/* Use h3 if card is part of a list where h2 is the list title, adjust as needed */}
        <h3 className="text-xl font-bold text-white truncate" title={name}> {/* Added title attribute for full name on hover */}
           {name}
        </h3>
        {status && ( // Only render status if provided
          <span
            className={`text-xs uppercase font-semibold px-2 py-1 rounded-full whitespace-nowrap ${ // Added whitespace-nowrap
              status === "live"
                ? "bg-green-500 text-white"
                : status === "upcoming"
                ? "bg-yellow-400 text-black" 
                : "bg-gray-500 text-white" 
            }`}
          >
            {/* UX1 Fix: Format status text */}
            {formatStatus(status)}
          </span>
        )}
      </div>

      {/* B1 Fix: Conditionally render location only if provided */}
      {location && (
        <p className="text-gray-400 text-sm flex items-center gap-2">
           {/* Added aria-label for better accessibility */}
          <FaLocationArrow aria-label="Location:" /> {location}
        </p>
      )}

      
      {startDate && endDate && (
        // A2 Fix: Changed text-gray-500 to text-gray-400 for better contrast
        <p className="text-gray-400 text-xs flex gap-2 items-center">
           {/* Added aria-label for better accessibility */}
          <FaCalendarAlt aria-label="Date range:" />
          {/* Consider using <time> tags if dates are in machine-readable format */}
          {startDate} to {endDate}
        </p>
      )}

      
      {participantsText && (
        <p className="text-gray-300 text-xs flex gap-2 items-center">
           {/* Added aria-label for better accessibility */}
          <FaUsers aria-label="Number of participants:" /> {participantsText}
        </p>
      )}

      
      {description && (
        <div className="text-sm">
          
          <p className="text-gray-400" aria-live="polite">
            {displayDescription}
          </p>
          
          {canTruncateDescription && (
            <button
              type="button" // Explicit type
              className="text-blue-400 hover:text-blue-300 text-xs mt-1 font-semibold"
              onClick={handleToggleDescription}
              
              aria-expanded={showFullDescription}
            >
              {showFullDescription ? "Show Less" : "View More"}
            </button>
          )}
        </div>
      )}

      
      <button
        type="button"
        className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded mt-3 w-full text-sm font-medium transition-colors duration-150"
        onClick={handleViewDetailsClick}
        
        disabled={!onViewDetails && !hackathonUrl}
        
        aria-label={`View Details for ${name}`}
      >
        View Details
      </button>
    </div>
  );
};


export default HackathonCard; 