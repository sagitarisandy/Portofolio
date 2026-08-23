import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* Paperclip — path diambil dari sumbernya (viewBox 24x107) */
const PAPERCLIP_PATH =
  'M2.05513 5.28193C4.21232 2.09502 7.8614 0.000174314 11.9995 3.55316e-05C18.6269 3.55316e-05 23.9995 5.37279 23.9996 12.0001L24.0003 95.0002C24.0003 101.628 18.6275 107 12.0002 107C5.37279 107 0.00010339 101.628 0.00010339 95.0002L0.00010339 42.905H1.99989L1.99989 95.0002C1.99989 100.523 6.47735 105.001 12.0002 105.001C17.5229 105 22.0005 100.523 22.0005 95.0002L21.9998 12.0001C21.9997 6.47745 17.5229 2.00066 12.0002 2.00051C8.34976 2.00051 5.15651 3.95666 3.41065 6.87775L2.05513 5.28193Z'

const TAG_SIDE_PATH =
  'M0 0L1.1449 0C11.0649 0 20.3434 4.90373 25.9318 13.0999L38.5499 31.6066C43.8369 39.3607 52.6151 44 62 44L0 44Z'

/* gsap power3.out */
const EASE_OUT = 'cubic-bezier(0.215, 0.61, 0.355, 1)'

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : useEffect

const fgFor = (bg) => (bg === '#FFE927' ? '#000' : '#fff')

function TagSide({ className }) {
  return (
    <svg className={className} viewBox="0 0 62 44" preserveAspectRatio="none" aria-hidden="true">
      <path d={TAG_SIDE_PATH} fill="currentColor" />
    </svg>
  )
}

function Tag({ name, isVisible, color, bgColor }) {
  return (
    <div
      className={`tag${isVisible ? ' is-visible' : ''}`}
      aria-hidden={!isVisible}
      style={{ '--color': color, '--bg-color': bgColor }}
    >
      {isVisible ? <TagSide className="tag__start" /> : <div className="tag__side-dummy tag__start" />}
      <div className="tag__middle">
        <span>{name}</span>
      </div>
      {isVisible ? <TagSide className="tag__end" /> : <div className="tag__side-dummy tag__end" />}
    </div>
  )
}

function Paperclip({ color = '#b7b7b7', rotate = '0deg', z = 0, style }) {
  return (
    <div
      className="content-paperclip"
      style={{ '--clip-color': color, '--clip-rotate': rotate, '--clip-z': z, ...style }}
    >
      <svg className="paperclip" viewBox="0 0 24 107" fill="none" aria-hidden="true">
        <path d={PAPERCLIP_PATH} fill="currentColor" />
      </svg>
    </div>
  )
}

