export async function useLoading(message: string, fn: () => void | Promise<void>) {
  await wx.showLoading({ title: message, mask: true })
  await fn()
  await wx.hideLoading()
}

export function routeToHome() {
  wx.redirectTo({ url: '/pages/index/index' })
}
