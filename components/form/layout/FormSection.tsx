type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <fieldset className="border border-gray-200 rounded-lg p-4">
      <legend className="text-sm font-medium px-2">{title}</legend>
      <div className="space-y-4 mt-2">{children}</div>
    </fieldset>
  );
}
