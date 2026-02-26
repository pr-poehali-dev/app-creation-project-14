import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "calculator" | "catalog" | "projects" | "visualization" | "reports" | "templates" | "profile";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "calculator", label: "Калькулятор", icon: "Calculator" },
  { id: "catalog", label: "Справочник", icon: "BookOpen" },
  { id: "projects", label: "Проекты", icon: "FolderOpen" },
  { id: "visualization", label: "Визуализация", icon: "BarChart3" },
  { id: "reports", label: "Отчёты", icon: "FileText" },
  { id: "templates", label: "Шаблоны", icon: "LayoutTemplate" },
  { id: "profile", label: "Профиль", icon: "User" },
];

const REGIONS = ["Москва и МО", "Санкт-Петербург", "Краснодарский край", "Новосибирская обл.", "Свердловская обл.", "Татарстан", "Ростовская обл."];

const WORK_STAGES = [
  {
    id: "foundation",
    name: "Фундамент",
    color: "from-amber-500 to-orange-600",
    icon: "Layers",
    items: [
      { name: "Буронабивные сваи", unit: "шт", price: 3500, qty: 0 },
      { name: "Ростверк монолитный", unit: "м.п.", price: 2800, qty: 0 },
      { name: "Гидроизоляция фундамента", unit: "м²", price: 450, qty: 0 },
      { name: "Обратная засыпка", unit: "м³", price: 1200, qty: 0 },
    ],
  },
  {
    id: "frame",
    name: "Каркас",
    color: "from-cyan-500 to-blue-600",
    icon: "Grid3x3",
    items: [
      { name: "Нижняя обвязка 150×150", unit: "м.п.", price: 1850, qty: 0 },
      { name: "Стойки каркаса 150×50", unit: "м.п.", price: 680, qty: 0 },
      { name: "Верхняя обвязка 150×50", unit: "м.п.", price: 720, qty: 0 },
      { name: "Укосины 50×150", unit: "м.п.", price: 580, qty: 0 },
      { name: "Монтаж каркаса (работа)", unit: "м²", price: 1200, qty: 0 },
    ],
  },
  {
    id: "roof",
    name: "Кровля",
    color: "from-violet-500 to-purple-600",
    icon: "Home",
    items: [
      { name: "Стропила 50×200", unit: "м.п.", price: 920, qty: 0 },
      { name: "Обрешётка 25×100", unit: "м²", price: 380, qty: 0 },
      { name: "Металлочерепица", unit: "м²", price: 750, qty: 0 },
      { name: "Гидроизоляция кровли", unit: "м²", price: 180, qty: 0 },
      { name: "Монтаж кровли (работа)", unit: "м²", price: 850, qty: 0 },
    ],
  },
  {
    id: "insulation",
    name: "Утепление",
    color: "from-green-500 to-emerald-600",
    icon: "Wind",
    items: [
      { name: "Базальтовая вата 150мм", unit: "м²", price: 680, qty: 0 },
      { name: "Пароизоляция", unit: "м²", price: 95, qty: 0 },
      { name: "Ветрозащита", unit: "м²", price: 85, qty: 0 },
      { name: "Монтаж утепления (работа)", unit: "м²", price: 450, qty: 0 },
    ],
  },
  {
    id: "exterior",
    name: "Внешняя отделка",
    color: "from-rose-500 to-pink-600",
    icon: "PanelTop",
    items: [
      { name: "Имитация бруса", unit: "м²", price: 920, qty: 0 },
      { name: "Сайдинг виниловый", unit: "м²", price: 580, qty: 0 },
      { name: "Монтаж отделки (работа)", unit: "м²", price: 650, qty: 0 },
    ],
  },
  {
    id: "interior",
    name: "Внутренняя отделка",
    color: "from-orange-400 to-amber-600",
    icon: "PaintBucket",
    items: [
      { name: "ОСП 9мм (стены)", unit: "м²", price: 420, qty: 0 },
      { name: "ОСП 22мм (пол)", unit: "м²", price: 680, qty: 0 },
      { name: "Гипсокартон", unit: "м²", price: 380, qty: 0 },
      { name: "Шпатлёвка финишная", unit: "м²", price: 320, qty: 0 },
      { name: "Монтаж отделки (работа)", unit: "м²", price: 750, qty: 0 },
    ],
  },
];

