import "./styles.css"
import PropTypes from "prop-types"
import img from "../../images/login-register.svg";
import logo from "../../icons/eventBuddy-logo.svg";
import Typography from "../Typography";
import Button from "../../components/Button";
// import EventIcon from '@mui/icons-material/Event';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SideBar({currentPage}){

    const buttonStyle = {
        marginBottom: "10px",
        overflow:"hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        justifyContent: "left",
    };

    function isCurrentPage(text) {
        if (text === currentPage) {
            return "fullfilled";
        } else {
            return "ghost";
        }
    }

    return (
        <div className={"container"} >
            <div className={"center"}>
                    <div className={"logo"} >
                        <img alt='logo' src={logo} style={{width:"36px", height:"auto", marginRight: "7px"}} />
                        <Typography className={"title"} children={"EventBuddy"}></Typography>
                    </div>
                    <div className={"buttons"}>
                        <Button text={"Events"} variant={isCurrentPage("Events")} style={buttonStyle} />
                        <Button text={"Settings"} variant={isCurrentPage("Settings")}  style={buttonStyle} />
                    </div>
                <div className={"username-button-wrapper"} >
                    <Button style={{...buttonStyle, backgroundColor:"#180A33"}}>
                        {
                            // <AccountCircleIcon />
                        }
                        <Typography variant={"body1"} className={"username-button-text"} >
                            Jane Doe
                        </Typography>
                    </Button>
                </div>
            </div>
        </div>
    )
}
SideBar.propTypes = {
    // When adding a new page, remember to also add it here.
    currentPage: PropTypes.oneOf(["Events", "Settings"]),
}