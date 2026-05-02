// import { useEffect, useState, useRef } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/router'
// import Head from 'next/head'
// import Link from 'next/link'
// import {
//   DndContext,
//   closestCenter,
//   DragOverlay,
//   DragStartEvent,
//   DragEndEvent,
//   PointerSensor,
//   TouchSensor,
//   useSensor,
//   useSensors
// } from '@dnd-kit/core'
// import {
//   SortableContext,
//   verticalListSortingStrategy
// } from '@dnd-kit/sortable'
// import api from '@/lib/axios'
// import { refreshEdlinkNotif } from '@/templates/edlink-notif'
// import { Board, Card } from '@/types'
// import CardItem from '@/components/Card/CardItem'
// import CardModal from '@/components/Card/CardModal'
// import Column from '@/components/Column/Column'

// export default function BoardDetailPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const { id } = router.query

//   const [board, setBoard] = useState<Board | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [activeCard, setActiveCard] = useState<Card | null>(null)
//   const [selectedCard, setSelectedCard] = useState<Card | null>(null)
//   const [error, setError] = useState('')

//   // Edit nama board
//   const [editingTitle, setEditingTitle] = useState(false)
//   const [titleInput, setTitleInput] = useState('')
//   const [savingTitle, setSavingTitle] = useState(false)
//   const titleInputRef = useRef<HTMLInputElement>(null)

//   // ✅ Refresh template
//   const [refreshing, setRefreshing] = useState(false)
//   const [refreshStatus, setRefreshStatus] = useState('')

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
//   )

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.replace('/login')
//       return
//     }
//     if (status === 'authenticated' && id) {
//       if (session?.accessToken) {
//         localStorage.setItem('accessToken', session.accessToken)
//       }
//       fetchBoard()
//     }
//   }, [status, id, session])

//   useEffect(() => {
//     if (editingTitle) {
//       titleInputRef.current?.focus()
//       titleInputRef.current?.select()
//     }
//   }, [editingTitle])

//   const fetchBoard = async () => {
//     try {
//       const res = await api.get(`/boards/${id}`)
//       setBoard(res.data.data)
//     } catch {
//       setError('Gagal memuat board')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleStartEditTitle = () => {
//     if (!board) return
//     setTitleInput(board.title)
//     setEditingTitle(true)
//   }

//   const handleSaveTitle = async () => {
//     if (!board || !titleInput.trim() || titleInput.trim() === board.title) {
//       setEditingTitle(false)
//       return
//     }
//     setSavingTitle(true)
//     try {
//       const res = await api.put(`/boards/${board.id}`, { title: titleInput.trim() })
//       setBoard(prev => prev ? { ...prev, title: res.data.data.title } : prev)
//       setEditingTitle(false)
//     } catch {
//       setError('Gagal mengubah nama board')
//     } finally {
//       setSavingTitle(false)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingTitle(false)
//     setTitleInput('')
//   }

//  const handleRefreshEdlink = async () => {
//   if (!board) return

//   setRefreshing(true)

//   try {
//     // 🔥 ambil data terbaru dulu
//     const fresh = await api.get(`/boards/${board.id}`)
//     const freshLists = fresh.data.data.lists

//     await refreshEdlinkNotif(
//       board.id,
//       freshLists, // ✅ pakai fresh
//       board.templateToken,
//       (status) => setRefreshStatus(status)
//     )

//     await fetchBoard()

//   } catch (err: any) {
//     alert(err.message)
//   } finally {
//     setRefreshing(false)
//   }
// }
//   const findCardById = (cardId: string): Card | null => {
//     if (!board) return null
//     for (const list of board.lists) {
//       const found = list.cards.find(c => c.id === cardId)
//       if (found) return found
//     }
//     return null
//   }

//   const findListByCardId = (cardId: string): string | null => {
//     if (!board) return null
//     for (const list of board.lists) {
//       if (list.cards.find(c => c.id === cardId)) return list.id
//     }
//     return null
//   }

