import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12">
            <Link to="/home" className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <div className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Shield className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                Privacy Policy
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                Your privacy is important to us.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          <div className="bg-background p-8 md:p-12 rounded-2xl shadow-lg border border-border/10">
            <div className="prose prose-lg max-w-none dark:prose-invert text-muted-foreground space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                <p>
                  Welcome to e2i home care. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Mobile Information and Text Messaging Consent</h2>
                <p className="font-semibold text-foreground">
                  No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.
                </p>
                <p className="mt-2">
                  All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. Your privacy is our priority, and we ensure that your consent to receive text messages and any related data remains confidential and is not used for any other purpose.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                <p>
                  We may collect personal information that you voluntarily provide to us when you fill out a contact form, apply for a career, or request a consultation. This may include your name, email address, phone number, and any other information you choose to provide.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                <p>
                  We use the information we collect to provide, operate, and maintain our services, to communicate with you, to process your requests and applications, and to improve your experience on our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through the information provided on our website.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;