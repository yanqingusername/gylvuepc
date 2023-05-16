const dynamicUser = [
    {
        name: "管理员",
        avatar: "https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/ccb565eca95535ab2caac9f6129b8b7a~300x300.image",
        desc: "管理员 - admin",
        username: "admin",
        password: "654321",
        farm_id: "FARM006",
        token: "rtVrM4PhiFK8PNopqWuSjsc1n02oKc3f",
        routes: [
            { id: 1, name: "/", path: "/", component: "Layout", redirect: "/index", hidden: false, children: [
                { name: "index", path: "/index", meta: { title: "index" }, component: "index/index" },
            ]},
            { id: 2, name: "/form", path: "/form", component: "Layout", redirect: "/form/index", hidden: false, children: [
                { name: "/form/index", path: "/form/index", meta: { title: "form" }, component: "form/index" }
            ]},
            { id: 3, name: "/table", path: "/table", component: "Layout", redirect: "/table/index", hidden: false, children: [
                { name: "/table/index", path: "/table/index", meta: { title: "table" }, component: "table/index" }
            ] },
            { id: 4, name: "/admin", path: "/admin", component: "Layout", redirect: "/admin/index", hidden: false, children: [
                { name: "/admin/index", path: "/admin/index", meta: { title: "admin" }, component: "admin/index" }
            ] },
        ]
    },
    {
        name: "普通用户",
        avatar: "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/6364348965908f03e6a2dd188816e927~300x300.image",
        desc: "普通用户 - people",
        username: "people",
        password: "123456",
        farm_id: "FARM006",
        token: "4es8eyDwznXrCX3b3439EmTFnIkrBYWh",
        routes: [
            { id: 1, name: "/", path: "/", component: "Layout", redirect: "/index", hidden: false, children: [
                { name: "index", path: "/index", meta: { title: "index" }, component: "index/index" },
            ]},
            { id: 2, name: "/form", path: "/form", component: "Layout", redirect: "/form/index", hidden: false, children: [
                { name: "/form/index", path: "/form/index", meta: { title: "form" }, component: "form/index" }
            ]},
            { id: 3, name: "/table", path: "/table", component: "Layout", redirect: "/table/index", hidden: false, children: [
                { name: "/table/index", path: "/table/index", meta: { title: "table" }, component: "table/index" }
            ] },
            { id: 4, name: "/admin", path: "/admin", component: "Layout", redirect: "/admin/index", hidden: false, children: [
                { name: "/admin/index", path: "/admin/index", meta: { title: "admin" }, component: "admin/index" }
            ] },
        ]
    }
]

export default dynamicUser