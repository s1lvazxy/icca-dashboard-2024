'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { topCountries, type CountryRanking } from '@/lib/data'

type SortKey = 'rank' | 'country' | 'meetings'
type SortDir = 'asc' | 'desc'

export default function TopCountries() {
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...topCountries].sort((a, b) => {
    let valA: number | string = a[sortKey] ?? 9999
    let valB: number | string = b[sortKey] ?? 9999
    if (sortKey === 'country') {
      valA = a.country
      valB = b.country
    }
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 text-[#64748B]">
      {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

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
            Top 10 Países
          </h2>
          <p className="text-[#64748B] text-sm">
            Clique nos cabeçalhos para ordenar. Valores marcados como n.d. não foram
            divulgados em fontes públicas.
          </p>
        </motion.div>

        <div className="bg-[#0F1624] border border-[#1E2D45] rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1E2D45] hover:bg-transparent">
                <TableHead
                  className="text-[#64748B] text-xs cursor-pointer select-none w-16"
                  onClick={() => handleSort('rank')}
                >
                  Posição <SortIcon col="rank" />
                </TableHead>
                <TableHead
                  className="text-[#64748B] text-xs cursor-pointer select-none"
                  onClick={() => handleSort('country')}
                >
                  País <SortIcon col="country" />
                </TableHead>
                <TableHead
                  className="text-[#64748B] text-xs cursor-pointer select-none text-right"
                  onClick={() => handleSort('meetings')}
                >
                  Reuniões <SortIcon col="meetings" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((row, i) => (
                <motion.tr
                  key={row.country}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`border-[#1E2D45] transition-colors ${
                    row.highlight
                      ? 'bg-emerald-500/5 hover:bg-emerald-500/10'
                      : 'hover:bg-[#0F1624]/80'
                  }`}
                >
                  <TableCell className="font-mono text-sm">
                    <span
                      className={`font-bold ${
                        row.highlight ? 'text-emerald-400' : 'text-[#64748B]'
                      }`}
                    >
                      #{row.rank}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`font-medium text-sm ${
                      row.highlight ? 'text-emerald-400' : 'text-[#F1F5F9]'
                    }`}
                  >
                    {row.highlight && (
                      <span className="mr-2 text-xs">🇵🇹</span>
                    )}
                    {row.country}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {row.meetings !== null ? (
                      <span
                        className={
                          row.highlight ? 'text-emerald-400 font-bold' : 'text-[#F1F5F9]'
                        }
                      >
                        {row.meetings.toLocaleString('pt-PT')}
                      </span>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-[#64748B] cursor-help">n.d.</span>
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-[#080C14] border border-[#1E2D45] text-[#94A3B8] text-xs"
                        >
                          Valor não divulgado nas fontes públicas
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
