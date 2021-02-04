import request from "@/utils/request";

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: "/vue-template/user/info",
    method: "get",
  });
}
