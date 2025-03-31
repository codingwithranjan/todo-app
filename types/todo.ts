export type TodoPriority = "low" | "medium" | "high"
export type TodoCategory = "personal" | "work" | "learning" | "other"
export type FilterType = "all" | "active" | "completed"

export interface Todo {
  id: number
  text: string
  completed: boolean
  category?: TodoCategory
  priority?: TodoPriority
  dueDate?: string
}

export const CATEGORY_ICONS = {
  work: "Briefcase",
  personal: "User",
  shopping: "ShoppingCart",
  learning: "BookOpen",
  health: "Heart",
  other: "MoreHorizontal",
}

export const PRIORITY_COLORS = {
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  high: "bg-rose-500/10 text-rose-500 border-rose-500/20",
}

