'use client'

import styles from './Search.module.scss'
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PostItem } from '@/components/PostItem/PostItem';
import { typePostItem } from '@/types/PostItem';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/Fields/Input/Input';

export const postsData: typePostItem[] = [];

export function Search(): JSX.Element {
	const path = usePathname()

	const [posts, setPosts] = useLocalStorage({
        key: 'postsData',
        defaultValue: postsData,
    });
	const [searchValue, setSearchValue] = useState('');
	
	useEffect(() => {
		const pathValue = path.slice(12, path.length)
		if (path.slice(8, 12) === 'htg=') {
			const hashTagValue = '#'+path.slice(12, path.length)
			setSearchValue(hashTagValue)
		} else {
			setSearchValue(pathValue)
		}
	}, []);

	return (
		<>
		<Input 
			type={'text'}
			placeholder='Search'
			fieldValue={searchValue}
			setFieldValue={setSearchValue}
		/>
		{ searchValue.length > 0 && (
			<div className={ styles.TWpostsSearchResult }>
				<PostItem 
					searchValue={searchValue}
					posts={posts}
					setPosts={setPosts}
				/>
			</div>
		)}
		</>
	)
}