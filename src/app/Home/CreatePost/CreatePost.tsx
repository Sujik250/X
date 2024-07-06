import { TwitterAddReactionSvg, TwitterTrashSvg } from '@/assets/svg/TwitterSvg';
import styles from './CreatePost.module.scss'
import { TextSection } from '@/components/ui/Fields/TextSection/TextSection';
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton';
import { SHOPPRODUCTS } from '@/data/ReactionCollection';

interface ICreatePostProps {
	textAreaValue: string;
	isModalEmojiActive: boolean
	createNewPost: () => void
	setTextAreaValue: React.Dispatch<React.SetStateAction<string>>;
	setIsCreatePostMenu: React.Dispatch<React.SetStateAction<boolean>>
	setIsModalEmojiActive: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreatePost({ textAreaValue, isModalEmojiActive, setTextAreaValue, setIsModalEmojiActive, createNewPost, setIsCreatePostMenu }: ICreatePostProps): JSX.Element {
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
							onClick={() => setIsModalEmojiActive(!isModalEmojiActive)}

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