/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  ExternalLink, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  X,
  ChevronRight,
  FileText
} from 'lucide-react';

interface Apostila {
  id: string;
  year: string;
  subjects: string;
  url: string;
  category: 'Fundamental' | 'Médio';
}

const APOSTILAS: Apostila[] = [
  // 6º Ano
  { id: '6-lp-mat-v1', year: '6º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-6ano-lingua-portuguesa-matematica.pdf', category: 'Fundamental' },
  { id: '6-lp-mat-v2', year: '6º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/6ano/matematicaportugues6anovol2.pdf', category: 'Fundamental' },
  { id: '6-others-v1', year: '6º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-6ano-ciencias-historia-geografia-lingua-inglesa-projeto-de-vida.pdf', category: 'Fundamental' },
  { id: '6-others-v2', year: '6º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/6ano/histciefeoinglprojeto6anovol2.pdf', category: 'Fundamental' },
  
  // 7º Ano
  { id: '7-lp-mat-v1', year: '7º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-7ano-lingua-portuguesa-matematica.pdf', category: 'Fundamental' },
  { id: '7-lp-mat-v2', year: '7º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/7ano/matematicaportugues7anovol2.pdf', category: 'Fundamental' },
  { id: '7-others-v1', year: '7º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-7ano-ciencias-historia-geografia-lingua-inglesa-projeto-de-vida.pdf', category: 'Fundamental' },
  { id: '7-others-v2', year: '7º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/7ano/histciengeoinglprojeto7anovol2.pdf', category: 'Fundamental' },
  
  // 8º Ano
  { id: '8-lp-mat-v1', year: '8º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-8ano-lingua-portuguesa-matematica.pdf', category: 'Fundamental' },
  { id: '8-lp-mat-v2', year: '8º Ano', subjects: 'Língua Portuguesa, Matemática & Projeto de Vida (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/8ano/matematicaportugues8anovol2.pdf', category: 'Fundamental' },
  { id: '8-others-v1', year: '8º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-8ano-ciencias-historia-geografia-lingua-inglesa-projeto-de-vida.pdf', category: 'Fundamental' },
  { id: '8-others-v2', year: '8º Ano', subjects: 'Ciências, História, Geografia & Inglês (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/8ano/histciengeoing8anovol2.pdf', category: 'Fundamental' },
  
  // 9º Ano
  { id: '9-lp-mat-v1', year: '9º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-9ano-lingua-portuguesa-matematica.pdf', category: 'Fundamental' },
  { id: '9-lp-mat-v2', year: '9º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/9ano/matematicaportugues9anovol2.pdf', category: 'Fundamental' },
  { id: '9-others-v1', year: '9º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-9ano-ciencias-historia-geografia-lingua-inglesa-projeto-de-vida.pdf', category: 'Fundamental' },
  { id: '9-others-v2', year: '9º Ano', subjects: 'Ciências, História, Geografia, Inglês & Projeto de Vida (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/9ano/histciengeoinglprojeto9anovol2.pdf', category: 'Fundamental' },
  
  // 1º Ano
  { id: '1-his-geo-ing-v1', year: '1º Ano', subjects: 'História, Geografia & Inglês (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-1ano-historia-geografia-lingua-inglesa.pdf', category: 'Médio' },
  { id: '1-his-geo-ing-v2', year: '1º Ano', subjects: 'História, Geografia & Inglês (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/1ano/histgeoingl1anovol2.pdf', category: 'Médio' },
  { id: '1-bio-fis-qui-v1', year: '1º Ano', subjects: 'Biologia, Física & Química (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-1ano-biologia-fisica-quimica.pdf', category: 'Médio' },
  { id: '1-bio-fis-qui-v2', year: '1º Ano', subjects: 'Biologia, Física & Química (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/1ano/fisbioloquim1ano2vol.pdf', category: 'Médio' },
  { id: '1-lp-mat-v1', year: '1º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-1ano-lingua-portuguesa-matematica.pdf', category: 'Médio' },
  { id: '1-lp-mat-v2', year: '1º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/1ano/matematica1anovol2.pdf', category: 'Médio' },

  // 2º Ano
  { id: '2-bio-fis-qui-v1', year: '2º Ano', subjects: 'Biologia, Física & Química (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-2ano-biologia-fisica-quimica.pdf', category: 'Médio' },
  { id: '2-bio-fis-qui-v2', year: '2º Ano', subjects: 'Biologia, Física & Química (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/2ano/1607135%20(1).pdf', category: 'Médio' },
  { id: '2-lp-mat-v1', year: '2º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-2ano-lingua-portuguesa-matematica.pdf', category: 'Médio' },
  { id: '2-lp-mat-v2', year: '2º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/2ano/1607135%20(1).pdf', category: 'Médio' },
  { id: '2-his-geo-ing-v1', year: '2º Ano', subjects: 'História, Geografia & Inglês (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-2ano-historia-geografia-lingua-inglesa.pdf', category: 'Médio' },
  { id: '2-his-geo-ing-v2', year: '2º Ano', subjects: 'História, Geografia & Inglês (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/2ano/1607135%20(1).pdf', category: 'Médio' },

  // 3º Ano
  { id: '3-lp-mat-v1', year: '3º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-3ano-lingua-portuguesa-matematica.pdf', category: 'Médio' },
  { id: '3-lp-mat-v2', year: '3º Ano', subjects: 'Língua Portuguesa & Matemática (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/3ano/matematicaportugues3anovol2.pdf', category: 'Médio' },
  { id: '3-his-geo-ing-v1', year: '3º Ano', subjects: 'História, Geografia & Inglês (Vol. 1)', url: 'https://r2.cupiditys.lol/v1-3ano-historia-geografia-lingua-inglesa.pdf', category: 'Médio' },
  { id: '3-his-geo-ing-v2', year: '3º Ano', subjects: 'História, Física & Inglês (Vol. 2)', url: 'https://pub-761ea6e47fa74db3a9b6ffc7656d8e73.r2.dev/OpenFuture/volume2/3ano/histfisicaingl3anovol2.pdf', category: 'Médio' },
];

