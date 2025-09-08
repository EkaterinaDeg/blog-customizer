import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
  isOpen: boolean;
  onClick: OnClick;
  ariaControlsId?: string;
};

export const ArrowButton = ({ isOpen, onClick, ariaControlsId }: ArrowButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(styles.container, { [styles.container_open]: isOpen })}
      aria-label="Открыть/Закрыть форму параметров статьи"
      aria-expanded={isOpen}
      aria-controls={ariaControlsId}
      onClick={onClick}
    >
      <img
        src={arrow}
        alt=""
        className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
        aria-hidden
      />
    </button>
  );
};
