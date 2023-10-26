/*
 * @Author: maxiangan
 * @Date: 2023-10-25 15:39:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-26 13:52:28
 * @Description: 请填写简介
 */
import { useCounter } from '@/store/index.ts'


export function checkRole(data: any) {
  const infoStore=useCounter()
  infoStore.getUserInfo({})

  if (infoStore.userInfo.roles.includes(data)) {
    return true
  }
  return false
  
}