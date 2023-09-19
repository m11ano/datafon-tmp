import React, { useMemo } from 'react';
import { Page } from 'shared/lib/components/Page/';
import cls from './index.module.less';
import { Slider, SliderPropsItem, SliderPropsSize } from 'shared/ui/Slider/';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const sliderSizes: SliderPropsSize[] = [
    {
        to: 580,
        size: [580, 497],
        changeHeightProp: true,
    },
    {
        to: Infinity,
        size: [1120, 316],
        changeHeightProp: false,
    },
];

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

    sliderSizes[0].className = cls.mainSliderSizeMobile;
    sliderSizes[1].className = cls.mainSliderSizeFull;

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
        </Page>
    );
}
