import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFound, SignIn, Welcome } from '../pages';
import { MainLayout, NonAuthLayout } from '../layouts';

function NonAuthRouting() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<NonAuthLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/graphiql" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default NonAuthRouting;
