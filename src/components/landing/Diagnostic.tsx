import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RotateCcw, Send, Stethoscope } from "lucide-react";
import { Reveal, SectionTitle, TELEGRAM_URL } from "./shared";

type Category = "profit" | "payments" | "cashflow" | "planfact" | "automation";

type Answer = {
  label: string;
  score: number;
};

type Question = {
  text: string;
  category: Category;
  answers: Answer[];
};

const QUESTIONS: Question[] = [
  {
    text: "Вы знаете реальную прибыль бизнеса за прошлый месяц?",
    category: "profit",
    answers: [
      { label: "Да, точно", score: 20 },
      { label: "Примерно", score: 10 },
      { label: "Нет", score: 0 },
    ],
  },
  {
    text: "Вы понимаете, сколько денег бизнесу потребуется в ближайшие 30 дней?",
    category: "payments",
    answers: [
      { label: "Да, есть платёжный календарь", score: 20 },
      { label: "Частично", score: 10 },
      { label: "Нет", score: 0 },
    ],
  },
  {
    text: "Вы регулярно видите движение денег: откуда они пришли и куда ушли?",
    category: "cashflow",
    answers: [
      { label: "Да, есть ДДС", score: 20 },
      { label: "Частично", score: 10 },
      { label: "Нет", score: 0 },
    ],
  },
  {
    text: "Вы сравниваете фактические доходы и расходы с планом?",
    category: "planfact",
    answers: [
      { label: "Да, регулярно", score: 20 },
      { label: "Иногда", score: 10 },
      { label: "Нет", score: 0 },
    ],
  },
  {
    text: "Управленческие цифры можно получить быстро, без ручного сбора из разных таблиц и программ?",
    category: "automation",
    answers: [
      { label: "Да", score: 20 },
      { label: "Частично", score: 10 },
      { label: "Нет", score: 0 },
    ],
  },
];

const RECOMMENDATIONS: Record<Category, { title: string; text: string }> = {
  profit: {
    title: "Реальная прибыль",
    text: "Нужен регулярный P&L, чтобы видеть не только остаток денег на счёте, но и реальный финансовый результат бизнеса.",
  },
  payments: {
    title: "Платёжный календарь",
    text: "Платёжный календарь помогает заранее видеть будущие платежи, дефицит денег и возможные кассовые разрывы.",
  },
  cashflow: {
    title: "Движение денежных средств",
    text: "Регулярный ДДС показывает, откуда приходят деньги и куда они уходят, и помогает отличать прибыль от движения денег.",
  },
  planfact: {
    title: "План-факт",
    text: "Сравнение плана и факта позволяет вовремя замечать отклонения по выручке, расходам и прибыли и реагировать до конца периода.",
  },
  automation: {
    title: "Скорость получения данных",
    text: "Если управленческие цифры приходится собирать вручную, стоит объединить источники данных и автоматизировать регулярные отчёты.",
  },
};

function getResult(score: number) {
  if (score >= 80)
    return {
      title: "Финансы под контролем",
      text: "У вас уже выстроена хорошая финансовая база. Следующий резерв — автоматизация, сокращение ручной работы и использование данных для управленческих решений.",
    };
  if (score >= 50)
    return {
      title: "Система есть, но в ней остаются слепые зоны",
      text: "Отдельные инструменты работают, но полной картины финансов бизнеса пока нет. Из-за этого часть решений приходится принимать по неполным данным.",
    };
  if (score >= 20)
    return {
      title: "Финансы требуют систематизации",
      text: "Данные есть, но они пока не складываются в единую систему управления. Основные риски — кассовые разрывы, позднее обнаружение проблем и отсутствие понятной картины прибыли.",
    };
  return {
    title: "Финансы управляются скорее по факту",
    text: "Бизнесу не хватает базовой системы финансового контроля. Начинать стоит не со сложной автоматизации, а с нескольких основных инструментов: ДДС, платёжного календаря, P&L и регулярного план-факта.",
  };
}

