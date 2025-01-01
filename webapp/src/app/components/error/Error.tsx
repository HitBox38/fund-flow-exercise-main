export const Error = ({ error }: { error: unknown }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-500 rounded-lg shadow-md p-5">
      <h4 className="text-red-500 font-bold">Error: {error?.toString()}</h4>
    </div>
  );
};
