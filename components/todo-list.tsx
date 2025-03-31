"use client"

import type { Todo } from "@/types/todo"
import { TodoItem } from "@/components/todo-item"
import { motion, AnimatePresence } from "framer-motion"

interface TodoListProps {
  todos: Todo[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string, category: Todo["category"], priority: Todo["priority"], dueDate: string) => void
}

export function TodoList({ todos, onDelete, onToggle, onEdit }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/50 rounded-lg border border-border/50">
        <p className="text-muted-foreground">No tasks found. Add one to get started!</p>
      </div>
    )
  }

  return (
    <AnimatePresence mode="popLayout">
      <ul className="space-y-3">
        {todos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem todo={todo} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  )
}

