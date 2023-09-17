import { ReactNode } from 'react';
import classNames from 'classnames';

interface HeaderProps {
    className?: string;
    children?: ReactNode;
}

export const Footer = (props: HeaderProps) => {
    const { className } = props;
    return <footer className={classNames([className])}>Подвал сайта!</footer>;
};
