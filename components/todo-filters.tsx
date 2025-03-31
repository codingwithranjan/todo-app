"use client"

import { Button } from "@/components/ui/button"
import type { FilterType } from "@/types/todo"
import { CheckCircle2, Circle, ListTodo } from "lucide-react"

interface TodoFiltersProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

export function TodoFilters({ filter, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="flex items-center space-x-1 bg-muted/30 p-1 rounded-md">
      <Button
        variant={filter === "all" ? "default" : "ghost"}
        size="sm"
        onClick={() => onFilterChange("all")}
        className="gap-1"
      >
        <ListTodo className="h-4 w-4" />
        All
      </Button>
      <Button
        variant={filter === "active" ? "default" : "ghost"}
        size="sm"
        onClick={() => onFilterChange("active")}
        className="gap-1"
      >
        <Circle className="h-4 w-4" />
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "default" : "ghost"}
        size="sm"
        onClick={() => onFilterChange("completed")}
        className="gap-1"
      >
        <CheckCircle2 className="h-4 w-4" />
        Completed
      </Button>
    </div>
  )
}

