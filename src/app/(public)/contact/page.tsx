import React from 'react';

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | CSCA Prep Support",
    description: "Get in touch with the CSCA Prep team for support regarding exam preparation, technical issues, or scholarship inquiries.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <p>Contact form coming soon.</p>
        </div>
    );
}
