import React, { useEffect, useMemo } from "react";

const DEFAULT_CTA_HREF = "https://dantura.com/";

export default function QuestionSection({
  categoryKey,
  categoryLabel,
  questions,
  ctaHref = DEFAULT_CTA_HREF,
  highlightQuestionId,
}) {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const highlightId = useMemo(() => {
    if (highlightQuestionId == null) return null;
    const numeric = Number(highlightQuestionId);
    return Number.isFinite(numeric) ? numeric : null;
  }, [highlightQuestionId]);

  useEffect(() => {
    if (!highlightId) return;
    if (typeof document === "undefined") return;

    const target = document.getElementById(
      `question-${categoryKey || "default"}-${highlightId}`
    );
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [categoryKey, highlightId]);

  return (
    <section className="w-full">
      <div className="text-center">
        <h4 className="text-2xl sm:text-3xl font-semibold font-robotocondensed text-[#1b3610]">
          {categoryLabel ? `${categoryLabel} Questions` : "Questions"}
        </h4>
        <div className="mt-2 mx-auto h-0.5 w-40 bg-[#6ab12f]" />
      </div>

      <div className="mt-8 space-y-8">
        {safeQuestions.length ? (
          safeQuestions.map((q) => {
            const hasAnswer = Boolean(q.answerText);
            const hasNit = Boolean(q.nitText);
            const isHighlighted = highlightId != null && q.id === highlightId;

            return (
              <article
                key={q.id}
                id={`question-${categoryKey || "default"}-${q.id}`}
                className={`rounded-lg border bg-white shadow-md overflow-hidden ${
                  isHighlighted ? "border-[#1118A5] ring-2 ring-[#1118A5]/25" : "border-slate-200"
                }`}
              >
                <div className="px-6 py-5">
                  <p className="text-3xl font-light font-poppins text-gray-900">
                    {q.questionHeading}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#1118A5] via-blue-800 to-white-50 w-full text-white px-6 py-4">
                  <p className="text-xl sm:text-2xl font-roboto">
                    {q.questionTitle}
                  </p>
                </div>

                <div className="px-6 py-6 space-y-6">
                  {hasAnswer ? (
                    <div>
                      <h5 className="text-2xl font-poppins text-orange-600">
                        {q.answerHeading}
                      </h5>
                      <p className="mt-2 text-gray-700 font-poppins leading-7 whitespace-pre-line">
                        {q.answerText}
                      </p>
                    </div>
                  ) : null}

                  {hasNit ? (
                    <div>
                      <h5 className="text-xl text-[#62B70D]">{q.nitHeading}</h5>
                      <p className="mt-2 text-gray-700 font-poppins leading-7 whitespace-pre-line">
                        {q.nitText}
                      </p>
                    </div>
                  ) : null}

                  {q.ctaText ? (
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#7BC043] w-[300px] h-[80px] flex items-center text-center justify-center hover:bg-green-600 transition cursor-pointer text-white font-bold font-opensans rounded-[4px] shadow-md uppercase tracking-wider text-base md:text-lg"
                    >
                      {q.ctaText}
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-[#DDFFBA] px-6 py-10 text-center text-slate-700">
            Select any treatment category from the above to get your queries..
          </div>
        )}
      </div>
    </section>
  );
}
