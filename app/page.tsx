'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaInstagram, FaLine, FaXTwitter, FaFacebook,
  FaLinkedin, FaDiscord, FaGithub, FaEnvelope
} from 'react-icons/fa6';
import Image from 'next/image';

// --- アニメーション設定 ---

// 1文字ずつ表示するためのバリアント
const charVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1] as const,
    },
  }),
};

// SNSアイコンの浮遊アニメーション（個別でリズムを変える）
const floatingVariants = (index: number) => ({
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3 + (index % 3) * 0.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
});

export default function WhiteRichCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  // ① 3D Tilt 効果
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX / window.innerWidth - 0.5);
    y.set(e.clientY / window.innerHeight - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const snsLinks = [
    { icon: <FaInstagram />, color: '#E1306C', url: 'https://www.instagram.com/h.hinata1125?igsh=MWJxMXBvZnJkcml6cA==' },
    { icon: <FaLine />, color: '#06C755', url: 'https://line.me/ti/p/Dnpd3EnIcN' },
    { icon: <FaXTwitter />, color: '#000000', url: 'https://line.me/ti/p/Dnpd3EnIcN' },
    { icon: <FaFacebook />, color: '#1877F2', url: 'https://www.facebook.com/share/17RvQnMfKw/' },
    { icon: <FaLinkedin />, color: '#0077B5', url: 'https://www.linkedin.com/in/%E6%97%A5%E5%90%91-%E5%A0%80%E5%A0%B4-29109a32a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
    { icon: <FaDiscord />, color: '#5865F2', url: 'http://discordapp.com/users/1065236698478428222' },
    { icon: <FaGithub />, color: '#333333', url: 'https://github.com/hinatahoriba' },
  ];

  const name = "堀場 日向";

  return (
    <main className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6 selection:bg-indigo-100">
      {/* 背景の柔らかな光 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />
      </div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[360px]"
      >
        {/* ⑥ ボーダーライト（白背景でも映える繊細な光の輪郭） */}
        <div className="absolute -inset-[1px] bg-gradient-to-tr from-white via-white/50 to-indigo-200/30 rounded-[3.5rem] shadow-xl" />

        {/* ⑤ ガラス効果の本体（白ベース） */}
        <div className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-[3.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">

          <div className="flex flex-col items-center" style={{ transform: "translateZ(50px)" }}>
            <div className="relative">
              {/* ③ プロフィール環（回転する破線とグラデーション） */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 border-2 border-dashed border-indigo-200 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 border border-indigo-100 rounded-full"
              />

              <div className="relative w-28 h-28 rounded-full border-[6px] border-white overflow-hidden shadow-lg">
                <Image
                  src="/key_visual.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* ② 名前：1文字ずつスライドイン */}
            <div className="mt-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 flex justify-center tracking-tight">
                {name.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={charVariants}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[10px] font-extrabold text-indigo-500 uppercase mt-2 tracking-[0.25em]"
              >
                Web APP Developer
              </motion.p>
            </div>
          </div>

          {/* 自己紹介文 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
            style={{ transform: "translateZ(30px)" }}
          >
            <p className="text-gray-500 text-[0.9rem] leading-relaxed font-medium">
              東京都町田市出身。<br />
              趣味でウェブアプリを<br />
              作成しています。
            </p>
          </motion.div>

          {/* ④ SNSリンク（浮遊アニメーション + 全7種） */}
          <div className="mt-10 flex flex-wrap justify-center gap-3" style={{ transform: "translateZ(60px)" }}>
            {snsLinks.map((sns, i) => (
              <motion.a
                key={i}
                href={sns.url}
                variants={floatingVariants(i)}
                animate="animate"
                whileHover={{
                  scale: 1.2,
                  backgroundColor: "#fff",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/50 border border-gray-100 text-gray-400 transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.color = sns.color)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                <span className="text-lg">{sns.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* 下部の装飾ライン */}
          <div className="mt-10 w-8 h-1 bg-indigo-100 rounded-full mx-auto" />
        </div>
      </motion.div>
    </main>
  );
}
