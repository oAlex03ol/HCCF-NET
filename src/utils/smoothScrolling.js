// smoothScroll.js

const SmoothScroll = {
    current: 0, // 當前滾動位置
    target: 0,  // 目標滾動位置 (即時更新)
    isScrolling: false, // 是否正在執行動畫
    speed: 80,  // 滾動時的速度倍率
    friction: 0.5,  // 滾動時的摩擦力（值越小越滑順）
    active: false,  // 是否已啟用 SmoothScroll

    // 為了解決手動拖動滾動條時，內部狀態沒跟著變的問題
    scrollSyncHandler() {
        if (!this.isScrolling) {    // 只有在沒有動畫時才同步
            this.current = window.scrollY;   // 把 current 設為實際畫面位置
            this.target = window.scrollY;   // 把 target 也設為實際畫面位置
        }
    },

    scrollHandler(e) {
        e.preventDefault(); // 取消預設滾動行為

        const maxScroll = document.body.scrollHeight - window.innerHeight;  //

        this.target += e.deltaY * this.speed / 100; // 依據滾輪偏移量增加 target 值
        this.target = Math.max(0, Math.min(this.target, maxScroll)); // 目標不能小於 0 (避免往上滾負數)

        if (!this.isScrolling) {    // 如果沒在動才開始動畫
            this.isScrolling = true;
            requestAnimationFrame(this.animateScroll.bind(this));   // 啟動動畫
        }
    },

    // 實作了 摩擦力 的平滑滾動效果，距離越近移動越慢。
    animateScroll() {
        const delta = this.target - this.current;   // 計算還有多少距離沒移動
        this.current += delta * this.friction;      // current 以摩擦力為比例慢慢逼近 target
        window.scrollTo(0, this.current);           // 讓畫面滾動到 current 位置

        if (Math.abs(delta) > 0.5) {    // 如果距離超過 0.5 還沒到目標，就繼續滾動
            requestAnimationFrame(this.animateScroll.bind(this));
        } else {
            this.isScrolling = false;   // 否則結束動畫
        }
    },

    // 當呼叫 enable() 時，就會開始攔截滾輪事件並接管畫面的滾動
    enable() {
        if (this.active) return;    // 已啟用就不再重複啟用
        this.current = window.scrollY; // 初始化 current 位置
        this.target = window.scrollY;   // 初始化 target 位置
        window.addEventListener("wheel", this.scrollHandlerBound, { passive: false });  // 綁定滾輪事件
        window.addEventListener("scroll", this.scrollSyncHandlerBound);  // 綁定同步滾動事件
        this.active = true; // 設定狀態為啟用
    },

    // 解除滾輪與滾動條拖曳的事件接管
    disable() {
        if (!this.active) return;   // 如果本來就沒啟用，直接 return
        window.removeEventListener("wheel", this.scrollHandlerBound);   // 移除滾輪事件
        window.removeEventListener("scroll", this.scrollSyncHandlerBound);  // 移除同步事件
        this.active = false;    // 設定狀態為停用
    },

    //  初始化用
    init(options = {}) {
        this.speed = options.speed || this.speed;   // 允許自訂 speed
        this.friction = options.friction || this.friction;  // 允許自訂 friction
        this.scrollHandlerBound = this.scrollHandler.bind(this);    // 綁定 this，避免事件觸發時 this 丟失
        this.scrollSyncHandlerBound = this.scrollSyncHandler.bind(this);  // 同上
    }
};

export default SmoothScroll;