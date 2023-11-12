import { useState } from "react";
import Typography from "../common/Typography";
import StarRating from "../StarRating/StarRating";
import './styles.css';

export default function EventRate({ id, name, baseRating = 0 }) {
    const [rating, setRating] = useState(baseRating);

    function handleClick() {
        console.log(id)
    }
    return (
        <div className="event-rate">
            <Typography variant={'body2bold'}>{name}</Typography>
            <StarRating rating={rating} setRating={setRating} onClick={handleClick} />
        </div>
    )
}