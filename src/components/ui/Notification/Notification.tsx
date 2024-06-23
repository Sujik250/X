import { useEffect, useState } from 'react';
import styles from './Notification.module.scss'

interface INotificationProps {
	NotificationText: string;
	setIsNotificationActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Notification({ NotificationText, setIsNotificationActive }: INotificationProps): JSX.Element {
	const [isVisibleNotification, setIsVisibleNotification] = useState(false);
	
    useEffect(() => {
        setIsVisibleNotification(true);

        const timeout = setTimeout(() => {
            setIsVisibleNotification(false);
            setTimeout(() => setIsNotificationActive(false), 100);
        }, 2500);

        return () => clearTimeout(timeout);
    }, [setIsNotificationActive]);
	
	return (
		<div 
			className={`${ styles.ShadowModal } ${ isVisibleNotification ? styles.visible : '' }`}
		>
			<div 
				className={ styles.NotificationBlock }
			>
				{ NotificationText }
			</div>
		</div>
	)
}