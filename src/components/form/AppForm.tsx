type AppFormProps = {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
};

const AppForm = ({ leftColumn, rightColumn }: AppFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1">{leftColumn}</div>
      <div className="col-span-2">{rightColumn}</div>
    </div>
  );
};

export default AppForm;
