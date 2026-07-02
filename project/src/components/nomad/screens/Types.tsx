'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header'; // Чиний Header-ийн зөв замыг зааж өгөөрэй

export default function ContactPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Өнгөний горимыг унших болон синхрончлох
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme !== 'light');

    const handleStorage = () => {
      const updatedTheme = localStorage.getItem('theme');
      setDarkMode(updatedTheme !== 'light');
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  // Анимацийн Variants тохиргоо
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div
      className="min-h-screen pb-20 transition-colors duration-500 font-['Plus_Jakarta_Sans'] overflow-x-hidden"
      style={{
        backgroundColor: darkMode ? '#0D0B14' : '#F8FAFC',
        color: darkMode ? '#F3F2F5' : '#111827'
      }}
    >
      <Header />

      {/* Гар утсанд зориулж px-4, py-10 болгож багасгав */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
        
        {/* Дээд талын Толгой хэсэг */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-16"
        >
          <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-500/10 rounded-full">
            Холбоо барих 💌
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mt-3 mb-4 sm:mb-6 leading-tight">
            Бидэнд санал хүсэлтээ <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
              үлдээгээрэй
            </span>
          </h1>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B' }} className="text-xs sm:text-base leading-relaxed">
            "Бэлэглэе" платформтой холбоотой асуулт, хамтран ажиллах санал эсвэл шинэ санаа байвал бидэнд бичээрэй. Бид тун удахгүй хариулах болно! ✨
          </p>
        </motion.div>

        {/* grid-cols-1 гэснээр гар утас дээр доороосоо дээшээ цуварна, lg:grid-cols-12 дээр хажуу дахь байрлалдаа орно */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-12 items-start">
          
          {/* БАРУУН ТАЛ: Шууд холбогдох картууд */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-5 gap-4"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-4 sm:p-6 border rounded-2xl sm:rounded-3xl transition-all duration-300 flex items-center sm:items-start gap-4"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0'
              }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 flex-shrink-0">
                <span className="material-symbols-outlined text-xl sm:text-2xl">alternate_email</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-pink-500">И-мэйл хаяг</h3>
                <p className="text-sm sm:text-base font-semibold mt-0.5 break-all">support@belgely.mn</p>
                <p style={{ color: darkMode ? '#64748B' : '#94A3B8' }} className="text-[10px] sm:text-xs mt-0.5 hidden sm:block">24 цагийн дотор хариуцна</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-4 sm:p-6 border rounded-2xl sm:rounded-3xl transition-all duration-300 flex items-center sm:items-start gap-4"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0'
              }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500 flex-shrink-0">
                <span className="material-symbols-outlined text-xl sm:text-2xl">call</span>
              </div>
              <div>
                <h3 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-violet-500">Утасны дугаар</h3>
                <p className="text-sm sm:text-base font-semibold mt-0.5">+976 7711-XXXX</p>
                <p style={{ color: darkMode ? '#64748B' : '#94A3B8' }} className="text-[10px] sm:text-xs mt-0.5 hidden sm:block">Ажлын өдрүүдэд 09:00 - 18:00</p>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-4 sm:p-6 border rounded-2xl sm:rounded-3xl transition-all duration-300 flex items-center sm:items-start gap-4 sm:col-span-2 lg:col-span-1"
              style={{
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0'
              }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0">
                <span className="material-symbols-outlined text-xl sm:text-2xl">location_on</span>
              </div>
              <div>
                <h3 className="font-bold text-[10px] sm:text-xs uppercase tracking-wider text-amber-500">Байршил</h3>
                <p className="text-sm sm:text-base font-semibold mt-0.5">Улаанбаатар, Монгол улс</p>
                <p style={{ color: darkMode ? '#64748B' : '#94A3B8' }} className="text-[10px] sm:text-xs mt-0.5 hidden sm:block">Сүхбаатар дүүрэг, Стартап Хаб</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ЗҮҮН ТАЛ: Анимацитай Илгээх Форм */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 border p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden transition-all duration-300 min-h-[400px] flex items-center justify-center"
            style={{
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
              boxShadow: darkMode ? 'none' : '0 10px 30px -10px rgba(0,0,0,0.03)'
            }}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Таны нэр</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Нэрээ оруулна уу"
                      className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                      style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.15)' : '#F8FAFC',
                        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
                        color: darkMode ? '#FFFFFF' : '#111827'
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">И-мэйл хаяг</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@domain.com"
                      className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                      style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.15)' : '#F8FAFC',
                        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
                        color: darkMode ? '#FFFFFF' : '#111827'
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Хүсэлт / Санал</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Бидэнд хэлэх үгээ энд бичнэ үү..."
                      className="w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/30 resize-none"
                      style={{
                        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.15)' : '#F8FAFC',
                        borderColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : '#E2E8F0',
                        color: darkMode ? '#FFFFFF' : '#111827'
                      }}
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 sm:py-4 font-black text-xs sm:text-sm transition-all bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl sm:rounded-2xl hover:opacity-95 cursor-pointer"
                  >
                    Илгээх 🚀
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 px-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
                    <span className="material-symbols-outlined !text-[28px]">done</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mb-1.5">Амжилттай илгээгдлээ!</h2>
                  <p style={{ color: darkMode ? '#94A3B8' : '#64748B' }} className="text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                    {formData.name} танд баярлалаа. Бид таны хүсэлтийг хүлээн авсан бөгөөд манай баг тун удахгүй эргэж холбогдох болно 🎉
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-5 px-5 py-2 text-[10px] sm:text-xs font-bold border rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                    style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.15)' : '#E2E8F0' }}
                  >
                    Дахин бичих
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}