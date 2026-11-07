document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("glassPreloader")?.classList.add("box205");
    document.body.classList.add("box-loaded");
    setTimeout(() => {
      animateEl("counter1", 0, 15, 1500, " yil");
      animateFloat("counter2", 0, 99.9, 1800, "%");
      animateEl("counter3", 0, 42, 1500, " dB");
    }, 1000);
  }, 1000);

  function animateEl(id, start, end, dur, suf = "") {
    let t0 = null;
    const step = (t) => {
      if (!t0) t0 = t;
      let p = Math.min((t - t0) / dur, 1);
      document.getElementById(id).textContent = Math.floor(p * (end - start) + start) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function animateFloat(id, start, end, dur, suf = "") {
    let t0 = null;
    const step = (t) => {
      if (!t0) t0 = t;
      let p = Math.min((t - t0) / dur, 1);
      document.getElementById(id).textContent = (p * (end - start) + start).toFixed(1) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("box-revealed"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".box-reveal").forEach(el => obs.observe(el));

  const pL = document.getElementById("paneLeft"), pR = document.getElementById("paneRight");
  let isOp = false;
  const toggleWin = (l, r) => {
    isOp = !isOp;
    l.style.transform = isOp ? "rotateY(-75deg)" : "rotateY(0deg)";
    l.style.opacity = isOp ? "0.4" : "1";
    r.style.transform = isOp ? "rotateY(75deg)" : "rotateY(0deg)";
    r.style.opacity = isOp ? "0.4" : "1";
  };
  document.getElementById("interactiveWindowMockup")?.addEventListener("click", () => toggleWin(pL, pR));
  document.getElementById("heroOpenGlassBtn")?.addEventListener("click", () => {
    toggleWin(pL, pR);
    document.getElementById("glassEffect")?.scrollIntoView({ behavior: "smooth" });
  });

  const lL = document.getElementById("labLeftLeaf"), lR = document.getElementById("labRightLeaf"), lSt = document.getElementById("labStatusSpan"), gVal = document.getElementById("glassStateVal");
  let mode = "close";
  document.querySelectorAll(".box60 button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".box60 button").forEach(b => b.classList.remove("box-btn-active"));
      btn.classList.add("box-btn-active");
      mode = btn.getAttribute("data-action");
      if (lL && lR) {
        if (mode === "close") { lL.style.transform = lR.style.transform = "rotateY(0deg)"; lSt.textContent = "Oyna Yopiq Holatda"; gVal.textContent = "Yopiq"; }
        else if (mode === "open") { lL.style.transform = "rotateY(-85deg)"; lR.style.transform = "rotateY(85deg)"; lSt.textContent = "Oyna To'liq Ochiq"; gVal.textContent = "Ochiq"; }
        else if (mode === "vent") { lL.style.transform = "rotateY(-20deg)"; lR.style.transform = "rotateY(20deg)"; lSt.textContent = "Ventilyatsiya Rejimi (Havo Almashinuv)"; gVal.textContent = "Ventilyatsiya"; }
      }
    });
  });

  document.getElementById("glassOpacityRange")?.addEventListener("input", (e) => {
    if (lL && lR) lL.style.opacity = lR.style.opacity = e.target.value / 100;
  });

  const applyBtn = document.getElementById("applyGlassActionBtn");
  applyBtn?.addEventListener("click", () => {
    applyBtn.textContent = "Loading...";
    setTimeout(() => applyBtn.textContent = "Sinxronlash", 1000);
  });

  const cW = document.getElementById("calcW"), cH = document.getElementById("calcH"), cT = document.getElementById("calcType"), cAr = document.getElementById("calcAreaOut"), cPr = document.getElementById("calcPriceOut"), cRun = document.getElementById("calcRunBtn");
  const calc = () => {
    if (!cW || !cH || !cT) return;
    let area = (parseFloat(cW.value) || 0) * (parseFloat(cH.value) || 0);
    cAr.textContent = area.toFixed(2) + " m²";
    cPr.textContent = "$" + Math.round(area * (parseFloat(cT.value) || 0)).toLocaleString();
  };
  [cW, cH, cT].forEach(el => el?.addEventListener("input", calc));
  cRun?.addEventListener("click", () => {
    cRun.textContent = "Loading...";
    setTimeout(() => { calc(); cRun.textContent = "Hisob-Kitobni Boshlash"; }, 500);
  });

  const gMod = document.getElementById("globalModal"), pMod = document.getElementById("productModal");
  const toggleMod = (m, show) => m?.classList.toggle("box-active", show);
  document.getElementById("openMainModal")?.addEventListener("click", () => toggleMod(gMod, true));
  document.getElementById("closeModalBtn")?.addEventListener("click", () => toggleMod(gMod, false));
  document.getElementById("calcBridgeBtn")?.addEventListener("click", () => toggleMod(gMod, true));
  gMod?.addEventListener("click", (e) => { if (e.target === gMod) toggleMod(gMod, false); });
  document.getElementById("closeProductModalBtn")?.addEventListener("click", () => toggleMod(pMod, false));
  pMod?.addEventListener("click", (e) => { if (e.target === pMod) toggleMod(pMod, false); });

  const db = {
    doors: [
      { id: 101, name: "Panorama Sliding Door", price: 850, img: "https://i.pinimg.com/1200x/92/05/e5/9205e5b93d70adfa70271f8b14a48100.jpg", desc: "Surgichli panorama eshik tizimi." },
      { id: 102, name: "Folding Glass Door", price: 920, img: "https://i.pinimg.com/736x/25/d3/11/25d31103a20a42db77b0bfa3339e0945.jpg", desc: "Garmoshka usulida yig'iluvchi shaffof eshik." },
      { id: 103, name: "Minimal Frame Glass Entrance", price: 980, img: "https://i.pinimg.com/736x/b3/c7/97/b3c797b7db3373974654c9fd71933dc4.jpg", desc: "Ultra ingichka alyumin profilli oyna eshik." },
      { id: 104, name: "Grand Slide Portal", price: 1050, img: "https://i.pinimg.com/1200x/7a/f7/ad/7af7ade8aed4c4de74f2e6718d291730.jpg", desc: "Katta kottejlar uchun maxsus portal eshik." },
      { id: 105, name: "Crystal Pivot Door", price: 1150, img: "https://i.pinimg.com/1200x/59/52/85/595285e88fe998e0a8e4973f60362b24.jpg", desc: "O'q atrofida aylanuvchi zamonaviy eshik." }
    ],
    windows: [
      { id: 201, name: "Acoustic Triple Vacuum", price: 680, img: "https://i.pinimg.com/736x/3d/96/b4/3d96b4e135db99f2939efb4e895fdab0.jpg", desc: "3 qatlamli shovqin o'tkazmaydigan oyna." },
      { id: 202, name: "Thermo Shield Frame", price: 740, img: "https://i.pinimg.com/736x/5a/9e/27/5a9e27003cb302f7cc7b12f14b4aa1d9.jpg", desc: "Maksimal issiqlik izolyatsiyali haqiqiy oyna." },
      { id: 203, name: "Arched Acoustic Pane", price: 810, img: "https://i.pinimg.com/736x/fd/ed/16/fded167d4a64c11ac8ec36e794e283a8.jpg", desc: "Klassik va zamonaviy arxitektura oynasi." },
      { id: 204, name: "Double Seal Glass Window", price: 620, img: "https://i.pinimg.com/1200x/c5/5d/bb/c55dbb99ad47f8643c1657c5f0ae93a8.jpg", desc: "Ikki qavatli germetik himoyalangan oyna." },
      { id: 205, name: "Sun Reflection Pane", price: 790, img: "https://i.pinimg.com/1200x/b2/b4/41/b2b441aa327719772a65a1b38300c690.jpg", desc: "Quyosh nurlarini qaytaruvchi maxsus qatlam." }
    ],
    smart: [
      { id: 301, name: "Electrochromic Tint Glass", price: 1100, img: "https://i.pinimg.com/1200x/e4/8e/74/e48e74e5abbfc1b2120c9f1c7bdb8621.jpg", desc: "Boshqariluvchi shaffoflikka ega smart shisha." },
      { id: 302, name: "Solar Control Smart Glass", price: 1250, img: "https://i.pinimg.com/736x/76/e9/e3/76e9e3ad5f9faca9821944cecee69297.jpg", desc: "Quyosh va issiqlik darajasiga qarab o'zgaruvchi oyna." },
      { id: 303, name: "Privacy Touch Window", price: 1180, img: "https://i.pinimg.com/736x/24/09/f7/2409f7d77427b774f93c55d9406b782f.jpg", desc: "Tugma orqali matoviy holatga o'tuvchi smart oyna." },
      { id: 304, name: "Voice Controlled Glass", price: 1350, img: "https://i.pinimg.com/736x/4d/69/7f/4d697f6c68c750264c52afcc1d77b3fa.jpg", desc: "Ovozli buyruqlar yordamida boshqariluvchi tizim." },
      { id: 305, name: "LED Integrated Glass", price: 1420, img: "https://i.pinimg.com/736x/d4/d6/a2/d4d6a264d522118452bed22ce922832e.jpg", desc: "Ichki yoritish tizimiga ega shaffof devor." }
    ]
  };

  let cart = [], likes = [];
  const extGrid = document.getElementById("extendedProductGrid"), modTitle = document.getElementById("productModalTitle");

  function renderCat(key) {
    if (!extGrid) return;
    extGrid.innerHTML = "";
    if (modTitle) modTitle.textContent = key === "doors" ? "Panorama Eshik va Oynalar" : key === "windows" ? "Haqiqiy Akustik Oynalar" : "Aqlli Smart Oynalar";
    
    (db[key] || []).forEach(p => {
      const isL = likes.some(i => i.id === p.id);
      const card = document.createElement("div");
      card.className = "box77";
      card.style.cssText = "display:flex; flex-direction:column;";
      card.innerHTML = `
        <div class="ext-img-box" style="height:160px; position:relative;">
          <img src="${p.img}" style="width:100%; height:100%; object-fit:cover;">
          <button class="like-btn ${isL ? 'liked' : ''}" data-id="${p.id}"><i class="fa-solid fa-heart"></i></button>
        </div>
        <div class="box81" style="padding:15px; display:flex; flex-direction:column; flex:1; justify-content:space-between;">
          <div>
            <h4 style="font-size:15px; margin-bottom:5px;">${p.name}</h4>
            <p style="font-size:12px; color:#9ca3af; margin-bottom:10px;">${p.desc}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.06); padding-top:10px;">
            <span style="font-weight:800; color:#38edf8; font-size:15px;">$${p.price} / m²</span>
            <button class="box86 add-cart" data-id="${p.id}" style="width:90px; height:32px; font-size:12px;">Savatga</button>
          </div>
        </div>`;
      extGrid.appendChild(card);
    });

    extGrid.querySelectorAll(".like-btn").forEach(b => b.onclick = (e) => { e.stopPropagation(); toggleLike(+b.dataset.id, key); });
    extGrid.querySelectorAll(".add-cart").forEach(b => b.onclick = () => addCart(+b.dataset.id));
  }

  document.querySelectorAll(".box86, .box96, .box106").forEach(btn => {
    btn.onclick = (e) => { e.preventDefault(); renderCat(btn.dataset.category); toggleMod(pMod, true); };
  });

  const getProd = (id) => Object.values(db).flat().find(p => p.id === id);

  function toggleLike(id, key) {
    let p = getProd(id);
    if (!p) return;
    let idx = likes.findIndex(i => i.id === id);
    idx > -1 ? likes.splice(idx, 1) : likes.push(p);
    document.getElementById("likesCount").textContent = likes.length;
    if (key) renderCat(key);
    renderLikes();
  }

  function addCart(id) {
    let p = getProd(id);
    if (!p) return;
    let ex = cart.find(i => i.id === id);
    ex ? ex.qty++ : cart.push({ ...p, qty: 1 });
    updateCart();
    alert("Mahsulot savatchaga qo'shildi!");
  }

  function updateCart() {
    document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0);
    renderCart();
  }

  function renderCart() {
    let list = document.getElementById("cartItemsList"), totalEl = document.getElementById("cartTotalPrice");
    if (!list) return;
    list.innerHTML = "";
    let sum = 0;
    if (cart.length === 0) { list.innerHTML = `<p style="color:#9ca3af; text-align:center;">Savatchangiz bo'sh</p>`; if (totalEl) totalEl.textContent = "$0"; return; }
    
    cart.forEach(i => {
      sum += i.price * i.qty;
      let row = document.createElement("div");
      row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0b0f19; padding:10px; border-radius:8px;";
      row.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${i.img}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;">
          <div><h5 style="font-size:14px;">${i.name}</h5><span style="font-size:12px; color:#38edf8;">$${i.price}</span></div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="q-btn" data-id="${i.id}" data-a="m" style="background:#111827; border:none; color:#fff; width:25px; height:25px; border-radius:4px; cursor:pointer;">-</button>
          <span style="font-size:14px; font-weight:700;">${i.qty}</span>
          <button class="q-btn" data-id="${i.id}" data-a="p" style="background:#111827; border:none; color:#fff; width:25px; height:25px; border-radius:4px; cursor:pointer;">+</button>
        </div>`;
      list.appendChild(row);
    });
    if (totalEl) totalEl.textContent = "$" + sum.toLocaleString();

    list.querySelectorAll(".q-btn").forEach(b => b.onclick = () => {
      let item = cart.find(i => i.id === +b.dataset.id);
      b.dataset.a === 'p' ? item.qty++ : item.qty--;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== +b.dataset.id);
      updateCart();
    });
  }

  function renderLikes() {
    let list = document.getElementById("likesItemsList");
    if (!list) return;
    list.innerHTML = "";
    if (likes.length === 0) { list.innerHTML = `<p style="color:#9ca3af; text-align:center;">Yoqtirilgan mahsulotlar yo'q</p>`; return; }
    
    likes.forEach(i => {
      let row = document.createElement("div");
      row.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#0b0f19; padding:10px; border-radius:8px;";
      row.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center;">
          <img src="${i.img}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;">
          <div><h5 style="font-size:14px;">${i.name}</h5><span style="font-size:12px; color:#38edf8;">$${i.price} / m²</span></div>
        </div>
        <button class="rem-l" data-id="${i.id}" style="background:none; border:none; color:#ff4757; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>`;
      list.appendChild(row);
    });
    list.querySelectorAll(".rem-l").forEach(b => b.onclick = () => toggleLike(+b.dataset.id));
  }

  const cDr = document.getElementById("cartDrawer"), cOv = document.getElementById("cartOverlay");
  const lDr = document.getElementById("likesDrawer"), lOv = document.getElementById("likesOverlay");
  const toggleDr = (d, o, show) => { d?.classList.toggle("drawer-active", show); o?.classList.toggle("drawer-active", show); };

  document.getElementById("openCartBtn")?.addEventListener("click", () => toggleDr(cDr, cOv, true));
  document.getElementById("closeCartDrawerBtn")?.addEventListener("click", () => toggleDr(cDr, cOv, false));
  cOv?.addEventListener("click", () => toggleDr(cDr, cOv, false));

  document.getElementById("openLikesBtn")?.addEventListener("click", () => toggleDr(lDr, lOv, true));
  document.getElementById("closeLikesDrawerBtn")?.addEventListener("click", () => toggleDr(lDr, lOv, false));
  lOv?.addEventListener("click", () => toggleDr(lDr, lOv, false));

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) return alert("Savatchangiz bo'sh!");
    alert("Buyurtmangiz muvaffaqiyatli rasmiylashtirildi!");
    cart = []; updateCart(); toggleDr(cDr, cOv, false);
  });

  const handleForm = (formId, btnId, msg) => {
    const f = document.getElementById(formId), b = document.getElementById(btnId);
    f?.addEventListener("submit", (e) => {
      e.preventDefault();
      let txt = b.textContent; b.textContent = "Loading...";
      setTimeout(() => { b.textContent = txt; alert(msg); f.reset(); if(formId==="modalForm") toggleMod(gMod, false); }, 1200);
    });
  };
  handleForm("contactForm", "contactSubmitBtn", "Arizangiz muvaffaqiyatli yuborildi!");
  handleForm("modalForm", "modalSubmitBtn", "Buyurtmangiz qabul qilindi!");
});