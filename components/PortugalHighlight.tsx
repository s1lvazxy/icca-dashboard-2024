'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip as ReTooltip,
} from 'recharts'
import { Badge } from '@/components/ui/badge'
import { portugueseCities } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const radarData = [
  {
    metric: 'Reuniões',
    Lisboa: Math.round((portugueseCities[0].meetings / 153) * 100),
    Porto: Math.round((portugueseCities[1].meetings / 153) * 100),
  },
  {
    metric: 'Ranking Mundial',
    Lisboa: Math.round(((50 - portugueseCities[0].worldRank) / 50) * 100),
    Porto: Math.round(((50 - portugueseCities[1].worldRank) / 50) * 100),
  },
  {
    metric: 'Ranking Europeu',
    Lisboa: Math.round(((25 - portugueseCities[0].europeRank) / 25) * 100),
    Porto: Math.round(((25 - portugueseCities[1].europeRank) / 25) * 100),
  },
]

function useCountUp(
  ref: React.RefObject<HTMLSpanElement | null>,
  target: number
) {
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
            el.textContent = Math.round(obj.val).toString()
          },
        })
      },
    })
    return () => {
      tween?.kill()
      trigger.kill()
    }
  }, [ref, target])
}

function CityCard({ city }: { city: (typeof portugueseCities)[0] }) {
  const numRef = useRef<HTMLSpanElement>(null)
  useCountUp(numRef, city.meetings)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative bg-[#0F1624] border border-emerald-500/20 rounded-2xl p-6 cursor-default overflow-hidden group"
    >
      {/* Emerald glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-300" />
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: 'linear-gradient(135deg, #10B98115, transparent)' }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-[#F1F5F9]">{city.city}</h3>
          <span className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-400 text-xs">PT</span>
          </span>
        </div>

        <div className="flex items-baseline gap-1 font-mono mb-4">
          <span
            ref={numRef}
            className="text-5xl font-bold text-emerald-400"
            suppressHydrationWarning
          >
            {city.meetings}
          </span>
          <span className="text-sm text-[#64748B]">reuniões</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#080C14] rounded-lg p-3">
            <p className="text-xs text-[#64748B] mb-1">Ranking Mundial</p>
            <p className="text-lg font-bold font-mono text-[#F1F5F9]">#{city.worldRank}</p>
          </div>
          <div className="bg-[#080C14] rounded-lg p-3">
            <p className="text-xs text-[#64748B] mb-1">Ranking Europeu</p>
            <p className="text-lg font-bold font-mono text-[#F1F5F9]">#{city.europeRank}</p>
          </div>
        </div>

        <p className="text-xs text-emerald-400/80 bg-emerald-500/10 rounded-lg px-3 py-2 border border-emerald-500/20">
          {city.note}
        </p>
      </div>
    </motion.div>
  )
}

export default function PortugalHighlight() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#F1F5F9]">
              Portugal em Destaque
            </h2>
            <Badge
              variant="outline"
              className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs"
            >
              9.º Mundial · 7.º Europeu
            </Badge>
          </div>
          <p className="text-[#64748B] text-sm">
            Desempenho de Portugal como destino de congressos e reuniões internacionais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {portugueseCities.map((city, i) => (
            <motion.div
              key={city.city}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0F1624] border border-[#1E2D45] rounded-2xl p-6"
        >
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-6">
            Lisboa vs Porto — Comparação Normalizada
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1E2D45" />
              <PolarAngleAxis
                dataKey="metric"
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <Radar
                name="Lisboa"
                dataKey="Lisboa"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.25}
                animationBegin={0}
                animationDuration={1200}
              />
              <Radar
                name="Porto"
                dataKey="Porto"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.15}
                animationBegin={0}
                animationDuration={1200}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: '#94A3B8', fontSize: '12px' }}>{value}</span>
                )}
              />
              <ReTooltip
                contentStyle={{
                  background: '#080C14',
                  border: '1px solid #1E2D45',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#F1F5F9' }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#64748B] text-center mt-2">
            Valores normalizados: reuniões (max 153), ranking mundial invertido, ranking europeu invertido
          </p>
        </motion.div>
      </div>
    </section>
  )
}
