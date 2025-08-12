'use client'
import { useState } from 'react'
import { getCommentsForSlug, type Comment } from '@/lib/getComments'

type Props = {
  slug: string
  existingComments?: Comment[]
}

export default function CommentsStaticman({ slug, existingComments = [] }: Props) {
  const [pending, setPending] = useState(false)
  const [ok, setOk] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setErr(null)
    const form = e.currentTarget
    const data = new FormData(form)

    const staticmanUrl = process.env.NEXT_PUBLIC_STATICMAN_URL
    const branch = process.env.NEXT_PUBLIC_COMMENTS_BRANCH ?? 'main'

    // Debug logging
    console.log('Staticman URL:', staticmanUrl)
    console.log('Branch:', branch)

    if (!staticmanUrl) {
      setErr('Staticman service URL not configured')
      setPending(false)
      return
    }

    const endpoint = `${staticmanUrl}/v3/entry/gitlab/stack-junkie/Stack-Junkie/${branch}/comments?slug=${encodeURIComponent(slug)}`
    console.log('Endpoint:', endpoint)

    // Debug: log form data
    console.log('Form data entries:')
    for (const [key, value] of data.entries()) {
      console.log(`  ${key}: ${value}`)
    }

    try {
      // Convert FormData to URLSearchParams for Staticman compatibility
      const urlEncoded = new URLSearchParams()
      for (const [key, value] of data.entries()) {
        urlEncoded.append(key, value.toString())
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncoded,
      })
      if (!res.ok) {
        // Limit error message length and provide more helpful error
        const errorText = await res.text()
        const shortError = errorText.length > 200 ? `${errorText.substring(0, 200)}...` : errorText
        throw new Error(`Submission failed (${res.status}): ${shortError}`)
      }
      setOk(true)
      form.reset()
    } catch (e: unknown) {
      console.error('Comment submission error:', e)
      setErr(e instanceof Error ? e.message : 'Failed to submit')
    } finally {
      setPending(false)
    }
  }

  return (
    <div id="comments" className="mt-10">
      <h3 className="mb-4 text-xl font-semibold">Comments</h3>

      {/* Display existing comments */}
      {existingComments.length > 0 && (
        <div className="mb-8">
          <ul className="space-y-4">
            {existingComments.map((comment, i) => (
              <li key={i} className="rounded border bg-gray-50 p-4 dark:bg-gray-800">
                <div className="mb-2 flex items-start justify-between">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {comment.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(comment.date).toLocaleString()}
                  </div>
                </div>
                <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {comment.message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comment submission form */}
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="options[slug]" type="hidden" value={slug} />
        <div>
          <label
            htmlFor="comment-name"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            id="comment-name"
            name="fields[name]"
            required
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div>
          <label
            htmlFor="comment-message"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Message
          </label>
          <textarea
            id="comment-message"
            name="fields[message]"
            required
            rows={4}
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <button
          disabled={pending}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
        >
          {pending ? 'Submitting…' : 'Post comment'}
        </button>
        {ok && (
          <p className="text-sm text-green-600">
            Thanks! Your comment has been submitted for moderation.
          </p>
        )}
        {err && (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-400">
            <strong>Error:</strong> {err}
          </div>
        )}
      </form>
    </div>
  )
}
