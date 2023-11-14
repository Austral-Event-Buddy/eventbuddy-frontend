import Typography from "../common/Typography";
import './styles.css';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, {useState} from "react";
import Button from "../common/Button";
import { getUser } from "../../utils/user";

const iconStyle = {
    border: '2px solid white',
    borderRadius: '32px',
    marginLeft: '-18px',
    height: '32px',
    width: '32px',
    color: '#471F99',
    background: 'white'
}

const Element = ({ element, host, onAssign, onUnassign, onEdit }) => {

    const assigned = element.users?.find(u => u.id === getUser());
    const isSatisfied = element.maxUsers === element.users?.length;

    return (
        <div className="element-container">
            <Typography variant="h6">{element.quantity} {element.name}</Typography>
            <div className="right-container">
                <div className="invitations-pics" >
                    { [...Array(Math.min(element.users?.length || 0, 5))].map((e, i) => <AccountCircleIcon style={iconStyle} key={i}/>)}
                </div>
                <div className="buttons-container">
                    { assigned && <Button size="sm" variant="outlined-error" text="Unassign" onClick={onUnassign}/> }
                    { !assigned && !isSatisfied && <Button size="sm" text="Assign" onClick={onAssign}/> }
                    { host && <Button size="sm" variant="outlined" text="Edit" onClick={onEdit}/> }
                </div>
            </div>
        </div>
    )

}

export default Element;

