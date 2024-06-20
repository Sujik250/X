import styles from './TextSection.module.scss'

export function TextSection({ maxLength, placeholder, fieldValue, setFieldValue }: IFieldProps): JSX.Element {
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