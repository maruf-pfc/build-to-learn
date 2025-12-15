"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Medal, Trophy, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/users/leaderboard")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err)) 
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading Leaderboard...
      </div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-4">
        <div className="inline-flex p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
          <Trophy size={48} className="text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">Top learners on the platform</p>
        </div>
      </header>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {users.map((user, index) => (
              <div
                key={user._id}
                className={cn(
                  "flex items-center p-4 hover:bg-muted/50 transition",
                  index < 3 && "bg-yellow-50/30 dark:bg-yellow-900/10"
                )}
              >
                <div className="w-12 text-center font-bold text-xl text-muted-foreground">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </div>
                <div className="ml-4">
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      <User className="text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-foreground">{user.name}</h4>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
                <div className="font-bold text-primary text-lg">
                  {user.points} pts
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                No data available.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
