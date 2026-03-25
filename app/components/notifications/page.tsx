"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Notifications, Notification } from "@/components/organisms/Notifications";

const initialItems: Notification[] = [
  { id: "1", title: "Visitor arrived", message: "Jane Smith has checked in at Building A.", time: "2m ago", read: false, variant: "info", action: { label: "View profile", onClick: () => {} } },
  { id: "2", title: "Access denied", message: "Unauthorized badge scan at Gate 3.", time: "15m ago", read: false, variant: "error" },
  { id: "3", title: "System update", message: "Portal WX will restart at 03:00 UTC.", time: "1h ago", read: false, variant: "warning" },
  { id: "4", title: "Export complete", message: "Your visitor report is ready to download.", time: "2h ago", read: true, variant: "success" },
  { id: "5", title: "New comment", message: "Tom Baker commented on the weekly report.", time: "Yesterday", read: true, variant: "default" },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(initialItems);

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id: string) => setItems((prev) => prev.filter((n) => n.id !== id));

  const clear = () => setItems([]);

  return (
    <Showcase title="Notifications" description="Notification center panel with read state, actions, and bulk controls.">

      <Preview label="Notification panel">
        <div className="flex justify-center">
          <Notifications
            items={items}
            onRead={markRead}
            onReadAll={markAll}
            onDismiss={dismiss}
            onClearAll={clear}
          />
        </div>
      </Preview>

      <Preview label="Empty state">
        <div className="flex justify-center">
          <Notifications items={[]} />
        </div>
      </Preview>

    </Showcase>
  );
}
