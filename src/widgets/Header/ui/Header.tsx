import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { menuList } from 'app/const/menu';
import classNames from 'classnames';
import { windowScrollToBlock } from 'shared/lib/scroll/scroll';

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

    const blockMenuWrapperRef = useRef<HTMLDivElement>(null);
    const blockMenuRef = useRef<HTMLDivElement>(null);

    const [isFixed, setIsFixed] = useState<Boolean>(false);
    const [linkMarked, setLinkMarked] = useState<number>(-1);

    const blockScroll = useRef<boolean>(false);
    const blockScrollTarget = useRef<number>(-1);

    const onMenuClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const id = Number(e.currentTarget.dataset.id);
            if (menuList[id] !== undefined) {
                toogleBurgerClass(false);
                windowScrollToBlock(
                    menuList[id].scrollTarget,
                    window.innerWidth >= 1200 ? 120 : 50,
                );
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

    useEffect(() => {
        const checkScroll = () => {
            if (blockMenuWrapperRef.current) {
                if (
                    window.pageYOffset >
                    blockMenuWrapperRef.current.getBoundingClientRect().top +
                        window.pageYOffset
                ) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }

            let m = -1;
            let hs = Math.round(window.innerHeight * 0.2);
            let res = 0;

            menuList.forEach((b, i) => {
                let top = 0;
                let height = 0;

                if (typeof b.scrollSelector == 'string') {
                    let bf = document.getElementById(b.scrollSelector);
                    if (bf !== null) {
                        let cords = bf.getBoundingClientRect();
                        top = cords.top;
                        height = cords.bottom - top;
                    } else {
                        return;
                    }
                } else {
                    const e1 = document.getElementById(b.scrollSelector[0]);
                    const e2 = document.getElementById(b.scrollSelector[1]);

                    if (e1 && e2) {
                        top = e1.getBoundingClientRect().top;
                        height = e2.getBoundingClientRect().bottom - top;
                    } else {
                        return;
                    }
                }

                let v = top + height;

                if (v > window.innerHeight) {
                    v = window.innerHeight;
                }

                if (top > 0) {
                    v = v - top;
                }

                let is_visible = v >= hs ? true : false;

                if (is_visible && v > res) {
                    res = v;
                    m = i;
                }
            });

            if (
                blockScroll.current == false ||
                (blockScroll.current && blockScrollTarget.current == m)
            ) {
                blockScroll.current = false;
                blockScrollTarget.current = -1;
                setLinkMarked(m);
            }
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll();

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    return (
        <header className={classNames([className], { fixed: isFixed })}>
            <div className="block-top">
                <div className="std-wrapper">
                    Надежный и устойчивый высокоскоростной доступ к сети
                    Интернет, а также телевидение, видеонаблюдение, телефон,
                    умный дом, охранная сигнализация и другое.
                </div>
            </div>
            <div className="block-menu-wrapper" ref={blockMenuWrapperRef}>
                <div>
                    <div className="std-wrapper">
                        <div className="block-menu" ref={blockMenuRef}>
                            <div className="logo"></div>
                            <div className="menu">
                                {menuList.map((link, i) => (
                                    <a
                                        href="#"
                                        key={i}
                                        data-id={i}
                                        onClick={onMenuClick}
                                        className={
                                            linkMarked === i
                                                ? 'marked'
                                                : undefined
                                        }
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
            <div className="block-contacts">
                <div className="std-wrapper">
                    <div id="header_block_contacts">
                        <div>
                            <div className="std-title-m">
                                <span className="std-icon std-icon-connect"></span>
                                <div>
                                    Подключение:{' '}
                                    <a href="tel:+74957890915">
                                        +7 (495) 789-09-15
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="std-title-m">
                                <span className="std-icon std-icon-support"></span>
                                <div>
                                    Техподдержка:{' '}
                                    <a href="tel:+74957890916">
                                        +7 (495) 789-09-16
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
});
