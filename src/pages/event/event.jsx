import { useParams } from "react-router-dom"
import './event.css';

export default function EventPage(){
    const {id} = useParams();
    return <div className="event-main">
        Event Page {id}
        </div>
}