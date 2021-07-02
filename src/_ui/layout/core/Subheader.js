import React, { createContext, useState, useContext } from "react";

export function getBreadcrumbsAndTitle(menuId, pathName) {
  const result = {
    breadcrumbs: [],
    title: "",
  };

  const menu = document.getElementById(menuId);
  if (!menu) {
    return result;
  }

  const activeItemsArray = Array.from(
    menu.getElementsByClassName("active") || []
  );
  const activeItems = activeItemsArray.filter(
    (el) => el.tagName === "A" || el.tagName === "LI"
  );

  if (!activeItems) {
    return result;
  }

  activeItems.forEach((item) => {
    const titleSpans = item.getElementsByClassName("menu-title");

    if (titleSpans) {
      const titleSpan = Array.from(titleSpans).find(
        (t) => t.innerHTML && t.innerHTML.trim().length > 0
      );
      if (titleSpan) {
        let pathname = "";
        if (item.tagName === "A") {
          pathname = item.pathname.replace(process.env.PUBLIC_URL, "");
        } else {
          if (item.getElementsByClassName("collapse").length === 0) {
            pathname = item.getElementsByTagName("a")[0].pathname;
          }
        }
        result.breadcrumbs.push({
          pathname,
          title: titleSpan.innerHTML,
        });
      }
    }
  });
  result.title = getTitle(result.breadcrumbs, pathName);
  return result;
}

export function getTitle(breadCrumbs, pathname) {
  if (!breadCrumbs || !pathname) {
    return "";
  }

  const length = breadCrumbs.length;
  if (!length) {
    return "";
  }

  return breadCrumbs[length - 1].title;
}

const SubheaderContext = createContext();

export function useSubheader() {
  return useContext(SubheaderContext);
}

export const SubheaderConsumer = SubheaderContext.Consumer;

export function SubheaderProvider({ children }) {
  const [title, setTitle] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const value = { title, setTitle, breadcrumbs, setBreadcrumbs };
  return (
    <SubheaderContext.Provider value={value}>
      {children}
    </SubheaderContext.Provider>
  );
}
