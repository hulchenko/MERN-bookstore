import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { RatingProps } from "../types/rating-props.type";

const Rating = ({ value, text }: RatingProps) => {
  return (
    <div className="flex items-center text-amber-span gap-1">
      <div className="flex">
        <span>{value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
        <span>{value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
        <span>{value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
        <span>{value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
        <span>{value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Rating;
