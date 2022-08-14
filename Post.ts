export default interface Post{
    id: string,
    title: string,
    createAt: Date,
    content: string,
    images: ContentImage[]
}

interface ContentImage{
    url: string,
    des: string
}