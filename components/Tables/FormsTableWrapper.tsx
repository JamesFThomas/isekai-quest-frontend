import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FormsTableView from './FormsTableView';

export default function FormsTableViewWrapper() {
  return (
    <Suspense fallback={<CircularProgress size='3rem' />}>
      <FormsTableView />
    </Suspense>
  );
}
