import { $t } from "@/plugins/i18n";
export default {
  path: "/customer",
  meta: {
    icon: "mdi:account-outline",
    title: $t("client.clienManagement"),
    rank: 4
  },
  children: [
    {
      path: "/customer",
      name: "Customer",
      component: () => import("@/views/customer/index.vue"),
      meta: {
        title: "客户管理"
      }
    }
  ]
};
