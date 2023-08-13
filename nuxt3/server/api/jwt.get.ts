import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const payload = {
    sub: '1818da01-dd2f-4b34-a3f9-27ef1d78e556',
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  }

  const { sign } = jwt
  return sign(payload, config.SUPABASE_JWT_SECRET)
})