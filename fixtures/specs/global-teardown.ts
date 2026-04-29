import { stopMailpit } from "@neoma/fixtures/docker"

const NODE_ENV = process.env.NODE_ENV || "specs"

export default async (): Promise<void> => {
  await stopMailpit({ prefix: `garmr-${NODE_ENV}` })
}
