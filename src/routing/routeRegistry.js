import { lazy } from "react";

const preloadableLazy = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

const loadHome = () => import("../pages/Home");
const loadAboutUs = () => import("../pages/AboutUs");
const loadTreatmentPage = () => import("../pages/TreatmentPage");
const loadTreatmentQuestion = () => import("../pages/Treatmentquestion");
const loadBlogs = () => import("../pages/Blogs");
const loadDonate = () => import("../pages/Donate");
const loadApplyJob = () => import("../pages/ApplyJob");
const loadLocateUs = () => import("../pages/LocateUs");
const loadBlogsDetails = () => import("../pages/BlogsDetails");
const loadEbookPage = () => import("../pages/EbookPage");
const loadEbookRead = () => import("../pages/EbookRead");
const loadCareersPage = () => import("../pages/CareersPage");
const loadEventsProjects = () => import("../pages/EventsProjects");
const loadOngoingEvents = () => import("../pages/OngoingEvents");
const loadCookiePolicyPage = () => import("../pages/CookiePolicyPage");
const loadTermsConditionsApply = () => import("../pages/TermsConditionsApply");
const loadDownloadApp = () => import("../pages/DownloadApp");
const loadStudentSocialWork = () => import("../pages/StudentSocialWork");

export const Home = preloadableLazy(loadHome);
export const AboutUs = preloadableLazy(loadAboutUs);
export const TreatmentPage = preloadableLazy(loadTreatmentPage);
export const Treatmentquestion = preloadableLazy(loadTreatmentQuestion);
export const Blogs = preloadableLazy(loadBlogs);
export const Donate = preloadableLazy(loadDonate);
export const ApplyJob = preloadableLazy(loadApplyJob);
export const LocateUs = preloadableLazy(loadLocateUs);
export const BlogsDetails = preloadableLazy(loadBlogsDetails);
export const EbookPage = preloadableLazy(loadEbookPage);
export const EbookRead = preloadableLazy(loadEbookRead);
export const CareersPage = preloadableLazy(loadCareersPage);
export const EventsProjects = preloadableLazy(loadEventsProjects);
export const OngoingEvents = preloadableLazy(loadOngoingEvents);
export const CookiePolicyPage = preloadableLazy(loadCookiePolicyPage);
export const TermsConditionsApply = preloadableLazy(loadTermsConditionsApply);
export const DownloadApp = preloadableLazy(loadDownloadApp);

export const StudentSocialWorkLanding = preloadableLazy(() =>
  loadStudentSocialWork().then((module) => ({
    default: module.StudentSocialWorkLanding,
  }))
);
export const StudentSocialWorkApply = preloadableLazy(() =>
  loadStudentSocialWork().then((module) => ({
    default: module.StudentSocialWorkApply,
  }))
);
export const StudentSocialWorkVerify = preloadableLazy(() =>
  loadStudentSocialWork().then((module) => ({
    default: module.StudentSocialWorkVerify,
  }))
);
export const StudentSocialWorkAdmin = preloadableLazy(() =>
  loadStudentSocialWork().then((module) => ({
    default: module.StudentSocialWorkAdmin,
  }))
);
export const StudentSocialWorkDashboard = preloadableLazy(() =>
  loadStudentSocialWork().then((module) => ({
    default: module.StudentSocialWorkDashboard,
  }))
);
export const StudentSocialWorkCertificatePrint = preloadableLazy(() =>
  loadStudentSocialWork().then((module) => ({
    default: module.StudentSocialWorkCertificatePrint,
  }))
);

export const getNavigationTarget = (pageKey, options = {}) => {
  switch (pageKey) {
    case "about":
      return "/about-us";
    case "treatment":
      return "/treatment";
    case "blogs":
      return options?.query
        ? `/blogs?q=${encodeURIComponent(options.query)}`
        : "/blogs";
    case "blogs-detail":
      return options?.slug ? `/blogs/${options.slug}` : null;
    case "donate":
      return "/donate";
    case "ebook":
      return "/ebook";
    case "careers":
      return "/careers";
    case "download-app":
      return "/download-app";
    case "events-projects":
      return "/events-projects";
    case "student-social-work":
      return "/student-social-work";
    case "ongoing-events":
      return "/ongoing-events";
    case "contact":
    case "locateus":
      return "/contact-us";
    case "apply":
      return "/apply";
    case "treatment-questions":
      return "/treatment-questions";
    case "terms-conditions-apply":
      return "/terms-conditions-apply";
    case "cancer-detail":
    case "kidney-detail":
    case "heart-detail":
    case "nerve-detail":
    case "sma-detail":
      return "/treatment";
    case "home":
    default:
      return "/";
  }
};

const ROUTE_PRELOADERS = {
  home: Home.preload,
  about: AboutUs.preload,
  treatment: TreatmentPage.preload,
  "treatment-questions": Treatmentquestion.preload,
  blogs: Blogs.preload,
  "blogs-detail": BlogsDetails.preload,
  donate: Donate.preload,
  ebook: EbookPage.preload,
  "ebook-read": EbookRead.preload,
  careers: CareersPage.preload,
  "download-app": DownloadApp.preload,
  "events-projects": EventsProjects.preload,
  "ongoing-events": OngoingEvents.preload,
  "student-social-work": StudentSocialWorkLanding.preload,
  "student-social-work/apply": StudentSocialWorkApply.preload,
  "student-social-work/verify": StudentSocialWorkVerify.preload,
  "student-social-work/dashboard": StudentSocialWorkDashboard.preload,
  "student-social-work/admin": StudentSocialWorkAdmin.preload,
  "student-social-work/certificate": StudentSocialWorkCertificatePrint.preload,
  locateus: LocateUs.preload,
  contact: LocateUs.preload,
  apply: ApplyJob.preload,
  "cookie-policy": CookiePolicyPage.preload,
  "terms-conditions-apply": TermsConditionsApply.preload,
};

const ROUTE_ALIASES = {
  "cancer-detail": "treatment",
  "kidney-detail": "treatment",
  "heart-detail": "treatment",
  "nerve-detail": "treatment",
  "sma-detail": "treatment",
};

const preloadCache = new Map();

const getPreloadKey = (routeKey) => ROUTE_ALIASES[routeKey] || routeKey;

export const prefetchRouteByKey = (routeKey) => {
  const preloadKey = getPreloadKey(routeKey);
  const preloader = ROUTE_PRELOADERS[preloadKey];

  if (!preloader) {
    return Promise.resolve();
  }

  const cachedPromise = preloadCache.get(preloadKey);
  if (cachedPromise) {
    return cachedPromise;
  }

  const preloadPromise = Promise.resolve(preloader()).catch((error) => {
    preloadCache.delete(preloadKey);
    throw error;
  });

  preloadCache.set(preloadKey, preloadPromise);
  return preloadPromise;
};
