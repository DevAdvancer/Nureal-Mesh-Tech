export type ProjectMetric = { label: string; value: string };

export function ProjectStats({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <dl
      className="grid w-full gap-4 grid-cols-[repeat(1,minmax(0,1fr))] sm:grid-cols-[repeat(2,minmax(0,1fr))]"
      aria-label="Project metrics"
      data-testid="project-stats"
    >
      {metrics.map((m, i) => {
        const isLastOdd =
          metrics.length % 2 === 1 && i === metrics.length - 1;
        return (
          <div
            key={m.label}
            data-testid="project-stat-card"
            className={[
              "flex min-w-0 max-w-full flex-col-reverse items-start overflow-hidden rounded-xl bg-white border border-[#1C1A26]/10 shadow-sm",
              "px-6 py-7 sm:px-7 sm:py-8",
              isLastOdd ? "sm:col-span-2" : "",
            ].join(" ")}
          >
            <dt className="m-0 mt-4 w-full min-w-0 max-w-full font-body text-[13px] leading-[1.5] text-[#1C1A26]/80 break-words">
              {m.label}
            </dt>
            <dd className="m-0 w-full min-w-0 max-w-full font-display font-extrabold text-violet break-words [overflow-wrap:anywhere] hyphens-auto leading-[1.15] text-[clamp(1.5rem,3.2vw,2rem)]">
              {m.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}