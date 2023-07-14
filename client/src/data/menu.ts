export const menu = [
  { name: "Home page", path: "/", drop: [] },
  { name: "About us", path: "/aboutus", drop: [] },
  {
    name: "Menu",
    path: "/menu/currentmenu",
    drop: [
      { title: "New drink", path: "/menu/newdrink" },
      { title: "Seasonal drink", path: "/menu/seasonaldrink" },
      { title: "Current Menu", path: "/menu/currentmenu" },
    ],
  },
  { name: "New & Promotion", path: "/newspromotion", drop: [] },
  { name: "Store", path: "/store", drop: [] },
  { name: "Recruitment", path: "/recruitment", drop: [] },
  { name: "Contact", path: "/contact", drop: [] },
];
