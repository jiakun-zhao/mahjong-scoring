import { createQrCode } from "~/utils/cloud"
import { getOpenid } from "~/utils/openid"

export async function createRoom(db: DB.CollectionReference, openid?: string) {
  if (!openid) {
    openid = await getOpenid()
  }
  const { _id } = await db.add({
    data: {
      users: [openid],
      isStart: false,
      isEnd: false,
      createdAt: new Date(),
      factor: 1,
      cost: null,
      scoring: [],
    },
  })
  await createQrCode(_id as string)
  return _id as string
}

export async function getRoomInfo(db: DB.CollectionReference, scene: string) {
  const { data } = await db.doc(scene).get()
  return data
}