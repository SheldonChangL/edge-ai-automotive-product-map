import { Suspense } from "react";

import { EdgeAIMapExplorer } from "@/components/edge-ai-map-explorer";
import { edgeAIMapContent } from "@/content/edge-ai-map";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <EdgeAIMapExplorer content={edgeAIMapContent} />
    </Suspense>
  );
}
