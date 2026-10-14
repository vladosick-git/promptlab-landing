const icon = (name) => `<svg aria-hidden="true"><use href="#${name}"/></svg>`;
document.querySelectorAll('.stars').forEach(el => {el.innerHTML = icon('star').repeat(5)});
const weeks = [
 ['Основы нейросетей','Разберёмся, как работают языковые модели, выберем инструменты и выполним первые задачи для бизнеса.'],
 ['Промпты для бизнеса','Научимся ставить задачу, задавать контекст и формат ответа. Соберём библиотеку рабочих промптов.'],
 ['Контент и маркетинг','Подготовим тексты для лендинга, писем и соцсетей. Создадим контент-план под задачи вашего бизнеса.'],
 ['Данные и аналитика','Научимся работать с таблицами, находить закономерности и превращать данные в понятные выводы.'],
 ['Автоматизация процессов','Соединим повторяющиеся задачи в процессы и определим, где нужен контроль человека.'],
 ['Ваш готовый проект','Соберём и проверим готовое решение для бизнеса: от постановки задачи до оценки результата.']
];
document.getElementById('weeks').innerHTML = weeks.map(([title,body],i) => `<div class="week"><span>${String(i+1).padStart(2,'0')}</span><details><summary><b>Неделя ${i+1}</b><span>${title}</span>${icon('plus')}</summary><p>${body}</p></details></div>`).join('');
const questions = [
 ['Нужен ли опыт работы с нейросетями?','Нет. Начинаем с основ и постепенно переходим к задачам бизнеса. Достаточно уверенно пользоваться компьютером.'],
 ['Сколько времени занимает обучение?','Программа рассчитана на 6 недель и 24 урока. Планируйте 3–4 часа в неделю на занятия и практику.'],
 ['Когда начинается курс?','В этой демонстрационной версии набор не проводится. Первый урок и форма представлены для показа работы интерфейса.'],
 ['Будут ли записи уроков?','По программе предусмотрены записи всех уроков и доступ к материалам на 6 месяцев.'],
 ['Можно ли оплатить частями?','Условия оплаты обсуждаются перед записью. В демонстрационной версии оплата не принимается.']
];
document.getElementById('questions').innerHTML = questions.map(([question,answer]) => `<details><summary>${question}${icon('plus')}</summary><p>${answer}</p></details>`).join('');
let selectedPlan = 'Бесплатный урок';
// A portable length pattern; allowed phone characters are checked on submit.
document.getElementById('phone').pattern = '.{10,22}';
document.querySelectorAll('[data-plan]').forEach(el=>el.addEventListener('click',()=>{selectedPlan=el.dataset.plan;document.querySelector('#lead-form button').textContent='Выбрать '+selectedPlan;document.getElementById('form-status').textContent='Выбран тариф «'+selectedPlan+'»';}));
document.querySelectorAll('a[href="#signup"]:not([data-plan])').forEach(el=>el.addEventListener('click',()=>{selectedPlan='Бесплатный урок';document.querySelector('#lead-form button').textContent='Получить урок';document.getElementById('form-status').textContent='';}));
const dialog = document.getElementById('info-dialog');
function showDialog(title, paragraphs){document.getElementById('dialog-title').textContent=title;document.getElementById('dialog-copy').replaceChildren(...paragraphs.map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));dialog.showModal();}
document.querySelectorAll('.close-dialog,.close-button').forEach(el=>el.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const dialogs={contacts:['Контакты',['PROMPTLAB — учебный проект лендинга для портфолио. Коммерческий курс не запущен; контакты и продажи не подключены.']],privacy:['Политика конфиденциальности',['Данные формы сохраняются только в вашем браузере на этом устройстве. Они не передаются на сервер или третьим лицам.','Это демонстрационный проект. Вы можете удалить сохранённую заявку, очистив данные сайта в браузере.']],social:['Социальные сети',['Страницы PROMPTLAB в социальных сетях пока не подключены. Это демонстрационная версия лендинга.']]};
document.querySelectorAll('[data-dialog]').forEach(el=>el.addEventListener('click',()=>showDialog(...dialogs[el.dataset.dialog])));
document.getElementById('lead-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const name=form.elements.name.value.trim();const phone=form.elements.phone.value.trim();const digits=phone.replace(/\D/g,'');if(name.length<2||!/^[+()0-9\s-]+$/.test(phone)||digits.length<10||digits.length>15){document.getElementById('form-status').textContent='Введите имя и корректный телефон.';return;}try{localStorage.setItem('promptlab-last-lead',JSON.stringify({name,phone,plan:selectedPlan,createdAt:new Date().toISOString()}));document.getElementById('form-status').textContent='Заявка сохранена на этом устройстве.';showDialog('Заявка сохранена',['Спасибо, '+name+'! Вы выбрали: '+selectedPlan+'.','Это демонстрационный сайт: данные сохранены только в вашем браузере, звонок или сообщение не отправлены.']);form.reset();}catch{document.getElementById('form-status').textContent='Браузер запретил сохранение. Попробуйте разрешить данные сайта.';}});
document.getElementById('generate').addEventListener('click',()=>{const el=document.getElementById('editor-text');const initial='Напиши продающий текст\nдля лендинга о курсе\nпо нейросетям…';const result='Меньше рутины —\nбольше времени на бизнес.\nОсвойте нейросети за 6 недель.';const generated=el.dataset.generated==='true';el.textContent=generated?initial:result;el.style.whiteSpace='pre-line';el.dataset.generated=String(!generated);});
document.getElementById('chat-form').addEventListener('submit',e=>{e.preventDefault();const input=e.currentTarget.querySelector('input');if(!input.value.trim())return;document.querySelector('.user-message p').textContent=input.value.trim();document.querySelector('.ai-message>div').replaceChildren(...['Задача принята!','1. Определите цель.','2. Соберите исходные данные.','3. Проверьте результат.'].map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));input.value='';});
