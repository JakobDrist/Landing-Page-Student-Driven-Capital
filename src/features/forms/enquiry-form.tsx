import type { FormDefinition } from "@/content/types";
import { DemoForm } from "./demo-form";
import { Icon } from "@/components/ui/icon";
const control =
  "min-h-12 w-full rounded-[10px] border border-control bg-white px-4 py-3 text-[16px] text-ink outline-none transition-shadow placeholder:text-muted focus-visible:ring-1 focus-visible:ring-ink";
export function EnquiryForm({
  definition,
  label = definition.submit === "Send pitch"
    ? "Pitchformular"
    : "Kontaktformular",
}: {
  definition: FormDefinition;
  label?: string;
}) {
  return (
    <DemoForm className="flex flex-col gap-6" label={label}>
      {definition.heading && (
        <h2 className="text-[28px] leading-[1.2] tracking-[-0.025em]">
          {definition.heading}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {definition.fields.map((field) =>
          field.type === "checkbox" ? (
            <label
              key={field.name}
              className="flex items-start gap-3 text-[15px] leading-6 text-muted sm:col-span-2"
            >
              <input
                className="mt-1 size-4 accent-ink"
                type="checkbox"
                name={field.name}
                required={field.required}
              />
              {field.label}
            </label>
          ) : (
            <label
              key={field.name}
              className={`flex min-w-0 flex-col gap-2 text-[15px] leading-6 ${field.fullWidth ? "sm:col-span-2" : ""}`}
            >
              <span>{field.label}</span>
              {field.type === "select" ? (
                <select
                  className={control}
                  name={field.name}
                  required={field.required}
                  defaultValue={field.options[0]?.value}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  className={`${control} min-h-40 resize-y`}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  className={control}
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              )}
            </label>
          ),
        )}
      </div>
      <button
        type="submit"
        className="group flex h-[46px] w-fit cursor-pointer items-center gap-5 rounded-[10px] bg-ink pr-[5px] pl-[18px] text-[15px] text-paper transition-colors hover:bg-[#2e2e30]"
      >
        {definition.submit}
        <span className="grid size-9 place-items-center rounded-[7px] bg-paper text-ink transition-[padding] duration-250 group-hover:pl-1">
          <Icon path="M5 12h14m-5-5 5 5-5 5" />
        </span>
      </button>
    </DemoForm>
  );
}
