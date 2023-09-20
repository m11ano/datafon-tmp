import React, { useMemo } from 'react';
import { Page } from 'shared/lib/components/Page/';
import cls from './index.module.less';
import { Slider, SliderPropsItem, SliderPropsSize } from 'shared/ui/Slider/';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getDeviceData, onDeviceWidth } from 'app/providers/DeviceProvider';
import { useSelector } from 'react-redux';

import Image from 'next/image';

import domofonIcon from '/public/icons/domofon.svg';
import phoneIcon from '/public/icons/phone.svg';
import houseIcon from '/public/icons/smarthouse.svg';
import lockIcon from '/public/icons/signal.svg';
import classNames from 'classnames';

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

    //Тарифы тв
    const tvTariffs = useMemo(() => {
        return [
            {
                title: 'Ценитель',
                desc: 'Стандартный пакет каналов с полноценным управлением эфиром.',
                pkg: '248 каналов',
                price: '200 руб/мес',
            },
            {
                title: 'Киноэксперт',
                desc: 'Премиальный ТВ-пакет с 2 кинотеатрами: premier, more.tv.',
                pkg: '348 каналов + 2 кинотеатра',
                price: '750 руб/мес',
            },
            {
                title: 'Киноман',
                desc: 'Эксклюзивный ТВ-пакет + кинотеатры: start, amediateka, premier, more.tv.',
                pkg: '348 каналов + 4 кинотеатра',
                price: '990 руб/мес',
            },
        ];
    }, []);

    //Тарифы наблюдение
    const videocontrolTariffs = useMemo(() => {
        return [
            {
                title: 'Freemium',
                desc: [
                    'Без записи архива в облако',
                    'Экспорт неограниченного числа клипов, длина клипа до 10 минут',
                    'Одна камера на аккаунте',
                ],
                price: '0 руб/мес',
            },
            {
                title: 'Online',
                desc: [
                    'Локальный видеоархив без ограничений на просмотр',
                    'Экспорт неограниченного числа клипов, длина клипа до 8 часов',
                    'Без записи архива в облако',
                    'Тариф оплачивается на 3 или 12 мес.',
                ],
                price: '200 руб/мес',
            },
            {
                title: 'Cloud 7',
                desc: [
                    'Локальный видеоархив без ограничений на просмотр',
                    'Экспорт неограниченного числа клипов, длина клипа до 8 часов',
                    'Запись по детекторам и датчикам камеры, или постоянная запись в облако за последние 7 дней',
                    'Тариф оплачивается на 3 или 12 мес.',
                ],
                price: '480 руб/мес',
            },
            {
                title: 'Cloud 30',
                desc: [
                    'Запись по детекторам и датчикам камеры или постоянная запись в облако за последние 30 дней',
                    'Передача доступа к камерам 25 другим пользователям',
                    'Экспорт видео в файл — неограниченное число клипов, длина клипа до 8 часов',
                    'Тариф оплачивается на 3 или 12 мес.',
                ],
                price: '900 руб/мес',
            },
        ];
    }, []);

    //Тарифы наблюдение
    const servicesTariffs = useMemo(() => {
        return [
            {
                icon: (
                    <Image
                        src={domofonIcon}
                        alt="domofonIcon"
                        width={36}
                        height={36}
                    />
                ),
                title: 'Домофон',
                desc: [
                    'Домофон в вашем смартфоне',
                    'Подключение к подъездному домофону',
                    'Возможность записи фото и видео',
                    'Угол обзора до 180 градусов',
                ],
            },
            {
                icon: (
                    <Image
                        src={phoneIcon}
                        alt="phoneIcon"
                        width={36}
                        height={36}
                    />
                ),
                title: 'IP Телефония',
                desc: [
                    'Высокое качество по низкой цене за телефонную связь',
                    'Городские телефонные номера в коде 499',
                    'Подбор красивого легкозапоминающегося номера',
                ],
            },
            {
                icon: (
                    <Image
                        src={houseIcon}
                        alt="houseIcon"
                        width={36}
                        height={36}
                    />
                ),
                title: 'Умный дом',
                desc: [
                    'Экономия времени и средств на оплату коммунальных счетов',
                    'Online наблюдение за происходящим в доме со смартфона, где бы Вы не находились',
                    'Оперативные уведомления о вторжении, протечке воды, возгорании',
                ],
            },
            {
                icon: (
                    <Image
                        src={lockIcon}
                        alt="lockIcon"
                        width={27}
                        height={36}
                    />
                ),
                title: 'Охрана',
                desc: [
                    'Персональная охранная сигнализация — надёжная и проверенная защита квартиры',
                ],
            },
        ];
    }, []);

    return (
        <Page title="Датафон — Оператор связи в Москве">
            <div id="main_slider" className={cls.mainSliderBlock}>
                <div className="std-wrapper">
                    <Slider
                        sizes={sliderSizes}
                        items={sliderItemsArray}
                        slidersWrapperClassName={cls.mainSlidersWrapper}
                    />
                </div>
            </div>
            <div
                id="main_block_internet"
                className={classNames(
                    deviceData.isClient && deviceData.checks.flexGap === false
                        ? cls.noFlexGap
                        : undefined,
                    cls.mainInternetBlock,
                )}
            >
                <div className="std-wrapper" id="main_block_internet_inside">
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
                            {onDeviceWidth(deviceData, 'big') ? (
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
                            )}
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
            <div
                id="main_block_tv"
                className={classNames(
                    deviceData.isClient && deviceData.checks.flexGap === false
                        ? cls.noFlexGap
                        : undefined,
                    cls.mainTvBlock,
                )}
            >
                <div className="std-wrapper" id="main_block_tv_inside">
                    <div className="std-title-wi">
                        <span className="std-icon std-icon-tv"></span>
                        <div>
                            Интерактивное{' '}
                            {onDeviceWidth(deviceData, 'big') ? (
                                <>телевидение</>
                            ) : (
                                <>ТВ</>
                            )}
                        </div>
                    </div>
                    <div className={cls.content}>
                        <div className={cls.desc}>
                            Вас ожидают{' '}
                            <b>
                                более 280 каналов, более 20 000 фильмов, тысячи{' '}
                                телепрограмм, 4 online-кинотеатра.{' '}
                            </b>
                            {onDeviceWidth(deviceData, 'big') && (
                                <>
                                    Предлагаем единый доступ на 5-и разных{' '}
                                    устройствах с управлением эфиром.{' '}
                                    Пользуйтесь паузой, перемоткой с кадром и{' '}
                                    архивом передач до 14 дней. <span>*</span>
                                </>
                            )}
                        </div>
                        <div className={cls.items}>
                            {tvTariffs.map((tariff, i) => (
                                <div key={i} className={cls.tvTariffCard}>
                                    <div className={cls.title}>
                                        {tariff.title}
                                    </div>
                                    <div className={cls.desc}>
                                        {tariff.desc}
                                    </div>
                                    <div className={cls.pkg}>
                                        <div className={cls.v}>
                                            {tariff.pkg}
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
                        {(!deviceData.isClient ||
                            (deviceData.isClient && deviceData.size.width) >=
                                640) && (
                            <div className={cls.under}>
                                <span>*</span> Предоставление доступа к архиву{' '}
                                зависит от правообладателя контента.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                id="main_block_videocontrol"
                className={classNames(
                    deviceData.isClient && deviceData.checks.flexGap === false
                        ? cls.noFlexGap
                        : undefined,
                    cls.mainVideocontrolBlock,
                )}
            >
                <div
                    className="std-wrapper"
                    id="main_block_videocontrol_inside"
                >
                    <div className="std-title-wi">
                        <span className="std-icon std-icon-vision"></span>
                        <div>
                            Видеонаблюдение{' '}
                            {onDeviceWidth(deviceData, 'big') && (
                                <>в квартире и на паркинге</>
                            )}
                        </div>
                    </div>
                    <div className={cls.content}>
                        <div className={cls.desc}>
                            Для всех видов подключений работает локальный{' '}
                            видеоархив без ограничений и уведомления о движении{' '}
                            и звуке. <b>Стоимость подключения PoE-порта</b>{' '}
                            (интернет и питание по 1 кабелю) в подземном{' '}
                            паркинге{' '}
                            <b>
                                составляет 5 000 руб. и является разовым{' '}
                                платежом.
                            </b>
                            <br />
                            <br />
                            <b>Абонентская плата</b> за порт и{' '}
                            интернет-подключение со скоростью 10 Мбит/с{' '}
                            <b>составляет 350 руб/мес.</b>
                        </div>
                        <div className={cls.items}>
                            {videocontrolTariffs.map((tariff, i) => (
                                <div
                                    key={i}
                                    className={cls.videocontrolTariffCard}
                                >
                                    <div className={cls.title}>
                                        {tariff.title}
                                    </div>
                                    <div className={cls.desc}>
                                        <ul>
                                            {tariff.desc.map((d, di) => (
                                                <li key={di}>{d}</li>
                                            ))}
                                        </ul>
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
            <div
                id="main_block_services"
                className={classNames(
                    deviceData.isClient && deviceData.checks.flexGap === false
                        ? cls.noFlexGap
                        : undefined,
                    cls.mainServicesBlock,
                )}
            >
                <div className="std-wrapper" id="main_block_services_inside">
                    <div className="std-title-wi">
                        <span className="std-icon std-icon-services"></span>
                        <div>Услуги и сервисы</div>
                    </div>
                    <div className={cls.content}>
                        <div className={cls.desc}>
                            Дополнительные услуги и сервисы, которые помогут
                            {` `}
                            сделать Вашу жизнь максимально комфортной и удобной.
                        </div>
                        <div className={cls.items}>
                            {servicesTariffs.map((tariff, i) => (
                                <div key={i} className={cls.servicesTariffCard}>
                                    <div className={cls.icon}>
                                        {tariff.icon}
                                    </div>
                                    <div className={cls.title}>
                                        {tariff.title}
                                    </div>
                                    <div className={cls.desc}>
                                        <ul>
                                            {tariff.desc.map((d, di) => (
                                                <li key={di}>{d}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
