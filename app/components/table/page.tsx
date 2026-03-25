"use client";
import { Showcase, Preview } from "../_showcase";
import { Table, TableHead, TableRow, TableCell } from "@/components/data-display/Table";
import { Badge } from "@/components/ui/Badge";

const sites = [
  { name: "Building A", location: "New York", status: "Online", occupancy: "87%" },
  { name: "Building B", location: "London", status: "Degraded", occupancy: "62%" },
  { name: "Building C", location: "Singapore", status: "Offline", occupancy: "0%" },
  { name: "Building D", location: "Berlin", status: "Online", occupancy: "94%" },
];

const statusVariant = (s: string) =>
  s === "Online" ? "success" as const : s === "Degraded" ? "warning" as const : "error" as const;

export default function TablePage() {
  return (
    <Showcase title="Table" description="Data table with header, rows, cells, and status badges.">
      <Preview label="Default">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header>Site</TableCell>
              <TableCell header>Location</TableCell>
              <TableCell header>Status</TableCell>
              <TableCell header align="right">Occupancy</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {sites.map((s) => (
              <TableRow key={s.name}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.location}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(s.status)} dot>{s.status}</Badge>
                </TableCell>
                <TableCell align="right">{s.occupancy}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Preview>

      <Preview label="Clickable Rows">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell header>Name</TableCell>
              <TableCell header>Role</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            <TableRow onClick={() => {}}>
              <TableCell>Jane Smith</TableCell>
              <TableCell>Facility Manager</TableCell>
            </TableRow>
            <TableRow onClick={() => {}}>
              <TableCell>John Doe</TableCell>
              <TableCell>Security Admin</TableCell>
            </TableRow>
          </tbody>
        </Table>
      </Preview>
    </Showcase>
  );
}
