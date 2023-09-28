import Typography from "../common/Typography";
import './styles.css'

export default function AvatarCard({name, url, status}){
    return <div className="avatar-container">
        <img src={url} className="avatar-img"/>
        <Typography variant={'body1bold'}>{name}</Typography>
        <Typography variant={'body3'}>{status}</Typography>
    </div>
}