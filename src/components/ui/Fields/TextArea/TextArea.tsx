import styles from './TextArea.module.scss'

export function TextArea({ maxLength, placeholder, fieldValue, setFieldValue }: TFieldProps): JSX.Element {
	return (
		<textarea 
			spellCheck='false'
			className={ styles.Field }
			value={fieldValue}
			maxLength={maxLength}
			placeholder={placeholder}
			onChange={(e) => setFieldValue(e.target.value)}
		/>
	)
}