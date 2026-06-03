import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

const raf = (time: number) => {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

export default lenis
