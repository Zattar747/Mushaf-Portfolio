import { CircularGallery, GalleryItem } from './ui/CircularGallery'

const ITEMS: GalleryItem[] = [
  { id: 'art',     label: 'Art',            count: '18 Works', gradient: 'linear-gradient(145deg,#16222e,#0a1520,#1c1208)' },
  { id: 'present', label: 'Presentations',  count: '5 Works',  gradient: 'linear-gradient(165deg,#0c1a16,#1a1008,#101820)' },
  { id: 'graphic', label: 'Graphic Design', count: '5 Works',  gradient: 'linear-gradient(135deg,#16101e,#0a1520,#1c1010)' },
  { id: 'photo',   label: 'Photography',    count: '11 Works', gradient: 'linear-gradient(155deg,#1e160a,#0e1a12,#0c1020)' },
]

interface Props { onSelectCategory: (cat: string) => void }

export default function Portfolio({ onSelectCategory }: Props) {
  return (
    <CircularGallery
      items={ITEMS}
      onSelect={item => onSelectCategory(item.label)}
      scrollDuration={3200}
      radius={420}
      mobileRadius={200}
    />
  )
}
