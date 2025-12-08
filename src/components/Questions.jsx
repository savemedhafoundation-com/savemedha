const Questions = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {data.map((item) => (
        <article
          key={item.id || item.questionTitle}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-md"
        >
          <p className="text-lg font-semibold text-gray-800">
            {item.questionHeading}
          </p>
          <h3 className="mt-1 text-xl font-bold text-indigo-900">
            {item.questionTitle}
          </h3>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-base font-semibold text-amber-600">
                {item.answerHeading}
              </p>
              <p className="mt-1 leading-relaxed text-gray-700">
                {item.answerText}
              </p>
            </div>

            <div>
              <p className="text-base font-semibold text-green-700">
                {item.nitHeading}
              </p>
              <p className="mt-1 leading-relaxed text-gray-700">
                {item.nitText}
              </p>
            </div>
          </div>

          {item.ctaText ? (
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              {item.ctaText}
            </button>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export default Questions
