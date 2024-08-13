import { $t } from "@/plugins/i18n";
export default {
  path: "/distributor",
  meta: {
    icon: "ep:orange",
    title: $t("dis.distributor"),
    rank: 3
  },
  children: [
    {
      path: "/distributor",
      name: "Distributor",
      component: () => import("@/views/distributor/index.vue"),
      meta: {
        title: "经销商管理"
      }
    }
  ]
};
