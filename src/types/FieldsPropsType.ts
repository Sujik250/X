type IFieldProps = {
	fieldValue?: string;
	type?: string;
	placeholder?: string;
	maxLength?: number;
	setFieldValue: React.Dispatch<React.SetStateAction<string | number>> | ((value: string) => void);
}