import { MenuItemType } from "@paljs/ui/types";

import { BASE_MENU } from "./baseMenu";

let items: MenuItemType[] = [
  {
    title: "GENERALE",
    group: true,
  },
  {
    title: "Fideles",
    icon: { name: "people-outline" },
    link: { href: "/fideles" },
  },
  {
    title: "Transactions",
    icon: { name: "activity-outline" },
    link: { href: "/transactions" },
  },
  // {
  //   title: "Souscriptions",
  //   icon: { name: "star-outline" },
  //   link: { href: "/subscriptions" },
  // },
  // {
  //   title: "Dons",
  //   icon: { name: "heart-outline" },
  //   link: { href: "/donations" },
  // },
  {
    title: "INTERACTIONS",
    group: true,
  },
  {
    title: "Videos",
    icon: { name: "video-outline" },
    children: [
      {
        title: "Commencer un direct",
        link: { href: "/videos/live" },
      },
      {
        title: "Ajouter une video",
        link: { href: "/videos/add" },
      },
      {
        title: "Liste des videos",
        link: { href: "/videos/" },
      },
    ],
  },
];

if (process.env.NODE_ENV === "development") {
  items = [...items, ...BASE_MENU];
}

export default items;
