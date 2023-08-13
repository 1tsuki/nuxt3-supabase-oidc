import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const payload = {
    userId: 'abc',
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  }

  const {sign} = jwt
  return sign(payload, config.SUPABASE_JWT_SECRET)
})