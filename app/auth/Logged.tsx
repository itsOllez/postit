'use client'

import Image from "next/image"
import {signOut} from "next-auth/react"
import Link from "next/link"
import { imageConfigDefault } from "next/dist/shared/lib/image-config"

type User = {
    image: string
}

export default function Logged( {image} : User) {

    return(
        <li className="flex gap-8 items-center">
            <button onClick={() => signOut()} className="text-sm px-6 py-2">
                Sign Out
            </button>
            <Link href={"/dashboard"}>
                <Image className="rounded-md" alt="Profile picture" width={64} height={64} src={image}/>
            </Link>
        </li>
    )
}