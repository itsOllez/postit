"use client"
import axios from "axios"
import {useQuery} from "@tanstack/react-query"
import Post from './Post'
import { PostType } from '../types/Posts'


export default function FetchPost() {

    const allPosts = async() => {
        const response = await axios.get('/api/posts/getPosts')
        return response.data
    }

    const {data, error, isLoading} = useQuery<PostType[]>({
        queryFn: allPosts, 
        queryKey: ['posts'],
    })

    if (isLoading) {
        return(<div>Loadin...</div>)
    }
    if (error) {
        return(<div>There's a problem...</div>)
    }

    return(
        <div>
        {data?.map((post) => (
            <Post key={post.id} id={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title} comments={post.Comment} />
            )) }
        </div>
    )
}