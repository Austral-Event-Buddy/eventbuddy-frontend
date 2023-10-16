import Typography from "../common/Typography";

export default function NoContent({ message }) {
    return (
        <div style={{ width: '100%', display: 'grid', justifyItems: 'center' }}>
            <Typography variant={'body2'}>{message}</Typography>
        </div>
    )

}