const CATALOG_ITEMS = [
  { id: 1, category: "Материалы", name: "Доска 50×150×6000", unit: "м.п.", price: 85, supplier: "ЛесМаш", stock: true },
  { id: 2, category: "Материалы", name: "Базальтовая вата Rockwool 150мм", unit: "м²", price: 680, supplier: "ТехноНиколь", stock: true },
  { id: 3, category: "Материалы", name: "Металлочерепица Монтеррей", unit: "м²", price: 750, supplier: "Металлтрейд", stock: true },
  { id: 4, category: "Материалы", name: "ОСП-3 (9мм)", unit: "лист", price: 1250, supplier: "КДЛ", stock: false },
  { id: 5, category: "Работы", name: "Монтаж каркаса", unit: "м²", price: 1200, supplier: "Бригада А", stock: true },
  { id: 6, category: "Работы", name: "Монтаж кровли", unit: "м²", price: 850, supplier: "Бригада Б", stock: true },
  { id: 7, category: "Работы", name: "Утепление стен", unit: "м²", price: 450, supplier: "Бригада А", stock: true },
  { id: 8, category: "Оборудование", name: "Котёл газовый Baxi", unit: "шт", price: 48000, supplier: "ТеплоМастер", stock: true },
];

const PROJECTS = [
  { id: 1, name: "Дом 150м² в Подмосковье", status: "active", date: "15 фев 2026", total: 4850000, progress: 65 },
  { id: 2, name: "Дача 80м² Ленинградская обл.", status: "draft", date: "10 фев 2026", total: 2100000, progress: 30 },
  { id: 3, name: "Коттедж 200м² Краснодар", status: "completed", date: "28 янв 2026", total: 7200000, progress: 100 },
  { id: 4, name: "Баня 40м² Тверская обл.", status: "active", date: "20 фев 2026", total: 980000, progress: 45 },
];

