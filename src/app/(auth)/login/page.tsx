import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-xl mt-8">
      <RegisterForm />
    </div>
  );
}