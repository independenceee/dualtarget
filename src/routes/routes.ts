import configs from "~/configs";

const publicRoutes = [
    { name: "Home", redirect: configs.routes.home },
    { name: "Deposit", redirect: configs.routes.deposit },
    { name: "Withdraw", redirect: configs.routes.withdraw },
    { name: "Delegation Rewards", redirect: configs.routes.rewards },
    { name: "FAQ", redirect: configs.routes.faq },
];

export { publicRoutes };
