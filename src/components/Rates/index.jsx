import { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Button from "../common/Button";
import Typography from "../common/Typography";
import './styles.css';
import EventRate from "../EventRate";
export default function Rates() {
    const [rating, setRating] = useState(3);
    return (
        <div className="rates-container">
            <header className="rates-header">
                <Typography variant={'h6'} className="bold">Past Events</Typography>
                <div className="btn-container">
                    <Button text={'Review'} variant="fullfilled" size="sm" />
                    <Button text={'My events'} variant="ghost" size="sm" />
                </div>
            </header>
            <EventRate name="Event 1" id={1} baseRating={rating} />
        </div>
    )
}