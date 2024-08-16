import { $t } from "@/plugins/i18n";
export default {
  path: "/product",
  meta: {
    icon: "ant-design:audit-outlined",
    title: $t("product.productManagement"),
    rank: 5
  },
  children: [
    {
      path: "/productMe",
      name: "ProductMe",
      component: () => import("@/views/product/productMange.vue"),
      meta: {
        title: $t("product.productManagement")
      }
    },
    {
      path: "/chassisMe",
      name: "ChassisMe",
      component: () => import("@/views/product/chassisMange.vue"),
      meta: {
        title: $t("product.chassisManagement")
      }
    }
  ]
};
