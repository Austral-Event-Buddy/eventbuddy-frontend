import Typography from "../common/Typography";
import './styles.css'
import PropTypes from 'prop-types';

export default function AvatarCard({name, url, status, onClick, imgSize, textVariant}){
    return <div className="avatar-container" onClick={onClick}>
        <img src={url} className="avatar-img" style={{width:imgSize, height:imgSize}}/>
        <Typography variant={textVariant ?? 'body1bold'}>{name}</Typography>
        {status && <Typography variant={'body3'}>{status}</Typography>}
    </div>
}

AvatarCard.propTypes = {
    name: PropTypes.string,
    url: PropTypes.string,
    onClick: PropTypes.func,
    status: PropTypes.oneOf(['PENDING', 'ATTENDING', 'NOT_ATTENDING', 'HOST']),
    imgSize: PropTypes.number,
    textVariant: PropTypes.string
}