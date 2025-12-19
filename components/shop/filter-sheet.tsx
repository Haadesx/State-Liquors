"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "@/components/shared/filter-sidebar";
import { useState } from "react";

export function FilterSheet() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                    <div onClick={() => setOpen(false)}>
                        <FilterSidebar />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
