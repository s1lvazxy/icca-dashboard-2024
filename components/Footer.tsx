'use client'

import { motion } from 'framer-motion'
import { sources } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="border-t border-[#1E2D45] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 text-xs font-bold">IC</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F1F5F9]">ICCA GlobeWatch 2024</p>
              <p className="text-xs text-[#64748B]">
                Dados verificados em abril de 2025 · Baseado em fontes públicas ICCA
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-3">
              Fontes e Referências
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {sources.map((source) => (
                <a
                  key={source.label}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#64748B] hover:text-blue-400 transition-colors truncate"
                >
                  {source.label} ↗
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#1E2D45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="text-xs text-[#64748B]">
              Dashboard informativo · Dados não-comerciais · Uso educacional
            </p>
            <p className="text-xs text-[#64748B] font-mono">
              ICCA Rankings 2024 © {new Date().getFullYear()}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
