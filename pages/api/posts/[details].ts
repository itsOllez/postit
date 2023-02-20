import prisma from '../../../prisma/client'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method == "GET"){
     
        console.log(req.query)

        try {
           const data = await prisma.post.findUnique({
            where: {
                id: req.query.details,
            },
            include: {
                user: true,
                Comment: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                include: {
                    user: true
                }
                } 
            }
           })
            return res.status(200).json(data)
        } catch(err){
            res.status(403).json({err: 'Error when fetching posts'})
        }
    }
}
