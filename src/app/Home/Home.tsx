'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css'
import { PostItem } from '@/components/PostItem/PostItem'
import { typePostItem, typeReactionData } from '@/types/PostItem'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu';
import { ExtraEmojiPackGenerator } from '@/components/ExtraEmojiPackGenerator/ExtraEmojiPackGenerator';
import { Notification } from '@/components/ui/Notification/Notification';
import { userWalletData } from '../shop/ReactionCollection/ReactionCollection';
import { CreatePost } from './CreatePost/CreatePost';

export const postsData: typePostItem[] = [];

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

	const refTextArea = useRef<HTMLTextAreaElement>(null);

	const createNewPost = () => {
		let now = new Date();
		const textareaCurrent: string | undefined = refTextArea.current?.value;
		if (textareaCurrent) {
			const newPost: typePostItem = { 
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
				id: Math.floor(Math.random() * 999999999999999999999)
			}
			setPosts(prevPosts => [newPost, ...prevPosts]);
			setIsCreatePostMenu(false);
		}
		setExtraEmojis([])
	}

	return (
		<>
		{/* <button onClick={() => localStorage.clear()}>clear</button> */}
		{ 
			!isCreatePostMenu ? 
			<>
			<div className={ styles.TWpostsBlock }>
				<PostItem 
					searchValue=''
					posts={posts}
					setPosts={setPosts}
				/>
			</div>
			<div className={ styles.TWcreatePostBtn } onClick={() => setIsCreatePostMenu(true)}>
				<span>Create Post</span>
			</div> 
			</> : <CreatePost 
					refTextArea={refTextArea}
					userWallet={userWallet}
					isModalEmojiActive={isModalEmojiActive}
					createNewPost={createNewPost}
					setIsCreatePostMenu={setIsCreatePostMenu}
					setIsModalEmojiActive={setIsModalEmojiActive}
					setIsNotificationActive={setIsNotificationActive}
				   />
		}
		{ isModalEmojiActive && (
			<StandartModalMenu
				isActive={isModalEmojiActive} 
				setIsActive={setIsModalEmojiActive}
				top={20}
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