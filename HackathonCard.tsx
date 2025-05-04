"use client";

import Image from "next/image";
import { useState } from "react";

interface HackathonCardProps {
  name: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "live" | "ended";
  location?: string;
  participants?: number;
  description?: string;
  hackathonUrl?: string;
  onViewDetails?: (name: string) => void;
}

const DESCRIPTION_TRUNCATE_LENGTH = 100;

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
  hackathonUrl,
  onViewDetails,
}: HackathonCardProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const canTruncateDescription = description && description.length > DESCRIPTION_TRUNCATE_LENGTH;

  const handleToggleDescription = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowFullDescription(!showFullDescription);
  };

  const handleViewDetailsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault();
     if (onViewDetails) {
       onViewDetails(name);
     } else if (hackathonUrl) {
       window.location.href = hackathonUrl;
     }
  };

  const displayDescription = canTruncateDescription && !showFullDescription
    ? `${description.slice(0, DESCRIPTION_TRUNCATE_LENGTH)}...`
    : description;

  const participantsText = typeof participants === 'number' && participants >= 0
    ? `${participants} Participant${participants !== 1 ? 's' : ''}`
    : null;

  return (
    <div className="border border-gray-700 rounded-lg p-4 flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow duration-200 bg-[#1b1b22] max-w-sm w-full">
      <div className="relative w-full h-52">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={`Banner image for ${name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="rounded-md object-cover"
          priority
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        <h3 className="text-xl font-bold text-white truncate" title={name}>
           {name}
        </h3>
        {status && (
          <span
            className={`text-xs uppercase font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
              status === "live"
                ? "bg-green-500 text-white"
                : status === "upcoming"
                ? "bg-yellow-400 text-black"
                : "bg-gray-500 text-white"
            }`}
          >
            {formatStatus(status)}
          </span>
        )}
      </div>

      {location && (
        <p className="text-gray-400 text-sm">
           <span className="font-medium">Location:</span> {location}
        </p>
      )}

      {startDate && endDate && (
        <p className="text-gray-400 text-xs">
           <span className="font-medium">Date:</span> {startDate} to {endDate}
        </p>
      )}

      {participantsText && (
        <p className="text-gray-300 text-xs">
           <span className="font-medium">Participants:</span> {participantsText}
        </p>
      )}

      {description && (
        <div className="text-sm">
          <p className="text-gray-400" aria-live="polite">
            {displayDescription}
          </p>
          {canTruncateDescription && (
            <button
              type="button"
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
