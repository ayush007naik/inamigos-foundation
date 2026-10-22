// ---------------------------------------------------------------------------
// Gallery — official photography from
// https://www.inamigosfoundation.org.in/gallery, optimised locally.
// Aspect ratios are the real intrinsic ratios of the source files.
// ---------------------------------------------------------------------------

export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
  /** Optional grouping for the filter rail. */
  group: string
}

export const GALLERY: GalleryImage[] = [
  { id: 'g-01', src: '/img/g-01.webp', alt: 'InAmigos Foundation field activity', width: 1200, height: 1600, group: 'Field' },
  { id: 'g-02', src: '/img/g-02.webp', alt: 'InAmigos Foundation field activity', width: 1200, height: 1600, group: 'Field' },
  { id: 'g-03', src: '/img/g-03.webp', alt: 'InAmigos Foundation field activity', width: 1280, height: 1600, group: 'Field' },
  { id: 'g-04', src: '/img/g-04.webp', alt: 'InAmigos Foundation community gathering', width: 1600, height: 1200, group: 'Community' },
  { id: 'g-05', src: '/img/g-05.webp', alt: 'InAmigos Foundation community gathering', width: 1600, height: 906, group: 'Community' },
  { id: 'g-06', src: '/img/g-06.webp', alt: 'InAmigos Foundation field activity', width: 1199, height: 1600, group: 'Field' },
  { id: 'g-07', src: '/img/g-07.webp', alt: 'InAmigos Foundation community gathering', width: 1600, height: 900, group: 'Community' },
  { id: 'g-08', src: '/img/g-08.webp', alt: 'InAmigos Foundation volunteer at work', width: 900, height: 1600, group: 'Volunteers' },
  { id: 'g-09', src: '/img/g-09.webp', alt: 'InAmigos Foundation volunteer at work', width: 900, height: 1600, group: 'Volunteers' },
  { id: 'g-10', src: '/img/g-10.webp', alt: 'InAmigos Foundation volunteer at work', width: 902, height: 1600, group: 'Volunteers' },
  { id: 'g-11', src: '/img/g-11.webp', alt: 'InAmigos Foundation volunteer at work', width: 900, height: 1600, group: 'Volunteers' },
  { id: 'g-12', src: '/img/g-12.webp', alt: 'InAmigos Foundation volunteer at work', width: 900, height: 1600, group: 'Volunteers' },
  { id: 'g-13', src: '/img/g-13.webp', alt: 'InAmigos Foundation community gathering', width: 1600, height: 1200, group: 'Community' },
  { id: 'g-14', src: '/img/g-14.webp', alt: 'InAmigos Foundation community gathering', width: 1600, height: 1170, group: 'Community' },
  { id: 'g-15', src: '/img/g-15.webp', alt: 'InAmigos Foundation field activity', width: 739, height: 1600, group: 'Field' },
  { id: 'g-16', src: '/img/g-16.webp', alt: 'InAmigos Foundation community gathering', width: 1600, height: 739, group: 'Community' },
  { id: 'g-17', src: '/img/g-17.webp', alt: 'InAmigos Foundation field activity', width: 1574, height: 1600, group: 'Field' },
  { id: 'g-18', src: '/img/g-18.webp', alt: 'InAmigos Foundation field activity', width: 1200, height: 1600, group: 'Field' },
  { id: 'g-19', src: '/img/g-19.webp', alt: 'InAmigos Foundation field activity', width: 1200, height: 1600, group: 'Field' },
  { id: 'g-20', src: '/img/g-20.webp', alt: 'InAmigos Foundation field activity', width: 1037, height: 1600, group: 'Field' },
  { id: 'g-21', src: '/img/g-21.webp', alt: 'InAmigos Foundation volunteer at work', width: 1204, height: 1600, group: 'Volunteers' },
  { id: 'g-22', src: '/img/g-22.webp', alt: 'InAmigos Foundation volunteer at work', width: 1200, height: 1600, group: 'Volunteers' },
  { id: 'g-23', src: '/img/g-23.webp', alt: 'InAmigos Foundation volunteer at work', width: 1200, height: 1600, group: 'Volunteers' },
]

export const GALLERY_GROUPS = ['All', 'Community', 'Field', 'Volunteers'] as const
