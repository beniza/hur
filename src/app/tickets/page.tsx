"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    AlertCircle,
    XCircle,
    HelpCircle,
    Globe,
    GraduationCap,
    Truck,
    AppWindow,
    Monitor,
    Wifi,
    Key,
    Tag,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_TICKETS = [
    {
        id: "INC-2024-1001",
        topic: "Translation memory sync failure",
        category: "translation",
        status: "open",
        priority: "high",
        assignee: "Raju",
        created: "2 hrs ago",
        contact: "Anjali Sharma"
    },
    {
        id: "INC-2024-1002",
        topic: "New translator onboarding access",
        category: "access",
        status: "in-progress",
        priority: "medium",
        assignee: "Priya",
        created: "4 hrs ago",
        contact: "Vikram Singh"
    },
    {
        id: "INC-2024-1003",
        topic: "Logistics portal downtime",
        category: "logistics",
        status: "resolved",
        priority: "high",
        assignee: "Amit",
        created: "1 day ago",
        contact: "Logistics Team"
    },
    {
        id: "INC-2024-1004",
        topic: "Training video playback issue",
        category: "training",
        status: "open",
        priority: "low",
        assignee: "Unassigned",
        created: "1 day ago",
        contact: "Neha Gupta"
    },
    {
        id: "INC-2024-1005",
        topic: "VPN connection unstable",
        category: "network",
        status: "closed",
        priority: "medium",
        assignee: "Raju",
        created: "2 days ago",
        contact: "Remote User"
    },
    {
        id: "INC-2024-1006",
        topic: "CAT Tool license expiry warning",
        category: "software",
        status: "open",
        priority: "high",
        assignee: "Priya",
        created: "3 hrs ago",
        contact: "Translation Dept"
    },
    {
        id: "INC-2024-1007",
        topic: "Printer jamming in Building B",
        category: "hardware",
        status: "open",
        priority: "low",
        assignee: "Unassigned",
        created: "5 hrs ago",
        contact: "Office Admin"
    },
    {
        id: "INC-2024-1008",
        topic: "Project deadline extension request",
        category: "other",
        status: "resolved",
        priority: "medium",
        assignee: "Suresh",
        created: "3 days ago",
        contact: "Project Lead"
    }
];

export default function AllTicketsPage() {
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [filterPriority, setFilterPriority] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTickets = MOCK_TICKETS.filter(ticket => {
        const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
        const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
        const matchesSearch = ticket.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ticket.contact.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesPriority && matchesSearch;
    });

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "translation": return <Globe className="h-4 w-4 text-blue-500" />;
            case "training": return <GraduationCap className="h-4 w-4 text-emerald-500" />;
            case "logistics": return <Truck className="h-4 w-4 text-amber-500" />;
            case "software": return <AppWindow className="h-4 w-4 text-purple-500" />;
            case "hardware": return <Monitor className="h-4 w-4 text-slate-500" />;
            case "network": return <Wifi className="h-4 w-4 text-cyan-500" />;
            case "access": return <Key className="h-4 w-4 text-rose-500" />;
            default: return <Tag className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "open": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"><AlertCircle className="h-3 w-3" /> Open</span>;
            case "in-progress": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200"><Clock className="h-3 w-3" /> In Progress</span>;
            case "resolved": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200"><CheckCircle2 className="h-3 w-3" /> Resolved</span>;
            case "closed": return <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200"><XCircle className="h-3 w-3" /> Closed</span>;
            default: return null;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "high": return <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">High</span>;
            case "medium": return <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Medium</span>;
            case "low": return <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Low</span>;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">All Tickets</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage and track all support requests</p>
                    </div>
                    <Link
                        href="/tickets/create"
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                    >
                        <Plus className="h-4 w-4" />
                        Create Ticket
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-600">Filters:</span>
                        </div>
                        <select
                            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                        <select
                            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket ID</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Topic</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredTickets.length > 0 ? (
                                    filteredTickets.map((ticket) => (
                                        <tr
                                            key={ticket.id}
                                            className="hover:bg-slate-50/50 transition-colors group cursor-pointer relative"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link href={`/tickets/${ticket.id}`} className="absolute inset-0 z-10" />
                                                <span className="font-mono text-sm font-medium text-slate-600 relative z-0">{ticket.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-slate-900">{ticket.topic}</span>
                                                    <span className="text-xs text-slate-500">{ticket.contact}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {getCategoryIcon(ticket.category)}
                                                    <span className="text-sm text-slate-600 capitalize">{ticket.category}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(ticket.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getPriorityBadge(ticket.priority)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                                                        {ticket.assignee === "Unassigned" ? <HelpCircle className="h-3 w-3" /> : ticket.assignee.charAt(0)}
                                                    </div>
                                                    <span className={cn("text-sm", ticket.assignee === "Unassigned" ? "text-slate-400 italic" : "text-slate-700")}>
                                                        {ticket.assignee}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {ticket.created}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right relative z-20">
                                                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Search className="h-8 w-8 text-slate-300" />
                                                <p>No tickets found matching your filters.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
                        <span>Showing {filteredTickets.length} of {MOCK_TICKETS.length} tickets</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
