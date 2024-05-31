'use client'

import { ChatGenerator } from '@/components/ChatGenerator/ChatGenerator'
import styles from './Chat.module.css'
import { TwitterAddPostSvg } from '@/assets/svg/TwitterSvg'
import { useState } from 'react';
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const chatsData: typeChatData[] = []

export function Chat(): JSX.Element {
	const [chats, setChats] = useLocalStorage({
        key: 'chatData',
        defaultValue: chatsData,
    });

	const [isModalActive, setIsModalActive] = useState(false);

	const [inputValue, setInputValue] = useState('');
	const [textAreaValue, setTextAreaValue] = useState('');

	const addNewChat = () => {
		const date = new Date()
		if (chats.some(chatName => chatName.name === `Anonymous_${inputValue}`)) {
			const newMessage = {
				yourMessage: true,
				message: textAreaValue, 
				checked: false,
				date: `${date.getHours()}:${date.getMinutes()}`,
				delivered: true,
			}
			setChats(prevChats => {
				const updatedChats = prevChats.map(chat => {
					if (chat.name === `Anonymous_${inputValue}`) {
						return {
							...chat,
							messagesInfo: [...chat.messagesInfo, newMessage]
						}
					}
					return chat
				})
		
				return updatedChats
			})
		} else {
			const newChat: typeChatData = {
				name: `Anonymous_${inputValue}`,
				messagesInfo: [
					{
						yourMessage: true,
						message: textAreaValue, 
						checked: false,
						date: `${date.getHours()}:${date.getMinutes()}`,
						delivered: true,
					},
				]
			}
			setChats(prevChats => [newChat, ...prevChats])
		}
	}

	return (
		<>
		<ChatGenerator chats={chats}/>
		<button 
			className={ styles.AddNewChat }
			onClick={() => setIsModalActive(!isModalActive)}
		>
			<TwitterAddPostSvg/>
		</button>
		{ isModalActive 
		  ? <StandartModalMenu 
		  		isActive={isModalActive} 
				setIsActive={setIsModalActive}
				top={20}
				left={0}
			>
				<div className={ styles.ModalMenuMain }>
					<input 
						className={ styles.Field }
						type="number" 
						placeholder='Enter random Number'
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<textarea 
						className={ styles.Field }
						placeholder='Enter Message'
						onChange={(e) => setTextAreaValue(e.target.value)}
					/>
					<span className={ styles.Clue }>By entering the number, you can get in touch with a random user</span>
					{ inputValue.length > 0 && textAreaValue.length > 0 
						? <button 
							className={ styles.AddChatBtn }
							onClick={() => {
								addNewChat()
								setIsModalActive(false)
							}}
						>
							Add Chat
						</button> : '' }
				</div>
			</StandartModalMenu>
		  : ''
		}
		</>
	)
}