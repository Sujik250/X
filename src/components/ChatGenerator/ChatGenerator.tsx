import { TwitterMessageDeliveredSvg, TwitterMessageNotDeliveredSvg } from '@/assets/svg/TwitterSvg'
import styles from './ChatGenerator.module.css'
import Link from 'next/link'

export function ChatGenerator({ chats }: typeChatGeneratorProps): JSX.Element {
	return (
		<>
		{chats.map((item: typeChatData, index: number) => (
			<div className={ styles.ChatBlock } key={index}>
				<Link href={`/chat/${item.name}`}>
					<div className={ styles.ChatInfo }>
						<img src='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg' alt={item.name as string} />
						<div className={ styles.MainInfo }>
							<span className={ styles.NameUser }>{item.name}</span>
							<span className={ styles.LastMessage }>{item.messagesInfo[item.messagesInfo.length - 1].message}</span>
						</div>
					</div>
					<div className={ styles.OtherInfo }>
						<div className={ styles.MessageInfo }>
							<div 
								className={ styles.StatusMessage } 
								data-check={ 
									(item.messagesInfo[item.messagesInfo.length - 1].checked && item.messagesInfo[item.messagesInfo.length - 1].delivered) ? 'true' : 'false' 
								}>
								{ item.messagesInfo[item.messagesInfo.length - 1].delivered ? <TwitterMessageDeliveredSvg /> : <TwitterMessageNotDeliveredSvg /> }
							</div>
							<span className={ styles.LastMessageDate }>{ item.messagesInfo[item.messagesInfo.length - 1].date }</span>
						</div>
						{ (item.messagesInfo.filter((e) => !e.checked && !e.yourMessage)).length > 0 &&					
						<div className={ styles.UnreadMessages }>
							<span>{ (item.messagesInfo.filter((e) => !e.checked && !e.yourMessage)).length }</span>
						</div>}
					</div>
				</Link>
			</div>
		))}
		</>
	)
}