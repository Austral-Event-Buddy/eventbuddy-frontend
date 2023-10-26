import AvatarCard from '../AvatarCard'
import Typography from '../common/Typography'
import './styles.css'

export default function CommentThread({ comment }) {
    return (
        <article className="comment-container">
            <AvatarCard name={comment.author.name} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} imgSize={24} textVariant={'body3bold'} />
            <Typography variant={'body2'}>{comment.text}</Typography>
            {comment.replies?.map(replie => <CommentThread comment={replie} key={replie.id} />)}
        </article>
    )

}