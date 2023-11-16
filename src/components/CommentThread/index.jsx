import AvatarCard from '../AvatarCard';
import Button from '../common/Button';
import Typography from '../common/Typography';
import './styles.css';
import { getRepliesOfComment } from '../../api/api';
import React, { useEffect, useState } from "react";
import CommentReplyModal from "../CommentReplyModal";

export default function CommentThread({ comment, handleReply, replies }) {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const filteredReplies = replies
        ? replies
            .flat() // Flatten the array of arrays
            .filter(reply => reply.parentId === comment.id)
        : [];

    const [nestedReplies, setNestedReplies] = useState([]);
    const [isFetchingReplies, setIsFetchingReplies] = useState(true);

    useEffect(() => {
        const fetchNestedReplies = async () => {
            if (filteredReplies.length > 0 && isFetchingReplies) {
                const nested = [];
                for (let reply of filteredReplies) {
                    const replies = await getRepliesOfComment(reply.id);
                    nested.push(...replies);
                }
                setNestedReplies(nested);
                setIsFetchingReplies(false); // Stop fetching after first iteration
            }
        };

        fetchNestedReplies();
    }, [filteredReplies, isFetchingReplies]);

    const handleSubmit = () => {
        console.log(replies);
    };

    return (
        <article className="comment-container">
            <div className='comment'>
                <div>
                    <AvatarCard name={comment.author?.name} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} imgSize={24} textVariant={'body3bold'} />
                    <Typography className='pad' variant={'body2'}>{comment.text}</Typography>
                </div>
                <div className='reply'>
                    <Button text={'Reply'} variant="ghost" size='sm' onClick={() => { setIsCommentModalOpen(true); handleSubmit() }}/>
                </div>
            </div>
            {filteredReplies.length > 0 && (
                filteredReplies.map(filteredReply => (
                    <CommentThread
                        comment={filteredReply}
                        key={filteredReply.id}
                        handleReply={handleReply}
                        replies={nestedReplies}
                    />
                ))
            )}
            <CommentReplyModal show={isCommentModalOpen} handleClose={() => setIsCommentModalOpen(false)} parent={comment}/>
        </article>
    );
}
