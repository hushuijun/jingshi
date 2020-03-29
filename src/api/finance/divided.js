import request from '@/utils/request'
// 分润列表
export function dividedList(data) {
    return request({
      url: 'shareManage/queryPage',
      method: 'get',
      data: data,
      headers: {
        'Admin-Token':token
      }
    })
  }