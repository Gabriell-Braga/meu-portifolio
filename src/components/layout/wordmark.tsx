import { profile } from '@/content/profile'

/** "GabrielBraga." com o ponto final na cor de destaque. */
export function Wordmark() {
  return (
    <>
      {profile.wordmark}
      <span className="text-accent">.</span>
    </>
  )
}
