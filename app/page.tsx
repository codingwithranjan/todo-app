"use client"

import { useState, useEffect } from "react"
import { TodoList } from "@/components/todo-list"
import { AddTodoForm } from "@/components/add-todo-form"
import { TodoFilters } from "@/components/todo-filters"
import { TodoSearch } from "@/components/todo-search"
import { TodoStats } from "@/components/todo-stats"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Todo, TodoCategory, TodoPriority, FilterType } from "@/types/todo"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, ListTodo } from "lucide-react"

// Initial todos for first render
const initialTodos = [
  {
    id: 1,
    text: "Learn Next.js",
    completed: true,
    category: "learning" as TodoCategory,
    priority: "medium" as TodoPriority,
    dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
  },
  {
    id: 2,
    text: "Build a todo app",
    completed: false,
    category: "work" as TodoCategory,
    priority: "high" as TodoPriority,
    dueDate: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    text: "Deploy to Vercel",
    completed: false,
    category: "work" as TodoCategory,
    priority: "low" as TodoPriority,
    dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
  },
]

export default function Home() {
  // Start with initial todos
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isClient, setIsClient] = useState(false)

  // After mount, check localStorage
  useEffect(() => {
    setIsClient(true)
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isClient])

  const addTodo = (text: string, category: TodoCategory, priority: TodoPriority, dueDate: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      category,
      priority,
      dueDate,
    }
    setTodos([...todos, newTodo])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const editTodo = (id: number, text: string, category: TodoCategory, priority: TodoPriority, dueDate: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text, category, priority, dueDate } : todo)))
  }

  // Filter and search todos
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed
      if (filter === "completed") return todo.completed
      return true
    })
    .filter(
      (todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  // Get stats
  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
    overdue: todos.filter((todo) => 
      !todo.completed && 
      new Date(todo.dueDate) < new Date() && 
      todo.dueDate
    ).length,
  }

  return (
    <main className="min-h-screen bg-background pb-8">
      <div className="container max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
            TaskMaster
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid gap-6">
          <Card className="overflow-hidden border shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <AddTodoForm onAdd={addTodo} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-[1fr_250px]">
            <div className="space-y-6">
              <Card className="overflow-hidden border shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
                    <TodoFilters filter={filter} onFilterChange={setFilter} />
                    <TodoSearch onSearch={setSearchQuery} />
                  </div>

                  <Tabs defaultValue="list" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="list" className="flex items-center gap-2">
                        <ListTodo className="h-4 w-4" />
                        List View
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Completed
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="list" className="mt-0">
                      <TodoList
                        todos={filteredTodos.filter((todo) => filter !== "completed" || todo.completed)}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                        onEdit={editTodo}
                      />
                    </TabsContent>
                    <TabsContent value="completed" className="mt-0">
                      <TodoList
                        todos={todos.filter((todo) => todo.completed)}
                        onDelete={deleteTodo}
                        onToggle={toggleTodo}
                        onEdit={editTodo}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div>
              <TodoStats stats={stats} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

