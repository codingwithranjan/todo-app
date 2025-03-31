"use client"

import { useState } from "react"
import { type Todo, PRIORITY_COLORS } from "@/types/todo"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Pencil,
  Trash2,
  Calendar,
  Briefcase,
  User,
  ShoppingCart,
  BookOpen,
  Heart,
  MoreHorizontal,
  AlertTriangle,
} from "lucide-react"
import { EditTodoForm } from "./edit-todo-form"
import { format, isPast, parseISO } from "date-fns"

interface TodoItemProps {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string, category: Todo["category"], priority: Todo["priority"], dueDate: string) => void
}

export function TodoItem({ todo, onDelete, onToggle, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)

  const getCategoryIcon = (category: Todo["category"]) => {
    switch (category) {
      case "work":
        return <Briefcase className="h-3 w-3" />
      case "personal":
        return <User className="h-3 w-3" />
      case "shopping":
        return <ShoppingCart className="h-3 w-3" />
      case "learning":
        return <BookOpen className="h-3 w-3" />
      case "health":
        return <Heart className="h-3 w-3" />
      case "other":
        return <MoreHorizontal className="h-3 w-3" />
    }
  }

  const isOverdue = !todo.completed && todo.dueDate && isPast(parseISO(todo.dueDate))

  const handleEditSubmit = (text: string, category: Todo["category"], priority: Todo["priority"], dueDate: string) => {
    onEdit(todo.id, text, category, priority, dueDate)
    setIsEditing(false)
  }

  return (
    <Card
      className={`overflow-hidden border transition-all duration-200 ${
        todo.completed ? "bg-muted/30 border-muted" : "hover:border-primary/20"
      }`}
    >
      <CardContent className="p-3 sm:p-4">
        {isEditing ? (
          <EditTodoForm todo={todo} onSubmit={handleEditSubmit} onCancel={() => setIsEditing(false)} />
        ) : (
          <div className="flex items-start gap-3">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              className="h-5 w-5 mt-0.5"
            />

            <div className="flex-1 space-y-1.5">
              <div className="flex items-start justify-between">
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {todo.text}
                </label>
                <div className="flex items-center gap-1 ml-2">
                  <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="h-7 w-7">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(todo.id)}
                    className="h-7 w-7 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline" className="flex items-center gap-1 px-2 py-0 h-5 font-normal">
                  {getCategoryIcon(todo.category)}
                  <span className="capitalize">{todo.category}</span>
                </Badge>

                <Badge variant="outline" className={`px-2 py-0 h-5 font-normal ${PRIORITY_COLORS[todo.priority]}`}>
                  {todo.priority}
                </Badge>

                {todo.dueDate && (
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 px-2 py-0 h-5 font-normal ${
                      isOverdue ? "bg-destructive/10 text-destructive border-destructive/20" : ""
                    }`}
                  >
                    {isOverdue ? <AlertTriangle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                    {format(parseISO(todo.dueDate), "MMM d")}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

