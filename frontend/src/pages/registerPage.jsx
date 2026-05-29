import AuthLayouts from "../components/layouts/authLayouts";
import FormRegister from "../components/fragments/formRegister";

const RegisterPage = () => {
  return (
    <AuthLayouts title="Buat Akun">
      <FormRegister />
    </AuthLayouts>
  );
};

export default RegisterPage;
