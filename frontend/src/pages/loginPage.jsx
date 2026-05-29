import AuthLayouts from "../components/layouts/authLayouts";
import FormLogin from "../components/fragments/formLogin";

const LoginPage = () => {
  return (
    <AuthLayouts title="Selamat Datang">
      <FormLogin />
    </AuthLayouts>
  );
};

export default LoginPage;