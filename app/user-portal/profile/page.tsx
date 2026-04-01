"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserPortal } from "@/lib/user-portal-context";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/feedback/Alert";
import { Divider } from "@/components/ui/Divider";

export default function ProfilePage() {
  const { user, logout } = useUserPortal();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", email: user?.email ?? "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode with document
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const handleDarkMode = (value: boolean) => {
    setDarkMode(value);
    document.documentElement.classList.toggle("dark", value);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.replace("/user-portal/login");
  };

  if (!user) return null;

  return (
    <div className="px-4 md:px-10 lg:px-16 py-6">
      <div className="max-w-[560px] mx-auto space-y-6">

        {/* Profile header */}
        <div className="flex items-center gap-4">
          <Avatar name={user.name} size="lg" />
          <div>
            <h1 className="type-display">{user.name}</h1>
            <p className="type-body text-ink-secondary">{user.role} · {user.company}</p>
            <p className="type-caption text-ink-muted">{user.site}</p>
          </div>
        </div>

        {/* Personal details */}
        <Card padding="lg">
          <div className="flex items-center justify-between mb-5">
            <h2 className="type-heading">Personal details</h2>
            <Button
              variant={editing ? "ghost" : "secondary"}
              size="sm"
              onClick={() => {
                if (editing) {
                  setForm({ name: user.name, email: user.email });
                }
                setEditing((v) => !v);
                setSaved(false);
              }}
            >
              {editing ? "Cancel" : "Edit"}
            </Button>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <Input
              label="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              disabled={!editing}
            />
            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              disabled={!editing}
            />
            <Input
              label="Company"
              value={user.company}
              disabled
              helper="Managed by your organisation administrator"
            />
            <Input
              label="Site"
              value={user.site}
              disabled
              helper="Contact your administrator to change your assigned site"
            />

            {editing && (
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={saving}
                className="self-start"
              >
                Save changes
              </Button>
            )}

            {saved && (
              <Alert variant="success">Profile updated successfully.</Alert>
            )}
          </form>
        </Card>

        {/* Account settings */}
        <Card padding="lg">
          <h2 className="type-heading mb-4">Account</h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="type-label">Dark mode</p>
                <p className="type-caption text-ink-muted">Switch interface to dark theme</p>
              </div>
              <Toggle checked={darkMode} onChange={handleDarkMode} />
            </div>

            <Divider />

            <div className="pt-1">
              <Button variant="danger" size="sm" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