export default function App() {
  const [selectedApostila, setSelectedApostila] = useState<Apostila | null>(null);
  const [activeCategory, setActiveCategory] = useState<'Fundamental' | 'Médio'>('Fundamental');

  const filteredApostilas = useMemo(() => {
    return APOSTILAS.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(filteredApostilas.map(a => a.year)));
    return uniqueYears;
  }, [filteredApostilas]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a192f,black)]" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{
              y: ["-10%", "110%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
        <motion.div 
          className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.05)_0%,transparent_70%)]"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-16 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-400 mb-4">
            Apostilas Shuziro
          </h1>
          <p className="text-blue-200/60 text-lg max-w-2xl mx-auto font-medium">
            Biblioteca digital de estudos organizada por ano e matéria.
          </p>
        </motion.div>
      </header>

      {/* Category Toggle */}
      <div className="relative z-10 flex justify-center gap-4 mb-12 px-6">
        {(['Fundamental', 'Médio'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 border ${
              activeCategory === cat 
                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
            }`}
          >
            {cat === 'Fundamental' ? <BookOpen size={18} /> : <GraduationCap size={18} />}
            Ensino {cat}
          </button>
        ))}
      </div>

      {/* Main Content (Grid) */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {years.map((year, idx) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-2xl font-bold">{year}</h3>
                </div>
                
                <div className="space-y-3">
                  {filteredApostilas
                    .filter(a => a.year === year)
                    .map((apostila) => (
                      <button
                        key={apostila.id}
                        onClick={() => setSelectedApostila(apostila)}
                        className="w-full text-left p-4 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group/item flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-white/70 group-hover/item:text-white transition-colors line-clamp-2 pr-4">
                          {apostila.subjects}
                        </span>
                        <ChevronRight size={16} className="text-white/20 group-hover/item:text-blue-400 transition-colors shrink-0" />
                      </button>
                    ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Modal / Panel */}
      <AnimatePresence>
        {selectedApostila && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApostila(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xs bg-[#0f172a] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold leading-tight">{selectedApostila.year}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApostila(null)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Subject Info */}
              <div className="px-5 mb-3">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-xs font-medium text-blue-100/80 leading-snug">
                    {selectedApostila.subjects}
                  </p>
                </div>
              </div>

              {/* Even Smaller PDF Preview Area */}
              <div className="px-5 mb-5">
                <div className="h-32 w-full bg-black rounded-xl overflow-hidden border border-white/10 relative group">
                  <iframe
                    src={`${selectedApostila.url}#toolbar=0&navpanes=0`}
                    className="w-full h-full border-none opacity-40 group-hover:opacity-100 transition-opacity"
                    title="PDF Preview"
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-gradient-to-t from-[#0f172a] to-transparent opacity-30" />
                </div>
              </div>

              {/* Download Button in Modal */}
              <div className="px-5 pb-6">
                <a
                  href={selectedApostila.url}
                  download
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95 group"
                >
                  <Download size={20} strokeWidth={3} className="group-hover:animate-bounce" />
                  <span className="font-black text-sm tracking-tight">BAIXAR AGORA</span>
                </a>
                
                <div className="mt-3 flex justify-center">
                  <a
                    href={selectedApostila.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] font-bold text-white/20 hover:text-blue-400 transition-colors flex items-center gap-1 uppercase tracking-widest"
                  >
                    <ExternalLink size={10} />
                    Link Direto
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 backdrop-blur-xl py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black mb-2 tracking-tighter bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Apostilas Shuziro
            </h2>
            <p className="text-white/40 text-sm font-medium">
              Feito por <span className="text-white font-bold">bakai</span>
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-3 text-blue-200/60">
              <MessageSquare size={20} className="text-indigo-400" />
              <span className="font-bold tracking-tight">Entre no nosso Discord</span>
            </div>
            <a
              href="https://discord.gg/GguBjXyet"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-black transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(88,101,242,0.3)] group"
            >
              <svg 
                viewBox="0 0 127.14 96.36" 
                className="w-6 h-6 fill-current group-hover:scale-110 transition-transform"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.48,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.24-16.14h0C129.46,52.45,120.5,28.55,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
              </svg>
              ENTRAR
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
