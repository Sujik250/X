import styles from './Loading.module.scss'

export function Loading(): JSX.Element {
	return (
		<div className={ styles.Loading }><div></div><div></div><div></div><div></div></div>
	)
}