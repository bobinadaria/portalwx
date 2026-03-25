import { Showcase, Preview } from "../_showcase";
import { Row } from "@/components/layout/Row";
import { Col } from "@/components/layout/Col";
import { cn } from "@/lib/utils";

function Block({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-brand-l1 rounded-lg flex items-center justify-center h-12 type-caption text-signature font-medium", className)}>
      {children}
    </div>
  );
}

export default function ColRowPage() {
  return (
    <Showcase title="Col & Row" description="Grid primitives for 12-column layouts. Row defines the grid, Col controls span and start.">

      <Preview label="12-column row">
        <Row cols={12} gap="sm">
          {Array.from({ length: 12 }).map((_, i) => (
            <Col key={i} span={1}><Block>{i + 1}</Block></Col>
          ))}
        </Row>
      </Preview>

      <Preview label="Span variants">
        <Row cols={12} gap="sm">
          <Col span={12}><Block>span 12</Block></Col>
          <Col span={6}><Block>span 6</Block></Col>
          <Col span={6}><Block>span 6</Block></Col>
          <Col span={4}><Block>span 4</Block></Col>
          <Col span={4}><Block>span 4</Block></Col>
          <Col span={4}><Block>span 4</Block></Col>
          <Col span={3}><Block>span 3</Block></Col>
          <Col span={3}><Block>span 3</Block></Col>
          <Col span={6}><Block>span 6</Block></Col>
        </Row>
      </Preview>

      <Preview label="Column start">
        <Row cols={12} gap="sm">
          <Col span={4} start={1}><Block>start 1, span 4</Block></Col>
          <Col span={4} start={9}><Block>start 9, span 4</Block></Col>
          <Col span={6} start={4}><Block>start 4, span 6</Block></Col>
        </Row>
      </Preview>

    </Showcase>
  );
}
