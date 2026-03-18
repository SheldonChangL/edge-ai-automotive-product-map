import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";

import { EdgeAIMapExplorer } from "@/components/edge-ai-map-explorer";
import { edgeAIMapContent } from "@/content/edge-ai-map";

const replace = vi.fn();
let currentParams = new URLSearchParams();

const searchParamsApi = {
  get(key: string) {
    return currentParams.get(key);
  },
  toString() {
    return currentParams.toString();
  },
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace,
  }),
  usePathname: () => "/",
  useSearchParams: () => searchParamsApi,
}));

describe("EdgeAIMapExplorer", () => {
  beforeEach(() => {
    currentParams = new URLSearchParams();
    replace.mockReset();
  });

  it("renders the full explorer by default", () => {
    render(<EdgeAIMapExplorer content={edgeAIMapContent} />);

    expect(screen.getByRole("heading", { name: "車用電子 AI 產品全景圖" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "優先級怎麼看？" })).toBeInTheDocument();
    expect(screen.getByText("Showing 47 / 47")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ADAS 先進駕駛輔助" })).toBeInTheDocument();
  });

  it("updates the product count when a priority filter is selected", async () => {
    const user = userEvent.setup();

    render(<EdgeAIMapExplorer content={edgeAIMapContent} />);

    await user.click(screen.getByRole("button", { name: "高優先級" }));

    expect(screen.getByText("Showing 15 / 47")).toBeInTheDocument();
    expect(replace).toHaveBeenCalled();
  });

  it("expands product details on demand", async () => {
    const user = userEvent.setup();

    render(<EdgeAIMapExplorer content={edgeAIMapContent} />);

    const adasRegion = screen.getByRole("heading", { name: "ADAS 先進駕駛輔助" }).closest("article");
    expect(adasRegion).not.toBeNull();

    const detailButton = within(adasRegion as HTMLElement).getAllByRole("button", {
      name: /展開技術細節/,
    })[0];

    await user.click(detailButton);

    expect(screen.getByText("CNN 即時推論 (YOLOv8-nano / MobileNet)")).toBeInTheDocument();
    expect(screen.getByText("TI TDA4VM / Mobileye EyeQ")).toBeInTheDocument();
  });

  it("shows an empty state for unmatched search", async () => {
    const user = userEvent.setup();

    render(<EdgeAIMapExplorer content={edgeAIMapContent} />);

    await user.type(
      screen.getByRole("searchbox", { name: "搜尋產品、AI 應用、晶片方案" }),
      "non-existent-signal",
    );

    expect(screen.getByRole("heading", { name: "沒有符合條件的產品" })).toBeInTheDocument();
  });
});
