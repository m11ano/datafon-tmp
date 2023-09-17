import { ReactNode } from 'react';
import classNames from 'classnames';

interface HeaderProps {
    className?: string;
    children?: ReactNode;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;
    return <header className={classNames([className])}>Шапка сайта!</header>;
};
