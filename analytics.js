/* 官網流量統計（GoatCounter）

   ENDPOINT 留空時這支什麼都不做，也不會去載外部腳本——
   帳號還沒開之前放著不會壞，開好之後把 count 網址填進來就生效，
   六個頁面都已經引用了這支，不必再改 HTML。

   申請：https://www.goatcounter.com/ 註冊一個 code（例如 betewo），
   然後把下面這行改成 "https://betewo.goatcounter.com/count"。

   記錄的東西：頁面瀏覽、以及帶 data-cg 的按鈕點擊（加好友、開啟 App、方案卡）。
   沒有 cookie、不記 IP，所以隱私權政策不必加 cookie 同意。
   有了「加好友按鈕被點幾次」才能跟 LINE 的實際加好友人數對照，
   知道官網到註冊之間掉了多少人（GROWTH.md 的漏斗最上面兩關）。 */
(function () {
  "use strict";

  var ENDPOINT = "";
  if (!ENDPOINT) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", ENDPOINT);
  document.head.appendChild(s);

  // 用捕獲階段：連結點下去就開始導頁，冒泡有時來不及。
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("[data-cg]") : null;
    if (!el) return;
    var name = el.getAttribute("data-cg");
    if (!name) return;
    // count.js 還沒載完就放棄這一筆，不排隊也不重試：
    // 統計掉一筆不影響判斷，卡住使用者的點擊才是問題。
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: "cta/" + name, title: "CTA " + name, event: true });
    }
  }, true);
})();
