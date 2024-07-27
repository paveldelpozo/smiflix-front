export interface VideoInterface {
    id: string|null
    categoryId: string|null
    title: string
    description: string
    thumbnail: string|null
    imageBackground: string|null
    publishedAt: string
    duration: string|null
    seconds: number|null
    views: number
    likes: number
    dislikes: number
}
