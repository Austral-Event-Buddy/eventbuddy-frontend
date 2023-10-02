import { useParams } from "react-router-dom"
import './event.css';
import Typography from "../../components/common/Typography";
import EventCalendar from "../../components/eventCalendar";
import Map from "../../components/Event/map";
import AvatarCard from "../../components/AvatarCard";
import Button from "../../components/common/Button";
import InviteGuestButton from "../../components/InviteGuest/inviteGuestBotton";

function InviteGuestBotton() {
    return null;
}

export default function EventPage() {
    const { id } = useParams();

    const mockEvent = {
        name: "Jane’s Birthday Party",
        description: "This is a mock event.",
        coordinates: [40.7128, -74.0060],
        date: new Date("09 October 2023"),
        confirmationDeadline: new Date("2023-12-01T00:00:00Z"),
        confirmationStatus: "ATTENDING",
        guests: 10
    };

    const mockGuests = [{ name: "Joe" }, { name: "Jane" }, { name: "John" }, { name: "Jill" }, { name: "Jack" }, { name: "Jenny" }]

    return <div className='event-main'>
        <header className="event-header">
            <div className="event-title">
                <Typography variant="h4" className="bold">{mockEvent.name}</Typography>
                <Typography variant="body2">In 2 days</Typography>
            </div>
        </header>
        <div className="event-body">
            <section className="event-body-left">
                <Typography variant="h5">Location</Typography>
                <Map location={mockEvent.coordinates} interactive={true} />
            </section>
            <section className="event-body-right">
                <div className="right-header">
                    <Typography variant={'h5'} className="bold">Guests</Typography>
                    {mockGuests?.map(guest => <AvatarCard name={guest.name} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} />)}
                </div>
                    <InviteGuestButton eventID ={id}/>
            </section>
        </div>
    </div>
}