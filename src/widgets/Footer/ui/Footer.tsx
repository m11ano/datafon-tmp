import { memo } from 'react';
import classNames from 'classnames';

interface HeaderProps {
    className?: string;
}

export const Footer = memo(function Footer(props: HeaderProps) {
    const { className } = props;
    return (
        <footer className={className ? classNames([className]) : undefined}>
            <div className="std-wrapper">11</div>
        </footer>
    );
});
