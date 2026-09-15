import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Database,
  FileSearch,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Reveal } from "./shared";

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

function OperatingSystemPreview({ step }: { step: number }) {
  return (
    <div className={`system-preview system-preview-step-${step}`}>
      <div className="system-preview-top">
        <span>Financial OS</span>
        <b>Демо-интерфейс</b>
      </div>

      <div className="system-grid">
        {DASH.map((card, index) => (
          <motion.div
            key={card.label}
            layout
            className={`system-kpi ${index <= step ? "is-live" : ""}`}
          >
            <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase text-white/68">
              <card.icon className="h-3.5 w-3.5" />
              {card.label}
            </div>
            <p className="mt-2 text-base font-extrabold leading-snug text-white tabular-nums">
              {card.value}
            </p>
            {card.note ? <p className="mt-1 text-xs text-white/58">{card.note}</p> : null}
          </motion.div>
        ))}
      </div>

      <div className="system-dataflow">
        {["Банк", "Учёт", "Модель", "Dashboard"].map((item, index) => (
          <div key={item} className={index <= step ? "is-live" : ""}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBody({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div>
        <FileSearch className="h-8 w-8 text-emerald-brand" />
        <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white">
          Сначала разбираюсь, что происходит с деньгами
        </h3>
        <p className="mt-4 text-base leading-relaxed text-white/74">
          Смотрю не только бухгалтерские данные, а весь путь цифр: от банка и первичных документов
          до управленческих отчётов собственника.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {CHECKLIST.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-white/82">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-brand text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div>
        <AlertTriangle className="h-8 w-8 text-warning" />
        <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white">
          Нахожу, где бизнес теряет контроль
        </h3>
        <p className="mt-4 text-base leading-relaxed text-white/74">
          Ищу не только ошибки в цифрах, но и причины, из-за которых информация приходит поздно,
          дублируется или ей нельзя полностью доверять.
        </p>
        <div className="mt-7 grid gap-2">
          {CHAIN.map((node) => (
            <div key={node.label} className="system-chain-row">
              <b>{node.label}</b>
              <span>{node.warn ?? "получает общую картину"}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <Database className="h-8 w-8 text-emerald-brand" />
        <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white">
          Определяю, что изменить, а что лучше не трогать
        </h3>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {DECISIONS.map((d) => (
            <div key={d.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                {d.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/84">{d.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border-l-2 border-emerald-brand bg-white/[0.08] px-5 py-4 text-sm font-medium leading-relaxed text-white/84">
          Автоматизирую только то, что действительно экономит время или повышает качество контроля.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Check className="h-8 w-8 text-emerald-brand" />
      <h3 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white">
        Собираю финансовый контур, которым можно пользоваться каждый день
      </h3>
      <p className="mt-4 text-base leading-relaxed text-white/74">
        В результате собственнику не приходится собирать информацию из нескольких таблиц, банков и
        отчётов — основные показатели находятся в одной системе.
      </p>
      <p className="mt-6 rounded-2xl bg-emerald-brand/15 px-5 py-4 text-sm font-medium text-white">
        Результат: ключевые цифры бизнеса собраны в понятную систему управления.
      </p>
    </div>
  );
}

const RESULTS = [
  "Понимаю текущее состояние финансовой системы.",
  "Понятно, какие процессы действительно требуют исправления.",
  "Есть план изменений без лишних внедрений.",
  "Ключевые цифры бизнеса собраны в понятную систему управления.",
];

export function Approach() {
  const [step, setStep] = useState(0);

  return (
    <section id="approach" className="system-section scroll-mt-24 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/58 backdrop-blur">
            Подход к работе
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
            От финансового хаоса — к системе
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-white/64">
            Не начинаю с новых таблиц и автоматизации. Сначала разбираюсь, как устроены ваши
            финансы, нахожу слабые места и только затем выстраиваю систему под бизнес.
          </p>
        </div>

        <Reveal className="mt-9 sm:mt-12">
          <div className="system-shell rounded-3xl p-4 sm:p-8">
            <div className="mobile-system-step md:hidden">
              <div>
                <span className="tabular-nums">0{step + 1}</span>
                <b>{STEPS[step]}</b>
              </div>
              <p>
                {step + 1} из {STEPS.length}
              </p>
            </div>

            <div className="-mx-1 hidden overflow-x-auto pb-2 md:block">
              <div className="flex min-w-max items-center gap-2 px-1 sm:gap-3">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      aria-current={step === i}
                      className={`system-step-button ${step === i ? "is-active" : ""} ${
                        i < step ? "is-done" : ""
                      }`}
                    >
                      <span className="tabular-nums">0{i + 1}</span>
                      {label}
                    </button>
                    {i < STEPS.length - 1 ? (
                      <span className="system-step-line" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:mt-8 sm:gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
              <div className="system-copy-panel min-h-0 rounded-3xl border border-white/15 bg-white/[0.075] p-4 sm:min-h-[360px] sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <StepBody step={step} />
                    <p className="mt-7 text-sm font-medium text-white/64">{RESULTS[step]}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <OperatingSystemPreview step={step} />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Назад
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={step === STEPS.length - 1}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
              >
                Следующий этап
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
