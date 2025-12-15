import React, { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TREATMENT_QUESTIONS_BY_CATEGORY } from "../data/treatmentQuestionsByCategory";

const stripPrefix = (title = "") => title.replace(/^\d+\.?\s*/, "").trim();

const Search = ({ onNavigate }) => {
    const [query, setQuery] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const combinedQuestions = useMemo(() => {
        const allQuestions = Object.entries(TREATMENT_QUESTIONS_BY_CATEGORY).flatMap(
            ([category, questions]) =>
                (questions || []).map((item) => ({
                    id: item.id,
                    category,
                    questionTitle: stripPrefix(item.questionTitle),
                }))
        );

        const seen = new Set();
        return allQuestions.filter((item) => {
            const key = (item.questionTitle || "").toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, []);

    const matches = useMemo(() => {
        const term = query.trim().toLowerCase();
        if (!term) return [];
        return combinedQuestions.filter((item) =>
            (item.questionTitle || "").toLowerCase().includes(term)
        );
    }, [combinedQuestions, query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!matches.length) return;
        onNavigate?.("treatment-questions", {
            category: matches[0].category,
            id: matches[0].id,
        });
    };

    const handleResultClick = (item) => {
        onNavigate?.("treatment-questions", { category: item.category, id: item.id });
    };

    return (
        <div className="max-w-2xl mx-auto ">
            <div className="rounded-[2.5rem] bg-[#ec652b] text-white shadow-xl p-8 pb-10 text-center relative overflow-visible">
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight mb-8">
                    Ask us your health
                    <br />
                    related queries
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="relative w-full max-w-lg mx-auto">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setSubmitted(false);
                            }}
                            placeholder="Type Something....."
                            aria-label="Search questions"
                            className="w-full rounded-full bg-white text-gray-800 placeholder-gray-500 h-14 pl-6 pr-14 text-base shadow-sm focus:outline-none"
                        />
                        <CiSearch
                            className="absolute right-5 top-7 -translate-y-1/2 text-gray-500"
                            size={30}
                            aria-hidden="true"
                        />
                        {submitted && !matches.length ? (
                    <p className="text-sm sm:text-base text-white">
                        No matching questions found. Try a different keyword.
                    </p>
                ) : null}

                {matches.length ? (
                    <ul className="text-left bg-white/10 rounded-lg p-4 space-y-2 max-h-56 overflow-auto">
                        {matches.slice(0, 6).map((item) => (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    onClick={() => handleResultClick(item)}
                                    className="w-full text-left text-sm sm:text-base cursor-pointer hover:text-yellow-200 underline-offset-2 hover:underline"
                                >
                                    {item.questionTitle}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : null}
                    </div>

                    <button
                        type="submit"
                        className="rounded-full cursor-pointer bg-gradient-to-b from-[#8fd64d] to-[#6bb52e] text-black font-bold px-20 py-3 text-lg shadow-lg uppercase tracking-wider border-4 border-white hover:from-[#7fc242] hover:to-[#5ea127] transition-transform hover:scale-105"
                    >
                        SUBMIT
                    </button>
                </form>

                
            </div>
        </div>
    );
};

export default Search;
