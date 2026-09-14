(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();function H(){const e=document.querySelector(".burger"),t=document.getElementById("menu");if(!e||!t)return;const a=e.querySelector(".burger__label"),i=()=>{e.setAttribute("aria-expanded","false"),t.hidden=!0,document.body.classList.remove("is-locked"),a&&(a.textContent="Меню")},s=()=>{e.setAttribute("aria-expanded","true"),t.hidden=!1,document.body.classList.add("is-locked"),a&&(a.textContent="Закрыть");const l=t.querySelector("a");l&&l.focus({preventScroll:!0})};e.addEventListener("click",()=>{e.getAttribute("aria-expanded")==="true"?i():s()}),t.addEventListener("click",l=>{l.target.closest("a")&&i()}),document.addEventListener("keydown",l=>{l.key==="Escape"&&e.getAttribute("aria-expanded")==="true"&&(i(),e.focus())}),window.matchMedia("(min-width: 961px)").addEventListener("change",l=>{l.matches&&i()}),E()}function E(){const e=[...document.querySelectorAll('.nav a[href^="#"]')],t=e.map(s=>document.querySelector(s.getAttribute("href"))).filter(Boolean);if(!t.length||!("IntersectionObserver"in window))return;const a=new Map,i=new IntersectionObserver(s=>{for(const c of s)a.set(c.target.id,c.intersectionRatio);let r=null,l=0;for(const[c,p]of a)p>l&&(l=p,r=c);for(const c of e)l>.08&&c.getAttribute("href")===`#${r}`?c.setAttribute("aria-current","true"):c.removeAttribute("aria-current")},{threshold:[0,.1,.25,.5,.75],rootMargin:"-72px 0px -35% 0px"});t.forEach(s=>i.observe(s))}const T=[{id:"hair",label:"Волосы",short:"Волосы"},{id:"hands",label:"Руки",short:"Руки"},{id:"feet",label:"Стопы",short:"Стопы"},{id:"face",label:"Брови, ресницы, лицо",short:"Лицо"}],S=[{id:"cut-women",track:"hair",title:"Женская стрижка",min:60,max:90,price:[1300,1800],priceNote:"диапазон по городским справочникам",includes:["Разбор формы и того, что с волосами сейчас","Мытьё головы","Стрижка","Укладка феном"],masters:["Алиса","Людмила","Татьяна","Эмилия","Эльвира"],branches:["lenina","akulova"]},{id:"cut-men",track:"hair",title:"Мужская стрижка",min:40,max:60,price:[500,900],priceNote:"диапазон по городским справочникам",includes:["Мытьё головы","Стрижка","Укладка"],masters:["Татьяна","Эмилия","Алексей","Андрей"],branches:["lenina","akulova"]},{id:"barber",track:"hair",title:"Барбер: стрижка и борода",min:50,max:75,price:null,includes:["Стрижка машинкой и ножницами","Оформление бороды","Укладка"],masters:["Артём","Андрей"],branches:["lenina"]},{id:"cut-kids",track:"hair",title:"Детская стрижка",min:30,max:45,price:null,includes:["Стрижка в темпе ребёнка, без спешки"],masters:["Людмила","Эмилия","Андрей"],branches:["lenina","akulova"]},{id:"color",track:"hair",title:"Окрашивание или тонирование",min:120,max:240,price:null,includes:["Подбор оттенка под состояние волос","Окрашивание","Мытьё и уход","Укладка"],masters:["Эльвира","Кристина","Алиса","Людмила"],branches:["lenina","akulova"]},{id:"blonde",track:"hair",title:"Блонд, мелирование, AirTouch",min:180,max:300,price:null,includes:["Диагностика: выдержат ли волосы осветление","Осветление","Тонирование в оттенок","Уход и укладка"],masters:["Эльвира","Алиса"],branches:["lenina","akulova"]},{id:"color-fix",track:"hair",title:"Исправление цвета и восстановление",min:180,max:300,price:null,includes:["Разбор, что произошло с волосами","План на один или несколько визитов","Смывка или коррекция цвета","Уход под результат"],masters:["Эльвира","Мария","Людмила"],branches:["lenina","akulova"]},{id:"hair-care",track:"hair",title:"Кератин, нанопластика, уход",min:90,max:150,price:null,includes:["Диагностика","Процедура","Подбор домашнего ухода"],masters:["Наталья","Эльвира"],branches:["lenina","akulova"]},{id:"biowave",track:"hair",title:"Биозавивка и био-выпрямление",min:150,max:210,price:[2500,3500],priceNote:"цена салона для мужской биозавивки",includes:["Консультация под структуру волос","Процедура","Уход под новую форму"],masters:["Наталья"],branches:["lenina"]},{id:"styling",track:"hair",title:"Укладка",min:40,max:60,price:null,includes:["Мытьё головы","Укладка под задачу — от повседневной до вечерней"],masters:["Алиса","Эльвира","Алексей"],branches:["lenina","akulova"]},{id:"manicure",track:"hands",title:"Комплекс маникюра",min:90,max:120,price:[2100,2100],promo:1575,priceNote:"в первый визит 1575 ₽ по промокоду «−25 %»",includes:["Снятие старого покрытия","Опил формы","Лёгкий ремонт ногтя","Укрепление гелем","Покрытие цветом"],masters:["Анжелика","Ольга","Екатерина","Анна","Елена","Вероника"],branches:["lenina"]},{id:"nails-ext",track:"hands",title:"Наращивание и дизайн",min:150,max:195,price:null,includes:["Форма и длина под вашу руку","Наращивание","Дизайн","Покрытие"],masters:["Анжелика","Вероника"],branches:["lenina"]},{id:"paraffin",track:"hands",title:"Парафинотерапия для рук",min:20,max:30,price:null,includes:["Тёплый парафин","Уходовый крем"],masters:["Анжелика","Ольга"],branches:["lenina"]},{id:"pedicure",track:"feet",title:"Педикюр с обработкой стопы",min:90,max:120,price:null,includes:["Полная обработка стопы","Работа с кутикулой","Форма","Покрытие","Рекомендации по уходу"],masters:["Дарья","Елена","Анжелика"],branches:["lenina"]},{id:"brows",track:"face",title:"Коррекция и окрашивание бровей",min:40,max:60,price:null,includes:["Подбор формы под лицо","Коррекция","Окрашивание в тон","Укладка"],masters:["Светлана","Ульяна"],branches:["lenina","akulova"]},{id:"brows-perm",track:"face",title:"Перманент бровей и губ",min:120,max:180,price:null,includes:["Эскиз и подбор пигмента","Процедура","Памятка по заживлению"],masters:["Ульяна"],branches:["lenina"]},{id:"lashes",track:"face",title:"Ламинирование ресниц",min:60,max:90,price:null,includes:["Состав под ваши ресницы","Ламинирование","Окрашивание"],masters:["Валерия"],branches:["lenina"]},{id:"lashes-ext",track:"face",title:"Наращивание ресниц",min:120,max:180,price:null,includes:["Подбор объёма и изгиба","Наращивание","Проверка результата вместе с вами"],masters:["Валерия"],branches:["lenina"]},{id:"depilation",track:"face",title:"Депиляция",min:20,max:60,price:[400,1200],priceNote:"цена салона, зависит от зоны",includes:["Подготовка кожи","Депиляция выбранной зоны","Успокаивающий уход"],masters:["Мастер по записи"],branches:["lenina"]},{id:"face-care",track:"face",title:"Уход за лицом и чистка",min:60,max:90,price:null,includes:["Диагностика кожи","Чистка или уходовая программа","Рекомендации для дома"],masters:["Косметолог по записи"],branches:["lenina"]}],z=Object.fromEntries(S.map(e=>[e.id,e])),A=[{id:"all-in",label:"Волосы, руки и брови",ids:["cut-women","color","manicure","brows"]},{id:"hands",label:"Руки и стопы",ids:["manicure","pedicure"]},{id:"event",label:"Перед событием",ids:["styling","brows","manicure"]},{id:"family",label:"Себе и ребёнку",ids:["cut-men","cut-kids"]},{id:"fix",label:"Спасти цвет",ids:["color-fix","hair-care"]}],g={phone:"+7 (960) 286-57-96",phoneHref:"tel:+79602865796",vkMessage:"https://vk.me/newstilevbg"},k=[{id:"lenina",role:"Большой зал",title:"Проспект Ленина, 7",sub:"цокольный этаж · ежедневно 10:00–20:00",image:"place-lenina",alt:"Кирпичная стена и неоновая вывеска «Новый стиль» в зале на Ленина, 7; в кадре — окрашивание в красный",lead:"Центр города, двадцать метров от Красной площади. Цоколь исторического дома: кирпич, открытые коммуникации под потолком, неоновая вывеска на стене. Здесь работают все направления салона и сюда приходит большинство клиентов — 266 отзывов в 2ГИС из 306.",facts:[["Услуги","Волосы, маникюр и педикюр, брови и ресницы, уход за лицом, депиляция, барбер"],["Когда удобно","Комплекс из нескольких услуг — только здесь: мастеров хватает, чтобы вести вас параллельно"],["Рядом","Красная площадь, остановки в центре, парковка по обстановке на проспекте"]],how:"Вход с проспекта Ленина, дальше вниз по лестнице в цоколь. Ступени узкие и крутые — зимой держитесь за поручень. С коляской лучше выбрать Акулова, 7.",map:"https://yandex.ru/maps/?text=Выборг,%20проспект%20Ленина,%207"},{id:"akulova",role:"Маленький зал",title:"Улица Акулова, 7",sub:"2 этаж · открывается в 10:00, по записи",image:"place-akulova",alt:"Зал на Акулова, 7: поленница, живая зелень под потолком, кресло парикмахера и зеркала",lead:"Парикмахерская на втором этаже при бане — та самая логика, «как в советские времена», только с новым ремонтом. Тише, меньше и почти без ожидания.",quote:{text:"Понравилось, что это, как и в советские времена, именно при бане — необычно, атмосферно, но еще и стильно, и современно.",meta:"2ГИС, июль 2026"},facts:[["Услуги","Стрижки, окрашивание, уход, детские стрижки, брови и ресницы"],["Запись","Предварительная: зал небольшой, свободное время уточняйте"],["Часы","В части справочников вторник указан выходным — переспросите при записи"]],how:"Второй этаж, вход через здание бани. Маникюр и педикюр — на Ленина, 7.",map:"https://yandex.ru/maps/?text=Выборг,%20улица%20Акулова,%207"}],C=[{id:"cut",label:"Стрижка",master:"Алиса",where:"Ленина, 7",date:"июнь 2026",title:"Боялась, что придётся стричься под каре",text:"Клиентка пришла с пересушенными концами и была готова потерять длину. Отстригли только непригодное и собрали каскад — длина осталась.",quote:"Стрижка получилась в 100 раз лучше, чем я себе представляла, отстригли все непригодные кончики и сделали шикарный каскад.",shots:[{image:"case-cut-before",tag:"До",alt:"Длинные тёмные волнистые волосы с пересушенными концами до стрижки"},{image:"case-cut-after",tag:"После",alt:"Каскад после стрижки: кадр в зеркале цокольного зала на Ленина, 7, побелённый кирпич и открытые коммуникации"}]},{id:"color",label:"Сложный цвет",master:"Эльвира",where:"Ленина, 7",date:"февраль 2026",title:"Выход из рыжего в русый — не за один проход",text:"Волосы были в болезненном состоянии после долгих окрашиваний. Цвет снимали смывками и только потом тонировали в натуральный русый.",quote:"Помогла мне добиться нужного оттенка, без вреда для волос.",shots:[{image:"case-color",tag:"До и после",alt:"Один кадр из отзыва: слева насыщенный рыжий цвет волос, справа ровный русый после смывок и тонирования",wide:!0}]}],O=[{image:"w-barber",label:"Мужская стрижка",where:"Ленина, 7",alt:"Мужская стрижка с удлинённой макушкой на фоне кирпичной стены с неоновой вывеской салона",span:"tall"},{image:"w-nails-pink",label:"Маникюр",master:"Анжелика",alt:"Маникюр: насыщенное розовое покрытие, миндалевидная форма"},{image:"w-blonde",label:"Окрашивание",master:"Эльвира",alt:"Светлый блонд без желтизны на прямых волосах, вид со спины"},{image:"w-nails-nude",label:"Маникюр с покрытием",master:"Ольга",alt:"Маникюр в нюдовом оттенке с аккуратной тонкой линией у кутикулы"},{image:"w-combo",label:"Стрижка, цвет и брови за один визит",where:"Акулова, 7",alt:"Клиентка в зале на Акулова, 7: поленница, живая зелень под потолком, тёплый свет",span:"tall"},{image:"w-shag",label:"Стрижка",master:"Людмила",alt:"Тёмная многослойная стрижка с чёлкой, кадр у поленницы в зале на Акулова, 7"},{image:"w-nails-blue",label:"Маникюр",master:"Екатерина",alt:"Маникюр с плотным тёмно-синим покрытием"},{image:"w-lashes",label:"Наращивание ресниц",master:"Валерия",alt:"Крупный план ресниц после наращивания",pos:"50% 28%"},{image:"w-kids",label:"Детская стрижка",where:"Ленина, 7",alt:"Детская стрижка: светлые волосы, аккуратная форма на висках",pos:"50% 22%"},{image:"w-nails-red",label:"Маникюр",master:"Дарья",alt:"Красный маникюр овальной формы"}],N=[{text:"Была сразу на трёх процедурах: бровки, окрашивание и стрижка + маникюр. Всё отлично.",meta:"Ленина, 7 · декабрь 2025"},{text:"Записалась к двум разным мастерам на маникюр и педикюр.",meta:"Ленина, 7 · июль 2025"},{text:"Мастер предложила во время окрашивания покрасить брови и ресницы. И стрижка как хотела, и цвет волос шикарный.",meta:"Акулова, 7 · ноябрь 2025"}],B={"place-lenina":[{w:660,h:827,file:"place-lenina-660.webp"},{w:1200,h:1504,file:"place-lenina-1200.webp"}],"place-akulova":[{w:520,h:693,file:"place-akulova-520.webp"},{w:960,h:1280,file:"place-akulova-960.webp"}],"case-cut-before":[{w:480,h:589,file:"case-cut-before-480.webp"},{w:900,h:1104,file:"case-cut-before-900.webp"}],"case-cut-after":[{w:480,h:589,file:"case-cut-after-480.webp"},{w:900,h:1104,file:"case-cut-after-900.webp"}],"case-color":[{w:760,h:699,file:"case-color-760.webp"},{w:1300,h:1196,file:"case-color-1300.webp"}],"w-barber":[{w:420,h:560,file:"w-barber-420.webp"},{w:820,h:1093,file:"w-barber-820.webp"}],"w-blonde":[{w:420,h:560,file:"w-blonde-420.webp"},{w:820,h:1093,file:"w-blonde-820.webp"}],"w-shag":[{w:420,h:560,file:"w-shag-420.webp"},{w:820,h:1093,file:"w-shag-820.webp"}],"w-combo":[{w:420,h:414,file:"w-combo-420.webp"},{w:820,h:809,file:"w-combo-820.webp"}],"w-lashes":[{w:420,h:560,file:"w-lashes-420.webp"},{w:820,h:1093,file:"w-lashes-820.webp"}],"w-nails-pink":[{w:420,h:560,file:"w-nails-pink-420.webp"},{w:820,h:1093,file:"w-nails-pink-820.webp"}],"w-nails-nude":[{w:420,h:560,file:"w-nails-nude-420.webp"},{w:820,h:1093,file:"w-nails-nude-820.webp"}],"w-nails-blue":[{w:420,h:560,file:"w-nails-blue-420.webp"},{w:820,h:1093,file:"w-nails-blue-820.webp"}],"w-nails-red":[{w:420,h:560,file:"w-nails-red-420.webp"},{w:820,h:1093,file:"w-nails-red-820.webp"}],"w-kids":[{w:420,h:559,file:"w-kids-420.webp"},{w:820,h:1092,file:"w-kids-820.webp"}]},j="/novyy-stil-vyborg/";function n(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function y(e,{alt:t,sizes:a="100vw",eager:i=!1,className:s,style:r}={}){const l=B[e];if(!l)return"";const c=l[l.length-1],p=l.map(w=>`${j}images/${w.file} ${w.w}w`).join(", ");return`<img
    src="${j}images/${c.file}"
    srcset="${p}"
    sizes="${n(a)}"
    width="${c.w}"
    height="${c.h}"
    alt="${n(t)}"
    ${s?`class="${n(s)}"`:""}
    ${r?`style="${n(r)}"`:""}
    loading="${i?"eager":"lazy"}"
    decoding="async"
    ${i?'fetchpriority="high"':""}
  >`}function m(e){const t=Math.floor(e/60),a=e%60;return t?a?`${t} ч ${a} мин`:`${t} ч`:`${a} мин`}function h(e){return e.toLocaleString("ru-RU").replace(/\u00a0/g," ")}function M(e,t){const a=e%10,i=e%100;return a===1&&i!==11?t[0]:a>=2&&a<=4&&(i<10||i>=20)?t[1]:t[2]}const d=new Set;let q="lenina";const P={hair:"один мастер ведёт вас по очереди",hands:"свой мастер, можно параллельно с волосами",feet:"отдельный мастер, параллельно с руками — нет",face:"быстрые услуги, встают в паузы"};function I(){const e=document.querySelector("[data-builder]");if(!e)return;const t=e.querySelector("[data-plan]"),a=e.querySelector("[data-plan-body]"),i=e.querySelector("[data-status]");R(e);const s=()=>{a.innerHTML=Q(),e.toggleAttribute("data-picked",d.size>0),document.body.classList.toggle("is-sheet",d.size>0),d.size||t.removeAttribute("data-open"),i&&(i.textContent=K())};e.addEventListener("change",r=>{const l=r.target;l.matches("[data-svc]")&&(l.checked?d.add(l.value):d.delete(l.value),s()),l.matches("[data-branch]")&&(q=l.value,s())}),e.addEventListener("click",r=>{const l=r.target.closest("[data-preset]");if(l){F(e,l.dataset.preset),s();return}const c=r.target.closest("[data-drop]");if(c){const f=c.dataset.drop;d.delete(f);const _=e.querySelector(`[data-svc][value="${f}"]`);_&&(_.checked=!1),s(),t.focus({preventScroll:!0});return}const p=r.target.closest("[data-sheet-toggle]");if(p){const f=t.hasAttribute("data-open");f?t.removeAttribute("data-open"):t.setAttribute("data-open",""),p.setAttribute("aria-expanded",String(!f));return}r.target.closest("[data-copy]")&&Y(e)}),s()}function R(e){const t=e.querySelector("[data-preset-list]");t&&(t.innerHTML=A.map(i=>`<button type="button" class="chip" data-preset="${i.id}">${n(i.label)}</button>`).join(""));const a=e.querySelector("[data-track-list]");a&&(a.innerHTML=T.map(i=>{const s=S.filter(r=>r.track===i.id);return`
        <div class="track">
          <div class="track__head">
            <span class="track__label">${n(i.label)}</span>
            <span class="track__hint">${n(P[i.id]||"")}</span>
          </div>
          <div class="chips">
            ${s.map(r=>`
              <label class="chip">
                <input type="checkbox" data-svc value="${r.id}">
                <span>${n(r.title)}</span>
                <span class="chip__dur">${r.min}–${r.max}&nbsp;мин</span>
              </label>`).join("")}
          </div>
        </div>`}).join(""))}function F(e,t){const a=A.find(s=>s.id===t);if(!a)return;const i=a.ids.length===d.size&&a.ids.every(s=>d.has(s));d.clear(),i||a.ids.forEach(s=>d.add(s)),e.querySelectorAll("[data-svc]").forEach(s=>{s.checked=d.has(s.value)}),q="lenina"}function L(){const e=[...d].map(o=>z[o]).filter(Boolean),t=T.map(o=>{const u=e.filter($=>$.track===o.id);return{...o,items:u,min:u.reduce(($,x)=>$+x.min,0),max:u.reduce(($,x)=>$+x.max,0)}}).filter(o=>o.items.length),a=t.reduce((o,u)=>o+u.min,0),i=t.reduce((o,u)=>o+u.max,0),s=Math.max(0,...t.map(o=>o.min)),r=Math.max(0,...t.map(o=>o.max)),l=e.filter(o=>o.price),c=l.reduce((o,u)=>o+u.price[0],0),p=l.reduce((o,u)=>o+u.price[1],0),w=e.find(o=>o.promo),f=e.length>0&&e.every(o=>o.branches.includes("akulova")),_=e.filter(o=>!o.branches.includes("akulova"));return{items:e,lanes:t,seqMin:a,seqMax:i,parMin:s,parMax:r,saveMax:Math.max(0,i-r),from:c,to:p,unpriced:e.length-l.length,promo:w,canAkulova:f,leninaOnly:_,branch:f?q:"lenina"}}function K(){if(!d.size)return"";const e=L(),t=e.items.length;return`В визите ${t} ${M(t,["услуга","услуги","услуг"])}, около ${m(e.parMax)} на месте.`}function Q(){if(!d.size)return U();const e=L(),t=k.find(a=>a.id===e.branch);return`
    <button class="sheet__bar" type="button" data-sheet-toggle aria-expanded="false" aria-controls="plan-scroll">
      <span class="sheet__sum">
        <b>${e.items.length} ${M(e.items.length,["услуга","услуги","услуг"])} · ${m(e.parMax)}</b>
        <span>${e.from?`ориентир от ${h(e.from)} ₽`:"цену считает мастер"}</span>
      </span>
      <span class="sheet__chev" aria-hidden="true">▾</span>
    </button>

    <div class="plan__scroll" id="plan-scroll">
      ${D(e)}
      ${G(e)}
      ${J(e)}
      ${V(e,t)}
      ${W()}
    </div>`}function U(){return`
    <div class="plan__empty">
      <p>
        Отметьте услуги — покажу, кто из мастеров это делает, что входит в работу,
        сколько времени займёт визит, если мастеров свести на одно время, и во что он примерно обойдётся.
      </p>
      <div class="plan__proof">
        <p class="where__q">Так уже приходят</p>
        ${N.map(e=>`
          <blockquote class="quote">
            <p>«${n(e.text)}»</p>
            <footer>${n(e.meta)}</footer>
          </blockquote>`).join("")}
      </div>
    </div>`}function D(e){const t=Math.max(60,Math.ceil(e.parMax/30)*30),a=Math.ceil(t/60),i=Math.max(...e.lanes.map(l=>l.max)),s=Array.from({length:a},(l,c)=>`<span class="ruler__cell" style="flex-grow:${Math.min(60,t-c*60)}">${c===0?"0":`${c} ч`}</span>`).join(""),r=e.lanes.map(l=>`
      <div class="gantt__row">
        <span class="gantt__who">${n(l.short)}</span>
        <span class="gantt__bars">
          ${l.items.map(c=>`
            <span class="gantt__seg${l.max===i?" gantt__seg--accent":""}"
                  style="--w:${(c.max/t*100).toFixed(2)}%" title="${n(c.title)}: ${c.min}–${c.max} мин">
              ${c.max/t>.16?m(c.max):""}
            </span>`).join("")}
        </span>
      </div>`).join("");return`
    <div class="ruler" aria-hidden="true">${s}</div>
    <div class="gantt">${r}</div>`}function G(e){const t=e.lanes.length>1;return`
    <div class="sums">
      ${t?`<span class="sums__row"><span>Если свести мастеров</span><b>${m(e.parMax)}</b></span>
             <span class="sums__row"><span>Одна услуга за другой</span><b>${m(e.seqMax)}</b></span>
             ${e.saveMax>=20?`<span class="sums__row sums__row--save"><span>Экономия времени</span><b>−${m(e.saveMax)}</b></span>`:""}`:`<span class="sums__row"><span>Время на месте</span><b>${m(e.parMin)}–${m(e.parMax)}</b></span>`}
      <span class="sums__row sums__row--price">
        <span>${e.from?"Ориентир по цене":"Цена"}</span>
        <b>${e.from?e.from===e.to?`${h(e.from)} ₽`:`${h(e.from)}–${h(e.to)} ₽`:"по консультации"}</b>
      </span>
      <p class="sums__note">
        ${e.unpriced?`${e.unpriced} ${M(e.unpriced,["услуга","услуги","услуг"])} в этом наборе считает мастер: расход материала зависит от длины и густоты волос. `:""}${e.promo?`В первый визит маникюр — ${h(e.promo.promo)} ₽ вместо ${h(e.promo.price[0])} ₽ по промокоду «−25 %». `:""}${t?"Параллельно идёт то, что физически можно совместить: пока держится цвет, мастер работает с руками. Точную сетку соберёт администратор.":""}
      </p>
    </div>`}function J(e){return`
    <div class="picked">
      ${e.items.map(t=>`
        <div class="picked__item">
          <p class="picked__top">
            <span class="picked__name">${n(t.title)}</span>
            <span class="picked__price">${t.price?t.price[0]===t.price[1]?`${h(t.price[0])} ₽`:`${h(t.price[0])}–${h(t.price[1])} ₽`:"по консультации"}</span>
            <button class="picked__drop" type="button" data-drop="${t.id}" aria-label="Убрать «${n(t.title)}» из визита">×</button>
          </p>
          <p class="picked__meta"><b>Входит:</b> ${n(t.includes.join(" · "))}</p>
          <p class="picked__meta"><b>Делают:</b> ${n(t.masters.slice(0,4).join(", "))}${t.masters.length>4?" и другие":""}</p>
        </div>`).join("")}
    </div>`}function V(e,t){if(!e.canAkulova){const a=e.leninaOnly.map(i=>i.title.toLowerCase()).slice(0,2).join(", ");return`
      <div class="where">
        <p class="where__q">Где это сделают</p>
        <div class="where__opts">
          <span class="where__opt" data-static>
            <span class="where__name">Проспект Ленина, 7</span>
            <span class="where__note">Цокольный этаж, ежедневно 10:00–20:00</span>
          </span>
        </div>
        <p class="where__warn">${n(a)} — только здесь, поэтому весь визит на Ленина, 7.</p>
      </div>`}return`
    <div class="where">
      <p class="where__q">Где вам удобнее</p>
      <div class="where__opts">
        ${k.map(a=>`
          <label class="where__opt">
            <input type="radio" name="branch" data-branch value="${a.id}" ${a.id===t.id?"checked":""}>
            <span class="where__name">${n(a.title)}</span>
            <span class="where__note">${n(a.sub)}</span>
          </label>`).join("")}
      </div>
    </div>`}function W(e,t){return`
    <div class="acts">
      <button class="btn btn--solid" type="button" data-copy>Скопировать состав визита</button>
      <a class="btn" href="${g.phoneHref}">Позвонить: ${n(g.phone)}</a>
      <a class="btn" href="${g.vkMessage}" target="_blank" rel="noopener">Открыть сообщения салона</a>
      <span class="acts__said" data-said role="status"></span>
    </div>`}function X(){const e=L(),a=[`Здравствуйте! Хочу записаться в «Новый стиль», ${k.find(i=>i.id===e.branch).title}.`,`Услуги: ${e.items.map(i=>i.title.toLowerCase()).join("; ")}.`];return e.lanes.length>1?a.push(`Если мастеров можно свести на одно время — это около ${m(e.parMax)} вместо ${m(e.seqMax)} по очереди.`):a.push(`По времени — примерно ${m(e.parMax)}.`),e.from&&a.push(`Ориентир по цене с сайта: ${e.from===e.to?`${h(e.from)} ₽`:`от ${h(e.from)} ₽`}${e.unpriced?" плюс услуги, которые считает мастер":""}.`),a.push("Удобное время: "),a.join(`
`)}async function Y(e){var i;const t=e.querySelector("[data-said]"),a=X();try{await navigator.clipboard.writeText(a),t&&(t.textContent="Скопировано — вставьте в сообщение салону")}catch{const s=document.createElement("textarea");s.value=a,s.setAttribute("readonly",""),s.style.cssText="position:fixed;top:0;left:0;opacity:0",document.body.append(s),s.select();const r=(i=document.execCommand)==null?void 0:i.call(document,"copy");s.remove(),t&&(t.textContent=r?"Скопировано":"Не получилось скопировать — позвоните нам")}t&&setTimeout(()=>t.textContent="",4e3)}const Z=[{id:"hair",title:"Волосы",count:"чаще всего в отзывах",people:[{name:"Алиса",skill:"Стрижка и окрашивание",note:"Владелица салона, к ней приезжают из других городов"},{name:"Людмила",skill:"Стрижки, работа с детьми",note:"Акулова, 7 — «волшебник с ножницами и ангел с терпением»"},{name:"Татьяна",skill:"Мужские и женские стрижки",note:"К ней ходят одной и той же семьёй годами"},{name:"Наталья",skill:"Тонкие и редкие волосы, уход"},{name:"Эльвира",skill:"Окрашивание, блонд, выход из сложного цвета"},{name:"Эмилия",skill:"Стрижки — женские, мужские, детские"},{name:"Мария",skill:"Восстановление после неудачной химии"},{name:"Кристина",skill:"Колорист, советы по домашнему уходу"},{name:"Алексей",skill:"Стрижки и укладки"},{name:"Артём",skill:"Барбер"},{name:"Андрей",skill:"Барбер, детские мужские стрижки"}]},{id:"nails",title:"Руки и стопы",count:"только на Ленина, 7",people:[{name:"Анжелика",skill:"Маникюр, форма и длина, ремонт ногтя"},{name:"Ольга",skill:"Маникюр с покрытием"},{name:"Екатерина",skill:"Маникюр, плотное однотонное покрытие"},{name:"Дарья",skill:"Маникюр и педикюр"},{name:"Елена",skill:"Маникюр и педикюр"},{name:"Анна",skill:"Маникюр — быстро и аккуратно"},{name:"Вероника",skill:"Маникюр и дизайн"},{name:"Оксана",skill:"Маникюр"}]},{id:"face",title:"Брови, ресницы, лицо",count:"записываются отдельно",people:[{name:"Светлана",skill:"Бровист — оформление и окрашивание"},{name:"Ульяна",skill:"Перманент бровей, перекрытие старого пигмента"},{name:"Валерия",skill:"Наращивание и ламинирование ресниц"}]}],v={source:{text:"История салона, опубликованная Центром поддержки предпринимательства Выборга",href:"https://vyborg.813.ru/istorii-uspekha/-roman-mazov-salon-krasoty-novyy-stil/",who:"Роман Мазов, управляющий, и Алиса — владелица салона"},quote:"Это было помещение бывшего бара «Афанасий», непроходная улица с ужасно узким спуском… Мы перекупили бизнес, взяли миллионный кредит, сделали ремонт.",steps:[{k:"Начало",v:"Алиса арендовала кресло в парикмахерской и осталась без места, когда этаж сдали поставщику. Свой салон начался с помещения, где до этого не шли дела."},{k:"Кто платит за риск",v:"Миллионный кредит, ремонт, работа в минус. Роман тогда был сварщиком на судостроительном и ушёл в декрет с дочкой, чтобы салон не закрылся."},{k:"Сегодня",v:"Два зала в Выборге, мастера по волосам, ногтям, бровям и ресницам. Алиса продолжает стоять у кресла и ведёт школу парикмахеров по тому же адресу."}]},ee=[{t:"Гарантия 10 дней",d:"Если в течение десяти дней с покрытием что-то случилось — ремонт бесплатно."},{t:"Инструмент",d:"Медицинская стерилизация и ультразвуковая обработка — не «чистим салфеткой», а полный цикл."},{t:"Материалы",d:"Сертифицированные составы и уход, который можно забрать домой после процедуры."},{t:"Первый маникюр",d:"Скидка 25 % по промокоду «−25 %». Сказать о нём нужно до начала работы."}],te=[{t:"Вход на Ленина, 7 — крутой спуск",d:"Салон в цоколе, ступени вниз узкие. В отзывах о них предупреждают отдельно: зимой держитесь за поручень, с коляской удобнее на Акулова, 7."},{t:"Коммуникации на виду",d:"Цоколь исторического дома: трубы под потолком не спрятаны в гипсокартон. Кому-то это лофт, кому-то подвал — лучше знать заранее."},{t:"Комплекс занимает время",d:"Четыре услуги подряд — это полдня. Поэтому мастеров стараются поставить параллельно, а не в очередь."}];function ae(){b("[data-story]",se()),b("[data-promises]",ne()),b("[data-honest]",ie()),b("[data-crews]",le()),b("[data-cases]",re()),b("[data-tiles]",ce()),b("[data-places]",oe())}function b(e,t){const a=document.querySelector(e);a&&(a.innerHTML=t)}function se(){return`
    <blockquote class="pull">
      <p>«${n(v.quote)}»</p>
      <footer>
        ${n(v.source.who)}.
        <a href="${v.source.href}" target="_blank" rel="noopener">${n(v.source.text)}</a>
      </footer>
    </blockquote>
    <dl class="ladder">
      ${v.steps.map(e=>`<div><dt>${n(e.k)}</dt><dd>${n(e.v)}</dd></div>`).join("")}
    </dl>`}function ne(){return`
    <h3>Что салон обещает</h3>
    <dl class="facts">
      ${ee.map(e=>`<div><dt>${n(e.t)}</dt><dd>${n(e.d)}</dd></div>`).join("")}
    </dl>`}function ie(){return`
    <h3>О чём честно предупредить</h3>
    <dl class="facts facts--muted">
      ${te.map(e=>`<div><dt>${n(e.t)}</dt><dd>${n(e.d)}</dd></div>`).join("")}
    </dl>`}function le(){return Z.map(e=>`
      <div class="crew">
        <h3 class="crew__title">${n(e.title)} <span>${n(e.count)}</span></h3>
        ${e.people.map(t=>`
          <div class="crew__row">
            <span class="crew__name">${n(t.name)}</span>
            <span class="crew__skill"
              >${n(t.skill)}${t.note?` <span class="crew__note">${n(t.note)}</span>`:""}</span
            >
          </div>`).join("")}
      </div>`).join("")}function re(){return C.map(e=>`
      <figure class="case${e.shots.length===1?" case--single":""}">
        <div class="case__shots">
          ${e.shots.map(t=>`
            <span class="shot">
              ${y(t.image,{alt:t.alt,sizes:t.wide?"(max-width: 900px) 92vw, 46vw":"(max-width: 900px) 46vw, 23vw"})}
              <i class="shot__tag">${n(t.tag)}</i>
            </span>`).join("")}
        </div>
        <figcaption>
          <p class="case__label">
            ${n(e.label)} · <b>${n(e.master)}</b> · ${n(e.where)} · ${n(e.date)}
          </p>
          <h3 class="case__title">${n(e.title)}</h3>
          <p class="case__text">${n(e.text)}</p>
          <blockquote class="case__quote"><p>«${n(e.quote)}»</p></blockquote>
        </figcaption>
      </figure>`).join("")}function ce(){return O.map(e=>`
      <figure class="tile${e.span==="tall"?" tile--tall":""}">
        ${y(e.image,{alt:e.alt,sizes:"(max-width: 620px) 50vw, (max-width: 900px) 46vw, 24vw",style:e.pos?`object-position:${e.pos}`:""})}
        <figcaption class="tile__cap">
          <b>${n(e.label)}</b>
          <span>${n(e.master||e.where||"")}</span>
        </figcaption>
      </figure>`).join("")}function oe(){return k.map((e,t)=>`
      <article class="place ${t===0?"place--main":"place--small"}" id="place-${e.id}">
        <div class="place__media">
          ${y(e.image,{alt:e.alt,sizes:t===0?"(max-width: 900px) 92vw, 46vw":"(max-width: 900px) 70vw, 34vw"})}
        </div>
        <div class="place__body">
          <p class="place__role">${n(e.role)}</p>
          <h3 class="place__title">${n(e.title)}<small>${n(e.sub)}</small></h3>
          <p class="place__lead">${n(e.lead)}</p>
          ${e.quote?`<blockquote class="quote quote--place">
                   <p>«${n(e.quote.text)}»</p>
                   <footer>${n(e.quote.meta)}</footer>
                 </blockquote>`:""}
          <dl class="place__facts">
            ${e.facts.map(([a,i])=>`<div><dt>${n(a)}</dt><dd>${n(i)}</dd></div>`).join("")}
          </dl>
          <p class="place__how">${n(e.how)}</p>
          <div class="place__links">
            <a href="${e.map}" target="_blank" rel="noopener">Посмотреть на карте</a>
            <a href="${g.phoneHref}">Позвонить и записаться</a>
          </div>
        </div>
      </article>`).join("")}ae();I();H();
