import { TwitterAddReactionSvg, TwitterTrashSvg } from '@/assets/svg/TwitterSvg';
import styles from './CreatePost.module.css'
import { useState } from 'react';

interface ICreatePostProps {
	refTextArea: React.RefObject<HTMLTextAreaElement>
	userWallet: typeUserWalletData
	isModalEmojiActive: boolean
	createNewPost: () => void
	setIsCreatePostMenu: React.Dispatch<React.SetStateAction<boolean>>
	setIsModalEmojiActive: React.Dispatch<React.SetStateAction<boolean>>
	setIsNotificationActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreatePost({ refTextArea, userWallet, isModalEmojiActive, setIsModalEmojiActive, setIsNotificationActive, createNewPost, setIsCreatePostMenu }: ICreatePostProps): JSX.Element {
	const [lenghtCurrent, setLenghtCurrent] = useState<number>(0);

	return (
		<div className={ styles.TWcreatePost }>
			<div className={ styles.TWcreatePostHeader }>
				<span>New Post</span>
				<button onClick={() => createNewPost()}>Publish</button>
			</div>
			<div className={ styles.TWcreatePostMain }>
				<textarea ref={refTextArea} maxLength={500} onChange={(e) => {setLenghtCurrent(e.target.value.length)}}></textarea>
			</div>
			<div className={ styles.TWcreatePostFooter }>
				<div className={ styles.PostInfo }>
					<div className={ styles.ExtraBtns }>
						<button 
							className={ styles.TrashBtn }
							onClick={() => {
								setIsCreatePostMenu(false);
								setLenghtCurrent(0);
							}}
						>
							<TwitterTrashSvg />
						</button>
						<button 
							className={ styles.AddExtraEmoji }
							onClick={() => {
								userWallet.productsPurchased.length !== 0
									? setIsModalEmojiActive(!isModalEmojiActive)
									: setIsNotificationActive(true)
								}}
						>
							<TwitterAddReactionSvg />
						</button>
					</div>
					<div className={ styles.SymbolsCounter }>
						<span>{lenghtCurrent}</span>/500
					</div>
				</div>
			</div>
		</div>
	)
}