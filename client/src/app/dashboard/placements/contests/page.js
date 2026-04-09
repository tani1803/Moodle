"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { placementAPI, contestAPI } from "@/lib/api";
import { Trophy, Plus, Clock, ExternalLink, X, ChevronLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContestsHub() {
  const router = useRouter();
  
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("student");

  // Contest Modal State
  const [showContestModal, setShowContestModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newContest, setNewContest] = useState({
    title: "", platform: "LeetCode", link: "", startTime: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [roleRes, contestRes] = await Promise.all([
        placementAPI.getPlacementRole(),
        contestAPI.getContests().catch(() => ({ data: { data: [] } }))
      ]);
      
      if (roleRes.data?.data?.placementRole) setRole(roleRes.data.data.placementRole);
      setContests(contestRes.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddContest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contestAPI.addContest({
        title: newContest.title,
        platform: newContest.platform,
        link: newContest.link,
        startTime: new Date(newContest.startTime).toISOString()
      });
      setShowContestModal(false);
      setNewContest({ title: "", platform: "LeetCode", link: "", startTime: "" });
      fetchData(); // Refresh contests
    } catch (err) {
      console.error(err);
      alert("Failed to add contest. Make sure you are a Senior.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
         <button onClick={() => router.push('/dashboard/placements')} className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-semibold mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Placement Hub
         </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
             <Trophy className="w-10 h-10 text-amber-500" /> Contest <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Hub</span>
           </h1>
           <p className="text-slate-500 mt-2 text-lg max-w-2xl">Never miss a coding competition. Participate in active hackathons tracked and updated by seniors to keep your problem-solving skills sharp.</p>
        </div>
        {role === "senior" && (
          <button onClick={() => setShowContestModal(true)} className="bg-slate-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1 whitespace-nowrap flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Post New Contest
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center my-32"><div className="w-10 h-10 rounded-full border-4 border-amber-100 border-t-amber-500 animate-spin"></div></div>
      ) : contests.length === 0 ? (
        <div className="bg-white py-20 rounded-3xl border border-slate-100 shadow-sm text-center">
           <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-slate-300" />
           </div>
           <h3 className="text-2xl font-bold text-slate-800 mb-2">No upcoming contests</h3>
           <p className="text-slate-500 max-w-sm mx-auto">There are currently no active coding contests on the radar. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contests.map((c) => {
             const contestDate = new Date(c.startTime);
             const isHappeningNow = contestDate < new Date();
             
             return (
               <a key={c._id} href={c.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 transition-all duration-300 relative overflow-hidden h-[250px] flex flex-col">
                    
                    {isHappeningNow && (
                      <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 animate-ping mt-6 mr-6"></div>
                    )}
                    
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-100 group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-500"></div>

                    <div className="flex justify-between items-start mb-6 pt-2">
                       <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-slate-100 group-hover:bg-amber-100 text-slate-500 group-hover:text-amber-700 rounded-full transition-colors">{c.platform}</span>
                       {isHappeningNow && <span className="text-[10px] bg-red-50 text-red-600 px-2.5 py-1 rounded-lg border border-red-100 font-black">LIVE NOW</span>}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">{c.title}</h3>
                    
                    <div className="mt-auto pt-5 border-t border-slate-50 flex flex-col gap-3">
                       <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-slate-50 p-3 rounded-xl">
                          <Calendar className="w-5 h-5 text-amber-500" /> 
                          {contestDate.toLocaleString("en-US", { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                       </div>
                    </div>
                  </div>
               </a>
             )
          })}
        </div>
      )}

      {/* MODAL FOR SENIORS TO ADD CONTESTS */}
      {showContestModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col border border-white/20">
            <div className="p-6 text-white bg-slate-900 flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-500/30 rounded-full blur-2xl"></div>
               <div className="relative z-10">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Trophy className="w-5 h-5 text-amber-400" /> Post New Contest</h2>
                  <p className="text-slate-400 text-xs mt-1">Notify students about upcoming hackathons or contests.</p>
               </div>
               <button onClick={() => setShowContestModal(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative z-10">
                 <X className="w-5 h-5" />
               </button>
            </div>
            
            <form onSubmit={handleAddContest} className="p-6 bg-slate-50">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Contest Title</label>
                  <input type="text" required value={newContest.title} onChange={e => setNewContest({...newContest, title: e.target.value})} placeholder="e.g. LeetCode Weekly Contest 400" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium shadow-sm" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Platform Name</label>
                  <input type="text" required value={newContest.platform} onChange={e => setNewContest({...newContest, platform: e.target.value})} placeholder="e.g. Codeforces, HackerRank, GeeksforGeeks" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium shadow-sm" />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Contest Link</label>
                  <input type="url" required value={newContest.link} onChange={e => setNewContest({...newContest, link: e.target.value})} placeholder="https://..." className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium shadow-sm" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1 block">Start Date & Time</label>
                  <input type="datetime-local" required value={newContest.startTime} onChange={e => setNewContest({...newContest, startTime: e.target.value})} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium shadow-sm text-slate-700" />
                </div>
              </div>
              
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setShowContestModal(false)} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                   {isSubmitting ? "Posting..." : "Publish Contest"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
