import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import { ProjectStats } from "./ProjectStats";

const metrics = [
  { label: "Peak throughput", value: "80k/min" },
  { label: "Dashboard p95", value: "180ms" },
  { label: "Pages on launch", value: "0" },
];

describe("ProjectStats", () => {
  it("renders a labelled description list", () => {
    const { getByTestId } = render(<ProjectStats metrics={metrics} />);
    const dl = getByTestId("project-stats");
    expect(dl).toBeInTheDocument();
    expect(dl.tagName).toBe("DL");
    expect(dl).toHaveAttribute("aria-label", "Project metrics");
  });

  it("pairs each value with its label using <dt>/<dd>", () => {
    const { container } = render(<ProjectStats metrics={metrics} />);
    const cards = container.querySelectorAll("[data-testid='project-stat-card']");
    expect(cards.length).toBe(metrics.length);
    cards.forEach((card, i) => {
      const dt = card.querySelector("dt");
      const dd = card.querySelector("dd");
      expect(dt).not.toBeNull();
      expect(dd).not.toBeNull();
      expect(within(card as HTMLElement).getByText(metrics[i].label).tagName).toBe("DT");
      expect(within(card as HTMLElement).getByText(metrics[i].value).tagName).toBe("DD");
    });
  });

  it("renders value visually above label (flex-col-reverse with DOM order dt → dd)", () => {
    const { container } = render(<ProjectStats metrics={metrics} />);
    const firstCard = container.querySelector("[data-testid='project-stat-card']")!;
    // DOM order: dt comes first, dd second — required for screen-reader pairing
    const children = Array.from(firstCard.children);
    expect(children[0].tagName).toBe("DT");
    expect(children[1].tagName).toBe("DD");
    // Visual order is inverted via the flex-col-reverse class on the card
    expect(firstCard.className).toMatch(/flex-col-reverse/);
  });

  it("survives extreme long values without losing pairing", () => {
    const extreme = [
      {
        label:
          "99.999th-percentile pipeline tail-latency under saturation conditions",
        value: "1,250,000,000 events/sec",
      },
      { label: "x", value: "0" },
    ];
    const { container, getByText } = render(<ProjectStats metrics={extreme} />);
    expect(container.querySelectorAll("dt").length).toBe(2);
    expect(container.querySelectorAll("dd").length).toBe(2);
    expect(getByText(extreme[0].value).tagName).toBe("DD");
    expect(getByText(extreme[0].label).tagName).toBe("DT");
  });

  it("makes the last card span both columns on small+ screens when count is odd", () => {
    const { container } = render(<ProjectStats metrics={metrics} />); // 3 items
    const cards = container.querySelectorAll("[data-testid='project-stat-card']");
    expect(cards[cards.length - 1].className).toMatch(/sm:col-span-2/);
    expect(cards[0].className).not.toMatch(/sm:col-span-2/);
  });
});
