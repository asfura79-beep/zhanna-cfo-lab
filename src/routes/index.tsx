import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  Stethoscope,
  ShieldCheck,
  FileCheck2,
  Receipt,
  Scale,
  BarChart3,
  Workflow,
  LineChart,
  Gauge,
  CalendarClock,
  Lock,
  Download,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import zhanna from "@/assets/zhanna.jpg.asset.json";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import { Reveal, SectionTitle, TELEGRAM_URL } from "@/components/landing/shared";
import { Diagnostic } from "@/components/landing/Diagnostic";
import { Approach } from "@/components/landing/Approach";
import { BeforeAfter } from "@/components/landing/BeforeAfter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Жанна Василевская — финансовый менеджер на аутсорсе" },
      {
        name: "description",
        content:
          "Порядок в финансах и автоматизация учёта: P&L, cash flow, платёжный календарь и дашборды для собственника бизнеса.",
      },
      { property: "og:title", content: "Жанна Василевская — финансы и автоматизация учёта" },
      {
        property: "og:description",
        content:
          "Прозрачные цифры, защита от кассовых разрывов и автоматизация без ручного труда.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:flex lg:justify-between">
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
            className="hidden items-center gap-2 rounded-xl bg-[image:var(--gradient-sapphire)] px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.03] sm:inline-flex"
          >
            <Send className="h-4 w-4" />
            Написать в Telegram
          </a>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/60 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass-bar border-b border-border/60 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5">
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
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-sapphire)] px-4 py-3 text-sm font-semibold text-primary-foreground"
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
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[image:var(--gradient-sapphire)] opacity-[0.12] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-52 h-96 w-96 rounded-full bg-[image:var(--gradient-emerald)] opacity-[0.14] blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-brand" />
            Финансовый менеджер с бухгалтерской экспертизой
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Порядок в финансах и{" "}
            <span className="text-gradient-sapphire">автоматизация учёта</span> для вашего бизнеса
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)] transition-transform duration-200 hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" />
              Обсудить задачу в Telegram
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-6 py-4 text-sm font-semibold backdrop-blur transition-colors hover:bg-card"
            >
              <Stethoscope className="h-4 w-4" />
              Проверить финансовую систему
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              { k: "P&L", v: "Реальная прибыль" },
              { k: "ОДДС", v: "Контроль денег" },
              { k: "BI", v: "Бизнес в цифрах" },
            ].map((s) => (
              <div key={s.k} className="glass-card rounded-2xl px-4 py-3">
                <dt className="text-base font-bold">{s.k}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute inset-0 -z-10 translate-y-6 rounded-[2rem] bg-[image:var(--gradient-sapphire)] opacity-20 blur-2xl" />
          <div className="glass-card overflow-hidden rounded-[2rem] p-2">
            <img
              src={zhanna.url}
              alt="Жанна Василевская, независимый финансовый менеджер"
              width={1080}
              height={1920}
              className="h-[420px] w-full rounded-[1.6rem] object-cover object-top sm:h-[520px]"
            />
          </div>
          <div className="glass-card absolute -bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl px-5 py-4 text-center">
            <p className="text-sm font-semibold">Жанна Василевская</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Бухгалтер • финансовый менеджер
            </p>
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
    <section id="services" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Услуги"
          title="Два направления работы"
          subtitle="Закрываю обязательную отчётность и одновременно строю управленческий контур, на котором вы принимаете решения."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i}>
              <article className="glass-card h-full rounded-3xl p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-float)] sm:p-9">
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
    <section id="expertise" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Экспертиза"
          title="Частые ошибки бизнеса"
          subtitle="Три ситуации, которые встречаются почти в каждом проекте — и как я их закрываю."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {MISTAKES.map((m, i) => (
            <Reveal key={m.title} delay={i}>
              <article className="glass-card h-full rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <span className="text-sm font-bold text-muted-foreground tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold leading-snug">{m.title}</h3>
                <div className="mt-5 rounded-2xl bg-secondary/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Проблема
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {m.problem}
                  </p>
                </div>
                <div className="mt-3 rounded-2xl border border-border/60 p-4">
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

function Privacy() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="glass-card flex flex-col items-center gap-5 rounded-3xl px-6 py-10 text-center sm:px-12">
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

function LeadMagnet() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="glass-card grid gap-10 overflow-hidden rounded-3xl p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <img
                src={dashboardPreview}
                alt="Превью шаблона отчёта о движении денежных средств"
                width={1280}
                height={800}
                loading="lazy"
                className="w-full rounded-2xl object-cover shadow-[var(--shadow-float)]"
              />
              <div className="absolute inset-0 rounded-2xl bg-[image:var(--gradient-sapphire)] opacity-10" />
            </div>

            <div>
              <span className="inline-flex rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Бесплатный инструмент
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight">
                Проверьте, хватит ли бизнесу денег до конца месяца
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Получите базовый шаблон Cash Flow для самостоятельного контроля движения денег и
                заранее замечайте возможный дефицит.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <Download className="h-4 w-4" />
                Получить шаблон в Telegram
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <div className="glass-card flex flex-col items-center gap-5 rounded-3xl px-6 py-10 text-center sm:px-12">
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Давайте разберём ваши цифры
            </h2>
            <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              На первой встрече посмотрим, как сейчас устроены финансы бизнеса, где не хватает
              прозрачности и что действительно имеет смысл изменить или автоматизировать.
            </p>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.02]"
            >
              <Send className="h-4 w-4" />
              Обсудить задачу в Telegram
            </a>
            <p className="text-xs text-muted-foreground">Без обязательств продолжать работу.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-[1.2fr_1fr_1fr]">
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
      <div className="mx-auto mt-10 max-w-6xl px-5">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Жанна Василевская. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Diagnostic />
        <BeforeAfter />
        <Expertise />
        <Approach />
        <Privacy />
        <LeadMagnet />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
