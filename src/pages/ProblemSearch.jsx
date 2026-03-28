/* ProblemSearch.jsx */
import { useEffect, useState, useMemo  } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Search, Rocket, CircleCheck, Circle, ExternalLink, Tag, ChevronDown } from "lucide-react"
import '../styles/ProblemSearch.css'

export default function ProblemSearch() {
    const problems = [
        { id: 'f605', name: '購買力', difficulty: 1, tags: ['基礎控制'], zjId: 'f605' },
        { id: 'c123', name: 'Rails', difficulty: 3, tags: ['Stack', 'UVa'], zjId: 'c123' },
        { id: 'b923', name: 'Stack 堆疊演練', difficulty: 2, tags: ['Stack'], zjId: 'b923' },
        { id: 'd732', name: '二分搜尋', difficulty: 3, tags: ['Binary Search'], zjId: 'd732' },
        { id: 'h084', name: '牆上釘掛', difficulty: 5, tags: ['Monotonic Stack', 'Binary Search'], zjId: 'h084' },
        { id: 'c292', name: '從圓心開始', difficulty: 3, tags: ['DFS/BFS'], zjId: 'c292' },
        { id: 'f608', name: '飛機航班', difficulty: 4, tags: ['DP', 'LIS'], zjId: 'f608' },

        { id:'a001', name:'哈囉', difficulty:1, tags:['入門'], zjId:'a001' },
        { id:'a002', name:'簡易加法', difficulty:1, tags:['入門'], zjId:'a002' },
        { id:'a003', name:'兩光法師占卜術', difficulty:1, tags:['數學'], zjId:'a003' },
        { id:'a004', name:'文文的求婚', difficulty:1, tags:['條件判斷'], zjId:'a004' },
        { id:'a005', name:'Eva 的回家作業', difficulty:1, tags:['數列'], zjId:'a005' },
        { id:'a006', name:'一元二次方程式', difficulty:1, tags:['math'], zjId:'a006' },
        { id:'a007', name:'判斷質數', difficulty:2, tags:['math'], zjId:'a007' },
        { id:'a008', name:'迴文', difficulty:1, tags:['string'], zjId:'a008' },
        { id:'a009', name:'解碼器', difficulty:1, tags:['string'], zjId:'a009' },
        { id:'a010', name:'因數分解', difficulty:2, tags:['math'], zjId:'a010' },
        { id:'a011', name:'00494', difficulty:1, tags:['string'], zjId:'a011' },
        { id:'a012', name:'10055 - Hashmat the Brave Warrior', difficulty:1, tags:['math'], zjId:'a012' },
        { id:'a013', name:'羅馬數字', difficulty:2, tags:['string'], zjId:'a013' },
        { id:'a014', name:'水仙花數', difficulty:1, tags:['math'], zjId:'a014' },
        { id:'a015', name:'矩陣翻轉', difficulty:1, tags:['array'], zjId:'a015' },
        { id:'a016', name:'平方計算', difficulty:1, tags:['math'], zjId:'a016' },
        { id:'a017', name:'五則運算', difficulty:2, tags:['stack'], zjId:'a017' },
        { id:'a018', name:'數線', difficulty:1, tags:['math'], zjId:'a018' },
        { id:'a019', name:'停車費', difficulty:1, tags:['simulation'], zjId:'a019' },
        { id:'a020', name:'身分證檢驗', difficulty:1, tags:['math'], zjId:'a020' },

        { id:'a021', name:'大數運算', difficulty:2, tags:['bigint'], zjId:'a021' },
        { id:'a022', name:'迴文判斷', difficulty:1, tags:['string'], zjId:'a022' },
        { id:'a023', name:'ASCII', difficulty:1, tags:['string'], zjId:'a023' },
        { id:'a024', name:'最大公因數', difficulty:1, tags:['gcd'], zjId:'a024' },
        { id:'a025', name:'數字拆解', difficulty:1, tags:['math'], zjId:'a025' },
        { id:'a026', name:'排序', difficulty:1, tags:['sort'], zjId:'a026' },
        { id:'a027', name:'字串處理', difficulty:1, tags:['string'], zjId:'a027' },
        { id:'a028', name:'數列計算', difficulty:1, tags:['math'], zjId:'a028' },
        { id:'a029', name:'模運算', difficulty:2, tags:['math'], zjId:'a029' },
        { id:'a030', name:'進位轉換', difficulty:1, tags:['math'], zjId:'a030' },

        { id:'a031', name:'矩陣加法', difficulty:1, tags:['array'], zjId:'a031' },
        { id:'a032', name:'字串反轉', difficulty:1, tags:['string'], zjId:'a032' },
        { id:'a033', name:'統計', difficulty:1, tags:['array'], zjId:'a033' },
        { id:'a034', name:'二進位', difficulty:1, tags:['math'], zjId:'a034' },
        { id:'a035', name:'費氏數列', difficulty:1, tags:['dp'], zjId:'a035' },
        { id:'a036', name:'成績排名', difficulty:1, tags:['sort'], zjId:'a036' },
        { id:'a037', name:'距離', difficulty:1, tags:['math'], zjId:'a037' },
        { id:'a038', name:'絕對值', difficulty:1, tags:['math'], zjId:'a038' },
        { id:'a039', name:'最大值', difficulty:1, tags:['array'], zjId:'a039' },
        { id:'a040', name:'因數表', difficulty:1, tags:['math'], zjId:'a040' },

        { id:'a041', name:'排列', difficulty:2, tags:['math'], zjId:'a041' },
        { id:'a042', name:'統計字元', difficulty:1, tags:['string'], zjId:'a042' },
        { id:'a043', name:'矩陣乘法', difficulty:2, tags:['array'], zjId:'a043' },
        { id:'a044', name:'階乘', difficulty:1, tags:['math'], zjId:'a044' },
        { id:'a045', name:'數列 II', difficulty:1, tags:['math'], zjId:'a045' },
        { id:'a046', name:'排序 II', difficulty:2, tags:['sort'], zjId:'a046' },
        { id:'a047', name:'日期', difficulty:1, tags:['time'], zjId:'a047' },
        { id:'a048', name:'矩陣旋轉', difficulty:2, tags:['array'], zjId:'a048' },
        { id:'a049', name:'區間和', difficulty:2, tags:['prefix'], zjId:'a049' },
        { id:'a050', name:'字串匹配', difficulty:2, tags:['string'], zjId:'a050' },
    ]

    const [searchQuery, setSearchQuery] = useState('')
    const [completed, setCompleted] = useState(() =>
        JSON.parse(localStorage.getItem('apcs-progress') || '{}')
    )

    // 同步 localStorage
    useEffect(() => {
        localStorage.setItem('apcs-progress', JSON.stringify(completed))
    }, [completed])

    // useMemo 避免每次 React 執行 render 都重新 filter 浪費效能
    // 此處為搜尋功能主要邏輯，僅當 searchQuery 改變，才會重新計算
    const filteredProblems = useMemo(() => {
        {/* 改良建議 : Fisher–Yates algorithm */}
        return problems.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.zjId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.tags.some(tag =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
        )
    }, [searchQuery])
    {/* .sort(() => Math.random() - 0.5) */}

    // 切換使用者勾選項目
    const toggleComplete = (id) => {
        setCompleted(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    // 紀錄使用者解題數
    const solvedCount = Object.values(completed).filter(Boolean).length

    // 依照難度渲染星星
    const renderStars = (level) => {
        return (
            <div className="stars-wrapper">
                {Array.from({ length: 5 }, (_, i) => {
                    const index = i + 1
                    const active = index <= level

                    return (
                        <Star
                            key={index}
                            size={14}
                            fill={active ? "currentColor" : "none"}
                            className={active ? `star star-${level}` : "star-off"}
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div className="search-container">
            <label className='search-bar-text'>Search Problems</label>
            
            <div className="search-input-wrapper">
                <Search size={18} strokeWidth={2} className="search-icon"/>
                {/* 當使用者打字時，呼叫 setSearchQuery 更新狀態 */}
                <input type="text" placeholder="搜尋題目名稱、標籤或 ID..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            </div>  

            <div className="search-card">
                <div className="search-list-wrapper">
                    <p class="col-span-1 text-center cursor-pointer">狀態</p>
                    <p className="col-span-6 cursor-pointer">題目內容 / ID</p>
                    <p className="col-span-3 text-center cursor-pointer">困難度</p>
                    <p className="col-span-2 text-right cursor-pointer">標籤</p>
                </div>

                <AnimatePresence mode="popLayout">
                <div id="problem-list">
                    {filteredProblems.length === 0 ? (
                        <div className="no-result flex flex-col items-center">
                            <Rocket
                                size={96}
                                className="text-slate-700 mb-4 animate-bounce mt-[50px]"
                                aria-hidden="true"
                            />
                            <div className="empty text-center text-gray-500">No problems found</div>
                        </div>
                    ) : (
                        filteredProblems.map(p => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.2 }}
                                key={p.id}
                                className="problem-row"
                            >
                                <a
                                    className="problem-link"
                                    href={`https://zerojudge.tw/ShowProblem?problemid=${p.zjId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                                <div className="col-span-1 flex items-center justify-center cursor-pointer">
                                    <button
                                        onClick={() => toggleComplete(p.id)}
                                        className="transition-transform active:scale-90 z-1"
                                    >
                                        {completed[p.id] ? (
                                            // 完成狀態：藍色光圈 + 勾勾
                                            <CircleCheck size={24} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] cursor-pointer"/>
                                        ) : (
                                            // 未完成狀態：灰色圓圈
                                            <Circle size={24} className="text-slate-700 group-hover:text-slate-500 z-[1]"/>
                                        )}
                                    </button>
                                </div>


                                <div className="problem-info">
                                    <span className="problem-id">
                                        {p.zjId}
                                    </span>

                                    <a
                                        href={`https://zerojudge.tw/ShowProblem?problemid=${p.zjId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center group gap-2 problem-title"
                                    >
                                        <span className="problem-text">
                                            {p.name}
                                        </span>
                                        <ExternalLink size={30} className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity problem-row-selected" aria-hidden="true"/>
                                    </a>
                                </div>

                                <div className="difficulty">
                                    {renderStars(p.difficulty)}
                                </div>

                                <div className="tags col-span-3 text-right cursor-pointer">
                                    {p.tags.map(tag => (
                                        <span key={tag} className="tag flex items-center gap-1">
                                        <Tag size={10} className="text-primary problem-row-selected" aria-hidden="true"/>
                                        {tag}
                                        </span>
                                    ))}
                                </div>

                                {/*<div className="col-span-1 flex items-right justify-center cursor-pointer">
                                    <button
                                        onClick={() => console.log("展開標籤")}
                                        className="transition-transform active:scale-90 z-1"
                                    >
                                        <ChevronDown
                                        size={24}
                                        className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] cursor-pointer"
                                        aria-hidden="true"
                                        />
                                    </button>
                                </div>*/}

                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-px bg-white/5"></div>
                            </motion.div>
                        ))
                    )}
                </div>
                </AnimatePresence>
            </div>
            
            <div id="stats-container" className="sticky-effect mt-12 flex justify-center fade-in">
                <div className="fuck px-8 py-4 rounded-2xl flex items-center gap-8 shadow-xl">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-purple-400">{solvedCount}</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Solved</div>
                    </div>
                    <div class="w-px h-8 bg-white/10"></div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-slate-300">{problems.length}</div>
                        <div class="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">Total</div>
                    </div>
                    <div class="w-px h-8 bg-white/10"></div>
                    <div class="text-center">
                        <div className="text-2xl font-bold text-[#23B5D3]">{Math.round((solvedCount / problems.length) * 100)} %</div>
                        <div className="text-[10px] text-[#B6DCFE] text-slate-500 uppercase tracking-widest font-mono font-bold">Ratio</div>
                    </div>
                </div>
            </div>

        </div>
    );
}



/* 完成動畫流程 */

/* 
click category
      ↓
setFilter()
      ↓
React render
      ↓
filteredProblems 改變
      ↓
React diff DOM
      ↓
AnimatePresence 偵測元素新增/刪除
      ↓
motion layout 計算位置差
      ↓
播放動畫
*/