import { REACTIONPRODUCTS } from '@/data/ReactionCollection'
import styles from './ReactionCollection.module.css'
import { useState } from 'react';
import { ProductBuyMenu } from './ProductBuyMenu/ProductBuyMenu';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Notification } from '@/components/ui/Notification/Notification';

export const userWalletData: typeUserWalletData = {
	wallet: 0,
	productsPurchased: [],
}

export function ReactionCollection({ searchValue }: typeCollectionProps): JSX.Element {
	const [userWallet, setUserWallet] = useLocalStorage({
        key: 'userWalletData',
        defaultValue: userWalletData,
    });

	const [isModalActive, setIsModalActive] = useState<boolean[]>(Array(REACTIONPRODUCTS.length).fill(false));
	const [isNotificationActive, setIsNotificationActive] = useState(false);

	const toggleIsModalActive = (index: number) => {
        const copy = [...isModalActive];
        copy[index] = !copy[index];
        setIsModalActive(copy);
    }

	const buyProduct = (index: number) => {
		const userWalletDataLS = localStorage.getItem('userWalletData');

		if (userWalletDataLS) {
			if (userWallet.wallet >= Math.floor(REACTIONPRODUCTS[index].priceInfo.price * (1 - REACTIONPRODUCTS[index].priceInfo.discount / 100))) {
				setUserWallet((
					{
                        ...userWallet,
                        wallet: userWallet.wallet - Math.floor(REACTIONPRODUCTS[index].priceInfo.price * (1 - REACTIONPRODUCTS[index].priceInfo.discount / 100)),
                        productsPurchased: [
                            ...userWallet.productsPurchased,
                            {
                                productID: REACTIONPRODUCTS[index].id,
								productItemSelectedID: Array(REACTIONPRODUCTS[index].include.length).fill(false),
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
			{REACTIONPRODUCTS.reduce((acc: JSX.Element[], item, index) => {
				if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
					acc.push(
						<div key={index} className={styles.ProductBlock} onClick={() => toggleIsModalActive(index)}>
							<img src={item.preview} alt={item.name} />
							<div className={styles.ProductInfo}>
								<span className={styles.ProductName}>{item.name}</span>
								{userWallet.productsPurchased.some((product) => product.productID === item.id)
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
							{isModalActive[index] && (
								<ProductBuyMenu
									index={index}
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