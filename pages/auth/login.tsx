import { Button } from "@paljs/ui/Button";
import { InputGroup } from "@paljs/ui/Input";
import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { useForm, SubmitHandler } from "react-hook-form";

import Auth from "../../components/Auth";
import Layout from "../../Layouts";
import { AUTH_CLIENT } from "../../server/FirebaseClient";
import Spinner from "@paljs/ui/Spinner";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const loginHandler: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      await AUTH_CLIENT.signInWithEmailAndPassword(data.email, data.password);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Connexion">
      <Auth
        title="Connexion"
        subTitle="Bienvenue sur le portail administrateur de l'eglise Genese"
      >
        {loading && <Spinner />}
        <form onSubmit={handleSubmit(loginHandler)}>
          <InputGroup fullWidth status={errors.email ? "Danger" : "Basic"}>
            <div className="w-100">
              <input
                type="email"
                placeholder="Addresse Email(*)"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Vous devez entrer votre addresse email",
                  },
                })}
              />
              {errors.email && (
                <span className="message-error">{errors.email.message}</span>
              )}
            </div>
          </InputGroup>
          <InputGroup fullWidth status={errors.password ? "Danger" : "Basic"}>
            <div className="w-100">
              <input
                type="password"
                placeholder="Mot de passe(*)"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Vous devez entrer votre mot de passe",
                  },
                  minLength: {
                    value: 8,
                    message:
                      "Votre message doit contenir au moins 8 characteres",
                  },
                })}
              />
              {errors.password && (
                <span className="message-error">{errors.password.message}</span>
              )}
            </div>
          </InputGroup>

          <Button
            status="Success"
            type="submit"
            shape="SemiRound"
            fullWidth
            disabled={loading}
          >
            Connexion
          </Button>
        </form>
      </Auth>
    </Layout>
  );
};
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Login);
