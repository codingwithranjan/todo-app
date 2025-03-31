import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, AlertTriangle, ListTodo } from "lucide-react"

interface TodoStatsProps {
  stats: {
    total: number
    completed: number
    active: number
    overdue: number
  }
}

export function TodoStats({ stats }: TodoStatsProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Task Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                <ListTodo className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="text-sm">Total</div>
            </div>
            <div className="font-medium">{stats.total}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 h-7 w-7 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Circle className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <div className="text-sm">Active</div>
            </div>
            <div className="font-medium">{stats.active}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-2 h-7 w-7 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              </div>
              <div className="text-sm">Completed</div>
            </div>
            <div className="font-medium">{stats.completed}</div>
          </div>

          {stats.overdue > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 h-7 w-7 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                </div>
                <div className="text-sm">Overdue</div>
              </div>
              <div className="font-medium text-destructive">{stats.overdue}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

