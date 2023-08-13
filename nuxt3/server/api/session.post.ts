import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const config = useRuntimeConfig()
  await useStorage().setItem(`redis:${config.sessionIdPrefix}${event.context.sessionId}`, body)
  return 'Data is set'
})