'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaInstagram, FaLine, FaXTwitter, FaFacebook,
  FaLinkedin, FaDiscord, FaGithub, FaEnvelope, FaChevronDown
} from 'react-icons/fa6';
import Image from 'next/image';

export default function WebCard() {
  const [isOpen, setIsOpen] = useState(false);

  // 親コンテナのアニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // 開始までの待機時間
        staggerChildren: 0.12 // 各要素が順次表示される間隔
      }
    }
  };

  // 各要素のアニメーション設定
  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // スムーズなイージング
    }
  };

  const snsLinks = [
    { icon: <FaInstagram />, color: '#E1306C', url: '#' },
    { icon: <FaLine />, color: '#06C755', url: '#' },
    { icon: <FaXTwitter />, color: '#000000', url: '#' },
    { icon: <FaFacebook />, color: '#1877F2', url: '#' },
    { icon: <FaLinkedin />, color: '#0077B5', url: '#' },
    { icon: <FaDiscord />, color: '#5865F2', url: '#' },
    { icon: <FaGithub />, color: '#333333', url: '#' },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 selection:bg-indigo-100">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-[360px] bg-white border border-gray-100 rounded-[3.5rem] p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)]"
      >
        {/* ① ヘッダー：顔写真（影なし・クリーン） */}
        <div className="flex flex-col items-center">
          <motion.div variants={itemVariants} className="relative">
            <div className="w-32 h-32 rounded-full border-[6px] border-[#F8FAFC] overflow-hidden">
              <Image
                src="/key_visual.jpg"
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
                priority // LCP対策（最初に読み込む）
              />
            </div>
          </motion.div>

          {/* 名前・肩書き */}
          <motion.div variants={itemVariants} className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">堀場 日向</h1>
            <p className="text-sm font-semibold text-indigo-500 mt-2 tracking-[0.15em] uppercase">Web APP Developer</p>
          </motion.div>
        </div>

        {/* ② 自己紹介 */}
        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-gray-500 text-[0.9rem] leading-[1.8] text-center px-2">
            はじめまして！！堀場日向です<br />
            東京都町田市出身です<br />
            趣味でウェブアプリを作成しています。
          </p>
        </motion.div>

        {/* ③ SNSリンク（常時表示、リッチなホバー） */}
        <motion.div variants={itemVariants} className="mt-10">
          <div className="flex flex-wrap justify-center gap-3">
            {snsLinks.map((sns, index) => (
              <motion.a
                key={index}
                href={sns.url}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200 transition-all duration-300"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = sns.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                <span className="text-lg">{sns.icon}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
