import { useEffect } from 'react';
import styles from './Notification.module.scss'

interface INotificationProps {
	NotificationText: string;
	setIsNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Notification({ NotificationText, setIsNotificationActive }: INotificationProps): JSX.Element {
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsNotificationActive(false);
		}, 2500);

		return () => clearTimeout(timeout);
	}, [setIsNotificationActive]);
	
	return (
		<div 
			className={ styles.ShadowModal } 
		>
			<div 
				className={ styles.NotificationBlock }
			>
				{ NotificationText }
			</div>
		</div>
	)
}