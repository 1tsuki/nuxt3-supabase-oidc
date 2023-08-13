import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  return await useStorage().getItem(`redis:${config.sessionIdPrefix}${event.context.sessionId}`)
})