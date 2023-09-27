import React, {useEffect, useRef} from 'react';
import './styles.css';
import "mapbox-gl/dist/mapbox-gl.css";
import Typography from "../common/Typography";
import Button from "../common/Button";
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl";
import Map from "./map";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function getCountDown(eventDate){
    const currentDate = new Date();
    const timeDifference = eventDate - currentDate;
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining === 0 ? `Today` : `in ${daysRemaining} days`;
}

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
export default function Event({ name, date, invitationAmount, status, location }) {

    const timeRemaining = getCountDown( date);
    const iconStyle ={
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
            <div className="cropped-image">
                <Map location={location} />
            </div>
            <div className={"event-data"}>
                <Typography variant={"h6"}>{name}</Typography>
                <Typography variant={"body3"}>{timeRemaining}</Typography>
                <div className='invites-info'>
                    <div className="invite-picture" >
                        <AccountCircleIcon sx={iconStyle} />
                        <AccountCircleIcon sx={iconStyle} />
                        <AccountCircleIcon sx={iconStyle} />
                        <AccountCircleIcon sx={iconStyle} />
                    </div>
                    <Typography variant="body2bold" >{invitationAmount} invited</Typography>
                </div>

            </div>
            {status === "confirmed" && (
                <div className={"confirmed-button"}>
                    <Button text={"Confirmed"} size={"sm"} disabled />
                </div>
            )}
            {status === "pending" && (
                <div className={"confirmation-buttons"}>
                    <Button text={"Not Attending"} size={"sm"} variant={"outlined"}/>
                    <Button text={"Attending"} size={"sm"} />
                </div>
            )}
            {status === "not attending" && (
                <div className={"confirmed-button"}>
                    <Button text={"Not Attending"} size={"sm"} />
                </div>
            )}
        </div>
    );
}


Event.propTypes = {
    name: PropTypes.string,
    //Date is written as: yyyy/mm/dd
    date: PropTypes.instanceOf(Date),
    invitationAmount: PropTypes.number,
    status: PropTypes.oneOf(["pending", "confirmed", "not attending"])
}

