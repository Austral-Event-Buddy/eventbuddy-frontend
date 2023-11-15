import AvatarCard from '../AvatarCard'
import Button from '../common/Button'
import Typography from '../common/Typography'
import './styles.css'
import {createComment, getUserById} from '../../api/api';
import React, {useEffect, useState} from "react";
import NewCommentModal from "../NewCommentModal";
import CommentReplyModal from "../CommentReplyModal";

export default function CommentThread({ comment, handleReply, replies }) {
    const [name, setName] = useState("");
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
    const filteredReplies = replies.filter(reply => reply.parentId === comment.id);

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

    const handleSubmit = () => {
        console.log(comment)
    }

    return (
        <article className="comment-container">
            <div className='comment'>
                <div>
                    <AvatarCard name={comment.author?.name} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} imgSize={24} textVariant={'body3bold'} />
                    <Typography className='pad' variant={'body2'}>{comment.text}</Typography>
                </div>
                {
                    // I do not know why it uses handleReply &&...
                    handleReply && <div className='reply'>
                        <Button text={'Reply'} variant="ghost" size='sm' onClick={() => setIsCommentModalOpen(true)}/>
                    </div>
                }
            </div>
            {/*maybe should remove filteredReplies && (but i think it won't affect anything)*/}
            {filteredReplies && (filteredReplies.map(filteredReply => (<CommentThread
                    comment={filteredReply}
                    key={filteredReply.id}
                    handleReply={handleReply}
                    replies={replies}/>)))}
            <CommentReplyModal show={isCommentModalOpen} handleClose={setIsCommentModalOpen(false)} parent={comment}/>
        </article>
    )

}