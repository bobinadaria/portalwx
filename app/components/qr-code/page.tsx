import { Showcase, Preview } from "../_showcase";
import { QrCode } from "@/components/ui/QrCode";

export default function QrCodePage() {
  return (
    <Showcase title="QrCode" description="QR code display block with optional label and caption. Replace inner SVG with qrcode.react for production.">

      <Preview label="Default">
        <QrCode
          value="https://portalwx.app/visit/V-2024"
          label="Visitor Pass"
          caption="Scan at reception to check in"
        />
      </Preview>

      <Preview label="Sizes">
        <div className="flex items-end gap-6 flex-wrap">
          <QrCode value="portal:guest:small"  size={80}  caption="80px" />
          <QrCode value="portal:guest:medium" size={128} caption="128px (default)" />
          <QrCode value="portal:guest:large"  size={180} caption="180px" />
        </div>
      </Preview>

      <Preview label="With label only">
        <div className="flex gap-6 flex-wrap">
          <QrCode value="portal:door:B-12" label="Door B-12" />
          <QrCode value="portal:asset:M-0081" label="Asset M-0081" />
        </div>
      </Preview>

    </Showcase>
  );
}
