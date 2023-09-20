interface MenuList {
    title: string;
    scrollSelector: [string, string] | string;
    scrollTarget: string;
}

export const menuList: MenuList[] = [
    {
        title: 'Интернет',
        scrollSelector: 'main_block_internet',
        scrollTarget: 'main_block_internet_inside',
    },
    {
        title: 'Телевидение',
        scrollSelector: 'main_block_tv',
        scrollTarget: 'main_block_tv_inside',
    },
    {
        title: 'Видеонаблюдение',
        scrollSelector: 'main_block_videocontrol',
        scrollTarget: 'main_block_videocontrol_inside',
    },
    {
        title: 'Услуги и сервисы',
        scrollSelector: 'main_block_services',
        scrollTarget: 'main_block_services_inside',
    },
    {
        title: 'О компании',
        scrollSelector: 'footer',
        scrollTarget: 'footer',
    },
];
