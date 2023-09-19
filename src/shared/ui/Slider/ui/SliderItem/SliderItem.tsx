import { ReactNode, memo } from 'react';
import classNames from 'classnames';
import cls from './../Slider.module.less';

interface SliderItemProps {
    className?: string;
    children?: ReactNode;
    style?: React.CSSProperties;
}

export const SliderItem = memo(function SliderItem(props: SliderItemProps) {
    const { className, children, style } = props;
    return (
        <div className={classNames(cls.SliderItem, [className])} style={style}>
            {children}
        </div>
    );
});
