import { v4 as uuidv4 } from "uuid"

export default defineEventHandler(async (event) => {
  const idpInitValues = {
    state: uuidv4(),
    nonce: uuidv4()
  }
  
  const config = useRuntimeConfig()
  await useStorage().setItem(`redis:${config.sessionIdPrefix}${event.context.sessionId}`, JSON.stringify(idpInitValues))

  return sendRedirect(event, 'https://example.com', 302)
})