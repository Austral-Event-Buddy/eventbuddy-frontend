import React from 'react';
import './styles.css';
import sampleImage from '../../images/sample-map.png';
import Typography from "../Typography";
import PersonIcon from '@mui/icons-material/Person';
import Button from "../Button";
import PropTypes from "prop-types"

function getTimeRemaining(eventDate){
    const currentDate = new Date();
    const timeDifference = eventDate - currentDate;
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining === 0 ? 'Today' : `in ${daysRemaining} days`;
}

export default function Event({ name, date, invitationAmount, status ="pending" }) {
    const timeRemaining = getTimeRemaining(date);

    return (
        <div className="events-container">
            <div className="cropped-image">
                <img src={sampleImage} alt="Event Image" className="scaled-image" />
            </div>
            <div className={"event-data"}>
                <Typography variant={"h6"}>{name}</Typography>
                <Typography variant={"body3"}>{timeRemaining}</Typography>
                <div className={"invites"}>
                    <PersonIcon sx={{height:"15px", width: "auto", color: "#471F99"}} />
                    <Typography variant={"body3"}>{invitationAmount} invited</Typography>
                </div>
            </div>
            {status === "confirmed" && (
                <div className={"confirmed-button"}>
                    <Button text={"Confirmed"} size={"sm"} style={{backgroundColor: "#BFBFBF", color:"#606060"}} />
                </div>
            )}
            {status === "pending" && (
                <div className={"confirmation-buttons"}>
                    <Button text={"Not Attending"} size={"sm"} variant={"outlined"}  style={{borderColor: "#E5493A", color: "#E5493A"}}/>
                    <Button text={"Attending"} size={"sm"} />
                </div>
            )}
            {status === "not attending" && (
                <div className={"confirmed-button"}>
                    <Button text={"Not Attending"} size={"sm"} style={{backgroundColor: "#BFBFBF", color:"#606060"}} />
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