//   const handleDragStart = (event: DragStartEvent) => {
//     const card = findCardById(event.active.id as string)
//     setActiveCard(card)
//   }

//   const handleDragEnd = async (event: DragEndEvent) => {
//     setActiveCard(null)
//     const { active, over } = event
//     if (!over || !board) return

//     const cardId = active.id as string
//     const toListId = over.id as string
//     const fromListId = findListByCardId(cardId)

//     if (!fromListId || fromListId === toListId) return

//     setBoard(prev => {
//       if (!prev) return prev
//       const card = findCardById(cardId)
//       if (!card) return prev
//       return {
//         ...prev,
//         lists: prev.lists.map(list => {
//           if (list.id === fromListId) return { ...list, cards: list.cards.filter(c => c.id !== cardId) }
//           if (list.id === toListId) return { ...list, cards: [...list.cards, { ...card, listId: toListId }] }
//           return list
//         })
//       }
//     })

//     try {
//       await api.put(`/cards/${cardId}`, { listId: toListId })
//     } catch {
//       fetchBoard()
//     }
//   }

//   const handleAddCard = async (listId: string, title: string) => {
//     try {
//       const res = await api.post('/cards', { title, listId })
//       const newCard: Card = res.data.data
//       setBoard(prev => {
//         if (!prev) return prev
//         return {
//           ...prev,
//           lists: prev.lists.map(list =>
//             list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
//           )
//         }
//       })
//     } catch {
//       setError('Gagal membuat card')
//     }
//   }

//   const handleDeleteCard = async (cardId: string, listId: string) => {
//     try {
//       await api.delete(`/cards/${cardId}`)
//       setBoard(prev => {
//         if (!prev) return prev
//         return {
//           ...prev,
//           lists: prev.lists.map(list =>
//             list.id === listId
//               ? { ...list, cards: list.cards.filter(c => c.id !== cardId) }
//               : list
//           )
//         }
//       })
//       if (selectedCard?.id === cardId) setSelectedCard(null)
//     } catch {
//       setError('Gagal menghapus card')
//     }
//   }

//   const handleUpdateCard = (updatedCard: Card) => {
//     setBoard(prev => {
//       if (!prev) return prev
//       return {
//         ...prev,
//         lists: prev.lists.map(list => ({
//           ...list,
//           cards: list.cards.map(c => c.id === updatedCard.id ? updatedCard : c)
//         }))
//       }
//     })
//     setSelectedCard(updatedCard)
//   }

//   if (status === 'loading' || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex items-center gap-2 text-sm text-gray-400">
//           <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
//           </svg>
//           Memuat board...
//         </div>
//       </div>
//     )
//   }

//   if (error || !board) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-500 text-sm mb-4">{error || 'Board tidak ditemukan'}</p>
//           <Link href="/boards" className="text-blue-600 text-sm">← Kembali</Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <Head><title>{board.title} — DhyCloud</title></Head>
//       <div className="min-h-screen bg-gray-50 flex flex-col">

//         {/* ✅ Overlay saat refresh */}
//         {refreshing && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-xs w-full mx-4">
//               <div className="flex justify-center mb-4">
//                 <svg className="animate-spin w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
//                 </svg>
//               </div>
//               <p className="text-sm font-medium text-gray-700">
//                 {refreshStatus || 'Memperbarui board...'}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Navbar */}
//         <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 flex-shrink-0">

//           {/* Kiri */}
//           <Link href="/boards" className="text-gray-400 hover:text-gray-600 transition text-sm flex-shrink-0">
//             ← Boards
//           </Link>
//           <span className="text-gray-200 flex-shrink-0">/</span>

