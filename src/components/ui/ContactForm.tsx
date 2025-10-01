'use client';
import React, { useState } from 'react';
import { Input } from './input';
import { Button } from './button';

function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        description: '',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid gap-4">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Full Name
                        </label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="First Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#022C22] focus:border-transparent"
                            required
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Email Address
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#022C22] focus:border-transparent"
                        required
                    />
                </div>

                {/* Phone Field */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Phone Number
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#022C22] focus:border-transparent"
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="Type Your Message"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#022C22] focus:border-transparent resize-none"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <Button
                        type="submit"
                        className="bg-[var(--blue)] cursor-pointer hover:bg-[var(--blue)]/70 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 focus:ring-[var(--blue)] focus:ring-offset-2"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;