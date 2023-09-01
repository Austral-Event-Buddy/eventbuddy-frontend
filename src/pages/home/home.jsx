import TextField from '../../components/common/TextField';
import Button from "../../components/common/Button";
import Typography from "../../components/common/Typography";
import SideBar from "../../components/SideBar";
import "./home.css"
import Event from '../../components/Event';
import {useEffect, useState} from "react";
import {home} from "../../api/api";

function Home(){

    const eventsData = [
        {
            name: "Jane's Birthday Party",
            invitationAmount: 14,
            date: new Date('2023-09-15'),
            status: "pending",
            coordinates: [40.7128, -74.0060], // Nueva York, EE. UU.
        },
        {
            name: "Joe's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "confirmed",
            coordinates: [34.0522, -118.2437], // Los Ángeles, California, EE. UU.
        },
        {
            name: "Bob's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "confirmed",
            coordinates: [51.5074, -0.1278], // Londres, Reino Unido.
        },
        {
            name: "Frank's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "confirmed",
            coordinates: [58.8566, 2.3522], // París, Francia.
        },
        {
            name: "Sophie's Birthday Party",
            invitationAmount: 12,
            date: new Date('2023-09-03'),
            status: "confirmed",
            coordinates: [-33.8688, 151.2093], // Sídney, Australia.
        }
    ];

    const [events, setEvents] = useState([]);

    useEffect(() => {
        home()
            .then((data) => {
                setEvents(data);
            })
            .catch((error) => {
                console.error('Error obtaining data from backend:', error);
            });
    }, []);

    console.log(events)

    return(
        <div className={"container-div"}>
            <SideBar />
            <div className={"right-hand-side"}>
                <div className={"title-bar"}>
                    <div className={"page-title"}>
                        <Typography variant="h5">My Events</Typography>
                    </div>
                    <div className={"search"}>
                        <TextField className="search-bar" placeholder={"Search by name, description or invited people."} />
                        <div className="search-button">
                            <Button text="Search"/>
                        </div>
                    </div>
                </div>
                <div className={"events"}>
                    {eventsData.map((event, index) => (
                        <Event
                            key={index}
                            name={event.name}
                            invitationAmount={event.invitationAmount}
                            date={event.date}
                            status={event.status}
                            location={event.coordinates}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;