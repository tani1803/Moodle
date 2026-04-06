"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, BookOpen, Users, LogOut, Trophy, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AlumniDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const placementRole = localStorage.getItem("placementRole");
    const storedUser = localStorage.getItem("user");

    // Redirect if not logged in or not alumni
    if (!token || placementRole !== "alumni") {
      router.push("/");
      return;
    }

    if (storedUser) setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("placementRole");
    router.push("/");
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">

      {/* Navbar */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            EduNexus
          </h1>
          <p className="text-xs text-slate-500">Alumni Portal</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">{user.name}</p>
            <p className="text-xs text-indigo-600 font-medium">Alumni</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* Welcome */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-50 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <p className="text-indigo-600 font-semibold text-sm mb-1">Welcome back 👋</p>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{user.name}</h2>
            <p className="text-slate-500">
              As an alumnus, you can share your industry experience and help current students prepare for placements.
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <h3 className="text-lg font-bold text-slate-800 mb-4">What would you like to do?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <Link href="/placement/industry-talk/new" className="block">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group cursor-pointer h-full">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1 group-hover:text-purple-600 transition-colors">Share Industry Talk</h4>
              <p className="text-sm text-slate-500">Share insights about company culture, tech stack, and practices.</p>
            </div>
          </Link>

          <Link href="/placement/interview/new" className="block">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group cursor-pointer h-full">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1 group-hover:text-green-600 transition-colors">Share Interview Experience</h4>
              <p className="text-sm text-slate-500">Help juniors by sharing your interview rounds and tips.</p>
            </div>
          </Link>

          <Link href="/placement" className="block">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow group cursor-pointer h-full">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">View Placement Hub</h4>
              <p className="text-sm text-slate-500">Browse SDE sheet, OA papers, blogs and more.</p>
            </div>
          </Link>

        </div>

        {/* Info */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> Alumni Access
          </h4>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>✅ Post industry talks</li>
            <li>✅ Share interview experiences</li>
            <li>✅ View SDE sheet, OA papers, blogs</li>
            <li>❌ Course management (academic only)</li>
          </ul>
        </div>

      </main>
    </div>
  );
}