export function Diagnostic() {
  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(QUESTIONS.length).fill(null));

  const answered = answers.filter(Boolean).length;
  const complete = answered === QUESTIONS.length;
  const currentIndex = complete ? QUESTIONS.length - 1 : answered;
  const currentQuestion = QUESTIONS[currentIndex];
  const totalScore = useMemo(
    () => answers.reduce((sum, answer) => sum + (answer?.score ?? 0), 0),
    [answers],
  );
  const progress = complete ? 100 : (answered / QUESTIONS.length) * 100;
  const result = getResult(totalScore);
  const weakCategories = useMemo<Category[]>(() => {
    if (!complete) return [];
    if (totalScore === 100) return ["automation", "planfact"];

    return QUESTIONS.map((question, index) => ({
      category: question.category,
      score: answers[index]?.score ?? 0,
      index,
    }))
      .sort((a, b) => a.score - b.score || a.index - b.index)
      .slice(0, 2)
      .map((item) => item.category);
  }, [answers, complete, totalScore]);

  const setAnswer = (answer: Answer) =>
    setAnswers((prev) => prev.map((item, index) => (index === currentIndex ? answer : item)));

  const reset = () => setAnswers(Array(QUESTIONS.length).fill(null));

  return (
    <section id="calculator" className="surface-muted scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle
          eyebrow="Диагностика"
          title="Насколько под контролем финансы вашего бизнеса?"
          subtitle="5 вопросов → результат за 1 минуту. Без регистрации и передачи контактов."
        />

        <Reveal className="mt-12">
          <div className="diagnostic-shell grid gap-10 rounded-3xl p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
                  <Stethoscope className="h-3.5 w-3.5 text-emerald-brand" />
                  Вопрос {Math.min(answered + 1, QUESTIONS.length)} из {QUESTIONS.length}
                </span>
                <span className="text-sm font-semibold text-muted-foreground tabular-nums">
                  {answered}/{QUESTIONS.length}
                </span>
              </div>

              <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-secondary shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-[image:var(--gradient-emerald)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              <AnimatePresence mode="wait">
                {complete ? (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8"
                  >
                    <h3 className="text-2xl font-bold tracking-tight">
                      Диагностика финансовой системы бизнеса
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Ниже — общий результат и две зоны, с которых стоит начать работу.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card/80 px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Пройти ещё раз
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={currentQuestion.text}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8"
                  >
                    <h3 className="text-balance text-2xl font-bold tracking-tight">
                      {currentQuestion.text}
                    </h3>
                    <div className="mt-7 grid gap-3">
                      {currentQuestion.answers.map((answer) => (
                        <button
                          key={answer.label}
                          type="button"
                          onClick={() => setAnswer(answer)}
                          className="answer-option min-h-12 rounded-2xl border border-border bg-card/80 px-5 py-4 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {answer.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="result-panel relative overflow-hidden rounded-3xl p-8 text-primary-foreground shadow-[var(--shadow-float)]">
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Результат
                </span>

                {complete ? (
                  <motion.div
                    key={result.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div className="score-orbit">
                      <p className="text-sm opacity-80">Общий балл</p>
                      <motion.p
                        key={totalScore}
                        initial={{ opacity: 0.4, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 text-6xl font-extrabold tabular-nums leading-none"
                      >
                        {totalScore}
                      </motion.p>
                      <p className="mt-2 text-sm opacity-80">из 100</p>
                    </div>
                    <p className="mt-7 text-xl font-bold leading-snug">{result.title}</p>
                    <p className="mt-3 text-sm leading-relaxed opacity-85">{result.text}</p>

                    <div className="mt-8">
                      <h4 className="text-base font-bold leading-snug">
                        На что я бы обратила внимание в первую очередь
                      </h4>
                      <div className="mt-4 grid gap-3">
                        {weakCategories.map((category) => {
                          const recommendation = RECOMMENDATIONS[category];
                          return (
                            <div
                              key={category}
                              className="rounded-2xl border border-white/10 bg-white/12 p-4"
                            >
                              <p className="text-sm font-bold">{recommendation.title}</p>
                              <p className="mt-2 text-xs leading-relaxed opacity-85">
                                {recommendation.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/12 p-5">
                      <p className="font-bold leading-snug">
                        Получили результат, но не знаете, что исправлять первым?
                      </p>
                      <p className="mt-2 text-sm leading-relaxed opacity-85">
                        Разберём вашу ситуацию и определим, какие инструменты действительно нужны
                        бизнесу — без внедрения отчётов «для галочки».
                      </p>
                      <a
                        href={TELEGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-5 py-3.5 text-sm font-semibold shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <Send className="h-4 w-4" />
                        Обсудить результат в Telegram
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <p className="mt-7 text-sm leading-relaxed opacity-80">
                    Ответьте на 5 вопросов, чтобы увидеть оценку, слабые зоны и рекомендации.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
