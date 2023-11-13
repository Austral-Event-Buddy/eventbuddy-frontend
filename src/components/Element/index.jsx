import Typography from "../common/Typography";
import './styles.css';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, {useState} from "react";
import Button from "../common/Button";
import {getUser} from "../../utils/user";

const iconStyle = {
    border: '2px solid white',
    borderRadius: '32px',
    marginLeft: '-18px',
    height: '32px',
    width: '32px',
    color: '#471F99',
    background: 'white'
}

const Element = ({ element, host }) => {

    const [alreadyAssigned, setAlreadyAssigned] = useState(false)
    const isSatisfied = element.maxUsers === element.quanity;

    return (
        <div className="element-container">
            <Typography variant="h6">{element.name}</Typography>
            <div className="right-container">
                <div className="invitations-pics" >
                    { [...Array(Math.min(10, 5))].map((e, i) => <AccountCircleIcon style={iconStyle} key={i}/>)}
                </div>
                {host && isSatisfied &&
                        <Button size="sm" variant="outlined" text="Edit"/>
                    }
                {host && !isSatisfied && alreadyAssigned &&
                    <div className="buttons-container">
                        <Button size="sm" variant="outlined-error" text="Unassign"/>
                        <Button size="sm" variant="outlined" text="Edit"/>
                    </div>
                }
                {host && !isSatisfied && !alreadyAssigned &&
                    <div className="buttons-container">
                        <Button size="sm" text="Assign"/>
                        <Button size="sm" variant="outlined" text="Edit"/>
                    </div>
                }
                {!host && !isSatisfied && alreadyAssigned &&
                    <div className="buttons-container">
                        <Button size="sm" variant="outlined-error" text="Unassign"/>
                    </div>
                }
                {!host && !isSatisfied && !alreadyAssigned &&
                    <div className="buttons-container">
                        <Button size="sm" text="Assign"/>
                    </div>
                }
            </div>
        </div>
    )

}

export default Element;

