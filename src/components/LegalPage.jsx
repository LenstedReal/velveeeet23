'use client';
import React from 'react';
import BrandLogo from './BrandLogo';
import Footer from './Footer';

const UPDATED = '2 October 2026';
const CONTACT = 'contact@velvetai.com';
const SITE = 'https://velvet-cakeai.vercel.app';
const OPERATOR = 'LenstedReal';

const PAGES = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        h: 'Who we are',
        body: `Velvet Cake AI (“VelvetAI”, “we”, “us”) is an 18+ interactive AI companion and roleplay service operated by ${OPERATOR}. This policy explains what we collect, why we collect it, and how you can control it. Site: ${SITE}. Contact: ${CONTACT}.`,
      },
      {
        h: 'Age requirement',
        body: 'The service is for adults only. You must be at least 18 years old. We do not knowingly collect data from anyone under 18. If we learn that an under-18 account exists, we delete it. Character profiles on the platform are adults (18+).',
      },
      {
        h: 'Data we collect',
        body: `Account: email, password hash (we never store your raw password), display name, optional avatar, and sign-in provider (email or Discord). Guest mode creates a device-bound account using a random device id stored in your browser. Discord sign-in: Discord user id, username, email (if Discord shares it), and avatar. Usage: characters you create, conversations, messages, generated images/voice you request, XP/level, and favorites. Technical: IP address and basic request logs from our host (Vercel) for security and abuse prevention. Browser storage: velvetai_token (session), velvetai_device_id (guest), velvetai_age_verified (18+ gate).`,
      },
      {
        h: 'How we use data',
        body: 'To run your account, keep you signed in (JWT), show your characters and chats, generate AI replies and media you ask for, prevent abuse, and improve reliability. We do not sell your personal data. We do not use your private chats for third-party advertising.',
      },
      {
        h: 'AI processing (important)',
        body: 'Chat is not end-to-end encrypted. Messages you send and character prompts are processed by our servers and by our AI provider (OpenRouter) to generate replies. Image generation may be processed by a media provider (for example Fal.ai) when that feature is enabled. Do not send information you would not want a processor to see (passwords, government IDs, financial numbers, other people’s private data).',
      },
      {
        h: 'Cookies and local storage',
        body: 'We use browser local storage, not advertising cookies. velvetai_token keeps you signed in. velvetai_device_id restores a guest session on the same browser. velvetai_age_verified remembers that you passed the 18+ gate. Clearing site data signs you out of guest mode on that device. We do not run third-party ad trackers on the app.',
      },
      {
        h: 'Who we share with',
        body: `Hosting: Vercel. Database: PostgreSQL (Neon or equivalent) when configured — chats, accounts, and characters are stored there. Auth: Discord if you choose Discord login. AI: OpenRouter (and the model provider behind it) for chat completions. Media: image/voice vendors only when you request generation. We share the minimum needed to provide the feature you used. We may disclose data if required by law or to prevent serious harm or illegal abuse (including child-sexual-abuse material).`,
      },
      {
        h: 'Retention',
        body: 'Account, characters, conversations, and media stay until you delete them or we close the account. Server logs are kept only as long as needed for security and operations. If you delete your account we remove your profile and associated content from production systems, except data we must keep for legal, security, or dispute reasons. Until a production database is connected, some preview/local data may exist only in server memory and is lost on restart.',
      },
      {
        h: 'Your rights',
        body: `You can access and update profile fields in the app, log out, and request deletion by emailing ${CONTACT} from the address on the account. You may object to processing or ask for a copy of the data we hold where applicable law gives you that right (including GDPR/UK GDPR if it applies to you). We will need to verify the account before acting.`,
      },
      {
        h: 'Security',
        body: `Passwords are hashed (bcrypt). Sessions use signed JWT access tokens. Transport is HTTPS on the production site. No method is 100% secure. Protect your email and Discord account. If you believe there is a breach, write to ${CONTACT} immediately.`,
      },
      {
        h: 'International transfers',
        body: 'We and our processors may store or process data in the United States and other countries. If you use the service from elsewhere, you understand your data may leave your country.',
      },
      {
        h: 'Changes',
        body: `We may update this policy. The “Last updated” date will change. Continued use after an update means you accept the revised policy. Material changes will be reflected on this page.`,
      },
      {
        h: 'Contact',
        body: `Operator: ${OPERATOR}. Email: ${CONTACT}. Website: ${SITE}.`,
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      {
        h: 'Agreement',
        body: `These Terms govern your use of Velvet Cake AI / VelvetAI at ${SITE}, operated by ${OPERATOR}. By entering the 18+ gate, creating an account, or using the service, you agree to these Terms and the Privacy Policy. If you do not agree, do not use the service.`,
      },
      {
        h: '18+ only',
        body: 'You must be 18 or older. You confirm you are an adult and that you will not create, request, or upload characters, images, or stories that depict anyone under 18 (including “teen”, “young”, school-age, or similar). We may ban and report illegal child-sexual-abuse content.',
      },
      {
        h: 'What the service is',
        body: 'Velvet Cake AI is a free-to-use interactive roleplay and AI companion platform: preset and user-created adult characters, text chat, optional image/voice generation, and related features. All characters are fictional. They are not real people and do not represent consenting humans. Output is AI-generated and can be wrong, offensive, or inconsistent.',
      },
      {
        h: 'Accounts',
        body: 'You may register with email/password, continue as a guest on this device, or sign in with Discord when that is configured. You are responsible for activity on your account. Keep your password and Discord account secure. We may suspend accounts for abuse, fraud, or legal risk. Guest data is tied to the browser; clearing storage can lose the guest session unless a server account still exists.',
      },
      {
        h: 'Free service, “as is”',
        body: 'Features are offered free of charge at this time, without a paywall in the product. Availability, models, image generation, and uptime can change or break. THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”, WITHOUT WARRANTIES OF ANY KIND, INCLUDING FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED ACCESS. AI output is not professional, medical, legal, or financial advice.',
      },
      {
        h: 'Your content',
        body: 'You keep rights in the prompts and custom characters you create. You grant us a worldwide license to host, process, and display that content as needed to run the service (including sending prompts to AI providers). You must have the right to submit what you submit. Do not impersonate real private individuals in a way that is unlawful. Do not upload others’ personal data.',
      },
      {
        h: 'Acceptable use',
        body: 'Do not: (1) involve minors in any sexual or exploitative way; (2) attempt to generate CSAM or the sexualization of anyone 17 or under; (3) use the service for scams, malware, or attacks; (4) scrape, overload, or reverse-engineer the API in an abusive way; (5) bypass age checks or security; (6) use output to harass or threaten real people. We may remove content and terminate access.',
      },
      {
        h: 'AI and third parties',
        body: 'Replies are produced via third-party model APIs (OpenRouter and the underlying model). Image/voice features use third-party generators when enabled. Their uptime and policies apply. We are not liable for third-party outages or model behavior.',
      },
      {
        h: 'Intellectual property',
        body: 'The Velvet Cake AI name, logo, and product UI are owned by LenstedReal. You may not copy the service, brand, or logo for a competing product without permission. Preset characters and site copy are ours or licensed to us.',
      },
      {
        h: 'Liability',
        body: 'To the maximum extent allowed by law, LenstedReal and Velvet Cake AI are not liable for indirect, incidental, special, or consequential damages, or loss of data, chats, or generated media. Our total liability for a claim is limited to zero (the service is free) or the minimum your local law requires.',
      },
      {
        h: 'Termination',
        body: 'You may stop using the service at any time. We may suspend or delete accounts that violate these Terms. Provisions that should survive (IP, liability, indemnity, 18+ rules) survive termination.',
      },
      {
        h: 'Law',
        body: 'These Terms are governed by the laws applicable to the operator, without regard to conflict-of-law rules. If a court finds a section unenforceable, the rest remains in effect.',
      },
      {
        h: 'Contact',
        body: `Questions: ${CONTACT}. Operator: ${OPERATOR}.`,
      },
    ],
  },
  age: {
    title: '18+ Age Policy',
    sections: [
      {
        h: 'Adults only',
        body: 'Velvet Cake AI is an adult (18+) product. You must be eighteen (18) years of age or older to enter or use the site. The age gate is a legal access control, not optional flavor text.',
      },
      {
        h: 'What you confirm',
        body: 'When you tap “I am 18 or older”, you confirm that you are at least 18, that you want to see adult roleplay content, and that you will not share the service with minors. We store that confirmation in your browser (velvetai_age_verified) so we do not ask every visit on the same device.',
      },
      {
        h: 'Characters are 18+',
        body: 'Official and user-created characters must be adults. Age on a character is 18 or above. Descriptions, images, names, and chat that present a character as under 18 are forbidden and will be removed.',
      },
      {
        h: 'Zero tolerance for child sexual abuse material',
        body: 'Any attempt to create, request, or distribute sexual content involving minors (real or fictional) is prohibited. We will delete it, ban the account, and report to the relevant authorities / hosting providers where required.',
      },
      {
        h: 'If you are under 18',
        body: 'Leave the site. Do not create an account. If a parent or guardian believes a minor used Velvet Cake AI, contact contact@velvetai.com and we will delete the account.',
      },
      {
        h: 'Related documents',
        body: 'This policy works together with our Terms of Service and Privacy Policy. Using the service after passing the gate means you accept all three.',
      },
    ],
  },
};

export default function LegalPage({ kind }) {
  const page = PAGES[kind] || PAGES.privacy;
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <header className="border-b border-white/5 bg-[#0a0a0c]/95">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center min-w-0">
            <BrandLogo size="lg" />
          </a>
          <a href="/" className="text-sm text-white/60 hover:text-white shrink-0">Home</a>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-2">Velvet Cake AI</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{page.title}</h1>
        <p className="text-white/40 text-sm mb-8">Last updated: {UPDATED}</p>
        <div className="space-y-8">
          {page.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-lg font-semibold text-white mb-2">{s.h}</h2>
              <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4 text-sm">
          <a href="/terms" className="text-pink-400 hover:text-pink-300">Terms of Service</a>
          <a href="/privacy" className="text-pink-400 hover:text-pink-300">Privacy Policy</a>
          <a href="/age-policy" className="text-pink-400 hover:text-pink-300">18+ Age Policy</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
