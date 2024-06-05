import styles from './StandartButton.module.scss'

interface IButtonProps {
	text: string| JSX.Element;
	setValue: () => void;
}

export function StandartButton({ text, setValue }: IButtonProps): JSX.Element {
	return (
		<button
			className={ styles.StandartButton }
			onClick={setValue}
		>
			<span>{text}</span>
		</button>
	)
}