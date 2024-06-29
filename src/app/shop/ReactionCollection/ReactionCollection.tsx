import styles from './ReactionCollection.module.scss'
import { useState } from 'react';
import { ProductBuyMenu } from './ProductBuyMenu/ProductBuyMenu';
import { Notification } from '@/components/ui/Notification/Notification';

export const userWalletData: TUserWalletData = {
	wallet: 0,
	productsPurchased: [],
}

interface IReactionCollectionProps {
	products: TReactinData[]
	searchValue: string;
	userWallet: TUserWalletData
	setUserWallet: React.Dispatch<React.SetStateAction<TUserWalletData>>
}

export function ReactionCollection({ products, userWallet, setUserWallet, searchValue }: IReactionCollectionProps): JSX.Element {
	const [isModalActive, setIsModalActive] = useState<boolean[]>(Array(products.length).fill(false));
	const [isNotificationActive, setIsNotificationActive] = useState(false);

	const toggleIsModalActive = (index: number) => {
        const copy = [...isModalActive];
        copy[index] = !copy[index];
        setIsModalActive(copy);
    }

	const buyProduct = (index: number) => {
		const userWalletDataLS = localStorage.getItem('userWalletData');
		const currentProduct = products.filter(p => p.id === index)[0]

		if (userWalletDataLS) {
			if (userWallet.wallet >= Math.floor(currentProduct.priceInfo.price * (1 - currentProduct.priceInfo.discount / 100))) {
				setUserWallet((
					{
                        ...userWallet,
                        wallet: userWallet.wallet - Math.floor(currentProduct.priceInfo.price * (1 - currentProduct.priceInfo.discount / 100)),
                        productsPurchased: [
                            ...userWallet.productsPurchased,
                            {
                                productID: currentProduct.id,
								productItemSelectedID: currentProduct.category === 'Reaction Pack' ? Array(currentProduct.include.length).fill(false) : [],
							}
                        ]
                    }
				))
			} else {
				setIsNotificationActive(true)
			}
		} else {
			setUserWallet({
				wallet: 0,
				productsPurchased: [],
			})
		}
	}

	return (
		<>
		<div className={styles.ReactionCollection}>
			{products.reduce((acc: JSX.Element[], item) => {
				if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
					acc.push(
						<div key={item.id} className={styles.ProductBlock} onClick={() => toggleIsModalActive(item.id)}>
							<img src={item.preview} alt={item.name} />
							<div className={styles.ProductInfo}>
								<span className={styles.ProductName}>{item.name}</span>
								{userWallet.productsPurchased.some(product => product.productID === item.id)
									? <span className={styles.AddedBlock}>Added</span>
									: (
										<>
											<span
												className={item.priceInfo.discount === 0
													? styles.ProductPrice
													: `${styles.ProductPrice} ${styles.ProductPriceDiscount}`}
											>
												{item.priceInfo.price} XCoins
											</span>
											<span
												className={item.priceInfo.discount !== 0
													? styles.ProductPrice
													: `${styles.ProductPrice} ${styles.ProductPriceDiscount}`}
												style={{
													display: item.priceInfo.discount !== 0 ? 'block' : 'none'
												}}
											>
												{item.priceInfo.discount === 100 ? 'Free' : `${Math.floor(item.priceInfo.price * (1 - item.priceInfo.discount / 100))} XCoins`}
											</span>
										</>
									)}
							</div>
							{isModalActive[item.id] && (
								<ProductBuyMenu
									product={products.filter(p => p.id === item.id)[0]}
									toggleIsModalActive={toggleIsModalActive}
									buyProduct={buyProduct}
									userWalletData={userWallet}
								/>
							)}
						</div>
					);
				}
				return acc;
			}, [])}
		</div>
		{ isNotificationActive && (
			<Notification 
				NotificationText="You don't have enough XCoins!"
				setIsNotificationActive={setIsNotificationActive}	
			/>
		) }
		</>
	);
}