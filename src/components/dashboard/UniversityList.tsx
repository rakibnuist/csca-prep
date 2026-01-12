"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Building2 } from "lucide-react";
import universitiesData from "@/data/csc-universities.json";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface University {
    nameEn: string;
    nameZh: string;
    location: string;
}

export function UniversityList() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("all");
    const [visibleCount, setVisibleCount] = useState(20);

    // Extract unique locations
    const locations = useMemo(() => {
        const locs = Array.from(new Set(universitiesData.map((u: any) => u.location))).sort();
        return locs;
    }, []);

    const filteredUniversities = universitiesData.filter((uni: any) => {
        const matchesSearch =
            uni.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            uni.nameZh.includes(searchQuery);

        const matchesLocation = selectedLocation === "all" || uni.location === selectedLocation;

        return matchesSearch && matchesLocation;
    });

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 20);
    };

    return (
        <Card className="col-span-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-blue-600" />
                            CSCA Required Universities List (2026)
                        </CardTitle>
                        <CardDescription className="mt-1">
                            The official list of {universitiesData.length} universities accepting CSCA exam results.
                        </CardDescription>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search by name..."
                            className="pl-9 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="w-full sm:w-48">
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Filter by Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                {locations.map((loc) => (
                                    <SelectItem key={loc as string} value={loc as string}>
                                        {loc as string}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredUniversities.slice(0, visibleCount).map((uni: any, index: number) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm line-clamp-2" title={uni.nameEn}>{uni.nameEn}</h3>
                                <p className="text-slate-500 text-xs mt-1 font-sans">{uni.nameZh}</p>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center text-xs text-slate-500">
                                    <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                                    {uni.location}
                                </div>
                                <Badge variant="secondary" className="text-[10px] px-1.5 h-5 bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    Approved
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUniversities.length === 0 && (
                    <div className="text-center py-12 text-slate-500 bg-white rounded-lg border border-dashed border-slate-200">
                        <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p>No universities found matching your search.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchQuery(""); setSelectedLocation("all"); }}
                            className="mt-2"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}

                {visibleCount < filteredUniversities.length && (
                    <div className="mt-8 text-center">
                        <Button variant="outline" onClick={handleLoadMore} className="w-full sm:w-auto min-w-[200px]">
                            Load More ({filteredUniversities.length - visibleCount} remaining)
                        </Button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400">
                        Source: <a href="https://eduexpressint.com/updates/complete-csc-universities-list-2026" target="_blank" className="underline hover:text-blue-500">EduExpress International</a>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