type Stage = typeof WORK_STAGES[0];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("calculator");
  const [activeStage, setActiveStage] = useState("foundation");
  const [region, setRegion] = useState("Москва и МО");
  const [houseArea, setHouseArea] = useState(120);
  const [floors, setFloors] = useState(1);
  const [stages, setStages] = useState<Stage[]>(WORK_STAGES);
  const [catalogItems, setCatalogItems] = useState(CATALOG_ITEMS);
  const [catalogFilter, setCatalogFilter] = useState("Все");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ category: "Материалы", name: "", unit: "м²", price: 0 });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const updateQty = (stageId: string, itemIndex: number, delta: number) => {
    setStages(prev => prev.map(s =>
      s.id === stageId ? {
        ...s,
        items: s.items.map((item, i) =>
          i === itemIndex ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
      } : s
    ));
  };

  const setQty = (stageId: string, itemIndex: number, val: number) => {
    setStages(prev => prev.map(s =>
      s.id === stageId ? {
        ...s,
        items: s.items.map((item, i) =>
          i === itemIndex ? { ...item, qty: Math.max(0, val) } : item
        )
      } : s
    ));
  };

  const totalByStage = (stageId: string) => {
    const s = stages.find(st => st.id === stageId);
    return s ? s.items.reduce((acc, item) => acc + item.qty * item.price, 0) : 0;
  };

  const grandTotal = stages.reduce((acc, s) => acc + s.items.reduce((a, i) => a + i.qty * i.price, 0), 0);

  const formatMoney = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  const saveDraft = () => {
    localStorage.setItem("smeta_draft", JSON.stringify({ stages, region, houseArea, floors }));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  const loadDraft = () => {
    const raw = localStorage.getItem("smeta_draft");
    if (raw) {
      const data = JSON.parse(raw);
      setStages(data.stages);
      setRegion(data.region);
      setHouseArea(data.houseArea);
      setFloors(data.floors);
    }
  };

  const filteredCatalog = catalogItems.filter(item => {
    const byCategory = catalogFilter === "Все" || item.category === catalogFilter;
    const bySearch = item.name.toLowerCase().includes(catalogSearch.toLowerCase());
    return byCategory && bySearch;
  });

  const addCatalogItem = () => {
    if (!newItem.name) return;
    setCatalogItems(prev => [...prev, { id: Date.now(), ...newItem, supplier: "Пользователь", stock: true }]);
    setNewItem({ category: "Материалы", name: "", unit: "м²", price: 0 });
    setShowAddModal(false);
  };

  const currentStage = stages.find(s => s.id === activeStage)!;

  return (
    <div className="flex h-screen bg-[#0f0f14] text-white overflow-hidden font-sans">
      {/* Боковая панель */}
      <aside className={`flex flex-col transition-all duration-300 ease-in-out border-r border-white/5 bg-[#13131a] relative ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        {/* Логотип */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
            <Icon name="Home" size={18} className="text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="animate-fade-in">
              <div className="font-display font-bold text-lg leading-none tracking-wide">СМЕТА<span className="text-orange-400">ПРО</span></div>
              <div className="text-[10px] text-white/40 mt-0.5">Каркасное строительство</div>
            </div>
          )}
        </div>

        {/* Навигация */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                style={{ animationDelay: `${idx * 40}ms` }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 animate-fade-in group relative ${isActive
                  ? "bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/20"
                  : "text-white/50 hover:text-white/90 hover:bg-white/5"
                }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-orange-400 rounded-r-full" />}
                <Icon name={item.icon} size={18} className={isActive ? "text-orange-400" : "text-white/40 group-hover:text-white/70"} />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Черновик */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-white/5 space-y-2">
            <button onClick={saveDraft} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90 text-sm transition-all">
              <Icon name="Save" size={15} />
              <span>{draftSaved ? "Сохранено!" : "Сохранить черновик"}</span>
            </button>
            <button onClick={loadDraft} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90 text-sm transition-all">
              <Icon name="FolderOpen" size={15} />
              <span>Загрузить черновик</span>
            </button>
          </div>
        )}

        {/* Свернуть */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#1e1e28] border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 transition-all z-10"
        >
          <Icon name={sidebarCollapsed ? "ChevronRight" : "ChevronLeft"} size={12} />
        </button>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Топ-бар */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#13131a]/50 backdrop-blur-xl">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-wide">
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </h1>
            <div className="text-xs text-white/30 mt-0.5">Каркасные дома · Профессиональная смета</div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="bg-white/5 border border-white/10 text-white/70 text-sm rounded-xl px-3 py-2 outline-none hover:border-orange-500/40 transition-colors"
            >
              {REGIONS.map(r => <option key={r} value={r} className="bg-[#1a1a24]">{r}</option>)}
            </select>
            <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500/40 transition-all">
              <Icon name="Bell" size={16} className="text-white/50" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
              А
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">

          {/* ═══ КАЛЬКУЛЯТОР ═══ */}
          {activeSection === "calculator" && (
            <div className="flex h-full">
              <div className="w-72 border-r border-white/5 p-4 space-y-2 overflow-y-auto flex-shrink-0">
                <div className="text-xs text-white/30 uppercase tracking-widest mb-3 px-1">Этапы строительства</div>

                <div className="bg-white/3 border border-white/8 rounded-2xl p-4 mb-4">
                  <div className="text-xs text-white/40 mb-3 font-medium">Параметры дома</div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-white/30 block mb-1">Площадь, м²</label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setHouseArea(a => Math.max(40, a - 10))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-orange-500/20 text-white/60 hover:text-orange-400 transition-all text-sm font-bold">-</button>
                        <span className="flex-1 text-center font-display font-semibold text-lg">{houseArea}</span>
                        <button onClick={() => setHouseArea(a => a + 10)} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-orange-500/20 text-white/60 hover:text-orange-400 transition-all text-sm font-bold">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-white/30 block mb-1">Этажей</label>
                      <div className="flex gap-2">
                        {[1, 2, 3].map(n => (
                          <button key={n} onClick={() => setFloors(n)} className={`flex-1 py-1.5 rounded-lg text-sm font-semibold transition-all ${floors === n ? "bg-orange-500 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}>{n}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {stages.map((stage, idx) => {
                  const stageTotal = totalByStage(stage.id);
                  const isActive = activeStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setActiveStage(stage.id)}
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className={`w-full text-left rounded-2xl p-3 transition-all duration-200 animate-fade-in border ${isActive ? "bg-gradient-to-r from-white/8 to-white/3 border-white/15" : "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/5"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon name={stage.icon} size={14} className="text-white" fallback="Layers" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white/90">{stage.name}</div>
                          {stageTotal > 0 && <div className="text-xs text-orange-400 font-semibold">{formatMoney(stageTotal)}</div>}
                        </div>
                        {isActive && <Icon name="ChevronRight" size={14} className="text-orange-400 flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}

                <div className="bg-gradient-to-br from-orange-500/15 to-amber-500/5 border border-orange-500/20 rounded-2xl p-4 mt-4">
                  <div className="text-xs text-orange-400/70 uppercase tracking-wider mb-1">Итого по смете</div>
                  <div className="font-display text-2xl font-bold text-orange-400">{formatMoney(grandTotal)}</div>
                  <div className="text-xs text-white/30 mt-1">{region}</div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentStage.color} flex items-center justify-center shadow-lg`}>
                    <Icon name={currentStage.icon} size={22} className="text-white" fallback="Layers" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{currentStage.name}</h2>
                    <div className="text-sm text-white/40">{currentStage.items.length} позиций · {formatMoney(totalByStage(currentStage.id))}</div>
                  </div>
                  <div className="ml-auto">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-white/60 hover:text-white/90 transition-all border border-white/8">
                      <Icon name="Plus" size={15} />
                      Добавить позицию
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentStage.items.map((item, idx) => (
                    <div key={idx} style={{ animationDelay: `${idx * 60}ms` }} className="animate-fade-in bg-white/3 border border-white/8 hover:border-white/15 rounded-2xl p-4 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="font-medium text-white/90">{item.name}</div>
                          <div className="text-sm text-white/40 mt-0.5">{formatMoney(item.price)} / {item.unit}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(currentStage.id, idx, -1)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/50 transition-all text-lg font-bold flex items-center justify-center">−</button>
                          <input
                            type="number"
                            value={item.qty}
                            onChange={e => setQty(currentStage.id, idx, Number(e.target.value))}
                            className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-center text-sm font-semibold outline-none focus:border-orange-500/40 transition-colors"
                          />
                          <div className="text-xs text-white/30 w-8">{item.unit}</div>
                          <button onClick={() => updateQty(currentStage.id, idx, 1)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-green-500/20 hover:text-green-400 text-white/50 transition-all text-lg font-bold flex items-center justify-center">+</button>
                        </div>
                        <div className="w-32 text-right">
                          {item.qty > 0
                            ? <div className="font-display font-semibold text-orange-400 text-lg">{formatMoney(item.qty * item.price)}</div>
                            : <div className="text-white/20 text-sm">—</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-8">
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-orange-500/25">
                    <Icon name="FileDown" size={16} />
                    Экспорт PDF
                  </button>
                  <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600/20 border border-green-500/20 text-green-400 font-semibold text-sm hover:bg-green-600/30 transition-all">
                    <Icon name="Table" size={16} />
                    Экспорт Excel
                  </button>
                  <button onClick={saveDraft} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-semibold text-sm hover:bg-white/10 transition-all ml-auto">
                    <Icon name="Save" size={16} />
                    {draftSaved ? "Сохранено!" : "Сохранить черновик"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══ СПРАВОЧНИК ═══ */}
          {activeSection === "catalog" && (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    value={catalogSearch}
                    onChange={e => setCatalogSearch(e.target.value)}
                    placeholder="Поиск по названию..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-orange-500/40 transition-colors placeholder:text-white/20"
                  />
                </div>
                {["Все", "Материалы", "Работы", "Оборудование"].map(cat => (
                  <button key={cat} onClick={() => setCatalogFilter(cat)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${catalogFilter === cat ? "bg-orange-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"}`}>{cat}</button>
                ))}
                <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20">
                  <Icon name="Plus" size={15} />
                  Добавить
                </button>
              </div>

              <div className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b border-white/5 text-xs text-white/30 uppercase tracking-wider">
                  <div className="col-span-2">Наименование</div>
                  <div>Категория</div>
                  <div>Ед. изм.</div>
                  <div>Цена, ₽</div>
                  <div>Действия</div>
                </div>
                {filteredCatalog.map((item, idx) => (
                  <div key={item.id} style={{ animationDelay: `${idx * 30}ms` }} className="animate-fade-in grid grid-cols-6 gap-4 px-5 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors items-center group">
                    <div className="col-span-2">
                      <div className="font-medium text-white/90 text-sm">{item.name}</div>
                      <div className="text-xs text-white/30 mt-0.5">
                        {item.supplier} · {item.stock ? <span className="text-green-400">В наличии</span> : <span className="text-red-400">Нет в наличии</span>}
                      </div>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${item.category === "Материалы" ? "bg-cyan-500/15 text-cyan-400" : item.category === "Работы" ? "bg-violet-500/15 text-violet-400" : "bg-amber-500/15 text-amber-400"}`}>{item.category}</span>
                    </div>
                    <div className="text-white/50 text-sm">{item.unit}</div>
                    <div className="font-display font-semibold text-white/90">{item.price.toLocaleString("ru-RU")}</div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-white/40 transition-all flex items-center justify-center">
                        <Icon name="Pencil" size={12} />
                      </button>
                      <button onClick={() => setCatalogItems(prev => prev.filter(i => i.id !== item.id))} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 transition-all flex items-center justify-center">
                        <Icon name="Trash2" size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
                  <div className="bg-[#1a1a24] border border-white/10 rounded-3xl p-6 w-[440px] animate-scale-in shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display font-semibold text-xl">Новая позиция</h3>
                      <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white/80 transition-all">
                        <Icon name="X" size={15} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-white/40 mb-1.5 block">Категория</label>
                        <select value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500/40">
                          <option className="bg-[#1a1a24]">Материалы</option>
                          <option className="bg-[#1a1a24]">Работы</option>
                          <option className="bg-[#1a1a24]">Оборудование</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/40 mb-1.5 block">Наименование</label>
                        <input value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} placeholder="Введите название..." className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500/40 placeholder:text-white/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-white/40 mb-1.5 block">Единица</label>
                          <input value={newItem.unit} onChange={e => setNewItem(p => ({ ...p, unit: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500/40" />
                        </div>
                        <div>
                          <label className="text-xs text-white/40 mb-1.5 block">Цена, ₽</label>
                          <input type="number" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: Number(e.target.value) }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500/40" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 rounded-xl bg-white/5 text-white/50 hover:bg-white/10 text-sm font-medium transition-all">Отмена</button>
                      <button onClick={addCatalogItem} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:opacity-90 transition-all">Добавить</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ ПРОЕКТЫ ═══ */}
          {activeSection === "projects" && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                  {["Все", "Активные", "Черновики", "Завершённые"].map((f, i) => (
                    <button key={f} className={`px-4 py-2 rounded-xl text-sm transition-all ${i === 0 ? "bg-orange-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"}`}>{f}</button>
                  ))}
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-orange-500/20">
                  <Icon name="Plus" size={15} />
                  Новый проект
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {PROJECTS.map((project, idx) => (
                  <div key={project.id} style={{ animationDelay: `${idx * 80}ms` }} className="animate-fade-in bg-white/3 border border-white/8 hover:border-white/15 rounded-2xl p-5 transition-all group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white/90 text-base mb-1">{project.name}</h3>
                        <div className="text-xs text-white/30">{project.date}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${project.status === "active" ? "bg-green-500/15 text-green-400" : project.status === "draft" ? "bg-amber-500/15 text-amber-400" : "bg-blue-500/15 text-blue-400"}`}>
                        {project.status === "active" ? "Активный" : project.status === "draft" ? "Черновик" : "Завершён"}
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-white/30 mb-1.5">
                        <span>Готовность сметы</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-700" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-xl text-orange-400">{formatMoney(project.total)}</div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-400 text-white/40 transition-all flex items-center justify-center"><Icon name="Pencil" size={14} /></button>
                        <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-white/40 transition-all flex items-center justify-center"><Icon name="Copy" size={14} /></button>
                        <button className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 transition-all flex items-center justify-center"><Icon name="Trash2" size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ ВИЗУАЛИЗАЦИЯ ═══ */}
          {activeSection === "visualization" && (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Общая сумма", value: formatMoney(grandTotal), icon: "Wallet", color: "from-orange-500 to-amber-500", sub: "По текущей смете" },
                  { label: "Материалы", value: "68%", icon: "Package", color: "from-cyan-500 to-blue-500", sub: formatMoney(Math.round(grandTotal * 0.68)) },
                  { label: "Работы", value: "32%", icon: "Wrench", color: "from-violet-500 to-purple-500", sub: formatMoney(Math.round(grandTotal * 0.32)) },
                ].map((card, idx) => (
                  <div key={idx} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in bg-white/3 border border-white/8 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                        <Icon name={card.icon} size={16} className="text-white" fallback="BarChart3" />
                      </div>
                      <div className="text-sm text-white/40">{card.label}</div>
                    </div>
                    <div className="font-display font-bold text-2xl text-white/90">{card.value}</div>
                    <div className="text-xs text-white/30 mt-1">{card.sub}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                <h3 className="font-display font-semibold mb-5 text-lg">Распределение по этапам</h3>
                <div className="space-y-3">
                  {stages.map((stage, idx) => {
                    const total = totalByStage(stage.id);
                    const pct = grandTotal > 0 ? Math.round(total / grandTotal * 100) : 0;
                    return (
                      <div key={stage.id} style={{ animationDelay: `${idx * 60}ms` }} className="animate-fade-in">
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-white/70">{stage.name}</span>
                          <span className="text-white/50">{total > 0 ? formatMoney(total) : "—"} <span className="text-white/30 ml-1">{pct}%</span></span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${stage.color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {grandTotal === 0 && <div className="text-center text-white/20 py-8 text-sm">Заполните калькулятор, чтобы увидеть диаграмму</div>}
              </div>
            </div>
          )}

          {/* ═══ ОТЧЁТЫ ═══ */}
          {activeSection === "reports" && (
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: "Полная смета PDF", desc: "Все этапы, материалы и работы с ценами", icon: "FileText", color: "from-red-500 to-rose-600" },
                  { title: "Таблица Excel", desc: "Редактируемая таблица для согласования", icon: "Table", color: "from-green-500 to-emerald-600" },
                  { title: "Сводный отчёт", desc: "Краткая выжимка по ключевым показателям", icon: "BarChart2", color: "from-blue-500 to-cyan-600" },
                  { title: "По этапам", desc: "Детализация по каждому этапу строительства", icon: "Layers", color: "from-violet-500 to-purple-600" },
                  { title: "Сравнение регионов", desc: "Анализ стоимости в разных регионах", icon: "Map", color: "from-amber-500 to-orange-600" },
                  { title: "Коммерческое предложение", desc: "Готовый документ для заказчика", icon: "FileCheck", color: "from-teal-500 to-cyan-600" },
                ].map((report, idx) => (
                  <div key={idx} style={{ animationDelay: `${idx * 70}ms` }} className="animate-fade-in bg-white/3 border border-white/8 hover:border-white/15 rounded-2xl p-5 cursor-pointer transition-all group">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${report.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon name={report.icon} size={20} className="text-white" fallback="FileText" />
                    </div>
                    <h3 className="font-semibold text-white/90 mb-1">{report.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed mb-4">{report.desc}</p>
                    <button className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors">
                      <Icon name="Download" size={12} />
                      Скачать
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ ШАБЛОНЫ ═══ */}
          {activeSection === "templates" && (
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Map" size={18} className="text-orange-400" />
                    Региональные коэффициенты
                  </h3>
                  <div className="space-y-2">
                    {REGIONS.slice(0, 5).map((r, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5">
                        <span className="text-sm text-white/70">{r}</span>
                        <span className={`text-sm font-semibold ${idx === 0 ? "text-orange-400" : "text-white/50"}`}>×{(1 + idx * 0.05).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                  <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Icon name="BookMarked" size={18} className="text-cyan-400" />
                    Нормативы и стандарты
                  </h3>
                  <div className="space-y-2">
                    {["ГОСТ Р 57208-2016", "СНиП 3.03.01-87", "СП 20.13330.2022", "ГОСТ 8486-86", "СНиП II-23-81"].map((std, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5">
                        <span className="text-sm text-white/70">{std}</span>
                        <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Открыть</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="font-display font-semibold text-lg mb-4">Готовые шаблоны</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Дом 100м², 1 этаж", desc: "Базовый каркасный дом", price: "2.8–3.5 млн ₽", tag: "Популярный" },
                  { name: "Дом 150м², 2 этажа", desc: "Стандартный семейный дом", price: "4.5–6.0 млн ₽", tag: "Хит" },
                  { name: "Дача 60м², 1 этаж", desc: "Загородный дачный домик", price: "1.5–2.0 млн ₽", tag: "" },
                  { name: "Коттедж 200м², 2 этажа", desc: "Премиум класс", price: "7.0–10 млн ₽", tag: "Премиум" },
                  { name: "Баня 40м²", desc: "Каркасная баня с предбанником", price: "0.9–1.3 млн ₽", tag: "" },
                  { name: "Гараж 50м²", desc: "Каркасный гараж на 2 машины", price: "0.7–1.0 млн ₽", tag: "" },
                ].map((tpl, idx) => (
                  <div key={idx} style={{ animationDelay: `${idx * 60}ms` }} className="animate-fade-in bg-white/3 border border-white/8 hover:border-orange-500/20 rounded-2xl p-5 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white/90 text-sm">{tpl.name}</h4>
                      {tpl.tag && <span className="px-2 py-0.5 rounded-lg bg-orange-500/15 text-orange-400 text-xs font-medium">{tpl.tag}</span>}
                    </div>
                    <p className="text-xs text-white/40 mb-3">{tpl.desc}</p>
                    <div className="text-sm font-display font-semibold text-orange-400 mb-3">{tpl.price}</div>
                    <button className="w-full py-2 rounded-xl bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 text-white/40 text-xs font-medium transition-all border border-transparent group-hover:border-orange-500/20">
                      Использовать шаблон
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ ПРОФИЛЬ ═══ */}
          {activeSection === "profile" && (
            <div className="p-6 max-w-2xl">
              <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold font-display text-2xl shadow-lg shadow-orange-500/30">А</div>
                  <div>
                    <h3 className="font-display font-semibold text-xl">Алексей Иванов</h3>
                    <div className="text-sm text-white/40">Прораб · ИП</div>
                    <div className="text-xs text-orange-400 mt-1">Тариф: Профессиональный</div>
                  </div>
                  <button className="ml-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-all flex items-center gap-2">
                    <Icon name="Pencil" size={14} />
                    Редактировать
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Email", value: "a.ivanov@mail.ru", icon: "Mail" },
                    { label: "Телефон", value: "+7 (916) 123-45-67", icon: "Phone" },
                    { label: "Организация", value: "ИП Иванов А.В.", icon: "Building" },
                    { label: "Регион", value: "Москва и МО", icon: "Map" },
                  ].map((field, idx) => (
                    <div key={idx} className="bg-white/3 rounded-xl p-3 flex items-center gap-3">
                      <Icon name={field.icon} size={15} className="text-white/30" fallback="Info" />
                      <div>
                        <div className="text-xs text-white/30">{field.label}</div>
                        <div className="text-sm text-white/80 font-medium">{field.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/3 border border-white/8 rounded-2xl p-5">
                <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Settings" size={16} className="text-white/40" />
                  Настройки интеграций
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "1С:Бухгалтерия", status: true, icon: "Database" },
                    { name: "Битрикс24 CRM", status: false, icon: "Briefcase" },
                    { name: "Telegram-уведомления", status: true, icon: "MessageCircle" },
                    { name: "API поставщиков", status: false, icon: "Link" },
                  ].map((int, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <Icon name={int.icon} size={16} className="text-white/30" fallback="Link" />
                        <span className="text-sm text-white/70">{int.name}</span>
                      </div>
                      <div className={`w-10 h-5 rounded-full transition-all cursor-pointer relative ${int.status ? "bg-orange-500" : "bg-white/10"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${int.status ? "right-0.5" : "left-0.5"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}