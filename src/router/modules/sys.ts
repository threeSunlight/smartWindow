import { $t } from "@/plugins/i18n";

// export default {
//   path: "/fighting",
//   meta: {
//     icon: "ep:home-filled",
//     title: $t("sys.sysAll")
//   },
//   children: [
//     {
//       path: "/fighting/home",
//       name: "Home",
//       component: () => import("@/views/sys/home/index.vue"),
//       meta: {
//         title: $t("sys.sysHome")
//       }
//     },
//     {
//       path: "/fighting/name",
//       name: "Nome",
//       component: () => import("@/views/sys/name/index.vue"),
//       meta: {
//         title: $t("sys.sysName")
//       }
//     }
//   ]
// };
// 最简代码，也就是这些字段必须有
export default {
  path: "/sys",
  meta: {
    icon: "ep:checked",
    title: $t("syss.sysAll")
  },
  children: [
    {
      path: "/sys/index",
      name: "Fighting",
      component: () => import("@/views/sys/home/index.vue"),
      meta: {
        title: "加油"
      }
    },
    {
      path: "/sys/effort",
      name: "Effort",
      component: () => import("@/views/sys/name/index.vue"),
      meta: {
        title: "努力"
      }
    }
  ]
};
