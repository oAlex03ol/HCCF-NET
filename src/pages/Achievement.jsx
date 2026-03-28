import '../styles/ProblemSearch.css'
import { useState, useEffect } from "react"
import { Search, Circle, CheckCircle2, ExternalLink, Star } from "lucide-react"

const problemsData = [
  { id: 'f605', name: '購買力', difficulty: 1, tags: ['基礎控制'], zjId: 'f605' },
  { id: 'c123', name: 'Rails', difficulty: 3, tags: ['Stack', 'UVa'], zjId: 'c123' },
  { id: 'b923', name: 'Stack 堆疊演練', difficulty: 2, tags: ['Stack'], zjId: 'b923' },
  { id: 'd732', name: '二分搜尋', difficulty: 3, tags: ['Binary Search'], zjId: 'd732' },
  { id: 'h084', name: '牆上釘掛', difficulty: 5, tags: ['Monotonic Stack', 'Binary Search'], zjId: 'h084' },
  { id: 'c292', name: '從圓心開始', difficulty: 3, tags: ['DFS/BFS'], zjId: 'c292' },
  { id: 'f608', name: '飛機航班', difficulty: 4, tags: ['DP', 'LIS'], zjId: 'f608' },
]

const categories = ['All', 'Stack', 'Binary Search', 'DFS/BFS', 'DP']

export default function App() {
  const [currentFilter, setCurrentFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("apcs-progress") || "{}")
    setCompleted(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem("apcs-progress", JSON.stringify(completed))
  }, [completed])

  const filtered = problemsData.filter(p => {
    const matchFilter =
      currentFilter === "All" || p.tags.includes(currentFilter)

    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.zjId.toLowerCase().includes(searchQuery.toLowerCase())

    return matchFilter && matchSearch
  })

  const toggleComplete = (id) => {
    setCompleted(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const solvedCount = Object.values(completed).filter(Boolean).length

  return (
    <div className="p-4 md:p-10 bg-slate-900 min-h-screen text-slate-100 hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm font-mono border border-purple-500/30">
                  APCS
                </span>
                題庫練習系統
              </h1>
              <p className="text-slate-500 text-sm mt-2">
                追蹤你的解題進度與強化演算法能力
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCurrentFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
                    ${currentFilter === cat
                      ? "bg-purple-500/20 border-purple-500 text-purple-400"
                      : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

          </div>

          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="搜尋題目 ID 或名稱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>
        </header>

        {/* Card */}
        <div className="glass-card rounded-[2rem] overflow-hidden shadow-2xl">

          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <div className="col-span-1 text-center">狀態</div>
            <div className="col-span-6">題目內容 / ID</div>
            <div className="col-span-3 text-center">困難度</div>
            <div className="col-span-2 text-right">標籤</div>
          </div>

          {/* Problem List */}
          <div className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="p-20 text-center text-slate-500 font-mono text-sm uppercase">
                No problems found
              </div>
            ) : (
              filtered.map(p => (
                <div
                  key={p.id}
                  className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.03] transition-colors group"
                >
                  {/* Status */}
                  <div className="col-span-2 md:col-span-1 flex justify-center">
                    <button onClick={() => toggleComplete(p.id)}>
                      {completed[p.id]
                        ? <CheckCircle2 className="text-cyan-400 w-6 h-6" />
                        : <Circle className="text-slate-600 w-6 h-6" />
                      }
                    </button>
                  </div>

                  {/* Title */}
                  <div className="col-span-10 md:col-span-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded font-bold">
                        {p.zjId}
                      </span>
                      <a
                        href={`https://zerojudge.tw/ShowProblem?problemid=${p.zjId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold flex items-center gap-2"
                      >
                        {p.name}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="col-span-6 md:col-span-3 flex justify-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        size={14}
                        className={i <= p.difficulty ? "text-amber-400 fill-current" : "text-slate-700"}
                      />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="col-span-6 md:col-span-2 flex flex-wrap justify-end gap-2">
                    {p.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-white/5 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 flex justify-center">
          <div className="glass-card px-8 py-4 rounded-2xl flex items-center gap-8 shadow-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{solvedCount}</div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">Solved</div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="text-center">
              <div className="text-2xl font-bold text-slate-300">{problemsData.length}</div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">Total</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
