import configs from "~/configs";

const publicRoutes = [
    { name: "Home", redirect: configs.routes.home },
    { name: "Djed Stablecoin", redirect: configs.routes.djed },
    { name: "Shen Reservecoin", redirect: configs.routes.shen },
    { name: "Delegation Rewards", redirect: configs.routes.rewards },
    { name: "FAQ", redirect: configs.routes.faq },
];

export { publicRoutes };
