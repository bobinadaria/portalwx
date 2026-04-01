"use client";

import { use, useState, useRef, useEffect } from "react";
import {
  Camera as CameraIcon, CheckCircle, AlertTriangle, Frown,
  Wallet, Fingerprint, Car, RotateCcw, Loader2,
  QrCode as QrCodeIcon, FileText, Building2, ChevronRight,
  Navigation, MapPin, Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { QrCode } from "@/components/ui/QrCode";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Alert } from "@/components/feedback/Alert";
import { cn } from "@/lib/utils";

// ─── Config types ──────────────────────────────────────────────────────────────

interface Agreement {
  id: string;
  title: string;
  content: string;
  mandatory: boolean;
}

type CredentialType = "qr-code" | "wallet" | "biometric" | "license-plate" | "walk-in";
type CredentialStatus = "ready" | "requires-setup" | "unavailable";

interface CredentialOption {
  id: string;
  type: CredentialType;
  label: string;
  status: CredentialStatus;
}

interface CheckInConfig {
  token: string;
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestCompany?: string;
  host: string;
  hostFloor: string;
  buildingName: string;
  address: string;
  scheduledAt: string;
  requiresPhoto: boolean;
  requiresId: boolean;
  credentials: CredentialOption[];
  visitorAgreements: Agreement[];
  bfAgreements: Agreement[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const AGREEMENT_BODY = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dapibus fermentum ipsum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Praesent vitae arcu tempor neque lacinia pretium. Integer rutrum, orci vestibulum ullamcorper ultrices, lacus lectus varius nisi.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dapibus fermentum ipsum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dapibus fermentum ipsum. Ut enim ad minim veniam.`;

const MOCK_CONFIGS: Record<string, CheckInConfig> = {
  "demo-token-1": {
    token: "demo-token-1",
    guestFirstName: "Laurie",
    guestLastName: "Moore",
    guestEmail: "laurie.moore@example.com",
    guestCompany: "Cool UX",
    host: "Marcus Webb",
    hostFloor: "5th Floor",
    buildingName: "Your Building",
    address: "1 Your street name, New York City",
    scheduledAt: "2026-08-06T11:30:00",
    requiresPhoto: true,
    requiresId: false,
    credentials: [
      { id: "wallet",    type: "wallet",        label: "Apple Wallet",                  status: "ready" },
      { id: "qr-code",  type: "qr-code",        label: "QR code",                       status: "ready" },
      { id: "biometric",type: "biometric",      label: "Biometric pass",                status: "requires-setup" },
      { id: "garage",   type: "license-plate",  label: "License plate for garage entry",status: "unavailable" },
    ],
    visitorAgreements: [
      { id: "va-1", title: "Visitor Agreement",                  content: AGREEMENT_BODY, mandatory: true },
    ],
    bfAgreements: [
      { id: "bf-1", title: "Consent to Security Data Processing", content: AGREEMENT_BODY, mandatory: true },
      { id: "bf-2", title: "NDA",                                 content: AGREEMENT_BODY, mandatory: false },
    ],
  },
  "demo-token-2": {
    token: "demo-token-2",
    guestFirstName: "External",
    guestLastName: "Visitor",
    guestEmail: "visitor@example.com",
    host: "Emily Hartman",
    hostFloor: "Ground Floor",
    buildingName: "Building B — London",
    address: "123 Canary Wharf, London",
    scheduledAt: "2026-03-27T14:00:00",
    requiresPhoto: false,
    requiresId: true,
    credentials: [
      { id: "qr-code",  type: "qr-code",   label: "QR code",        status: "ready" },
      { id: "biometric",type: "biometric", label: "Biometric pass",  status: "requires-setup" },
    ],
    visitorAgreements: [
      { id: "va-1", title: "Visitor Agreement", content: AGREEMENT_BODY, mandatory: true },
    ],
    bfAgreements: [],
  },
};

// ─── Step type ────────────────────────────────────────────────────────────────

type Step =
  | "guestpass"
  | "welcome"
  | "register"
  | "id-verify"
  | "photo-intro"
  | "photo-capture"
  | "photo-processing"
  | "agreements-intro"
  | "visitor-agreement"
  | "reject-confirm"
  | "rejected"
  | "credential-select"
  | "bf-agreements-intro"
  | "bf-agreement"
  | "success";

// ─── Layout primitives ────────────────────────────────────────────────────────

function BuildingHero({ name }: { name: string }) {
  return (
    <div
      className="relative flex-shrink-0 h-44 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #1a2433 0%, #263347 55%, #354660 100%)",
      }}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/25" />
      {/* logo pill */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-white/90 rounded-lg px-2.5 py-1.5 shadow-sm">
        <Building2 size={13} className="text-signature" />
        <span className="text-[11px] font-semibold text-ink-primary leading-none">{name}</span>
      </div>
    </div>
  );
}

function ContentCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex-1 bg-surface-raised rounded-t-3xl -mt-6 relative z-10",
        "px-5 pt-7 pb-8 flex flex-col gap-5 overflow-y-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Large feature icon (bigger than FeatureIcon xl = 56px)
function BigIcon({
  icon,
  variant = "success",
}: {
  icon: React.ReactNode;
  variant?: "success" | "warning" | "error" | "brand";
}) {
  const styles = {
    success: "bg-status-success-bg text-status-success",
    warning: "bg-status-warning-bg text-status-warning",
    error:   "bg-status-error-bg text-status-error",
    brand:   "bg-brand-l1 text-signature",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full h-[72px] w-[72px] shrink-0",
        styles[variant],
      )}
      aria-hidden
    >
      {icon}
    </span>
  );
}

// ─── Screen: Guestpass ────────────────────────────────────────────────────────

function GuestpassScreen({ config, onStart }: { config: CheckInConfig; onStart: () => void }) {
  const d = new Date(config.scheduledAt);
  const dateFmt = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const timeFmt = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Branded header */}
      <div className="flex-shrink-0 bg-signature px-5 pt-5 pb-4">
        <p className="text-[11px] font-medium text-white/70 uppercase tracking-widest">Guestpass</p>
        <h1 className="type-heading text-white mt-0.5">{config.buildingName}</h1>
      </div>

      {/* White body */}
      <div className="flex-1 overflow-y-auto bg-surface-raised px-5 pt-5 pb-4 flex flex-col gap-5">
        {/* Invitation text */}
        <p className="type-body text-ink-secondary">
          Hello,{" "}
          <strong className="text-ink-primary font-semibold">{config.host}</strong>
          {" "}has invited you to{" "}
          <strong className="text-ink-primary font-semibold">
            {config.guestCompany ?? config.buildingName}
          </strong>
          {" "}on {dateFmt} at {timeFmt}.
        </p>

        {/* Step list */}
        <div className="flex flex-col gap-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 h-6 w-6 rounded-full bg-signature text-white flex items-center justify-center text-[11px] font-bold">
              1
            </span>
            <div>
              <p className="text-[11px] font-semibold text-ink-primary uppercase tracking-wide">
                HOW TO GET THERE
              </p>
              <p className="type-body text-ink-secondary mt-0.5">{config.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(config.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-signature uppercase tracking-wide hover:underline"
              >
                <Navigation size={11} />
                NAVIGATE
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 h-6 w-6 rounded-full border-2 border-border-default text-ink-muted flex items-center justify-center text-[11px] font-bold">
              2
            </span>
            <div>
              <p className="text-[11px] font-semibold text-ink-primary uppercase tracking-wide">
                SPEED UP THE CHECK-IN PROCESS AT THE RECEPTION.
              </p>
              <p className="type-body text-ink-secondary mt-0.5">
                After completing the online check-in, please proceed to the reception and show
                your QR code. Your host is on the{" "}
                <strong className="text-ink-primary">{config.hostFloor}</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full" onClick={onStart} icon={<CheckCircle size={16} />}>
          Online check-in
        </Button>
      </div>

      {/* Dark QR section — locked until check-in */}
      <div className="flex-shrink-0 bg-ink-primary px-5 py-5 flex flex-col items-center gap-3">
        <p className="text-[10px] font-semibold text-white/50 uppercase tracking-widest text-center">
          THIS QR WILL BE ACTIVATED AFTER CHECK-IN
        </p>
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-lg overflow-hidden opacity-25">
            <QrCode value="inactive-placeholder" size={112} />
          </div>
          <div className="absolute inset-0 backdrop-blur-sm rounded-lg bg-ink-primary/40" />
        </div>
      </div>
    </div>
  );
}

// ─── Screen: Welcome ──────────────────────────────────────────────────────────

function WelcomeScreen({ config, onStart }: { config: CheckInConfig; onStart: () => void }) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard>
        <div>
          <h1 className="type-display text-ink-primary leading-tight">
            Let&apos;s get you ready for your visit
          </h1>
          <p className="type-body text-ink-secondary mt-2">
            We&apos;ll quickly verify your personal details to make your arrival easier and faster.
          </p>
        </div>
        <div className="mt-auto pt-2">
          <Button className="w-full" onClick={onStart}>
            Start verification
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Register ─────────────────────────────────────────────────────────

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
}

function RegisterScreen({
  config,
  data,
  onChange,
  onContinue,
  errors,
}: {
  config: CheckInConfig;
  data: FormData;
  onChange: (f: keyof FormData, v: string) => void;
  onContinue: () => void;
  errors: Partial<Record<keyof FormData, string>>;
}) {
  const isValid = data.firstName.trim() && data.lastName.trim() && data.email.includes("@");
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard>
        <h1 className="type-display text-ink-primary">Please register</h1>
        <div className="flex flex-col gap-3">
          <Input
            label="First name (Required)"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            error={errors.firstName}
            placeholder="First name"
            autoComplete="given-name"
          />
          <Input
            label="Last name (Required)"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            error={errors.lastName}
            placeholder="Last name"
            autoComplete="family-name"
          />
          <Input
            label="Your company"
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            placeholder="Enter your company name"
            autoComplete="organization"
          />
          <Input
            label="Work e-mail"
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
            placeholder="mail@example.com"
            autoComplete="email"
          />
        </div>
        <div className="mt-auto pt-2">
          <Button className="w-full" disabled={!isValid} onClick={onContinue}>
            Continue
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: ID Verify ────────────────────────────────────────────────────────

function IdVerifyScreen({
  config,
  idNumber,
  onChange,
  onContinue,
  error,
}: {
  config: CheckInConfig;
  idNumber: string;
  onChange: (v: string) => void;
  onContinue: () => void;
  error?: string;
}) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard>
        <h1 className="type-display text-ink-primary">Please register</h1>
        <Input
          label="ID card number (Required)"
          value={idNumber}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          placeholder="Enter your ID card number"
        />
        <div className="mt-auto pt-2">
          <Button className="w-full" disabled={!idNumber.trim()} onClick={onContinue}>
            Continue
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Photo Intro ──────────────────────────────────────────────────────

function PhotoIntroScreen({ config, onContinue }: { config: CheckInConfig; onContinue: () => void }) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="items-center text-center">
        <div className="mt-2 flex justify-center">
          <BigIcon icon={<CameraIcon size={32} />} variant="success" />
        </div>
        <div>
          <h1 className="type-display text-ink-primary leading-tight">
            Your photo is required to enter
          </h1>
          <p className="type-body text-ink-secondary mt-2">
            To activate your access, please take a photo of yourself. Make sure you are in a
            well-lit environment without any strong light behind you.
          </p>
        </div>
        <div className="mt-auto pt-2 w-full">
          <Button className="w-full" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Photo Capture ────────────────────────────────────────────────────

function PhotoCaptureScreen({
  config,
  onCapture,
}: {
  config: CheckInConfig;
  onCapture: (dataUrl: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [phase, setPhase] = useState<"permission" | "denied" | "streaming" | "captured">("permission");
  const [preview, setPreview] = useState<string | null>(null);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setPhase("streaming");
    } catch {
      setPhase("denied");
    }
  };

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const { videoWidth: w, videoHeight: h } = videoRef.current;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    canvasRef.current.getContext("2d")?.drawImage(videoRef.current, 0, 0, w, h);
    const dataUrl = canvasRef.current.toDataURL("image/jpeg");
    setPreview(dataUrl);
    setPhase("captured");
    stopStream();
  };

  const retake = () => {
    setPreview(null);
    setPhase("permission");
  };

  useEffect(() => () => { stopStream(); }, []);

  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="relative">
        {/* Permission dialog */}
        {phase === "permission" && (
          <div className="absolute inset-0 rounded-t-3xl z-20 flex items-center justify-center px-6 bg-black/40">
            <div className="bg-surface-raised rounded-2xl p-5 w-full max-w-xs shadow-xl">
              <p className="type-label text-ink-primary text-center font-semibold">
                &ldquo;{config.buildingName}&rdquo; Would Like to Access the Camera
              </p>
              <p className="type-body text-ink-secondary text-center mt-2">
                Allow camera access in your browser to take your photo for check-in.
              </p>
              <div className="flex gap-3 mt-4">
                <Button variant="secondary" className="flex-1" size="sm" onClick={() => setPhase("denied")}>
                  Don&apos;t allow
                </Button>
                <Button className="flex-1" size="sm" onClick={startCamera}>
                  Allow
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Permission denied */}
        {phase === "denied" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl aspect-[3/4] bg-status-warning-bg flex items-center justify-center relative overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-status-warning/20 absolute top-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-status-warning/30 to-transparent" />
            </div>
            <Alert variant="warning">
              To verify your identity, we need a photo. Please allow camera access in your
              browser settings, then try again.
            </Alert>
            <Button className="w-full" onClick={retake}>
              Try again
            </Button>
          </div>
        )}

        {/* Streaming / captured */}
        {(phase === "streaming" || phase === "captured") && (
          <div className="flex flex-col gap-4 flex-1">
            <div className="rounded-xl overflow-hidden aspect-[3/4] bg-surface-subtle relative flex items-center justify-center">
              {phase === "streaming" && (
                <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
              )}
              {phase === "captured" && preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="Captured" className="w-full h-full object-cover" />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3 mt-auto">
              {phase === "streaming" && (
                <Button className="flex-1" onClick={capture}>
                  Take a photo
                </Button>
              )}
              {phase === "captured" && (
                <>
                  <Button variant="secondary" className="flex-1" onClick={retake} icon={<RotateCcw size={15} />}>
                    Retake photo
                  </Button>
                  <Button className="flex-1" onClick={() => preview && onCapture(preview)}>
                    Continue
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </ContentCard>
    </>
  );
}

// ─── Screen: Photo Processing ─────────────────────────────────────────────────

function PhotoProcessingScreen({ config }: { config: CheckInConfig }) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="items-center justify-center text-center">
        <Loader2 size={40} className="text-signature animate-spin" />
        <div>
          <h2 className="type-heading text-ink-primary">Processing your photo...</h2>
          <p className="type-body text-ink-secondary mt-1">Please wait a few seconds.</p>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Agreements Intro ─────────────────────────────────────────────────

function AgreementsIntroScreen({
  config,
  isBF = false,
  onContinue,
}: {
  config: CheckInConfig;
  isBF?: boolean;
  onContinue: () => void;
}) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="items-center text-center">
        <div className="mt-2 flex justify-center">
          <div className="relative">
            <BigIcon icon={<FileText size={32} />} variant="success" />
            {isBF && (
              <span className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-signature flex items-center justify-center shadow">
                <Building2 size={14} className="text-white" />
              </span>
            )}
          </div>
        </div>
        <div>
          <h1 className="type-display text-ink-primary leading-tight">
            {isBF ? "Review and confirm agreements" : "Review initial agreements"}
          </h1>
          <p className="type-body text-ink-secondary mt-2">
            {isBF
              ? "Before we can activate your access, you'll need to review and confirm additional agreements related to your selected access method. These agreements are specific to the credential you've chosen and ensure secure data processing and identification."
              : "Before we can start your check-in process, please review and confirm the required agreements. These are general terms related to data processing and access management that apply to all users."}
          </p>
        </div>
        <div className="mt-auto pt-2 w-full">
          <Button className="w-full" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Agreement ────────────────────────────────────────────────────────

function AgreementScreen({
  config,
  agreement,
  onAccept,
  onReject,
}: {
  config: CheckInConfig;
  agreement: Agreement;
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard>
        <h1 className="type-heading text-ink-primary shrink-0">{agreement.title}</h1>
        <div className="flex-1 overflow-y-auto rounded-xl border border-border-default bg-surface-subtle p-4 min-h-0">
          <p className="type-label font-semibold text-ink-primary mb-3">Header 2</p>
          <p className="type-body text-ink-secondary whitespace-pre-line">{agreement.content}</p>
          <p className="type-label font-semibold text-ink-primary mt-4 mb-3">Header 3</p>
          <p className="type-body text-ink-secondary">{agreement.content.split("\n\n")[0]}</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Button variant="secondary" className="flex-1" onClick={onReject}>
            Reject
          </Button>
          <Button className="flex-1" onClick={onAccept}>
            Accept
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Reject Confirm ───────────────────────────────────────────────────

function RejectConfirmScreen({
  config,
  onConfirm,
  onGoBack,
}: {
  config: CheckInConfig;
  onConfirm: () => void;
  onGoBack: () => void;
}) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="items-center text-center">
        <div className="mt-2 flex justify-center">
          <BigIcon icon={<AlertTriangle size={32} />} variant="warning" />
        </div>
        <div>
          <h1 className="type-display text-ink-primary leading-tight">
            Are you sure you want to reject the agreement?
          </h1>
          <p className="type-body text-ink-secondary mt-2">
            If you reject the visitor agreement, you won&apos;t be able to complete the check-in
            or access the building. Would you like to go back and accept it instead?
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-auto pt-2 w-full">
          <Button variant="secondary" className="w-full" onClick={onConfirm}>
            Yes, reject agreement
          </Button>
          <Button className="w-full" onClick={onGoBack}>
            Go back and accept
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Rejected ─────────────────────────────────────────────────────────

function RejectedScreen({ config }: { config: CheckInConfig }) {
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="items-center text-center">
        <div className="mt-2 flex justify-center">
          <BigIcon icon={<Frown size={32} />} variant="error" />
        </div>
        <div>
          <h1 className="type-display text-ink-primary leading-tight">
            We&apos;re sorry you can&apos;t check in
          </h1>
          <p className="type-body text-ink-secondary mt-2">
            Since you didn&apos;t accept the visitor agreement, we can&apos;t complete your
            check-in process. If you change your mind, you can restart the check-in anytime.
          </p>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Credential Select ────────────────────────────────────────────────

const CRED_ICONS: Record<CredentialType, React.ReactNode> = {
  "wallet":        <Wallet size={19} />,
  "qr-code":       <QrCodeIcon size={19} />,
  "biometric":     <Fingerprint size={19} />,
  "license-plate": <Car size={19} />,
  "walk-in":       <Check size={19} />,
};

const CRED_STATUS: Record<CredentialStatus, { label: string; variant: "success" | "warning" | "neutral" }> = {
  "ready":         { label: "READY TO GO",   variant: "success" },
  "requires-setup":{ label: "REQUIRES SET UP",variant: "warning" },
  "unavailable":   { label: "UNAVAILABLE",   variant: "neutral" },
};

function CredentialSelectScreen({
  config,
  onSelect,
}: {
  config: CheckInConfig;
  onSelect: (cred: CredentialOption) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard>
        <div>
          <h1 className="type-heading text-ink-primary">How do you want to enter</h1>
          <p className="type-body text-ink-secondary mt-1">Please select only one option:</p>
        </div>
        <div className="flex flex-col gap-2">
          {config.credentials.map((cred) => {
            const unavailable = cred.status === "unavailable";
            const active = selected === cred.id;
            const st = CRED_STATUS[cred.status];
            return (
              <button
                key={cred.id}
                disabled={unavailable}
                onClick={() => !unavailable && setSelected(cred.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left w-full transition-colors",
                  unavailable
                    ? "opacity-40 cursor-not-allowed border-border-subtle"
                    : active
                    ? "border-signature bg-brand-l2"
                    : "border-border-default hover:border-border-strong hover:bg-surface-subtle",
                )}
                aria-pressed={active}
              >
                <span className={cn("shrink-0", active ? "text-signature" : "text-ink-secondary")}>
                  {CRED_ICONS[cred.type]}
                </span>
                <span className={cn("type-label flex-1", active ? "text-signature" : unavailable ? "text-ink-muted" : "text-ink-primary")}>
                  {cred.label}
                </span>
                <Badge variant={st.variant}>{st.label}</Badge>
              </button>
            );
          })}
        </div>
        <div className="mt-auto pt-2">
          <Button
            className="w-full"
            disabled={!selected}
            onClick={() => {
              const c = config.credentials.find((x) => x.id === selected);
              if (c) onSelect(c);
            }}
          >
            Continue
          </Button>
        </div>
      </ContentCard>
    </>
  );
}

// ─── Screen: Success ──────────────────────────────────────────────────────────

function SuccessScreen({
  config,
  credential,
  photo,
}: {
  config: CheckInConfig;
  credential: CredentialOption | null;
  photo: string | null;
}) {
  const type = credential?.type ?? "qr-code";

  // Biometric — show captured photo
  if (type === "biometric") {
    return (
      <>
        <BuildingHero name={config.buildingName} />
        <ContentCard className="items-center text-center">
          <div className="mt-2 flex justify-center relative">
            {photo ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt="Your photo"
                  className="h-20 w-20 rounded-full object-cover border-2 border-border-default"
                />
                <span className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-status-success flex items-center justify-center shadow">
                  <Check size={14} className="text-white" />
                </span>
              </div>
            ) : (
              <BigIcon icon={<CheckCircle size={32} />} variant="success" />
            )}
          </div>
          <div>
            <h1 className="type-display text-ink-primary leading-tight">
              Check-in completed.<br />Your biometric access is active.
            </h1>
            <p className="type-body text-ink-secondary mt-2">
              You can now enter and leave the building using your biometric pass.
            </p>
          </div>
        </ContentCard>
      </>
    );
  }

  // Walk-in / non-integrated — no QR
  if (type === "walk-in" || type === "license-plate") {
    return (
      <>
        <BuildingHero name={config.buildingName} />
        <ContentCard className="items-center text-center">
          <div className="mt-2 flex justify-center">
            <BigIcon icon={<CheckCircle size={32} />} variant="success" />
          </div>
          <div>
            <h1 className="type-display text-ink-primary leading-tight">
              Check-in completed.<br />Access ready
            </h1>
            <p className="type-body text-ink-secondary mt-2">
              Just walk in when you arrive — the building is open.
            </p>
          </div>
        </ContentCard>
      </>
    );
  }

  // Wallet — show guestpass card + add to wallet buttons + fallback QR
  if (type === "wallet") {
    return (
      <>
        <BuildingHero name={config.buildingName} />
        <ContentCard className="items-center text-center">
          <div className="mt-2 flex justify-center">
            <BigIcon icon={<CheckCircle size={32} />} variant="success" />
          </div>
          <div>
            <h1 className="type-display text-ink-primary leading-tight">
              Check-in completed.<br />Your QR code is active!
            </h1>
          </div>
          {/* Guestpass card */}
          <div className="w-full rounded-2xl border-2 border-status-success bg-status-success-bg p-4 flex flex-col gap-3">
            <p className="text-[10px] font-bold text-status-success uppercase tracking-widest text-center">
              YOUR GUESTPASS
            </p>
            <p className="type-caption text-status-success text-center">
              Add to wallet on your device now to check-in smoothly when there.
            </p>
            {/* Wallet card preview */}
            <div
              className="rounded-xl h-20 flex items-center justify-center mx-2"
              style={{ background: "linear-gradient(135deg, #1a5c3a 0%, #2d8a55 100%)" }}
            >
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-white" />
                <span className="text-xs font-semibold text-white">{config.buildingName}</span>
              </div>
            </div>
            {/* Wallet buttons */}
            <button className="w-full bg-ink-primary rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <span className="text-xs font-semibold text-white">Add to Apple Wallet</span>
            </button>
            <button className="w-full border border-border-default bg-surface-raised rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-surface-subtle transition-colors">
              <span className="text-xs font-semibold text-ink-primary">Add to Google Wallet</span>
            </button>
            {/* Fallback QR */}
            <div className="border-t border-border-subtle pt-3 mt-1">
              <p className="type-caption text-ink-secondary text-center mb-3">
                Don&apos;t have the wallet? Use this QR code for check-in
              </p>
              <div className="flex justify-center">
                <QrCode value={`${config.token}-credential-active`} size={120} />
              </div>
            </div>
          </div>
        </ContentCard>
      </>
    );
  }

  // QR code — show QR + Apple Wallet button
  return (
    <>
      <BuildingHero name={config.buildingName} />
      <ContentCard className="items-center text-center">
        <div className="mt-2 flex justify-center">
          <BigIcon icon={<CheckCircle size={32} />} variant="success" />
        </div>
        <div>
          <h1 className="type-display text-ink-primary leading-tight">
            Check-in completed.<br />Your QR code is active!
          </h1>
          <p className="type-body text-ink-secondary mt-2">
            Add to Apple Wallet and scan at entry and exit.
          </p>
        </div>
        <QrCode
          value={`${config.token}-credential-active`}
          size={180}
          label="Entry QR code"
          caption="Valid today only"
        />
        {/* Apple Wallet button */}
        <button className="w-full bg-ink-primary rounded-xl py-3.5 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="text-sm font-semibold text-white">Add to Apple Wallet</span>
        </button>
        <p className="type-caption text-ink-muted">
          You&apos;ll also find this QR code in your e-mail.
        </p>
      </ContentCard>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckInPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const config = MOCK_CONFIGS[token];

  // ── Step state
  const [step, setStep] = useState<Step>("guestpass");
  const [agreementIdx, setAgreementIdx] = useState(0);
  const [isBFPhase, setIsBFPhase] = useState(false);

  // ── Form state
  const [form, setForm] = useState<FormData>({
    firstName: config?.guestFirstName ?? "",
    lastName:  config?.guestLastName ?? "",
    company:   config?.guestCompany ?? "",
    email:     config?.guestEmail ?? "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [idNumber, setIdNumber] = useState("");

  // ── Photo
  const [photo, setPhoto] = useState<string | null>(null);

  // ── Credential
  const [selectedCred, setSelectedCred] = useState<CredentialOption | null>(null);

  // ── Navigation helpers
  const goAfterPhoto = () => {
    if (config.visitorAgreements.length > 0) {
      setAgreementIdx(0);
      setIsBFPhase(false);
      setStep("agreements-intro");
    } else {
      setStep("credential-select");
    }
  };

  const afterRegister = () => {
    if (config.requiresId) {
      setStep("id-verify");
    } else if (config.requiresPhoto) {
      setStep("photo-intro");
    } else {
      goAfterPhoto();
    }
  };

  const handlePhotoCapture = (dataUrl: string) => {
    setPhoto(dataUrl);
    setStep("photo-processing");
    setTimeout(() => goAfterPhoto(), 2000);
  };

  const handleAgreementAccept = () => {
    const list = isBFPhase ? config.bfAgreements : config.visitorAgreements;
    if (agreementIdx < list.length - 1) {
      setAgreementIdx((i) => i + 1);
    } else {
      if (isBFPhase) {
        setStep("success");
      } else {
        setStep("credential-select");
      }
    }
  };

  const handleCredentialSelect = (cred: CredentialOption) => {
    setSelectedCred(cred);
    if (config.bfAgreements.length > 0) {
      setIsBFPhase(true);
      setAgreementIdx(0);
      setStep("bf-agreements-intro");
    } else {
      setStep("success");
    }
  };

  const currentAgreement = isBFPhase
    ? config?.bfAgreements[agreementIdx]
    : config?.visitorAgreements[agreementIdx];

  // ── Invalid token
  if (!config) {
    return (
      <div className="min-h-screen bg-surface-base flex flex-col">
        <header className="h-14 flex items-center justify-center bg-surface-raised border-b border-border-default">
          <span className="type-label font-semibold text-ink-primary">Sharry</span>
        </header>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <Alert variant="error" title="Invalid check-in link">
              This link is invalid or has expired. Please contact the person who sent you the invitation.
            </Alert>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">
      {/* Minimal sticky header */}
      <header className="h-12 shrink-0 sticky top-0 z-30 flex items-center justify-center bg-surface-raised border-b border-border-default">
        <span className="type-label font-semibold text-ink-primary">Sharry</span>
        <span className="h-4 w-px bg-border-default mx-3" />
        <span className="type-caption text-ink-muted">Guest Check-in</span>
      </header>

      {/* Centered mobile-width content */}
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-[420px] flex flex-col flex-1 min-h-0">

          {step === "guestpass" && (
            <GuestpassScreen config={config} onStart={() => setStep("welcome")} />
          )}

          {step === "welcome" && (
            <WelcomeScreen config={config} onStart={() => setStep("register")} />
          )}

          {step === "register" && (
            <RegisterScreen
              config={config}
              data={form}
              onChange={(f, v) => setForm((p) => ({ ...p, [f]: v }))}
              onContinue={afterRegister}
              errors={formErrors}
            />
          )}

          {step === "id-verify" && (
            <IdVerifyScreen
              config={config}
              idNumber={idNumber}
              onChange={setIdNumber}
              onContinue={() => {
                if (config.requiresPhoto) setStep("photo-intro");
                else goAfterPhoto();
              }}
            />
          )}

          {step === "photo-intro" && (
            <PhotoIntroScreen config={config} onContinue={() => setStep("photo-capture")} />
          )}

          {step === "photo-capture" && (
            <PhotoCaptureScreen config={config} onCapture={handlePhotoCapture} />
          )}

          {step === "photo-processing" && (
            <PhotoProcessingScreen config={config} />
          )}

          {step === "agreements-intro" && (
            <AgreementsIntroScreen
              config={config}
              isBF={false}
              onContinue={() => setStep("visitor-agreement")}
            />
          )}

          {step === "visitor-agreement" && currentAgreement && (
            <AgreementScreen
              config={config}
              agreement={currentAgreement}
              onAccept={handleAgreementAccept}
              onReject={() => setStep("reject-confirm")}
            />
          )}

          {step === "reject-confirm" && (
            <RejectConfirmScreen
              config={config}
              onConfirm={() => setStep("rejected")}
              onGoBack={() => setStep(isBFPhase ? "bf-agreement" : "visitor-agreement")}
            />
          )}

          {step === "rejected" && <RejectedScreen config={config} />}

          {step === "credential-select" && (
            <CredentialSelectScreen config={config} onSelect={handleCredentialSelect} />
          )}

          {step === "bf-agreements-intro" && (
            <AgreementsIntroScreen
              config={config}
              isBF={true}
              onContinue={() => setStep("bf-agreement")}
            />
          )}

          {step === "bf-agreement" && currentAgreement && (
            <AgreementScreen
              config={config}
              agreement={currentAgreement}
              onAccept={handleAgreementAccept}
              onReject={() => setStep("reject-confirm")}
            />
          )}

          {step === "success" && (
            <SuccessScreen config={config} credential={selectedCred} photo={photo} />
          )}

        </div>
      </main>
    </div>
  );
}
