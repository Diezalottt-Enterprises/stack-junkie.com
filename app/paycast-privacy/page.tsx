// app/privacy/app-privacy-policy.tsx
import React from 'react'

export default function AppPrivacyPolicy() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 p-8 text-gray-300">
      <article className="w-full max-w-3xl rounded-xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
        <h1 className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-center text-3xl font-bold text-transparent">
          PayCast – Privacy Policy
        </h1>
        <p className="mt-2 text-center italic">Last updated: 28 July 2025</p>

        <h2 className="mt-8 text-xl font-semibold text-sky-400">1. Data we collect</h2>
        <p className="mt-2">
          PayCast stores all budget items <strong>locally on your device.</strong> We do not
          collect, transmit, or share any personal or financial data.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-sky-400">2. Permissions</h2>
        <ul className="mt-2 list-inside list-disc">
          <li>
            <strong>Storage:</strong> Used only to export or import your JSON backups.
          </li>
        </ul>

        <h2 className="mt-8 text-xl font-semibold text-sky-400">3. Third-party services</h2>
        <p className="mt-2">None.</p>

        <h2 className="mt-8 text-xl font-semibold text-sky-400">4. Your choices</h2>
        <p className="mt-2">
          Delete the app to remove all data, or use the “Clear All” button at any time.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-sky-400">5. Contact</h2>
        <p className="mt-2">
          Chris Kvamme –
          <a href="mailto:support@stack-junkie.com" className="text-sky-400 hover:underline">
            stack-junkie@protonmail.com
          </a>
        </p>
      </article>
    </div>
  )
}
