'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { topCities, europeanCities } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: (typeof topCities)[0] }>
}) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-[#080C14] border border-[#1E2D45] rounded-lg p-3 text-xs shadow-xl">
      <p className="font-bold text-[#F1F5F9] mb-1">{d.city}</p>
      <p className="text-[#64748B]">{d.country}</p>
      <p className="text-blue-400 font-mono font-bold mt-1">{d.meetings} reuniões</p>
      {d.europeRank && (
        <p className="text-emerald-400">#{d.europeRank} Europa</p>
      )}
      {d.note && <p className="text-yellow-400 mt-1">{d.note}</p>}
    </div>
  )
}

function CityChart({ data, tab }: { data: typeof topCities; tab: string }) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: chartRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          chartRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
      },
    })
    return () => trigger.kill()
  }, [tab])

  return (
    <div ref={chartRef} style={{ opacity: 1 }}>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 24, left: 80, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 180]}
            tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'var(--font-geist-mono)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="city"
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={76}
          />
          <ReTooltip content={<CustomTooltip />} cursor={{ fill: '#1E2D45' }} />
          <Bar
            dataKey="meetings"
            radius={[0, 4, 4, 0]}
            animationBegin={0}
            animationDuration={1200}
          >
            {data.map((entry) => (
              <Cell
                key={entry.city}
                fill={entry.highlight ? '#10B981' : '#3B82F6'}
                opacity={entry.highlight ? 1 : 0.75}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function TopCities() {
  const [tab, setTab] = useState('mundial')

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
          <h2 className="text-2xl md:text-3xl font-bold text-[#F1F5F9] mb-2">
            Top 10 Cidades
          </h2>
          <p className="text-[#64748B] text-sm">
            Reuniões internacionais certificadas ICCA por cidade de acolhimento
          </p>
        </motion.div>

        <div className="bg-[#0F1624] border border-[#1E2D45] rounded-2xl p-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-[#080C14] border border-[#1E2D45] mb-6">
              <TabsTrigger
                value="mundial"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[#64748B] text-xs"
              >
                Ranking Mundial
              </TabsTrigger>
              <TabsTrigger
                value="europeu"
                className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-[#64748B] text-xs"
              >
                Ranking Europeu
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="mundial" key="mundial">
                <CityChart data={topCities} tab="mundial" />
              </TabsContent>
              <TabsContent value="europeu" key="europeu">
                <CityChart data={europeanCities} tab="europeu" />
              </TabsContent>
            </AnimatePresence>
          </Tabs>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#1E2D45]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-2 rounded bg-emerald-500" />
              <span className="text-xs text-[#64748B]">Lisboa (Portugal)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-2 rounded bg-blue-500/75" />
              <span className="text-xs text-[#64748B]">Outras cidades</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
