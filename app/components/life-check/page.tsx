import { Showcase, Preview } from "../_showcase";
import { LifeCheck } from "@/components/molecules/LifeCheck";

export default function LifeCheckPage() {
  return (
    <Showcase title="LifeCheck" description="Connectivity and service health status indicator with auto-refresh.">

      <Preview label="All systems operational">
        <div className="max-w-sm">
          <LifeCheck
            services={[
              { name: "API",           status: "online",   latency: 42 },
              { name: "Database",      status: "online",   latency: 8 },
              { name: "Auth service",  status: "online",   latency: 15 },
              { name: "File storage",  status: "online",   latency: 120 },
            ]}
          />
        </div>
      </Preview>

      <Preview label="Degraded state">
        <div className="max-w-sm">
          <LifeCheck
            services={[
              { name: "API",           status: "online",   latency: 42 },
              { name: "Database",      status: "degraded", latency: 890 },
              { name: "Auth service",  status: "offline" },
              { name: "File storage",  status: "online",   latency: 120 },
            ]}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
