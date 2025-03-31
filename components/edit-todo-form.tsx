"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Todo, TodoCategory, TodoPriority } from "@/types/todo"
import { Check, X } from "lucide-react"

interface EditTodoFormProps {
  todo: Todo
  onSubmit: (text: string, category: TodoCategory, priority: TodoPriority, dueDate: string) => void
  onCancel: () => void
}

export function EditTodoForm({ todo, onSubmit, onCancel }: EditTodoFormProps) {
  const [text, setText] = useState(todo.text)
  const [category, setCategory] = useState<TodoCategory>(todo.category)
  const [priority, setPriority] = useState<TodoPriority>(todo.priority)
  const [dueDate, setDueDate] = useState(todo.dueDate)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() !== "") {
      onSubmit(text, category, priority, dueDate)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Task description"
        className="w-full"
        autoFocus
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Select value={category} onValueChange={(value) => setCategory(value as TodoCategory)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="learning">Learning</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priority} onValueChange={(value) => setPriority(value as TodoPriority)}>
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" size="sm">
          <Check className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
    </form>
  )
}

