import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Send, TrendingDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { TELEGRAM_URL, formatRub, SectionTitle, Reveal } from "./shared";

export function Calculator() {
  const [revenue, setRevenue] = useState(3_000_000);
  const [margin, setMargin] = useState(15);

  const { yearlyLoss, monthlyLoss, profitShare } = useMemo(() => {
    const monthly = revenue * 0.05;
    const yearly = monthly * 12;
    const yearlyProfit = revenue * 12 * (margin / 100);
    return {
      monthlyLoss: monthly,
      yearlyLoss: yearly,
      profitShare: yearlyProfit > 0 ? Math.min(999, (yearly / yearlyProfit) * 100) : 0,
    };
  }, [revenue, margin]);

  return (
    <section id="calculator" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          eyebrow="Калькулятор"
          title="Сколько стоит слепая зона в учёте"
          subtitle="Базовая оценка: без прозрачных цифр бизнес теряет около 5% оборота на ошибках, задвоенных платежах и несобранной дебиторке."
        />

        <Reveal className="mt-12">
          <div className="glass-card grid gap-10 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr]">
            <div className="space-y-10">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label className="text-sm font-medium text-muted-foreground">
                    Среднемесячная выручка
                  </label>
                  <span className="text-lg font-semibold tabular-nums">
                    {formatRub(revenue)} ₽
                  </span>
                </div>
                <Slider
                  className="mt-5"
                  value={[revenue]}
                  min={300_000}
                  max={50_000_000}
                  step={100_000}
                  onValueChange={([v]) => setRevenue(v)}
                  aria-label="Среднемесячная выручка"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>300 тыс ₽</span>
                  <span>50 млн ₽</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <label className="text-sm font-medium text-muted-foreground">
                    Средняя рентабельность
                  </label>
                  <span className="text-lg font-semibold tabular-nums">{margin}%</span>
                </div>
                <Slider
                  className="mt-5"
                  value={[margin]}
                  min={1}
                  max={60}
                  step={1}
                  onValueChange={([v]) => setMargin(v)}
                  aria-label="Средняя рентабельность"
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>60%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-secondary/60 p-4">
                  <p className="text-xs text-muted-foreground">Потери в месяц</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums">
                    {formatRub(monthlyLoss)} ₽
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-secondary/60 p-4">
                  <p className="text-xs text-muted-foreground">Доля от годовой прибыли</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums">
                    {profitShare.toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-sapphire)] p-8 text-primary-foreground shadow-[var(--shadow-float)]">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[image:var(--gradient-emerald)] opacity-30 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                  <TrendingDown className="h-3.5 w-3.5" />
                  Цена ошибки
                </span>
                <p className="mt-6 text-sm opacity-80">Вы можете терять до</p>
                <motion.p
                  key={yearlyLoss}
                  initial={{ opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-1 text-4xl font-extrabold tabular-nums leading-tight sm:text-5xl"
                >
                  {formatRub(yearlyLoss)} ₽
                </motion.p>
                <p className="mt-1 text-sm opacity-80">в год из-за слепых зон в учёте</p>

                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-emerald)] px-5 py-3.5 text-sm font-semibold shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Send className="h-4 w-4" />
                  Найти эти деньги — написать в Telegram
                </a>
                <p className="mt-4 text-xs opacity-70">
                  Расчёт ориентировочный. На консультации считаем по вашим реальным данным.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
