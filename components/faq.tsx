"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { SectionHeading } from "./reveal"

interface FaqItem {
  id: number
  question: string
  answer: string
}

interface FaqProps {
  data: {
    badge?: string
    title: string
    description: string
    faqs: FaqItem[]
  }
}

function AccordionItem({ 
  q, 
  a, 
  open, 
  onClick 
}: { 
  q: string
  a: string
  open: boolean
  onClick: () => void 
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-navy">{q}</span>
        <Plus
          className={`size-5 shrink-0 text-amber-500 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-steel">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq({ data }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!data) return null

  const items = data.faqs || []

  return (
    <section id="faq" className="bg-secondary py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading 
          eyebrow={data.badge || "Tanya Jawab"} 
          title={data.title} 
          subtitle={data.description}
        />
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.id || i}
              q={item.question}
              a={item.answer}
              open={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}