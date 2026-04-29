import { randomBytes, randomUUID } from "crypto"
import { join } from "path"

import { startMailpit } from "@neoma/fixtures/docker"

const NODE_ENV = process.env.NODE_ENV || "specs"
const isE2E = NODE_ENV === "e2e"

// Mailpit ports: specs uses 1025/8025, e2e uses 1026/8026
const MAILPIT_SMTP_PORT = isE2E ? 1026 : 1025
const MAILPIT_API_PORT = isE2E ? 8026 : 8025

// Set environment variables for tests
process.env.GARMR_SECRET = randomBytes(32).toString("hex")
process.env.MAILPIT_AUTH_USER = "ripley"
process.env.MAILPIT_AUTH_PASS = "xenomorph"
process.env.APP_URL = `https://${randomUUID()}.test`
process.env.MAGIC_LINK_FROM = `${randomUUID()}@weylandyutani.com`
process.env.MAGIC_LINK_WELCOME_SUBJECT = `Welcome ${randomUUID()}`
process.env.MAGIC_LINK_WELCOME_BACK_SUBJECT = `Welcome back ${randomUUID()}`

export default async (): Promise<void> => {
  const htpasswdPath = join(__dirname, "..", "email", "smtp-auth.htpasswd")

  await startMailpit({
    prefix: `garmr-${NODE_ENV}`,
    smtpPort: MAILPIT_SMTP_PORT,
    apiPort: MAILPIT_API_PORT,
    htpasswd: htpasswdPath,
  })
}
