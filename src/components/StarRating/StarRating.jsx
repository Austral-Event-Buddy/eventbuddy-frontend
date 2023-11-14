import { useState } from "react";
import StarIcon from "../../icons/starIcon/StarIcon";

export default function StarRating({ rating, onClick }) {
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = (index) => {
        if (hoverRating >= index) {
            return "rgb(255, 203, 69)";
        } else if (!hoverRating && rating >= index) {
            return "rgb(255, 203, 69)";
        }

        return "rgb(198, 198, 198)";
    };

    const starRating = Array(5).fill(0).map((_, i) => i + 1);

    return (
        <div>
            {starRating.map((idx) => (
                <StarIcon
                    key={idx}
                    width={14}
                    height={13}
                    onClick={() => {
                        onClick(idx);
                    }}
                    style={{ fill: getColor(idx), cursor: "pointer" }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ))}
        </div>
    );
};