//           {editingTitle ? (
//             <div className="flex items-center gap-2">
//               <input
//                 ref={titleInputRef}
//                 value={titleInput}
//                 onChange={e => setTitleInput(e.target.value)}
//                 onKeyDown={e => {
//                   if (e.key === 'Enter') handleSaveTitle()
//                   if (e.key === 'Escape') handleCancelEdit()
//                 }}
//                 className="text-sm font-semibold text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent px-1 min-w-0 w-40"
//               />
//               <button
//                 onClick={handleSaveTitle}
//                 disabled={savingTitle}
//                 className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg transition disabled:opacity-60 flex-shrink-0"
//               >
//                 {savingTitle ? '...' : 'Simpan'}
//               </button>
//               <button
//                 onClick={handleCancelEdit}
//                 className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
//               >
//                 Batal
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center gap-1.5">
//               <h1 className="text-sm font-semibold text-gray-900">{board.title}</h1>
//               <button
//                 onClick={handleStartEditTitle}
//                 className="text-gray-300 hover:text-gray-500 transition p-1 rounded-lg hover:bg-gray-100 flex-shrink-0"
//                 title="Ubah nama board"
//               >
//                 <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
//                   <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </div>
//           )}

//           ✅ Kanan — tombol refresh kalau isTemplate
//           {board.isTemplate && board.templateId && (
//               <div className="ml-auto">
//                <button 
//                 onClick={handleRefreshEdlink}
//                 disabled={refreshing}
//                 className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-xl transition disabled:opacity-60"
//                 title="Refresh data dari template"
//               >
//                 <svg
//                   width="13" height="13" viewBox="0 0 16 16" fill="none"
//                   className={refreshing ? 'animate-spin' : ''}
//                 >
//                   <path d="M13.5 8a5.5 5.5 0 11-1.5-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//                   <path d="M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 {refreshing ? 'Memperbarui...' : 'Refresh'}
//               </button> 
//             </div>
//           )}
//         </nav> 

//         {/* Error banner */}
//         {error && (
//           <div className="bg-red-50 text-red-600 text-sm px-6 py-3 flex items-center justify-between">
//             <span>{error}</span>
//             <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">×</button>
//           </div>
//         )}

//         {/* Board area */}
//         <div className="flex-1 overflow-x-auto p-6">
//           <DndContext
//             sensors={sensors}
//             collisionDetection={closestCenter}
//             onDragStart={handleDragStart}
//             onDragEnd={handleDragEnd}
//           >
//             <div className="flex gap-4 items-start min-w-max">
//               {board.lists.map(list => (
//                 <SortableContext
//                   key={list.id}
//                   items={list.cards.map(c => c.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   <Column
//                     list={list}
//                     onCardClick={setSelectedCard}
//                     onAddCard={handleAddCard}
//                     onDeleteCard={handleDeleteCard}
//                   />
//                 </SortableContext>
//               ))}
//             </div>

//             <DragOverlay>
//               {activeCard && (
//                 <CardItem
//                   card={activeCard}
//                   onDelete={() => {}}
//                   onClick={() => {}}
//                   isDragging
//                 />
//               )}
//             </DragOverlay>
//           </DndContext>
//         </div>

//       </div>

//       {selectedCard && (
//         <CardModal
//           card={selectedCard}
//           onClose={() => setSelectedCard(null)}
//           onUpdate={handleUpdateCard}
//           onDelete={(cardId: string) => handleDeleteCard(cardId, selectedCard.listId)}
//         />
//       )}
//     </>
//   )
// }

