import { REACTIONPRODUCTS } from '@/data/ReactionCollection';
import styles from './ExtraEmojiPackGenerator.module.scss'
import { useState } from 'react';
import { StandartButton } from '../ui/Buttons/StandartButton/StandartButton';

interface IExtraEmojiPackGeneratorProps {
	userWalletData: typeUserWalletData;
	setUserWalletData: React.Dispatch<React.SetStateAction<typeUserWalletData>>;
	setExtraEmojis: React.Dispatch<React.SetStateAction<string[]>>
	setIsModalEmojiActive: React.Dispatch<React.SetStateAction<boolean>>
	setIsNotificationEmojiActive: React.Dispatch<React.SetStateAction<boolean>>
	isNotificationEmojiActive: boolean
}

export function ExtraEmojiPackGenerator({ setIsNotificationEmojiActive, isNotificationEmojiActive, setIsModalEmojiActive, userWalletData, setUserWalletData, setExtraEmojis }: IExtraEmojiPackGeneratorProps): JSX.Element {
	const changeSelectedItem = (packID: number, packIncludeID: number) => {
		const copy = {...userWalletData}
		const productIndex = copy.productsPurchased.findIndex(product => product.productID === packID)
		
		if (productIndex !== -1) {
			copy.productsPurchased[productIndex].productItemSelectedID[packIncludeID] 
			= !copy.productsPurchased[productIndex].productItemSelectedID[packIncludeID]
			setUserWalletData(copy);
		}
	}

	const addExtraEmoji = () => {
		const selectedIncludes: string[] = [];
		
		userWalletData.productsPurchased.forEach(product => {
			if (product.productItemSelectedID.some(selected => selected)) {
				const selectedProduct = REACTIONPRODUCTS.find(prod => prod.id === product.productID);
				const selectedInclude = selectedProduct?.include.filter((_, index) => product.productItemSelectedID[index]);
				if (selectedInclude) {
					selectedIncludes.push(...selectedInclude);
				}
			}
		})
		if (selectedIncludes.length <= 5) {
			setExtraEmojis(selectedIncludes)
			setIsModalEmojiActive(false)
		} else {
			setIsNotificationEmojiActive(!isNotificationEmojiActive)
		}
	}
	
	return (
		<>
		<div className={ styles.ProductsBox }>
			{ userWalletData.productsPurchased.map((item) => (
				REACTIONPRODUCTS.filter((elemnt) => elemnt.id === item.productID).map(((product, index) => (
					<div key={index} className={ styles.ProductBlock }>
						<img src={product.preview} alt={product.name} />
						<div className={ styles.ImportantInfo }>
							<span className={ styles.ProductName }>{product.name}</span>
							<div 
								className={ styles.ProductInclude }
							>
								{product.include.map((productEmoji, includeIndex) => (
									<span
										key={includeIndex}
										className={ styles.ProductIncludeItem }
										data-active={item.productItemSelectedID[includeIndex]}
										onClick={() => changeSelectedItem(item.productID, includeIndex)}
									>
										{productEmoji}
									</span>
								))}
							</div>
						</div>
					</div>
				)))
			)) }
		</div>
			<div 
				className={ styles.DoneBtn }
			>
				<StandartButton
					text={'Done'}
					setValue={addExtraEmoji}
				/>
			</div>
		</>
	)
}