export const requestPermission = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  const permission = await Notification.requestPermission()
  return permission === 'granted'
}

export const sendNotification = (title: string, body: string): void => {
  if (typeof window === 'undefined') return
  if (Notification.permission !== 'granted') return
  new Notification(title, { body, icon: '/icons/icon-192x192.png' })
}

export const scheduleDeadlineNotif = (cardTitle: string, dueDate: string): void => {
  const due = new Date(dueDate).getTime()
  const now = Date.now()
  const oneDayBefore = due - 24 * 60 * 60 * 1000

  if (oneDayBefore > now) {
    setTimeout(() => {
      sendNotification('⏰ Deadline besok!', `Task "${cardTitle}" jatuh tempo besok.`)
    }, oneDayBefore - now)
  }

  if (due > now) {
    setTimeout(() => {
      sendNotification('🔴 Deadline hari ini!', `Task "${cardTitle}" jatuh tempo hari ini.`)
    }, due - now)
  }
}