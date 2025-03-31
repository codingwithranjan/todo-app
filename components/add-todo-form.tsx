"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TodoCategory, TodoPriority } from "@/types/todo"
import { Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AddTodoFormProps {
  onAdd: (text: string, category: TodoCategory, priority: TodoPriority, dueDate: string) => void
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState<TodoCategory>("work")
  const [priority, setPriority] = useState<TodoPriority>("medium")
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0])
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() !== "") {
      onAdd(text, category, priority, dueDate)
      setText("")
      setIsExpanded(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1"
            onFocus={() => setIsExpanded(true)}
          />
          {isExpanded ? (
            <Button type="button" size="icon" variant="outline" onClick={() => setIsExpanded(false)}>
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="gap-1">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
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

                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="mt-3 flex justify-end">
                <Button type="submit" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

