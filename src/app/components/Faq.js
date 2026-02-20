'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: 'How much does a website cost?',
        answer:
            'The cost depends on the complexity and functionality. We prepare an individual quote after analyzing your needs.',
    },
    {
        question: 'How long does development take?',
        answer:
            'Simple websites take from 5 business days. Complex projects take 1 to 3 weeks.',
    },
    {
        question: 'Can I make changes during the process?',
        answer:
            'Yes, you can! We work transparently and adjust the project together.',
    },
    {
        question: 'Do you help with content?',
        answer:
            'Yes, we can prepare content, photos and texts for your website.',
    },
    {
        question: 'Is there support after launch?',
        answer:
            'We provide technical support, updates and consultations after launch.',
    },
];

export default function Page() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section>
            <div className='container'>
                <h2 data-translate="faq_title">FAQ</h2>
                <div className="faq-content">
                    {faqData.map((item, index) => {
                        const isOpen = activeIndex === index;
                        const contentRef = useRef(null);

                        return (
                            <div className="faq-item" key={index} onClick={() => toggleFAQ(index)}>
                                <div className="title-faq-cont">
                                    <h3 className="faq-item-h">{item.question}</h3>

                                    <motion.img
                                        src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/arrow-faq.svg"
                                        alt=""
                                        animate={{ rotate: isOpen ? 95 : 0 }}
                                        transition={{ duration: 0.25 }}
                                    />
                                </div>

                                <motion.div
                                    className="faq-item-content"
                                    style={{ overflow: 'hidden' }}
                                    animate={{
                                        height: isOpen
                                            ? contentRef.current?.scrollHeight
                                            : 0,
                                        opacity: isOpen ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                >
                                    <div ref={contentRef}>
                                        <p>{item.answer}</p>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>

    );
}
