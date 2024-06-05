import styles from './StandartModalMenu.module.scss'

export function StandartModalMenu({ setIsActive, children, translateY = 0, translateX = 0, top = '', left = '' }: typeModalMenuProps): JSX.Element {
	return (
		<div 
			className={ styles.ShadowModal } 
			onClick={() => setIsActive(false)}
			style={{
				position: top === '' ? 'absolute' : 'fixed',
				top: `${top}%`
			}}
		>
			<div 
				className={ styles.ModalMenu }
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