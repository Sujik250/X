'use client'

import styles from './ChatMenu.module.css'
import { useParams } from 'next/navigation'
import { TwitterBackSvg, TwitterMessageDeliveredSvg, TwitterSendSvg } from '@/assets/svg/TwitterSvg'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { chatsData } from '../Chat'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function ChatMenu(): JSX.Element {
	const [chats, setChats] = useLocalStorage({
        key: 'chatData',
        defaultValue: chatsData,
    });

	const params = useParams()
	const router = useRouter()
	const [textAreaValue, setTextAreaValue] = useState('');

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

	const sendMessage = () => {
		const date = new Date()
		const newMessage = {
			yourMessage: false,
			message: textAreaValue, 
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

	return (
		<>
		{ (chats.filter((e) => e.name === params.UserName))
		.map((item: typeChatData, index) => (
			<div className={ styles.MainSection } key={index}>
				<div className={ styles.ChatHeader } key={index}>
					<div className={ styles.BackButton } onClick={() => router.back()}>
						<TwitterBackSvg />
					</div>
					<img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg' alt={item.name as string} />
					<div className={ styles.UserInfo }>
						<span className={ styles.UserName }>{params.UserName === 'Anonymous_0' ? 'XOwner' : params.UserName}</span>
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
								<span>{elemnt.message}</span>
								<span className={ styles.MessageInfo }>{elemnt.date}</span>
							</div>
						</div>
					))}
				</div>
				<div className={ styles.CreateMessage }>
					<textarea value={textAreaValue} placeholder='Message' onChange={(e) => setTextAreaValue(e.target.value)} />
					{ textAreaValue.length > 0 
					? <div className={ styles.SendButton } onClick={() => { 
						sendMessage()
						setTextAreaValue('')
					}}>
						<TwitterSendSvg/>
					</div> : '' }
				</div>
			</div>
		)) }
		</>
	)
}