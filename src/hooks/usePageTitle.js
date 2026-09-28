import { useEffect } from 'react';

const SITE_NAME = 'CBG InfoTech';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}