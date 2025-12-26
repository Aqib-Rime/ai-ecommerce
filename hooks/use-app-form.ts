import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";
import { FormInput } from "@/components/forms/form-input";
import { FormTextarea } from "@/components/forms/form-textarea";
import { FormSelect } from "@/components/forms/form-select";
import { FormCheckbox } from "@/components/forms/form-checkbox";
import { FormSwitch } from "@/components/forms/form-switch";
import { FormPasswordInput } from "@/components/forms/form-password-input";
import { FormNumberInput } from "@/components/forms/form-number-input";
import { SubmitButton } from "@/components/forms/submit-button";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox,
    FormSwitch,
    FormPasswordInput,
    FormNumberInput,
  },
  formComponents: {
    SubmitButton,
  },
});
