'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.scss'
import { PostItem } from '@/components/PostItem/PostItem'
import { TPostItem } from '@/types/PostItem'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu';
import { ExtraEmojiPackGenerator } from '@/components/ExtraEmojiPackGenerator/ExtraEmojiPackGenerator';
import { Notification } from '@/components/ui/Notification/Notification';
import { userWalletData } from '../shop/ReactionCollection/ReactionCollection';
import { CreatePost } from './CreatePost/CreatePost';
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton';

export const postsData: TPostItem[] = [];

export function Home(): JSX.Element {
	const [posts, setPosts] = useLocalStorage({
        key: 'postsData',
        defaultValue: postsData,
    });

	const [userWallet, setUserWallet] = useLocalStorage({
        key: 'userWalletData',
        defaultValue: userWalletData,
    });

	useEffect(() => {
	  const data = localStorage.getItem('userWalletData');
	  if (data) {
		setUserWallet(JSON.parse(data));
	  }
	}, []);

	const [isCreatePostMenu, setIsCreatePostMenu] = useState<boolean>(false);
	const [isModalEmojiActive, setIsModalEmojiActive] = useState(false);
	const [isNotificationActive, setIsNotificationActive] = useState(false);
	const [isNotificationEmojiActive, setIsNotificationEmojiActive] = useState(false);
	const [extraEmojis, setExtraEmojis] = useState<string[]>([]);
	const [textAreaValue, setTextAreaValue] = useState<string>('');

	const createNewPost = () => {
		let now = new Date();
		const textareaCurrent: string = textAreaValue;
		if (textareaCurrent) {
			const newPost: TPostItem = { 
				name: 'Anonymous', 
				date: `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}`, 
				shortPostText: textareaCurrent, 
				likeInfo: {
					isLike: false,
					likeCount: 0,
				},
				reactionInfo: {
					usedReactions: [],
					usedReactionPacks: extraEmojis,
				},
				comments: [],
				id: crypto.randomUUID()
			}
			setPosts(prevPosts => [newPost, ...prevPosts]);
			setIsCreatePostMenu(false);
		}
		setExtraEmojis([])
	}

	return (
			<>
			<div className={ styles.PostsBox }>
				<div className={ styles.TWpostsBlock }>
					<PostItem 
						searchValue=''
						posts={posts}
						setPosts={setPosts}
					/>
				</div>
				<div className={ styles.TWcreatePostBtn }>
					<StandartButton
						text={'Create Post'}
						setValue={() => setIsCreatePostMenu(true)}
					/>
				</div> 
			</div>
			<div className={`${ styles.CreatePost } ${ isCreatePostMenu ? styles.visible : '' }`}>
				<CreatePost
					textAreaValue={textAreaValue}
					userWallet={userWallet}
					isModalEmojiActive={isModalEmojiActive}
					createNewPost={createNewPost}
					setTextAreaValue={setTextAreaValue}
					setIsCreatePostMenu={setIsCreatePostMenu}
					setIsModalEmojiActive={setIsModalEmojiActive}
					setIsNotificationActive={setIsNotificationActive}
				/>
			</div>
			
		{ isModalEmojiActive && (
			<StandartModalMenu
				setIsActive={setIsModalEmojiActive}
				top={15}
				left={0}
			>
				<ExtraEmojiPackGenerator 
					userWalletData={userWallet} 
					setUserWalletData={setUserWallet}
					setExtraEmojis={setExtraEmojis}
					setIsModalEmojiActive={setIsModalEmojiActive}
					setIsNotificationEmojiActive={setIsNotificationEmojiActive}
					isNotificationEmojiActive={isNotificationEmojiActive}
				/>
			</StandartModalMenu>
		) }
		{ isNotificationActive && (
			<Notification 
				NotificationText="You have no purchased Products"
				setIsNotificationActive={setIsNotificationActive}	
			/>
		) }
		{ isNotificationEmojiActive && (
			<Notification 
				NotificationText='You have selected more than 5 Emojis'
				setIsNotificationActive={setIsNotificationEmojiActive}
			/>
		) }
		</>
	)
}