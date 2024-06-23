import { useEffect, useState } from 'react';
import styles from './PopupModalMenu.module.scss'

export function PopupModalMenu({ setIsActive, children, translateY = 0, translateX = 0, top = '', left = '' }: IModalMenuProps): JSX.Element {
	const [isVisible, setIsVisible] = useState(false);
	
	useEffect(() => {
		  setIsVisible(true)
	  }, []);

	  const closeModalMenu = () => {
		setIsVisible(false);
		setTimeout(() => setIsActive(false), 300)
	  }
	
	return (
		<div 
			className={`${styles.ShadowModal} ${isVisible ? styles.visible : ''}`}
			onClick={() => closeModalMenu()}
			style={{
				position: top === '' ? 'absolute' : 'fixed',
				top: `${top}%`
			}}
		>
			<div 
				className={`${styles.ModalMenu} ${isVisible ? styles.visible : ''}`}
				onClick={(e) => e.stopPropagation()}
				style={{
					transform: `translateX(${translateX}%) translateY(${translateY}%)`,
					left: left,		
				}}
			>
				{ children }
				<button 
					onClick={() => closeModalMenu()}
					className={ styles.CloseBtn }
				>
					Close
				</button>
			</div>
		</div>
	)
}