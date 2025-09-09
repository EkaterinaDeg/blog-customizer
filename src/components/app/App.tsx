import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [settings, setSettings] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}
		>
			<ArticleParamsForm applySettings={setSettings} />
			<Article />
		</main>
	);
};