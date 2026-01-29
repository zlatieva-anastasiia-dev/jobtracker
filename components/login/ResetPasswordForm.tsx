import { useActionState } from "react";
import { resetPasswordAction } from "@/app/actions/auth";
import { initialActionState } from "@/lib/constants";

export function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialActionState,
  );
  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {state.message && (
        <div
          className={`p-3 rounded-lg text-sm ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {state.message}
        </div>
      )}
      <div>
        <label htmlFor="password" className="block mb-1 font-medium text-sm">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
            state.errors?.password
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-100"
          }`}
        />
        {state.errors?.password && (
          <p className="text-red-500 text-xs mt-1">{state.errors.password}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-1 font-medium text-sm"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none transition-all ${
            state.errors?.confirmPassword
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-100"
          }`}
        />
        {state.errors?.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {state.errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Updating Password..." : "Confirm Update Password"}
      </button>
    </form>
  );
}
