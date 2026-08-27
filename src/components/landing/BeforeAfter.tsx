import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Keyboard,
  MessagesSquare,
  Clock,
  Landmark,
  ScanLine,
  Database,
  LayoutDashboard,
} from "lucide-react";
import { Reveal, SectionTitle } from "./shared";

const BEFORE = [
  { icon: Keyboard, title: "Ручной ввод данных", text: "Каждая операция забивается руками — время уходит, ошибки копятся." },
  { icon: FileSpreadsheet, title: "Ошибки в Excel", text: "Слетевшие формулы и разные версии файлов дают неверные цифры." },
  { icon: MessagesSquare, title: "Разрозненные чаты", text: "Документы и договорённости теряются в переписках и почте." },
  { icon: Clock, title: "Долгий сбор первички", text: "Закрытие месяца растягивается, решения принимаются вслепую." },
];

const AFTER = [
  { icon: Landmark, title: "Автозагрузка выписок", text: "Банковские операции подтягиваются автоматически и разносятся по статьям." },
  { icon: ScanLine, title: "Распознавание документов", text: "Сервисы распознавания превращают первичку в готовые проводки." },
  { icon: Database, title: "Интеграция баз данных", text: "Системы обмениваются данными — двойной ввод исключён." },
  { icon: LayoutDashboard, title: "Сводные дашборды", text: "Все ключевые метрики в одном окне и всегда актуальны." },
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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="glass-card group rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-float)]"
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
                <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold">
                  {after ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-brand" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  )}
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
