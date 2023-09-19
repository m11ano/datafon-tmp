import React, { useMemo } from 'react';
import { Page } from 'shared/lib/components/Page/';
import cls from './index.module.less';
import { Slider, SliderPropsItem, SliderPropsSize } from 'shared/ui/Slider/';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getDeviceData } from 'app/providers/DeviceProvider';
import { useSelector } from 'react-redux';

// const sliderSizes: SliderPropsSize[] = [
//     {
//         to: 580,
//         size: [580, 497],
//         changeHeightProp: true,
//     },
//     {
//         to: Infinity,
//         size: [1120, 316],
//         changeHeightProp: false,
//     },
// ];

export const getStaticProps: GetStaticProps<{
    sliderItems: {
        html: string;
        style?: React.CSSProperties;
    }[];
}> = async () => {
    return {
        props: {
            sliderItems: [
                {
                    html: `<div>Быстрое <span>бесплатное</span> подключение в удобное время</div>`,
                },
                {
                    html: `<div><span>Персональная</span><br /> поддержка круглосуточно без выходных</div>`,
                },
                {
                    html:
                        `<div><span>Вы всегда Online!</span>` +
                        `<div><div><span>•</span> новейшее оборудование</div>` +
                        `<div><span>•</span> современные технологии</div>` +
                        `<div><span>•</span> резервные каналы</div></div></div>`,
                },
            ],
        },
    };
};

export default function Main(
    props: InferGetStaticPropsType<typeof getStaticProps>,
) {
    const { sliderItems } = props;

    const deviceData = useSelector(getDeviceData);

    //Размеры слайдера для шапки
    const sliderSizes: SliderPropsSize[] = [
        {
            to: 580,
            size: [580, 497],
            changeHeightProp: true,
            className: cls.mainSliderSizeMobile,
        },
        {
            to: Infinity,
            size: [1120, 316],
            changeHeightProp: false,
            className: cls.mainSliderSizeFull,
        },
    ];

    //Элементы для слайдера в шапке
    const sliderItemsArray = useMemo<SliderPropsItem[]>(() => {
        const result: SliderPropsItem[] = [];
        sliderItems.forEach((elem, i) => {
            result.push({
                child: (
                    <div
                        dangerouslySetInnerHTML={{ __html: elem.html }}
                        style={elem.style}
                        className={cls.mainSliderItem}
                        id={cls['main_slider_item_' + (i + 1)]}
                    />
                ),
            });
        });
        return result;
    }, [sliderItems]);

    //Тарифы интернет
    const internetTariffs = useMemo(() => {
        return [
            {
                title: 'Базовый',
                desc: 'Безлимитный интернет с оптимальной скоростью.',
                speed: '100 Мбит/с',
                price: '550 руб/мес',
            },
            {
                title: 'Активный',
                desc: 'Для всех устройств небольшой семьи.',
                speed: '500 Мбит/с',
                price: '700 руб/мес',
            },
            {
                title: 'Легенда',
                desc: 'Множество пользователей и устройств. Хватит на все!',
                speed: '1000 Мбит/с',
                price: '1050 руб/мес',
            },
            {
                title: 'Социальный',
                desc: 'Льготным категориям граждан.',
                speed: '50 Мбит/с',
                price: '250 руб/мес',
            },
        ];
    }, []);

    return (
        <Page title="Датафон — Оператор связи в Москве">
            <div id={cls.main_slider}>
                <div className="std-wrapper">
                    <Slider
                        sizes={sliderSizes}
                        items={sliderItemsArray}
                        slidersWrapperClassName={cls.mainSlidersWrapper}
                    />
                </div>
            </div>
            <div
                id={cls.main_block_internet}
                className={
                    deviceData.isClient && deviceData.checks.flexGap === false
                        ? cls.noFlexGap
                        : undefined
                }
            >
                <div className="std-wrapper">
                    <div className="std-title-wi">
                        <span className="std-icon std-icon-internet"></span>
                        <div>Интернет</div>
                    </div>
                    <div className={cls.content}>
                        <div className={cls.desc}>
                            Предлагаем Вашему вниманию{` `}
                            <b>
                                домашний Интернет на высочайшей скорости до 1
                                {` `}
                                Гбит/с.{` `}
                            </b>
                            {!deviceData.isClient ||
                                (deviceData.isClient &&
                                deviceData.size.width >= 640 ? (
                                    <>
                                        Мы используем только современные
                                        {` `}
                                        технологии — <b>GPON</b> (оптика в{` `}
                                        квартиру).{` `}
                                        Гарантируем устойчивое и надежное{` `}
                                        соединение — благодаря{` `}
                                    </>
                                ) : (
                                    <>
                                        Устойчивое и надежное{` `}
                                        соединение благодаря{` `}
                                    </>
                                ))}
                            новейшему оборудованию и использованию
                            {` `}
                            резервных каналов <b>Вы всегда online!</b>
                        </div>
                        <div className={cls.items}>
                            {internetTariffs.map((tariff, i) => (
                                <div key={i} className={cls.internetTariffCard}>
                                    <div className={cls.title}>
                                        {tariff.title}
                                    </div>
                                    <div className={cls.desc}>
                                        {tariff.desc}
                                    </div>
                                    <div className={cls.speed}>
                                        <div className={cls.t}>Скорость:</div>
                                        <div className={cls.v}>
                                            {tariff.speed}
                                        </div>
                                    </div>
                                    <div className={cls.price}>
                                        <div className={cls.t}>Аб. плата:</div>
                                        <div className={cls.v}>
                                            {tariff.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '100px' }}></div>
        </Page>
    );
}
