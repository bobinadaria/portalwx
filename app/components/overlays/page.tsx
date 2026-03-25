"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Drawer } from "@/components/overlays/Drawer";
import { Modal } from "@/components/overlays/Modal";
import { Button } from "@/components/ui/Button";

export default function OverlaysPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLeftOpen, setDrawerLeftOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLgOpen, setModalLgOpen] = useState(false);

  return (
    <Showcase title="Drawer & Modal" description="Overlay patterns with GSAP animation.">
      <Preview label="Drawer">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open right drawer
          </Button>
          <Button variant="secondary" onClick={() => setDrawerLeftOpen(true)}>
            Open left drawer
          </Button>
        </div>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Detail Panel" direction="right">
          <p className="type-body">This is the drawer content. It slides in from the right with GSAP animation.</p>
          <p className="type-body mt-3">Press Escape or click the backdrop to close.</p>
        </Drawer>

        <Drawer open={drawerLeftOpen} onClose={() => setDrawerLeftOpen(false)} title="Left Panel" direction="left">
          <p className="type-body">This drawer slides in from the left.</p>
        </Drawer>
      </Preview>

      <Preview label="Modal">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open modal (md)
          </Button>
          <Button variant="secondary" onClick={() => setModalLgOpen(true)}>
            Open modal (lg)
          </Button>
        </div>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm Action" size="md">
          <p className="type-body mb-4">Are you sure you want to proceed? This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </div>
        </Modal>

        <Modal open={modalLgOpen} onClose={() => setModalLgOpen(false)} title="Large Modal" size="lg">
          <p className="type-body">This is a larger modal for detailed content like forms or data review.</p>
        </Modal>
      </Preview>
    </Showcase>
  );
}
