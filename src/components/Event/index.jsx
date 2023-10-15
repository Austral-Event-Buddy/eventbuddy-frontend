import './styles.css';
import "mapbox-gl/dist/mapbox-gl.css";
import Typography from "../common/Typography";
import Button from "../common/Button";
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl";
import Map from "./map";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCountDown } from '../../utils/date';
import { answerInvite } from '../../api/api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
export default function Event({ id, name, date, guests, status, location, onClick, refresh }) {

    const answer = (s) => {
        answerInvite({
            eventId: id,
            answer: s
        }).then(() => refresh())
    }

    const iconStyle = {
        border: '2px solid white',
        borderRadius: '32px',
        marginLeft: '-18px',
        height: '32px',
        width: '32px',
        color: '#471F99',
        background: 'white'
    }

    return (
        <div className="events-container">
            <div className="cropped-image" onClick={onClick}>
                <Map location={location} />
            </div>
            <div className={"event-data"} onClick={onClick}>
                <Typography variant={"h6"}>{name}</Typography>
                <Typography variant={"body3"}>{getCountDown(date)}</Typography>
                <div className='invites-info'>
                    <div className="invite-picture" >
                        { [...Array(Math.min(guests, 5))].map((e, i) => <AccountCircleIcon style={iconStyle} key={i}/>)}
                    </div>
                    <Typography variant="body2bold" >{guests.length} attending</Typography>
                </div>

            </div>
            {status === "ATTENDING" && (
                <div className={"confirmed-button"}>
                    <Button text={"Confirmed"} size={"sm"} disabled={true} />
                </div>
            )}
            {status === "HOST" && (
                <div className={"confirmed-button"}>
                    <Button text={"Host"} size={"sm"} disabled />
                </div>
            )}
            {status === "PENDING" && (
                <div className={"confirmation-buttons"}>
                    <Button text={"Attending"} size={"sm"} onClick={() => answer("ATTENDING")}/>
                    <Button text={"Not Attending"} size={"sm"} variant={"outlined"} onClick={() => answer("NOT_ATTENDING")}/>
                </div>
            )}
            {status === "NOT_ATTENDING" && (
                <div className={"confirmed-button"}>
                    <Button text={"Not Attending"} size={"sm"} disabled/>
                </div>
            )}
        </div>
    );
}

Event.propTypes = {
    name: PropTypes.string,
    guests: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    invitationAmount: PropTypes.number,
    status: PropTypes.oneOf(['ATTENDING', 'PENDING', 'NOT_ATTENDING', 'HOST']),
}
