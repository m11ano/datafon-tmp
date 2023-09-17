import { memo, useCallback } from 'react';
import { menuList } from 'app/const/menu';
import classNames from 'classnames';

interface HeaderProps {
    className?: string;
}

const toogleBurgerClass = (value?: boolean) => {
    const root = document.body;
    const className = 'burger-menu-opened';

    if (root) {
        if (value === false || root.classList.contains(className)) {
            root.classList.remove(className);
        } else if (value === true || !root.classList.contains(className)) {
            root.classList.add(className);
        }
    }
};

export const Header = memo(function Header(props: HeaderProps) {
    const { className } = props;

    const onMenuClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const id = Number(e.currentTarget.dataset.id);
            if (menuList[id] !== undefined) {
                toogleBurgerClass(false);
                console.log(menuList[id].title);
            }
        },
        [],
    );

    const onBurgerClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            toogleBurgerClass();
        },
        [],
    );

    return (
        <header className={className ? classNames([className]) : undefined}>
            <div className="std-wrapper">
                <div className="block-top">
                    Надежный и устойчивый высокоскоростной доступ к сети
                    Интернет, а также телевидение, видеонаблюдение, телефон,
                    умный дом, охранная сигнализация и другое.
                </div>
                <div className="block-menu">
                    <div className="logo"></div>
                    <div className="menu">
                        {menuList.map((link, i) => (
                            <a
                                href="#"
                                key={i}
                                data-id={i}
                                onClick={onMenuClick}
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                    <div className="mobile-menu">
                        <div className="burger">
                            <a href="#" onClick={onBurgerClick}>
                                <span>&nbsp;</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="block-mobile-menu">
                    {menuList.map((link, i) => (
                        <a href="#" key={i} data-id={i} onClick={onMenuClick}>
                            {link.title}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
});
