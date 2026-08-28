import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Send,
  AlertTriangle,
  Wallet,
  TrendingUp,
  Receipt,
  CalendarCheck,
} from "lucide-react";
import { Reveal, SectionTitle, TELEGRAM_URL } from "./shared";

const STEPS = ["Диагностика", "Слабые места", "Решение", "Система"];

const CHECKLIST = [
  "движение денег",
  "доходы и расходы",
  "дебиторскую и кредиторскую задолженность",
  "обязательные платежи",
  "управленческие отчёты",
  "источники данных",
];

const CHAIN = [
  { label: "Банк", warn: "ручной перенос" },
  { label: "1С", warn: "данные расходятся" },
  { label: "Excel", warn: "отчёт запаздывает" },
  { label: "Отчёт", warn: "нет прогноза" },
  { label: "Собственник", warn: null },
];

const DECISIONS = [
  { title: "Оставить", text: "Рабочие процессы, которые уже выполняют свою задачу." },
  { title: "Исправить", text: "Структуру учёта, данные, отчёты и контрольные точки." },
  { title: "Автоматизировать", text: "Повторяющиеся операции и ручной сбор информации." },
];

const DASH = [
  { icon: Wallet, label: "Деньги", value: "1 840 000 ₽", note: "остаток" },
  { icon: TrendingUp, label: "Прибыль", value: "620 000 ₽", note: "за месяц" },
  { icon: Receipt, label: "Обязательства", value: "540 000 ₽", note: "до конца месяца" },
  { icon: CalendarCheck, label: "Прогноз", value: "Кассового разрыва не ожидается", note: "" },
];

function StepBody({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">
            Сначала разбираюсь, что происходит с деньгами
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Смотрю не только бухгалтерские данные, а весь путь цифр: от банка и первичных
            документов до управленческих отчётов собственника.
          </p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-secondary/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Проверяю
          </p>
          <ul className="mt-4 space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-emerald)] text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Нахожу, где бизнес теряет контроль</h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Ищу не только ошибки в цифрах, но и причины, из-за которых информация приходит поздно,
          дублируется или ей нельзя полностью доверять.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CHAIN.map((node) => (
            <div key={node.label} className="min-w-0">
              <div className="rounded-2xl border border-border/60 bg-card/70 px-4 py-4 text-center text-sm font-semibold">
                {node.label}
              </div>
              {node.warn ? (
                <div className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-warning-soft px-3 py-2 text-center text-xs font-medium text-warning">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span className="min-w-0">{node.warn}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Определяю, что изменить — а что лучше не трогать
        </h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {DECISIONS.map((d) => (
            <div key={d.title} className="rounded-2xl border border-border/60 bg-secondary/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {d.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border-l-2 border-emerald-brand bg-secondary/50 px-5 py-4 text-sm font-medium leading-relaxed">
          Автоматизирую не всё подряд — только то, что действительно экономит время или повышает
          качество контроля.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Собираю финансовый контур, которым можно пользоваться каждый день
        </h3>
        <div className="mt-6">
          <span className="inline-flex rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            Пример структуры
          </span>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {DASH.map((c) => (
              <div key={c.label} className="rounded-2xl border border-border/60 bg-card/80 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <c.icon className="h-3.5 w-3.5" />
                  {c.label}
                </div>
                <p className="mt-2 text-lg font-bold leading-snug tabular-nums">{c.value}</p>
                {c.note ? <p className="mt-0.5 text-xs text-muted-foreground">{c.note}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="self-center leading-relaxed text-muted-foreground">
        В результате собственнику не приходится собирать информацию из нескольких таблиц, банков и
        отчётов — основные показатели находятся в одной системе.
      </p>
    </div>
  );
}

const RESULTS = [
  "Результат этапа → понимаю текущее состояние финансовой системы.",
  "Результат этапа → понятно, какие процессы действительно требуют исправления.",
  "Результат этапа → понятный план изменений без лишних внедрений.",
  "Результат → ключевые цифры бизнеса собраны в понятную систему управления.",
];

export function Approach() {
  const [step, setStep] = useState(0);

  return (
    <section id="approach" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Подход к работе"
          title="От финансового хаоса — к системе"
          subtitle="Не начинаю с новых таблиц и автоматизации. Сначала разбираюсь, как устроены ваши финансы, нахожу слабые места и только затем выстраиваю систему под бизнес."
        />

        <Reveal className="mt-12">
          <div className="glass-card rounded-3xl p-6 sm:p-10">
            <div className="-mx-1 overflow-x-auto pb-2">
              <div className="flex min-w-max items-center gap-2 px-1 sm:gap-3">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      aria-current={step === i}
                      className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                        step === i
                          ? "border-transparent bg-[image:var(--gradient-sapphire)] text-primary-foreground shadow-[var(--shadow-soft)]"
                          : i < step
                            ? "border-transparent bg-[image:var(--gradient-emerald)] text-primary-foreground"
                            : "border-border bg-card/70 text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <span className="tabular-nums opacity-80">0{i + 1}</span>
                      {label}
                    </button>
                    {i < STEPS.length - 1 ? (
                      <span className="h-px w-6 bg-border sm:w-10" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepBody step={step} />
                  <p className="mt-8 rounded-2xl bg-secondary/60 px-5 py-4 text-sm font-medium">
                    {RESULTS[step]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={step === STEPS.length - 1}
                className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-sapphire)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-40"
              >
                Следующий этап
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-border/60 bg-secondary/50 p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0">
                <p className="text-lg font-bold">Не знаете, с какого места начать?</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  На первой встрече разберём текущую ситуацию и определим, какие изменения
                  действительно нужны вашему бизнесу.
                </p>
              </div>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" />
                Обсудить задачу в Telegram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
