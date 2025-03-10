'use client';

import { useEffect, useState } from 'react';
import { Form } from '../app/formstable/page';

type FormsTableProps = {
  formsData: Form[];
};

const FormsTable = ({ formsData }: FormsTableProps) => {
  const [forms, setForms] = useState<Form[] | undefined>(undefined);

  useEffect(() => {
    if (!forms) {
      setForms(formsData);
    }
  }, [forms, formsData]);

  console.log(formsData);

  if (!forms) {
    return <div>Loading...</div>;
  }

  return (
    forms && (
      <div>
        <h1>Forms Table</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Message</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {forms &&
              forms.map((forms) => (
                <tr key={forms.Id}>
                  <td>{forms.Id}</td>
                  <td>{forms.FirstName}</td>
                  <td>{forms.LastName}</td>
                  <td>{forms.Message}</td>
                  <td>{forms.Completed ? '✔️' : '❌'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
};
export default FormsTable;
