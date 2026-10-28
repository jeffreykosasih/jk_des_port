'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa';
import { IoDocumentText, IoMail } from 'react-icons/io5';

type ContactItem = {
  label: string;
  icon: IconType;
  href?: string;
  onClick?: () => void;
};

const RESUMES = [
  { id: 'des', label: 'Design', href: '/Jeffrey-Ko-Design-Resume.pdf' },
  { id: 'dev', label: 'Developer', href: '/Jeffrey-Ko-Developer-Resume.pdf' },
];

const itemClass =
  'inline-flex p-2 text-text-primary transition-all duration-200 hover:-translate-y-1 hover:text-accent';

/* Shared with the "Email copied" bubble so the two read as one component. */
const bubbleClass =
  'absolute bottom-full left-1/2 mb-4 rounded-xl border-2 border-text-primary bg-primary shadow-lg';

const BubbleTail = () => (
  <svg
    aria-hidden='true'
    width='18'
    height='11'
    viewBox='0 0 18 11'
    className='absolute left-1/2 top-full -mt-[2px] -translate-x-1/2 overflow-visible text-text-primary'
  >
    <path
      d='M1 0 L9 10 L17 0'
      fill='var(--site-primary)'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinejoin='round'
    />
  </svg>
);

/** Two resumes behind one icon: pick a version, then open it in its own tab
 *  where the browser's PDF viewer handles saving. */
const ResumeMenu = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      // Send focus back to the trigger, or it lands on <body>.
      buttonRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className='relative'>
      <button
        ref={buttonRef}
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-label='Resume'
        aria-haspopup='menu'
        aria-expanded={open}
        title='Resume'
        className={itemClass}
      >
        <IoDocumentText className='h-10 w-10 md:h-12 md:w-12' />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role='menu'
            aria-label='Choose a resume'
            initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`${bubbleClass} min-w-max p-1.5`}
          >
            {RESUMES.map((resume) => (
              <a
                key={resume.id}
                role='menuitem'
                href={resume.href}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => setOpen(false)}
                className='block whitespace-nowrap rounded-lg px-5 py-2.5 text-base font-bold transition-colors hover:bg-accent hover:text-accent-ink'
              >
                {resume.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = 'jefpkos@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const workLinks: ContactItem[] = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jeffreykosasih/',
      icon: FaLinkedin,
    },
    {
      label: 'Email',
      onClick: copyEmail,
      icon: IoMail,
    },
  ];

  const socialLinks: ContactItem[] = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/sijefriii',
      icon: FaInstagram,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@sijefrii',
      icon: FaTiktok,
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@sijefri',
      icon: FaYoutube,
    },
  ];

  const renderItem = (item: ContactItem) => {
    const Icon = item.icon;
    const iconEl = <Icon className='h-10 w-10 md:h-12 md:w-12' />;

    if (item.onClick) {
      return (
        <div key={item.label} className='relative'>
          <button
            type='button'
            onClick={item.onClick}
            aria-label={item.label}
            title={item.label}
            className={itemClass}
          >
            {iconEl}
          </button>
          <AnimatePresence>
            {item.label === 'Email' && copied && (
              <motion.span
                initial={{ opacity: 0, y: 10, x: '-50%', scale: 0.9 }}
                animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`${bubbleClass} pointer-events-none whitespace-nowrap px-4 py-1.5 text-base font-bold text-accent`}
              >
                Email copied
                <BubbleTail />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <a
        key={item.label}
        href={item.href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={item.label}
        title={item.label}
        className={itemClass}
      >
        {iconEl}
      </a>
    );
  };

  return (
    <section id='contact' className='py-24 px-6 flex items-center'>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='max-w-7xl mx-auto w-full py-8'
      >
        <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
          <h2 className='text-[clamp(3rem,7vw,4.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-text-primary'>
            Connect
          </h2>

          <div className='flex flex-col gap-6 md:items-end'>
            <div className='flex flex-wrap items-center gap-5 md:justify-end md:gap-7'>
              {workLinks.map(renderItem)}
              <ResumeMenu />
            </div>
            <div className='flex flex-wrap items-center gap-5 md:justify-end md:gap-7'>
              {socialLinks.map(renderItem)}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
