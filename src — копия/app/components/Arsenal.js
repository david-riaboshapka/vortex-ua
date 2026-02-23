'use client'
import { useModalStore } from '@/store/useModalStore';
export default function Arsenal() {
    const openModal = useModalStore((state) => state.openModal);
    return (
        <>
            <section>
                <div className='container'>
                    <h2>Web <span>Production</span></h2>
                    <div className='cont-items-arsenal'>
                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <span>[01]</span>
                                <h4>Landing Page</h4>
                                <p>A single-page site focused on one goal—sell, engage, or inform. Thoughtful structure, strong visuals, and text that drives action</p>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <span>from 2 days</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="13" viewBox="0 0 32 13" fill="none">
                                    <path d="M31.0303 5.96967C31.3232 6.26256 31.3232 6.73744 31.0303 7.03033L26.2574 11.8033C25.9645 12.0962 25.4896 12.0962 25.1967 11.8033C24.9038 11.5104 24.9038 11.0355 25.1967 10.7426L29.4393 6.5L25.1967 2.25736C24.9038 1.96447 24.9038 1.48959 25.1967 1.1967C25.4896 0.903806 25.9645 0.903806 26.2574 1.1967L31.0303 5.96967ZM30.5 6.5V7.25H0.5V6.5V5.75H30.5V6.5Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>

                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <span>[02]</span>
                                <h4>Corporate</h4>
                                <p>A multi-page site for a company: about the brand, services, cases, and team. We create intuitive navigation, modern style, and a presentation that builds trust</p>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <span>from 1 week</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="13" viewBox="0 0 32 13" fill="none">
                                    <path d="M31.0303 5.96967C31.3232 6.26256 31.3232 6.73744 31.0303 7.03033L26.2574 11.8033C25.9645 12.0962 25.4896 12.0962 25.1967 11.8033C24.9038 11.5104 24.9038 11.0355 25.1967 10.7426L29.4393 6.5L25.1967 2.25736C24.9038 1.96447 24.9038 1.48959 25.1967 1.1967C25.4896 0.903806 25.9645 0.903806 26.2574 1.1967L31.0303 5.96967ZM30.5 6.5V7.25H0.5V6.5V5.75H30.5V6.5Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>

                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <span>[03]</span>
                                <h4>E-Commerce</h4>
                                <p>An online store that works quickly and clearly. Clean interface, convenient purchase process, and adaptation for real users—so the cart is never empty</p>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <span>from 2 weeks</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="13" viewBox="0 0 32 13" fill="none">
                                    <path d="M31.0303 5.96967C31.3232 6.26256 31.3232 6.73744 31.0303 7.03033L26.2574 11.8033C25.9645 12.0962 25.4896 12.0962 25.1967 11.8033C24.9038 11.5104 24.9038 11.0355 25.1967 10.7426L29.4393 6.5L25.1967 2.25736C24.9038 1.96447 24.9038 1.48959 25.1967 1.1967C25.4896 0.903806 25.9645 0.903806 26.2574 1.1967L31.0303 5.96967ZM30.5 6.5V7.25H0.5V6.5V5.75H30.5V6.5Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>




                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <h4>Tell us your project timeline and approximate budget, and we’ll exceed your expectations in every way</h4>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <button className='red' onClick={openModal}>send</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <h2>Design <span>&</span> Other</h2>
                    <div className='cont-items-arsenal'>
                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <span>[01]</span>
                                <h4>Web Design</h4>
                                <p>We design interfaces that look modern and work seamlessly. Strategy, UX, aesthetics—everything to achieve the goal</p>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <span>from 3 days</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="13" viewBox="0 0 32 13" fill="none">
                                    <path d="M31.0303 5.96967C31.3232 6.26256 31.3232 6.73744 31.0303 7.03033L26.2574 11.8033C25.9645 12.0962 25.4896 12.0962 25.1967 11.8033C24.9038 11.5104 24.9038 11.0355 25.1967 10.7426L29.4393 6.5L25.1967 2.25736C24.9038 1.96447 24.9038 1.48959 25.1967 1.1967C25.4896 0.903806 25.9645 0.903806 26.2574 1.1967L31.0303 5.96967ZM30.5 6.5V7.25H0.5V6.5V5.75H30.5V6.5Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>

                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <span>[02]</span>
                                <h4>Brand Identity</h4>
                                <p>We create a brand’s visual language: logo, palette, typography, and system. So you’re recognized at first glance—online and offline</p>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <span>from 2 weeks</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="13" viewBox="0 0 32 13" fill="none">
                                    <path d="M31.0303 5.96967C31.3232 6.26256 31.3232 6.73744 31.0303 7.03033L26.2574 11.8033C25.9645 12.0962 25.4896 12.0962 25.1967 11.8033C24.9038 11.5104 24.9038 11.0355 25.1967 10.7426L29.4393 6.5L25.1967 2.25736C24.9038 1.96447 24.9038 1.48959 25.1967 1.1967C25.4896 0.903806 25.9645 0.903806 26.2574 1.1967L31.0303 5.96967ZM30.5 6.5V7.25H0.5V6.5V5.75H30.5V6.5Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>

                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <span>[03]</span>
                                <h4>Socials & Media</h4>
                                <p>We create graphics, banners, and visuals for social media and presentations. Everything in a unified style with a focus on audience attention</p>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <span>from 1 week</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="13" viewBox="0 0 32 13" fill="none">
                                    <path d="M31.0303 5.96967C31.3232 6.26256 31.3232 6.73744 31.0303 7.03033L26.2574 11.8033C25.9645 12.0962 25.4896 12.0962 25.1967 11.8033C24.9038 11.5104 24.9038 11.0355 25.1967 10.7426L29.4393 6.5L25.1967 2.25736C24.9038 1.96447 24.9038 1.48959 25.1967 1.1967C25.4896 0.903806 25.9645 0.903806 26.2574 1.1967L31.0303 5.96967ZM30.5 6.5V7.25H0.5V6.5V5.75H30.5V6.5Z" fill="white"></path>
                                </svg>
                            </div>
                        </div>

                        <div className='item-arsenal'>
                            <div className='item-arsenal-top'>
                                <h4>Tell us your project timeline and approximate budget, and we’ll exceed your expectations in every way</h4>
                            </div>
                            <div className='item-arsenal-bottom'>
                                <button className='red' onClick={openModal}>send</button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}