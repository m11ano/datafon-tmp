import { memo, useCallback } from 'react';
import classNames from 'classnames';
import { menuList } from 'app/const/menu';

interface HeaderProps {
    className?: string;
}

export const Footer = memo(function Footer(props: HeaderProps) {
    const { className } = props;

    const onMenuClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const id = Number(e.currentTarget.dataset.id);
            if (menuList[id] !== undefined) {
                console.log(menuList[id].title);
            }
        },
        [],
    );

    const onUpClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    }, []);

    return (
        <footer className={className ? classNames([className]) : undefined}>
            <div className="std-wrapper">
                <div id="footer">
                    <div className="block-logo">
                        <div></div>
                    </div>
                    <div className="block-menu">
                        <div className="menu">
                            {menuList.map((link, i) => {
                                if (i != 5) {
                                    return (
                                        <a
                                            href="#"
                                            key={i}
                                            data-id={i}
                                            onClick={onMenuClick}
                                        >
                                            {link.title}
                                        </a>
                                    );
                                }
                            })}
                        </div>
                        <div className="desc">
                            Датафон — Оператор связи в Москве. Мы используем
                            современное оборудование и резервные каналы,
                            благодаря чему наши услуги связи устойчивы и
                            надежны. При подключении используется технология
                            GPON. Мы гордимся своими техническими специалистами,
                            благодаря им Вы получаете оперативное подключение, а
                            получить консультацию по телефону можно
                            круглосуточно в течении нескольких минут от живого
                            оператора, не пробиваясь через бесконечное ожидание
                            и ботов.
                            <br />
                            <br />
                            Мы только в начале пути и впереди Вас ожидают
                            прогрессивные тарифные линейки, удобный Личный
                            кабинет Абонента, социальная активность и многое
                            другое!
                        </div>
                    </div>
                    <div className="up">
                        <a href="#" onClick={onUpClick}>
                            <span className="std-icon std-icon-up"></span>
                            <span className="title">Наверх</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
});
