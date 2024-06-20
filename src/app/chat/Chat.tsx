'use client'

import { ChatGenerator } from '@/components/ChatGenerator/ChatGenerator'
import styles from './Chat.module.scss'
import { TwitterAddPostSvg, TwitterCloseSvg } from '@/assets/svg/TwitterSvg'
import { useState } from 'react';
import { StandartModalMenu } from '@/components/ui/ModalMenus/StandartModalMenu/StandartModalMenu';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TextArea } from '@/components/ui/Fields/TextArea/TextArea';
import { StandartButton } from '@/components/ui/Buttons/StandartButton/StandartButton';
import { ModernInput } from '@/components/ui/Fields/ModernInput/ModernInput';

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
		setIsModalActive(false)
	}

	return (
		<>
		<div className={ styles.Chats }>
			<ChatGenerator chats={chats}/>
		</div>
		<div className={ styles.AddNewChat }>
			<StandartButton
				text={<TwitterAddPostSvg/>}
				setValue={() => setIsModalActive(!isModalActive)}
			/>
		</div>
		{ isModalActive 
		  ? <StandartModalMenu 
		  		isActive={isModalActive} 
				setIsActive={setIsModalActive}
				top={20}
				left={0}
			>
				<div className={ styles.ModalMenuMain }>
					<ModernInput 
						type={'number'}
						placeholder={'Enter User Number'}
						fieldValue={inputValue}
						setFieldValue={setInputValue}
					/>
					<div className={ styles.extraBlock }>
						<TextArea
							maxLength={500}
							fieldValue={textAreaValue}
							placeholder={'Enter Message'}
							setFieldValue={setTextAreaValue}
						/>
						<span className={ styles.Clue }>By entering the number, you can get in touch with a random user</span>
						{ inputValue.length > 0 && textAreaValue.length > 0 
							? <StandartButton
								text={'Add Chat'}
								setValue={addNewChat}
							  /> : '' }
					</div>
				</div>
			</StandartModalMenu>
		  : ''
		}
		</>
	)
}