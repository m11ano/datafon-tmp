import classNames from 'classnames';
import cls from './../Slider.module.less';
import { SliderPropsItem, SliderPropsSize } from '../../model/types/types';
import {
    Fragment,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { SliderItem } from '../SliderItem/SliderItem';
import {
    clearAnimate,
    elementAnimate,
    nextAnimFrame,
} from 'shared/lib/animation/animation';
import useStateRef from 'shared/hooks/useStateRef/useStateRef';

interface SliderProps {
    sizes: SliderPropsSize[];
    items: SliderPropsItem[];
    className?: string;
    slidersWrapperClassName?: string;
}

//Константы
const POINTS__CONTAINER__WIDTH = 210;
const POINT__ITEM__WIDTH = 42;

//Компонент
export const Slider = memo(function Slider(props: SliderProps) {
    const { sizes, items, className, slidersWrapperClassName } = props;

    //Функция расчета мода от размера
    const countSizeMode = useCallback(
        (width: number) => {
            let mode = 0;
            sizes.every((s, i) => {
                if (width <= s.to) {
                    mode = i;
                    return false;
                }
                return true;
            });
            return mode;
        },
        [sizes],
    );

    //Функция при следующем ререндере
    const [nextRender, setNextRender] = useState<Function | undefined>();

    if (nextRender) {
        nextRender();
        setNextRender(undefined);
    }

    //Инициализация переменных и рефов
    const wrapper = useRef<HTMLDivElement>(null);
    const slidersItems = useRef<HTMLDivElement>(null);
    const pointsItems = useRef<HTMLDivElement>(null);

    const [wrapperWidth, setWrapperWidth, wrapperWidthRef] =
        useStateRef<number>(200);
    const [sizeMode, setSizeMode, sizeModeRef] = useStateRef<number>(
        countSizeMode(200),
    );
    const [nowSlideIndex, setNowSlideIndex, nowSlideIndexRef] =
        useStateRef<number>(0);
    const [translateXValue, setTranslateXValue, translateXValueRef] =
        useStateRef<number>(0);
    const [doAutoListing, setDoAutoListing, doAutoListingRef] =
        useStateRef<boolean>(true);

    const slidersSizeRef = useRef<{ width: number; height: number }>({
        width: 200,
        height: 100,
    });

    const sizeProportionRef = useRef<number>(0);

    const block = useRef<boolean>(false);
    const touchGo = useRef<boolean>(false);
    const touchSaveData = useRef<[number, number, number]>([
        translateXValue,
        0,
        0,
    ]);
    const autoListingTimeout = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    //Функция обновления ширины враппера
    const updateWrapperWidth = useCallback(() => {
        setWrapperWidth((wrapper.current && wrapper.current.clientWidth) || 0);
    }, [setWrapperWidth]);

    //Стартово устанавливаем ширину враппера на клиенте
    useEffect(() => {
        updateWrapperWidth();
    }, [updateWrapperWidth]);

    //При изменении ширины сбрасываем слайд на нулевой
    useEffect(() => {
        if (slidersItems.current) {
            clearAnimate(slidersItems.current);
        }
        if (pointsItems.current) {
            clearAnimate(pointsItems.current);
        }
        block.current = false;
        setSizeMode(countSizeMode(wrapperWidthRef.current));
        setNowSlideIndex(0);
        rebuildPointsList();
    }, [wrapperWidth]);

    //Считаем пропорцию
    const sizeProportion = useMemo<number>(() => {
        const result = parseFloat(
            (
                sizes[sizeModeRef.current].size[1] /
                sizes[sizeModeRef.current].size[0]
            ).toFixed(5),
        );
        sizeProportionRef.current = result;
        return result;
    }, [sizeMode, sizes]);

    //Считаем размеры
    const slidersSize = useMemo<{ width: number; height: number }>(() => {
        const result = {
            width: wrapperWidthRef.current,
            height: sizes[sizeModeRef.current].changeHeightProp
                ? Math.round(
                      wrapperWidthRef.current * sizeProportionRef.current,
                  )
                : sizes[sizeModeRef.current].size[1],
        };
        slidersSizeRef.current = result;
        return result;
    }, [wrapperWidth, sizeProportion, sizeMode]);

    //Функция перестроения классов для точек
    const rebuildPointsListClasess = useCallback(
        (targetIndex: number) => {
            if (pointsItems.current) {
                for (let i = 0; i < items.length; i++) {
                    (
                        pointsItems.current.childNodes.item(i) as HTMLDivElement
                    ).removeAttribute('class');

                    if (i == targetIndex) {
                        (
                            pointsItems.current.childNodes.item(
                                i,
                            ) as HTMLDivElement
                        ).classList.add(cls.b3);
                    } else if (i == targetIndex - 1 || i == targetIndex + 1) {
                        (
                            pointsItems.current.childNodes.item(
                                i,
                            ) as HTMLDivElement
                        ).classList.add(cls.b2);
                    }
                }
            }
        },
        [pointsItems, items.length],
    );

    //Функция перестроения точек
    const rebuildPointsList = useCallback(
        (
            targetIndex: number | undefined = undefined,
            animate: boolean = false,
        ) => {
            if (block.current) {
                return;
            }

            const index =
                targetIndex !== undefined
                    ? targetIndex
                    : nowSlideIndexRef.current;

            let v =
                index * POINT__ITEM__WIDTH -
                (POINTS__CONTAINER__WIDTH / 2 - POINT__ITEM__WIDTH / 2);

            if (pointsItems.current) {
                if (animate) {
                    elementAnimate(pointsItems.current, {
                        transition: 'transform 0.5s ease-in-out',
                        properties: {
                            transform: `translateX(${-v}px)`,
                        },
                    });

                    setTimeout(() => {
                        rebuildPointsListClasess(index);
                    }, 100);
                } else {
                    pointsItems.current.style.setProperty(
                        'transform',
                        'translateX(' + -v + 'px)',
                    );
                    rebuildPointsListClasess(index);
                }
            }
        },
        [block, pointsItems, rebuildPointsListClasess, nowSlideIndex],
    );

    //При изменении активного слайдера меняем X смещение
    useEffect(() => {
        if (items.length == 0) return;
        const val = -(
            slidersSizeRef.current.width *
            (nowSlideIndexRef.current + 1)
        );
        setTranslateXValue(val);
    }, [nowSlideIndex, slidersSize, items.length]);

    //Меняем физически translateX в cтиле
    useEffect(() => {
        if (slidersItems.current) {
            slidersItems.current.style.setProperty(
                'left',
                `${translateXValueRef.current}px`,
            );
        }
    }, [translateXValue]);

    //Перестраиваем классы при изменении активного слайда
    useEffect(() => {
        rebuildPointsList();
    }, [nowSlideIndex]);

    // Перейти к слайду
    const goToSlide = useCallback(
        (index: number, direction?: 'left' | 'right') => {
            if (block.current || index == nowSlideIndexRef.current) {
                return;
            }

            if (direction === undefined) {
                if (index > nowSlideIndexRef.current) direction = 'right';
                else direction = 'left';
            }

            if (slidersItems.current) {
                if (
                    direction == 'left' &&
                    nowSlideIndexRef.current == 0 &&
                    index > nowSlideIndexRef.current
                ) {
                    const initX =
                        -(slidersSizeRef.current.width * (items.length + 1)) +
                        (slidersSizeRef.current.width +
                            translateXValueRef.current);
                    setTranslateXValue(initX);
                } else if (
                    direction == 'right' &&
                    nowSlideIndexRef.current == items.length - 1 &&
                    index < nowSlideIndexRef.current
                ) {
                    const initX =
                        0 -
                        (-translateXValueRef.current -
                            slidersSizeRef.current.width * items.length);

                    setTranslateXValue(initX);
                }

                setNextRender(() => {
                    nextAnimFrame(() => {
                        if (slidersItems.current) {
                            let targetSlideX =
                                slidersSizeRef.current.width * (index + 1);

                            rebuildPointsList(index, true);
                            block.current = true;

                            elementAnimate(slidersItems.current, {
                                transition: 'left 0.5s',
                                properties: {
                                    left: `${-targetSlideX}px`,
                                },
                            }).then(() => {
                                setNowSlideIndex(index);
                                block.current = false;
                            });
                        }
                    });
                });
            }
        },
        [slidersSize, block, items.length, nowSlideIndex, rebuildPointsList],
    );

    //Навигация
    const countLeftIndex = useCallback(() => {
        if (items.length == 0) return 0;
        if (items.length == 2 && nowSlideIndexRef.current == 0) return 1;
        if (nowSlideIndexRef.current == 0) return items.length - 1;
        return nowSlideIndexRef.current - 1;
    }, [items.length, nowSlideIndex]);

    const countRightIndex = useCallback(() => {
        if (items.length == 0) return 0;
        if (items.length == 2 && nowSlideIndexRef.current == 1) return 0;
        if (nowSlideIndexRef.current == items.length - 1) return 0;
        return nowSlideIndexRef.current + 1;
    }, [items.length, nowSlideIndex]);

    const goToRightSlide = useCallback(() => {
        goToSlide(countRightIndex(), 'right');
    }, [goToSlide, countRightIndex]);

    const goToLeftSlide = useCallback(() => {
        goToSlide(countLeftIndex(), 'left');
    }, [goToSlide, countLeftIndex]);

    //Клик по поинту
    const onPointClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            goToSlide(Number(e.currentTarget.dataset.id));
        },
        [goToSlide],
    );

    //Автолистинг
    const clearAutoListing = useCallback(() => {
        if (autoListingTimeout.current !== null)
            clearTimeout(autoListingTimeout.current);
    }, []);

    const startAutoListing = useCallback(() => {
        clearAutoListing();
        autoListingTimeout.current = setTimeout(() => {
            if (doAutoListingRef.current) {
                goToRightSlide();
            }
        }, 5000);
    }, [clearAutoListing, goToRightSlide, doAutoListing]);

    //События мышки
    const onMouseEnter = useCallback(() => {
        setDoAutoListing(false);
    }, []);

    const onMouseOut = useCallback(() => {
        setDoAutoListing(true);
    }, []);

    //Тач события
    const onTouchStart = useCallback(
        (e: React.TouchEvent) => {
            if (block.current) return;
            clearAutoListing();
            touchGo.current = true;
            const touch = e.touches[0] || e.changedTouches[0];
            touchSaveData.current = [
                translateXValueRef.current,
                touch.pageX,
                0,
            ];
        },
        [block, touchGo, clearAutoListing],
    );

    const onTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (block.current) return;
            if (touchGo.current) {
                const touch = e.touches[0] || e.changedTouches[0];
                const diff = touchSaveData.current[1] - touch.pageX;
                const x = touchSaveData.current[0] - diff;
                setTranslateXValue(x);
                touchSaveData.current = [
                    touchSaveData.current[0],
                    touchSaveData.current[1],
                    diff,
                ];
            }
        },
        [block, touchGo, touchSaveData, setTranslateXValue],
    );

    const onTouchEnd = useCallback(() => {
        if (block.current) return;
        if (touchGo.current) {
            touchGo.current = false;
            const diff = touchSaveData.current[2];
            if (diff < -30) {
                goToLeftSlide();
            } else if (diff > 30) {
                goToRightSlide();
            } else {
                setTranslateXValue(
                    -(
                        slidersSizeRef.current.width *
                        (nowSlideIndexRef.current + 1)
                    ),
                );
            }
            startAutoListing();
        }
    }, [
        block,
        touchGo,
        touchSaveData,
        goToLeftSlide,
        goToRightSlide,
        nowSlideIndex,
        slidersSize,
        startAutoListing,
    ]);

    //Запускаем автолистинг
    useEffect(() => {
        clearAutoListing();
        if (doAutoListingRef.current) {
            startAutoListing();
        }
    }, [nowSlideIndex, wrapperWidth, doAutoListing]);

    //Вешаем события
    useEffect(() => {
        window.addEventListener('resize', updateWrapperWidth);
        window.addEventListener('touchend', onTouchEnd);

        return () => {
            window.removeEventListener('resize', updateWrapperWidth);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, []);

    return (
        <div
            className={classNames(
                cls.Slider,
                [className],
                sizes[sizeMode].className,
            )}
            ref={wrapper}
        >
            {items.length > 0 && (
                <>
                    <div
                        className={classNames(
                            cls.slidersWrapper,
                            slidersWrapperClassName,
                        )}
                        onMouseEnter={onMouseEnter}
                        onMouseOut={onMouseOut}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                    >
                        <div className={cls.sliders} ref={slidersItems}>
                            <SliderItem
                                className={cls.itemLastCopy}
                                style={{
                                    width: slidersSize.width,
                                    height: slidersSize.height,
                                }}
                            >
                                {items[items.length - 1].child}
                            </SliderItem>
                            {items.map((item, i) => (
                                <SliderItem
                                    className={cls.item}
                                    key={i}
                                    style={{
                                        width: slidersSize.width,
                                        height: slidersSize.height,
                                    }}
                                >
                                    {item.child}
                                </SliderItem>
                            ))}
                            <SliderItem
                                className={cls.itemFirstCopy}
                                style={{
                                    width: slidersSize.width,
                                    height: slidersSize.height,
                                }}
                            >
                                {items[0].child}
                            </SliderItem>
                        </div>
                    </div>
                    <div className={cls.pointsWrapper}>
                        <div className={cls.points}>
                            <div className={cls.pointsItems} ref={pointsItems}>
                                {items.map((item, index) => (
                                    <div key={index}>
                                        <a
                                            href="#"
                                            data-id={index}
                                            onClick={onPointClick}
                                        >
                                            <span>&nbsp;</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});
