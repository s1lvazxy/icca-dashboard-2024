'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { globalStats } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: 'Setores Líderes',
    value: globalStats.topSectors.join(' · '),
    sublabel: 'Áreas com mais congressos internacionais',
    icon: '🔬',
    accent: 'blue',
  },
  {
    title: 'Maior Audiência Média',
    value: `${globalStats.topCityByAvgAttendees.avg} participantes`,
    sublabel: `Cidade: ${globalStats.topCityByAvgAttendees.city}`,
    icon: '👥',
    accent: 'blue',
  },
  {
    title: 'Eventos de Médio Porte',
    value: `${globalStats.midSizedShare}%`,
    sublabel: 'Reuniões com 50–999 participantes',
    icon: '📊',
    accent: 'blue',
  },
  {
    title: 'Regiões em Crescimento',
    value: globalStats.growthRegions.join(' · '),
    sublabel: 'Maior crescimento relativo vs. 2023',
    icon: '📈',
    accent: 'emerald',
  },
]

export default function GlobalContext() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      end: 'bottom 40%',
      pin: pinRef.current ?? undefined,
      pinSpacing: false,
    })
    return () => trigger.kill()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F1F5F9] mb-2">
            Contexto Global
          </h2>
          <p className="text-[#64748B] text-sm">
            Tendências e indicadores do mercado internacional de reuniões em 2024
          </p>
        </motion.div>

        <div ref={pinRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`bg-[#0F1624] border rounded-2xl p-6 ${
                card.accent === 'emerald'
                  ? 'border-emerald-500/20'
                  : 'border-[#1E2D45]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <p className="text-xs text-[#64748B] uppercase tracking-widest font-semibold mb-2">
                    {card.title}
                  </p>
                  <p
                    className={`text-lg font-bold font-mono mb-1 ${
                      card.accent === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-[#F1F5F9]'
                    }`}
                  >
                    {card.value}
                  </p>
                  <p className="text-xs text-[#64748B]">{card.sublabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
