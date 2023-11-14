import Typography from "../common/Typography";

export default function NoContent({ message, style }) {
    return (
        <div style={{ width: '100%', display: 'grid', justifyItems: 'center', alignContent:'center', ...style }}>
            <Typography variant={'body2'}>{message}</Typography>
        </div>
    )

}