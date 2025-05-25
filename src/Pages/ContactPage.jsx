'use client';

import React, { useState } from 'react';
import { Button } from '@/components/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { toast } from "sonner";
 

export default function ContactUs() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!topic || !name || !email || !message) {
      toast("Error", { description: "All fields are required" });
      return;
    }

    // Simulate sending feedback...
   toast("Submitted", { description: "Feedback submitted successfully" });

    // Clear form
    setTopic("");
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="px-2 min-h-screen bg-gradient-to-br from-[#0a0a14] to-[#221424] text-white">
      <div
        className="h-80 bg-cover bg-center relative"
        style={{ backgroundImage: "url('../src/assets/Images/contactUsBanner2.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="-mx-2 text-4xl font-bold text-white px-6 py-2 text-center">
            We’re just a message away.
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8 ">
        {/* Contact Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <Label htmlFor="topic">How can we help you?</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic">
                <SelectValue className="text-gray-700" placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="text-gray-700">
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">Mobile Number (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="message">Type text*</Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button
              className="bg-violet-500 mb-10 hover:bg-violet-700 w-fit"
              onClick={handleSubmit}
            >
              Submit Feedback
            </Button>
          </div>
        </div>

        {/* Help Sections */}
        <div className="mt-10 space-y-6">
          <Card className="bg-[#2e2e3e] border-none text-white">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Report a Platform Issue</h3>
              <p className="text-sm text-gray-300 mb-2">
                Experiencing a bug, glitch, or unexpected issue while using PreHire? Whether it's a
                problem with the mock interview flow or something that just doesn't feel right — we’re here
                to help.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#2e2e3e] border-none text-white">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Issue with your live interview?</h3>
              <p className="text-sm text-gray-300">
                We're just a feedback message away — reach out anytime and our team will get back to you as
                soon as possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
