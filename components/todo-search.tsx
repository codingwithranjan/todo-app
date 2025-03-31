"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface TodoSearchProps {
  onSearch: (query: string) => void
}

export function TodoSearch({ onSearch }: TodoSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tasks..."
        className="pl-8 w-full sm:w-[200px]"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

