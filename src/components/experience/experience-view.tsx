'use client'

import { Timeline } from '@/components/experience/timeline'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Magnetic } from '@/components/motion/magnetic'
import { ExperienceHeroYears } from '@/components/experience/experience-hero-years'
import { Container, SectionLabel } from '@/components/ui/section'
import { PageHero } from '@/components/ui/page-hero'
import { useLang } from '@/components/providers/lang-provider'
import { education, languages } from '@/content/experience'
import { profile, skillGroups, skillLabel } from '@/content/profile'

export function ExperienceView() {
  const { t, pick, lang } = useLang()

  return (
    <>
      <PageHero
        label={t.experience.label}
        title={t.experience.title}
        intro={t.experience.intro}
        aside={<ExperienceHeroYears />}
        meta={[
          { key: t.experience.yearsLabel, value: '6+' },
          { key: t.experience.companiesLabel, value: '10+' },
          { key: t.experience.sinceLabel, value: '2021' },
        ]}
      />

      <Container className="pb-24">
        <Reveal className="flex flex-wrap items-center gap-6">
          <Magnetic strength={0.2}>
            <a
              href={profile.cv}
              download
              className="gb-label flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
            >
              {t.experience.downloadCv}
              <span aria-hidden>↓</span>
            </a>
          </Magnetic>
        </Reveal>

        <Timeline />

      <section className="gb-rule mt-28 border-line pt-16">
        <SectionLabel>{t.experience.educationLabel}</SectionLabel>

        <Reveal className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <h2 className="gb-face gb-heading">{pick(education.institution)}</h2>
            <p className="mt-2 gb-lead text-muted">{pick(education.degree)}</p>
          </div>
          <div className="text-end">
            <p className="gb-label">{pick(education.period)}</p>
            <p className="gb-label mt-2">{pick(education.location)}</p>
          </div>
        </Reveal>
      </section>

      <section className="gb-rule mt-20 border-line pt-16">
        <SectionLabel>{t.experience.skillsLabel}</SectionLabel>

        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <RevealGroup key={group.id} amount={0.03}>
              <RevealItem>
                <h3 className="text-lg font-semibold">{pick(group.title)}</h3>
              </RevealItem>
              <RevealItem className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const name = skillLabel(item, lang)
                  return (
                    <span
                      key={name}
                      className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted"
                    >
                      {name}
                    </span>
                  )
                })}
              </RevealItem>
            </RevealGroup>
          ))}
        </div>
      </section>

      <section className="gb-rule mt-20 border-line pt-16">
        <SectionLabel>{t.experience.languagesLabel}</SectionLabel>

        <RevealGroup amount={0.1} className="mt-8 flex flex-wrap gap-x-16 gap-y-6">
          {languages.map((language) => (
            <RevealItem key={language.name.en}>
              <p className="gb-lead">{pick(language.name)}</p>
              <p className="gb-label mt-1">{pick(language.level)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      </Container>
    </>
  )
}
