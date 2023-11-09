import AvatarCard from '../AvatarCard'
import Button from '../common/Button'
import Typography from '../common/Typography'
import './styles.css'
import { getUserById } from '../../api/api';
import {useEffect, useState} from "react";

export default function CommentThread({ comment, handleReply }) {
    const [name, setName] = useState("");

    // useEffect(() => {
    //     async function fetchAuthor() {
    //         try {
    //             const user = await getUserById(comment.author.id);
    //             setName(user.name); // Assuming user.name is the property you want
    //         } catch (error) {
    //             console.error('Error fetching user:', error);
    //         }
    //     }
    //
    //     fetchAuthor();
    // }, [comment.author.id]);


    return (
        <article className="comment-container">
            <div className='comment'>
                <div>
                    <AvatarCard name={comment.author?.name} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} imgSize={24} textVariant={'body3bold'} />
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