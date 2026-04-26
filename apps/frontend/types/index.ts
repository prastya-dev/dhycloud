export interface User {
  id: string
  name: string | null
  email: string
  isAdmin: boolean
}

export interface Board {
  id: string
  title: string
  ownerId: string
  owner: Pick<User, 'id' | 'name' | 'email'>
  lists: List[]
  members: BoardMember[]
  _count?: { lists: number; members: number }
  createdAt: string
  updatedAt: string
}

export interface BoardMember {
  id: string
  role: 'owner' | 'member'
  userId: string
  user: Pick<User, 'id' | 'name' | 'email'>
}

export interface List {
  id: string
  title: string
  position: number
  boardId: string
  cards: Card[]
}

export interface Card {
  id: string
  title: string
  description: string | null
  position: number
  dueDate: string | null
  listId: string
  links: CardLink[]
  createdAt: string
  updatedAt: string
}

export interface CardLink {
  id: string
  url: string
  label: string | null
  cardId: string
  createdAt: string
}