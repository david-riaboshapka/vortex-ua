'use client'
import { useModalStore } from '@/store/useModalStore';
export default function Requests() {
       const openModal = useModalStore((state) => state.openModal);
    return (
        <section className="form" data-category-content="nav_contacts">
            <div className='container'>
                <div className="form-content">
                    <div className="form-left">
                        <span data-translate="form_section_contact">Get in touch</span>
                        <h2 data-translate="form_section_title">Take the first step</h2>
                        <a href="tel:+380982820121" className="mobile-form-link form-link">
                            <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/phone-icon.png" alt="Phone icon" data-translate-alt="form_section_phone_icon_alt" />
                            <span className="phone-number" data-translate="form_section_phone">+38 (098) 0120 241</span>
                        </a>
                        <a href="mailto:vortex.agency.web@gmail.com" className="email-form-link form-link">
                            <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/Email.png" alt="Email icon" data-translate-alt="form_section_email_icon_alt" />
                            <span className="email" data-translate="form_section_email">vortex.agency.web@gmail.com</span>
                        </a>
                        <a href="" className="city-form-link form-link">
                            <img src="https://vortex-agency.com.ua/wp-content/themes/vortex/assets/img/Location.png" alt="Location icon" data-translate-alt="form_section_location_icon_alt" />
                            <span className="city" data-translate="form_section_city">Kyiv</span>
                        </a>
                        <button className="red" onClick={openModal}>
                            <span data-translate="form_section_submit_request">Submit a request</span>
                        </button>
                    </div>
                    <div className="form-right">
                        <div className="form-right-top">
                            <h3 data-translate="form_section_right_top_title">VORTEX AGENCY — your reliable partner in website and design creation for business</h3>
                            <p data-translate="form_section_right_top_description">Website development is a complex process that requires the involvement of various IT specialists. In today’s world, an online presence is a necessity for every business. The VORTEX team operates in Ukraine and Slovakia, creating landing pages that ensure high conversion rates, as well as developing corporate websites and turnkey online stores for businesses of any complexity.</p>
                        </div>
                        <div className="form-right-bottom">
                            <h3 data-translate="form_section_right_bottom_title">What types of websites we create</h3>
                            <p data-translate="form_section_right_bottom_description_1">Website creation in Ukraine and Slovakia is a popular IT service, as businesses need to be represented online. At VORTEX, we specialize in landing pages that help attract clients, but we also work with other types of web resources. The cost depends on the type of website, its complexity, and the client’s needs.</p>
                            <p data-translate="form_section_right_bottom_description_2">Here are the main types of websites we develop:</p>
                            <ul>
                                <li data-translate="form_section_landing">Landing page — a single-page site for advertising purposes that motivates the audience to take a specific action (purchase, registration, etc.). Our landing pages are maximally result-oriented.</li>
                                <li data-translate="form_section_corporate">Corporate website — a multi-page resource with extended functionality for a detailed representation of the company.</li>
                                <li data-translate="form_section_ecommerce">Online store — a platform for online sales with integrated payment systems and personal accounts.</li>
                                <li data-translate="form_section_online_services">Online services — websites for providing services (e.g., booking or online scheduling).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}