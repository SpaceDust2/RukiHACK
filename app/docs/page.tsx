'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  useEffect(() => {
    import('swagger-ui-react/swagger-ui.css');
  }, []);

  return <SwaggerUI url="/api/swagger.json" />;
}