/* Judul dipecah per char dengan mask, lalu dikelompokkan per baris hasil wrap */
function SplitTitle({ text, className }) {
  return (
    <h1 className={className}>
      {text.split(' ').map((word, wi) => (
        <React.Fragment key={`${word}-${wi}`}>
          {wi > 0 ? ' ' : null}
          <span className="fs-hero__word">
            {word.split('').map((char, ci) => (
              <span className="fs-hero__mask" key={ci}>
                <span className="fs-hero__char">{char}</span>
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </h1>
  )
}

function ScrapbookItem({ group }) {
  return (
    <div className="scrapbook-item" style={{ '--sb-x': group.x, '--sb-y': group.y }}>
      <div className="scrapbook-item__inner">
        {group.items.map((item, i) => {
          if (item.kind === 'note') {
            return (
              <div className="content-note-wrapper" key={i}>
                <div
                  className="content-note"
                  style={{ '--note-bg': item.bg, '--note-rotate': item.rotate }}
                >
                  <h3 className="content-note__title">{item.title}</h3>
                  <div className="content-note__desc">
                    {item.body.map((p, k) => (
                      <p key={k}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div
              className="content-photo"
              key={i}
              style={{
                '--photo-width': item.width,
                '--photo-rotate': item.rotate,
                '--photo-origin': item.origin,
                '--photo-z': item.z,
                '--photo-left': item.left,
                '--photo-top': item.top,
              }}
            >
              <img src={item.src} alt="" loading="lazy" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Case({ data }) {
  const rootRef = useRef(null)
  const [loading, setLoading] = useState(true)

  /* Timeline masuk — port dari timeline gsap di halaman case sumbernya:
       .case-hero-title .char  xPercent -100 -> 0, stagger 25ms, durasi .65
       .case-folder            y dari (innerHeight - top elemen) -> 0, durasi 1
       .case-folder-sheet      y 10rem -> 0, durasi 1, mulai .1s          */
  useIsoLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
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

    root.querySelectorAll('.case-hero-title .fs-hero__char').forEach((char, i) => {
      play(
        char,
        [
          { transform: 'translateX(-100%)', opacity: 0 },
          { transform: 'translateX(0%)', opacity: 1 },
        ],
        { duration: 650, delay: i * 25 }
      )
    })

    const folder = root.querySelector('.case-folder')
    if (folder) {
      const from = window.innerHeight - folder.getBoundingClientRect().top
      play(
        folder,
        [{ transform: `translateY(${from}px)` }, { transform: 'translateY(0px)' }],
        { duration: 1000 }
      )
    }

    play(
      root.querySelector('.case-folder-sheet'),
      [{ transform: 'translateY(140px)' }, { transform: 'translateY(0px)' }],
      { duration: 1000, delay: 100 }
    )

    return () => anims.forEach((a) => a.cancel())
  }, [])

  const fg = fgFor(data.color)

  return (
    <div
      className={`fs-case${loading ? ' is-loading' : ''}`}
      ref={rootRef}
      style={{
        '--fs-case-color': data.color,
        '--fs-first-case-color': data.firstCaseColor,
      }}
    >
      <header className="the-sub-header">
        <div className="the-sub-header__content">
          <Link href="/work" legacyBehavior>
            <a className="fs-caption uppercase tracking-widest opacity-70 hover:opacity-100">
              ← Selected work
            </a>
          </Link>
          <span className="the-sub-header__title">{data.name}</span>
          <span className="fs-caption uppercase tracking-widest opacity-70">{data.category}</span>
        </div>
      </header>

      <section className="case-hero" id="hero">
        <SplitTitle text={data.name} className="case-hero-title" />
      </section>

      <section className="case-content">
        <div className="case-content__inner">
          <div className="case-folder">
            <div className="case-folder__inner">
              {/* Lidah map: tiap "page" merender semua lidah segrupnya,
                  yang bukan miliknya jadi dummy — sama seperti di stack. */}
              <div className="case-folder-tags">
                {data.siblings.map((page, pi) => (
                  <div
                    key={page.tag}
                    className={`case-folder-tags__page${
                      page.slug === data.slug ? ' --active' : ''
                    }`}
                    style={{ '--bg-color': page.color }}
                  >
                    {data.siblings.map((sib, si) => {
                      const tag = (
                        <Tag
                          name={sib.tag}
                          isVisible={si === pi}
                          color={fgFor(page.color)}
                          bgColor={page.color}
                        />
                      )
                      return sib.slug && sib.slug !== data.slug ? (
                        <Link href={`/work/${sib.slug}`} key={sib.tag} legacyBehavior>
                          <a className="case-folder-tags__item">{tag}</a>
                        </Link>
                      ) : (
                        <span className="case-folder-tags__item --current" key={sib.tag}>
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                ))}
              </div>

              <div className="case-folder-sheet-wrapper">
                <div className="case-folder-sheet">
                  <div className="case-folder-sheet__inner">
                    <div className="case-folder-sheet__left">
                      <div className="case-folder-sheet__photo">
                        <img src={data.sheet.photo} alt={data.name} />
                        <Paperclip />
                      </div>
                      <div className="case-folder-sheet__info-wrapper">
                        {data.sheet.info.map(([label, value]) => (
                          <div className="case-folder-sheet__info" key={label}>
                            <p>{label}</p>
                            <p>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="case-folder-sheet__right">
                      <div className="case-folder-sheet__desc">
                        {data.sheet.desc.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="case-folder-sheet__clip">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                  <div className="case-folder-sheet__overlay" />
                  <div className="case-folder-sheet__marks" />
                </div>
              </div>

              <div className="case-folder-scrapbook">
                {data.scrapbook.map((group, i) => (
                  <ScrapbookItem group={group} key={i} />
                ))}
              </div>
            </div>

            {/* Sampul map — terbuka ke kiri, sisi luar pakai warna case
                pertama di grupnya, sisi dalam warna case ini. */}
            <div className="case-folder__cover">
              <div className="case-folder__cover__front">
                <div className="case-folder__cover__front__shadow" />
              </div>
              <div className="case-folder__cover__back">
                <div className="case-folder__cover__back__overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link href="/work" legacyBehavior>
        <a
          className="case-next-folder"
          style={{ '--next-bg': data.color, '--next-color': fg }}
        >
          <span className="case-next-folder__label">Back to the stack</span>
          <div className="case-next-folder__name">Selected work</div>
        </a>
      </Link>
    </div>
  )
}
