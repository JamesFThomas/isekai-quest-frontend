import { Form } from '../app/formstable/page';

type FormsTableProps = {
  forms: Form[];
};

const FormsTable = ({ forms }: FormsTableProps) => {
  console.log(forms);
  return (
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
          {forms.map((form) => (
            <tr key={form.Id}>
              <td key={form.Id}>{form.Id}</td>
              <td key={form.Id}>{form.FirstName}</td>
              <td key={form.Id}>{form.LastName}</td>
              <td key={form.Id}>{form.Message}</td>
              {/* // TODO - Change Completed section to display a checkmark or an X */}
              <td key={form.Id}>
                {form.Completed
                  ? form.Completed.toString()
                  : form.Completed.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default FormsTable;
