import { useEffect, useState } from 'react';
import styles from './StandartModalMenu.module.scss'

export function StandartModalMenu({ setIsActive, children, translateY = 0, translateX = 0, top = '', left = '' }: IModalMenuProps): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	
	useEffect(() => {
		  setIsVisible(true)
	  }, []);
	
	return (
		<div 
			className={`${styles.ShadowModal} ${isVisible ? styles.visible : ''}`}
			onClick={() => {
				setIsVisible(false)
				setTimeout(() => setIsActive(false), 200);
			}}
			style={{
				position: top === '' ? 'absolute' : 'fixed',
				top: `${top}%`
			}}
		>
			<div 
				className={`${ styles.ModalMenu } ${isVisible ? styles.visible : ''}`}
				onClick={(e) => e.stopPropagation()}
				style={{
					transform: `translateX(${translateX}%) translateY(${translateY}%)`,
					left: left,		
				}}
			>
				{ children }
			</div>
		</div>
	)
}