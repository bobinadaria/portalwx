"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserPortal } from "@/lib/user-portal-context";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/feedback/Alert";

export default function LoginPage() {
  const { login } = useUserPortal();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(email);
    setLoading(false);
    router.push("/user-portal");
  };

  return (
    <Card padding="lg" className="w-full max-w-[400px]">
      {/* Wordmark */}
      <div className="mb-6 text-center">
        <span className="text-[22px] font-semibold text-ink-primary tracking-tight">Sharry</span>
        <p className="type-caption text-ink-muted mt-0.5">Workplace access portal</p>
      </div>

      <h1 className="type-heading text-center mb-6">Sign in to your portal</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <Alert variant="error">{error}</Alert>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full mt-2"
        >
          Sign in
        </Button>
      </form>

      <Alert variant="info" className="mt-4">
        Demo mode — any email and password will work.
      </Alert>
    </Card>
  );
}
