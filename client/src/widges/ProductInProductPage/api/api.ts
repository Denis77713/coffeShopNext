"use server"

import { prisma } from "../../../../prisma/prisma-client"

interface Grade {
  id: number
  grade: number
  comment: string | null
  userAnonim: boolean
  productId: number
  userId: number
}

export async function getComment(grade: Grade[]) {
  const result = []
  const usersId = grade
    .map((item) => item.userId)
    .filter((item) => item !== null)
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: usersId,
      },
    },
  })
  for (let i = 0; i < users.length; i++) {
    for (let q = 0; q < grade.length; q++) {
      if (users[i].id === grade[q].userId) {
        result.push({
          id: grade[q].id,
          user: users[i].name,
          grade: grade[q].grade,
          comment: grade[q].comment,
        })
      }
    }
  }
  return result
}
