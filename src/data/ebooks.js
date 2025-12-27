const DEMO_PDF_DATA_URL =
  "data:application/pdf;base64,JVBERi0xLjQKJURlbW9QREYKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvQ29udGVudHMgNCAwIFIgL1Jlc291cmNlcyA8PCAvRm9udCA8PCAvRjEgNSAwIFIgPj4gPj4gPj4KZW5kb2JqCjQgMCBvYmoKPDwgL0xlbmd0aCA0NyA+PgpzdHJlYW0KQlQKL0YxIDI0IFRmCjcyIDcyMCBUZAooRGVtbyBFLUJvb2sgUERGKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwgL1R5cGUgL0ZvbnQgL1N1YnR5cGUgL1R5cGUxIC9CYXNlRm9udCAvSGVsdmV0aWNhID4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTggMDAwMDAgbiAKMDAwMDAwMDA2NyAwMDAwMCBuIAowMDAwMDAwMTI0IDAwMDAwIG4gCjAwMDAwMDAyNTAgMDAwMDAgbiAKMDAwMDAwMDM0NiAwMDAwMCBuIAp0cmFpbGVyCjw8IC9TaXplIDYgL1Jvb3QgMSAwIFIgPj4Kc3RhcnR4cmVmCjQxNgolJUVPRgo=";

const DEFAULT_AUTHOR = "Subhankar Sarkar";

const baseEbooks = [
  {
    id: 1,
    title: "Cancer Is Not a Deadly Disease",
    author: DEFAULT_AUTHOR,
    cover: "https://placehold.co/600x800/png?text=Cancer+Is+Not+a+Deadly+Disease",
    desc: "A scientific and nutritional perspective on cancer, explaining why immunity, detoxification, and cellular nutrition matter more than fear.",
    pages: "120 pages",
    readTime: "2-3 hrs",
    readLink: "/ebook/read/cancer-not-deadly",
    downloadLink: DEMO_PDF_DATA_URL,
  },
  {
    id: 2,
    title: "Natural Science: The Universal Truth",
    author: DEFAULT_AUTHOR,
    cover: "https://placehold.co/600x800/png?text=Natural+Science",
    desc: "Explores the relationship between nature and the human body, redefining disease, immunity, and healing beyond conventional models.",
    pages: "150 pages",
    readTime: "3-4 hrs",
    readLink: "/ebook/read/natural-science",
    downloadLink: DEMO_PDF_DATA_URL,
  },
];

const demoEbooks = Array.from({ length: 38 }, (_, index) => {
  const id = index + 3;
  const slug = `demo-ebook-${id}`;

  return {
    id,
    title: `Demo E-Book ${id}`,
    author: DEFAULT_AUTHOR,
    cover: `https://placehold.co/600x800/png?text=E-Book+${id}`,
    desc: "Demo e-book entry for UI testing and pagination.",
    pages: `${100 + id} pages`,
    readTime: `${Math.max(1, Math.floor(id / 10))}-${Math.max(
      2,
      Math.floor(id / 10) + 1
    )} hrs`,
    readLink: `/ebook/read/${slug}`,
    downloadLink: DEMO_PDF_DATA_URL,
  };
});

export const ebooks = [...baseEbooks, ...demoEbooks];
