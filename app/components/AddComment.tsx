'use client'

import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, {AxiosError} from 'axios'
import toast from 'react-hot-toast'


type PostProps = {
    id?: string
}

type Comment = {
    postId?: string
    title: string
}

export default function AddComment({id} : PostProps) {
    const [title, setTitle] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()
    let commentToastID: string

    const {mutate} = useMutation(
        async (data: Comment) => axios.post('/api/posts/addComment', {data}),
        {
            onSuccess: data => {
                setTitle("")
                setIsDisabled(false)
                queryClient.invalidateQueries(["detail-post"])
                toast.success('Post has been made! 🔥', {id: commentToastID})
                
            },
            onError: (error) => {
                setIsDisabled(false)
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message, {id: commentToastID})
                }
            }
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentToastID = toast.loading('Adding your comment!', {id: commentToastID})
        mutate({title, postId: id})
    }

    return(
        <form onSubmit={submitComment} className="my-8">
            <h3 className="text-xl">Add a comment</h3>
            <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2 bg-white"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-300 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-500" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
         </div>
        </form>
    )
}