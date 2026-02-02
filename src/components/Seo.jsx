// If you want page-wise titles (Home / Blog / Disease pages)
import siteConfig from "../config/site.config"


export function  Seo({title,description, path=""}){
    document.title = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = description || siteConfig.description;

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = siteConfig.url + path;
 
}

