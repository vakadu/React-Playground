const menu = [
  {
    id: 1,
    name: "Home",
    url: "/home",
    subMenu: [],
  },
  {
    id: 2,
    name: "About",
    url: "/about",
    subMenu: [
      {
        id: 3,
        name: "Team",
        url: "/about/team",
        subMenu: [],
      },
      {
        id: 4,
        name: "Our Story",
        url: "/about/our-story",
        subMenu: [],
      },
    ],
  },
  {
    id: 5,
    name: "Services",
    url: "/services",
    subMenu: [
      {
        id: 6,
        name: "Web Development",
        url: "/services/web-development",
        subMenu: [
          {
            id: 7,
            name: "Frontend",
            url: "/services/web-development/frontend",
            subMenu: [],
          },
          {
            id: 8,
            name: "Backend",
            url: "/services/web-development/backend",
            subMenu: [],
          },
        ],
      },
      {
        id: 9,
        name: "Mobile Development",
        url: "/services/mobile-development",
        subMenu: [
          {
            id: 10,
            name: "iOS",
            url: "/services/mobile-development/ios",
            subMenu: [],
          },
          {
            id: 11,
            name: "Android",
            url: "/services/mobile-development/android",
            subMenu: [],
          },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Contact",
    url: "/contact",
    subMenu: [],
  },
  {
    id: 13,
    name: "Blog",
    url: "/blog",
    subMenu: [
      {
        id: 14,
        name: "Latest Posts",
        url: "/blog/latest-posts",
        subMenu: [],
      },
      {
        id: 15,
        name: "Categories",
        url: "/blog/categories",
        subMenu: [
          {
            id: 16,
            name: "Tech",
            url: "/blog/categories/tech",
            subMenu: [],
          },
          {
            id: 17,
            name: "Design",
            url: "/blog/categories/design",
            subMenu: [],
          },
        ],
      },
    ],
  },
];

function apiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menu);
    }, 400);
  });
}

export default apiCall;
