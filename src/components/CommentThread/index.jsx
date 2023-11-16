import AvatarCard from '../AvatarCard'
import Button from '../common/Button'
import Typography from '../common/Typography'
import './styles.css'

export default function CommentThread({ comment, handleReply }) {
    return (
        <article className="comment-container">
            <div className='comment'>
                <div>
                    <AvatarCard name={comment.author?.name || comment.author?.email} url={comment.author?.profilePictureUrl} imgSize={24} textVariant={'body3bold'} />
                    <Typography className='pad' variant={'body2'}>{comment.text}</Typography>    
                </div>
                {
                    handleReply && <div className='reply'>
                        <Button text={'Reply'} variant="ghost" size='sm' onClick={() => handleReply(comment)}/>    
                    </div>
                }
            </div>
            {comment.replies?.map(replie => <CommentThread comment={replie} key={replie.id} handleReply={handleReply} />)}
        </article>
    )

}