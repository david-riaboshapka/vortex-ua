"use client";

import { useState } from "react";

export default function Projects_home() {
    const [activePerson, setActivePerson] = useState("vortex");

    return (
        <section>
            <div className='container'>
                <h2>
                    About <span>us</span>
                </h2>
                <div className="cont-info-about">
                    <div className="peoples-about-img">
                        <div
                            className="person-about-img"
                            onMouseEnter={() => setActivePerson("davyd")}
                            onMouseLeave={() => setActivePerson("vortex")}
                        >
                            <img src="/images/davyd1.jpg" alt="Davyd" />
                            <div className='person-about-img-info'>
                                <h5>Davyd</h5>
                                <span>[Co-Founder & Developer]</span>
                            </div>
                        </div>

                        <div
                            className="person-about-img"
                            onMouseEnter={() => setActivePerson("andrey")}
                            onMouseLeave={() => setActivePerson("vortex")}
                        >
                            <img src="/images/miria.jpg" alt="Miria" />


                            <div className='person-about-img-info'>
                                <h5>Davyd</h5>
                                <span>[Co-Founder & Developer]</span>
                            </div>
                        </div>
                    </div>
                    <span className='line-red'></span>
                    <div className="info-text-about">
                        {activePerson === "vortex" && (
                            <>
                                <h2>About <span>Vortex</span></h2>
                                <p>We are the Vortex agency, which helps brands come up with comprehensive solutions: from informed design to pure design and strategic development.</p>
                                <p>At Vortex, minimalism is not just aesthetics, but a way to cut through the noise.</p>
                            </>
                        )}

                        {activePerson === "davyd" && (
                            <>
                                <h2>Davyd <span>Owner</span></h2>
                                <p>I have been working in web development for over 6 years.</p>
                                <p>I create websites and web applications — from simple landing pages to complex projects with business logic and integrations.</p>
                                <p>I work with Next.js, React, PHP (Laravel), WordPress, OpenCart, UMI.CMS.</p>
                                <p>I value clean code, clear architecture, and practical solutions.</p>
                            </>
                        )}

                        {activePerson === "andrey" && (
                            <>
                                <h2>Andrey <span>Support</span></h2>
                                <p>I have been working in web development for over 6 years...</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
