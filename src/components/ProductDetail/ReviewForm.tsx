import { useState, useContext } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import type { Review } from "../../utils/types";
import { IoPersonOutline } from "react-icons/io5";

interface ReviewFormProps {
  productId: number;
}

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const { addReview } = useContext(AppContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !comment.trim() || rating === 0) {
      alert("Please fill all fields and select a rating");
      return;
    }

    const newReview: Review = {
      rating,
      comment: comment.trim(),
      author: author.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    addReview(productId, newReview);

    setRating(0);
    setHoverRating(0);
    setAuthor("");
    setComment("");
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white-custom mb-6">
        Send A Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary-dark rounded-full flex items-center justify-center text-white-custom">
            <IoPersonOutline />
          </div>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className="flex-1 bg-secondary-dark text-white-custom px-4 py-2 rounded-lg border border-accent-pink focus:border-accent-pink focus:outline-none placeholder-accent-pink"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white-custom text-sm">Rating:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-xl hover:scale-110 transition-transform duration-200"
              >
                {star <= (hoverRating || rating) ? (
                  <FaStar className="text-accent-yellow" />
                ) : (
                  <FaRegStar className="text-accent-pink" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full bg-secondary-dark text-white-custom px-4 py-3 rounded-lg border border-accent-pink focus:border-accent-pink focus:outline-none placeholder-accent-pink resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-accent-red hover:bg-red-600 text-white px-8 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Share
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
