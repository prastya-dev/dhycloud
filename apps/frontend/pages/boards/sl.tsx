import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import api from '@/lib/axios'
import { runTemplateRefresh } from '@/lib/boardTemplate'
import { Board, Card } from '@/types'
import CardItem from '@/components/Card/CardItem'
import CardModal from '@/components/Card/CardModal'
import Column from '@/components/Column/Column'

export default function BoardDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { id } = router.query

  const [board, setBoard] = useState<Board | null>(null)

  // ✅ DnD state
  const [boardDraft, setBoardDraft] = useState<Board | null>(null)
  const activeBoardRef = useRef<Board | null>(null)

  const [loading, setLoading] = useState(true)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [error, setError] = useState('')

  // Edit nama board
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const [savingTitle, setSavingTitle] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // Refresh template
  const [refreshing, setRefreshing] = useState(false)
  const [refreshStatus, setRefreshStatus] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  )

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login')
      return
    }
    if (status === 'authenticated' && id) {
      if (session?.accessToken) {
        localStorage.setItem('accessToken', session.accessToken)
      }
      fetchBoard()
    }
  }, [status, id, session])

  useEffect(() => {
    if (editingTitle) {
      titleInputRef.current?.focus()
      titleInputRef.current?.select()
    }
  }, [editingTitle])

  const fetchBoard = async () => {
    try {
      const res = await api.get(`/boards/${id}`)
      setBoard(res.data.data)
    } catch {
      setError('Gagal memuat board')
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshTemplate = async () => {
    if (!board?.templateId || !board?.isTemplate) return

    setRefreshing(true)
    setRefreshStatus('')
    setError('')

    try {
      const fresh = await api.get(`/boards/${board.id}`)
      const freshLists = fresh.data.data.lists

      await runTemplateRefresh(
        board.templateId,
        board.id,
        freshLists,
        board.templateToken ?? null,
        (s: string) => setRefreshStatus(s)
      )

      await fetchBoard()
    } catch (err: any) {
      setError(err.message || 'Gagal refresh template')
    } finally {
      setRefreshing(false)
      setRefreshStatus('')
    }
  }

  // =========================
  // 🔥 HELPER
  // =========================

  const findCardById = (cardId: string): Card | null => {
    if (!board) return null
    for (const list of board.lists) {
      const found = list.cards.find(c => c.id === cardId)
      if (found) return found
    }
    return null
  }

  const findListByCardId = (cardId: string): string | null => {
    if (!board) return null
    for (const list of board.lists) {
      if (list.cards.find(c => c.id === cardId)) return list.id
    }
    return null
  }

  const findListByCardIdInBoard = (b: Board, cardId: string): string | null => {
    for (const list of b.lists) {
      if (list.cards.find(c => c.id === cardId)) return list.id
    }
    return null
  }

  // =========================
  // 🔥 DND
  // =========================

  const handleDragStart = (event: DragStartEvent) => {
    const card = findCardById(event.active.id as string)
    setActiveCard(card)

    activeBoardRef.current = board
    setBoardDraft(board)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || !activeBoardRef.current) return

    const cardId = active.id as string
    const overId = over.id as string

    const currentBoard = activeBoardRef.current
    const fromListId = findListByCardIdInBoard(currentBoard, cardId)
    if (!fromListId) return

    const overIsCard = currentBoard.lists.some(l =>
      l.cards.some(c => c.id === overId)
    )

    const toListId = overIsCard
      ? findListByCardIdInBoard(currentBoard, overId)!
      : overId

    if (!toListId || fromListId === toListId) return

    const card = currentBoard.lists.flatMap(l => l.cards).find(c => c.id === cardId)
    if (!card) return

    const targetList = currentBoard.lists.find(l => l.id === toListId)

    const overCardIndex = overIsCard
      ? targetList?.cards.findIndex(c => c.id === overId) ?? -1
      : -1

    const newBoard: Board = {
      ...currentBoard,
      lists: currentBoard.lists.map(list => {
        if (list.id === fromListId) {
          return { ...list, cards: list.cards.filter(c => c.id !== cardId) }
        }

        if (list.id === toListId) {
          const newCards = [...list.cards]
          const insertAt = overCardIndex >= 0 ? overCardIndex : newCards.length
          newCards.splice(insertAt, 0, { ...card, listId: toListId })
          return { ...list, cards: newCards }
        }

        return list
      })
    }

    setBoardDraft(newBoard)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over || !board) {
      setBoardDraft(null)
      activeBoardRef.current = null
      return
    }

    const cardId = active.id as string
    const overId = over.id as string

    const fromListId = findListByCardId(cardId)
    if (!fromListId) return

    const overIsCard = board.lists.some(l =>
      l.cards.some(c => c.id === overId)
    )

    const toListId = overIsCard
      ? findListByCardId(overId)!
      : overId

    if (!toListId) return

    // reorder
    if (fromListId === toListId) {
      const list = board.lists.find(l => l.id === fromListId)
      if (!list) return

      const oldIndex = list.cards.findIndex(c => c.id === cardId)
      const newIndex = list.cards.findIndex(c => c.id === overId)

      if (oldIndex !== newIndex && newIndex !== -1) {
        const newCards = arrayMove(list.cards, oldIndex, newIndex)

        setBoard({
          ...board,
          lists: board.lists.map(l =>
            l.id === fromListId ? { ...l, cards: newCards } : l
          )
        })

        try {
          await api.put(`/cards/${cardId}`, { position: newIndex })
        } catch {
          fetchBoard()
        }
      }

      setBoardDraft(null)
      activeBoardRef.current = null
      return
    }

    // pindah list
    if (boardDraft) {
      setBoard(boardDraft)
    }

    setBoardDraft(null)
    activeBoardRef.current = null

    try {
      await api.put(`/cards/${cardId}`, { listId: toListId })
    } catch {
      fetchBoard()
    }
  }

  const displayBoard = boardDraft ?? board

  if (status === 'loading' || loading || !displayBoard) {
    return <div className="p-10 text-center text-gray-400">Loading...</div>
  }

  return (
    <>
      <Head><title>{displayBoard.title}</title></Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">

        {refreshing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
              <p>{refreshStatus || 'Memperbarui...'}</p>
            </div>
          </div>
        )}

        <nav className="bg-white border-b px-6 py-4 flex items-center">
          <Link href="/boards">← Boards</Link>

          {displayBoard.isTemplate && (
            <button onClick={handleRefreshTemplate} className="ml-auto">
              Refresh
            </button>
          )}
        </nav>

        <div className="flex-1 overflow-x-auto p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-4 min-w-max">
              {displayBoard.lists.map(list => (
                <SortableContext
                  key={list.id}
                  items={list.cards.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Column
                    list={list}
                    onCardClick={setSelectedCard}
                    onAddCard={() => {}}
                    onDeleteCard={() => {}}
                  />
                </SortableContext>
              ))}
            </div>

            <DragOverlay dropAnimation={null}>
              {activeCard && (
                <CardItem card={activeCard} isDragging onClick={() => {}} onDelete={() => {}} />
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={() => {}}
          onDelete={() => {}}
        />
      )}
    </>
  )
}