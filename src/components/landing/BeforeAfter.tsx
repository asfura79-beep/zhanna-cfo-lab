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
  {
    icon: FileBarChart,
    title: "Отчёты",
    text: "Данные вручную собираются из нескольких источников.",
  },
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
    <section id="automation" className="scroll-mt-24 bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Инструменты"
          title="Бизнес до и после автоматизации"
          subtitle="Переключите режим и посмотрите, как меняется работа с цифрами."
        />

        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-border/70 bg-secondary p-1.5 shadow-sm">
            {[
              { label: "До", value: false },
              { label: "После", value: true },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setAfter(opt.value)}
                className="relative min-h-11 rounded-full px-7 py-2.5 text-sm font-semibold transition-colors"
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

        <div className={`automation-map mt-10 ${after ? "is-after" : "is-before"}`}>
          <div className="automation-lane">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.article
                  key={`${after}-${item.title}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="automation-node"
                >
                  <div className="flex items-start gap-4">
                    <div className="automation-icon">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            key={after ? "system" : "fragmented"}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="automation-dashboard"
          >
            <span>{after ? "Единый контур" : "Разрозненные данные"}</span>
            <b>{after ? "Контроль в одном месте" : "Картина собирается вручную"}</b>
            <div className="mt-5 grid gap-3">
              {(after ? ["Деньги", "Прибыль", "Платежи"] : ["Банк", "Таблицы", "Почта"]).map(
                (item, i) => (
                  <div key={item} className="automation-metric">
                    <p>{item}</p>
                    <i style={{ width: after ? `${86 - i * 12}%` : `${42 + i * 10}%` }} />
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
