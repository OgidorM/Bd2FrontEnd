// Presentation Layer: Full-screen scroll-snap banner
import React from 'react';
import './SectionBanner.css';

const SectionBanner = ({ title, subtitle, theme = 'default', id }) => {
    return (
        <section id={id} className={`section-banner snap-section theme-${theme}`}>
            <div className="section-banner-content">
                <h2 className="section-banner-title">{title}</h2>
                {subtitle && <p className="section-banner-subtitle">{subtitle}</p>}
            </div>
        </section>
    );
};

export default SectionBanner;