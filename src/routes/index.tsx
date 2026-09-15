import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CalendarClock,
  CheckCircle2,
  FileCheck2,
  Gauge,
  LineChart,
  Lock,
  Menu,
  Receipt,
  Scale,
  Send,
  ShieldCheck,
  Stethoscope,
  Table2,
  Workflow,
  X,
} from "lucide-react";
import zhanna from "@/assets/zhanna.jpg";
import { Reveal, SectionTitle, TELEGRAM_URL } from "@/components/landing/shared";
import { Diagnostic } from "@/components/landing/Diagnostic";
import { Approach } from "@/components/landing/Approach";
import { BeforeAfter } from "@/components/landing/BeforeAfter";

const SITE_URL = "https://fintio.ru/";
const SOCIAL_IMAGE_URL = "https://fintio.ru/og-image.jpg";
const PAGE_TITLE = "Жанна Василевская — финансовый менеджер на аутсорсе";
const PAGE_DESCRIPTION =
  "Порядок в финансах и автоматизация учёта: P&L, cash flow, платёжный календарь и дашборды для собственника бизнеса.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      {
        name: "description",
        content: PAGE_DESCRIPTION,
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SOCIAL_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: SOCIAL_IMAGE_URL },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
  component: Landing,
});

const NAV = [
  { label: "Услуги", href: "#services" },
  { label: "Инструменты", href: "#tools" },
  { label: "Экспертиза", href: "#expertise" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-bar border-b border-border/60 shadow-[var(--shadow-soft)]" : ""
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:flex lg:justify-between">
        <a href="#top" className="min-w-0 truncate text-base font-bold tracking-tight sm:text-lg">
          Жанна Василевская
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-xl bg-[image:var(--gradient-sapphire)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            <Send className="h-4 w-4" />
            Написать в Telegram
          </a>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/80 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass-bar border-b border-border/60 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-5">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-muted-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-sapphire)] px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Send className="h-4 w-4" />
              Написать в Telegram
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-surface relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sapphire/30 to-transparent" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-brand" />
            Финансовый менеджер с бухгалтерской экспертизой
          </span>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Порядок в финансах и <span className="text-gradient-sapphire">автоматизация учёта</span>{" "}
            для вашего бизнеса
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Прозрачные цифры, защита от кассовых разрывов и внедрение автоматизации без ручного
            труда.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4" />
              Обсудить задачу в Telegram
            </a>
            <a
              href="#calculator"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-4 text-sm font-semibold shadow-sm backdrop-blur transition-colors hover:bg-card"
            >
              <Stethoscope className="h-4 w-4" />
              Проверить финансовую систему
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { k: "P&L", v: "Реальная прибыль" },
              { k: "ОДДС", v: "Контроль денег" },
              { k: "BI", v: "Бизнес в цифрах" },
            ].map((s) => (
              <div key={s.k} className="metric-card rounded-2xl px-4 py-3">
                <dt className="text-base font-extrabold tracking-tight tabular-nums">{s.k}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[linear-gradient(135deg,oklch(0.42_0.14_262/.14),oklch(0.58_0.12_165/.16))] blur-2xl" />
          <div className="portrait-shell overflow-hidden rounded-[2rem] p-2">
            <img
              src={zhanna}
              alt="Жанна Василевская, независимый финансовый менеджер"
              width={1080}
              height={1920}
              className="h-[430px] w-full rounded-[1.6rem] object-cover object-top sm:h-[560px]"
            />
          </div>
          <div className="glass-card absolute -bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl px-5 py-4 text-center">
            <p className="text-sm font-semibold">Жанна Василевская</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Бухгалтер • финансовый менеджер</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Scale,
    title: "Бухгалтерия для спокойствия",
    accent: "sapphire",
    items: [
      { icon: FileCheck2, text: "Учёт и отчётность без пропущенных сроков" },
      { icon: Receipt, text: "Порядок в первичных документах" },
      { icon: Scale, text: "Контроль налогов и обязательств" },
      { icon: ShieldCheck, text: "Работа с требованиями и контролирующими органами" },
    ],
  },
  {
    icon: BarChart3,
    title: "Финансы для управления",
    accent: "emerald",
    items: [
      { icon: LineChart, text: "Реальная прибыль бизнеса" },
      { icon: Gauge, text: "Движение и прогноз денег" },
      { icon: CalendarClock, text: "Платёжный календарь" },
      { icon: BarChart3, text: "Управленческий дашборд" },
      { icon: Workflow, text: "Автоматизация сбора данных" },
    ],
  },
] as const;

function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Услуги"
          title="Два направления работы"
          subtitle="Закрываю обязательную отчётность и одновременно строю управленческий контур, на котором вы принимаете решения."
        />

        <div className="relative mt-12 grid gap-6 lg:grid-cols-2">
          <div className="pointer-events-none absolute left-1/2 top-16 hidden h-[calc(100%-8rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent lg:block" />
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i}>
              <article
                className={`service-card h-full rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:p-9 ${
                  s.accent === "emerald" ? "service-card-emerald" : "service-card-sapphire"
                }`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground ${
                    s.accent === "emerald"
                      ? "bg-[image:var(--gradient-emerald)]"
                      : "bg-[image:var(--gradient-sapphire)]"
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{s.title}</h3>
                <ul className="mt-6 space-y-4">
                  {s.items.map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const MISTAKES = [
  {
    title: "Деньги на счёте ≠ прибыль",
    problem: "На счёте есть деньги, и собственник воспринимает их как свободные.",
    solution: "P&L показывает реальную прибыль, ОДДС — куда уходят деньги.",
  },
  {
    title: "Деньги выводятся без понимания лимита",
    problem: "Изъятие денег собственником может создавать дефицит оборотных средств.",
    solution: "Определяем безопасную сумму вывода с учётом обязательств бизнеса.",
  },
  {
    title: "Управление по вчерашним цифрам",
    problem: "Решения принимаются на основании устаревших таблиц и данных.",
    solution: "Автоматизируем сбор показателей и выводим ключевые цифры на дашборд.",
  },
];

function Expertise() {
  return (
    <section id="expertise" className="scroll-mt-24 bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Экспертиза"
          title="Частые ошибки бизнеса"
          subtitle="Три ситуации, которые встречаются почти в каждом проекте — и как я их закрываю."
        />

        <div className="mt-12 grid divide-y divide-border/70 border-y border-border/70 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {MISTAKES.map((m, i) => (
            <Reveal key={m.title} delay={i}>
              <article className="expertise-item group h-full p-6 transition-colors duration-300 hover:bg-secondary/45 sm:p-8">
                <span className="expertise-number text-5xl font-extrabold tracking-tight tabular-nums transition-colors">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-xl font-bold leading-snug">{m.title}</h3>
                <div className="expertise-problem mt-6 border-l-2 pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wide">Проблема</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {m.problem}
                  </p>
                </div>
                <div className="expertise-solution mt-5 border-l-2 border-emerald-brand pl-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-brand">
                    Решение
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed">{m.solution}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PRODUCT_TOOLS = [
  {
    icon: CalendarClock,
    title: "Платёжный календарь",
    text: "Контроль обязательств, сроков платежей и потребности в финансировании.",
    markers: [
      "Прогноз движения денег",
      "Предупреждение кассовых разрывов",
      "Сроки платежей в одном месте",
    ],
    kind: "calendar",
  },
  {
    icon: Table2,
    title: "Финансовая модель",
    text: "P&L, ДДС, сценарии, чувствительность и точка безубыточности.",
    markers: [
      "Несколько сценариев развития",
      "Анализ чувствительности",
      "Понятные выводы для решений",
    ],
    kind: "model",
  },
  {
    icon: Calculator,
    title: "Налоговый калькулятор",
    text: "Сравнение налоговых режимов и финансового результата.",
    markers: [
      "Быстрый расчёт по режимам",
      "Сравнение налоговой нагрузки",
      "Демонстрационный результат",
    ],
    kind: "tax",
  },
] as const;

function MiniProduct({ kind }: { kind: (typeof PRODUCT_TOOLS)[number]["kind"] }) {
  if (kind === "calendar") {
    return (
      <div className="tool-preview tool-preview-calendar">
        <div className="tool-preview-head">
          <span>Платежи • сентябрь</span>
          <b>Не ожидается</b>
        </div>
        <div className="tool-kpi-grid">
          <div className="tool-kpi is-primary">
            <span>Нужно оплатить</span>
            <b>540 000 ₽</b>
          </div>
          <div className="tool-kpi">
            <span>До конца месяца</span>
            <b>318 000 ₽</b>
          </div>
          <div className="tool-kpi">
            <span>Будущие</span>
            <b>222 000 ₽</b>
          </div>
        </div>
        <div className="payment-timeline">
          {[
            { day: "12", active: false, label: "" },
            { day: "18", active: true, label: "120k" },
            { day: "24", active: true, label: "380k" },
            { day: "30", active: false, label: "" },
          ].map((point) => (
            <div key={point.day} className={point.active ? "is-active" : ""}>
              <span>{point.day}</span>
              <i>{point.label}</i>
            </div>
          ))}
        </div>
        <div className="tool-status good">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Кассовый разрыв не ожидается
        </div>
      </div>
    );
  }

  if (kind === "model") {
    return (
      <div className="tool-preview tool-preview-model">
        <div className="tool-preview-head">
          <span>Финансовая модель</span>
          <b>Базовый сценарий</b>
        </div>
        <div className="tool-kpi-grid">
          <div className="tool-kpi is-primary">
            <span>Выручка</span>
            <b>997 500 ₽</b>
          </div>
          <div className="tool-kpi">
            <span>Прибыль</span>
            <b>+119 150 ₽</b>
          </div>
          <div className="tool-kpi">
            <span>Безубыточность</span>
            <b>927 472 ₽</b>
          </div>
        </div>
        <div className="model-path" aria-hidden>
          <span>Выручка</span>
          <i />
          <span>Точка</span>
          <i />
          <span>Прибыль</span>
        </div>
        <div className="model-chart" aria-hidden>
          <svg viewBox="0 0 260 92" role="img">
            <path className="break-even" d="M12 59H248" />
            <path className="revenue" d="M14 76C58 62 82 68 116 49C158 25 194 37 246 16" />
            <path className="profit" d="M14 74C58 72 92 65 128 58C174 49 206 42 246 31" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="tool-preview tool-preview-tax">
      <div className="tool-preview-head">
        <span>Сравнение режимов</span>
        <b>Демо-расчёт</b>
      </div>
      <div className="tax-compare">
        {[
          { mode: "УСН 6%", value: "186 000 ₽", best: true },
          { mode: "УСН 15%", value: "214 000 ₽", best: false },
          { mode: "ОСНО", value: "298 000 ₽", best: false },
        ].map((row) => (
          <div key={row.mode} className={row.best ? "is-best" : ""}>
            <span>{row.mode}</span>
            <b>{row.value}</b>
            {row.best ? <em>Выгоднее</em> : null}
          </div>
        ))}
      </div>
      <div className="tool-status neutral">
        <span>Экономия</span>
        <b>112 000 ₽ / год</b>
      </div>
    </div>
  );
}

function ProductShowcase() {
  return (
    <section id="tools" className="scroll-mt-24 bg-card py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Инструменты"
          title="Не только считаю. Создаю инструменты, которыми бизнес пользуется каждый день."
          subtitle="Это собственные рабочие разработки и прототипы финансового контура, а не кейсы клиентов."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PRODUCT_TOOLS.map((tool, i) => (
            <Reveal key={tool.title} delay={i}>
              <article className="product-card group h-full overflow-hidden rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:p-6">
                <div className="rounded-2xl border border-border/70 bg-secondary/55 p-3">
                  <MiniProduct kind={tool.kind} />
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[image:var(--gradient-sapphire)] text-primary-foreground">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tool.text}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2">
                  {tool.markers.map((marker) => (
                    <li key={marker} className="tool-marker">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{marker}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="surface-muted py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-border/70 bg-card px-6 py-10 text-center shadow-[var(--shadow-soft)] sm:px-12">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-sapphire)] text-primary-foreground">
              <Lock className="h-5 w-5" />
            </span>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Ваши цифры остаются только между нами
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Гарантирую полную финансовую конфиденциальность и безопасность данных.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const FUTURE_VIDEO_SRC = "";

function FinanceVisualFallback() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="finance-visual" aria-label="Статичный интерфейс финансового анализа">
      {FUTURE_VIDEO_SRC ? (
        <video
          src={FUTURE_VIDEO_SRC}
          muted
          loop
          playsInline
          autoPlay={!reduceMotion}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="finance-visual-header">
            <span>Сводка</span>
            <b>План действий</b>
          </div>
          <div className="finance-flow">
            {["Цифры", "Анализ", "Решения", "Система"].map((item, i) => (
              <div key={item} className={i === 3 ? "active" : ""}>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="finance-visual-body">
            <div className="finance-kpis">
              <p>P&L</p>
              <b>+ 620 000 ₽</b>
              <i />
            </div>
            <div className="cash-line" />
            <div className="finance-status">
              <CheckCircle2 className="h-4 w-4" />
              Кассовый разрыв не ожидается
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LeadMagnet() {
  return (
    <section className="surface-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="grid gap-10 overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <FinanceVisualFallback />

            <div>
              <span className="inline-flex rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Финансовый контур
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight">
                От результата — к понятному плану действий
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Помогу определить, какие финансовые инструменты действительно нужны вашему бизнесу в
                первую очередь.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-card pb-16 pt-4 sm:pb-24">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="cta-panel relative overflow-hidden rounded-3xl px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
            <div className="relative z-10 flex flex-col items-center gap-5">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Давайте разберём ваши цифры
              </h2>
              <p className="max-w-2xl text-pretty leading-relaxed text-white/78">
                На первой встрече посмотрим, как сейчас устроены финансы бизнеса, где не хватает
                прозрачности и что действительно имеет смысл изменить или автоматизировать.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" />
                Обсудить задачу в Telegram
              </a>
              <p className="text-xs text-white/62">Без обязательств продолжать работу.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-tight">Жанна Василевская</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Независимый финансовый менеджер: бухгалтерия, управленческий учёт и автоматизация
            отчётности.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Контакты</p>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Send className="h-4 w-4" />
            Telegram
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold">Навигация</p>
          <ul className="mt-3 space-y-2">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-5">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Жанна Василевская. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Diagnostic />
        <BeforeAfter />
        <Expertise />
        <Approach />
        <ProductShowcase />
        <Privacy />
        <LeadMagnet />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
