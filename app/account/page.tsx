import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, User } from "lucide-react";

export default function AccountPage() {
    const mockOrders = [
        { id: "ORD-001", date: "Dec 18, 2025", total: 85.99, status: "Delivered", items: ["Tito's Vodka", "Josh Cabernet"] },
        { id: "ORD-002", date: "Nov 24, 2025", total: 45.50, status: "Delivered", items: ["White Claw Variety"] },
    ];

    return (
        <div className="container px-4 md:px-6 py-10">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Sidebar Nav */}
                <aside className="w-full md:w-64 space-y-4">
                    <h2 className="text-2xl font-bold mb-6">My Account</h2>
                    <nav className="flex flex-col space-y-1">
                        <Button variant="secondary" className="justify-start">
                            <Package className="mr-2 h-4 w-4" />
                            Orders
                        </Button>
                        <Button variant="ghost" className="justify-start">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                        <Button variant="ghost" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                            Log Out
                        </Button>
                    </nav>
                </aside>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-6">Order History</h3>
                    <div className="space-y-4">
                        {mockOrders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-6 bg-card">
                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                                    <div>
                                        <span className="font-bold">{order.id}</span>
                                        <span className="text-muted-foreground mx-2">•</span>
                                        <span className="text-muted-foreground">{order.date}</span>
                                    </div>
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {order.status}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground mb-4">
                                    {order.items.join(", ")}
                                </div>
                                <div className="flex justify-between items-center border-t pt-4">
                                    <span className="font-bold">Total: ${order.total.toFixed(2)}</span>
                                    <Button variant="outline" size="sm">View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
