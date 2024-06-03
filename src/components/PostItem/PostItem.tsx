'use client'

import styles from './PostItem.module.css'
import { typePropsPostItem, typeReactionData } from '@/types/PostItem'
import { TwitterLikeSvg, TwitterFillLikeSvg, TwitterOtherPointsSvg } from '@/assets/svg/TwitterSvg'
import { useState } from 'react';
import { StandartModalMenu } from '../ui/ModalMenus/StandartModalMenu/StandartModalMenu';
import { Highlight } from '../Highlight/Highlight';

const reactionArr: string[] = ["👍", "👎", "😈", "♥️", "💋", "🔥", "💩", "🤡", "🤨", "😐", "🤓", "💔", "💀", "😭"]

export function PostItem({ searchValue = '', posts, setPosts }: typePropsPostItem): JSX.Element {
	const [isModalActive, setIsModalActive] = useState<boolean[]>(Array(posts.length).fill(false));

	const toggleIsModalActive = (index: number) => {
        const copy = [...isModalActive];
        copy[index] = !copy[index];
        setIsModalActive(copy);
    }

	const liked = (id: number): void => {
		const copy = [...posts];
		const currentPosts = copy.find(elem => elem.id === id);
		if (currentPosts) {
			currentPosts.likeInfo.isLike = !currentPosts.likeInfo.isLike;
			currentPosts.likeInfo.isLike ? currentPosts.likeInfo.likeCount++ : currentPosts.likeInfo.likeCount--
			if (typeof window !== 'undefined') {
				window.localStorage.setItem('postsData', JSON.stringify(copy));
			  }
		}
		setPosts(copy)
    };

	const setReaction = (index: number, value: string) => {
		const copy = [...posts];
		if(!copy[index].reactionInfo.usedReactions) {
			copy[index].reactionInfo.usedReactions = [{ reaction: value, count: 1, selected: false }];
		} else{
			const reactionIndex = copy[index].reactionInfo.usedReactions.findIndex((elem: typeReactionData) => elem?.reaction === value);
			if (reactionIndex !== -1) {
				copy[index].reactionInfo.usedReactions.splice(reactionIndex, 1);
			} else {
				copy[index].reactionInfo.usedReactions.push({ reaction: value, count: 1, selected: true });
			}
			localStorage.setItem('postsData', JSON.stringify(copy));
			setPosts([...copy]);
		}
	}

	return (
		<>
		{posts.reduce((filteredPosts: JSX.Element[], item, index) => {
			if (item.shortPostText.toLowerCase().includes(searchValue.toLowerCase())) {
				filteredPosts.push(
					<div className={styles.TWpostItem} key={item.id}>
						<img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg' alt={item.name} />
						<div className={styles.TWpostItemInfo}>
							<div className={styles.TWpostItemHeader}>
								<span className={styles.TWpostItemName}>{item.name}</span>
								<span className={styles.TWpostItemDate}>{item.date}</span>
							</div>
							<div className={styles.TWpostItemMain}>
								<Highlight 
									text={item.shortPostText} 
									searchHighlight={searchValue} 
									hashTagHighlight={'#'}
								/>
							</div>
							<div className={styles.TWpostItemFooter}>
								<button onClick={() => liked(item.id)}>
									{item.likeInfo.isLike ? <TwitterFillLikeSvg /> : <TwitterLikeSvg />}
									<span className={styles.TWpostItemLikeCount}>{item.likeInfo.likeCount}</span>
								</button>
							</div>
							<div className={styles.ReactionSection}>
								{item.reactionInfo.usedReactions.map((elemnt: typeReactionData, includeIndex) => (
									<span
										onClick={() => { setReaction(index, elemnt?.reaction) }}
										data-selected={elemnt?.selected ? 'true' : 'false'}
										className={styles.ReactionEmoji}
										key={includeIndex}
									>
										{elemnt?.reaction} {elemnt?.count}
									</span>
								))}
							</div>
						</div>
						<div className={styles.TWOtherMenu} onClick={() => toggleIsModalActive(index)}>
							<TwitterOtherPointsSvg />
						</div>
						{ isModalActive[index] && (
							<StandartModalMenu 
								isActive={isModalActive[index]} 
								setIsActive={() => toggleIsModalActive(index)}
								translateY={10}
								translateX={-20}
							>
								<>
								<ul className={styles.OtherMenuList}>
									{reactionArr.map((item: string, reactionIndex) => (
										<li key={reactionIndex} className={styles.OtherMenuListItem} onClick={(e) => {
											setReaction(index, (e.target as HTMLLIElement).textContent || '');
											toggleIsModalActive(index);
										}}>
											{item}
										</li>
									))}
								</ul>
								{ item.reactionInfo.usedReactionPacks.length > 0 && (
									<ul className={`${styles.OtherMenuList} ${styles.ExtraEmojiMenuList}`}>
										{ item.reactionInfo.usedReactionPacks.map((item: string, reactionIndex) => (
											<li key={reactionIndex} className={styles.OtherMenuListItem} onClick={(e) => {
												setReaction(index, (e.target as HTMLLIElement).textContent || '');
												toggleIsModalActive(index);
											}}>
												{item}
											</li>
										))}
									</ul>
								)}
								</>
							</StandartModalMenu>
						)}
					</div>
				);
			}
			return filteredPosts;
		}, [])}
		</>
	)
}