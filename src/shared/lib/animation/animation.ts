export function nextAnimFrame(f: Function) {
    let raf =
        window.requestAnimationFrame ||
        (window as any).webkitRequestAnimationFrame ||
        (window as any).msRequestAnimationFrame;
    if (raf) {
        raf(() => {
            raf(() => {
                f();
            });
        });
    } else {
        f();
    }
}

interface elementAnimateOptions {
    transition: string;
    properties: { [key: string]: string };
}

export function elementAnimate(
    elem: HTMLElement,
    options: elementAnimateOptions,
) {
    return new Promise<() => void>((resolve) => {
        const clearProperties = () => {
            for (let k in options.properties) {
                elem.style.removeProperty(k);
            }
        };

        const endHandler = (e: TransitionEvent) => {
            if (e.target == elem) {
                elem.removeEventListener('transitionend', endHandler);
                elem.style.removeProperty('transition');
                resolve(clearProperties);
            }
        };
        elem.addEventListener('transitionend', endHandler);
        elem.style.setProperty('transition', options.transition);
        nextAnimFrame(() => {
            for (let k in options.properties) {
                elem.style.setProperty(k, options.properties[k]);
            }
        });
    });
}

export function clearAnimate(elem: HTMLElement) {
    elem.style.removeProperty('transition');
}
