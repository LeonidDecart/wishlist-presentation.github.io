/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  User
} from 'lucide-react';

// --- Components ---

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-gray-900 text-blue-300 p-6 rounded-xl font-mono text-sm overflow-x-auto border border-gray-800 shadow-2xl">
    <code>{code}</code>
  </pre>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-4">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-3 text-gray-700 text-lg">
        <span className="mt-2 w-2 h-2 rounded-full bg-purple-500 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const ImageSlideshow = ({ images }: { images: { src: string, alt: string }[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-video bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden p-6 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index].src}
          alt={images[index].alt}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-full max-h-full object-contain rounded-xl"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-purple-600 w-8' : 'bg-gray-300 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 16;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slides = [
    // Slide 1: Титульный
    <div key="s1" className="flex flex-col items-center justify-center h-full text-center px-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-8xl font-black text-purple-600 mb-6 tracking-tighter"
      >
        Wishlist App
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl text-gray-500 font-light max-w-2xl"
      >
        Система управления списками желаний с модулем поддержки
      </motion.p>
      <div className="absolute bottom-20 text-gray-400 font-medium tracking-wide">
        Команда проекта: Степан Костюк, Никита Голубев, Леонид Симоненко | 2026 год
      </div>
    </div>,

    // Slide 2: Проблема
    <div key="s2" className="max-w-6xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-16">Проблематика</h2>
      <div className="grid grid-cols-3 gap-8">
        {[
          "Не знаешь, что подарить другу.",
          "Двое купили одинаковый подарок.",
          "Нет удобного места для хранения желаний."
        ].map((text, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-6"
          >
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center font-bold text-xl">
              {i + 1}
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>,

    // Slide 3: Архитектура
    <div key="s3" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-8">Архитектура проекта</h2>
      <div className="grid grid-cols-[1fr_2.5fr] gap-12 items-center">
        <BulletList items={[
          "Контейнеризация: Docker + Laravel Sail",
          "Backend: Laravel (PHP-FPM)",
          "СУБД: SQLite",
          "Файловое хранилище: Local Storage (symlink)"
        ]} />
        <div className="bg-white p-2 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
          <img 
            src="/images/slide3-arch.png" 
            alt="Архитектурная схема взаимодействия" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-2xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 4: Стек технологий
    <div key="s4" className="max-w-6xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Стек технологий</h2>
      <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
        <table className="w-full text-left border-collapse">
          <tbody className="divide-y divide-gray-100">
            {[
              ["Backend", "PHP ^8.3, Laravel 13, SQLite"],
              ["Frontend", "Blade, Tailwind CSS, Alpine.js, Vite"],
              ["Архитектура", "Composer PSR-4, local/support-module (отдельный пакет)"],
              ["Инфраструктура", "Docker, Laravel Sail, PHPUnit"]
            ].map(([label, value], i) => (
              <tr key={i} className="bg-white hover:bg-gray-50 transition-colors">
                <td className="py-6 px-8 font-bold text-gray-900 w-1/3 text-xl border-r border-gray-100">{label}</td>
                <td className="py-6 px-8 text-gray-600 text-xl">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>,

    // Slide 5: Структура БД
    <div key="s5" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-6">Структура Базы Данных</h2>
      <div className="grid grid-cols-[1fr_3fr] gap-12 items-center">
        <BulletList items={[
          "users (Пользователи и роли)",
          "wishes (Желания и статусы)",
          "friendships (Связи Many-to-Many)",
          "error_reports (Обращения в поддержку)"
        ]} />
        <div className="bg-white p-2 rounded-3xl border border-gray-200 shadow-2xl overflow-hidden">
          <img 
            src="/images/slide5-db.png" 
            alt="Схема БД" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-2xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 6: Главная и авторизация
    <div key="s6" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Аутентификация</h2>
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-lg">
          <img 
            src="/images/slide6-home.png" 
            alt="Главная страница" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-lg" 
          />
        </div>
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-lg">
          <img 
            src="/images/slide6-login.png" 
            alt="Форма входа" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-lg" 
          />
        </div>
      </div>
      <BulletList items={[
        "Регистрация и сессионная авторизация (Laravel Breeze).",
        "Хэширование паролей (Bcrypt).",
        "Защита от CSRF-атак."
      ]} />
    </div>,

    // Slide 7: Личный кабинет
    <div key="s7" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Личный кабинет и работа с файлами</h2>
      <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-center">
        <BulletList items={[
          "Редактирование профиля (имя, email, пароль).",
          "Строгая валидация файлов аватара (mimes: jpg, png, webp | max: 2MB).",
          "Использование фасада Storage и публичных ссылок."
        ]} />
        <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-xl max-h-[65vh] flex items-center justify-center overflow-hidden">
          <img 
            src="/images/slide7-profile.png" 
            alt="Скриншот профиля" 
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full object-contain rounded-xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 8: Мой вишлист
    <div key="s8" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Управление желаниями</h2>
      <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-center">
        <BulletList items={[
          "CRUD операции для желаний.",
          "Флаг приватности (скрыть от публичной ленты).",
          "Загрузка изображений для товаров."
        ]} />
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xl">
          <img 
            src="/images/slide8-dashboard.png" 
            alt="Скриншот дашборда" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 9: Друзья и заявки
    <div key="s9" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10 py-6">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Социальное взаимодействие</h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-1 rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <img 
            src="/images/slide9-friends.png" 
            alt="Список друзей" 
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[58vh] object-contain rounded-lg" 
          />
        </div>
        <div className="bg-white p-1 rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <img 
            src="/images/slide9-requests.png" 
            alt="Входящие заявки" 
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[58vh] object-contain rounded-lg" 
          />
        </div>
      </div>
      <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
        <div className="flex justify-around items-center gap-8">
          <div className="flex items-center gap-3 text-gray-700 text-lg font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            Отправка заявок по email
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-lg font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            Жизненный цикл: Pending → Accepted
          </div>
        </div>
      </div>
    </div>,

    // Slide 10: Вишлист друга
    <div key="s10" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Бронирование подарков</h2>
      <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-center">
        <BulletList items={[
          "Просмотр чужих желаний (только для друзей).",
          "Статусы: Открыто -> Выполняется -> Исполнено.",
          "Защита от дублирования подарков в реальном времени."
        ]} />
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xl">
          <img 
            src="/images/slide10-friend-wishlist.png" 
            alt="Скриншот чужого вишлиста" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 11: Публичные желания
    <div key="s11" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Публичная лента (Explore)</h2>
      <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-center">
        <BulletList items={[
          "Доступна неавторизованным гостям.",
          "Выводятся только открытые и не приватные желания.",
          "Кнопка 'Удалить (Модерация)' для Editor/Admin."
        ]} />
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xl">
          <img 
            src="/images/slide11-explore.png" 
            alt="Скриншот страницы Explore" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 12: Админка и Модульность
    <div key="s12" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Админка и Модульность</h2>
      <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-center">
        <BulletList items={[
          "Модуль поддержки вынесен в независимый локальный пакет (local/support-module).",
          "Интеграция по стандарту автозагрузки PSR-4.",
          "Работа с базой данных внутри модуля реализована через чистый PDO."
        ]} />
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-xl">
          <img 
            src="/images/slide12-admin.png" 
            alt="Скриншот Админ-панели" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain rounded-xl" 
          />
        </div>
      </div>
    </div>,

    // Slide 13: Роли и ACL
    <div key="s13" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-16">Управление доступом (RBAC)</h2>
      <div className="relative flex justify-between items-center gap-4">
        {[
          { role: "Гость", rights: "Чтение публичной ленты, отправка жалоб.", color: "bg-gray-100 text-gray-600" },
          { role: "Пользователь", rights: "Управление своим контентом, бронирование.", color: "bg-blue-100 text-blue-600" },
          { role: "Редактор", rights: "Права пользователя + модерация контента.", color: "bg-indigo-100 text-indigo-600" },
          { role: "Админ", rights: "Доступ в админку, изменение ролей, ответы на тикеты.", color: "bg-purple-600 text-white" }
        ].map((item, i) => (
          <React.Fragment key={i}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`flex-1 p-8 rounded-3xl shadow-xl border border-white/50 backdrop-blur-sm ${item.color} flex flex-col gap-4 min-h-[280px]`}
            >
              <div className="text-xs font-black uppercase tracking-widest opacity-60">Уровень {i + 1}</div>
              <h3 className="text-3xl font-black tracking-tight">{item.role}</h3>
              <div className="h-px w-full bg-current opacity-20 my-2" />
              <p className="text-lg leading-snug font-medium opacity-90">{item.rights}</p>
            </motion.div>
            {i < 3 && (
              <div className="flex items-center text-gray-300">
                <ChevronRight size={40} strokeWidth={3} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>,

    // Slide 14: Внедрение зависимостей (DI)
    <div key="s14" className="max-w-6xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-8">Dependency Injection и PDO</h2>
      <p className="text-2xl text-gray-600 mb-8">Внедрение ReportManager через Service Container.</p>
      <CodeBlock code={`$this->app->singleton(ReportManager::class, function ($app) {
    $database = config("database.connections.sqlite.database");
    $pdo = new PDO("sqlite:" . $database);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return new ReportManager($pdo);
});`} />
    </div>,

    // Slide 15: Кастомные ошибки
    <div key="s15" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10">
      <h2 className="text-5xl font-bold text-gray-900 mb-8">Exception Handler и Репорты</h2>
      <div className="grid grid-cols-[1fr_2fr] gap-12 items-center">
        <BulletList items={[
          "Перехват исключений в ядре (app.php).",
          "Кастомные HTTP-заголовки: X-Error-Time, X-Error-Code.",
          "Route::fallback для работы сессий на 404 страницах.",
          "Загрузка скриншотов ошибок (max: 5MB)."
        ]} />
        <ImageSlideshow images={[
          { src: "/images/slide15-404.png", alt: "404 с формой" },
          { src: "/images/slide15-report.png", alt: "Жалоба" },
          { src: "/images/slide15-reply.png", alt: "Ответ" }
        ]} />
      </div>
    </div>,

    // Slide 16: Кто что делал
    <div key="s16" className="max-w-7xl w-full mx-auto h-full flex flex-col justify-center px-10 py-4">
      <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Команда проекта</h2>
      <div className="grid grid-cols-3 gap-6">
        {[
          { name: "Степан Костюк", tasks: "Бизнес-логика вишлистов, инфраструктура, фронтенд, связи БД.", avatar: "/photos/stepan.jpeg" },
          { name: "Никита Голубев", tasks: "Аутентификация, система ролей (Enum), Policies, ACL, модерация." },
          { name: "Леонид Симоненко", tasks: "Модуль поддержки (отдельный пакет), PDO, DI-контейнер, кастомная обработка исключений и файлов.", avatar: "/photos/leonid.jpg" }
        ].map((member, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-xl shadow-purple-200/40 border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden group">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-200">
                  <User size={80} strokeWidth={1} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-base">Fullstack Developer</span>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-3 flex-grow">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">{member.name}</h3>
              <div className="w-10 h-1 bg-purple-600 rounded-full" />
              <p className="text-gray-500 leading-relaxed text-base font-medium">{member.tasks}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

  ];

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex items-center gap-4 z-50">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-400 hover:text-purple-600 hover:scale-110 transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 font-mono text-sm text-gray-500">
          <span className="text-purple-600 font-bold">{currentSlide + 1}</span> / {totalSlides}
        </div>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-400 hover:text-purple-600 hover:scale-110 transition-all active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Slides Container */}
      <main className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="h-full w-full flex items-center justify-center"
          >
            {slides[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
