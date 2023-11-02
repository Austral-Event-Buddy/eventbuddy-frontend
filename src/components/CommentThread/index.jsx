import AvatarCard from '../AvatarCard'
import Typography from '../common/Typography'
import './styles.css'
import { getUserById } from '../../api/api';

export default function CommentThread({ comment }) {
    const [name, setName] = useState("");

    useEffect(() => {
        async function fetchAuthor() {
            try {
                const user = await getUserById(comment.author.id);
                setName(user.name); // Assuming user.name is the property you want
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }

        fetchAuthor();
    }, [comment.author.id]);


    return (
        <article className="comment-container">
            <AvatarCard name={name} url={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'} imgSize={24} textVariant={'body3bold'} />
            <Typography variant={'body2'}>{comment.text}</Typography>
            {comment.replies?.map(replie => <CommentThread comment={replie} key={replie.id} />)}
        </article>
    )

}