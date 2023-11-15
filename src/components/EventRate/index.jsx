import { useState } from "react";
import Typography from "../common/Typography";
import StarRating from "../StarRating/StarRating";
import './styles.css';
import { createReview, updateReview } from "../../api/api";

export default function EventRate({ id, name, baseRating = 0 }) {
    const [ratingValue, setRatingValue] = useState(baseRating);

    async function handleClick(rate) {
        setRatingValue(rate);
        await createReview(id, rate)
    }
    return (
        <div className="event-rate">
            <Typography variant={'body2bold'}>{name}</Typography>
            <StarRating rating={ratingValue} onClick={handleClick} />
        </div>
    )
}