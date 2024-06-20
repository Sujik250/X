type IModalMenuProps = {
	isActive: boolean,
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	children: JSX.Element;
	translateY?: number;
	translateX?: number;
	top?: number | string;
	left?: number | string;
}