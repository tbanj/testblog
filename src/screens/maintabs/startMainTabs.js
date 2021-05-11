/* eslint-disable prettier/prettier */
// for tabs only without sideMenu

// for bottom tabs with sideMenu
const mainRoot = {
    root: {
        sideMenu: {
            id: 'sideMenu',
            options: {
                sideMenu: {
                    left: {
                        width: 200,
                        shouldStretchDrawer: false,
                    },
                },
            },
            left: {
                component: {
                    id: 'Drawer',
                    name: 'maja.MenuScreen',
                },

            },
            center: {

                bottomTabs: {
                    id: 'BOTTOM_TABS_MAJAPLACE',
                    children: [
                        {
                            stack: {
                                id: 'tab-1',
                                children: [
                                    {
                                        component: {
                                            id: 'home',
                                            name: 'maja.home',
                                        },
                                    },
                                ],
                                // options: {
                                //     bottomTab: {
                                //         iconColor: '#FF1493',
                                //         textColor: '#000',
                                //     },
                                //     bottomTabs: {
                                //         animate: true,
                                //     },
                                // },
                            },
                        },
                        {
                            stack: {
                                id: 'tab-2',
                                children: [
                                    {
                                        component: {
                                            id: 'chatRoom',
                                            name: 'maja.ChatRoom',
                                        },
                                    },
                                ],
                                // options: {
                                //     bottomTab: {
                                //         iconColor: '#FF1493',
                                //         textColor: '#000',
                                //     },
                                //     bottomTabs: {
                                //         animate: true,
                                //     },
                                //     bottomTab: {
                                //         animateBadge: true,
                                //         dotIndicator: {
                                //             animate: true, visible: true,
                                //         },
                                //     },
                                //     bottomTabs: {
                                //         animate: true,
                                //     },
                                // },
                            },
                        },
                        // 3rd tab
                        {
                            stack: {
                                id: 'tab-3',
                                children: [
                                    {
                                        component: {
                                            id: 'location',
                                            name: 'maja.location',
                                        },
                                    },
                                ],

                            },
                        },
                        // 4th tab
                        {
                            stack: {
                                id: 'tab-4',
                                children: [
                                    {
                                        component: {
                                            id: 'user',
                                            name: 'maja.user',
                                        },
                                    },
                                ],

                            },
                        },
                    ],

                },
            },
        },
        options: { width: 100 },
    },
};
export default mainRoot;
