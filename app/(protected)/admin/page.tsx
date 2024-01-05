'use client'

import { FormSuccess } from "@/components/FormSuccess"
import { RoleGate } from "@/components/auth/RoleGate"
import { Button } from "@/components/ui/button"
// import { currentRole } from "@/lib/auth"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"



const AdminPage = () => {
  
  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((Response) => {
        if (Response.ok) {
          console.log("ok")
          toast.success("Tu es admin, tu es autorisé à utiliser API Route !")
        } else {
          toast.error("Ooops, Tu n'est pas admin, tu ne peux pas utiliser API Route !")
        }
      })
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <Card className="w-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            🗝️Admin
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess 
              message="Tu es admin !"
            />
          </RoleGate>

          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
              Admin uniquement - API Route 
            </p>

            <Button onClick={onApiRouteClick}>
              Cliquer pour tester
            </Button>

          </div>


          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">
              Admin uniquement - Server Action 
            </p>

            <Button>
              Cliquer pour tester
            </Button>

          </div>

        </CardContent>

      </Card>
    </div>
  )
}

export default AdminPage

