"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, Clock, ListTodo } from "lucide-react"

interface TodoStatsProps {
  stats: {
    total: number
    completed: number
    active: number
    overdue: number
  }
}

export function TodoStats({ stats }: TodoStatsProps) {
  const statItems = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      className: "text-primary",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      className: "text-green-500",
    },
    {
      title: "Active",
      value: stats.active,
      icon: Circle,
      className: "text-blue-500",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: Clock,
      className: "text-destructive",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {statItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="flex items-center gap-2">
              <div className={`p-2 rounded-full bg-background border ${item.className}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.value} tasks</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