import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  DndContext,
  pointerWithin,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy
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
  const [loading, setLoading] = useState(true)
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [error, setError] = useState('')

  const [overId, setOverId] = useState<string | null>(null)
  // Edit nama board
  const [editingTitle, setEditingTitle] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const [savingTitle, setSavingTitle] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  // ✅ Refresh template
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

  const handleStartEditTitle = () => {
    if (!board) return
    setTitleInput(board.title)
    setEditingTitle(true)
  }

  const handleSaveTitle = async () => {
    if (!board || !titleInput.trim() || titleInput.trim() === board.title) {
      setEditingTitle(false)
      return
    }
    setSavingTitle(true)
    try {
      const res = await api.put(`/boards/${board.id}`, { title: titleInput.trim() })
      setBoard(prev => prev ? { ...prev, title: res.data.data.title } : prev)
      setEditingTitle(false)
    } catch {
      setError('Gagal mengubah nama board')
    } finally {
      setSavingTitle(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingTitle(false)
    setTitleInput('')
  }

 const handleRefreshTemplate = async () => {
  if (!board?.templateId || !board?.isTemplate) return
  setRefreshing(true)
  setRefreshStatus('')
  setError('')

  try {
    // ✅ Ambil data fresh dulu supaya existingLists up to date
    const fresh = await api.get(`/boards/${board.id}`)
    const freshLists = fresh.data.data.lists

    await runTemplateRefresh(
      board.templateId,
      board.id,
      freshLists,                        // ✅ pakai fresh
      board.templateToken ?? null,       // ✅ pass token dari board
      (s: string) => setRefreshStatus(s) // ✅ fix: tambah type s
    )
    await fetchBoard()
  } catch (err: any) {
    setError(err.message || 'Gagal refresh template')
  } finally {
    setRefreshing(false)
    setRefreshStatus('')
  }
}

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

  const handleDragStart = (event: DragStartEvent) => {
    const card = findCardById(event.active.id as string)
    setActiveCard(card)
  }

const handleDragOver = (event: DragOverEvent) => {
  const { over } = event
  setOverId(over ? String(over.id) : null)
}

const handleDragEnd = async (event: DragEndEvent) => {
  setActiveCard(null)
    setOverId(null) 

  const { active, over } = event
  if (!over || !board) return

  const cardId = active.id as string
  const overId = over.id as string

  const fromListId = findListByCardId(cardId)
  if (!fromListId) return

  const movedCard = findCardById(cardId)
  if (!movedCard) return

  let toListId = ''
  let newIndex = 0

  // 🔥 CEK: drop di card atau list
  const isOverCard = !!findCardById(overId)

  if (isOverCard) {
    const overCard = findCardById(overId)!
    toListId = overCard.listId

    const list = board.lists.find(l => l.id === toListId)!
    newIndex = list.cards.findIndex(c => c.id === overId)
  } else {
    // drop di area kosong list
    toListId = overId
    const list = board.lists.find(l => l.id === toListId)!
    newIndex = list.cards.length
  }

  // ❌ kalau posisi sama, skip
  if (fromListId === toListId && newIndex === -1) return

  // ✅ OPTIMISTIC UPDATE
  setBoard(prev => {
    if (!prev) return prev

    let newLists = prev.lists.map(list => {
      if (list.id === fromListId) {
        return {
          ...list,
          cards: list.cards.filter(c => c.id !== cardId)
        }
      }
      return list
    })

    newLists = newLists.map(list => {
      if (list.id === toListId) {
        const newCards = [...list.cards]
        newCards.splice(newIndex, 0, { ...movedCard, listId: toListId })
        return { ...list, cards: newCards }
      }
      return list
    })

    return { ...prev, lists: newLists }
  })

  try {
    await api.put(`/cards/${cardId}`, {
      listId: toListId,
      position: newIndex // optional kalau backend support
    })
  } catch {
    fetchBoard()
  }
}

  const handleAddCard = async (listId: string, title: string) => {
    try {
      const res = await api.post('/cards', { title, listId })
      const newCard: Card = res.data.data
      setBoard(prev => {
        if (!prev) return prev
        return {
          ...prev,
          lists: prev.lists.map(list =>
            list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
          )
        }
      })
    } catch {
      setError('Gagal membuat card')
    }
  }

  const handleDeleteCard = async (cardId: string, listId: string) => {
    try {
      await api.delete(`/cards/${cardId}`)
      setBoard(prev => {
        if (!prev) return prev
        return {
          ...prev,
          lists: prev.lists.map(list =>
            list.id === listId
              ? { ...list, cards: list.cards.filter(c => c.id !== cardId) }
              : list
          )
        }
      })
      if (selectedCard?.id === cardId) setSelectedCard(null)
    } catch {
      setError('Gagal menghapus card')
    }
  }

  const handleUpdateCard = (updatedCard: Card) => {
    setBoard(prev => {
      if (!prev) return prev
      return {
        ...prev,
        lists: prev.lists.map(list => ({
          ...list,
          cards: list.cards.map(c => c.id === updatedCard.id ? updatedCard : c)
        }))
      }
    })
    setSelectedCard(updatedCard)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          Memuat board...
        </div>
      </div>
    )
  }

  if (error || !board) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">{error || 'Board tidak ditemukan'}</p>
          <Link href="/boards" className="text-blue-600 text-sm">← Kembali</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head><title>{board.title} — DhyCloud</title></Head>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* ✅ Overlay saat refresh */}
        {refreshing && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl text-center max-w-xs w-full mx-4">
              <div className="flex justify-center mb-4">
                <svg className="animate-spin w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {refreshStatus || 'Memperbarui board...'}
              </p>
            </div>
          </div>
        )}

        {/* Navbar */}
        <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 flex-shrink-0">

          {/* Kiri */}
          <Link href="/boards" className="text-gray-400 hover:text-gray-600 transition text-sm flex-shrink-0">
            ← Boards
          </Link>
          <span className="text-gray-200 flex-shrink-0">/</span>

          {editingTitle ? (
            <div className="flex items-center gap-2">
              <input
                ref={titleInputRef}
                value={titleInput}
                onChange={e => setTitleInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSaveTitle()
                  if (e.key === 'Escape') handleCancelEdit()
                }}
                className="text-sm font-semibold text-gray-900 border-b-2 border-blue-500 outline-none bg-transparent px-1 min-w-0 w-40"
              />
              <button
                onClick={handleSaveTitle}
                disabled={savingTitle}
                className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg transition disabled:opacity-60 flex-shrink-0"
              >
                {savingTitle ? '...' : 'Simpan'}
              </button>
              <button
                onClick={handleCancelEdit}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
              >
                Batal
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-semibold text-gray-900">{board.title}</h1>
              <button
                onClick={handleStartEditTitle}
                className="text-gray-300 hover:text-gray-500 transition p-1 rounded-lg hover:bg-gray-100 flex-shrink-0"
                title="Ubah nama board"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}

          {/* ✅ Kanan — tombol refresh kalau isTemplate */}
          {board.isTemplate && board.templateId && (
            <div className="ml-auto">
              <button
                onClick={handleRefreshTemplate}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 px-3 py-1.5 rounded-xl transition disabled:opacity-60"
                title="Refresh data dari template"
              >
                <svg
                  width="13" height="13" viewBox="0 0 16 16" fill="none"
                  className={refreshing ? 'animate-spin' : ''}
                >
                  <path d="M13.5 8a5.5 5.5 0 11-1.5-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {refreshing ? 'Memperbarui...' : 'Refresh'}
              </button>
            </div>
          )}
        </nav>

        {/* Error banner */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-6 py-3 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">×</button>
          </div>
        )}

        {/* Board area */}
        <div className="flex-1 overflow-x-auto p-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners }
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}   // 🔥 tambah
          >
            <div className="flex gap-4 items-start min-w-max">
              {board.lists.map(list => (
                <SortableContext
                  key={list.id}
                  items={list.cards.map(c => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Column
                    list={list}
                    onCardClick={setSelectedCard}
                    onAddCard={handleAddCard}
                    onDeleteCard={handleDeleteCard}
                     overId={overId}  
                  />
                </SortableContext>
              ))}
            </div>

            <DragOverlay>
              {activeCard && (
                <CardItem
                  card={activeCard}
                  onDelete={() => {}}
                  onClick={() => {}}
                  isDragging
                />
              )}
            </DragOverlay>
          </DndContext>
        </div>

      </div>

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={handleUpdateCard}
          onDelete={(cardId: string) => handleDeleteCard(cardId, selectedCard.listId)}
        />
      )}
    </>
  )
}