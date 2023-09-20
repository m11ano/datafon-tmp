export function windowScrollTo(v: number) {
    window.scrollTo({ top: v, behavior: 'smooth' });
}

export function windowScrollToElem(
    i: HTMLElement,
    offset: number = 0,
    is_smooth: boolean = true,
) {
    let s = i.getBoundingClientRect().top + window.pageYOffset - offset;
    if (is_smooth) {
        windowScrollTo(s);
    } else {
        window.scrollTo({ top: s });
    }
}

export function windowScrollToBlock(
    v: string,
    offset: number = 0,
    is_smooth: boolean = true,
) {
    const elem = document.getElementById(v);
    if (elem) {
        windowScrollToElem(elem, offset, is_smooth);
    }
}
