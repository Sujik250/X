'use client'

import styles from './ChatMenu.module.scss'
import { useParams } from 'next/navigation'
import { TwitterBackSvg, TwitterSendSvg, TwitterStickerSvg } from '@/assets/svg/TwitterSvg'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { chatsData } from '../Chat'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { TextArea } from '@/components/ui/Fields/TextArea/TextArea'
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu'
import { userWalletData } from '@/app/shop/ReactionCollection/ReactionCollection'
import { PurchasedStickerPackRender } from './PurchasedStickerPackRender/PurchasedStickerPackRender'
import { SHOPPRODUCTS } from '@/data/ReactionCollection'

export function ChatMenu(): JSX.Element {
	const [chats, setChats] = useLocalStorage({
        key: 'chatData',
        defaultValue: chatsData,
    });

	const [userWallet, setUserWallet] = useLocalStorage({
        key: 'userWalletData',
        defaultValue: userWalletData,
    });

	const [isVisibleChatMenu, setisVisibleChatMenu] = useState(false);
	const [isModalStickerActive, setisModalStickerActive] = useState(false);

	const params = useParams()
	const router = useRouter()
	const [textAreaValue, setTextAreaValue] = useState('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setisVisibleChatMenu(true);
		}, 50);
	  
		  return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		setChats(prevChats => {
			return prevChats.map(chat => {
				if (chat.name === params.UserName) {
					return {
						...chat,
						messagesInfo: chat.messagesInfo.map(message => ({
							...message,
							checked: true,
							delivered: true
						}))
					};
				}
				return chat;
			});
		});
	}, [params.UserName, setChats]);

	const sendMessage = (messageTxt: string) => {
		if (messageTxt.replace(/\s/g, '').length > 0) {
			const date = new Date()
			const newMessage = {
				yourMessage: false,
				message: messageTxt, 
				checked: false,
				date: `${date.getHours()}:${date.getMinutes()}`,
				delivered: true,
			}
			setChats(prevChats => {
				const updatedChats = prevChats.map(chat => {
					if (chat.name === params.UserName) {
						return {
							...chat,
							messagesInfo: [...chat.messagesInfo, newMessage]
						}
					}
					return chat
				})
		
				return updatedChats
			})
		}
	}

	return (
		<>
		{ (chats.filter((e) => e.name === params.UserName))
		.map((item: TChatData, index) => (
			<div className={`${ styles.MainSection } ${ isVisibleChatMenu ? styles.visible : '' }`} key={index}>
				<div className={ styles.ChatHeader } key={index}>
					<div 
						className={ styles.BackButton } 
						onClick={() => {
							setisVisibleChatMenu(false)
							setTimeout(() => router.back(), 100)	
						}}
					>
						<TwitterBackSvg />
					</div>
					<img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg' alt={item.name as string} />
					<div className={ styles.UserInfo }>
						<span className={ styles.UserName }>
							{params.UserName === 'Anonymous_0' ? 'XOwner' : params.UserName}
						</span>
					</div>
				</div>
				<div className={ styles.Messages }>
					{item.messagesInfo.map((elemnt, index) => (
						<div 
							className={` ${styles.Message} 
							${elemnt.yourMessage 
								? styles.YourMessage 
								: styles.CompanionMessage} `} 
							key={index}
						>
							<div className={ styles.Message }>
								{
									elemnt.message.slice(5, elemnt.message.length) === 'Sticker' 
									? <img src={
										(SHOPPRODUCTS[Number(elemnt.message.slice(2, 3))]
										.include[Number((elemnt.message.slice(3, 4)))] as TStickerInclude)
										.sticker
									}
										alt={elemnt.message.slice(0, 2)} 
									/>
									: <span>{elemnt.message}</span>
								}
								<span className={ styles.MessageInfo }>{elemnt.date}</span>
							</div>
						</div>
					))}
				</div>
				<div className={ styles.CreateMessage }>
					<div 
						className={`
							${ styles.StickersMenu } 
							${ textAreaValue.length > 0 && styles.visible
						}`}
						onClick={() => setisModalStickerActive(true)}
					>
						<TwitterStickerSvg />
					</div> 
					<TextArea
						maxLength={500}
						placeholder={'Message'}
						fieldValue={textAreaValue}
						setFieldValue={setTextAreaValue}
					/>
					<div 
						className={`
								${ styles.SendButton } 
								${ textAreaValue.replace(/\s/g, '').length > 0 && styles.visible
							}`}
						onClick={() => { 
							sendMessage(textAreaValue)
							setTextAreaValue('')
						}}
					>
						<TwitterSendSvg/>
					</div> 
				</div>
				{ isModalStickerActive && (
					<StandartModalMenu
						setIsActive={setisModalStickerActive}
						left={0}
						top={20}
					>
						<PurchasedStickerPackRender
							userWalletData={userWallet}
							sendMessage={sendMessage}
							setIsModalStickerActive={() => setisModalStickerActive(!isModalStickerActive)}
						/>
					</StandartModalMenu>
				) }
			</div>
		)) }
		</>
	)
}