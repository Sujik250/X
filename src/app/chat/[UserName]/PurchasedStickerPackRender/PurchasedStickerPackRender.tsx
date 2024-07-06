import { SHOPPRODUCTS } from '@/data/ReactionCollection'
import styles from './PurchasedStickerPackRender.module.scss'

interface IPurchasedStickerPackRenderProps {
	userWalletData: TUserWalletData
	sendMessage: (messageTxt: string) => void
	setIsModalStickerActive: (isModalStickerActive: boolean) => void
}

export function PurchasedStickerPackRender({ userWalletData, sendMessage, setIsModalStickerActive }: IPurchasedStickerPackRenderProps): JSX.Element {
	return (
		<div className={ styles.ProductsBox }>
			{ userWalletData.productsPurchased.map(item => (
				SHOPPRODUCTS.filter(elemnt => elemnt.id === item.productID  && elemnt.category === 'sticker').map((product => (
					<div key={product.id} className={ styles.ProductBlock }>
						<img src={product.preview} alt={product.name} />
						<div className={ styles.ImportantInfo }>
							<span className={ styles.ProductName }>{product.name}</span>
							<div 
								className={ styles.ProductInclude }
							>
								{ product.include.map((productSticker, includeIndex) => (
									<img 
										key={includeIndex}
										className={ styles.ProductIncludeItem }
										src={ (productSticker as TStickerInclude).sticker }
										alt={ (productSticker as TStickerInclude).miniature }
										onClick={() => {
												sendMessage(`${(productSticker as TStickerInclude).miniature}${product.id}${includeIndex} Sticker`)
												setIsModalStickerActive(false)
											}
										}
									/>
								)) }
							</div>
						</div>
					</div>
				)))
			)) }
		</div>
	)
}