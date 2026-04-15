'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cityCoords, topCities } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const ComposableMap = dynamic(
  () => import('react-simple-maps').then((m) => m.ComposableMap),
  { ssr: false }
)
const Geographies = dynamic(
  () => import('react-simple-maps').then((m) => m.Geographies),
  { ssr: false }
)
const Geography = dynamic(
  () => import('react-simple-maps').then((m) => m.Geography),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-simple-maps').then((m) => m.Marker),
  { ssr: false }
)

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface TooltipData {
  city: string
  rank: number
  meetings: number
  x: number
  y: number
}

export default function WorldMap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinsRef = useRef<(SVGGElement | null)[]>([])
  const [tooltip, setTooltip] = useState<TooltipData | null>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        setAnimated(true)
        pinsRef.current.forEach((pin, i) => {
          if (!pin) return
          gsap.fromTo(
            pin,
            { scale: 0, opacity: 0, transformOrigin: '50% 50%' },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: i * 0.08,
              ease: 'back.out(2)',
            }
          )
        })
      },
    })
    return () => trigger.kill()
  }, [])

  const getCityData = (cityName: string) => {
    const city = topCities.find((c) => c.city === cityName)
    return city
  }

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
            Mapa Mundial — Top 10 Cidades
          </h2>
          <p className="text-[#64748B] text-sm">
            Distribuição geográfica das cidades líderes em reuniões internacionais ICCA 2024
          </p>
        </motion.div>

        <div className="bg-[#0F1624] border border-[#1E2D45] rounded-2xl overflow-hidden relative">
          {/* Mobile fallback */}
          <div className="md:hidden p-6">
            <p className="text-[#64748B] text-sm mb-4">Vista mobile — lista das cidades</p>
            <div className="grid grid-cols-2 gap-3">
              {cityCoords.map((c) => {
                const data = getCityData(c.city)
                return (
                  <div
                    key={c.city}
                    className="flex items-center gap-2 bg-[#080C14] rounded-lg p-3"
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        c.isPortuguese ? 'bg-emerald-400' : 'bg-blue-400'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#F1F5F9]">{c.city}</p>
                      {data && (
                        <p className="text-xs text-[#64748B]">#{data.rank} · {data.meetings} meet.</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop map */}
          <div className="hidden md:block relative" style={{ height: '480px' }}>
            <ComposableMap
              projection="geoEqualEarth"
              style={{ width: '100%', height: '100%', background: '#0F1624' }}
              projectionConfig={{ scale: 140 }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: unknown[] }) =>
                  geographies.map((geo: unknown, i: number) => (
                    <Geography
                      key={i}
                      geography={geo}
                      fill="#1E2D45"
                      stroke="#080C14"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#243552' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {cityCoords.map((city, i) => {
                const data = getCityData(city.city)
                const isPortuguese = city.isPortuguese
                const color = isPortuguese ? '#10B981' : '#3B82F6'

                return (
                  <Marker
                    key={city.city}
                    coordinates={[city.lng, city.lat]}
                  >
                    <g
                      ref={(el) => { pinsRef.current[i] = el }}
                      style={{ opacity: animated ? 1 : 0 }}
                      onMouseEnter={(e) => {
                        if (data) {
                          const rect = (e.target as SVGElement)
                            .closest('svg')
                            ?.getBoundingClientRect()
                          setTooltip({
                            city: city.city,
                            rank: data.rank,
                            meetings: data.meetings,
                            x: e.clientX - (rect?.left ?? 0),
                            y: e.clientY - (rect?.top ?? 0),
                          })
                        }
                      }}
                      onMouseMove={(e) => {
                        const rect = (e.target as SVGElement)
                          .closest('svg')
                          ?.getBoundingClientRect()
                        setTooltip((prev) =>
                          prev
                            ? {
                                ...prev,
                                x: e.clientX - (rect?.left ?? 0),
                                y: e.clientY - (rect?.top ?? 0),
                              }
                            : null
                        )
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      <circle r={6} fill={color} opacity={0.2} />
                      <circle r={4} fill={color} opacity={0.6} />
                      <circle r={2.5} fill={color} />
                    </g>
                  </Marker>
                )
              })}
            </ComposableMap>

            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none z-10 bg-[#080C14] border border-[#1E2D45] rounded-lg px-3 py-2 text-xs"
                  style={{
                    left: tooltip.x + 12,
                    top: tooltip.y - 40,
                  }}
                >
                  <p className="font-bold text-[#F1F5F9]">{tooltip.city}</p>
                  <p className="text-[#64748B]">
                    #{tooltip.rank} mundial · {tooltip.meetings} reuniões
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 px-6 py-4 border-t border-[#1E2D45]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-[#64748B]">Portugal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-xs text-[#64748B]">Outros Top 10</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
