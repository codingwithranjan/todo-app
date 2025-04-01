"use client"

import { useState } from "react"
import { format } from "date-fns"
import { AlertCircle, Calendar, CheckCircle, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Todo } from "@/types/todo"
import { EditTodoDialog } from "@/components/edit-todo-dialog"

interface TodoListProps {
  todos: Todo[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string, category: Todo["category"], priority: Todo["priority"], dueDate: string) => void
}

export function TodoList({ todos, onDelete, onToggle, onEdit }: TodoListProps) {
  // Sort todos: Overdue first, then by due date
  const sortedTodos = [...todos].sort((a, b) => {
    // Check if tasks are overdue
    const isOverdueA = !a.completed && new Date(a.dueDate) < new Date()
    const isOverdueB = !b.completed && new Date(b.dueDate) < new Date()

    // Sort overdue tasks first
    if (isOverdueA && !isOverdueB) return -1
    if (!isOverdueA && isOverdueB) return 1

    // Then sort by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const isOverdue = (todo: Todo) => {
    return !todo.completed && new Date(todo.dueDate) < new Date()
  }

  const getPriorityVariant = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      {sortedTodos.length === 0 ? (
        <div className="text-center text-muted-foreground p-4">
          No tasks found
        </div>
      ) : (
        sortedTodos.map((todo) => (
          <Card
            key={todo.id}
            className={cn(
              "p-4 hover:shadow-md transition-shadow",
              isOverdue(todo) && "border-destructive"
            )}
          >
            <div className="flex items-start gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "mt-0.5",
                  todo.completed && "text-primary",
                  isOverdue(todo) && !todo.completed && "text-destructive"
                )}
                onClick={() => onToggle(todo.id)}
              >
                {todo.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2" />
                )}
              </Button>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-medium",
                      todo.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {todo.text}
                  </span>
                  {isOverdue(todo) && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Overdue
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">{todo.category}</Badge>
                  <Badge variant={getPriorityVariant(todo.priority)}>
                    {todo.priority}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(todo.dueDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              <div className="flex gap-1">
                <EditTodoDialog todo={todo} onEdit={onEdit} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => onDelete(todo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}

