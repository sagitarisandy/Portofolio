import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import userData from '../constants/data'
import { cases } from '../constants/cases'

/* Sisi lidah map. Path diambil dari sumbernya (viewBox 62x44, dipakai
   dengan preserveAspectRatio="none" jadi rasionya = --tag-aspect-ratio). */
const TAG_SIDE_PATH =
  'M0 0L1.1449 0C11.0649 0 20.3434 4.90373 25.9318 13.0999L38.5499 31.6066C43.8369 39.3607 52.6151 44 62 44L0 44Z'

/* gsap power4.out ≈ cubic-bezier(.23,1,.32,1) */
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : useEffect

const HERO_TITLE = 'Selected work'

/* Palet persis dari sumbernya. Kuning butuh teks gelap. */
const RED = '#D71E1E'
const BLUE = '#1E4BD7'
const PURPLE = '#581E70'
const BLACK = '#000000'
const YELLOW = '#FFE927'
const TEAL = '#0C7866'
const fgFor = (bg) => (bg === YELLOW ? '#000' : '#fff')

/* Project dikelompokkan jadi map — urutan array = belakang ke depan.
   Warna sampul grup = warna case pertamanya, sama seperti aslinya. */
const GROUPS = [
  {
    category: 'Brand & Illustration',
    desc: 'Work that had to carry a personality before it carried a function. Marks, characters and illustration systems for teams who needed a face across a dozen markets at once — where the drawing does the arguing.',
    cases: [
      { nama: 'Sylaps', tag: 'Sylaps', color: BLUE },
      { nama: 'Santa Forest', tag: 'Santa Forest', color: RED },
      { nama: 'Pixel Dojo', tag: 'Pixel Dojo', color: YELLOW },
    ],
  },
  {
    category: 'Studio & Marketing',
    desc: 'Sites built to sell something. Agencies, rental fleets and personal-development communities, each needing the same thing from a different angle: a page that reads clearly in one language and survives translation into six more.',
    cases: [
      { nama: 'Gurulabs', tag: 'Gurulabs', color: TEAL },
      { nama: 'Mindset Dev', tag: 'Mindset Dev', color: PURPLE },
      { nama: 'Soluty Renting', tag: 'Soluty', color: RED },
    ],
  },
  {
    category: 'Web Platforms',
    desc: 'Products where the interface is the whole service. Greeting cards that arrive on time, hotel operations that cannot go down, and a marketplace for finding the people who actually know their CRM.',
    cases: [
      { nama: 'Group Greet', tag: 'Group Greet', color: PURPLE },
      { nama: 'Hotel Core', tag: 'Hotel Core', color: YELLOW },
      { nama: 'CRM Guru', tag: 'CRM Guru', color: BLUE },
    ],
  },
  {
    category: 'Mobile & Field',
    desc: 'Applications that leave the desk. Solar panels tracked from a rooftop, a rare-disease alliance reaching families who are rarely reached, and a residence app that has to work while you are standing at the gate.',
    cases: [
      { nama: 'SolarKita', tag: 'SolarKita', color: BLACK },
      { nama: 'Alagille Syndrome Alliance', tag: 'Alagille', color: TEAL },
      { nama: 'ThriveWorks', tag: 'Thriveworks', color: RED },
    ],
  },
  {
    category: 'Product & Systems',
    desc: 'The long ones. Academic systems with five conflicting roles, estate management for an entire housing complex, and lead pipelines that finance teams audit — where the hard part is the model underneath, not the screen.',
    cases: [
      { nama: 'UMB (Mercu Buana University)', tag: 'Mercu Buana', color: RED },
      { nama: 'Vasanta Estate Management', tag: 'Vasanta', color: BLUE, slug: 'vasanta' },
      { nama: 'SQM/FAST', tag: 'SQM / FAST', color: YELLOW },
    ],
  },
]

const byName = (nama) => userData.project.find((p) => p.nama === nama)

const stack = GROUPS.map((g) => ({
  ...g,
  cases: g.cases.map((c) => ({ ...c, project: byName(c.nama) })).filter((c) => c.project),
}))

const STACK_LENGTH = stack.length

function ChevronDown() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 3.75L6.17542 8.25L9.5 3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TagSide({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 62 44"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={TAG_SIDE_PATH} fill="currentColor" />
    </svg>
  )
}

/* Satu lidah per case, dirender di SETIAP halaman grup — yang bukan
   miliknya jadi dummy transparan supaya lidah tiap halaman berdiri di
   posisi horizontalnya sendiri, persis seperti map arsip beneran. */
function Tag({ name, isVisible, color, bgColor }) {
  return (
    <div
      className={`tag${isVisible ? ' is-visible' : ''}`}
      aria-hidden={!isVisible}
      style={{ '--color': color, '--bg-color': bgColor }}
    >
      {isVisible ? (
        <TagSide className="tag__start" />
      ) : (
        <div className="tag__side-dummy tag__start" />
      )}
      <div className="tag__middle">
        <span>{name}</span>
      </div>
      {isVisible ? (
        <TagSide className="tag__end" />
      ) : (
        <div className="tag__side-dummy tag__end" />
      )}
    </div>
  )
}

