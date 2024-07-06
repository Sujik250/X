import styles from './ProductBuyMenu.module.scss'
import { TwitterCloseSvg, TwitterMessageNotDeliveredSvg } from '@/assets/svg/TwitterSvg'
import { useAbbreviateNumber } from '@/hooks/useAbbreviateNumber'
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton'
import { useEffect, useState } from 'react'

interface IProductBuyMenuProps {
	product: TReactinData
    toggleIsModalActive: (index: number) => void;
    buyProduct: (index: number) => void;
    userWalletData: TUserWalletData;
}

export function ProductBuyMenu({ product, toggleIsModalActive, buyProduct, userWalletData }: IProductBuyMenuProps): JSX.Element {
	const [isVisibleBuyMenu, setisVisibleBuyMenu] = useState(false);
	
	useEffect(() => {
		setisVisibleBuyMenu(!isVisibleBuyMenu);
	}, []);
	
	return (
		<div className={`${ styles.BuyModalMenu } ${ isVisibleBuyMenu ? styles.visible : '' }`} onClick={(e) => e.stopPropagation()}>
			<div className={ styles.Header }>
				<div className={ styles.HeaderInfo }>
					<div onClick={() => {
						setisVisibleBuyMenu(!isVisibleBuyMenu)
						setTimeout(() => toggleIsModalActive(product.id), 100)
					}}>
						<TwitterCloseSvg />
					</div>
					<span className={ styles.ProductCategory }>{product.category === 'reaction' ? 'Reaction Pack' : 'Sticker Pack'}</span>
				</div>
				<div className={ styles.XCoinsInfo }>
					<span className={ styles.CurrentXCoins }>{`${useAbbreviateNumber(userWalletData.wallet)} XCoins`}</span>
				</div>
			</div>
			<div className={ styles.ProductInfo }>
				<div className={ styles.ProductPreview }>
					<img src={product.preview} alt={product.name} />
					<span>{product.name}</span>
				</div>
				<div className={ styles.ProductIncludeBlock }>
					<span>Product Include</span>
					<div className={ styles.ProductInclude }>
						{ product.include.map((item, index) => (
							product.category === 'sticker' && typeof item !== 'string'
								? <img 
									key={index}
									className={ styles.ProductIncludeItem } 
									src={item.sticker} 
									alt={item.miniature} />
								: <span key={index} className={ styles.ProductIncludeItem }>{item as string}</span>
						)) }
					</div>
				</div>
			</div>
			<div className={ styles.BuyBtnBlock }>
				{ userWalletData.productsPurchased.some(p => p.productID === product.id)
					?  <span className={ styles.AddedBlock }><TwitterMessageNotDeliveredSvg/> Added</span>
					: 
					<StandartButton
						setValue={() => buyProduct(product.id)}
						text={product.priceInfo.discount !== 100 
								? 
								<>
								{`Buy for `}
								<span 
									className={ product.priceInfo.discount === 0 
										? styles.ProductPrice
										: `${styles.ProductPrice} ${styles.ProductPriceDiscount}` 
									}
								>
									{product.priceInfo.price}
								</span>
								<span 
									className={ product.priceInfo.discount !== 0 
										? styles.ProductPrice
										: `${styles.ProductPrice} ${styles.ProductPriceDiscount}` 
									}
									style={{
										display: product.priceInfo.discount !== 0 ? 'inline-block' : 'none'
									}}
									>
										{ product.priceInfo.discount === 100 ? 'Free' : Math.floor(product.priceInfo.price * (1 - product.priceInfo.discount / 100))}
								</span>
								{` XCoins`}
								{ product.priceInfo.discount !== 0 
									? <span className={ styles.CurrentDiscount }>
										{`${product.priceInfo.discount}%`}
									</span> 
									: '' 
								}
								</> : 'Free'}
					/>
				}

			</div>
		</div>
	)
}