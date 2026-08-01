import { About } from '@/components/home/about'
import { Companies } from '@/components/home/companies'
import { Hero } from '@/components/home/hero'
import { NextPages } from '@/components/home/next-pages'
import { SelectedWork } from '@/components/home/selected-work'
import { Services } from '@/components/home/services'
import { Skills } from '@/components/home/skills'
import { StackMarquee } from '@/components/home/stack-marquee'
import { Stats } from '@/components/home/stats'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <About />
      <Stats />
      <Services />
      <SelectedWork />
      <Companies />
      <Skills />
      <NextPages />
    </>
  )
}
