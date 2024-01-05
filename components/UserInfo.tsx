import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { Badge } from "./ui/badge"


interface UserInfoProps {
  user?: ExtendedUser
  label: string 
}

export const UserInfo = ({ user, label }: UserInfoProps) => {

  return (
    <Card className="w-[700px] shadow-md bg-transparent">
      <CardHeader>
        <p className="text-4xl font-semibold text-center text-red-100">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        
        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
          <p className="text-sm font-medium text-gray-300">
            ID
          </p>
          <p className="truncate text-sm max-w-[200px] font-mono p-1 bg-slate-400 rounded-md">
            {user?.id}
          </p>
        </div>


        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
          <p className="text-sm font-medium text-gray-300">
            Name
          </p>
          <p className="truncate text-sm max-w-[200px] font-mono p-1 bg-slate-400 rounded-md">
            {user?.name}
          </p>
        </div>


        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
          <p className="text-sm font-medium text-gray-300">
            Email
          </p>
          <p className="truncate text-sm max-w-[200px] font-mono p-1 bg-slate-400 rounded-md">
            {user?.email}
          </p>
        </div>


        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
          <p className="text-sm font-medium text-gray-300">
            Role
          </p>
          <p className="truncate text-sm max-w-[200px] font-mono p-1 bg-slate-400 rounded-md">
            {user?.role}
          </p>
        </div>


        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
          <p className="text-sm font-medium text-gray-300">
            2 Factor Authentication
          </p>
          <Badge
            variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
            className="truncate text-sm max-w-[200px] font-mono p-1 rounded-md"
          >
            { user?.isTwoFactorEnabled ? '🆗 ON' : '😠 OFF' }
          </Badge>
        </div>


      </CardContent>
    </Card>
  )
}



