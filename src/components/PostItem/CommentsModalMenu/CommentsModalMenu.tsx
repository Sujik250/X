import { Highlight } from '@/components/Highlight/Highlight'
import styles from './CommentsModalMenu.module.scss'
import { TPostItem } from '@/types/PostItem'
import { TwitterSendSvg } from '@/assets/svg/TwitterSvg'
import { TextArea } from '@/components/ui/Fields/TextArea/TextArea'
import { useState } from 'react'

interface ICommentsModalMenuProps {
	post: TPostItem
	setPosts: React.Dispatch<React.SetStateAction<TPostItem[]>>
}

export function CommentsModalMenu({ post, setPosts }: ICommentsModalMenuProps): JSX.Element {
	const [commentValue, setCommentValue] = useState('');

    const createNewComment = () => {
        let now = new Date();
        const newComment = {
            name: 'Anonymous',
            date: `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}`,
            shortPostText: commentValue,
            id: crypto.randomUUID(),
        };

        setPosts(prevPosts => {
            const updatedPosts = prevPosts.map(item => {
                if (item.id === post.id) {
                    return {
                        ...item,
                        comments: [newComment, ...item.comments],
                    };
                }
                return item;
            });
            return updatedPosts;
        });

        setCommentValue('');
    };

	
	return (
		<>
		<ul className={ styles.CommentList }>
			{ post.comments.map(comment => (
				<li key={comment.id} className={ styles.CommentListItem }>
					
						<img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg' alt={comment.name} />
						<div className={styles.CommentItemInfo}>
							<div className={styles.CommentItemHeader}>
								<span className={styles.CommentItemName}>{comment.name}</span>
								<span className={styles.CommentItemDate}>{comment.date}</span>
							</div>
							<div className={styles.CommentItemMain}>
								<Highlight
									text={comment.shortPostText} 
									searchHighlight={''} 
									hashTagHighlight={'#'}
								/>
							</div>
						</div>

				</li>
			)) }
		</ul>
		<div className={ styles.CreateMessage }>
			<TextArea
				maxLength={500}
				placeholder={'Add a Comment'}
				fieldValue={commentValue}
				setFieldValue={setCommentValue}
			/>
			<div 
				className={`${ styles.SendButton } ${ commentValue.length > 0 ? styles.visible : '' }`}
				onClick={() => createNewComment()}
			>
				<TwitterSendSvg/>
			</div>
		</div>
		</>
	)
}
