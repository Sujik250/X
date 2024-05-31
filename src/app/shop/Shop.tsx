'use client'

import { useState } from 'react';
import styles from './Shop.module.css'
import { TwitterCloseSvg } from '@/assets/svg/TwitterSvg';
import { ReactionCollection } from './ReactionCollection/ReactionCollection';
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu';

export function Shop(): JSX.Element {
	const [searchValue, setSearchValue] = useState('');
	const [promoCodeValue, setPromoCodeValue] = useState('');
	const [isModalPromoCodeActive, setIsModalPromoCodeActive] = useState(false);

	const checkPromoCode = () => {
		
	}

	return (
		<>
		<div className={ styles.ShopHeader }>
			<input 
				type="text"
				placeholder='Search' 
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{ searchValue.length > 0 ? 
				<div 
					className={ styles.TWclearBtn }
					onClick={() => setSearchValue('')}
				>
					<TwitterCloseSvg />
				</div> : '' 
			}
		</div>
		<div className={ styles.AllCategoryProduct }>
			<div className={ styles.Collections }>
				<div className={ styles.CollectionsInfo }>
					<span>Reaction Packs</span>
					<span className={ styles.ShowAll }>Show All</span>
				</div>
				<ReactionCollection searchValue={searchValue} />
			</div>
		</div>
		<div className={ styles.PromoCodeBtn }>
			<button 
				onClick={() => setIsModalPromoCodeActive(!isModalPromoCodeActive)}
			>
				Enter PromoCode
			</button>
		</div>
		{ isModalPromoCodeActive && (
			<StandartModalMenu
				isActive={isModalPromoCodeActive} 
				setIsActive={setIsModalPromoCodeActive}
				top={20}
				left={0}
			>
				<div className={ styles.ModalMenuPromoCode }>
					<div className={ styles.InsideMenu }>
						<span className={ styles.ClueText }>Using Promo Codes you can get XCoins and more</span>
						<input 
							type="text" 
							placeholder='XXXXX-XXXXX-XXXXX'
							value={promoCodeValue}
							maxLength={17}
							onChange={(e) => setPromoCodeValue(e.target.value)}
						/>
						<button className={ styles.Done }>Done</button>
					</div>
				</div>
			</StandartModalMenu>
		)}
		</>
	)
}