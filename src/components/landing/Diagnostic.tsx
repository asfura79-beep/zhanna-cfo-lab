import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Send, Stethoscope } from "lucide-react";
import { Reveal, SectionTitle, TELEGRAM_URL } from "./shared";

const QUESTIONS = [
  "Вы знаете реальную прибыль бизнеса за последний закрытый месяц?",
  "Есть платёжный календарь минимум на ближайшие 30 дней?",
  "Вы заранее видите возможный дефицит денег?",
  "Дебиторская задолженность регулярно контролируется?",
  "Ключевые показатели можно получить без ручной сборки нескольких Excel-таблиц?",
];

function getResult(score: number) {
  if (score <= 1)
    return {
      title: "Финансы практически непрозрачны",
      text: "Большая часть решений принимается без целостной картины по деньгам и прибыли.",
    };
  if (score <= 3)
    return {
      title: "Контроль есть, но остаются слепые зоны",
      text: "Отдельные показатели контролируются, но финансовая система пока не даёт полной картины.",
    };
  if (score === 4)
    return {
      title: "Хороший уровень финансового контроля",
      text: "Основные показатели находятся под контролем. Следующий резерв — скорость получения данных и автоматизация.",
    };
  return {
    title: "Финансовая система хорошо организована",
    text: "Ключевые показатели доступны для принятия решений. Имеет смысл искать точечные возможности для улучшения и автоматизации.",
  };
}

export function Diagnostic() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(QUESTIONS.length).fill(null));

  const score = useMemo(() => answers.filter((a) => a === true).length, [answers]);
  const answered = answers.filter((a) => a !== null).length;
  const result = getResult(score);

  const setAnswer = (i: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? value : a)));

  return (
    <section id="calculator" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Диагностика"
          title="Насколько хорошо вы контролируете финансы бизнеса?"
          subtitle="Ответьте на несколько вопросов и оцените, насколько прозрачна финансовая система вашего бизнеса."
        />

        <Reveal className="mt-12">
          <div className="glass-card grid gap-10 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr]">
            <ul className="space-y-5">
              {QUESTIONS.map((q, i) => (
                <li
                  key={q}
                  className="grid gap-3 border-b border-border/60 pb-5 last:border-none last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                >
                  <p className="min-w-0 text-sm leading-relaxed">
                    <span className="mr-2 font-semibold text-muted-foreground tabular-nums">
                      {i + 1}.
                    </span>
                    {q}
                  </p>
                  <div className="flex shrink-0 gap-2">
                    {[
                      { label: "Да", value: true },
                      { label: "Нет", value: false },
                    ].map((opt) => {
                      const active = answers[i] === opt.value;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setAnswer(i, opt.value)}
                          aria-pressed={active}
                          className={`min-w-[74px] rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                            active
                              ? opt.value
                                ? "border-transparent bg-[image:var(--gradient-emerald)] text-primary-foreground"
                                : "border-transparent bg-[image:var(--gradient-sapphire)] text-primary-foreground"
                              : "border-border bg-card/70 text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-sapphire)] p-8 text-primary-foreground shadow-[var(--shadow-float)]">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[image:var(--gradient-emerald)] opacity-30 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Результат
                </span>

                <p className="mt-6 text-sm opacity-80">Баллов из 5</p>
                <motion.p
                  key={`${score}-${answered}`}
                  initial={{ opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 text-5xl font-extrabold tabular-nums leading-none"
                >
                  {score}
                </motion.p>

                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                  <motion.div
                    className="h-full rounded-full bg-[image:var(--gradient-emerald)]"
                    animate={{ width: `${(score / QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>

                {answered === QUESTIONS.length ? (
                  <motion.div
                    key={result.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <p className="text-lg font-bold leading-snug">{result.title}</p>
                    <p className="mt-2 text-sm leading-relaxed opacity-85">{result.text}</p>
                  </motion.div>
                ) : (
                  <p className="mt-6 text-sm leading-relaxed opacity-80">
                    Отвечено {answered} из {QUESTIONS.length}. Ответьте на все вопросы, чтобы
                    увидеть оценку.
                  </p>
                )}

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-5 py-3.5 text-sm font-semibold shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Send className="h-4 w-4" />
                  Обсудить результат в Telegram
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
