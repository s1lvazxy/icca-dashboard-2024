'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { globalStats, portugueseCities } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const statCards = [
  {
    id: 'lisbon',
    label: 'Lisboa',
    sublabel: '#2 Mundial · #2 Europeu',
    value: portugueseCities[0].meetings,
    suffix: ' reuniões',
    accent: 'emerald',
  },
  {
    id: 'total',
    label: 'Reuniões Totais',
    sublabel: '190 países · 2024',
    value: globalStats.totalMeetings,
    suffix: '',
    accent: 'blue',
  },
  {
    id: 'impact',
    label: 'Impacto Económico',
    sublabel: 'Estimativa global ICCA',
    value: 11.6,
    suffix: 'B USD',
    prefix: 'USD ',
    accent: 'blue',
    isDecimal: true,
  },
]

function useCountUp(ref: React.RefObject<HTMLSpanElement | null>, target: number, isDecimal?: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obj = { val: 0 }
    let tween: gsap.core.Tween | null = null
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        tween = gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            if (isDecimal) {
              el.textContent = obj.val.toFixed(1)
            } else {
              el.textContent = Math.round(obj.val).toLocaleString('pt-PT')
            }
          },
        })
      },
    })
    return () => {
      tween?.kill()
      trigger.kill()
    }
  }, [ref, target, isDecimal])
}

function StatCard({ card }: { card: (typeof statCards)[0] }) {
  const numRef = useRef<HTMLSpanElement>(null)
  useCountUp(numRef, card.value, card.isDecimal)

  const borderColor = card.accent === 'emerald' ? 'border-emerald-500/30' : 'border-blue-500/20'
  const labelColor = card.accent === 'emerald' ? 'text-emerald-400' : 'text-blue-400'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`bg-[#0F1624] border ${borderColor} rounded-xl p-6 flex flex-col gap-2`}
    >
      <span className={`text-xs font-semibold uppercase tracking-widest ${labelColor}`}>
        {card.label}
      </span>
      <div className="flex items-baseline gap-1 font-mono">
        {card.prefix && (
          <span className="text-sm text-[#64748B]">{card.prefix}</span>
        )}
        <span
          ref={numRef}
          className="text-4xl font-bold text-[#F1F5F9]"
          suppressHydrationWarning
        >
          {card.isDecimal ? card.value.toFixed(1) : card.value.toLocaleString('pt-PT')}
        </span>
        {card.suffix && (
          <span className="text-sm text-[#64748B]">{card.suffix}</span>
        )}
      </div>
      <span className="text-xs text-[#64748B]">{card.sublabel}</span>
    </motion.div>
  )
}

export default function Hero() {
  const dotsRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 overflow-hidden">
      {/* Dot grid background */}
      <motion.div
        ref={dotsRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #1E2D45 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 border border-blue-500/30 rounded-full px-3 py-1">
            ICCA GlobeWatch · Relatório 2024
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-[#F1F5F9] leading-tight mb-4"
        >
          ICCA{' '}
          <span className="text-blue-400">GlobeWatch</span>
          <br />
          <span className="text-3xl md:text-5xl font-semibold text-[#64748B]">
            Rankings 2024
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-[#64748B] text-lg md:text-xl mb-12 font-mono"
        >
          11.099 reuniões · 190 países · USD 11,6B de impacto
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {statCards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
