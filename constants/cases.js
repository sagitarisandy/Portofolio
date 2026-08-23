/*
 * Isi halaman case.
 *
 * CATATAN ASET: gambar di /img/_placeholder-mosby/ diambil dari
 * mosbyfiles.com sebagai placeholder sementara untuk menguji layout.
 * WAJIB diganti aset sendiri sebelum deploy publik.
 */

const PLACEHOLDER = '/img/_placeholder-mosby'

export const cases = {
  vasanta: {
    slug: 'vasanta',
    name: 'Vasanta Estate Management',
    category: 'Product & Systems',
    color: '#1E4BD7',
    /* Warna case pertama di grupnya — dipakai untuk sisi luar sampul map */
    firstCaseColor: '#D71E1E',
    siblings: [
      { tag: 'Mercu Buana', slug: null, color: '#D71E1E' },
      { tag: 'Vasanta', slug: 'vasanta', color: '#1E4BD7' },
      { tag: 'SQM / FAST', slug: null, color: '#FFE927' },
    ],
    sheet: {
      photo: `${PLACEHOLDER}/irving-gill.avif`,
      info: [
        ['Role:', 'UI/UX — product design, design system, hand-off'],
        ['Scope:', 'Resident mobile app + estate management back office, Shila at Sawangan'],
      ],
      desc: [
        'Vasanta Estate Management is the service layer for people who own a house in the Shila at Sawangan complex, and for the other Vasanta .Tbk developments that followed. Monthly dues, facility bookings, gate access, complaints — the things that used to run on WhatsApp groups and a paper ledger.',
        'The hard part was never the screens. It was the model underneath: one household can hold several residents, several vehicles, several unpaid bills, and each of those has a different person who is allowed to act on it. The interface had to make that legible to a homeowner who opens the app twice a month.',
        'So the design work started at the permission table and worked outward. Roles first, then the flows each role actually repeats, then the screens. Everything else — the visual system, the components, the hand-off — followed from that.',
      ],
    },
    scrapbook: [
      {
        x: '58%',
        y: '24%',
        items: [
          {
            kind: 'photo',
            src: `${PLACEHOLDER}/frame-1171277294.avif`,
            width: '130%',
            rotate: '2.25deg',
            left: '32%',
            top: '-25%',
          },
          {
            kind: 'note',
            title: 'Resident app (2021)',
            bg: '#8EACED',
            rotate: '2.25deg',
            body: [
              'Payments, facility booking and gate access in one place. Designed around the twice-a-month user, not the power user.',
            ],
          },
        ],
      },
      {
        x: '2%',
        y: '30%',
        items: [
          {
            kind: 'photo',
            src: `${PLACEHOLDER}/irving-gill-10.avif`,
            width: '55%',
            rotate: '-3deg',
          },
        ],
      },
      {
        x: '6%',
        y: '52%',
        items: [
          {
            kind: 'photo',
            src: `${PLACEHOLDER}/irving-gill-08.avif`,
            width: '95%',
            rotate: '-4.25deg',
            origin: 'left bottom',
            left: '-2%',
            top: '-46%',
          },
          {
            kind: 'note',
            title: 'Back office (2021–2022)',
            bg: '#FFDE7A',
            rotate: '1.75deg',
            body: [
              'Estate staff side: billing runs, complaint triage, access logs. Built so a two-person office could run a complex of several hundred units.',
            ],
          },
        ],
      },
      {
        x: '52%',
        y: '68%',
        items: [
          {
            kind: 'photo',
            src: `${PLACEHOLDER}/laughlin-house-plan.avif`,
            width: '70%',
            rotate: '3deg',
          },
        ],
      },
      {
        x: '20%',
        y: '82%',
        items: [
          {
            kind: 'photo',
            src: `${PLACEHOLDER}/irving-gill-09.avif`,
            width: '80%',
            rotate: '-2deg',
          },
        ],
      },
    ],
    next: { name: 'SQM / FAST', slug: null },
  },
}

export const getCase = (slug) => cases[slug] || null
export const caseSlugs = Object.keys(cases)
