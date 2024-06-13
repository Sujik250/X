'use client'

import { useState } from 'react';
import styles from './Shop.module.scss'
import { ReactionCollection, userWalletData } from './ReactionCollection/ReactionCollection';
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu';
import { PROMOCODES } from '@/data/PromoCodes';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Notification } from '@/components/ui/Notification/Notification';
import { Input } from '@/components/ui/Fields/Input/Input';
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton';
import { ModernInput } from '@/components/ui/Fields/ModernInput/ModernInput';

export function Shop(): JSX.Element {
	const [userWallet, setUserWallet] = useLocalStorage({
        key: 'userWalletData',
        defaultValue: userWalletData,
    });

	const [searchValue, setSearchValue] = useState('');
	const [promoCodeValue, setPromoCodeValue] = useState('');
	const [isModalPromoCodeActive, setIsModalPromoCodeActive] = useState(false);
	const [isNotificationPromoActive, setIsNotificationPromoActive] = useState(false);

	const enteringPromoCode = (value: string) => {
		value = value.replace(/[^a-zA-Z0-9]/g, '');

		let formattedValue = '';
		for (let i = 0; i < value.length; i += 5) {
			if (formattedValue) {
				formattedValue += '-';
			}
			formattedValue += value.substring(i, i + 5);
		}

		setPromoCodeValue(formattedValue);
	}

	const checkPromoCode = () => {
		const findIndex = PROMOCODES.findIndex((code) => code.code.toLowerCase() === promoCodeValue.toLowerCase())
		
		if (findIndex >= 0) {
			setUserWallet({
                ...userWallet,
                wallet: userWallet.wallet + PROMOCODES[findIndex].coins
            })
			setIsModalPromoCodeActive(false)
		} else {
			setIsNotificationPromoActive(!isNotificationPromoActive)
		}
	}

	return (
		<>
		<Input
			type={'text'}
			placeholder='Search'
			fieldValue={searchValue}
			setFieldValue={setSearchValue}
		/>
		<div className={ styles.AllCategoryProduct }>
			<div className={ styles.Collections }>
				<div className={ styles.Collection }>
					<div className={ styles.CollectionsInfo }>
						<span>Reaction Packs</span>
						<span className={ styles.ShowAll }>Show All</span>
					</div>
					<ReactionCollection 
						searchValue={searchValue} 
						userWallet={userWallet}
						setUserWallet={setUserWallet}
					/>
				</div>
			</div>
		</div>
		<div className={ styles.PromoCodeBtn }>
			<StandartButton
			    text={'Enter PromoCode'}
				setValue={() => setIsModalPromoCodeActive(true)}
			/>
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
						<ModernInput
							type={'text'}
							placeholder={'XXXXX-XXXXX-XXXXX'}
							maxLength={17}
							fieldValue={promoCodeValue}
							setFieldValue={enteringPromoCode}
						/>
						<StandartButton
							text={'Done'}
							setValue={checkPromoCode}
						/>
					</div>
				</div>
			</StandartModalMenu>
		)}
		{ isNotificationPromoActive && (
			<Notification 
				setIsNotificationActive={setIsNotificationPromoActive}
				NotificationText='This code does not Exist!'
			/>
		) }
		</>
	)
}