'use client';

import { useEffect, useState } from 'react';

type Form = {
  Id: number;
  FirstName: string;
  LastName: string;
  Message: string;
  Completed: boolean;
};

// export const dynamic = 'force-dynamic';

export default function Test() {
  const [forms, setForms] = useState<Form[]>([]);
  //   const apiData = await fetch('http://127.0.0.1:5001/Forms');
  //   const formsData: Form[] = await apiData.json();

  useEffect(() => {
    if (forms.length === 0) {
      fetch('http://127.0.0.1:5001/Forms')
        .then((response) => response.json())
        .then((data) => setForms(data));
    }
  });

  return (
    <div>
      <h1>Test</h1>
      <ul>
        {forms.map((form: Form) => (
          <>
            <li key={form.Id}>{form.Id}</li>
            <li key={form.Id}>{form.FirstName}</li>
            <li key={form.Id}>{form.LastName}</li>
            <li key={form.Id}>{form.Message}</li>
            <li key={form.Id}>{form.Completed}</li>
          </>
        ))}
      </ul>
    </div>
  );
}
