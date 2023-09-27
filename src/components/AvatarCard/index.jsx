import Typography from "../common/Typography";
import './styles.css'

export default function AvatarCard({name, url}){
    return <div className="avatar-container">
        <img src={url} className="avatar-img"/>
        <Typography variant={'body1bold'}>{name}</Typography>
    </div>
}