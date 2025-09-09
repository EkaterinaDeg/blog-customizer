import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	OptionType,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { useCloseForm } from 'src/components/hooks/CloseForm';

type ArticleParamsFormProps = {
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ applySettings }: ArticleParamsFormProps) => {
	const [formIsOpened, setFormIsOpened] = useState(false);
	const [formSettings, setFormSettings] = useState<ArticleStateType>(defaultArticleState);
	const refForm = useRef<HTMLFormElement>(null);

	const { backgroundColor, contentWidth, fontColor, fontFamilyOption, fontSizeOption } = formSettings;

	const toggleForm = () => setFormIsOpened((opened) => !opened);

	const updateFormSettings = (newSettings: Partial<ArticleStateType>) => {
		setFormSettings((prev) => ({ ...prev, ...newSettings }));
	};

	// универсальный обработчик для всех Select
	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			updateFormSettings({ [field]: value });
		};
	};

	const resetFormSettings = () => {
		setFormSettings(defaultArticleState);
		applySettings(defaultArticleState);
		toggleForm();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applySettings(formSettings);
		toggleForm();
	};

	useCloseForm({
		isOpen: formIsOpened,
		refForm: refForm,
		onClose: () => setFormIsOpened(false),
	});

	return (
		<>
			<ArrowButton isOpen={formIsOpened} onClick={toggleForm} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formIsOpened,
				})}
			>
				<form className={styles.form} onSubmit={handleSubmit} ref={refForm}>
					<Text as="h2" size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title="Шрифт"
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOnChange('fontFamilyOption')}
					/>

					<RadioGroup
						name="font-size"
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
						title="Размер шрифта"
					/>

					<Select
						title="Цвет шрифта"
						selected={fontColor}
						options={fontColors}
						onChange={handleOnChange('fontColor')}
					/>

					<Separator />

					<Select
						title="Цвет фона"
						selected={backgroundColor}
						options={backgroundColors}
						onChange={handleOnChange('backgroundColor')}
					/>

					<Select
						title="Ширина контента"
						selected={contentWidth}
						options={contentWidthArr}
						onChange={handleOnChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title="Сбросить"
							htmlType="reset"
							type="clear"
							onClick={resetFormSettings}
						/>
						<Button title="Применить" htmlType="submit" type="apply" />
					</div>
				</form>
			</aside>
		</>
	);
};