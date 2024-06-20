import { REACTIONPRODUCTS } from '@/data/ReactionCollection'
import styles from './ProductBuyMenu.module.scss'
import { TwitterCloseSvg, TwitterMessageNotDeliveredSvg } from '@/assets/svg/TwitterSvg'
import { useAbbreviateNumber } from '@/hooks/useAbbreviateNumber'
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton'

interface IProductBuyMenuProps {
    index: number;
    toggleIsModalActive: (index: number) => void;
    buyProduct: (index: number) => void;
    userWalletData: TUserWalletData;
}

export function ProductBuyMenu({ index, toggleIsModalActive, buyProduct, userWalletData }: IProductBuyMenuProps): JSX.Element {
	return (
		<div className={ styles.BuyModalMenu } onClick={(e) => e.stopPropagation()}>
			<div className={ styles.Header }>
				<div className={ styles.HeaderInfo }>
					<div onClick={() => toggleIsModalActive(index)}>
						<TwitterCloseSvg />
					</div>
					<span className={ styles.ProductCategory }>{REACTIONPRODUCTS[index].category}</span>
				</div>
				<div className={ styles.XCoinsInfo }>
					<span className={ styles.CurrentXCoins }>{`${useAbbreviateNumber(userWalletData.wallet)} XCoins`}</span>
				</div>
			</div>
			<div className={ styles.ProductInfo }>
				<div className={ styles.ProductPreview }>
					<img src={REACTIONPRODUCTS[index].preview} alt={REACTIONPRODUCTS[index].name} />
					<span>{REACTIONPRODUCTS[index].name}</span>
				</div>
				<div className={ styles.ProductIncludeBlock }>
					<span>Product Include</span>
					<div className={ styles.ProductInclude }>
						{ REACTIONPRODUCTS[index].include.map((item, index) => (
							<span  key={index} className={ styles.ProductIncludeItem }>{item}</span>
						)) }
					</div>
				</div>
			</div>
			<div className={ styles.BuyBtnBlock }>
				{ userWalletData.productsPurchased.some((product) => product.productID === REACTIONPRODUCTS[index].id)
					?  <span className={ styles.AddedBlock }><TwitterMessageNotDeliveredSvg/> Added</span>
					: 
					<StandartButton
						setValue={() => buyProduct(index)}
						text={REACTIONPRODUCTS[index].priceInfo.discount !== 100 
								? 
								<>
								{`Buy for `}
								<span 
									className={ REACTIONPRODUCTS[index].priceInfo.discount === 0 
										? styles.ProductPrice
										: `${styles.ProductPrice} ${styles.ProductPriceDiscount}` 
									}
								>
									{REACTIONPRODUCTS[index].priceInfo.price}
								</span>
								<span 
									className={ REACTIONPRODUCTS[index].priceInfo.discount !== 0 
										? styles.ProductPrice
										: `${styles.ProductPrice} ${styles.ProductPriceDiscount}` 
									}
									style={{
										display: REACTIONPRODUCTS[index].priceInfo.discount !== 0 ? 'inline-block' : 'none'
									}}
									>
										{ REACTIONPRODUCTS[index].priceInfo.discount === 100 ? 'Free' : Math.floor(REACTIONPRODUCTS[index].priceInfo.price * (1 - REACTIONPRODUCTS[index].priceInfo.discount / 100))}
								</span>
								{` XCoins`}
								{ REACTIONPRODUCTS[index].priceInfo.discount !== 0 
									? <span className={ styles.CurrentDiscount }>
										{`${REACTIONPRODUCTS[index].priceInfo.discount}%`}
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