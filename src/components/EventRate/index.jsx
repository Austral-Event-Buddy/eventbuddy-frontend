import { useEffect, useState } from "react";
import Typography from "../common/Typography";
import StarRating from "../StarRating/StarRating";
import './styles.css';
import { createReview, updateReview } from "../../api/api";

export default function EventRate({ id, name, onClick, baseRating = 0, readonly = false }) {
    const [ratingValue, setRatingValue] = useState(baseRating);

    useEffect(() => {
        setRatingValue(baseRating);
    }, [baseRating])

    async function handleClick(rate) {
        if (readonly) return;
        setRatingValue(rate);
        await createReview(id, rate);
        onClick();
    }
    return (
        <div className="event-rate">
            <Typography variant={'body2bold'}>{name}</Typography>
            <StarRating rating={ratingValue} onClick={handleClick} readonly={readonly} />
        </div>
    )
}