"use client";

import { useState } from "react";
import { Showcase, Preview } from "../_showcase";
import { Search } from "@/components/molecules/Search";
import { GoogleSearch } from "@/components/molecules/GoogleSearch";
import { Building2, User, FileText } from "lucide-react";

const results = [
  { id: "1", label: "Jane Smith",    description: "Visitor — Building A",  icon: <User />,       category: "People" },
  { id: "2", label: "John Doe",      description: "Employee — Floor 3",     icon: <User />,       category: "People" },
  { id: "3", label: "Building A",    description: "Main HQ — London",       icon: <Building2 />,  category: "Facilities" },
  { id: "4", label: "Access Report", description: "January 2026",           icon: <FileText />,   category: "Reports" },
];

const places = [
  { placeId: "1", label: "1 Canada Square",      description: "Canary Wharf, London, UK" },
  { placeId: "2", label: "Shard, London Bridge",  description: "London Bridge, London, UK" },
  { placeId: "3", label: "The Gherkin",           description: "30 St Mary Axe, London, UK" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");

  const filtered = query.length >= 2
    ? results.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <Showcase title="Search & GoogleSearch" description="Autocomplete search with grouped results. GoogleSearch for address/place lookup.">

      <Preview label="Search with results">
        <div className="max-w-sm">
          <Search
            label="Search"
            placeholder="Search people, facilities, reports…"
            value={query}
            onChange={setQuery}
            results={filtered}
            onSelect={(r) => setQuery(r.label)}
          />
        </div>
      </Preview>

      <Preview label="Loading state">
        <div className="max-w-sm">
          <Search
            label="Searching…"
            placeholder="Search…"
            value="building"
            loading
          />
        </div>
      </Preview>

      <Preview label="Google address search">
        <div className="max-w-sm">
          <GoogleSearch
            label="Facility address"
            placeholder="Search address…"
            value={address}
            onChange={setAddress}
            suggestions={address.length >= 2 ? places : []}
            onSelect={(p) => setAddress(p.label)}
          />
        </div>
      </Preview>

    </Showcase>
  );
}
