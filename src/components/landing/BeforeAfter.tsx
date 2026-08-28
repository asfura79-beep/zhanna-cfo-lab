import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Landmark, FileStack, FileBarChart, UserRound } from "lucide-react";
import { Reveal, SectionTitle } from "./shared";

const BEFORE = [
  { icon: Landmark, title: "Банк", text: "Выписки скачиваются и разбираются вручную." },
  {
    icon: FileStack,
    title: "Первичные документы",
    text: "Документы приходится искать в почте, мессенджерах и разных папках.",
  },
  { icon: FileBarChart, title: "Отчёты", text: "Данные вручную собираются из нескольких источников." },
  { icon: UserRound, title: "Собственник", text: "Получает ключевые цифры с задержкой." },
];

const AFTER = [
  {
    icon: Landmark,
    title: "Банк",
    text: "Операции регулярно попадают в систему и распределяются по установленному процессу.",
  },
  {
    icon: FileStack,
    title: "Первичные документы",
    text: "Документы собраны, систематизированы и контролируются.",
  },
  {
    icon: FileBarChart,
    title: "Отчёты",
    text: "P&L и ОДДС формируются по единой структуре данных.",
  },
  {
    icon: UserRound,
    title: "Собственник",
    text: "Видит ключевые показатели бизнеса в одном месте.",
  },
];

export function BeforeAfter() {
  const [after, setAfter] = useState(true);
  const items = after ? AFTER : BEFORE;

  return (
    <section id="tools" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Инструменты"
          title="Бизнес до и после автоматизации"
          subtitle="Переключите режим и посмотрите, как меняется работа с цифрами."
        />

        <Reveal className="mt-10 flex justify-center">
          <div className="glass-card inline-flex rounded-full p-1.5">
            {[
              { label: "До", value: false },
              { label: "После", value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setAfter(opt.value)}
                className="relative rounded-full px-7 py-2.5 text-sm font-semibold transition-colors"
              >
                {after === opt.value && (
                  <motion.span
                    layoutId="toggle-pill"
                    className="absolute inset-0 rounded-full bg-[image:var(--gradient-sapphire)] shadow-[var(--shadow-soft)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span
                  className={
                    after === opt.value
                      ? "relative text-primary-foreground"
                      : "relative text-muted-foreground"
                  }
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.article
                key={`${after}-${item.title}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-float)]"
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                    after
                      ? "bg-[image:var(--gradient-emerald)] text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
