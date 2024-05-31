'use client'

import { TwitterCloseSvg } from '@/assets/svg/TwitterSvg'
import styles from './Search.module.css'
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { PostItem } from '@/components/PostItem/PostItem';
import { typePostItem } from '@/types/PostItem';

export const postsData: typePostItem[] = [];

export function Search(): JSX.Element {
	const [posts, setPosts] = useLocalStorage({
        key: 'postsData',
        defaultValue: postsData,
    });
	const [searchValue, setSearchValue] = useState('');
	
	return (
		<>
		<div className={ styles.TWsearchBar }>
			<input 
				type="text"
				placeholder='Search'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{ searchValue.length > 0 ? 
				<div 
					className={ styles.TWclearBtn }
					onClick={() => setSearchValue('')}
				>
					<TwitterCloseSvg />
				</div> : '' 
			}
		</div>
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