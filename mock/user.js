const users = {
  "admin-token": {
    roles: ["admin"],
    introduction: "I am a super administrator",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "userAccount",
  },
  "editor-token": {
    roles: ["editor"],
    introduction: "I am an editor",
    avatar:
      "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    name: "Normal Editor",
  },
};

module.exports = [
  // get user info
  {
    url: "/api/vue-template/user/info",
    type: "get",
    response: () => {
      const info = users["admin-token"];
      return {
        code: 20000,
        data: info,
      };
    },
  },
];
