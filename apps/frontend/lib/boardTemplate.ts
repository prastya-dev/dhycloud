import { runEdlinkNotif, refreshEdlinkNotif } from '@/templates/edlink-notif'

type StatusCallback = (status: string) => void

const TEMPLATES: Record<string, (boardId: string, onStatus: StatusCallback) => Promise<void>> = {
  'edlink-notif': runEdlinkNotif,
}

const TEMPLATE_REFRESHERS: Record<string, (boardId: string, existingLists: any[], boardToken: string | null, onStatus: StatusCallback) => Promise<void>> = {
  'edlink-notif': refreshEdlinkNotif,
}

export const runTemplate = async (
  templateId: string,
  boardId: string,
  onStatus: StatusCallback = () => {}
): Promise<void> => {
  const runner = TEMPLATES[templateId]
  if (!runner) throw new Error(`Template "${templateId}" tidak ditemukan`)
  await runner(boardId, onStatus)
}

export const runTemplateRefresh = async (
  templateId: string,
  boardId: string,
  existingLists: any[],
  boardToken: string | null,
  onStatus: StatusCallback = () => {}
): Promise<void> => {
  const refresher = TEMPLATE_REFRESHERS[templateId]
  if (!refresher) throw new Error(`Refresher untuk "${templateId}" tidak ditemukan`)
  await refresher(boardId, existingLists, boardToken, onStatus)
}