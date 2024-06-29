import styles from './ExtraEmojiPackGenerator.module.scss'
import { StandartButton } from '../ui/Buttons/StandartButton/StandartButton';
import { SHOPPRODUCTS } from '@/data/ReactionCollection';

interface IExtraEmojiPackGeneratorProps {
	userWalletData: TUserWalletData;
	setUserWalletData: React.Dispatch<React.SetStateAction<TUserWalletData>>;
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
			const product = copy.productsPurchased[productIndex];
			if (product.productItemSelectedID) {
				product.productItemSelectedID[packIncludeID] 
				= !product.productItemSelectedID[packIncludeID]
				setUserWalletData(copy);
			}
		}
	}

	const addExtraEmoji = () => {
		const selectedIncludes: string[] = [];
		
		userWalletData.productsPurchased.forEach(product => {
			if (product?.productItemSelectedID?.some(selected => selected)) {
				const selectedProduct = SHOPPRODUCTS.find(prod => prod.id === product.productID);
				const selectedInclude = selectedProduct?.include.filter((_, index) => {
					if (product.productItemSelectedID !== undefined) {
					  return product.productItemSelectedID[index];
					}
					return false;
				});
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
			{ userWalletData.productsPurchased.map(item => (
				SHOPPRODUCTS.filter(elemnt => elemnt.id === item.productID  && elemnt.category === 'reaction').map((product => (
					<div key={product.id} className={ styles.ProductBlock }>
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
										data-active={item.productItemSelectedID !== undefined && item.productItemSelectedID[includeIndex]}
										onClick={() => changeSelectedItem(item.productID, includeIndex)}
									>
										{productEmoji as string}
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