import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  let sessionId = getCookie(event, config.sessionCookieName)

  if (!sessionId) {
    sessionId = uuidv4()
    await useStorage().setItem(`redis:${config.sessionIdPrefix}${sessionId}`, JSON.stringify({}))
    setCookie(event, config.sessionCookieName, sessionId)
  }

  event.context.sessionId = sessionId
})