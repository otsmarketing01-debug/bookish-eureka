import Link from "next/link";
import { getServerSession } from "next-auth";
import { Inbox, MessageSquare, FileText, Users, ArrowUpRight, Clock } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  const [leadCount, newLeads, waitingRooms, activeRooms, closedRooms, postCount, publishedPosts, recentLeads] = await Promise.all([
    db.contactSubmission.count(),
    db.contactSubmission.count({ where: { status: "new" } }),
    db.chatRoom.count({ where: { status: "waiting" } }),
    db.chatRoom.count({ where: { status: "active" } }),
    db.chatRoom.count({ where: { status: "closed" } }),
    db.blogPost.count(),
    db.blogPost.count({ where: { published: true } }),
    db.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Total Leads", value: leadCount, icon: Inbox, sub: `${newLeads} new`, href: "/admin/leads", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
    { label: "Waiting Chats", value: waitingRooms, icon: MessageSquare, sub: `${activeRooms} active`, href: "/admin/chat", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
    { label: "Closed Chats", value: closedRooms, icon: Users, sub: "all time", href: "/admin/chat", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
    { label: "Blog Posts", value: publishedPosts, icon: FileText, sub: `${postCount} total`, href: "/admin/blog", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 px-6 py-4 backdrop-blur">
        <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {session?.user.name ?? "Admin"}. Here's what's happening.</p>
      </header>
      <div className="p-6">
        {/* Stat cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Link key={s.label} href={s.href}>
              <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                      <s.icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-3xl font-bold">{s.value}</p>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent leads */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Recent leads</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/leads">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {recentLeads.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-muted-foreground">No leads yet.</p>
            ) : (
              <div className="divide-y divide-border">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-4 px-6 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{lead.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{lead.email}{lead.service ? ` · ${lead.service}` : ""}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        lead.status === "new" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : lead.status === "won" ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
                        : lead.status === "lost" ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                        : ""
                      }
                    >
                      {lead.status}
                    </Badge>
                    <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                      <Clock className="h-3 w-3" /> {formatDate(lead.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
