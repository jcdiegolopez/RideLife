
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0));

  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= normalizedRating) {
      stars.push(<FaStar key={i} className="text-accent-yellow" />);
    } else if (i - 0.5 <= normalizedRating) {
      stars.push(<FaStarHalfAlt key={i} className="text-accent-yellow" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-accent-yellow" />);
    }
  }
  
  return <div className="flex gap-0.5">{stars}</div>;
};

export default StarRating;