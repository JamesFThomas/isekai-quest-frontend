import { Form } from '../app/formstable/page';

type FormsTableProps = {
  forms: Form[];
};

const FormsTable = ({ forms }: FormsTableProps) => {
  return (
    <div>
      <h1>Forms Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.Id}>
              <td>{form.Id}</td>
              <td>{form.FirstName}</td>
              <td>{form.LastName}</td>
              <td>{form.Message}</td>
              <td>{form.Completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FormsTable;
