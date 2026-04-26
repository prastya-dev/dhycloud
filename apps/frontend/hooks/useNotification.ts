import { useEffect } from 'react'
import { requestPermission, scheduleDeadlineNotif } from '@/lib/notify'
import { Card } from '@/types'

export const useNotification = (cards: Card[] = []) => {
  useEffect(() => {
    requestPermission().then((granted) => {
      if (!granted) return
      cards.forEach((card) => {
        if (card.dueDate) {
          scheduleDeadlineNotif(card.title, card.dueDate)
        }
      })
    })
  }, [cards])
}