import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GraphiQL, NotFound, Welcome } from '../pages';
import { AuthLayout, MainLayout } from '../layouts';
import { SchemaDocumentationProvider } from '../contexts';

function AuthRouting() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/sign-in" element={<Navigate to="/" replace />} />
          <Route
            path="/graphiql"
            element={
              <SchemaDocumentationProvider>
                <GraphiQL />
              </SchemaDocumentationProvider>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AuthRouting;
