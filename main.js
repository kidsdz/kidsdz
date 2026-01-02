// روابط وتهيئة const SHEET_URL="YOUR_GOOGLE_SHEET_URL"; // ضع رابط Google Sheet هنا const WHATSAPP="213792095972"; const BARIDIMOB="00799999002843906831";

// الولايات const wilayas=["أدرار","الشلف","الأغواط","أم البواقي","باتنة","بجاية","بسكرة","بشار","البليدة","البويرة","تمنراست","تبسة","تلمسان","تيارت","تيزي وزو","الجزائر","الجلفة","جيجل","سطيف","سعيدة","سكيكدة","سيدي بلعباس","عنابة","قالمة","قسنطينة","المدية","مستغانم","المسيلة","معسكر","ورقلة","وهران","البيض","إليزي","برج بوعريريج","بومرداس","الطارف","تندوف","تيسمسيلت","الوادي","خنشلة","سوق أهراس","تيبازة","ميلة","عين الدفلى","النعامة","عين تموشنت","غرداية","غليزان","تيميمون","برج باجي مختار","أولاد جلال","بني عباس","إن صالح","إن قزام","تقرت","جانت","المغير","المنيعة"];

// المنتجات (ضع صورك هنا) const products=[ {id:1,name:"ملابس بنات 8-12 سنوات",price:2900,imgs:["https://i.postimg.cc/SNpj6r7W/d437971da6cada48994fc1d80e5d7650.jpg","https://i.postimg.cc/0N3FbStH/dae8efa69255b887c6c6c554dd0004a5.jpg"]}, {id:2,name:"ملابس بنات 8-12 سننوات",price:3200,imgs:["https://i.postimg.cc/NF92x3Yx/30b07ad19be64867458379a15e35d7aa.jpg","https://i.postimg.cc/y86rYjTN/00fa27654526bbf123e22360bff69fbc.jpg"]} ];

// إنشاء المنتجات const container=document.getElementById("products"); products.forEach(p=>{ container.innerHTML += `

  <div class="product">
    <div class="carousel" id="carousel${p.id}">
      ${p.imgs.map((img,i)=>`<img src="${img}" alt="${p.name}" class="${i===0?'active':''}">`).join('')}
    </div>
    <div class="dots" id="dots${p.id}">
      ${p.imgs.map((_,i)=>`<span class="dot" onclick="goToSlide(${p.id},${i})"></span>`).join('')}
    </div>
    <div class="info">
      <h3>${p.name}</h3>
      <div class="price">${p.price} دج</div>
      <input id="name${p.id}" placeholder="الاسم الكامل">
      <input id="phone${p.id}" placeholder="رقم الهاتف">
      <select id="state${p.id}">
        <option value="">اختر الولاية</option>
        ${wilayas.map(w=>`<option>${w}</option>`).join("")}
      </select>
      <select id="size${p.id}">
        <option value="">اختر المقاس</option><option>S</option><option>M</option><option>L</option><option>XL</option>
      </select>
      <select id="color${p.id}">
        <option value="">اختر اللون</option><option>أحمر</option><option>أسود</option>
      </select>
      <select id="pay${p.id}" onchange="showBaridi(${p.id})">
        <option value="">طريقة الدفع</option>
        <option>الدفع عند الاستلام</option>
        <option>BaridiMob</option>
      </select>
      <div class="baridi" id="baridi${p.id}">
        رقم BaridiMob:<br><strong>${BARIDIMOB}</strong> <button onclick="copyBaridi('${BARIDIMOB}')">نسخ الرقم</button>
      </div>
      <button onclick="order(${p.id})">اطلب الآن</button>
    </div>
  </div>`;
});// Carousel const carousels={}; products.forEach(p=>{carousels[p.id]={current:0}; showSlide(p.id,0); autoSlide(p.id);}); function showSlide(id,index){const carousel=document.getElementById(carousel${id}); const imgs=carousel.querySelectorAll('img'); const dots=document.getElementById(dots${id}).querySelectorAll('.dot'); imgs.forEach((img,i)=>img.classList.toggle('active',i===index)); dots.forEach((dot,i)=>dot.classList.toggle('active',i===index)); carousels[id].current=index;} function nextSlide(id){const current=carousels[id].current; const imgs=document.getElementById(carousel${id}).querySelectorAll('img'); const next=(current+1)%imgs.length; showSlide(id,next);} function prevSlide(id){const current=carousels[id].current; const imgs=document.getElementById(carousel${id}).querySelectorAll('img'); const prev=(current-1+imgs.length)%imgs.length; showSlide(id,prev);} function goToSlide(id,index){showSlide(id,index);} function autoSlide(id){setInterval(()=>nextSlide(id),3000);}

// Baridi function showBaridi(id){const paySelect=document.getElementById(pay${id}); const baridiDiv=document.getElementById(baridi${id}); baridiDiv.style.display = paySelect.value=="BaridiMob"?"block":"none";} function copyBaridi(num){navigator.clipboard.writeText(num).then(()=>alert('تم نسخ الرقم'));}

// طلب async function order(id){ const p=products.find(x=>x.id==id); const name=document.getElementById(name${id}).value.trim(); const phone=document.getElementById(phone${id}).value.trim(); const wilaya=document.getElementById(state${id}).value; const size=document.getElementById(size${id}).value; const color=document.getElementById(color${id}).value; const pay=document.getElementById(pay${id}).value; if(!name||!phone||!wilaya||!size||!color||!pay){alert("يرجى ملء جميع الحقول");return;} if(!/^0[567]\d{8}$/.test(phone)){alert("رقم هاتف غير صحيح");return;} try{ const formData=new FormData(); formData.append("product",p.name); formData.append("price",p.price); formData.append("name",name); formData.append("phone",phone); formData.append("wilaya",wilaya); formData.append("size",size); formData.append("color",color); formData.append("payment",pay); formData.append("source","Kids DZ Website"); await fetch(SHEET_URL,{method:"POST",body:formData}); const msg=طلب جديد 🧸\n${p.name}\nالسعر: ${p.price} دج\nالاسم: ${name}\nالهاتف: ${phone}\nالولاية: ${wilaya}\nالمقاس: ${size}\nاللون: ${color}\nطريقة الدفع: ${pay}; window.open(https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)},"_blank"); setTimeout(()=>location.href="thank-you.html",1000); }catch(err){console.error(err); alert("❌ حدث خطأ أثناء إرسال الطلب");} }