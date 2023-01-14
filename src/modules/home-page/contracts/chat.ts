

export interface ChatInterface {
  id: string
  title: string
  imageUrl: string
  lastMessage?: MessageInterface
}

export interface MessageInterface {
  text: string
  createdAt: string
  authorId: number
}
