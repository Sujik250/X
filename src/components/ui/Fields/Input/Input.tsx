import { TwitterCloseSvg } from '@/assets/svg/TwitterSvg';
import styles from './Input.module.scss'

export function Input({ type, placeholder, fieldValue, maxLength, setFieldValue }: TFieldProps): JSX.Element {
	return (
		<div className={ styles.InputBar }>
			<input 
				className={ styles.Field }
				type={type}
				placeholder={placeholder}
				value={fieldValue}
				maxLength={maxLength}
				onChange={(e) => setFieldValue(e.target.value)}
			/>
			{ fieldValue && fieldValue.length > 0 ? 
				<div 
					className={ styles.TWclearBtn }
					onClick={() => setFieldValue('')}
				>
					<TwitterCloseSvg />
				</div> : '' 
			}
		</div>
	)
}