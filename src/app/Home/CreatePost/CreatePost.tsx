import { TwitterAddReactionSvg, TwitterTrashSvg } from '@/assets/svg/TwitterSvg';
import styles from './CreatePost.module.scss'
import { useState } from 'react';
import { TextSection } from '@/components/ui/Fields/TextSection/TextSection';
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton';

interface ICreatePostProps {
	textAreaValue: string;
	userWallet: TUserWalletData
	isModalEmojiActive: boolean
	createNewPost: () => void
	setTextAreaValue: React.Dispatch<React.SetStateAction<string>>;
	setIsCreatePostMenu: React.Dispatch<React.SetStateAction<boolean>>
	setIsModalEmojiActive: React.Dispatch<React.SetStateAction<boolean>>
	setIsNotificationActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreatePost({ textAreaValue, userWallet, isModalEmojiActive, setTextAreaValue, setIsModalEmojiActive, setIsNotificationActive, createNewPost, setIsCreatePostMenu }: ICreatePostProps): JSX.Element {
	return (
		<div className={ styles.TWcreatePost }>
			<div className={ styles.TWcreatePostHeader }>
				<span className={ styles.HeaderSpan }>New Post</span>
				<StandartButton
					text={'Publish'}
					setValue={createNewPost}
				/>
			</div>
			<div className={ styles.TWcreatePostMain }>
				<TextSection
					maxLength={500}
					setFieldValue={setTextAreaValue}
				/>
			</div>
			<div className={ styles.TWcreatePostFooter }>
				<div className={ styles.PostInfo }>
					<div className={ styles.ExtraBtns }>
						<button 
							className={ styles.TrashBtn }
							onClick={() => {
								setIsCreatePostMenu(false);
								setTextAreaValue('');
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
						<span>{textAreaValue.length}</span>/500
					</div>
				</div>
			</div>
		</div>
	)
}