import React from 'react';
import { Star } from 'lucide-react';
import { RatingData } from '@/app/(default)/(organizer)/my-profile-organizer/page';


const RatingSection: React.FC<RatingData> = ({ averageRating, totalRatings }) => {
  const renderStars = (rating: number): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${i < fullStars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="rounded-xl px-6 py-4 flex flex-col items-center min-w-[140px]">
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {averageRating} <span className="text-base font-normal text-gray-400">/ 5</span>
      </div>
      <div className="flex gap-1 mb-2">
        {renderStars(averageRating)}
      </div>
      <div className="text-xs text-gray-500">
        Total Ratings: {totalRatings}
      </div>
    </div>
  );
};

export default RatingSection;