export default function Files() {
  const rootRef = useRef(null)
  const router = useRouter()

  /* Store hover — sama persis dengan yang dipakai sumbernya. */
  const [hovered, setHovered] = useState(false)
  const [hoverGroupId, setHoverGroupId] = useState(-1)
  const [hoverPageId, setHoverPageId] = useState(-1)
  const [unfolded, setUnfolded] = useState(false)
  const lockedRef = useRef(false)

  const [loading, setLoading] = useState(true)
  const [popup, setPopup] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)

  const enterPage = useCallback((groupId, pageId) => {
    if (lockedRef.current) return
    setHovered(true)
    setUnfolded(false)
    setHoverPageId(pageId)
    setHoverGroupId(groupId)
  }, [])

  const leavePage = useCallback(() => {
    if (lockedRef.current) return
    setHovered(false)
    setHoverPageId(-1)
    setHoverGroupId(-1)
  }, [])

  const enterUnfold = useCallback((groupId, pageId) => {
    if (lockedRef.current) return
    setHovered(true)
    setUnfolded(true)
    setHoverPageId(pageId)
    setHoverGroupId(groupId)
  }, [])

  const leaveUnfold = useCallback(() => {
    if (lockedRef.current) return
    setUnfolded(false)
  }, [])

  const openCase = useCallback(
    (project, slug) => {
      lockedRef.current = true
      if (slug && cases[slug]) {
        router.push(`/work/${slug}`)
        return
      }
      setPopup(project)
      requestAnimationFrame(() => setPopupOpen(true))
    },
    [router]
  )

  const closeCase = useCallback(() => {
    setPopupOpen(false)
    lockedRef.current = false
    setHovered(false)
    setHoverPageId(-1)
    setHoverGroupId(-1)
    setUnfolded(false)
    setTimeout(() => setPopup(null), 700)
  }, [])

  useEffect(() => {
    if (!popup) return undefined
    const onKey = (e) => e.key === 'Escape' && closeCase()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [popup, closeCase])

  /* Timeline intro — port dari timeline gsap di sumbernya:
       .stack        yPercent -50 -> 0
       .stack-group  yPercent 200 + scale 1.75 -> 0/1, stagger 15ms
       judul         per baris, char yPercent 100 -> 0, mulai 0.4s + i*0.2s
       deskripsi     y 2rem -> 0, mulai 0.9s                              */
  useIsoLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    /* Navbar situs ini sticky, jadi tingginya ikut makan flow — sumbernya
       pakai header fixed. Diukur sekali supaya hero tetap pas satu layar. */
    const nav = document.querySelector('.sticky')
    if (nav) {
      root.style.setProperty(
        '--fs-nav-height',
        `${nav.getBoundingClientRect().height}px`
      )
    }

    root.classList.remove('is-loading')
    setLoading(false)

    if (
      typeof window === 'undefined' ||
      typeof root.animate !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    const anims = []
    const play = (el, frames, opts) => {
      if (el) anims.push(el.animate(frames, { easing: EASE_OUT, fill: 'backwards', ...opts }))
    }

    play(
      root.querySelector('.stack'),
      [{ transform: 'translateY(-50%)' }, { transform: 'translateY(0%)' }],
      { duration: 500 }
    )

    root.querySelectorAll('.stack-group').forEach((el, i) => {
      play(
        el,
        [
          { transform: 'translateY(200%) scale(1.75)' },
          { transform: 'translateY(0%) scale(1)' },
        ],
        { duration: 500, delay: i * 15 }
      )
    })

    /* Char dikelompokkan per baris hasil wrap (offsetTop), lalu tiap baris
       masuk dengan jeda 0.2s — sama seperti SplitText di sumbernya. */
    const lines = new Map()
    root.querySelectorAll('.fs-hero__mask').forEach((mask) => {
      const top = mask.offsetTop
      if (!lines.has(top)) lines.set(top, [])
      lines.get(top).push(mask.firstChild)
    })
    ;[...lines.keys()]
      .sort((a, b) => a - b)
      .forEach((top, i) => {
        lines.get(top).forEach((char) => {
          play(
            char,
            [
              { transform: 'translateY(100%)', opacity: 0 },
              { transform: 'translateY(0%)', opacity: 1 },
            ],
            { duration: 900, delay: 400 + i * 200 }
          )
        })
      })

    play(
      root.querySelector('.fs-hero__desc'),
      [
        { transform: 'translateY(28px)', opacity: 0 },
        { transform: 'translateY(0px)', opacity: 1 },
      ],
      { duration: 650, delay: 900 }
    )

    return () => anims.forEach((a) => a.cancel())
  }, [])

  return (
    <div className={`fs${loading ? ' is-loading' : ''}`} ref={rootRef}>
      <section className="fs-hero fs__container">
        <div className="fs-hero__inner">
          <h1 className="fs-hero__title">
            {HERO_TITLE.split(' ').map((word, wi) => (
              <React.Fragment key={word}>
                {wi > 0 ? ' ' : null}
                <span className="fs-hero__word">
                  {word.split('').map((char, ci) => (
                    <span className="fs-hero__mask" key={`${word}-${ci}`}>
                      <span className="fs-hero__char">{char}</span>
                    </span>
                  ))}
                </span>
              </React.Fragment>
            ))}
          </h1>
          <p className="fs-hero__desc fs-par-1">
            Fifteen digital products shipped with teams across eight countries —
            academic systems, solar fleets, rare-disease platforms and the brands
            wrapped around them. Pull a folder to read the file.
          </p>
        </div>
      </section>

      <div className="fs__container">
        <div className="stack" style={{ '--fs-count': STACK_LENGTH }}>
          {stack.map((group, groupId) => {
            const sameGroup = hoverGroupId === groupId
            const isLast = groupId === STACK_LENGTH - 1
            const groupRotated = hovered && groupId > hoverGroupId
            const groupUnfolded = unfolded && groupId > hoverGroupId

            const coverHovered = hovered && hoverPageId === 0 && sameGroup
            const coverRotated = hovered && hoverPageId >= 0 && sameGroup
            const coverUnfolded =
              ((unfolded || hovered) && sameGroup) ||
              (!unfolded && hoverPageId === -1 && isLast)

            return (
              <div
                key={group.category}
                className={`stack-group${groupRotated ? ' is-rotated' : ''}${
                  groupUnfolded ? ' is-unfolded' : ''
                }`}
                style={{
                  '--fs-above': STACK_LENGTH - groupId - 1,
                  '--fs-z': groupId,
                  '--cover-color': fgFor(group.cases[0].color),
                  '--cover-bg-color': group.cases[0].color,
                }}
              >
                <div className="stack-group__inner">
                  <div
                    className={`stack-cover${coverHovered ? ' is-hovered' : ''}${
                      coverRotated ? ' is-rotated' : ''
                    }${coverUnfolded ? ' is-unfolded' : ''}`}
                  >
                    <div className="stack-cover__desc fs-caption">{group.desc}</div>
                    <div className="stack-cover__category fs-caption">
                      <span>{group.category}</span>
                      <ChevronDown />
                    </div>
                    {isLast ? (
                      <div className="stack-cover__foot fs-caption">
                        <div className="flex items-end justify-between uppercase">
                          <span>© {new Date().getFullYear()}</span>
                          <span className="hidden sm:inline">
                            {group.cases.length * STACK_LENGTH} files · 8 countries
                          </span>
                          <a href="/link" className="underline">
                            Get in touch
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {group.cases.map((item, pageId) => {
                    const project = item.project
                    const pageHovered = hovered && pageId === hoverPageId && sameGroup
                    const pageRotated = hovered && pageId < hoverPageId && sameGroup

                    return (
                      <div
                        key={item.nama}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${project.nama}`}
                        className={`stack-page${pageHovered ? ' is-hovered' : ''}${
                          pageRotated ? ' is-rotated' : ''
                        }`}
                        style={{
                          '--fs-pz': -pageId,
                          '--color': fgFor(item.color),
                          '--bg-color': item.color,
                        }}
                        onMouseEnter={() => {
                          enterPage(groupId, pageId)
                          if (item.slug && cases[item.slug]) router.prefetch(`/work/${item.slug}`)
                        }}
                        onMouseLeave={leavePage}
                        onClick={() => openCase(project, item.slug)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            openCase(project, item.slug)
                          }
                        }}
                      >
                        <div className="stack-page__bg" />
                        <div className="stack-page__header">
                          {group.cases.map((c, i) => (
                            <Tag
                              key={c.tag}
                              name={c.tag}
                              isVisible={i === pageId}
                              color={fgFor(item.color)}
                              bgColor={item.color}
                            />
                          ))}
                        </div>

                        <div
                          className="stack-page__unfold-area"
                          onMouseEnter={() => enterUnfold(groupId, pageId)}
                          onMouseLeave={leaveUnfold}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {popup ? (
        <div className={`fs-popup${popupOpen ? '' : ' is-closed'}`}>
          <div className="fs-popup__bg" onClick={closeCase} />
          <div className="fs-popup__main">
            <button
              type="button"
              className="fs-popup__close"
              onClick={closeCase}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <img
              src={popup.img}
              alt={popup.nama}
              className="h-64 w-full object-cover object-top sm:h-80"
            />
            <div className="p-7 sm:p-10">
              <p className="fs-caption uppercase opacity-60">
                {popup.country} — {popup.stack}
              </p>
              <h2
                className="mt-2 text-4xl sm:text-5xl"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                {popup.nama}
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed opacity-80">{popup.desc}</p>
              {popup.url ? (
                <a
                  href={popup.url}
                  target="_blank"
                  rel="noreferrer"
                  className="fs-caption mt-7 inline-block border-b-2 border-current pb-1 uppercase"
                >
                  See live ↗
                </a>
              ) : (
                <p className="fs-caption mt-7 uppercase opacity-50">
                  Confidential — under NDA
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
