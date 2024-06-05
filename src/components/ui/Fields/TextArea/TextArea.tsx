import styles from '../Input/input.module.scss'

export function TextArea({ maxLength, placeholder, fieldValue, setFieldValue }: TFieldProps): JSX.Element {
	return (
		<textarea 
			className={ styles.Field }
			value={fieldValue}
			maxLength={maxLength}
			placeholder={placeholder}
			onChange={(e) => setFieldValue(e.target.value)}
		/>
	)
}